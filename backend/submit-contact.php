<?php
// Enable CORS for your domain (replace with your actual domain)
header('Access-Control-Allow-Origin: *'); // Change * to your domain for security
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit();
}

// Validate required fields
$requiredFields = ['name', 'email', 'contactMessage'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize input
$name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars($data['contactMessage'], ENT_QUOTES, 'UTF-8');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Prepare email content
$to = 'jrhamilton0929@gmail.com';
$subject = 'Website Inquiry - Contact Form Submission';

// Create detailed email body
$emailBody = "New contact form submission from your website:\n\n";
$emailBody .= "Name: $name\n";
$emailBody .= "Email: $email\n";

// Optional fields
if (!empty($data['contactCompany'])) {
    $emailBody .= "Company: " . htmlspecialchars($data['contactCompany'], ENT_QUOTES, 'UTF-8') . "\n";
}
if (!empty($data['contactPhone'])) {
    $emailBody .= "Phone: " . htmlspecialchars($data['contactPhone'], ENT_QUOTES, 'UTF-8') . "\n";
}
if (!empty($data['projectType'])) {
    $emailBody .= "Project Type: " . htmlspecialchars($data['projectType'], ENT_QUOTES, 'UTF-8') . "\n";
}
if (!empty($data['budget'])) {
    $emailBody .= "Budget: " . htmlspecialchars($data['budget'], ENT_QUOTES, 'UTF-8') . "\n";
}
if (!empty($data['timeline'])) {
    $emailBody .= "Timeline: " . htmlspecialchars($data['timeline'], ENT_QUOTES, 'UTF-8') . "\n";
}
if (!empty($data['inspirationUrl'])) {
    $emailBody .= "Inspiration URL: " . htmlspecialchars($data['inspirationUrl'], ENT_QUOTES, 'UTF-8') . "\n";
}

$emailBody .= "\nMessage:\n$message\n\n";

// Technical details
$emailBody .= "---\n";
$emailBody .= "Submission Details:\n";
$emailBody .= "Time: " . ($data['_timestamp'] ?? date('c')) . "\n";
$emailBody .= "Page: " . ($data['_page'] ?? 'Unknown') . "\n";
$emailBody .= "IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

// Email headers
$headers = [
    'From: noreply@' . $_SERVER['HTTP_HOST'],
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
if (mail($to, $subject, $emailBody, implode("\r\n", $headers))) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email'
    ]);
}
?>