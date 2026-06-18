<?php
session_start();

// Admin credentials (change these!)
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'Gottlich@2024'); // Change this password!

// File paths
define('HTACCESS_FILE', '../.htaccess');
define('MAINTENANCE_FILE', '../maintenance.html');
define('SETTINGS_FILE', 'settings.json');

// Check if logged in
if (!isset($_SESSION['admin_logged_in'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
        if ($_POST['username'] === ADMIN_USERNAME && $_POST['password'] === ADMIN_PASSWORD) {
            $_SESSION['admin_logged_in'] = true;
            header('Location: index.php');
            exit;
        } else {
            $error = 'Invalid credentials!';
        }
    }
    
    // Show login page
    include 'login.php';
    exit;
}

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle maintenance mode toggle
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['toggle_maintenance'])) {
    $maintenanceEnabled = isset($_POST['maintenance_enabled']) ? true : false;
    toggleMaintenanceMode($maintenanceEnabled);
    $success = $maintenanceEnabled ? 'Maintenance mode enabled!' : 'Maintenance mode disabled!';
}

// Handle maintenance message update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_message'])) {
    $message = $_POST['maintenance_message'];
    $email = $_POST['contact_email'];
    updateMaintenanceMessage($message, $email);
    $success = 'Maintenance message updated!';
}

// Get current status
$maintenanceStatus = isMaintenanceModeEnabled();
$siteStats = getSiteStats();

function isMaintenanceModeEnabled() {
    if (!file_exists(HTACCESS_FILE)) return false;
    $content = file_get_contents(HTACCESS_FILE);
    return strpos($content, '# MAINTENANCE MODE - ENABLED') !== false;
}

function toggleMaintenanceMode($enable) {
    $htaccess = file_get_contents(HTACCESS_FILE);
    
    if ($enable) {
        // Enable maintenance mode
        $maintenanceRules = "\n# ============================================\n";
        $maintenanceRules .= "# MAINTENANCE MODE - ENABLED\n";
        $maintenanceRules .= "# ============================================\n";
        $maintenanceRules .= "# Redirect all requests to maintenance page\n";
        $maintenanceRules .= "RewriteCond %{REQUEST_URI} !^/maintenance\\.html$\n";
        $maintenanceRules .= "RewriteCond %{REQUEST_URI} !^/admin/\n";
        $maintenanceRules .= "RewriteCond %{REQUEST_URI} !\\.(css|js|png|jpg|jpeg|gif|svg|ico)$\n";
        $maintenanceRules .= "RewriteRule ^(.*)$ /maintenance.html [L,R=503]\n\n";
        $maintenanceRules .= "# Return 503 Service Unavailable header\n";
        $maintenanceRules .= "<IfModule mod_headers.c>\n";
        $maintenanceRules .= "    Header always set Retry-After \"3600\"\n";
        $maintenanceRules .= "</IfModule>\n";
        $maintenanceRules .= "# ============================================\n\n";
        
        // Remove old maintenance mode if exists
        $htaccess = preg_replace('/# ============================================\s*#\s*MAINTENANCE MODE.*?# ============================================\s*/s', '', $htaccess);
        
        // Add after RewriteEngine On
        $htaccess = preg_replace('/(RewriteEngine On)/i', "$1\n" . $maintenanceRules, $htaccess, 1);
    } else {
        // Disable maintenance mode
        $htaccess = preg_replace('/# ============================================\s*#\s*MAINTENANCE MODE.*?# ============================================\s*/s', '', $htaccess);
    }
    
    file_put_contents(HTACCESS_FILE, $htaccess);
}

function updateMaintenanceMessage($message, $email) {
    $html = file_get_contents(MAINTENANCE_FILE);
    $html = preg_replace('/<p><strong>.*?<\/strong><\/p>/', '<p><strong>' . htmlspecialchars($message) . '</strong></p>', $html);
    $html = preg_replace('/mailto:.*?"/', 'mailto:' . htmlspecialchars($email) . '"', $html);
    $html = preg_replace('/Email:.*?<\/a>/', 'Email: <a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a>', $html);
    file_put_contents(MAINTENANCE_FILE, $html);
}

function getSiteStats() {
    $stats = [];
    
    // Get file count
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('..'));
    $fileCount = 0;
    $totalSize = 0;
    foreach ($files as $file) {
        if ($file->isFile()) {
            $fileCount++;
            $totalSize += $file->getSize();
        }
    }
    
    $stats['file_count'] = $fileCount;
    $stats['total_size'] = formatBytes($totalSize);
    $stats['last_modified'] = date('Y-m-d H:i:s', filemtime('../index.html'));
    
    return $stats;
}

function formatBytes($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gottlich Hardware - Admin Panel</title>
    <link rel="stylesheet" href="admin-style.css">
</head>
<body>
    <div class="admin-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <h2>🔧 Gottlich Admin</h2>
            </div>
            <nav class="nav-menu">
                <a href="#dashboard" class="nav-item active" data-section="dashboard">
                    <span class="icon">📊</span>
                    Dashboard
                </a>
                <a href="#maintenance" class="nav-item" data-section="maintenance">
                    <span class="icon">🔨</span>
                    Maintenance Mode
                </a>
                <a href="#files" class="nav-item" data-section="files">
                    <span class="icon">📁</span>
                    File Manager
                </a>
                <a href="#settings" class="nav-item" data-section="settings">
                    <span class="icon">⚙️</span>
                    Settings
                </a>
                <a href="#logs" class="nav-item" data-section="logs">
                    <span class="icon">📋</span>
                    Activity Logs
                </a>
            </nav>
            <div class="sidebar-footer">
                <a href="?logout" class="logout-btn">
                    <span class="icon">🚪</span>
                    Logout
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <header class="header">
                <h1>Admin Dashboard</h1>
                <div class="header-actions">
                    <a href="../index.html" target="_blank" class="btn btn-secondary">
                        🌐 View Website
                    </a>
                    <span class="user-info">👤 Admin</span>
                </div>
            </header>

            <?php if (isset($success)): ?>
                <div class="alert alert-success"><?= $success ?></div>
            <?php endif; ?>

            <!-- Dashboard Section -->
            <section id="dashboard" class="content-section active">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">🌐</div>
                        <div class="stat-content">
                            <h3>Website Status</h3>
                            <p class="stat-value <?= $maintenanceStatus ? 'status-offline' : 'status-online' ?>">
                                <?= $maintenanceStatus ? '🔴 Maintenance' : '🟢 Live' ?>
                            </p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📁</div>
                        <div class="stat-content">
                            <h3>Total Files</h3>
                            <p class="stat-value"><?= $siteStats['file_count'] ?></p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">💾</div>
                        <div class="stat-content">
                            <h3>Total Size</h3>
                            <p class="stat-value"><?= $siteStats['total_size'] ?></p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">🕐</div>
                        <div class="stat-content">
                            <h3>Last Modified</h3>
                            <p class="stat-value"><?= $siteStats['last_modified'] ?></p>
                        </div>
                    </div>
                </div>

                <div class="quick-actions">
                    <h2>Quick Actions</h2>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="showSection('maintenance')">
                            🔨 Toggle Maintenance
                        </button>
                        <button class="action-btn" onclick="showSection('files')">
                            📁 Manage Files
                        </button>
                        <button class="action-btn" onclick="clearCache()">
                            🗑️ Clear Cache
                        </button>
                        <button class="action-btn" onclick="backupWebsite()">
                            💾 Backup Website
                        </button>
                    </div>
                </div>
            </section>

            <!-- Maintenance Section -->
            <section id="maintenance" class="content-section">
                <h2>Maintenance Mode Control</h2>
                
                <div class="maintenance-panel">
                    <div class="panel-header">
                        <h3>Current Status: 
                            <span class="<?= $maintenanceStatus ? 'status-offline' : 'status-online' ?>">
                                <?= $maintenanceStatus ? 'ENABLED' : 'DISABLED' ?>
                            </span>
                        </h3>
                    </div>
                    
                    <form method="POST" class="form">
                        <div class="form-group">
                            <label class="toggle-switch">
                                <input type="checkbox" name="maintenance_enabled" <?= $maintenanceStatus ? 'checked' : '' ?>>
                                <span class="toggle-slider"></span>
                            </label>
                            <span class="toggle-label">
                                <?= $maintenanceStatus ? 'Maintenance Mode is ON' : 'Maintenance Mode is OFF' ?>
                            </span>
                        </div>
                        
                        <button type="submit" name="toggle_maintenance" class="btn btn-primary">
                            💾 Save Changes
                        </button>
                    </form>
                </div>

                <div class="maintenance-panel">
                    <h3>Customize Maintenance Message</h3>
                    <form method="POST" class="form">
                        <div class="form-group">
                            <label>Maintenance Message</label>
                            <textarea name="maintenance_message" rows="3" class="form-control">We're currently performing scheduled maintenance</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Contact Email</label>
                            <input type="email" name="contact_email" class="form-control" value="info@gottlichhardware.com">
                        </div>
                        
                        <button type="submit" name="update_message" class="btn btn-primary">
                            ✏️ Update Message
                        </button>
                    </form>
                </div>
            </section>

            <!-- Files Section -->
            <section id="files" class="content-section">
                <h2>File Manager</h2>
                <div class="file-manager">
                    <p>📁 File manager coming soon...</p>
                    <p>For now, use Hostinger File Manager or FTP</p>
                </div>
            </section>

            <!-- Settings Section -->
            <section id="settings" class="content-section">
                <h2>Settings</h2>
                <div class="settings-panel">
                    <h3>Admin Settings</h3>
                    <p>⚙️ Settings panel coming soon...</p>
                </div>
            </section>

            <!-- Logs Section -->
            <section id="logs" class="content-section">
                <h2>Activity Logs</h2>
                <div class="logs-panel">
                    <p>📋 Activity logs coming soon...</p>
                </div>
            </section>
        </main>
    </div>

    <script src="admin-script.js"></script>
</body>
</html>
