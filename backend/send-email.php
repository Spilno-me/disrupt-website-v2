<?php
header('Content-Type: application/json');

// CORS headers
$allowed_origins = [
    'https://www.disruptinc.io',
    'https://disruptinc.io',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Include required files
require_once 'config.php';
require_once 'validation.php';
require_once 'email-templates.php';
require_once 'email-service.php';

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input === null) {
        throw new Exception('Invalid JSON data');
    }
    
    // Validate form data
    $validatedData = validateContactFormData($input);
    
    // Send emails
    $emailService = new EmailService();
    $result = $emailService->sendEmails($validatedData);
    
    // Return success response
    echo json_encode($result);
    
} catch (ValidationException $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.'
    ]);
    
    // Log the error
    error_log('Email sending error: ' . $e->getMessage());
}
?>