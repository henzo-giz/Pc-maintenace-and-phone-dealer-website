// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    // Initialize loading animation
    document.body.classList.add("loaded")
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")
  
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  
    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInsideMenu = navMenu.contains(event.target)
      const isClickOnToggle = menuToggle.contains(event.target)
  
      if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
      }
    })
  
    // Product Filtering with animation
    const filterBtns = document.querySelectorAll(".filter-btn")
    const productCards = document.querySelectorAll(".product-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        // Add fade out animation to all cards
        productCards.forEach((card) => {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
        })
  
        // After a short delay, show the filtered cards with animation
        setTimeout(() => {
          productCards.forEach((card) => {
            if (filter === "all") {
              card.style.display = "block"
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
              }, 50)
            } else if (card.getAttribute("data-category") === filter) {
              card.style.display = "block"
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
              }, 50)
            } else {
              card.style.display = "none"
            }
          })
        }, 300)
      })
    })
  
    // Smooth scrolling for anchor links with enhanced animation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Close mobile menu if open
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
          }
  
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Form Submission Handling with loading animation
    const serviceForm = document.getElementById("service-form")
    const contactForm = document.getElementById("contact-form")
    const newsletterForm = document.getElementById("newsletter-form")
  
    function handleFormSubmit(form, successMessage) {
      form.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Show loading spinner
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalBtnText = submitBtn.innerHTML
        submitBtn.innerHTML =
          '<div class="loading-spinner" style="width: 20px; height: 20px; display: inline-block; margin: 0 10px 0 0; vertical-align: middle;"></div> Submitting...'
        submitBtn.disabled = true
  
        // Simulate form submission delay
        setTimeout(() => {
          // Hide loading spinner and show success message
          submitBtn.innerHTML = originalBtnText
          submitBtn.disabled = false
  
          // Create and show success notification
          showNotification(successMessage, "success")
  
          // Reset form
          this.reset()
        }, 1500)
      })
    }
  
    if (serviceForm) {
      handleFormSubmit(serviceForm, "Service booking request submitted! We will contact you shortly.")
    }
  
    if (contactForm) {
      handleFormSubmit(contactForm, "Thank you for your message! We will get back to you soon.")
    }
  
    if (newsletterForm) {
      handleFormSubmit(newsletterForm, "Thank you for subscribing to our newsletter!")
    }
  
    // Notification system
    function showNotification(message, type) {
      const notification = document.createElement("div")
      notification.className = `notification ${type}`
      notification.innerHTML = `
              <div class="notification-content">
                  <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
                  <p>${message}</p>
              </div>
              <button class="notification-close"><i class="fas fa-times"></i></button>
          `
  
      document.body.appendChild(notification)
  
      // Add styles if they don't exist
      if (!document.getElementById("notification-styles")) {
        const style = document.createElement("style")
        style.id = "notification-styles"
        style.innerHTML = `
                  .notification {
                      position: fixed;
                      bottom: 20px;
                      right: 20px;
                      background: var(--card-bg);
                      border: 1px solid rgba(59, 130, 246, 0.3);
                      border-radius: 8px;
                      padding: 15px 20px;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 0 10px rgba(59, 130, 246, 0.2);
                      z-index: 1000;
                      transform: translateY(100px);
                      opacity: 0;
                      transition: all 0.3s ease;
                      backdrop-filter: blur(10px);
                      max-width: 350px;
                  }
                  .notification.show {
                      transform: translateY(0);
                      opacity: 1;
                  }
                  .notification-content {
                      display: flex;
                      align-items: center;
                  }
                  .notification-content i {
                      margin-right: 10px;
                      font-size: 1.2rem;
                  }
                  .notification.success .notification-content i {
                      color: var(--success-color);
                  }
                  .notification-close {
                      background: none;
                      border: none;
                      color: var(--text-light);
                      cursor: pointer;
                      padding: 5px;
                  }
                  .notification-close:hover {
                      color: var(--text-color);
                  }
              `
        document.head.appendChild(style)
      }
  
      // Show notification
      setTimeout(() => {
        notification.classList.add("show")
      }, 10)
  
      // Close notification on click
      const closeBtn = notification.querySelector(".notification-close")
      closeBtn.addEventListener("click", () => {
        notification.classList.remove("show")
        setTimeout(() => {
          notification.remove()
        }, 300)
      })
  
      // Auto close after 5 seconds
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.classList.remove("show")
          setTimeout(() => {
            if (document.body.contains(notification)) {
              notification.remove()
            }
          }, 300)
        }
      }, 5000)
    }
  
    // Active Navigation Link Highlighting with enhanced effect
    const sections = document.querySelectorAll("section[id]")
  
    function highlightNavLink() {
      const scrollY = window.pageYOffset
  
      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 100
        const sectionId = section.getAttribute("id")
        const navLink = document.querySelector(".nav-menu a[href*=" + sectionId + "]")
  
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active")
        } else {
          navLink.classList.remove("active")
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavLink)
  
    // Initialize the active link on page load
    highlightNavLink()
  
    // Scroll reveal animation
    const revealElements = document.querySelectorAll(".reveal")
  
    function revealOnScroll() {
      const windowHeight = window.innerHeight
      const revealPoint = 150
  
      revealElements.forEach((element) => {
        const revealTop = element.getBoundingClientRect().top
  
        if (revealTop < windowHeight - revealPoint) {
          element.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", revealOnScroll)
  
    // Initialize reveal on page load
    revealOnScroll()
  
    // Create particle background
    createParticles()
  })
  
  // Particle background effect
  function createParticles() {
    // Create container if it doesn't exist
    let container = document.querySelector(".particles-container")
    if (!container) {
      container = document.createElement("div")
      container.className = "particles-container"
      document.body.appendChild(container)
    }
  
    // Create particles
    const particleCount = 50
  
    for (let i = 0; i < particleCount; i++) {
      createParticle(container)
    }
  }
  
  function createParticle(container) {
    const particle = document.createElement("div")
    particle.className = "particle"
  
    // Random size between 2px and 5px
    const size = Math.random() * 3 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
  
    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    particle.style.left = `${posX}%`
    particle.style.top = `${posY}%`
  
    // Random opacity
    particle.style.opacity = (Math.random() * 0.5 + 0.1).toString()
  
    // Add to container
    container.appendChild(particle)
  
    // Animate particle
    animateParticle(particle)
  }
  
  function animateParticle(particle) {
    // Initial position
    const startPosX = Number.parseFloat(particle.style.left)
    const startPosY = Number.parseFloat(particle.style.top)
  
    // Random movement range
    const rangeX = Math.random() * 10 - 5 // -5 to 5
    const rangeY = Math.random() * 10 - 5 // -5 to 5
  
    // Random duration between 10 and 20 seconds
    const duration = Math.random() * 10000 + 10000
  
    // Start time
    const startTime = Date.now()
  
    function update() {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration
  
      if (progress >= 1) {
        // Reset animation
        animateParticle(particle)
        return
      }
  
      // Calculate new position using sine wave for smooth back-and-forth movement
      const newPosX = startPosX + Math.sin(progress * Math.PI * 2) * rangeX
      const newPosY = startPosY + Math.sin(progress * Math.PI * 2) * rangeY
  
      particle.style.left = `${newPosX}%`
      particle.style.top = `${newPosY}%`
  
      requestAnimationFrame(update)
    }
  
    update()
  }
  
  