// Navigation handling
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get section to show
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Handle hash navigation
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    if (targetNav) {
        targetNav.classList.add('active');
    }
    
    // Update URL hash
    window.location.hash = sectionId;
}

// Quick action functions
function clearCache() {
    if (confirm('Are you sure you want to clear the cache?')) {
        alert('🗑️ Cache cleared successfully!');
        // Add actual cache clearing logic here
    }
}

function backupWebsite() {
    if (confirm('Create a backup of the entire website?')) {
        alert('💾 Backup initiated! This may take a few moments...');
        // Add actual backup logic here
    }
}

// Auto-hide alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        }, 5000);
    });
});

// Confirmation for maintenance mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const maintenanceForm = document.querySelector('form[name="toggle_maintenance"]');
    if (maintenanceForm) {
        maintenanceForm.addEventListener('submit', function(e) {
            const checkbox = this.querySelector('input[name="maintenance_enabled"]');
            const action = checkbox.checked ? 'enable' : 'disable';
            
            if (!confirm(`Are you sure you want to ${action} maintenance mode?`)) {
                e.preventDefault();
            }
        });
    }
});

// Real-time preview for maintenance message
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.querySelector('textarea[name="maintenance_message"]');
    const emailInput = document.querySelector('input[name="contact_email"]');
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            console.log('Message updated:', this.value);
            // Add live preview functionality here
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            console.log('Email updated:', this.value);
            // Add live preview functionality here
        });
    }
});

// Dashboard stats refresh
function refreshStats() {
    // Add AJAX call to refresh stats without page reload
    console.log('Refreshing stats...');
    location.reload();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: Search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        alert('Search functionality coming soon!');
    }
    
    // Ctrl/Cmd + M: Toggle maintenance
    if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        showSection('maintenance');
    }
    
    // Ctrl/Cmd + D: Dashboard
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        showSection('dashboard');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading indicator
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Add CSS for loading overlay
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('🔧 Gottlich Admin Panel Loaded');
console.log('💡 Keyboard shortcuts:');
console.log('  - Ctrl/Cmd + D: Dashboard');
console.log('  - Ctrl/Cmd + M: Maintenance Mode');
console.log('  - Ctrl/Cmd + K: Search (coming soon)');
