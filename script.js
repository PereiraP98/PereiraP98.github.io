// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe steps
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(step);
});

// ===== COUNTER ANIMATION FOR STATS =====
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 20);
};

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '%';
};

// Observe hero stats
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            
            // Parse the number
            let targetNumber = 0;
            if (text.includes('K+')) {
                targetNumber = parseInt(text.replace('K+', '')) * 1000;
            } else if (text.includes('M+')) {
                targetNumber = parseInt(text.replace('M+', '')) * 1000000;
            } else if (text.includes('%')) {
                targetNumber = parseInt(text.replace('%', ''));
            }
            
            animateCounter(entry.target, targetNumber);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== FLOATING CARDS PARALLAX EFFECT =====
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== PRICING TOGGLE ANIMATION =====
const pricingCardsElements = document.querySelectorAll('.pricing-card');
pricingCardsElements.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCardsElements.forEach(otherCard => {
            if (otherCard !== card && !otherCard.classList.contains('featured')) {
                otherCard.style.opacity = '0.5';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCardsElements.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// ===== TESTIMONIALS AUTO-ROTATION (Optional) =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

// This function can be enabled if you want auto-rotation
// setInterval(() => {
//     testimonials[currentTestimonial].style.opacity = '0.5';
//     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
//     testimonials[currentTestimonial].style.opacity = '1';
//     testimonials[currentTestimonial].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
// }, 5000);

// ===== FORM VALIDATION (for future use) =====
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// ===== CTA BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple-animation 0.6s;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===== LAZY LOADING FOR IMAGES (if you add images later) =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
lazyLoadImages();

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for cards
const focusableCards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
focusableCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            card.click();
        }
    });
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🚀 BarberPro - Sistema SaaS de Agendamento', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cDesenvolvido com ❤️ para revolucionar barbearias', 'font-size: 14px; color: #666;');

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== DETECT IF USER IS ON MOBILE =====
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (isMobile()) {
    // Disable some effects on mobile for better performance
    floatingCards.forEach(card => {
        card.style.animation = 'none';
    });
}

// ===== TRACK SCROLL DEPTH (for analytics) =====
let maxScroll = 0;
window.addEventListener('scroll', debounce(() => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = Math.floor(scrollPercent);
        
        // You can send this to analytics
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
            console.log(`User scrolled ${maxScroll}% of the page`);
            // Example: analytics.track('scroll_depth', { depth: maxScroll });
        }
    }
}, 500));

// ===== EASTER EGG =====
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        console.log('%c🎉 Você encontrou um Easter Egg!', 'font-size: 16px; color: #D4AF37;');
        console.log('%c💡 Dica: Clique no botão de começar grátis para transformar sua barbearia!', 'font-size: 14px; color: #666;');
        clickCount = 0;
    }
});
