
document.addEventListener('DOMContentLoaded', function() {
    // Navigation highlight based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-desktop a');
    
    function highlightNav() {
      let scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    function scrollHeader() {
      const scrollTop = window.scrollY;
      
      if (scrollTop > 80) {
        header.style.height = '60px';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.height = '80px';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
      }
      
      lastScrollTop = scrollTop;
    }
    
    // Tab functionality for experience section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const jobPanels = document.querySelectorAll('.job-panel');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        
        // Update active state for buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show the selected job panel
        jobPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.getAttribute('data-id') === id) {
            panel.classList.add('active');
          }
        });
      });
    });
    
    // Initialize skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    function initSkillBars() {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.setProperty('--width', width);
      });
    }
    
    // Animation for elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeElements.forEach(element => {
      fadeInObserver.observe(element);
    });
    
    // Trigger skill progress animation when in view
    const skillGroupObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-progress-fill');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = bar.parentElement.previousElementSibling.querySelector('.highlight').textContent;
            }, index * 100);
          });
          skillGroupObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    document.querySelectorAll('.skill-group').forEach(group => {
      skillGroupObserver.observe(group);
    });
    
    // Mobile menu toggle (placeholder - would need actual mobile menu implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        alert('Mobile menu would open here. Add implementation as needed.');
      });
    }
    
    // Initial calls
    window.addEventListener('scroll', () => {
      highlightNav();
      scrollHeader();
    });
    
    // Initialize
    highlightNav();
    scrollHeader();
    initSkillBars();
  });