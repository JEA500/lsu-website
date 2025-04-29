// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            }
        }
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Events Slider
const eventsTrack = document.querySelector('.events-track');
const eventCards = document.querySelectorAll('.event-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function updateSlider() {
    const cardWidth = eventCards[0].offsetWidth + 20; // Including margin
    eventsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function nextSlide() {
    if (currentIndex < eventCards.length - 3) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = eventCards.length - 3;
    }
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Add touch swipe support for events slider
let touchStartX = 0;
let touchEndX = 0;

eventsTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

eventsTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
        nextSlide(); // Swipe left
    } else if (diff < -50) {
        prevSlide(); // Swipe right
    }
});

// Auto-slide every 5 seconds
setInterval(() => {
    if (currentIndex < eventCards.length - 3) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}, 5000);

// Resize Handler for Slider
window.addEventListener('resize', updateSlider);

// Contact Form Submission (Mock)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const successMsg = document.createElement('p');
        successMsg.textContent = 'Thank you for your message! We will get back to you soon.';
        successMsg.style.color = 'green';
        contactForm.appendChild(successMsg);
        contactForm.reset();
        setTimeout(() => successMsg.remove(), 3000);
    });
}