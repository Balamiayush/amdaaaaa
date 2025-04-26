document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP plugins
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Main initialization function
    const init = () => {
        initializeSmoothScrolling();
        initializeMobileMenu();
        initializeImageGallery();
        initializeParallaxEffect();
        initializeSearchFunctionality();
        initializeStickyNav();
        initializeLoadingAnimation();
        initializeMarquee();
        initializeCardAnimations();
        initializeHeaderAnimations();
        injectHamburgerCSS();
    };

    // Smooth scrolling with Lenis
    const initializeSmoothScrolling = () => {
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                lerp: 0.1,
                smooth: true,
                direction: 'vertical'
            });

            const raf = (time) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }
    };

    // Mobile Menu Toggle
    const initializeMobileMenu = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');
        const megaMenuButton = document.getElementById('mobile-mega-menu-button');
        const megaMenu = document.getElementById('mobile-mega-menu');

        const toggleMenu = (menu, button) => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (menu === mobileMenu) {
                menu?.classList.toggle('hidden');
                button.classList.toggle('open');
            } else if (menu === megaMenu) {
                button.querySelector('svg')?.classList.toggle('rotate-180');
                menu.style.maxHeight = isExpanded ? '0px' : `${menu.scrollHeight}px`;
            }
        };

        mobileMenuButton?.addEventListener('click', () => toggleMenu(mobileMenu, mobileMenuButton));
        closeMenu?.addEventListener('click', () => mobileMenu?.classList.add('hidden'));
        megaMenuButton?.addEventListener('click', () => toggleMenu(megaMenu, megaMenuButton));
    };

    // Hero Image Gallery
    const initializeImageGallery = () => {
        const heroImages = [
            { id: 1, title: "Celebrating 25 Years of AMDA Siddhartha Children and Women Hospital_Butwal_20800716", src: "https://www.amda.org.np/files/pics/25th%20Anniversary%20of%20SCWH.jpg" },
            { id: 2, title: "AMDA 65th General Assembly", src: "https://amda.org.np/files/pics/65GA_20810724.jpg" },
            { id: 3, title: "Strategic Planning AMDA Nepal", src: "https://amda.org.np/files/pics/StragetigPlanning_20810904-5.png" },
            { id: 4, title: "AMDA Nepal - AIHS Damak", src: "https://amda.org.np/files/pics/AIHS_Damak-923.jpg" },
            { id: 5, title: "Relief Materials to Earthquake Victims_Jajarkor-Rukum Paschim_20800723", src: "https://amda.org.np/files/pics/ReliefMaterialsToEarthquakeVictims_Jajarkor-Rukum%20Paschim_20800723.png" },
            { id: 6, title: "AMDA Nepal - Event Image", src: "https://www.amda.org.np/files/pics/3.jpg" }
        ];

        const galleryImage = document.querySelector('.gallery-image');
        const dotsContainer = document.querySelector('.absolute.bottom-8');
        if (!galleryImage || !dotsContainer) return;

        let currentIndex = 0;
        let interval;
        const dots = [];

        // Create dots
        heroImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot w-3 h-3 rounded-full bg-white/50 cursor-pointer ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => changeImage(index));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });

        const changeImage = (newIndex) => {
            if (newIndex === currentIndex) return;

            gsap.to(galleryImage, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    galleryImage.src = heroImages[newIndex].src;
                    dots[currentIndex].classList.remove('active');
                    dots[newIndex].classList.add('active');
                    currentIndex = newIndex;
                    gsap.to(galleryImage, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
                }
            });
        };

        const setupGalleryControls = () => {
            document.querySelector('.next')?.addEventListener('click', () => {
                changeImage((currentIndex + 1) % heroImages.length);
            });

            document.querySelector('.prev')?.addEventListener('click', () => {
                changeImage((currentIndex - 1 + heroImages.length) % heroImages.length);
            });
        };

        const startAutoPlay = () => {
            interval = setInterval(() => {
                changeImage((currentIndex + 1) % heroImages.length);
            }, 4000);
        };

        const gallery = document.querySelector('header');
        gallery?.addEventListener('mouseenter', () => clearInterval(interval));
        gallery?.addEventListener('mouseleave', startAutoPlay);

        setupGalleryControls();
        startAutoPlay();
    };

    // Parallax Effect
    const initializeParallaxEffect = () => {
        if (window.innerWidth > 768) {
            const video = document.querySelector('video');
            if (!video) return;

            window.addEventListener('scroll', () => {
                video.style.transform = `translateY(${window.scrollY * 0.3}px)`;
            }, { passive: true });
        }
    };

    // Search Functionality
    const initializeSearchFunctionality = () => {
        const searchButton = document.getElementById("mobile-search-button");
        const searchBox = document.getElementById("search-box");
        if (!searchButton || !searchBox) return;

        let isOpen = false;

        const toggleSearch = (e) => {
            e?.stopPropagation();
            isOpen = !isOpen;
            gsap.to(searchBox, {
                x: isOpen ? 0 : 20,
                opacity: isOpen ? 1 : 0,
                duration: 0.3,
                pointerEvents: isOpen ? "auto" : "none"
            });
        };

        searchButton.addEventListener("click", toggleSearch);
        document.addEventListener("click", (e) => {
            if (isOpen && !searchBox.contains(e.target)) {
                toggleSearch();
            }
        });
    };

    // Sticky Navigation
    const initializeStickyNav = () => {
        const nav = document.querySelector(".desktopNav");
        if (!nav) return;

        const navHeight = nav.offsetHeight;
        const originalClasses = {
            bg: "bg-white",
            text: "text-gray-800"
        };
        const scrolledClasses = {
            bg: "bg-[#002D71]",
            text: "text-white"
        };

        ScrollTrigger.create({
            trigger: "body",
            start: "top 10%",
            end: "max",
            onUpdate: (self) => {
                const isScrolled = self.scroll() > window.innerHeight * 0.05;
                
                gsap.to(nav, {
                    position: isScrolled ? "fixed" : "relative",
                    top: isScrolled ? 0 : "auto",
                    width: isScrolled ? "100%" : "auto",
                    duration: 0.3
                });

                nav.classList.toggle(originalClasses.bg, !isScrolled);
                nav.classList.toggle(scrolledClasses.bg, isScrolled);
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle(originalClasses.text, !isScrolled);
                    link.classList.toggle(scrolledClasses.text, isScrolled);
                });
                
                document.body.style.paddingTop = isScrolled ? `${navHeight}px` : "0";
            }
        });
    };

    // Loading Animation
    const initializeLoadingAnimation = () => {
        const loadingEl = document.querySelector(".loadinggg");
        if (!loadingEl) return;

        gsap.timeline()
            .to(".loadinggg div", {
                top: "-50%",
                height: 0,
                stagger: 0.2
            })
            .to(".loadinggg", {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    loadingEl.style.display = "none";
                }
            });
    };

    // Marquee Animation
    const initializeMarquee = () => {
      
            document.querySelectorAll('.marquee-content').forEach((el) => {
                const originalContent = el.innerHTML;
                el.innerHTML = originalContent.repeat(2);
                const width = el.offsetWidth / 3;
                el.style.width = `${width * 3}px`;
    
                const animation = gsap.fromTo(
                    el,
                    { x: 0 },
                    {
                        x: -width,
                        duration: 20,
                        ease: 'linear',
                        repeat: -1,
                        modifiers: {
                            x: gsap.utils.unitize((x) => parseFloat(x) % width)
                        }
                    }
                );
    
                el.addEventListener('mouseenter', () => animation.pause());
                el.addEventListener('mouseleave', () => animation.play());
            });
   
    };

    // Card Animations
    const initializeCardAnimations = () => {
        const cards = gsap.utils.toArray('.card');
        if (!cards.length) return;

        cards.forEach((card, i) => {
            const imageInner = card.querySelector('.card-image-inner');
            if (!imageInner) return;

            // Image scale animation
            gsap.fromTo(imageInner, 
                { scale: 1.5 },
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: card.parentElement,
                        start: "top bottom",
                        end: "top top",
                        scrub: 1
                    }
                }
            );

            // Skip scaling for the last card
            if (i !== cards.length - 1) {
                gsap.to(card, {
                    scale: 1 - ((cards.length - i) * 0.05),
                    scrollTrigger: {
                        trigger: card.parentElement,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1
                    }
                });
            }

            // Card position animation
            gsap.to(card, {
                y: -i * 10,
                scrollTrigger: {
                    trigger: card.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    };

    // Header Animations
    const initializeHeaderAnimations = () => {
        // Section header animation
        gsap.from("#section-header h1", {
            scrollTrigger: {
                trigger: "#section-header",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from("#section-header p", {
            scrollTrigger: {
                trigger: "#section-header",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });

        // Service cards animation
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: "#services-grid",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)"
        });

        // Card hover effects
        document.querySelectorAll('.service-card').forEach((card) => {
            const hoverEffect = card.querySelector('.card-hover-effect');
            if (!hoverEffect) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                gsap.to(hoverEffect, {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.3 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3 });
            });
        });
    };

    // Inject hamburger toggle CSS
    const injectHamburgerCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
            .hamburger.open .hamburger-line:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }
            .hamburger.open .hamburger-line:nth-child(2) {
                opacity: 0;
            }
            .hamburger.open .hamburger-line:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }
            .rotate-180 {
                transform: rotate(180deg);
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize everything
    init();
});