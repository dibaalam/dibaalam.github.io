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
    const text = element.innerHTML.trim();
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
        typeEffect(entry.target, 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const typewriterTargets = document.querySelectorAll(
    '.flight-row .time-col, .flight-row .company, .flight-row .role, .flight-row .description, .flight-row .remarks-col'
  );

  typewriterTargets.forEach(el => observer.observe(el));

  // --- 3. PROJECT POSTCARD CAROUSEL LOGIC ---
  const beltContainer = document.querySelector('.conveyor-belt');
  const beltTrack = document.getElementById('beltTrack');

  if (beltTrack && beltContainer) {
    const stepValue = 700; // Updated to match the new card width + margin (500px + 200px currently)
    // if you change postcard-wrapper for spacing in between, need to change this number to center it
    const bufferCount = 2; 
    
    const allSlides = document.querySelectorAll('.postcard-wrapper');
    const totalRealSlides = allSlides.length - (bufferCount * 2);
    
    let currentIndex = bufferCount; 
    let isTransitioning = false;

    window.moveCarousel = (direction) => {
      if (isTransitioning) return;
      currentIndex += direction;
      updateBeltPosition(true);
    };

    function updateBeltPosition(withTransition) {
      isTransitioning = true;
      
      const transitionStyle = withTransition ? 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)' : 'none';
      beltTrack.style.transition = transitionStyle;
      beltContainer.style.transition = withTransition ? 'background-position 0.8s cubic-bezier(0.65, 0, 0.35, 1)' : 'none';

      const offset = currentIndex * stepValue;
      beltTrack.style.transform = `translateX(-${offset}px)`;
      beltContainer.style.backgroundPosition = `-${offset}px 0`;

      if (!withTransition) {
        syncActiveState();
        isTransitioning = false;
        return;
      }

      beltTrack.addEventListener('transitionend', function handleEnd() {
        isTransitioning = false;

        // Teleport back to beginning state after reaching the clones
        if (currentIndex > (totalRealSlides + bufferCount - 1)) {
          currentIndex = bufferCount; 
          updateBeltPosition(false); 
        } else if (currentIndex < bufferCount) {
          currentIndex = totalRealSlides + bufferCount - 1;
          updateBeltPosition(false); 
        }

        syncActiveState();
        beltTrack.removeEventListener('transitionend', handleEnd);
      }, { once: true });
    }

    function syncActiveState() {
      allSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
    }

    // Optional keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === "ArrowLeft") window.moveCarousel(-1);
      if (e.key === "ArrowRight") window.moveCarousel(1);
    });

    // Home the rig
    updateBeltPosition(false);
  }
});