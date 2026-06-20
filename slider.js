// Horizontal Slider Control logic
function initSliders() {
  const wrappers = document.querySelectorAll('.slider-container-wrapper');

  wrappers.forEach(wrapper => {
    const container = wrapper.querySelector('.slider-container');
    const leftArrow = wrapper.querySelector('.slider-arrow-left');
    const rightArrow = wrapper.querySelector('.slider-arrow-right');

    if (!container || !leftArrow || !rightArrow) return;

    // Check if arrows need to be visible (i.e. content is overflowed)
    const checkOverflow = () => {
      const isOverflowing = container.scrollWidth > container.clientWidth;
      if (!isOverflowing) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
      } else {
        // Only show left arrow if we are not at the very beginning
        if (container.scrollLeft <= 5) {
          leftArrow.style.opacity = '0';
          leftArrow.style.pointerEvents = 'none';
        } else {
          leftArrow.style.opacity = '1';
          leftArrow.style.pointerEvents = 'all';
        }

        // Only show right arrow if we are not at the very end
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
        if (isAtEnd) {
          rightArrow.style.opacity = '0';
          rightArrow.style.pointerEvents = 'none';
        } else {
          rightArrow.style.opacity = '1';
          rightArrow.style.pointerEvents = 'all';
        }
      }
    };

    // Scroll listeners
    container.addEventListener('scroll', checkOverflow);
    window.addEventListener('resize', checkOverflow);

    // Initial check after elements render
    setTimeout(checkOverflow, 200);

    // Scroll click handlers
    leftArrow.addEventListener('click', () => {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    rightArrow.addEventListener('click', () => {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });
}

// Export for module/script usage
if (typeof window !== 'undefined') {
  window.initSliders = initSliders;
}
