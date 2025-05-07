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
        tabOfContent();
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
    function tabOfContent(){
        const tabWrapper = document.getElementById('tab-block');
        const tabMnu = tabWrapper.querySelectorAll('ul li');
        const tabContent = tabWrapper.querySelectorAll('.tab-pane');

        // Initialize first tab as active with GSAP
        gsap.set(tabContent[0], { 
            opacity: 1, 
            height: 'auto',
            display: 'block'
        });
        
        // Add data-tab attributes
        tabMnu.forEach((tab, index) => {
            tab.dataset.tab = 'tab' + index;
            
            // Micro-interactions with GSAP
            tab.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active-tab')) {
                    gsap.to(this, {
                        y: -2,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
            
            tab.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            tab.addEventListener('mousedown', function() {
                if (!this.classList.contains('active-tab')) {
                    gsap.to(this, {
                        y: 1,
                        duration: 0.1,
                        ease: "power2.out"
                    });
                }
            });
            
            tab.addEventListener('mouseup', function() {
                gsap.to(this, {
                    y: -2,
                    duration: 0.1,
                    ease: "power2.out"
                });
            });
        });
        
        tabContent.forEach((pane, index) => {
            pane.dataset.tab = 'tab' + index;
        });

        // Add click event listeners to tabs
        tabMnu.forEach(tab => {
            tab.addEventListener('click', function() {
                if (this.classList.contains('active-tab')) return;
                
                const tabData = this.dataset.tab;
                const activePane = tabWrapper.querySelector(`.tab-pane[data-tab="${tabData}"]`);
                const currentActivePane = tabWrapper.querySelector('.tab-pane.active');
                
                // Animate out current active tab content
                if (currentActivePane) {
                    gsap.to(currentActivePane, {
                        opacity: 0,
                        height: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            currentActivePane.classList.remove('active');
                        }
                    });
                }
                
                // Animate in new tab content
                if (activePane) {
                    activePane.classList.add('active');
                    gsap.fromTo(activePane, 
                        { opacity: 0, height: 0 },
                        { 
                            opacity: 1, 
                            height: 'auto',
                            duration: 0.4,
                            ease: "power2.inOut",
                            delay: 0.1
                        }
                    );
                }
                
                // Update active tab styling with animation
                const activeTab = tabWrapper.querySelector('ul li.active-tab');
                if (activeTab) {
                    // Animate out old active tab
                    gsap.to(activeTab, {
                        backgroundColor: '#b2bbc0',
                        color: '#ffffff',
                        borderBottomWidth: '0px',
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            activeTab.classList.remove('active-tab', 'bg-white', 'text-[#596165]', 'border-b-2', 'border-[#4c607c]', 'cursor-default');
                            activeTab.classList.add('bg-[#b2bbc0]', 'text-white', 'cursor-pointer', 'hover:bg-[#bdc5c9]');
                        }
                    });
                }
                
                // Animate in new active tab
                gsap.to(this, {
                    backgroundColor: '#ffffff',
                    color: '#596165',
                    borderBottomWidth: '2px',
                    borderBottomColor: '#4c607c',
                    duration: 0.3,
                    ease: "power2.inOut",
                    onStart: () => {
                        this.classList.remove('bg-[#b2bbc0]', 'text-white', 'cursor-pointer', 'hover:bg-[#bdc5c9]');
                        this.classList.add('active-tab', 'bg-white', 'text-[#596165]', 'border-b-2', 'border-[#4c607c]', 'cursor-default');
                    }
                });
            });
        });

    }
    // Mobile Menu Toggle
   const initializeMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuButton || !mobileMenu) return;

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const spans = mobileMenuButton.querySelectorAll('span');

        if (spans.length === 3) {
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });

    // Dropdown functionality
    const dropdownButtons = document.querySelectorAll('.mobile-dropdown-btn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const dropdownContent = document.getElementById(targetId);
            if (!dropdownContent) return;

            dropdownContent.classList.toggle('open');

            // Rotate arrow icon
            const icon = button.querySelector('svg');
            if (icon) {
                icon.style.transform = dropdownContent.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
            }

            // Close other dropdowns
            const parentDropdown = button.closest('.mobile-dropdown');
            if (parentDropdown) {
                const openDropdowns = parentDropdown.querySelectorAll('.mobile-dropdown-content.open');
                openDropdowns.forEach(openDropdown => {
                    if (openDropdown !== dropdownContent) {
                        openDropdown.classList.remove('open');
                        const siblingBtn = openDropdown.previousElementSibling;
                        if (siblingBtn?.classList.contains('mobile-dropdown-btn')) {
                            const siblingIcon = siblingBtn.querySelector('svg');
                            if (siblingIcon) siblingIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
            }
        });
    });

    // Global click to close menus
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = e.target.closest('.mobile-dropdown') || e.target.closest('#mobileMenuButton') || e.target.closest('#mobileMenu');

        if (!isClickInsideMenu) {
            // Close all open dropdowns
            document.querySelectorAll('.mobile-dropdown-content.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                const btn = dropdown.previousElementSibling;
                if (btn?.classList.contains('mobile-dropdown-btn')) {
                    const icon = btn.querySelector('svg');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            });

            // Close mobile menu
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                const spans = mobileMenuButton.querySelectorAll('span');
                if (spans.length === 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    });
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
const initializeMobileMenu = () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        
        // Toggle hamburger icon
        const spans = mobileMenuButton.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Mobile dropdown functionality
    const dropdownButtons = document.querySelectorAll('.mobile-dropdown-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const dropdownContent = document.getElementById(targetId);
            
            // Toggle the clicked dropdown
            dropdownContent.classList.toggle('open');
            
            // Rotate the arrow icon
            const icon = button.querySelector('svg');
            if (dropdownContent.classList.contains('open')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Close other dropdowns at the same level
            const parentDropdown = button.closest('.mobile-dropdown-content');
            if (parentDropdown) {
                const siblings = parentDropdown.querySelectorAll('.mobile-dropdown-content');
                siblings.forEach(sibling => {
                    if (sibling !== dropdownContent && sibling.classList.contains('open')) {
                        sibling.classList.remove('open');
                        const siblingButton = sibling.previousElementSibling;
                        if (siblingButton && siblingButton.classList.contains('mobile-dropdown-btn')) {
                            siblingButton.querySelector('svg').style.transform = 'rotate(0deg)';
                        }
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-dropdown') && !e.target.closest('#mobileMenuButton')) {
            const openDropdowns = document.querySelectorAll('.mobile-dropdown-content.open');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
                const button = dropdown.previousElementSibling;
                if (button && button.classList.contains('mobile-dropdown-btn')) {
                    button.querySelector('svg').style.transform = 'rotate(0deg)';
                }
            });
            
            // Also close the mobile menu if clicking outside
            if (!e.target.closest('.megaMenu') && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                const spans = mobileMenuButton.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
};
document.addEventListener('DOMContentLoaded', initializeMobileMenu);