<?php
// Load environment variables from .env file
function loadEnvFile($filePath = '.env') {
    if (!file_exists($filePath)) {
        return;
    }
    
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Skip comments
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Load .env file
loadEnvFile();

// Server configuration
define('SERVER_PORT', getenv('PORT') ?: '80');
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
define('CORS_ORIGINS', $corsOrigins);

// Email configuration
define('SMTP_HOST', getenv('SMTP_HOST'));
define('SMTP_PORT', getenv('SMTP_PORT') ?: '587');
define('SMTP_SECURE', getenv('SMTP_SECURE') === 'true' ? 'ssl' : 'tls');
define('SMTP_USER', getenv('SMTP_USER'));
define('SMTP_PASS', getenv('SMTP_PASS'));
define('TEAM_EMAIL', getenv('TEAM_EMAIL') ?: 'contact@disrupt.inc');
define('FROM_EMAIL', getenv('FROM_EMAIL') ?: getenv('SMTP_USER'));
define('FROM_NAME', getenv('FROM_NAME') ?: 'Disrupt Inc.');

// Check if SMTP is configured
function isSmtpConfigured() {
    return !empty(SMTP_HOST) && !empty(SMTP_USER) && !empty(SMTP_PASS);
}
?>