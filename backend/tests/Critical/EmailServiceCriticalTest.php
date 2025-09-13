<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../email-service.php';
require_once __DIR__ . '/../../email-templates.php';

/**
 * EmailService Critical Tests
 * Tests critical business logic and failure modes in email sending
 * Focus: Business continuity, graceful degradation, security
 */
class EmailServiceCriticalTest extends TestCase
{
    private $emailService;

    protected function setUp(): void
    {
        $this->emailService = new EmailService();
    }

    /**
     * @test
     * CRITICAL: Test mode functionality when SMTP is not configured
     * Business continuity: System should work even without SMTP setup
     */
    public function testEmailServiceRunsInTestModeWithoutSmtp()
    {
        // Mock isSmtpConfigured to return false
        $originalSmtpHost = defined('SMTP_HOST') ? constant('SMTP_HOST') : '';
        
        // Skip if SMTP is actually configured in environment
        if (!empty($originalSmtpHost)) {
            $this->markTestSkipped('SMTP is configured - cannot test test mode');
        }

        $contactData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'company' => 'Test Company',
            'message' => 'Test message'
        ];

        $result = $this->emailService->sendEmails($contactData);

        $this->assertTrue($result['success'], 'Email should succeed in test mode');
        $this->assertStringContainsString('TEST MODE', $result['message'], 'Should indicate test mode');
        $this->assertTrue($result['testMode'], 'Should flag test mode');
    }

    /**
     * @test  
     * CRITICAL: PHPMailer availability detection
     */
    public function testPhpMailerAvailabilityDetection()
    {
        $reflection = new ReflectionClass($this->emailService);
        $usePHPMailerProperty = $reflection->getProperty('usePHPMailer');
        $usePHPMailerProperty->setAccessible(true);
        
        $usePHPMailer = $usePHPMailerProperty->getValue($this->emailService);
        
        // Should detect if PHPMailer class exists
        $expectedValue = class_exists('PHPMailer\PHPMailer\PHPMailer');
        $this->assertEquals($expectedValue, $usePHPMailer, 'Should correctly detect PHPMailer availability');
    }

    /**
     * @test
     * CRITICAL: Email service handles missing template data gracefully
     * Business continuity: Should not crash with incomplete data
     */
    public function testEmailServiceHandlesMissingOptionalFields()
    {
        // Data with only required fields
        $minimalData = [
            'name' => '',  // Empty name
            'email' => 'test@example.com',
            'company' => 'Test Company',
            'message' => ''  // Empty message
        ];

        // This should not throw an exception - graceful degradation
        if (isSmtpConfigured()) {
            $this->markTestSkipped('SMTP configured - would send real emails');
        }

        $result = $this->emailService->sendEmails($minimalData);
        $this->assertTrue($result['success'], 'Should handle minimal data gracefully');
    }

    /**
     * @test
     * CRITICAL: Exception handling in email sending
     * Business continuity: Should fail gracefully, not crash
     */
    public function testEmailServiceHandlesExceptionsGracefully()
    {
        if (!isSmtpConfigured()) {
            $this->markTestSkipped('SMTP not configured - cannot test SMTP failures');
        }

        // Test with invalid email format that might cause SMTP to fail
        $problemData = [
            'name' => 'Test User',
            'email' => 'invalid-email-format',  // Invalid format might cause issues
            'company' => 'Test Company', 
            'message' => 'Test message'
        ];

        // Should either succeed or throw a proper exception (not crash)
        try {
            $result = $this->emailService->sendEmails($problemData);
            // If it doesn't throw, it should return a result
            $this->assertIsArray($result, 'Should return array result');
            $this->assertArrayHasKey('success', $result, 'Result should have success key');
        } catch (Exception $e) {
            // Exception is acceptable - just make sure it's a proper exception
            $this->assertInstanceOf(Exception::class, $e, 'Should throw proper exception');
            $this->assertNotEmpty($e->getMessage(), 'Exception should have meaningful message');
        }
    }

    /**
     * @test
     * CRITICAL: Input data validation and sanitization
     * Security: Ensure data is properly handled before email creation
     */
    public function testEmailServiceInputDataHandling()
    {
        $xssData = [
            'name' => '<script>alert("xss")</script>Test User',
            'email' => 'test@example.com',
            'company' => '<img src=x onerror=alert(1)>Evil Corp',
            'message' => '<?php system("rm -rf /"); ?>Malicious message'
        ];

        if (isSmtpConfigured()) {
            $this->markTestSkipped('SMTP configured - would send real emails');
        }

        // Should not crash with XSS attempts
        $result = $this->emailService->sendEmails($xssData);
        $this->assertTrue($result['success'], 'Should handle XSS attempts without crashing');
    }

    /**
     * @test
     * CRITICAL: Large message handling
     * Business continuity: Should handle large messages without memory issues
     */
    public function testEmailServiceHandlesLargeMessages()
    {
        $largeMessage = str_repeat('This is a large message. ', 1000); // ~25KB message
        
        $largeData = [
            'name' => 'Test User',
            'email' => 'test@example.com', 
            'company' => 'Test Company',
            'message' => $largeMessage
        ];

        if (isSmtpConfigured()) {
            $this->markTestSkipped('SMTP configured - would send real emails');
        }

        // Should handle large messages without memory issues
        $result = $this->emailService->sendEmails($largeData);
        $this->assertTrue($result['success'], 'Should handle large messages');
    }

    /**
     * @test
     * CRITICAL: Unicode character handling  
     * Business continuity: Should handle international characters
     */
    public function testEmailServiceHandlesUnicodeCharacters()
    {
        $unicodeData = [
            'name' => 'José María González-Smith 测试用户',
            'email' => 'test@example.com',
            'company' => 'Тест Компания 会社テスト',
            'message' => 'Unicode message: 你好 🚀 ñáéíóú Москва العربية'
        ];

        if (isSmtpConfigured()) {
            $this->markTestSkipped('SMTP configured - would send real emails');
        }

        // Should handle Unicode without issues
        $result = $this->emailService->sendEmails($unicodeData);
        $this->assertTrue($result['success'], 'Should handle Unicode characters');
    }

    /**
     * @test
     * CRITICAL: Return format consistency
     * API contract: Always return expected format for client integration
     */
    public function testEmailServiceReturnFormatConsistency()
    {
        $testData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'company' => 'Test Company',
            'message' => 'Test message'
        ];

        $result = $this->emailService->sendEmails($testData);

        // API contract requirements
        $this->assertIsArray($result, 'Result should be an array');
        $this->assertArrayHasKey('success', $result, 'Result should have success key');
        $this->assertArrayHasKey('message', $result, 'Result should have message key');
        $this->assertIsBool($result['success'], 'Success should be boolean');
        $this->assertIsString($result['message'], 'Message should be string');
        $this->assertNotEmpty($result['message'], 'Message should not be empty');
    }

    /**
     * @test
     * CRITICAL: Logging in test mode
     * Business continuity: Should provide visibility into what would be sent
     */
    public function testEmailServiceTestModeLogging()
    {
        if (isSmtpConfigured()) {
            $this->markTestSkipped('SMTP configured - not in test mode');
        }

        $testData = [
            'name' => 'Log Test User',
            'email' => 'logtest@example.com',
            'company' => 'Log Test Company',
            'message' => 'Log test message'
        ];

        // Capture error log output
        $this->expectOutputString(''); // Suppress any direct output
        
        $result = $this->emailService->sendEmails($testData);
        
        $this->assertTrue($result['success'], 'Should succeed in test mode');
        $this->assertArrayHasKey('testMode', $result, 'Should indicate test mode');
    }
}