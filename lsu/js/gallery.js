// Enhanced gallery.js with horizontal slide effect
let currentLightboxIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');

// Prevent pinch-to-zoom on lightbox
document.addEventListener('gesturestart', (e) => {
    if (lightbox.classList.contains('active')) {
        e.preventDefault();
    }
});

// Add click event listeners to all gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        triggerHorizontalSlideEffect(item);
        setTimeout(() => {
            openLightbox(index);
        }, 300);
    });
});

// Function to trigger the horizontal slide effect
function triggerHorizontalSlideEffect(item) {
    galleryItems.forEach(item => {
        item.classList.remove('clicked');
    });
    item.classList.add('clicked');
    setTimeout(() => {
        item.classList.remove('clicked');
    }, 800);
}

// Open Lightbox
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Change Image (Previous/Next)
function changeImage(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= galleryItems.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryItems.length - 1;
    }
    const contentElement = document.querySelector('.lightbox-content');
    contentElement.style.animation = 'none';
    void contentElement.offsetWidth;
    contentElement.style.animation = direction > 0 ?
        'slideInFromRight 0.4s ease-out' :
        'slideInFromLeft 0.4s ease-out';
    updateLightbox();
}

// Preload adjacent images
function preloadAdjacentImages() {
    const totalImages = galleryItems.length;
    const prevIndex = (currentLightboxIndex - 1 + totalImages) % totalImages;
    const nextIndex = (currentLightboxIndex + 1) % totalImages;
    const preloadPrev = new Image();
    const preloadNext = new Image();
    preloadPrev.src = galleryItems[prevIndex].querySelector('img').src;
    preloadNext.src = galleryItems[nextIndex].querySelector('img').src;
}

// Update Lightbox Content
function updateLightbox() {
    const item = galleryItems[currentLightboxIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption').textContent;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption;
    preloadAdjacentImages();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') changeImage(-1);
    else if (e.key === 'ArrowRight') changeImage(1);
    else if (e.key === 'Escape') closeLightbox();
});

// Close Lightbox on Background Click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Touch Swipe Support
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // Increased sensitivity for mobile
    if (touchEndX < touchStartX - swipeThreshold) {
        changeImage(1); // Swipe left
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeImage(-1); // Swipe right
    }
}

// Add CSS animations
const styleElement = document.createElement('style');
styleElement.textContent = `
    @keyframes slideInFromRight {
        from { transform: translateX(10%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInFromLeft {
        from { transform: translateX(-10%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(styleElement);

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    const allImages = document.querySelectorAll('.gallery-item img');
    allImages.forEach(img => {
        if (!img.src || img.src === '') {
            img.src = '/api/placeholder/400/500';
        }
    });
});
