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

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Health check response
echo json_encode([
    'status' => 'OK',
    'timestamp' => date('c'),
    'version' => 'PHP Backend v1.0'
]);
?>