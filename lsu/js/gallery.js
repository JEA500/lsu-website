// Gallery and Lightbox functionality
let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

// Initialize gallery items for interaction
galleryItems.forEach((item, index) => {
    // Add click event to each gallery item
    item.addEventListener('click', function() {
        openLightbox(index);
        
        // Add 'clicked' class for animation effect
        this.classList.add('clicked');
        
        // Remove the class after animation completes
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 800);
    });
});

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    const item = galleryItems[index];
    const image = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption').textContent;
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Change image in lightbox
function changeImage(direction) {
    currentImageIndex += direction;
    
    // Handle wraparound navigation
    if (currentImageIndex >= galleryItems.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryItems.length - 1;
    }
    
    const item = galleryItems[currentImageIndex];
    const image = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption').textContent;
    
    // Animate image change
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = caption;
        lightboxImage.style.opacity = '1';
    }, 200);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Prevent touch scrolling when lightbox is open
lightbox.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

// Add swipe support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left
        changeImage(1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right
        changeImage(-1);
    }
}

// Lazy loading enhancement for gallery images
document.addEventListener('DOMContentLoaded', function() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Find all images with data-src attribute
        document.querySelectorAll('.gallery-item img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});