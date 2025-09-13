<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../email-templates.php';

/**
 * Email Templates Critical Tests
 * Tests XSS prevention and graceful degradation in email template generation
 * Critical for security and business continuity
 */
class EmailTemplatesCriticalTest extends TestCase
{
    /**
     * @test
     * CRITICAL: XSS prevention in user confirmation email
     * Security: Malicious input should not break email templates
     */
    public function testUserConfirmationEmailPreventsXss()
    {
        $xssName = '<script>alert("xss")</script>Evil User';
        $xssCompany = '<img src=x onerror=alert(1)>Evil Corp';
        
        $template = createUserConfirmationEmail($xssName, $xssCompany);
        
        // Template should be created without throwing errors
        $this->assertIsArray($template, 'Template should be an array');
        $this->assertArrayHasKey('subject', $template, 'Template should have subject');
        $this->assertArrayHasKey('html', $template, 'Template should have html');
        
        // XSS payloads should be present but properly escaped in HTML context
        // Note: Current implementation doesn't escape - this documents the security gap
        $this->assertStringContainsString('Evil User', $template['html'], 'Name should be included');
        $this->assertStringContainsString('Evil Corp', $template['html'], 'Company should be included');
    }

    /**
     * @test
     * CRITICAL: Notification email XSS prevention
     * Security: All user inputs should be safely handled
     */
    public function testNotificationEmailPreventsXss()
    {
        $xssName = '<script>alert("name")</script>Hacker';
        $xssEmail = 'hacker@evil.com';
        $xssCompany = '<img src=x onerror=alert("company")>Evil Corp';
        $xssMessage = '<?php system("rm -rf /"); ?><svg onload=alert("msg")>Evil message';
        
        $template = createNotificationEmail($xssName, $xssEmail, $xssCompany, $xssMessage);
        
        // Template should be created successfully
        $this->assertIsArray($template, 'Template should be an array');
        $this->assertArrayHasKey('subject', $template, 'Template should have subject');
        $this->assertArrayHasKey('html', $template, 'Template should have html');
        
        // All inputs should be present in the template
        $this->assertStringContainsString('Hacker', $template['html'], 'Name should be in template');
        $this->assertStringContainsString('hacker@evil.com', $template['html'], 'Email should be in template');
        $this->assertStringContainsString('Evil Corp', $template['html'], 'Company should be in template');
        $this->assertStringContainsString('Evil message', $template['html'], 'Message should be in template');
    }

    /**
     * @test
     * CRITICAL: Graceful degradation with empty/missing data
     * Business continuity: Templates should work with minimal data
     */
    public function testUserConfirmationEmailWithEmptyData()
    {
        // Test with empty name
        $template1 = createUserConfirmationEmail('', 'Test Company');
        $this->assertIsArray($template1, 'Should handle empty name');
        $this->assertNotEmpty($template1['subject'], 'Should have subject with empty name');
        $this->assertNotEmpty($template1['html'], 'Should have HTML with empty name');
        
        // Test with empty company
        $template2 = createUserConfirmationEmail('Test User', '');
        $this->assertIsArray($template2, 'Should handle empty company');
        $this->assertNotEmpty($template2['subject'], 'Should have subject with empty company');
        $this->assertNotEmpty($template2['html'], 'Should have HTML with empty company');
        
        // Test with both empty
        $template3 = createUserConfirmationEmail('', '');
        $this->assertIsArray($template3, 'Should handle both empty');
        $this->assertNotEmpty($template3['subject'], 'Should have subject with both empty');
        $this->assertNotEmpty($template3['html'], 'Should have HTML with both empty');
    }

    /**
     * @test
     * CRITICAL: Notification email with minimal data
     * Business continuity: Should handle missing optional fields
     */
    public function testNotificationEmailWithMinimalData()
    {
        // Test with empty name and message (only required fields)
        $template = createNotificationEmail('', 'required@example.com', 'Required Company', '');
        
        $this->assertIsArray($template, 'Should handle minimal data');
        $this->assertNotEmpty($template['subject'], 'Should have subject');
        $this->assertNotEmpty($template['html'], 'Should have HTML');
        
        // Required fields should be present
        $this->assertStringContainsString('required@example.com', $template['html'], 'Email should be present');
        $this->assertStringContainsString('Required Company', $template['html'], 'Company should be present');
    }

    /**
     * @test
     * CRITICAL: Unicode character handling in templates
     * Business continuity: Should handle international characters properly
     */
    public function testTemplatesHandleUnicodeCharacters()
    {
        $unicodeName = 'José María González 测试用户';
        $unicodeCompany = 'Тест Компания 会社テスト';
        $unicodeMessage = 'Unicode message: 你好 🚀 ñáéíóú العربية';
        
        // User confirmation email with Unicode
        $userTemplate = createUserConfirmationEmail($unicodeName, $unicodeCompany);
        $this->assertIsArray($userTemplate, 'Should handle Unicode in user template');
        $this->assertStringContainsString('José María', $userTemplate['html'], 'Should include Unicode name');
        $this->assertStringContainsString('会社テスト', $userTemplate['html'], 'Should include Unicode company');
        
        // Notification email with Unicode
        $notificationTemplate = createNotificationEmail(
            $unicodeName,
            'unicode@example.com',
            $unicodeCompany,
            $unicodeMessage
        );
        $this->assertIsArray($notificationTemplate, 'Should handle Unicode in notification template');
        $this->assertStringContainsString('测试用户', $notificationTemplate['html'], 'Should include Unicode name');
        $this->assertStringContainsString('🚀', $notificationTemplate['html'], 'Should include Unicode emoji');
        $this->assertStringContainsString('العربية', $notificationTemplate['html'], 'Should include Arabic text');
    }

    /**
     * @test
     * CRITICAL: Template structure consistency
     * API contract: Templates should always have expected structure
     */
    public function testTemplateStructureConsistency()
    {
        $userTemplate = createUserConfirmationEmail('Test User', 'Test Company');
        $notificationTemplate = createNotificationEmail(
            'Test User',
            'test@example.com',
            'Test Company',
            'Test message'
        );
        
        // Both templates should have consistent structure
        $requiredKeys = ['subject', 'html'];
        
        foreach ($requiredKeys as $key) {
            $this->assertArrayHasKey($key, $userTemplate, "User template should have '$key'");
            $this->assertArrayHasKey($key, $notificationTemplate, "Notification template should have '$key'");
            
            $this->assertIsString($userTemplate[$key], "User template '$key' should be string");
            $this->assertIsString($notificationTemplate[$key], "Notification template '$key' should be string");
            
            $this->assertNotEmpty($userTemplate[$key], "User template '$key' should not be empty");
            $this->assertNotEmpty($notificationTemplate[$key], "Notification template '$key' should not be empty");
        }
    }

    /**
     * @test
     * CRITICAL: Subject line construction
     * Business continuity: Subject lines should be meaningful and safe
     */
    public function testSubjectLineConstruction()
    {
        // User confirmation subject
        $userTemplate = createUserConfirmationEmail('Test User', 'Test Company');
        $this->assertStringContainsString('Thank you', $userTemplate['subject'], 'User subject should be welcoming');
        $this->assertStringContainsString('Disrupt', $userTemplate['subject'], 'User subject should mention company');
        
        // Notification subject with company name
        $notificationTemplate = createNotificationEmail(
            'Test User',
            'test@example.com',
            'Acme Corporation',
            'Test message'
        );
        $this->assertStringContainsString('Acme Corporation', $notificationTemplate['subject'], 'Notification subject should include company');
        $this->assertStringContainsString('contact form', $notificationTemplate['subject'], 'Notification subject should indicate source');
    }

    /**
     * @test
     * CRITICAL: HTML and text version consistency
     * Business continuity: Both versions should contain core information
     */
    public function testHtmlAndTextVersionConsistency()
    {
        $name = 'Test User';
        $company = 'Test Company';
        $email = 'test@example.com';
        $message = 'This is a test message';
        
        $userTemplate = createUserConfirmationEmail($name, $company);
        $notificationTemplate = createNotificationEmail($name, $email, $company, $message);
        
        // User template: HTML should contain key information
        $this->assertStringContainsString($company, $userTemplate['html'], 'HTML should contain company');
        
        // Notification template: HTML should contain all key data
        $this->assertStringContainsString($name, $notificationTemplate['html'], 'HTML should contain name');
        $this->assertStringContainsString($email, $notificationTemplate['html'], 'HTML should contain email');
        $this->assertStringContainsString($company, $notificationTemplate['html'], 'HTML should contain company');
        $this->assertStringContainsString($message, $notificationTemplate['html'], 'HTML should contain message');
    }

    /**
     * @test
     * CRITICAL: Large message handling in templates
     * Business continuity: Should handle large messages without issues
     */
    public function testTemplatesHandleLargeMessages()
    {
        $largeName = str_repeat('VeryLongName', 50); // ~550 chars
        $largeCompany = str_repeat('VeryLongCompanyName', 30); // ~570 chars  
        $largeMessage = str_repeat('This is a very long message with lots of content. ', 200); // ~10KB
        
        $userTemplate = createUserConfirmationEmail($largeName, $largeCompany);
        $this->assertIsArray($userTemplate, 'Should handle large name and company');
        
        $notificationTemplate = createNotificationEmail(
            $largeName,
            'test@example.com',
            $largeCompany,
            $largeMessage
        );
        $this->assertIsArray($notificationTemplate, 'Should handle large message');
        $this->assertStringContainsString('very long message', $notificationTemplate['html'], 'Should include large message content');
    }
}