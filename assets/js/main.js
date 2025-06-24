// Main JavaScript for ˈt͡su.rɘ/ Art Gallery
// Version: 1.0

// Carousel Management for Homepage
const carousels = {
    1: { currentSlide: 0, totalSlides: 3 },
    2: { currentSlide: 0, totalSlides: 3 },
    3: { currentSlide: 0, totalSlides: 3 }
};

// Gallery namespace for gallery detail pages
window.Gallery = (function() {
    // Artwork data for gallery pages
    const artworkData = {
        1: {
            title: "Lorem Ipsum Werk 1",
            technique: "Acryl auf Leinwand",
            size: "70 x 50 cm",
            year: "2024",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            mainClass: "thumbnail-1"
        },
        2: {
            title: "Lorem Ipsum Werk 2",
            technique: "Acryl auf Leinwand",
            size: "60 x 40 cm",
            year: "2024",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            mainClass: "thumbnail-2"
        },
        3: {
            title: "Lorem Ipsum Werk 3",
            technique: "Pastell auf Papier",
            size: "50 x 35 cm",
            year: "2024",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
            mainClass: "thumbnail-3"
        },
        4: {
            title: "Lorem Ipsum Werk 4",
            technique: "Acryl auf Leinwand",
            size: "80 x 60 cm",
            year: "2024",
            description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
            mainClass: "thumbnail-4"
        },
        5: {
            title: "Lorem Ipsum Werk 5",
            technique: "Mixed Media",
            size: "90 x 70 cm",
            year: "2024",
            description: "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
            mainClass: "thumbnail-5"
        },
        6: {
            title: "Lorem Ipsum Werk 6",
            technique: "Acryl auf Leinwand",
            size: "65 x 45 cm",
            year: "2024",
            description: "Nihil molestiae consequuntur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
            mainClass: "thumbnail-6"
        },
        7: {
            title: "Lorem Ipsum Werk 7",
            technique: "Pastell und Acryl",
            size: "55 x 40 cm",
            year: "2024",
            description: "Deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
            mainClass: "thumbnail-7"
        },
        8: {
            title: "Lorem Ipsum Werk 8",
            technique: "Acryl auf Leinwand",
            size: "75 x 55 cm",
            year: "2024",
            description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
            mainClass: "thumbnail-8"
        }
    };

    // Private variables for gallery pages
    let currentThumbnailPage = 0;
    const thumbnailsPerPage = 4;
    const totalPages = Math.ceil(8 / thumbnailsPerPage) - 1;

    // Gallery thumbnail navigation
    function navigateThumbnails(direction) {
        const newPage = currentThumbnailPage + direction;
        
        if (newPage < 0 || newPage > totalPages) {
            return;
        }
        
        currentThumbnailPage = newPage;
        
        const grid = document.getElementById('thumbnailsGrid');
        if (grid) {
            const translateY = -currentThumbnailPage * (150 + 15) * 2;
            grid.style.transform = `translateY(${translateY}px)`;
            
            // Update button states
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            if (prevBtn) prevBtn.disabled = currentThumbnailPage === 0;
            if (nextBtn) nextBtn.disabled = currentThumbnailPage === totalPages;
        }
    }

    // Select artwork in gallery
    function selectArtwork(artworkId) {
        const artwork = artworkData[artworkId];
        if (!artwork) return;
        
        // Remove active class from all thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Add active class to selected thumbnail
        const selectedThumbnail = document.querySelector(`.thumbnail:nth-child(${artworkId})`);
        if (selectedThumbnail) {
            selectedThumbnail.classList.add('active');
        }
        
        // Update main display
        const mainDisplay = document.getElementById('mainDisplay');
        if (mainDisplay) {
            mainDisplay.className = `image-placeholder ${artwork.mainClass}`;
            mainDisplay.innerHTML = `
                <i class="fas fa-image"></i>
                <div>${artwork.title}</div>
                <small>Hauptansicht</small>
            `;
        }
        
        // Update description
        const descriptionSection = document.getElementById('descriptionSection');
        if (descriptionSection) {
            descriptionSection.innerHTML = `
                <h3 class="artwork-title">${artwork.title}</h3>
                <div class="artwork-details">
                    <span><strong>Technik:</strong> ${artwork.technique}</span>
                    <span><strong>Größe:</strong> ${artwork.size}</span>
                    <span><strong>Jahr:</strong> ${artwork.year}</span>
                </div>
                <p class="artwork-description">${artwork.description}</p>
            `;
        }
        
        // Add animation
        if (mainDisplay) {
            mainDisplay.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mainDisplay.style.transform = 'scale(1)';
            }, 100);
        }
    }

    // Initialize gallery page
    function initGallery() {
        // Only initialize if we're actually on a gallery page
        if (!document.querySelector('.gallery-content')) {
            return;
        }
        
        // Add smooth transitions
        document.querySelectorAll('.thumbnail, .main-display').forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });
        
        // Initialize thumbnail navigation
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.disabled = true;
        }
        
        // Hide navigation if not needed
        if (totalPages === 0) {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        }
    }

    // Return public interface
    return {
        navigateThumbnails: navigateThumbnails,
        selectArtwork: selectArtwork,
        init: initGallery
    };
})();

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    
    // Initialize carousels if on homepage
    if (document.querySelector('.galleries-section')) {
        initializeCarousels();
    }
    
    // Initialize gallery if on gallery page
    if (document.querySelector('.gallery-content')) {
        Gallery.init();
    }
});

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks) {
                    navLinks.classList.remove('mobile-open');
                    updateMobileToggleIcon();
                }
            }
        });
    });

    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            updateMobileToggleIcon();
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('mobile-open');
                updateMobileToggleIcon();
            }
        });
    }
}

// Update mobile toggle icon
function updateMobileToggleIcon() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!toggle || !navLinks) return;
    
    const icon = toggle.querySelector('i');
    if (icon) {
        if (navLinks.classList.contains('mobile-open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Carousel Functions for Homepage
function initializeCarousels() {
    // Auto-rotate carousels
    setInterval(() => {
        for (let i = 1; i <= 3; i++) {
            nextSlide(i, true);
        }
    }, 4000);
}

function nextSlide(carouselId, auto = false) {
    if (!carousels[carouselId]) return;
    
    const carousel = carousels[carouselId];
    carousel.currentSlide = (carousel.currentSlide + 1) % carousel.totalSlides;
    updateCarousel(carouselId);
}

function prevSlide(carouselId) {
    if (!carousels[carouselId]) return;
    
    const carousel = carousels[carouselId];
    carousel.currentSlide = (carousel.currentSlide - 1 + carousel.totalSlides) % carousel.totalSlides;
    updateCarousel(carouselId);
}

function goToSlide(carouselId, slideIndex) {
    if (!carousels[carouselId]) return;
    
    const carousel = carousels[carouselId];
    carousel.currentSlide = slideIndex;
    updateCarousel(carouselId);
}

function updateCarousel(carouselId) {
    const carousel = document.querySelector(`#carousel${carouselId}`);
    if (!carousel) return;
    
    const container = carousel.querySelector('.carousel-container');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    if (container) {
        // Update slide position
        const translateX = -carousels[carouselId].currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carousels[carouselId].currentSlide);
    });
}

// Gallery Functions for Homepage - UPDATED FOR NEW STRUCTURE
function openGallery(galleryId) {
    // Get current language from URL or default to German
    const currentLang = getCurrentLanguage();
    
    // Check if we're currently in the pages folder or root
    const isInPages = window.location.pathname.includes('/pages/');
    const prefix = isInPages ? '' : 'pages/';
    
    // Open the appropriate gallery page
    switch(galleryId) {
        case 1:
            window.location.href = `${prefix}gallery1${currentLang}.html`;
            break;
        case 2:
            window.location.href = `${prefix}gallery2${currentLang}.html`;
            break;
        case 3:
            window.location.href = `${prefix}gallery3${currentLang}.html`;
            break;
        default:
            console.log('Gallery not found');
    }
}

// Get current language from URL
function getCurrentLanguage() {
    const url = window.location.pathname;
    if (url.includes('-en.html')) {
        return '-en';
    } else if (url.includes('-pl.html')) {
        return '-pl';
    }
    return ''; // Default German
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
         // navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
           // navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Update active navigation item
        updateActiveNavItem();
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.gallery-card, .coming-soon-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Update active navigation item
function updateActiveNavItem() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Utility Functions
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #e91e63, #9c27b0);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
        font-weight: 500;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key functionality
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            updateMobileToggleIcon();
        }
    }
    
    // Arrow keys for carousel navigation when focused
    if (e.key === 'ArrowLeft' && e.target.closest('.gallery-card')) {
        const galleryCard = e.target.closest('.gallery-card');
        const carouselId = parseInt(galleryCard.querySelector('[id^="carousel"]').id.replace('carousel', ''));
        prevSlide(carouselId);
    }
    
    if (e.key === 'ArrowRight' && e.target.closest('.gallery-card')) {
        const galleryCard = e.target.closest('.gallery-card');
        const carouselId = parseInt(galleryCard.querySelector('[id^="carousel"]').id.replace('carousel', ''));
        nextSlide(carouselId);
    }
    
    // Arrow keys for gallery thumbnail navigation
    if (e.key === 'ArrowLeft' && e.target.closest('.gallery-content')) {
        e.preventDefault();
        Gallery.navigateThumbnails(-1);
    }
    
    if (e.key === 'ArrowRight' && e.target.closest('.gallery-content')) {
        e.preventDefault();
        Gallery.navigateThumbnails(1);
    }
    
    // Scroll navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy(0, 300);
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy(0, -300);
    }
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Email-Adresse kopiert!');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Email-Adresse kopiert!');
    } catch (err) {
        showNotification('Kopieren fehlgeschlagen');
    }
    
    document.body.removeChild(textArea);
}

// Performance optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

function updateScrollEffects() {
    // Update any scroll-dependent effects here
    ticking = false;
}

// Console easter eggs (nur in Entwicklung)
function initConsoleMessages() {
    // Nur anzeigen wenn nicht in Produktion
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('github.io')) {
        const language = getCurrentLanguage();
        
        switch(language) {
            case '-en':
                console.log('%cˈt͡su.rɘ/ Art Gallery', 'color: #e91e63; font-size: 20px; font-weight: bold;');
                console.log('%cEnglish Version - Contemporary Art & Painting', 'color: #9c27b0; font-style: italic;');
                console.log('%cDeveloped with ❤️', 'color: #00bcd4;');
                break;
            case '-pl':
                console.log('%cˈt͡su.rɘ/ Galeria Sztuki', 'color: #e91e63; font-size: 20px; font-weight: bold;');
                console.log('%cWersja Polska - Sztuka Współczesna i Malarstwo', 'color: #9c27b0; font-style: italic;');
                console.log('%cOpracowane z ❤️', 'color: #00bcd4;');
                break;
            default:
                console.log('%cˈt͡su.rɘ/ Art Gallery', 'color: #e91e63; font-size: 20px; font-weight: bold;');
                console.log('%cVersion 1.0 - Zeitgenössische Kunst & Malerei', 'color: #9c27b0; font-style: italic;');
                console.log('%cEntwickelt mit ❤️', 'color: #00bcd4;');
        }
    }
}

// Initialize console messages
initConsoleMessages();

// Export functions for global access
window.scrollToTop = scrollToTop;
window.openGallery = openGallery;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.showNotification = showNotification;
window.copyToClipboard = copyToClipboard;