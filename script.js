// ─── Header Scroll Effect ───
const header = document.getElementById('header');
let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ─── Mobile Menu Toggle ───
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    menuToggle.classList.toggle('active', menuOpen);
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) toggleMenu();
    });
});

// ─── Booking Modal ───
const bookingModal = document.getElementById('bookingModal');

document.querySelectorAll('.js-open-booking').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        if (!bookingModal) return;

        if (typeof bookingModal.showModal === 'function') {
            bookingModal.showModal();
        } else {
            bookingModal.setAttribute('open', '');
        }
    });
});

if (bookingModal) {
    bookingModal.addEventListener('click', event => {
        if (event.target === bookingModal) bookingModal.close();
    });
}

// ─── Section Scroll Spy ───
const sections = document.querySelectorAll('.section, .footer');
const dots = document.querySelectorAll('.floating-menu .dot');

function updateActiveDot() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < bottom) {
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }
    });
    
    // Hide floating CTA on footer
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerTop = footer.offsetTop;
        if (window.scrollY + window.innerHeight > footerTop + 100) {
            document.body.classList.add('footer-visible');
        } else {
            document.body.classList.remove('footer-visible');
        }
    }
}

window.addEventListener('scroll', updateActiveDot, { passive: true });
updateActiveDot();

// ─── Smooth Scroll ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetTop = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
        if (!item.open) return;

        faqItems.forEach(other => {
            if (other !== item) other.open = false;
        });
    });
});

// ─── Scroll Reveal Animation ───
const revealElements = document.querySelectorAll(
    '.section h2, .section .sub, .section .body, .card, .flow-item, .feature, .faq-item, blockquote, .info-item'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── Parallax Effect for Images ───
const parallaxImages = document.querySelectorAll('.visual-area img, .footer-visual img');

const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.1 });

parallaxImages.forEach(img => {
    img.style.transform = 'scale(1.05)';
    img.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    parallaxObserver.observe(img);
});
