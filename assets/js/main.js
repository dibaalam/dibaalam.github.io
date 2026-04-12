// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. HEADER FLIGHT INDICATOR LOGIC ---
  const container = document.querySelector(".flight-container");
  const plane = document.getElementById("plane-indicator");
  const solidLine = document.getElementById("solid-path");

  if (container && plane && solidLine) {
    const sectionIds = JSON.parse(container.getAttribute("data-destinations"));
    
    function updateFlight() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const headerOffset = 100;
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

    window.addEventListener("scroll", updateFlight);
    window.addEventListener("resize", updateFlight);
    updateFlight();
  }

  // --- 2. TYPEWRITER EFFECT LOGIC ---
  const typeEffect = (element, speed) => {
    const text = element.innerHTML.trim(); // .trim() removes extra YAML whitespace
    element.innerHTML = "";
    element.style.visibility = 'visible';
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.append(text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeEffect(entry.target, 40); // Slightly faster for better UX
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Select all targets inside the data rows
  const typewriterTargets = document.querySelectorAll(
    '.flight-row .time-col, .flight-row .company, .flight-row .role, .flight-row .description, .flight-row .remarks-col'
  );

  typewriterTargets.forEach(el => observer.observe(el));
});