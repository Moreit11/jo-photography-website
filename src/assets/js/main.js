console.log("main.js loaded")

// Import Splide from CDN
import Splide from 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.esm.js';

function initMenu(){
    const menu = document.getElementById("primary-nav")
    const button = document.getElementById("nav-btn")
    if (button && menu) {
        button.addEventListener('click', () => {
            button.classList.toggle('open')
            menu.classList.toggle('open')
            console.log("clicked")
        })
    }
}

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu
    initMenu();

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery__item');

    // Only initialize lightbox if all elements exist
    if (lightbox && lightboxImg && lightboxClose && lightboxPrev && lightboxNext && galleryItems.length > 0) {

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt
        };
    });

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    //close lightbox 
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    //Show next image
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
    }
    // Show previouse image
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
    }

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Click Navigation
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
    } // End lightbox initialization

    // Initialize Splide Testimonials Carousel
    const testimonialsCarousel = document.getElementById('testimonials-carousel');
    if (testimonialsCarousel) {
        console.log('Testimonials carousel found, initializing Splide...');
        try {
            const splide = new Splide('#testimonials-carousel', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '2rem',
                padding: '1rem',
                autoplay: true,
                interval: 5000,
                pauseOnHover: true,
                pauseOnFocus: true,
                breakpoints: {
                    1024: {
                        perPage: 2,
                        gap: '1.5rem',
                    },
                    768: {
                        perPage: 1,
                        gap: '1rem',
                        padding: '0.5rem',
                    }
                }
            });
            splide.mount();
            console.log('Splide testimonials carousel initialized successfully');
        } catch (error) {
            console.error('Error initializing Splide:', error);
        }
    } else {
        console.log('Testimonials carousel not found on this page');
    }

    // Update date and time in footer
    function updateDateTime() {
        const datetimeElement = document.getElementById('footer-datetime');
        if (datetimeElement) {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            datetimeElement.textContent = now.toLocaleString('en-GB', options);
        }
    }

    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

