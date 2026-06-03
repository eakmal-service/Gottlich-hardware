<?php
// Contact form handler for Gottlich website
header('Content-Type: text/html; charset=UTF-8');

// Configuration
define('RECIPIENT', 'gujaratsunmicasurat@gmail.com');
define('SITE_NAME', 'Gottlich Hardware');

// Input sanitization function
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Validate email format
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Main form processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $name = isset($_POST['name']) ? sanitize($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize($_POST['message']) : '';
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!isValidEmail($email)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    if (empty($subject)) {
        $errors[] = 'Subject is required';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    // If no errors, send email
    if (empty($errors)) {
        $to = RECIPIENT;
        $email_subject = SITE_NAME . " - Contact Form: " . $subject;
        
        // Create email body
        $email_body = "New contact form submission from " . SITE_NAME . " website\n\n";
        $email_body .= "Name: " . $name . "\n";
        $email_body .= "Email: " . $email . "\n";
        $email_body .= "Subject: " . $subject . "\n";
        $email_body .= "Message:\n" . $message . "\n\n";
        $email_body .= "Sent from: " . $_SERVER['HTTP_HOST'] . "\n";
        $email_body .= "Date: " . date('Y-m-d H:i:s') . "\n";
        
        // Email headers
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Attempt to send email
        if (mail($to, $email_subject, $email_body, $headers)) {
            $success_message = "Thank you, " . $name . "! Your message has been sent successfully. We'll get back to you soon.";
        } else {
            $error_message = "Sorry, there was a problem sending your message. Please try again later or contact us directly.";
        }
    } else {
        $error_message = "Please correct the following errors: " . implode(', ', $errors);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Response - Gottlich</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .message-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
        }
        .success {
            color: #28a745;
            border-left: 4px solid #28a745;
            padding-left: 20px;
        }
        .error {
            color: #dc3545;
            border-left: 4px solid #dc3545;
            padding-left: 20px;
        }
        .back-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #AF6A4C;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .back-button:hover {
            background-color: #8B543C;
        }
        .logo {
            height: 60px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="message-container">
        <img src="Gottlich Logo.svg" alt="Gottlich Logo" class="logo">
        
        <?php if (isset($success_message)): ?>
            <div class="success">
                <h2>Message Sent Successfully!</h2>
                <p><?php echo $success_message; ?></p>
            </div>
        <?php elseif (isset($error_message)): ?>
            <div class="error">
                <h2>Error</h2>
                <p><?php echo $error_message; ?></p>
            </div>
        <?php else: ?>
            <div class="error">
                <h2>Invalid Request</h2>
                <p>Please use the contact form to send us a message.</p>
            </div>
        <?php endif; ?>
        
        <a href="index.html" class="back-button">← Back to Website</a>
    </div>
    
    <script>
        // Auto redirect after 5 seconds
        setTimeout(function() {
            window.location.href = 'index.html#contact';
        }, 5000);
    </script>
</body>
</html>
