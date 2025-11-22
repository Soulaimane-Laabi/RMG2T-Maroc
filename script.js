document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Footer - Current Year
  // =====================
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // =====================
  // Smooth Scroll
  // =====================
  function smoothScroll(target, duration = 800) {
    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, start + targetPosition * ease);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  // =====================
  // Preloader Fade
  // =====================
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // =====================
  // Stats Counters
  // =====================
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 300;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;

      const updateCount = () => {
        const increment = target / speed;
        if (count < target) {
          count += increment;
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    });
  }

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // =====================
  // Popup Image Gallery
  // =====================
  const images = document.querySelectorAll(".s-images img");
  const popupImage = document.querySelector(".popup-image");
  if (images.length && popupImage) {
    const popupImgElement = popupImage.querySelector("img");
    let currentIndex = 0;

    popupImage.style.display = "none";

    function showImage(index) {
      popupImage.style.display = "flex";
      const src = images[index].getAttribute("src");
      popupImgElement.style.opacity = 0;
      popupImgElement.src = src;
      popupImgElement.onload = () => {
        popupImgElement.style.opacity = 1;
      };
      currentIndex = index;
    }

    images.forEach((image, index) => {
      image.onclick = () => showImage(index);
    });

    const closeBtn = popupImage.querySelector("span");
    if (closeBtn) closeBtn.onclick = () => popupImage.style.display = "none";

    const nextBtn = popupImage.querySelector(".next");
    const prevBtn = popupImage.querySelector(".prev");

    if (nextBtn)
      nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      };

    if (prevBtn)
      prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      };
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".navbar ul");
  const menuIcon = menuToggle.querySelector("i");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Switch icon between bars and close
    if (navLinks.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });
});



