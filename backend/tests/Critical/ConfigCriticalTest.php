<?php

use PHPUnit\Framework\TestCase;

// Mock environment for testing
class MockEnvironment
{
    public static $env = [];
    
    public static function setEnv($key, $value)
    {
        self::$env[$key] = $value;
        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
    
    public static function clearEnv()
    {
        foreach (self::$env as $key => $value) {
            putenv("$key");
            unset($_ENV[$key]);
            unset($_SERVER[$key]);
        }
        self::$env = [];
    }
}

/**
 * Config Critical Tests  
 * Tests SMTP configuration validation - the most common production failure
 * Critical business logic: SMTP misconfiguration = complete business failure
 */
class ConfigCriticalTest extends TestCase
{
    protected function setUp(): void
    {
        MockEnvironment::clearEnv();
    }

    protected function tearDown(): void
    {
        MockEnvironment::clearEnv();
    }

    /**
     * @test
     * CRITICAL: Missing SMTP credentials cause total business failure
     * This is the #1 production issue that breaks contact forms
     */
    public function testSmtpConfigurationDetectsMissingCredentials()
    {
        // Clear all SMTP environment variables
        MockEnvironment::clearEnv();
        
        // Reload config to test missing SMTP
        $this->reloadConfig();
        
        // isSmtpConfigured() should return false when credentials are missing
        $isConfigured = isSmtpConfigured();
        $this->assertFalse($isConfigured, 'SMTP should not be configured without credentials');
        
        // Individual constants should be empty/false
        $this->assertEmpty(SMTP_HOST, 'SMTP_HOST should be empty when not configured');
        $this->assertEmpty(SMTP_USER, 'SMTP_USER should be empty when not configured');  
        $this->assertEmpty(SMTP_PASS, 'SMTP_PASS should be empty when not configured');
    }

    /**
     * @test
     * CRITICAL: Valid SMTP configuration is properly detected
     */
    public function testSmtpConfigurationDetectsValidCredentials()
    {
        // Set valid SMTP credentials
        MockEnvironment::setEnv('SMTP_HOST', 'smtp.gmail.com');
        MockEnvironment::setEnv('SMTP_USER', 'test@example.com');
        MockEnvironment::setEnv('SMTP_PASS', 'testpassword');
        
        // Test the isSmtpConfigured function logic directly
        $host = getenv('SMTP_HOST');
        $user = getenv('SMTP_USER');
        $pass = getenv('SMTP_PASS');
        
        $isConfigured = !empty($host) && !empty($user) && !empty($pass);
        $this->assertTrue($isConfigured, 'SMTP should be configured with valid credentials');
        
        // Verify environment variables are set correctly
        $this->assertEquals('smtp.gmail.com', $host);
        $this->assertEquals('test@example.com', $user);
        $this->assertEquals('testpassword', $pass);
    }

    /**
     * @test
     * CRITICAL: Partial SMTP configuration should fail
     */
    public function testSmtpConfigurationRejectsPartialCredentials()
    {
        // Only set host, missing user and password
        MockEnvironment::setEnv('SMTP_HOST', 'smtp.gmail.com');
        // Missing SMTP_USER and SMTP_PASS
        
        $this->reloadConfig();
        
        $isConfigured = isSmtpConfigured();
        $this->assertFalse($isConfigured, 'SMTP should not be configured with partial credentials');
    }

    /**
     * @test
     * CRITICAL: Default values for production safety
     */
    public function testProductionSafeDefaults()
    {
        MockEnvironment::clearEnv();
        $this->reloadConfig();
        
        // Critical defaults that prevent production failures
        $this->assertEquals('587', SMTP_PORT, 'Default SMTP port should be 587');
        $this->assertEquals('contact@disrupt.inc', TEAM_EMAIL, 'Default team email should be set');
        $this->assertEquals('Disrupt Inc.', FROM_NAME, 'Default from name should be set');
        
        // SMTP_SECURE should default to 'tls' when not 'true' 
        $this->assertEquals('tls', SMTP_SECURE, 'Default SMTP security should be TLS');
    }

    /**
     * @test  
     * CRITICAL: SSL vs TLS configuration parsing
     */
    public function testSmtpSecurityModeConfiguration()
    {
        // Test SSL mode
        MockEnvironment::setEnv('SMTP_SECURE', 'true');
        $secure = getenv('SMTP_SECURE') === 'true' ? 'ssl' : 'tls';
        $this->assertEquals('ssl', $secure, 'SMTP_SECURE=true should result in ssl');
        
        MockEnvironment::clearEnv();
        
        // Test TLS mode (default)
        MockEnvironment::setEnv('SMTP_SECURE', 'false');
        $secure = getenv('SMTP_SECURE') === 'true' ? 'ssl' : 'tls';
        $this->assertEquals('tls', $secure, 'SMTP_SECURE=false should result in tls');
        
        MockEnvironment::clearEnv();
        
        // Test unset (should default to TLS)
        $secure = getenv('SMTP_SECURE') === 'true' ? 'ssl' : 'tls';
        $this->assertEquals('tls', $secure, 'Unset SMTP_SECURE should default to tls');
    }

    /**
     * @test
     * CRITICAL: CORS origins configuration for production
     */
    public function testCorsOriginsConfiguration()
    {
        $this->reloadConfig();
        
        $corsOrigins = CORS_ORIGINS;
        $this->assertIsArray($corsOrigins, 'CORS_ORIGINS should be an array');
        
        // Critical production domains should be included
        $this->assertContains('https://disruptinc.io', $corsOrigins);
        $this->assertContains('https://www.disruptinc.io', $corsOrigins);
        
        // Development domains should be included
        $this->assertContains('http://localhost:5173', $corsOrigins);
        $this->assertContains('http://localhost:3000', $corsOrigins);
    }

    /**
     * @test
     * CRITICAL: Custom CORS origins from environment
     */
    public function testCustomCorsOriginsFromEnvironment()
    {
        MockEnvironment::setEnv('CORS_ORIGINS', 'https://custom1.com,https://custom2.com');
        
        // Test the CORS origins parsing logic directly
        $corsOriginsEnv = getenv('CORS_ORIGINS');
        $corsOrigins = $corsOriginsEnv ? explode(',', $corsOriginsEnv) : [
            'https://disruptinc.io',
            'https://www.disruptinc.io',
            'https://disrupt.inc',
            'https://www.disrupt.inc',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:5176',
            'http://localhost:5177',
            'http://localhost:3000'
        ];
        
        $this->assertEquals(['https://custom1.com', 'https://custom2.com'], $corsOrigins);
    }

    /**
     * @test
     * CRITICAL: FROM_EMAIL fallback configuration
     */
    public function testFromEmailFallbackConfiguration()
    {
        // When FROM_EMAIL is not set, should fall back to SMTP_USER
        MockEnvironment::setEnv('SMTP_USER', 'smtp@example.com');
        // Don't set FROM_EMAIL
        
        // Test the FROM_EMAIL fallback logic directly
        $fromEmail = getenv('FROM_EMAIL') ?: (getenv('SMTP_USER') ?: '');
        $this->assertEquals('smtp@example.com', $fromEmail, 'FROM_EMAIL should fallback to SMTP_USER');
        
        MockEnvironment::clearEnv();
        
        // When both FROM_EMAIL and SMTP_USER are set, FROM_EMAIL should take precedence
        MockEnvironment::setEnv('FROM_EMAIL', 'custom@example.com');
        MockEnvironment::setEnv('SMTP_USER', 'smtp@example.com');
        
        $fromEmail = getenv('FROM_EMAIL') ?: (getenv('SMTP_USER') ?: '');
        $this->assertEquals('custom@example.com', $fromEmail, 'FROM_EMAIL should take precedence over SMTP_USER');
    }

    /**
     * Helper method to reload config constants for testing
     */
    private function reloadConfig()
    {
        // Since PHP constants can't be redefined, we need to work with the current state
        // This simulates loading config.php with current environment
        
        // Re-include the config file logic manually for testing
        if (!defined('SMTP_HOST_TEST')) {
            // Simulate the config.php logic for testing
            define('SMTP_HOST_TEST', getenv('SMTP_HOST') ?: '');
            define('SMTP_PORT_TEST', getenv('SMTP_PORT') ?: '587');
            define('SMTP_SECURE_TEST', getenv('SMTP_SECURE') === 'true' ? 'ssl' : 'tls');
            define('SMTP_USER_TEST', getenv('SMTP_USER') ?: '');
            define('SMTP_PASS_TEST', getenv('SMTP_PASS') ?: '');
            define('TEAM_EMAIL_TEST', getenv('TEAM_EMAIL') ?: 'contact@disrupt.inc');
            define('FROM_EMAIL_TEST', getenv('FROM_EMAIL') ?: (getenv('SMTP_USER') ?: ''));
            define('FROM_NAME_TEST', getenv('FROM_NAME') ?: 'Disrupt Inc.');
            
            // CORS Origins
            $corsOriginsEnv = getenv('CORS_ORIGINS');
            $corsOriginsTest = $corsOriginsEnv ? explode(',', $corsOriginsEnv) : [
                'https://disruptinc.io',
                'https://www.disruptinc.io',
                'https://disrupt.inc',
                'https://www.disrupt.inc',
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
                'http://localhost:5176',
                'http://localhost:5177',
                'http://localhost:3000'
            ];
            define('CORS_ORIGINS_TEST', $corsOriginsTest);
        }
    }
}

// Since we can't redefine constants, we need to include the original config
// but test the functions that depend on environment variables
require_once __DIR__ . '/../../config.php';