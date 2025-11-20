/**
 * Lumio Order - Landing Page JavaScript
 * Sistema de Gestão para Restaurantes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const body = document.body;

    // Abrir menu mobile
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    // Fechar menu mobile
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    }

    // Fechar menu ao clicar em um link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!this.classList.contains('btn-login-mobile')) {
                mobileMenu.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Formulário de contato
    const contatoForm = document.getElementById('contatoForm');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animação de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Simular envio (aqui você pode adicionar a lógica real de envio)
            setTimeout(() => {
                submitButton.textContent = '✓ Mensagem Enviada!';
                submitButton.style.background = 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    contatoForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Animação de contadores na seção hero
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observer para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Adicionar animações aos cards
    const animateElements = document.querySelectorAll('.recurso-card, .vantagem-item, .plano-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Adicionar efeito parallax suave ao hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && scrolled < 600) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Destacar link ativo no menu baseado na seção
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--primary-color)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Prevenção de múltiplos cliques em botões
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('processing')) {
                this.classList.add('processing');
                setTimeout(() => {
                    this.classList.remove('processing');
                }, 2000);
            }
        });
    });

    // Log de analytics (você pode integrar com Google Analytics ou similar)
    console.log('Lumio Order - Sistema carregado com sucesso!');
});
