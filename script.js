// Enhanced website with 3D effects and animations
document.addEventListener('DOMContentLoaded', function () {

    // Initialize professional 3D effects
    init3DEffects();

    // Create floating elements
    createFloatingElements();

    // Add parallax scrolling effect
    addParallaxEffect();

    // Add 3D scroll animations
    add3DScrollAnimations();

    // Add comprehensive directional hover effects
    console.log('Initializing directional hover effects...');
    
    // Add dynamic CSS for directional animations
    addDirectionalCSS();
    
    // Initialize directional hover effect
    setTimeout(() => {
        addDirectionalHoverEffect();
        console.log('All directional hover effects ready!');
    }, 100);

    // Initialize hamburger menu
    initHamburgerMenu();

    // Initialize hero slider
    initHeroSlider();
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const submitButton = this.querySelector('button[type="submit"]');

            // Disable submit button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'SENDING...';

            // Re-enable button after 3 seconds (for demo purposes)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'SEND MESSAGE';
            }, 3000);
        });
    }

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #AF6A4C;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to product items
    const productItems = document.querySelectorAll('.product-item, .popular-item, .latest-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });



    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Create floating background elements
function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';

    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 4 + 4) + 's';
        floatingContainer.appendChild(element);
    }

    document.body.appendChild(floatingContainer);
}

// Add parallax scrolling effect
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-section, .products-section');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
            const parallaxBg = document.createElement('div');
            parallaxBg.className = 'parallax-bg';
            if (!element.querySelector('.parallax-bg')) {
                element.appendChild(parallaxBg);
            }

            const bg = element.querySelector('.parallax-bg');
            if (bg) {
                bg.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// COMPREHENSIVE DIRECTIONAL HOVER EFFECT
function addDirectionalHoverEffect() {
    const allCards = document.querySelectorAll('.product-item, .popular-item, .latest-item');
    
    if (allCards.length === 0) {
        console.log('No cards found! Retrying...');
        setTimeout(addDirectionalHoverEffect, 500);
        return;
    }
    
    console.log('Setting up directional hover effect for', allCards.length, 'cards');

    allCards.forEach((card, index) => {
        let entryDirection = '';
        
        // Mouse enter event - detect direction and animate overlay
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate distances to each edge
            const distanceTop = mouseY;
            const distanceBottom = rect.height - mouseY;
            const distanceLeft = mouseX;
            const distanceRight = rect.width - mouseX;
            
            // Find closest edge
            const minDistance = Math.min(distanceTop, distanceBottom, distanceLeft, distanceRight);
            
            if (minDistance === distanceTop) entryDirection = 'top';
            else if (minDistance === distanceBottom) entryDirection = 'bottom';
            else if (minDistance === distanceLeft) entryDirection = 'left';
            else if (minDistance === distanceRight) entryDirection = 'right';
            
            // Get the overlay element
            const overlay = window.getComputedStyle(this, '::before');
            
            // Set initial position based on entry direction
            let initialTransform = '';
            switch(entryDirection) {
                case 'top':
                    initialTransform = 'translateY(-100%)';
                    break;
                case 'bottom':
                    initialTransform = 'translateY(100%)';
                    break;
                case 'left':
                    initialTransform = 'translateX(-100%)';
                    break;
                case 'right':
                    initialTransform = 'translateX(100%)';
                    break;
            }
            
            // Apply animation via CSS custom properties
            this.style.setProperty('--entry-direction', entryDirection);
            this.classList.add('hover-active');
        });
        
        // Mouse leave event - animate overlay out in same direction
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
            this.classList.add('hover-exit');
            
            // Remove exit class after animation
            setTimeout(() => {
                this.classList.remove('hover-exit');
            }, 400);
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // Simulate mouse enter from center for touch devices
            entryDirection = 'center';
            this.classList.add('hover-active');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('hover-active');
        });
    });
    
    console.log('Directional hover effect ready!');
}

// Enhanced CSS-based directional animations
function addDirectionalCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Directional hover states */
        .product-item.hover-active::before,
        .popular-item.hover-active::before,
        .latest-item.hover-active::before {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
        
        /* Entry animations based on direction */
        .product-item[style*="--entry-direction: top"]::before,
        .popular-item[style*="--entry-direction: top"]::before,
        .latest-item[style*="--entry-direction: top"]::before {
            transform: translateY(-100%);
        }
        
        .product-item[style*="--entry-direction: bottom"]::before,
        .popular-item[style*="--entry-direction: bottom"]::before,
        .latest-item[style*="--entry-direction: bottom"]::before {
            transform: translateY(100%);
        }
        
        .product-item[style*="--entry-direction: left"]::before,
        .popular-item[style*="--entry-direction: left"]::before,
        .latest-item[style*="--entry-direction: left"]::before {
            transform: translateX(-100%);
        }
        
        .product-item[style*="--entry-direction: right"]::before,
        .popular-item[style*="--entry-direction: right"]::before,
        .latest-item[style*="--entry-direction: right"]::before {
            transform: translateX(100%);
        }
        
        /* Exit animations */
        .hover-exit::before {
            opacity: 0 !important;
            transition: all 0.3s ease-in-out !important;
        }
        
        .hover-exit[style*="--entry-direction: top"]::before {
            transform: translateY(-100%) !important;
        }
        
        .hover-exit[style*="--entry-direction: bottom"]::before {
            transform: translateY(100%) !important;
        }
        
        .hover-exit[style*="--entry-direction: left"]::before {
            transform: translateX(-100%) !important;
        }
        
        .hover-exit[style*="--entry-direction: right"]::before {
            transform: translateX(100%) !important;
        }
        
        /* Mobile touch optimization */
        @media (max-width: 768px) {
            .product-item::before,
            .popular-item::before,
            .latest-item::before {
                transition: all 0.3s ease-in-out;
            }
            
            .product-item:hover,
            .popular-item:hover,
            .latest-item:hover {
                transform: translateY(-5px) scale(1.02);
            }
        }
        
        /* Smooth image scaling */
        .hover-active img {
            transform: scale(1.1) !important;
        }
        
        /* Enhanced text visibility */
        .hover-active::after {
            opacity: 1 !important;
            transform: translate(-50%, -50%) scale(1.1) !important;
        }
    `;
    document.head.appendChild(style);
}

// Add morphing shapes to sections
function addMorphingShapes() {
    const sections = document.querySelectorAll('.hero-section, .about-section, .products-section');

    sections.forEach((section, index) => {
        const shape = document.createElement('div');
        shape.className = 'morphing-shape';
        shape.style.top = Math.random() * 50 + '%';
        shape.style.right = Math.random() * 20 + '%';
        shape.style.animationDelay = index * 2 + 's';
        section.style.position = 'relative';
        section.appendChild(shape);
    });
}

// Enhanced scroll animations with 3D effects
function enhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0deg)';

                // Add stagger effect for grid items
                const gridItems = entry.target.querySelectorAll('.product-item, .popular-item, .latest-item');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) rotateX(0deg)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) rotateX(-10deg)';
        section.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(section);

        // Set initial state for grid items
        const gridItems = section.querySelectorAll('.product-item, .popular-item, .latest-item');
        gridItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) rotateX(-15deg)';
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

// Add particle effect on button clicks
function addParticleEffect(element) {
    const particles = 12;
    const colors = ['#AF6A4C', '#D4956B', '#8B543C'];

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = element.getBoundingClientRect();
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 100 + Math.random() * 50;

        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Enhanced button interactions
function enhanceButtonInteractions() {
    const buttons = document.querySelectorAll('.cta-button, button[type="submit"]');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            addParticleEffect(this);

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Add magnetic effect to interactive elements
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.cta-button, .nav a, .product-item');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Initialize all enhanced effects
addMorphingShapes();
enhancedScrollAnimations();
enhanceButtonInteractions();
addMagneticEffect();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth page transitions
function addPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                // Add transition effect
                document.body.style.transform = 'scale(0.98)';
                document.body.style.transition = 'transform 0.3s ease';

                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    document.body.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

addPageTransitions();

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Open mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.add('active');
        mobileNav.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add entrance animation to menu items
        mobileNavLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(50px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100 + 200);
        });
    });

    // Close mobile menu function
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Reset menu items
        mobileNavLinks.forEach(link => {
            link.style.transition = 'none';
            link.style.opacity = '';
            link.style.transform = '';
        });
    }

    // Close menu events
    mobileNavClose.addEventListener('click', closeMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Update active states
            document.querySelectorAll('.nav a, .mobile-nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
            document.querySelector(`.nav a[href="${targetId}"]`).classList.add('active');

            // Close menu and scroll to section
            closeMobileMenu();

            setTimeout(() => {
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Enhanced mobile menu animations
function addMobileMenuAnimations() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    mobileNavLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(15px) scale(1.05)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0) scale(1)';
        });
    });
}

addMobileMenuAnimations();

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;

    // Auto slide every 8 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 8000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;

        isTransitioning = true;

        // Add professional exit animation to current slide
        slides[currentSlide].classList.add('exiting');
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Prepare next slide for entrance
        slides[index].classList.add('entering');

        // Update current slide
        const previousSlide = currentSlide;
        currentSlide = index;

        // Complete transition after animation
        setTimeout(() => {
            // Clean up previous slide
            slides[previousSlide].classList.remove('exiting');
            slides[previousSlide].classList.add('prev');

            // Activate new slide
            slides[currentSlide].classList.remove('entering', 'prev', 'next');
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');

            // Clean up all transition classes
            slides.forEach(slide => {
                if (slide !== slides[currentSlide]) {
                    slide.classList.remove('prev', 'next', 'entering', 'exiting');
                }
            });

            isTransitioning = false;
        }, 1500); // Match CSS animation duration
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });

    // Initialize auto-slide
    startAutoSlide();

    // Preload images
    const imageUrls = [
        '01 - Edited.jpg',
        '02 - Edited.jpg',
        '03 - Edited.jpg',
        '04 - Edited.jpg',
        '05 - Edited.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
/
    / Product Page Functionality
function initProductPage() {
    initProductGallery();
    initSizeSelector();
    initProductPageNavigation();
}

// Product Gallery Functionality
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');

    if (!mainImage) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');

            // Get the image source
            const newImageSrc = this.getAttribute('data-image');

            // Add fade out effect
            mainImage.style.opacity = '0';

            // Change image after fade out
            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.style.opacity = '1';
            }, 200);
        });

        // Add hover effect
        thumbnail.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
            }
        });

        thumbnail.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Size Selector Functionality
function initSizeSelector() {
    const sizeButtons = document.querySelectorAll('.size-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get selected size
            const selectedSize = this.getAttribute('data-size');

            // Add visual feedback
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);

            console.log('Selected size:', selectedSize);
        });
    });
}

// Product Page Navigation
function initProductPageNavigation() {
    // Show product page when clicking on product items
    const productItems = document.querySelectorAll('.product-item');
    const productPage = document.getElementById('product-page');
    const mainSections = document.querySelectorAll('main > section:not(#product-page)');

    productItems.forEach(item => {
        item.addEventListener('click', function () {
            // Hide main sections
            mainSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show product page
            if (productPage) {
                productPage.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Add back button functionality
    const backButton = document.createElement('button');
    backButton.innerHTML = '← Back to Products';
    backButton.className = 'back-to-products-btn';
    backButton.style.cssText = `
        position: fixed;
        top: 120px;
        left: 20px;
        background: #AF6A4C;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        z-index: 1000;
        transition: all 0.3s ease;
        display: none;
    `;

    document.body.appendChild(backButton);

    backButton.addEventListener('click', function () {
        // Hide product page
        if (productPage) {
            productPage.style.display = 'none';
        }

        // Show main sections
        mainSections.forEach(section => {
            section.style.display = 'block';
        });

        // Hide back button
        this.style.display = 'none';

        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Show/hide back button based on product page visibility
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const target = mutation.target;
                if (target.id === 'product-page') {
                    if (target.style.display === 'block') {
                        backButton.style.display = 'block';
                    } else {
                        backButton.style.display = 'none';
                    }
                }
            }
        });
    });

    if (productPage) {
        observer.observe(productPage, { attributes: true });
    }
}

// Installation Button Functionality
function initInstallationButton() {
    const installationBtn = document.querySelector('.installation-btn');

    if (installationBtn) {
        installationBtn.addEventListener('click', function () {
            // Add click animation
            this.style.transform = 'translateY(-3px) scale(0.95)';

            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);

            // Show installation guide (placeholder)
            alert('Installation guide will be available soon!');
        });
    }
}

// Image zoom functionality
function initImageZoom() {
    const mainImage = document.querySelector('.main-image img');

    if (mainImage) {
        mainImage.addEventListener('click', function () {
            // Create modal for image zoom
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;

            const zoomedImage = document.createElement('img');
            zoomedImage.src = this.src;
            zoomedImage.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;

            modal.appendChild(zoomedImage);
            document.body.appendChild(modal);

            // Close modal on click
            modal.addEventListener('click', function () {
                document.body.removeChild(modal);
            });

            // Close modal on escape key
            const escapeHandler = function (e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        });
    }
}

// Initialize product page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initProductPage();
    initInstallationButton();
    initImageZoom();
});//
 Product page navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to product items
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            // Get product name from the item's text content
            const productText = this.querySelector('p').textContent.trim();
            
            // Map product names to their corresponding product keys
            const productKeyMap = {
                'SLIM TANDEM BOX': 'slim-tandem-box',
                'PULL-OUT': 'pull-out',
                'MAGIC CORNER': 'magic-corner',
                'SWING CORNER': 'swing-corner',
                'PANTRY UNIT': 'pantry-unit',
                'ROLLING SHUTTER': 'rolling-shutter',
                'WICKER BASKET': 'wicker-basket',
                'PVC CUTLERY': 'pvc-cutlery',
                'AUTO HINGES': 'auto-hinges',
                'TELESCOPIC CHANNEL': 'telescopic-channel',
                'QUADRO-SOFT CLOSING': 'quadro-soft-closing',
                'LIFT-UP': 'lift-up',
                'SLIDING FITTING': 'sliding-fitting',
                'FOLDING BRACKET 1': 'folding-bracket',
                'FOLDING BRACKET 2': 'folding-bracket'
            };
            
            const productKey = productKeyMap[productText] || 'telescopic-channel';
            
            // Show integrated product page (no product items to click now)
            // showProductPage(productKey);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Update navigation for product page
function updateNavigation() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (currentPage.includes('product-page.html') && link.getAttribute('href') === 'product-page.html') {
            link.classList.add('active');
        } else if (currentPage.includes('index.html') || currentPage === '/') {
            if (link.getAttribute('href') === '#home' || link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        }
    });
}

// Call navigation update on page load
document.addEventListener('DOMContentLoaded', updateNavigation);// In
tegrated Product Page Functionality
const productData = {
    'slim-tandem-box': {
        title: 'SLIM TANDEM BOX',
        image: '02 - Edited.jpg',
        images: ['02 - Edited.jpg', 'Slider-2 (1).jpg', 'category/1-1.jpg', 'MPP-1.jpeg'],
        features: [
            'Drawer Width Can Be Designed Freely with Automatic Error Adjustment.',
            'Hidden Full Pullout Silencing Skid Can bear 45 kg and enjoys.',
            'Excellent Stability and Quite and Smooth Sliding Performance Quick Installation and Dismantle.',
            'Newly - designed built in damper is free from reinstallation and ensure soft close and smooth drawer movements.'
        ],
        specTitle: 'Drawer Side -Board',
        sizeRange: '12" TO 24"',
        dimensions: '(89mm,120mm,171mm,203mm)',
        specifications: [
            { code: 'GST - 4040', size: '300MM', finish: 'GRAY' },
            { code: 'GST - 4040', size: '350MM', finish: 'GRAY' },
            { code: 'GST - 4040', size: '400MM', finish: 'GRAY' },
            { code: 'GST - 4040', size: '450MM', finish: 'GRAY' },
            { code: 'GST - 4040', size: '500MM', finish: 'GRAY' },
            { code: 'GST - 4040', size: '550MM', finish: 'GRAY' },
            { code: 'GST - 4040', size: '600MM', finish: 'GRAY' }
        ]
    },
    'telescopic-channel': {
        title: 'TELESCOPIC CHANNEL',
        image: '01 - Edited.jpg',
        images: ['01 - Edited.jpg', '02 - Edited.jpg', '03 - Edited.jpg', 'category/3-2.jpg'],
        features: [
            'Full Extension with Zinc Plated/Powder Coated finish for superior durability.',
            'Electrophoresis Treatment provides strong Anti Rust Ability.',
            'Sliding Fit Horizontal And Vertical Directions Are Steady And Smooth.',
            'Suitable for kitchen cabinet, home drawer & office furniture applications.'
        ],
        specTitle: 'Telescopic Channel',
        sizeRange: '300 MM to 550 MM',
        dimensions: '(300mm, 350mm, 400mm, 450mm, 500mm, 550mm)',
        specifications: [
            { code: 'TC - 3040', size: '300MM', finish: 'ZINC PLATED' },
            { code: 'TC - 3540', size: '350MM', finish: 'ZINC PLATED' },
            { code: 'TC - 4040', size: '400MM', finish: 'ZINC PLATED' },
            { code: 'TC - 4540', size: '450MM', finish: 'ZINC PLATED' },
            { code: 'TC - 5040', size: '500MM', finish: 'ZINC PLATED' },
            { code: 'TC - 5540', size: '550MM', finish: 'ZINC PLATED' }
        ]
    },
    'pull-out': {
        title: 'PULL-OUT',
        image: '03 - Edited.jpg',
        images: ['03 - Edited.jpg', '01 - Edited.jpg', '02 - Edited.jpg', 'category/1-2.jpg'],
        features: [
            'Universal pullout Side mounted with frame design.',
            'Fully smooth sliding performance for easy access.',
            'Can be used both side left or right configuration.',
            'Kitchen Pullout is used to store small bottles and containers.'
        ],
        specTitle: 'Pull-Out System',
        sizeRange: '200 MM to 300 MM',
        dimensions: '(200mm, 250mm, 300mm)',
        specifications: [
            { code: 'PO - 2040', size: '200MM', finish: 'CHROME' },
            { code: 'PO - 2540', size: '250MM', finish: 'CHROME' },
            { code: 'PO - 3040', size: '300MM', finish: 'CHROME' }
        ]
    }
};

// Show integrated product page
function showProductPage(productKey = 'telescopic-channel') {
    console.log('showProductPage called with:', productKey);
    
    const productPage = document.getElementById('product-page');
    console.log('Product page element:', productPage);
    
    if (!productPage) {
        console.error('Product page element not found!');
        return;
    }
    
    const mainSections = document.querySelectorAll('main > section:not(#product-page)');
    console.log('Main sections found:', mainSections.length);
    
    // Hide all main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show product page
    productPage.style.display = 'block';
    console.log('Product page should now be visible');
    
    // Load product data
    loadProductData(productKey);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update navigation
    updateActiveNav('product-page');
}

// Load product data into the page
function loadProductData(productKey) {
    console.log('loadProductData called with:', productKey);
    const product = productData[productKey] || productData['telescopic-channel'];
    console.log('Product data:', product);
    
    // Update title
    const titleElement = document.getElementById('product-page-title');
    if (titleElement) {
        titleElement.textContent = product.title;
        console.log('Title updated to:', product.title);
    } else {
        console.error('Title element not found!');
    }
    
    // Update main image
    const mainImageElement = document.getElementById('main-product-img');
    if (mainImageElement) {
        mainImageElement.src = product.image;
        console.log('Main image updated to:', product.image);
    } else {
        console.error('Main image element not found!');
    }
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    product.images.forEach((img, index) => {
        if (thumbnails[index]) {
            thumbnails[index].src = img;
            thumbnails[index].classList.toggle('active', index === 0);
        }
    });
    
    // Update features
    const featureElements = [
        document.getElementById('feature-desc-1'),
        document.getElementById('feature-desc-2'),
        document.getElementById('feature-desc-3'),
        document.getElementById('feature-desc-4')
    ];
    
    product.features.forEach((feature, index) => {
        if (featureElements[index]) {
            featureElements[index].textContent = feature;
        }
    });
    
    // Update product specs
    document.getElementById('product-spec-title').textContent = product.specTitle;
    document.getElementById('product-size-range').textContent = product.sizeRange;
    document.getElementById('product-dimensions').textContent = product.dimensions;
    
    // Update specifications table
    const tbody = document.getElementById('product-spec-tbody');
    tbody.innerHTML = '';
    
    product.specifications.forEach(spec => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${spec.code}</td>
            <td>${spec.size}</td>
            <td>${spec.finish}</td>
        `;
        tbody.appendChild(row);
    });
}

// Change product image
function changeProductImage(src, element) {
    document.getElementById('main-product-img').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.product-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

// Back to home/category
function backToHome() {
    const productPage = document.getElementById('product-page');
    const mainSections = document.querySelectorAll('main > section:not(#product-page)');
    
    // Hide product page
    productPage.style.display = 'none';
    
    // Show all main sections
    mainSections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Scroll to about section (since products section was removed)
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    
    // Update navigation
    updateActiveNav('about');
}

// Open product inquiry modal
function openProductInquiry() {
    // You can implement a modal here or redirect to contact section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Update active navigation
function updateActiveNav(section) {
    const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (section === 'product-page' && link.textContent.includes('PRODUCT PAGE')) {
            link.classList.add('active');
        } else if (section === 'products' && link.getAttribute('href') === '#products') {
            link.classList.add('active');
        }
    });
}

// Size button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for size buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('size-option-btn')) {
            // Remove active from all size buttons
            document.querySelectorAll('.size-option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active to clicked button
            e.target.classList.add('active');
        }
    });
});// M
ake showProductPage available globally for testing
window.showProductPage = showProductPage;

// Test function to verify everything works
window.testProductPage = function() {
    console.log('Testing product page...');
    showProductPage('telescopic-channel');
};// Image 
navigation by index for dots
function changeProductImageByIndex(index) {
    const currentProduct = getCurrentProductKey();
    const product = productData[currentProduct] || productData['slim-tandem-box'];
    
    if (product.images && product.images[index]) {
        const mainImageElement = document.getElementById('main-product-img');
        if (mainImageElement) {
            mainImageElement.src = product.images[index];
        }
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Get current product key (helper function)
function getCurrentProductKey() {
    // This would be set when loading product data
    return window.currentProductKey || 'slim-tandem-box';
}

// Update the loadProductData function to store current product key
const originalLoadProductData = loadProductData;
loadProductData = function(productKey) {
    window.currentProductKey = productKey;
    return originalLoadProductData(productKey);
};
/
/ Professional 3D Effects System
function init3DEffects() {
    console.log('Initializing professional 3D effects...');
    
    // Add 3D mouse tracking for hero section
    add3DMouseTracking();
    
    // Add 3D tilt effects to cards
    add3DTiltEffects();
    
    // Add depth perception effects
    addDepthEffects();
}

// 3D Mouse tracking for hero section
function add3DMouseTracking() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateX = (y - 0.5) * 10; // Max 5 degrees
        const rotateY = (x - 0.5) * -10; // Max 5 degrees
        
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
    });
}

// 3D Tilt effects for cards
function add3DTiltEffects() {
    const cards = document.querySelectorAll('.product-item, .popular-item, .latest-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 20; // Max 10 degrees
            const rotateY = (x - 0.5) * -20; // Max 10 degrees
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        });
    });
}

// Add depth perception effects
function addDepthEffects() {
    // Add layered depth to sections
    const sections = document.querySelectorAll('.about-section, .products-section, .contact-section');
    
    sections.forEach((section, index) => {
        section.style.transformStyle = 'preserve-3d';
        section.style.transform = `translateZ(${index * 10}px)`;
        
        // Add subtle parallax on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1 * (index + 1);
            section.style.transform = `translateZ(${index * 10}px) translateY(${rate}px)`;
        });
    });
}

// 3D Scroll animations
function add3DScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-3d-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.product-item, .popular-item, .latest-item, h2, p, img');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-3d-child');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    const sections = document.querySelectorAll('.about-section, .products-section, .popular-products, .latest-products, .contact-section');
    sections.forEach(section => observer.observe(section));
    
    // Add CSS for 3D animations
    const style = document.createElement('style');
    style.textContent = `
        /* 3D Scroll Animations */
        .about-section, .products-section, .popular-products, .latest-products, .contact-section {
            opacity: 0;
            transform: perspective(1000px) rotateX(30deg) translateY(50px) translateZ(-100px);
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-3d-in {
            opacity: 1 !important;
            transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0px) !important;
        }
        
        .animate-3d-child {
            animation: slideIn3D 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        @keyframes slideIn3D {
            0% {
                opacity: 0;
                transform: perspective(1000px) rotateX(20deg) translateY(30px) translateZ(-50px);
            }
            100% {
                opacity: 1;
                transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0px);
            }
        }
        
        /* Enhanced 3D hover states */
        .product-item, .popular-item, .latest-item {
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* 3D Button effects */
        .cta-button {
            transform-style: preserve-3d;
            position: relative;
        }
        
        .cta-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: inherit;
            transform: translateZ(-10px);
            opacity: 0.3;
            transition: all 0.3s ease;
        }
        
        .cta-button:hover::after {
            transform: translateZ(-20px);
            opacity: 0.1;
        }
        
        /* Mobile optimization */
        @media (max-width: 768px) {
            .about-section, .products-section, .popular-products, .latest-products, .contact-section {
                transform: translateY(30px);
            }
            
            .animate-3d-in {
                transform: translateY(0px) !important;
            }
            
            .product-item:hover, .popular-item:hover, .latest-item:hover {
                transform: translateY(-10px) scale(1.02) !important;
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            .about-section, .products-section, .popular-products, .latest-products, .contact-section {
                transform: none;
                transition: opacity 0.3s ease;
            }
            
            .animate-3d-in {
                transform: none !important;
            }
            
            .animate-3d-child {
                animation: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add professional loading animation
function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: all 0.5s ease;
        }
        
        .loader-3d {
            width: 60px;
            height: 60px;
            position: relative;
            transform-style: preserve-3d;
            animation: rotate3D 2s linear infinite;
        }
        
        .loader-3d::before,
        .loader-3d::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid #AF6A4C;
            border-radius: 50%;
            opacity: 0.8;
        }
        
        .loader-3d::before {
            transform: rotateY(0deg);
            animation: pulse 1s ease-in-out infinite;
        }
        
        .loader-3d::after {
            transform: rotateY(90deg);
            animation: pulse 1s ease-in-out infinite 0.5s;
        }
        
        @keyframes rotate3D {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        .page-loader.fade-out {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-3d"></div>';
    document.body.appendChild(loader);
    
    // Remove loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading animation
addLoadingAnimation();

console.log('Professional 3D effects system initialized!');