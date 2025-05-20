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

// Auto-scroll for Testimonials carousel
(function() {
  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;
  const card = carousel.querySelector('.testimonial-card');
  if (!card) return;
  const style = window.getComputedStyle(card);
  const gap = parseInt(style.marginRight) + parseInt(style.marginLeft) + 32;
  const scrollAmount = card.offsetWidth + gap;
  let autoScrollInterval = setInterval(() => {
    // If at end, scroll back to start
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 5000);

  // Pause auto-scroll on mouse enter of carousel or any card
  function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  function resumeAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000);
  }
  carousel.addEventListener('mouseenter', pauseAutoScroll);
  carousel.addEventListener('mouseleave', resumeAutoScroll);
  carousel.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', pauseAutoScroll);
    card.addEventListener('mouseleave', resumeAutoScroll);
  });
})();

// Testimonials carousel arrow scroll and drag-to-scroll
(function() {
  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;
  const card = carousel.querySelector('.testimonial-card');
  if (!card) return;
  const style = window.getComputedStyle(card);
  const gap = parseInt(style.marginRight) + parseInt(style.marginLeft) + 32;
  const scrollAmount = card.offsetWidth + gap;

  // Arrow button scroll
  document.querySelectorAll('.testimonials-arrow').forEach(btn => {
    btn.addEventListener('click', function() {
      if (btn.classList.contains('left')) {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });

  // Mouse drag-to-scroll
  let isDown = false;
  let startX;
  let scrollLeft;
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2; // scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
  });
  // Touch support
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('touchend', () => {
    isDown = false;
  });
  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2;
    carousel.scrollLeft = scrollLeft - walk;
  });
})();

// FAQ Accordion Toggle
(function() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Close all other items
      faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
      // Toggle this one
      item.classList.toggle('active');
    });
    // Keyboard accessibility
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
})(); 