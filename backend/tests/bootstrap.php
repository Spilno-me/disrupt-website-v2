<?php

// Test bootstrap file - sets up the test environment
require_once __DIR__ . '/../vendor/autoload.php';

// Set error reporting for tests
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set timezone
date_default_timezone_set('UTC');

// Define test constants
define('TEST_MODE', true);

// Suppress output for cleaner test results
ob_start();
?>