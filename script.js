// JavaScript para Menu Hambúrguer e Funcionalidades da Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Hambúrguer
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const bars = document.querySelectorAll('.bar');

    // Toggle do menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scroll para links internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe ativa no menu baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Header transparente/sólido baseado no scroll
    const header = document.querySelector('.header');
    
    function headerScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        headerScroll();
        setActiveNav();
    });

    // Executar uma vez no carregamento
    headerScroll();
    setActiveNav();

    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.banner-text-box, .servicos-content, .servico-card');
    animatedElements.forEach(el => observer.observe(el));

    // Preload das imagens
    const images = [
        'assets/MONTE SINAI - LOGO HORIZONTAL BRANCO E VERDE.png',
        'assets/MS - CONSULTORIO 1.png'
    ];

    images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });

    // Debounce function para otimizar eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Otimizar eventos de scroll
    const debouncedScroll = debounce(() => {
        headerScroll();
        setActiveNav();
    }, 10);

    window.removeEventListener('scroll', debouncedScroll);
    window.addEventListener('scroll', debouncedScroll);

});
