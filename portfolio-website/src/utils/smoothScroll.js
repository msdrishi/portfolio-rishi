export const smoothScroll = (target, duration = 1000) => {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };
  
  // Easing function for smooth scrolling
  const easeOutCubic = (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  };

  requestAnimationFrame(animation);
};