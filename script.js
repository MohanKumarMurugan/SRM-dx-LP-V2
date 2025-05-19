// Custom JS if needed
console.log("SRM Diagnostics homepage loaded.");

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('benefits-carousel');
    const leftArrow = document.querySelector('.benefits-arrow.left');
    const rightArrow = document.querySelector('.benefits-arrow.right');
    
    // Scroll amount (card width + gap)
    const scrollAmount = 254; // 250px (card width) + 4px (gap)
    
    // Handle left arrow click
    leftArrow.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Handle right arrow click
    rightArrow.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update arrow visibility based on scroll position
    carousel.addEventListener('scroll', () => {
        // Show/hide left arrow
        leftArrow.style.opacity = carousel.scrollLeft > 0 ? '1' : '0.5';
        
        // Show/hide right arrow
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        rightArrow.style.opacity = carousel.scrollLeft < maxScroll ? '1' : '0.5';
    });
});
