<?php
// Use PHPMailer if available, otherwise fall back to native mail()
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailService {
    private $usePHPMailer;
    
    public function __construct() {
        // Check if PHPMailer is available
        $this->usePHPMailer = class_exists('PHPMailer\PHPMailer\PHPMailer');
    }
    
    private function logTestModeEmails($name, $email, $company, $message) {
        error_log('📧 TEST MODE - Email simulation:');
        error_log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        error_log('📤 User Confirmation Email:');
        error_log("   To: $email");
        error_log('   Subject: Thank you for contacting Disrupt Inc.');
        error_log("   Content: Welcome email with confirmation for " . ($name ?: 'user') . " from $company");
        error_log('');
        error_log('📨 Team Notification Email:');
        error_log('   To: ' . TEAM_EMAIL);
        error_log('   Subject: New contact form submission from ' . $company);
        error_log('   From: ' . ($name ?: 'No name') . " ($email)");
        error_log("   Company: $company");
        error_log('   Message: ' . ($message ?: 'No message provided'));
        error_log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        error_log('✅ Emails would be sent successfully!');
    }
    
    private function sendWithPHPMailer($to, $subject, $htmlBody, $replyTo = null) {
        if (!$this->usePHPMailer) {
            throw new Exception('PHPMailer not available');
        }
        
        $mail = new PHPMailer(true);
        
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = SMTP_HOST;
            $mail->SMTPAuth = true;
            $mail->Username = SMTP_USER;
            $mail->Password = SMTP_PASS;
            $mail->SMTPSecure = SMTP_SECURE === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = SMTP_PORT;
            
            // Recipients
            $mail->setFrom(SMTP_USER, 'Disrupt Inc');
            $mail->addAddress($to);
            if ($replyTo) {
                $mail->addReplyTo($replyTo);
            }
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlBody;
            
            $mail->send();
            return true;
        } catch (Exception $e) {
            throw new Exception("PHPMailer Error: {$mail->ErrorInfo}");
        }
    }
    
    private function sendWithNativeMail($to, $subject, $htmlBody, $replyTo = null) {
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=UTF-8';
        $headers[] = 'From: Disrupt Inc <' . SMTP_USER . '>';
        if ($replyTo) {
            $headers[] = 'Reply-To: ' . $replyTo;
        }
        
        $result = mail($to, $subject, $htmlBody, implode("\r\n", $headers));
        
        if (!$result) {
            throw new Exception('Failed to send email using native mail function');
        }
        
        return true;
    }
    
    private function sendEmail($to, $subject, $htmlBody, $replyTo = null) {
        if ($this->usePHPMailer && isSmtpConfigured()) {
            return $this->sendWithPHPMailer($to, $subject, $htmlBody, $replyTo);
        } else {
            return $this->sendWithNativeMail($to, $subject, $htmlBody, $replyTo);
        }
    }
    
    public function sendEmails($contactData) {
        $name = $contactData['name'];
        $email = $contactData['email'];
        $company = $contactData['company'];
        $message = $contactData['message'];
        
        // If SMTP is not configured, run in test mode
        if (!isSmtpConfigured()) {
            $this->logTestModeEmails($name, $email, $company, $message);
            return [
                'success' => true,
                'message' => 'Email sent successfully (TEST MODE)',
                'testMode' => true
            ];
        }
        
        try {
            // Create email templates
            $userTemplate = createUserConfirmationEmail($name, $company);
            $teamTemplate = createNotificationEmail($name, $email, $company, $message);
            
            // Send user confirmation email
            $this->sendEmail(
                $email,
                $userTemplate['subject'],
                $userTemplate['html']
            );
            
            // Send team notification email
            $this->sendEmail(
                TEAM_EMAIL,
                $teamTemplate['subject'],
                $teamTemplate['html'],
                $email
            );
            
            return [
                'success' => true,
                'message' => 'Email sent successfully'
            ];
            
        } catch (Exception $e) {
            error_log('Email sending error: ' . $e->getMessage());
            throw $e;
        }
    }
}

// Try to include PHPMailer if it exists
if (file_exists('vendor/autoload.php')) {
    require_once 'vendor/autoload.php';
} elseif (file_exists('../vendor/autoload.php')) {
    require_once '../vendor/autoload.php';
} elseif (file_exists('phpmailer/src/PHPMailer.php')) {
    require_once 'phpmailer/src/Exception.php';
    require_once 'phpmailer/src/PHPMailer.php';
    require_once 'phpmailer/src/SMTP.php';
}
?>