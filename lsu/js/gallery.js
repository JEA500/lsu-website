// js/gallery.js
// Lightbox Functionality
let currentLightboxIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');

// Open Lightbox
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Change Image (Previous/Next)
function changeImage(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= galleryItems.length) {
        currentLightboxIndex = 0; // Loop to first image
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryItems.length - 1; // Loop to last image
    }
    updateLightbox();
}

// Update Lightbox Content
function updateLightbox() {
    const item = galleryItems[currentLightboxIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption').textContent;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption;
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