// =============================================
// SHAH RAHMAN PORTFOLIO - JavaScript
// =============================================

// 1. Fade-in on scroll for sections and cards
const revealElements = document.querySelectorAll('section, .card');
const revealOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealOnScroll, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Style for fade-in animation
document.head.insertAdjacentHTML('beforeend', `
<style>
.fade-in-up {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
</style>
`);

// 2. Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(255, 127, 80, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(255, 127, 80, 0.1)';
        }
    });
}

// 3. Hero content fade-in on load
window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 300);
    }
});

// 4. Smooth scroll for anchor links (backup for browsers without CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 5. Close mobile menu on link click (Bootstrap handles toggle, this ensures menu closes)
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});

// 6. Active nav link highlighting based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else if (!link.classList.contains('dropdown-toggle')) {
        link.classList.remove('active');
    }
});
