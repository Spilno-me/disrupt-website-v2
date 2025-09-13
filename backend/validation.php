<?php
class ValidationException extends Exception {
    public function __construct($message) {
        parent::__construct($message);
    }
}

class EmailValidationException extends ValidationException {
    public function __construct($message = 'Please provide a valid email address') {
        parent::__construct($message);
    }
}

class RequiredFieldException extends ValidationException {
    public function __construct($fields) {
        if (is_array($fields)) {
            $fieldList = implode(' and ', $fields);
            $message = count($fields) === 1 
                ? "$fieldList is required"
                : "$fieldList are required fields";
        } else {
            $message = "$fields is required";
        }
        parent::__construct($message);
    }
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function sanitizeInput($input) {
    if (!is_string($input)) {
        return $input;
    }
    return trim($input);
}

function validateContactFormData($formData) {
    $name = isset($formData['name']) ? sanitizeInput($formData['name']) : '';
    $email = isset($formData['email']) ? sanitizeInput($formData['email']) : '';
    $company = isset($formData['company']) ? sanitizeInput($formData['company']) : '';
    $message = isset($formData['message']) ? sanitizeInput($formData['message']) : '';
    
    $sanitizedData = [
        'name' => $name,
        'email' => $email,
        'company' => $company,
        'message' => $message
    ];
    
    // Check required fields
    if (empty($sanitizedData['email'])) {
        throw new RequiredFieldException(['Email']);
    }
    
    if (empty($sanitizedData['company'])) {
        throw new RequiredFieldException(['Company']);
    }
    
    // Validate email format
    if (!validateEmail($sanitizedData['email'])) {
        throw new EmailValidationException();
    }
    
    return $sanitizedData;
}
?>