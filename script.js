// Custom JS if needed
console.log("SRM Diagnostics homepage loaded.");

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('benefits-carousel');
    const leftArrow = document.querySelector('.benefits-arrow.left');
    const rightArrow = document.querySelector('.benefits-arrow.right');
    
    // Scroll amount (card width + gap)
    const scrollAmount = 254; // 250px (card width) + 4px (gap)
    
    // Clone first few cards and append to end for infinite scroll effect
    const cards = carousel.querySelectorAll('.benefit-card');
    const firstFourCards = Array.from(cards).slice(0, 4);
    firstFourCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    // Handle left arrow click
    leftArrow.addEventListener('click', () => {
        const currentScroll = carousel.scrollLeft;
        if (currentScroll <= 0) {
            // If at start, jump to end
            carousel.scrollTo({
                left: carousel.scrollWidth,
                behavior: 'instant'
            });
        }
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Handle right arrow click
    rightArrow.addEventListener('click', () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        
        if (currentScroll >= maxScroll) {
            // If at end, jump to start
            carousel.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        }
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update arrow visibility based on scroll position
    function updateArrows() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        leftArrow.style.opacity = carousel.scrollLeft > 0 ? '1' : '0.5';
        rightArrow.style.opacity = carousel.scrollLeft < maxScroll ? '1' : '0.5';
    }
    
    // Initial arrow state
    updateArrows();
    
    // Update arrows on scroll
    carousel.addEventListener('scroll', updateArrows);
    
    // Auto scroll functionality
    let autoScrollInterval;
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll) {
                // If at the end, scroll back to start
                carousel.scrollTo({
                    left: 0,
                    behavior: 'instant'
                });
            } else {
                // Scroll right
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, 3000); // Scroll every 3 seconds
    };
    
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };
    
    // Start auto scroll
    startAutoScroll();
    
    // Pause auto scroll on hover
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Pause auto scroll when manually scrolling
    carousel.addEventListener('touchstart', stopAutoScroll);
    carousel.addEventListener('touchend', startAutoScroll);
    
    // Handle manual scroll
    let isScrolling = false;
    carousel.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            stopAutoScroll();
        }
        
        clearTimeout(carousel.scrollTimeout);
        carousel.scrollTimeout = setTimeout(() => {
            isScrolling = false;
            startAutoScroll();
        }, 1000);
    });
});
