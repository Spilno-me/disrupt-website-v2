<?php
function escapeHtml($unsafe) {
    if (!is_string($unsafe)) {
        return $unsafe;
    }
    return htmlspecialchars($unsafe, ENT_QUOTES, 'UTF-8');
}

function getBaseStyles() {
    return "
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
    ";
}

function getUserConfirmationStyles() {
    return getBaseStyles() . "
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
        }
        .content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
        }
        .footer { 
            text-align: center; 
            margin-top: 20px; 
            color: #666; 
            font-size: 14px; 
        }
    ";
}

function getNotificationStyles() {
    return getBaseStyles() . "
        .header { 
            background: #2D3142; 
            color: white; 
            padding: 20px; 
            border-radius: 10px 10px 0 0; 
        }
        .content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
        }
        .field { 
            margin-bottom: 15px; 
        }
        .label { 
            font-weight: bold; 
            color: #2D3142; 
        }
        .message-box { 
            background: white; 
            padding: 15px; 
            border-radius: 5px; 
            margin-top: 10px; 
        }
    ";
}

function createHtmlTemplate($styles, $content) {
    return "
        <html>
            <head>
                <style>$styles</style>
            </head>
            <body>
                <div class=\"container\">
                    $content
                </div>
            </body>
        </html>
    ";
}

function createUserConfirmationEmail($name, $company) {
    $safeName = escapeHtml($name) ?: 'there';
    $safeCompany = escapeHtml($company);
    
    $content = "
        <div class=\"header\">
            <h1>Thank you for reaching out!</h1>
        </div>
        <div class=\"content\">
            <p>Hi $safeName,</p>
            <p>Thank you for your interest in Disrupt Inc. We've received your message and will get back to you within 24 hours.</p>
            <p>Our team is excited to learn more about $safeCompany and explore how we can help you achieve more with intelligent automation.</p>
            <p>Best regards,<br>The Disrupt Team</p>
        </div>
        <div class=\"footer\">
            <p>© 2025 Disrupt Inc. | <a href=\"https://disruptinc.io\">disruptinc.io</a></p>
        </div>
    ";
    
    return [
        'subject' => 'Thank you for contacting Disrupt Software Inc.',
        'html' => createHtmlTemplate(getUserConfirmationStyles(), $content)
    ];
}

function createNotificationEmail($name, $email, $company, $message) {
    $safeName = escapeHtml($name) ?: 'Not provided';
    $safeEmail = escapeHtml($email);
    $safeCompany = escapeHtml($company);
    $safeMessage = escapeHtml($message) ?: 'No message provided';
    
    $content = "
        <div class=\"header\">
            <h2>Disrupt Website - Form Submission</h2>
        </div>
        <div class=\"content\">
            <div class=\"field\">
                <span class=\"label\">Name:</span> $safeName
            </div>
            <div class=\"field\">
                <span class=\"label\">Email:</span> $safeEmail
            </div>
            <div class=\"field\">
                <span class=\"label\">Company:</span> $safeCompany
            </div>
            <div class=\"field\">
                <span class=\"label\">Message:</span>
                <div class=\"message-box\">$safeMessage</div>
            </div>
        </div>
    ";
    
    return [
        'subject' => "New contact form submission from $safeCompany",
        'html' => createHtmlTemplate(getNotificationStyles(), $content)
    ];
}
?>