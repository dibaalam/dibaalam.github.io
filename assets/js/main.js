// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".flight-container");
  if (!container) return;

  // Pull the section IDs directly from the HTML attribute we created
  const sectionIds = JSON.parse(container.getAttribute("data-destinations"));
  const plane = document.getElementById("plane-indicator");
  const solidLine = document.getElementById("solid-path");

  function updateFlight() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerOffset = 100; // Adjust based on your header's height
    let totalProgress = 0;
    const segmentWeight = 100 / (sectionIds.length - 1);

    for (let i = 0; i < sectionIds.length - 1; i++) {
      const currentSection = document.getElementById(sectionIds[i]);
      const nextSection = document.getElementById(sectionIds[i + 1]);

      if (currentSection && nextSection) {
        const start = currentSection.offsetTop - headerOffset;
        const end = nextSection.offsetTop - headerOffset;

        if (scrollY >= start && scrollY < end) {
          const segmentProgress = (scrollY - start) / (end - start);
          totalProgress = (i * segmentWeight) + (segmentProgress * segmentWeight);
          break;
        } else if (scrollY >= end) {
          totalProgress = (i + 1) * segmentWeight;
        }
      }
    }

    const position = Math.min(Math.max(totalProgress, 0), 100);
    plane.style.left = `${position}%`;
    solidLine.style.width = `${position}%`;
  }

  // Event Listeners for smooth tracking
  window.addEventListener("scroll", updateFlight);
  window.addEventListener("resize", updateFlight);
  
  // Initialize on load
  updateFlight();
});

