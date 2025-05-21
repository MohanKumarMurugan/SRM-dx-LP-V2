// Custom JS if needed
console.log("SRM Diagnostics homepage loaded.");

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('benefits-carousel');
    const leftArrow = document.querySelector('.benefits-arrow.left');
    const rightArrow = document.querySelector('.benefits-arrow.right');
    
    // Get card width and gap dynamically
    function getCardScrollAmount() {
        const card = carousel.querySelector('.benefit-card');
        if (!card) return 0;
        const style = window.getComputedStyle(card);
        const gap = 16; // gap-4 in Bootstrap is 1.5rem = 24px, but our gap visually is 16px
        return card.offsetWidth + gap;
    }

    // Remove infinite scroll logic
    // Scroll by one card at a time
    function scrollByCard(direction) {
        const scrollAmount = getCardScrollAmount();
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    leftArrow.addEventListener('click', () => {
        scrollByCard(-1);
    });
    rightArrow.addEventListener('click', () => {
        scrollByCard(1);
    });

    // Update arrow visibility based on scroll position
    function updateArrows() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth - 2;
        leftArrow.style.opacity = carousel.scrollLeft > 0 ? '1' : '0.5';
        rightArrow.style.opacity = carousel.scrollLeft < maxScroll ? '1' : '0.5';
        leftArrow.disabled = carousel.scrollLeft <= 0;
        rightArrow.disabled = carousel.scrollLeft >= maxScroll;
    }

    // Initial arrow state
    updateArrows();
    carousel.addEventListener('scroll', updateArrows);

    // Optional: Auto scroll (if you want to keep it)
    // let autoScrollInterval;
    // const startAutoScroll = () => {
    //     autoScrollInterval = setInterval(() => {
    //         const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    //         if (carousel.scrollLeft >= maxScroll) {
    //             carousel.scrollTo({ left: 0, behavior: 'smooth' });
    //         } else {
    //             scrollByCard(1);
    //         }
    //     }, 4000);
    // };
    // const stopAutoScroll = () => clearInterval(autoScrollInterval);
    // startAutoScroll();
    // carousel.addEventListener('mouseenter', stopAutoScroll);
    // carousel.addEventListener('mouseleave', startAutoScroll);
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
    }, 3000);
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