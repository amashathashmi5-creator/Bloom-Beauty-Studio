/**
 * BLOOM BEAUTY STUDIO - JAVASCRIPT CONTROLLER
 * Pure Vanilla JavaScript (Clean, Modern & Beginner-Friendly)
 * 
 * Features:
 *  1. Sticky Navigation & Scroll Spy
 *  2. Mobile Drawer Navigation Menu
 *  3. Dynamic Date & Year Helpers
 *  4. Quick "Select & Book" Service Connector
 *  5. Filterable Image Gallery
 *  6. Image Lightbox Modal with Keyboard Accessibility
 *  7. Front-End Contact / Booking Form Validation
 *  8. Booking Success Simulation Modal
 *  9. Newsletter Form Interaction
 * 10. Scroll-Triggered Reveal Animations (IntersectionObserver)
 * 11. Back-To-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DYNAMIC YEAR
     ========================================================================== */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Set the minimum selectable date in the booking form to today
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  /* ==========================================================================
     2. STICKY HEADER & SCROLL SPY
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Toggle frosted header styling
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy: highlight current section link
    const headerOffset = 140;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerOffset;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    // Toggle Back-To-Top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* ==========================================================================
     3. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-btn');

  const openMobileMenu = () => {
    mobileToggle.classList.add('active');
    mobileNav.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMobileMenu = () => {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close if clicked outside
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && 
          !mobileNav.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     4. QUICK "SELECT & BOOK" SERVICE CONNECTOR
     ========================================================================== */
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const serviceDropdown = document.getElementById('serviceSelect');
  const contactSection = document.getElementById('contact');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');

      if (serviceDropdown && serviceName) {
        // Select matching option
        for (let i = 0; i < serviceDropdown.options.length; i++) {
          if (serviceDropdown.options[i].value === serviceName) {
            serviceDropdown.selectedIndex = i;
            // Clear any previous error styling
            clearFieldError(serviceDropdown);
            break;
          }
        }
      }

      // Smoothly scroll to contact section
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Gentle highlight flash on select element to guide the user
        setTimeout(() => {
          if (serviceDropdown) {
            serviceDropdown.focus();
            serviceDropdown.style.boxShadow = '0 0 0 4px rgba(197, 164, 117, 0.45)';
            setTimeout(() => {
              serviceDropdown.style.boxShadow = '';
            }, 1200);
          }
        }, 600);
      }
    });
  });

  /* ==========================================================================
     5. FILTERABLE IMAGE GALLERY
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('hidden');
          // Trigger slight fade
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     6. IMAGE LIGHTBOX MODAL
     ========================================================================== */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  const openLightbox = (item) => {
    const imgEl = item.querySelector('img');
    const title = item.getAttribute('data-title') || 'Bloom Atelier';
    const desc = item.getAttribute('data-desc') || 'Luxury beauty experience';
    const cat = item.querySelector('.gallery-category')?.textContent || 'Gallery';

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxTag.textContent = cat;

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    // Open when clicking view button or card
    const viewBtn = item.querySelector('.gallery-view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(item);
      });
    }
    item.addEventListener('click', () => openLightbox(item));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  /* ==========================================================================
     7. FORM VALIDATION HELPERS & ERROR HANDLING
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const fullName = document.getElementById('fullName');
  const emailAddress = document.getElementById('emailAddress');
  const phoneNumber = document.getElementById('phoneNumber');
  const preferredDate = document.getElementById('preferredDate');
  const preferredTime = document.getElementById('preferredTime');
  const notes = document.getElementById('notes');

  // Error message nodes
  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const serviceError = document.getElementById('serviceError');
  const dateError = document.getElementById('dateError');

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  const setFieldError = (inputElement, errorElement, message) => {
    const formGroup = inputElement.closest('.form-group');
    if (formGroup) formGroup.classList.add('has-error');
    if (errorElement) errorElement.textContent = message;
  };

  const clearFieldError = (inputElement) => {
    const formGroup = inputElement.closest('.form-group');
    if (formGroup) {
      formGroup.classList.remove('has-error');
      const errorSpan = formGroup.querySelector('.field-error');
      if (errorSpan) errorSpan.textContent = '';
    }
  };

  // Real-time error clearing when user edits
  [fullName, emailAddress, phoneNumber, serviceDropdown, preferredDate].forEach(field => {
    if (field) {
      field.addEventListener('input', () => clearFieldError(field));
      field.addEventListener('change', () => clearFieldError(field));
    }
  });

  /* ==========================================================================
     8. FORM SUBMISSION (FRONT-END VALIDATION & MODAL DISPLAY)
     ========================================================================== */
  const successModal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const openSuccessModal = (formData) => {
    document.getElementById('summaryName').textContent = formData.name;
    document.getElementById('summaryService').textContent = formData.service;
    document.getElementById('summaryDate').textContent = formData.date;
    document.getElementById('summaryTime').textContent = formData.time;
    document.getElementById('summaryEmail').textContent = formData.email;
    document.getElementById('summaryPhone').textContent = formData.phone;

    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeSuccessModal = () => {
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeSuccessModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSuccessModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeSuccessModal);

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop normal form submit

      let isValid = true;
      let firstInvalidField = null;

      // 1. Validate Full Name
      const nameVal = fullName.value.trim();
      if (!nameVal) {
        setFieldError(fullName, fullNameError, 'Please enter your full name.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = fullName;
      } else if (nameVal.length < 2) {
        setFieldError(fullName, fullNameError, 'Name must be at least 2 characters.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = fullName;
      } else {
        clearFieldError(fullName);
      }

      // 2. Validate Email Address
      const emailVal = emailAddress.value.trim();
      if (!emailVal) {
        setFieldError(emailAddress, emailError, 'Email address is required.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = emailAddress;
      } else if (!emailRegex.test(emailVal)) {
        setFieldError(emailAddress, emailError, 'Please enter a valid email address (e.g., name@example.com).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = emailAddress;
      } else {
        clearFieldError(emailAddress);
      }

      // 3. Validate Phone Number
      const phoneVal = phoneNumber.value.trim();
      // Remove whitespace, dashes, parens to test digit length
      const cleanDigits = phoneVal.replace(/[^0-9]/g, '');
      if (!phoneVal) {
        setFieldError(phoneNumber, phoneError, 'Phone number is required.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = phoneNumber;
      } else if (cleanDigits.length < 7 || cleanDigits.length > 15) {
        setFieldError(phoneNumber, phoneError, 'Please enter a valid telephone number (7 to 15 digits).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = phoneNumber;
      } else {
        clearFieldError(phoneNumber);
      }

      // 4. Validate Service Selection
      const serviceVal = serviceDropdown.value;
      if (!serviceVal) {
        setFieldError(serviceDropdown, serviceError, 'Please choose a beauty service.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = serviceDropdown;
      } else {
        clearFieldError(serviceDropdown);
      }

      // 5. Validate Preferred Date
      const dateVal = preferredDate.value;
      if (!dateVal) {
        setFieldError(preferredDate, dateError, 'Please select your preferred appointment date.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = preferredDate;
      } else {
        const selectedDate = new Date(dateVal + 'T00:00:00');
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (selectedDate < now) {
          setFieldError(preferredDate, dateError, 'Appointment date cannot be in the past.');
          isValid = false;
          if (!firstInvalidField) firstInvalidField = preferredDate;
        } else {
          clearFieldError(preferredDate);
        }
      }

      // If invalid, focus the first erroneous input
      if (!isValid) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      // If valid: construct details and open demonstration modal
      const formattedDate = new Date(dateVal + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const submissionDetails = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        service: serviceVal,
        date: formattedDate,
        time: preferredTime ? preferredTime.value : 'Flexible Window'
      };

      // Open preview confirmation modal
      openSuccessModal(submissionDetails);

      // Reset form fields
      bookingForm.reset();
    });
  }

  /* ==========================================================================
     9. NEWSLETTER FORM (CLIENT-SIDE DEMO INTERACTION)
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMsg = document.getElementById('newsletterMsg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = newsletterEmail.value.trim();

      if (!val || !emailRegex.test(val)) {
        newsletterMsg.className = 'newsletter-msg error';
        newsletterMsg.textContent = 'Please enter a valid email address.';
        return;
      }

      newsletterMsg.className = 'newsletter-msg success';
      newsletterMsg.textContent = '✦ Subscribed! Thank you for previewing our journal.';
      newsletterEmail.value = '';

      setTimeout(() => {
        newsletterMsg.textContent = '';
      }, 4000);
    });
  }

  /* ==========================================================================
     10. SCROLL-TRIGGERED REVEAL ANIMATIONS
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          obs.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    fadeElements.forEach(el => el.classList.add('appear'));
  }

  /* ==========================================================================
     11. BACK-TO-TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     12. GLOBAL KEYBOARD ACCESSIBILITY (ESC KEY TO CLOSE MODALS)
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
      if (successModal && successModal.classList.contains('active')) {
        closeSuccessModal();
      }
      if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

});
