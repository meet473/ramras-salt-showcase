/* ==========================================
   RAMRAS Himalayan Pink Salt Redesign JS Logic
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Sticky Header Scroll Effect ---
  const header = document.querySelector("header");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run once in case user loads page scrolled down

  // --- Mobile Hamburger Menu Toggle ---
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");
  
  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");
      // Change icon from menu to close if active
      if (navbar.classList.contains("active")) {
        menuBtn.className = "ri-close-line menu-btn";
      } else {
        menuBtn.className = "ri-menu-line menu-btn";
      }
    });

    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuBtn.className = "ri-menu-line menu-btn";
      });
    });
  }

  // --- Scroll Spy: Dynamic Active Navigation Link ---
  const sections = document.querySelectorAll("section[id]");
  const navLinksList = document.querySelectorAll(".navbar a");

  const scrollSpy = () => {
    const scrollY = window.scrollY;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      // Get section offset minus header height for precision
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksList.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", scrollSpy);

  // --- Product Showcase Slideshow / Carousel ---
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  const sliderContainer = document.querySelector(".slider-container");
  
  let currentSlideIndex = 0;
  const slideCount = slides.length;
  let slideTimer;

  if (sliderContainer && slideCount > 0) {
    // Generate navigation dots dynamically
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });

    const updateSlider = () => {
      // Translate the slider container horizontally
      sliderContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
      
      // Update active dots
      const dots = document.querySelectorAll(".slider-dot");
      dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    const nextSlide = () => {
      currentSlideIndex = (currentSlideIndex + 1) % slideCount;
      updateSlider();
    };

    const prevSlide = () => {
      currentSlideIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
      updateSlider();
    };

    const goToSlide = (index) => {
      currentSlideIndex = index;
      updateSlider();
    };

    // Event Listeners for buttons
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetTimer();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetTimer();
      });
    }

    // Auto sliding timer
    const startTimer = () => {
      slideTimer = setInterval(nextSlide, 5000); // Shift slide every 5 seconds
    };

    const resetTimer = () => {
      clearInterval(slideTimer);
      startTimer();
    };

    startTimer();
  }

  // --- Contact Form Handling & Mock Submission ---
  const contactForm = document.getElementById("inquiry-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById("form-name");
      const emailInput = document.getElementById("form-email");
      const phoneInput = document.getElementById("form-phone");
      const messageInput = document.getElementById("form-message");
      
      // Basic validation
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert("Please fill in all required fields (Name, Email, Message).");
        return;
      }
      
      // Construct a clean success state visual
      const formWrapper = document.querySelector(".contact-form-wrapper");
      const originalHTML = formWrapper.innerHTML;
      
      formWrapper.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 40px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
          <div style="font-size: 4rem; color: var(--salt-pink);"><i class="ri-checkbox-circle-fill"></i></div>
          <h3 style="font-size: 2rem; color: #ffffff; font-family: var(--font-heading);">Inquiry Submitted!</h3>
          <p style="color: rgba(255,255,255,0.8); max-width: 400px; line-height: 1.6; font-weight: 300;">
            Thank you, <strong>${nameInput.value}</strong>. We have received your inquiry regarding RAMRAS Himalayan Pink Salt. Our team will contact you shortly.
          </p>
          <button id="reset-form-btn" class="btn btn-primary" style="margin-top: 10px;">Send another message</button>
        </div>
      `;
      
      const resetBtn = document.getElementById("reset-form-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          formWrapper.innerHTML = originalHTML;
          // Re-attach validation to the newly loaded form
          // (Requires full script re-binding, but simple page-like refreshes work or we can reload the script action context)
          location.reload();
        });
      }
    });
  }
});
const inquiryForm = document.getElementById("inquiry-form");

if (inquiryForm) {

    inquiryForm.addEventListener("submit", function(e) {

        e.preventDefault();

        emailjs.send(
            "service_d3wrvfe",
            "template_30hnf1k",
            {
                from_name: document.getElementById("form-name").value,
                reply_to: document.getElementById("form-email").value,
                phone: document.getElementById("form-phone").value,
                message: document.getElementById("form-message").value
            }
        )

        .then(function() {

            alert("✅ Inquiry sent successfully!");

            inquiryForm.reset();

        })

        .catch(function(error) {

            console.log(error);

            alert("❌ Failed to send inquiry.");

        });

    });

}
