// Advanced Media Protection System for Gottlich Website
// This script implements multiple layers of protection for images and videos

class MediaProtection {
    constructor() {
        this.init();
    }

    init() {
        this.disableRightClick();
        this.disableKeyboardShortcuts();
        this.disableDragAndDrop();
        this.disableTextSelection();
        this.addWatermarks();
        this.protectImages();
        this.protectVideos();
        this.addOverlayProtection();
        this.detectDevTools();
        this.addCopyProtection();
    }

    // Disable right-click context menu
    disableRightClick() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showProtectionMessage();
            return false;
        });

        // Disable right-click on images specifically
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    return false;
                });
            });
        });
    }

    // Disable keyboard shortcuts for saving/copying
    disableKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Disable Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.showProtectionMessage();
                return false;
            }
            
            // Disable Ctrl+A (Select All)
            if (e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+C (Copy)
            if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+V (Paste)
            if (e.ctrlKey && e.key === 'v') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+X (Cut)
            if (e.ctrlKey && e.key === 'x') {
                e.preventDefault();
                return false;
            }
            
            // Disable F12 (Developer Tools)
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                return false;
            }
        });
    }

    // Disable drag and drop for images
    disableDragAndDrop() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.draggable = false;
                img.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                    return false;
                });
            });
        });
    }

    // Disable text selection
    disableTextSelection() {
        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
                e.preventDefault();
                return false;
            }
        });
    }

    // Add transparent watermarks to images
    addWatermarks() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                this.addWatermarkToImage(img);
            });
        });
    }

    addWatermarkToImage(img) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: relative;
            display: inline-block;
            width: 100%;
            height: 100%;
        `;

        // Wrap image in container
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);

        // Create watermark overlay
        const watermark = document.createElement('div');
        watermark.innerHTML = 'GOTTLICH';
        watermark.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 24px;
            font-weight: bold;
            color: rgba(175, 106, 76, 0.3);
            pointer-events: none;
            z-index: 10;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        `;

        container.appendChild(watermark);
    }

    // Protect images with additional layers
    protectImages() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Add protection attributes
                img.setAttribute('oncontextmenu', 'return false;');
                img.setAttribute('onselectstart', 'return false;');
                img.setAttribute('ondragstart', 'return false;');
                
                // Add CSS protection
                img.style.cssText += `
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-touch-callout: none;
                    -webkit-user-drag: none;
                    pointer-events: auto;
                `;

                // Create invisible overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    z-index: 5;
                    pointer-events: auto;
                `;

                // Make parent relative if not already
                if (img.parentNode.style.position !== 'relative') {
                    img.parentNode.style.position = 'relative';
                }

                img.parentNode.appendChild(overlay);
            });
        });
    }

    // Protect videos
    protectVideos() {
        document.addEventListener('DOMContentLoaded', () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                // Disable right-click on videos
                video.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    return false;
                });

                // Disable video controls that allow downloading
                video.controlsList = 'nodownload nofullscreen noremoteplayback';
                
                // Add protection attributes
                video.setAttribute('oncontextmenu', 'return false;');
                video.setAttribute('onselectstart', 'return false;');
                video.setAttribute('ondragstart', 'return false;');
                
                // Add CSS protection
                video.style.cssText += `
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-touch-callout: none;
                    pointer-events: auto;
                `;
            });
        });
    }

    // Add overlay protection for media elements
    addOverlayProtection() {
        const style = document.createElement('style');
        style.textContent = `
            .media-container {
                position: relative;
                display: inline-block;
            }
            
            .media-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                z-index: 999;
                pointer-events: none;
            }
            
            .media-container img,
            .media-container video {
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Detect developer tools
    detectDevTools() {
        let devtools = {
            open: false,
            orientation: null
        };

        const threshold = 160;

        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.handleDevToolsOpen();
                }
            } else {
                devtools.open = false;
            }
        }, 500);

        // Alternative detection method
        let element = new Image();
        Object.defineProperty(element, 'id', {
            get: () => {
                this.handleDevToolsOpen();
            }
        });
        console.log(element);
    }

    handleDevToolsOpen() {
        // Blur the page content
        document.body.style.filter = 'blur(10px)';
        
        // Show warning message
        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                font-family: Arial, sans-serif;
                text-align: center;
            ">
                <div>
                    <h2>⚠️ Content Protected</h2>
                    <p>This content is protected by copyright.<br>
                    Please close developer tools to continue.</p>
                    <p style="color: #AF6A4C;">© Gottlich Hardware Solutions</p>
                </div>
            </div>
        `;
        document.body.appendChild(warning);
    }

    // Additional copy protection
    addCopyProtection() {
        // Disable print screen (limited effectiveness)
        document.addEventListener('keyup', (e) => {
            if (e.key === 'PrintScreen') {
                navigator.clipboard.writeText('');
                this.showProtectionMessage();
            }
        });

        // Clear clipboard periodically
        setInterval(() => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText('').catch(() => {});
            }
        }, 1000);
    }

    // Show protection message
    showProtectionMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #AF6A4C;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 99999;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease;
            ">
                🔒 Content is protected by copyright
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Initialize protection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MediaProtection();
});

// Additional protection for dynamically loaded content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
                const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
                const videos = node.querySelectorAll ? node.querySelectorAll('video') : [];
                
                [...images, ...videos].forEach(media => {
                    // Apply protection to new media elements
                    media.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        return false;
                    });
                    
                    media.draggable = false;
                    media.style.cssText += `
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        -webkit-touch-callout: none;
                        pointer-events: auto;
                    `;
                });
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});