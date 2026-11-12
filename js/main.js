
/* =====================================================
   TIERRA DE NADIE — GAMING INTERACTIONS
   Version 2.0
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouch = window.matchMedia(
        "(hover: none), (pointer: coarse)"
    ).matches;

    // ================================================
    // MENÚ MÓVIL
    // ================================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                menuToggle.textContent = "☰";
            });
        });

        document.addEventListener("click", event => {

            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            }
        });
    }

    // ================================================
    // AÑO AUTOMÁTICO
    // ================================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ================================================
    // SISTEMA DE DESCARGA
    // ================================================

    const DOWNLOAD_URL = "https://drive.google.com/file/d/1J76k8QR-DLXY2CJlXE-0byySuyctrVX4/view?usp=sharing";

    const downloadButton = document.getElementById(
        "downloadButton"
    );

    const downloadNote = document.getElementById(
        "downloadNote"
    );

    if (downloadButton && DOWNLOAD_URL.trim()) {

        downloadButton.href = DOWNLOAD_URL;

        downloadButton.target = "_blank";

        downloadButton.rel = "noopener noreferrer";

        downloadButton.removeAttribute("aria-disabled");

        downloadButton.innerHTML =
            'DESCARGAR JUEGO <span>↗</span>';

        if (downloadNote) {

            downloadNote.textContent =
                "Versión para Windows · Descarga disponible";
        }
    }

    // ================================================
    // BARRA DE PROGRESO
    // ================================================

    const scrollProgress = document.getElementById(
        "scrollProgress"
    );

    let scrollTicking = false;

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        if (scrollProgress) {

            scrollProgress.style.width =
                `${Math.min(progress, 100)}%`;
        }

        scrollTicking = false;
    }

    window.addEventListener("scroll", () => {

        if (!scrollTicking) {

            requestAnimationFrame(updateScrollProgress);

            scrollTicking = true;
        }

    }, { passive: true });

    updateScrollProgress();

    // ================================================
    // ANIMACIONES DE APARICIÓN
    // ================================================

    function initRevealAnimations() {

        if (reduceMotion) return;

        const elements = document.querySelectorAll(`
            .section-kicker,
            .section-heading,
            .intro-grid > div,
            .quote-line,
            .feature-card,
            .level-row,
            .arsenal-copy,
            .weapon-item,
            .gallery-shot,
            .download-content,
            .download-stamp,
            .requirements,
            .footer-brand,
            .credits,
            .team-member
        `);

        elements.forEach((element, index) => {

            if (element.classList.contains("reveal")) return;

            element.classList.add("reveal");

            if (
                element.classList.contains("level-row") ||
                element.classList.contains("weapon-item") ||
                element.classList.contains("feature-card") ||
                element.classList.contains("gallery-shot") ||
                element.classList.contains("team-member")
            ) {

                element.style.transitionDelay =
                    `${(index % 5) * 70}ms`;
            }
        });

        document.body.classList.add("motion-ready");

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    } else {

                        entry.target.classList.remove("visible");
                    }
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // ================================================
    // EFECTO 3D EN TARJETAS
    // ================================================

    function initTiltCards() {

        if (reduceMotion || isTouch) return;

        const cards = document.querySelectorAll(`
            .feature-card,
            .weapon-item,
            .team-member,
            .gallery-shot
        `);

        cards.forEach(card => {

            card.classList.add("tilt-card");

            card.addEventListener("pointermove", event => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                const rotateX =
                    ((centerY - y) / centerY) * 5;

                card.style.setProperty(
                    "--tilt-x",
                    `${rotateX}deg`
                );

                card.style.setProperty(
                    "--tilt-y",
                    `${rotateY}deg`
                );

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );
            });

            card.addEventListener("pointerleave", () => {

                card.style.setProperty("--tilt-x", "0deg");

                card.style.setProperty("--tilt-y", "0deg");
            });
        });
    }

    // ================================================
    // EFECTO MAGNÉTICO EN BOTONES
    // ================================================

    function initMagneticButtons() {

        if (reduceMotion || isTouch) return;

        const buttons = document.querySelectorAll(`
            .button,
            .nav-download,
            .footer-bottom > a
        `);

        buttons.forEach(button => {

            button.addEventListener("pointermove", event => {

                const rect = button.getBoundingClientRect();

                const x =
                    event.clientX - rect.left - rect.width / 2;

                const y =
                    event.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.10}px, ${y * 0.10}px)`;
            });

            button.addEventListener("pointerleave", () => {

                button.style.transform = "";
            });
        });
    }

    // ================================================
    // EFECTO RIPPLE AL HACER CLIC
    // ================================================

    function initRippleEffect() {

        const buttons = document.querySelectorAll(
            ".button, .nav-download"
        );

        buttons.forEach(button => {

            button.addEventListener("click", event => {

                if (
                    button.hasAttribute("aria-disabled") ||
                    button.getAttribute("aria-disabled") === "true"
                ) {
                    return;
                }

                const rect = button.getBoundingClientRect();

                const ripple = document.createElement("span");

                const size = Math.max(
                    rect.width,
                    rect.height
                );

                ripple.className = "button-ripple";

                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                button.appendChild(ripple);

                ripple.addEventListener("animationend", () => {
                    ripple.remove();
                });
            });
        });
    }


    // ================================================
    // EFECTO PARALLAX EN PORTADA
    // ================================================

    function initHeroParallax() {

        if (reduceMotion || isTouch) return;

        const hero = document.querySelector(".hero");

        const heroArt = document.querySelector(".hero-art");

        if (!hero || !heroArt) return;

        hero.addEventListener("pointermove", event => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width;

            const y =
                (event.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 12;
            const moveY = (y - 0.5) * 12;

            heroArt.style.setProperty(
                "--parallax-x",
                `${moveX}px`
            );

            heroArt.style.setProperty(
                "--parallax-y",
                `${moveY}px`
            );

        });

        hero.addEventListener("pointerleave", () => {

            heroArt.style.setProperty("--parallax-x", "0px");
            heroArt.style.setProperty("--parallax-y", "0px");
        });
    }

    // ================================================
    // NAVEGACIÓN ACTIVA
    // ================================================

    function initActiveNavigation() {

        const sections = document.querySelectorAll(
            "main section[id]"
        );

        const navLinks = document.querySelectorAll(
            ".main-nav a[href^='#']"
        );

        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        const isActive =
                            link.getAttribute("href") ===
                            `#${currentId}`;

                        link.classList.toggle(
                            "active-section",
                            isActive
                        );
                    });
                });

            },
            {
                threshold: 0,
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ================================================
    // PARTÍCULAS NEON
    // ================================================

    function initParticles() {

        const canvas = document.getElementById("particles");

        if (!canvas || reduceMotion) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        let width = 0;
        let height = 0;

        let particles = [];

        const particleCount = Math.min(
            85,
            Math.max(35, Math.floor(window.innerWidth / 16))
        );

        const colors = [
            "168, 85, 247",
            "59, 130, 246",
            "34, 211, 238"
        ];

        function resize() {

            const ratio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * ratio;
            canvas.height = height * ratio;

            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );

            particles = Array.from(
                { length: particleCount },
                () => ({

                    x: Math.random() * width,
                    y: Math.random() * height,

                    radius: Math.random() * 1.7 + 0.5,

                    speed: Math.random() * 0.35 + 0.08,

                    drift: (Math.random() - 0.5) * 0.35,

                    alpha: Math.random() * 0.55 + 0.2,

                    pulse: Math.random() * 0.012 + 0.003,

                    color: colors[
                        Math.floor(Math.random() * colors.length)
                    ]
                })
            );
        }

        function drawConnections() {

            const maxDistance = 115;

            for (let i = 0; i < particles.length; i++) {

                for (let j = i + 1; j < particles.length; j++) {

                    const a = particles[i];
                    const b = particles[j];

                    const dx = a.x - b.x;
                    const dy = a.y - b.y;

                    const distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance < maxDistance) {

                        const opacity =
                            (1 - distance / maxDistance) * 0.13;

                        ctx.beginPath();

                        ctx.strokeStyle =
                            `rgba(120, 100, 255, ${opacity})`;

                        ctx.lineWidth = 0.6;

                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);

                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {

            if (document.hidden) {

                requestAnimationFrame(animate);

                return;
            }

            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {

                p.y -= p.speed;
                p.x += p.drift;

                p.alpha += p.pulse;

                if (p.alpha > 0.78 || p.alpha < 0.12) {
                    p.pulse *= -1;
                }

                if (p.y < -5) {

                    p.y = height + 5;
                    p.x = Math.random() * width;
                }

                if (p.x < -5) p.x = width + 5;

                if (p.x > width + 5) p.x = -5;

                ctx.beginPath();

                ctx.fillStyle =
                    `rgba(${p.color}, ${p.alpha})`;

                ctx.shadowColor =
                    `rgba(${p.color}, 0.7)`;

                ctx.shadowBlur = p.radius * 6;

                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

            ctx.shadowBlur = 0;

            drawConnections();

            requestAnimationFrame(animate);
        }

        resize();

        window.addEventListener(
            "resize",
            resize,
            { passive: true }
        );

        animate();
    }

    // ================================================
    // INICIAR TODAS LAS INTERACCIONES
    // ================================================

    initRevealAnimations();

    initTiltCards();

    initMagneticButtons();

    initRippleEffect();

    initHeroParallax();

    initActiveNavigation();

    initParticles();

});
