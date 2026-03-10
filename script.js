
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

    window.addEventListener('scroll', function() {
        headerScroll();
        setActiveNav();
    });

    headerScroll();
    setActiveNav();

    // Formulário de Agendamento via WhatsApp
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const servico = document.getElementById('servico').value.trim();

            const mensagem = `Olá! Gostaria de agendar um atendimento.\n\n*Nome:* ${nome}\n*WhatsApp:* ${whatsapp}\n*Serviço:* ${servico}`;
            const url = `https://wa.me/5515996728523?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    }

    // ─── GSAP ANIMATIONS ───────────────────────────────────────────
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Remove animações CSS antigas para evitar conflito
        document.querySelectorAll('.banner-text-box, .servicos-content, .servico-card').forEach(el => {
            el.style.opacity = '';
            el.style.transform = '';
        });

        // BANNER — logo e nav entram de cima
       // gsap.from('.nav-logo', { duration: 0.7, y: -30, opacity: 0, ease: 'power2.out' });
        //gsap.from('.nav-menu .nav-item', { duration: 0.5, y: -20, opacity: 0, stagger: 0.1, ease: 'power2.out', delay: 0.2 });
        //gsap.from('.nav-cta', { duration: 0.5, y: -20, opacity: 0, ease: 'power2.out', delay: 0.5 });

        // BANNER — caixa de texto sobe
      //  gsap.from('.banner-text-box', {
       //     duration: 3,
       //     y: 60,
       //     opacity: 0,
       //     ease: 'power3.out',
       //     delay: 0.3
       // });

        // SERVIÇOS — título e texto da esquerda
        gsap.from('.servicos-content', {
            scrollTrigger: { trigger: '.servicos', start: 'top 80%', once: true },
            immediateRender: false,
            duration: 0.9, x: -60, opacity: 0, ease: 'power2.out'
        });

        // SERVIÇOS — cards sobem em cascata
        gsap.from('.servico-card', {
            scrollTrigger: { trigger: '.servicos-cards', start: 'top 85%', once: true },
            immediateRender: false,
            duration: 0.7, y: 50, opacity: 0, stagger: 0.2, ease: 'power2.out'
        });

        // AGENDAMENTO — texto da esquerda
        gsap.from('.agendamento-texto', {
            scrollTrigger: { trigger: '.agendamento', start: 'top 80%', once: true },
            immediateRender: false,
            duration: 0.9, x: -60, opacity: 0, ease: 'power2.out'
        });

        // AGENDAMENTO — card da direita
        gsap.from('.agendamento-card', {
            scrollTrigger: { trigger: '.agendamento', start: 'top 80%', once: true },
            immediateRender: false,
            duration: 0.9, x: 60, opacity: 0, ease: 'power2.out'
        });

        // ESTRUTURA — título e texto
        gsap.from('.estrutura-title, .estrutura-text', {
            scrollTrigger: { trigger: '.estrutura', start: 'top 80%', once: true },
            immediateRender: false,
            duration: 0.8, y: 30, opacity: 0, stagger: 0.15, ease: 'power2.out'
        });

        // ESTRUTURA — fotos em cascata
        gsap.from('.estrutura-foto', {
            scrollTrigger: { trigger: '.estrutura-galeria', start: 'top 85%', once: true },
            immediateRender: false,
            duration: 0.6, y: 40, opacity: 0, stagger: 0.15, ease: 'power2.out'
        });

        // LOCALIZAÇÃO — info da esquerda
        gsap.from('.localizacao-info', {
            scrollTrigger: { trigger: '.localizacao', start: 'top 80%', once: true },
            immediateRender: false,
            duration: 0.9, x: -60, opacity: 0, ease: 'power2.out'
        });

        // LOCALIZAÇÃO — imagem da direita
        gsap.from('.localizacao-imagem', {
            scrollTrigger: { trigger: '.localizacao', start: 'top 80%', once: true },
            immediateRender: false,
            duration: 0.9, x: 60, opacity: 0, ease: 'power2.out'
        });

        // RODAPÉ
        gsap.from('.footer-copyright, .footer-logo, .footer-social', {
            scrollTrigger: { trigger: '.footer', start: 'top 95%', once: true },
            immediateRender: false,
            duration: 0.6, y: 20, opacity: 0, stagger: 0.15, ease: 'power2.out'
        });
    }
    // ───────────────────────────────────────────────────────────────

    // Preload das imagens
    const images = [
        'assets/MONTE SINAI - LOGO HORIZONTAL BRANCO E VERDE.png',
        'assets/MS - CONSULTORIO 1.png'
    ];
    images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });

});