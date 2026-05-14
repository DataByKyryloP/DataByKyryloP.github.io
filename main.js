document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Highlight active nav item on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    function setActiveNav() {
        let scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`nav a[href="#${section.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Fade-in on scroll using IntersectionObserver
    const fadeEls = document.querySelectorAll('.project-card, .skill-block, .about-grid');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Active nav style
    const styleEl = document.createElement('style');
    styleEl.textContent = `nav ul li a.active { color: #0BCEAC; } nav ul li a.active::after { transform: scaleX(1); }`;
    document.head.appendChild(styleEl);

});
