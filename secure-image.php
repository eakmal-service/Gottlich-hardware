<?php
/**
 * Secure Image Delivery System for Gottlich Website
 * This script serves images with additional protection layers
 */

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Disable caching for sensitive images
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');

class SecureImageHandler {
    private $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    private $maxFileSize = 5 * 1024 * 1024; // 5MB
    private $watermarkText = 'GOTTLICH';
    private $imageDirectory = './images/';
    
    public function __construct() {
        // Validate request
        if (!$this->isValidRequest()) {
            $this->sendError(403, 'Access Denied');
        }
    }
    
    private function isValidRequest() {
        // Check if request is from same domain
        $referer = $_SERVER['HTTP_REFERER'] ?? '';
        $host = $_SERVER['HTTP_HOST'] ?? '';
        
        if (empty($referer) || strpos($referer, $host) === false) {
            return false;
        }
        
        // Check user agent (basic bot detection)
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        $botPatterns = [
            'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl'
        ];
        
        foreach ($botPatterns as $pattern) {
            if (stripos($userAgent, $pattern) !== false) {
                return false;
            }
        }
        
        return true;
    }
    
    public function serveImage($filename) {
        // Sanitize filename
        $filename = $this->sanitizeFilename($filename);
        
        if (!$filename) {
            $this->sendError(400, 'Invalid filename');
        }
        
        $filepath = $this->imageDirectory . $filename;
        
        // Check if file exists and is readable
        if (!file_exists($filepath) || !is_readable($filepath)) {
            $this->sendError(404, 'Image not found');
        }
        
        // Validate file extension
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (!in_array($extension, $this->allowedExtensions)) {
            $this->sendError(400, 'Invalid file type');
        }
        
        // Check file size
        $filesize = filesize($filepath);
        if ($filesize > $this->maxFileSize) {
            $this->sendError(400, 'File too large');
        }
        
        // Get image info
        $imageInfo = getimagesize($filepath);
        if (!$imageInfo) {
            $this->sendError(400, 'Invalid image file');
        }
        
        // Set appropriate content type
        header('Content-Type: ' . $imageInfo['mime']);
        header('Content-Length: ' . $filesize);
        
        // Add watermark and serve
        $this->serveProtectedImage($filepath, $imageInfo);
    }
    
    private function sanitizeFilename($filename) {
        // Remove any path traversal attempts
        $filename = basename($filename);
        
        // Remove any non-alphanumeric characters except dots and hyphens
        $filename = preg_replace('/[^a-zA-Z0-9.\-_]/', '', $filename);
        
        // Prevent double extensions
        $filename = preg_replace('/\.+/', '.', $filename);
        
        return $filename;
    }
    
    private function serveProtectedImage($filepath, $imageInfo) {
        $mimeType = $imageInfo['mime'];
        
        // For SVG files, serve directly with protection headers
        if ($mimeType === 'image/svg+xml') {
            $this->serveSVG($filepath);
            return;
        }
        
        // Create image resource based on type
        switch ($mimeType) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($filepath);
                break;
            case 'image/png':
                $image = imagecreatefrompng($filepath);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($filepath);
                break;
            case 'image/webp':
                $image = imagecreatefromwebp($filepath);
                break;
            default:
                $this->sendError(400, 'Unsupported image type');
        }
        
        if (!$image) {
            $this->sendError(500, 'Failed to process image');
        }
        
        // Add watermark
        $this->addWatermark($image);
        
        // Output image
        switch ($mimeType) {
            case 'image/jpeg':
                imagejpeg($image, null, 85);
                break;
            case 'image/png':
                imagepng($image);
                break;
            case 'image/gif':
                imagegif($image);
                break;
            case 'image/webp':
                imagewebp($image);
                break;
        }
        
        // Clean up
        imagedestroy($image);
    }
    
    private function addWatermark($image) {
        $width = imagesx($image);
        $height = imagesy($image);
        
        // Create watermark color (semi-transparent)
        $watermarkColor = imagecolorallocatealpha($image, 175, 106, 76, 100);
        
        // Calculate font size based on image size
        $fontSize = max(12, min($width, $height) / 20);
        
        // Calculate text position (center)
        $textBox = imagettfbbox($fontSize, -45, $this->getFont(), $this->watermarkText);
        $textWidth = $textBox[4] - $textBox[0];
        $textHeight = $textBox[1] - $textBox[5];
        
        $x = ($width - $textWidth) / 2;
        $y = ($height + $textHeight) / 2;
        
        // Add multiple watermarks for better protection
        $positions = [
            [$x, $y], // Center
            [$width * 0.2, $height * 0.2], // Top-left
            [$width * 0.8, $height * 0.2], // Top-right
            [$width * 0.2, $height * 0.8], // Bottom-left
            [$width * 0.8, $height * 0.8], // Bottom-right
        ];
        
        foreach ($positions as $pos) {
            imagettftext($image, $fontSize, -45, $pos[0], $pos[1], $watermarkColor, $this->getFont(), $this->watermarkText);
        }
    }
    
    private function getFont() {
        // Use built-in font if TTF not available
        return __DIR__ . '/fonts/arial.ttf';
    }
    
    private function serveSVG($filepath) {
        $svgContent = file_get_contents($filepath);
        
        // Add watermark to SVG
        $watermark = '<text x="50%" y="50%" font-family="Arial" font-size="24" fill="rgba(175,106,76,0.3)" text-anchor="middle" transform="rotate(-45 50 50)">GOTTLICH</text>';
        
        // Insert watermark before closing svg tag
        $svgContent = str_replace('</svg>', $watermark . '</svg>', $svgContent);
        
        echo $svgContent;
    }
    
    private function sendError($code, $message) {
        http_response_code($code);
        
        // Send a 1x1 transparent pixel instead of error message
        header('Content-Type: image/png');
        
        $image = imagecreate(1, 1);
        $transparent = imagecolorallocatealpha($image, 0, 0, 0, 127);
        imagefill($image, 0, 0, $transparent);
        imagesavealpha($image, true);
        
        imagepng($image);
        imagedestroy($image);
        
        exit;
    }
}

// Handle the request
if (isset($_GET['img'])) {
    $handler = new SecureImageHandler();
    $handler->serveImage($_GET['img']);
} else {
    http_response_code(400);
    exit('Bad Request');
}
?>