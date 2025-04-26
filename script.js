document.addEventListener('DOMContentLoaded', () => {
    initializeGSAPAnimations();
    initializeMobileMenu();
    initializeImageGallery();
    initializeParallaxEffect();
    initializeSearchFunctionality();
    injectHamburgerCSS();

    const lenis = new Lenis({
        autoRaf: true,
      });
      
      // Listen for the scroll event and log the event data
      lenis.on('scroll', (e) => {
        console.log(e);
      });
                //   // Animate the header
                //   gsap.from("#section-header", {
                //     duration: 1,
                //     y: 50,
                //     opacity: 0,
                //     ease: "power3.out"
                // });
    
                // // Animate each service card with stagger
                // gsap.from(".service-card", {
                //     scrollTrigger: {
                //         trigger: "#services-grid",
                //         start: "top 80%",
                //         toggleActions: "play none none none"
                //     },
                //     duration: 0.8,
                //     y: 50,
                //     opacity: 0,
                //     stagger: 0.15,
                //     ease: "back.out(1.2)"
                // });
    
                // // Add hover animations
                // document.querySelectorAll('.service-card').forEach(card => {
                //     card.addEventListener('mouseenter', () => {
                //         gsap.to(card, {
                //             duration: 0.3,
                //             y: -5,
                //             boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                //             ease: "power2.out"
                //         });
                //     });
                    
                //     card.addEventListener('mouseleave', () => {
                //         gsap.to(card, {
                //             duration: 0.3,
                //             y: 0,
                //             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                //             ease: "power2.out"
                //         });
                //     });
                // });
    
   
});

// Add this new function for mega menu animations


// Rest of your existing functions remain unchanged...
const heroImages = [
    { id: 1, title: "Celebrating 25 Years of AMDA Siddhartha Children and Women Hospital_Butwal_20800716", src: "https://www.amda.org.np/files/pics/25th%20Anniversary%20of%20SCWH.jpg" },
    { id: 2, title: "AMDA 65th General Assembly", src: "https://amda.org.np/files/pics/65GA_20810724.jpg" },
    { id: 3, title: "Strategic Planning AMDA Nepal", src: "https://amda.org.np/files/pics/StragetigPlanning_20810904-5.png" },
    { id: 4, title: "AMDA Nepal - AIHS Damak", src: "https://amda.org.np/files/pics/AIHS_Damak-923.jpg" },
    { id: 5, title: "Relief Materials to Earthquake Victims_Jajarkor-Rukum Paschim_20800723", src: "https://amda.org.np/files/pics/ReliefMaterialsToEarthquakeVictims_Jajarkor-Rukum%20Paschim_20800723.png" },
    { id: 6, title: "AMDA Nepal - Event Image", src: "https://www.amda.org.np/files/pics/3.jpg" }
];
// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button'); 
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    const megaMenuButton = document.getElementById('mobile-mega-menu-button');
    const megaMenu = document.getElementById('mobile-mega-menu');

    mobileMenuButton?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('open');
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });

    closeMenu?.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
    });

    megaMenuButton?.addEventListener('click', () => {
        const isExpanded = megaMenuButton.getAttribute('aria-expanded') === 'true';
        megaMenuButton.setAttribute('aria-expanded', !isExpanded);
        megaMenuButton.querySelector('svg')?.classList.toggle('rotate-180');
        
        if (isExpanded) {
            megaMenu.style.maxHeight = '0px';
        } else {
            megaMenu.style.maxHeight = megaMenu.scrollHeight + 'px';
        }
    });
}

// GSAP Text Animations
function initializeGSAPAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".text-reveal", { duration: 1.2, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 50, opacity: 0, stagger: 0.2 })
      .to("p", { duration: 0.8, opacity: 1, y: 0 }, "-=0.6")
      .to(".flex.justify-center", { duration: 0.8, opacity: 1, y: 0 }, "-=0.4")
      .to(".absolute.bottom-10", { duration: 0.6, opacity: 1, y: 0 }, "-=0.4");
}

// Parallax on scroll (for video)
function initializeParallaxEffect() {
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const video = document.querySelector('video');
            if (video) {
                video.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }
}

// Hero Image Gallery
function initializeImageGallery() {
    let currentIndex = 0;
    const galleryImage = document.querySelector('.gallery-image');
    const herotext = document.querySelector('.textheading');
    const dotsContainer = document.querySelector('.absolute.bottom-8');

    if (!galleryImage || !dotsContainer) return;

    heroImages.forEach((image, index) => {
        const dot = document.createElement('div');
        dot.className = `dot w-3 h-3 rounded-full bg-white/50 cursor-pointer ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => changeImage(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function changeImage(newIndex) {
        if (newIndex === currentIndex) return;

        const tl = gsap.timeline();
        tl.to(galleryImage, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                galleryImage.src = heroImages[newIndex].src;
                dots[currentIndex].classList.remove('active');
                dots[newIndex].classList.add('active');
                currentIndex = newIndex;
            }
        }).to(galleryImage, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    }

    document.querySelector('.next')?.addEventListener('click', () => {
        changeImage((currentIndex + 1) % heroImages.length);
    });

    document.querySelector('.prev')?.addEventListener('click', () => {
        changeImage((currentIndex - 1 + heroImages.length) % heroImages.length);
    });

    let interval = setInterval(() => {
        changeImage((currentIndex + 1) % heroImages.length);
    }, 4000);

    const gallery = document.querySelector('header');
    gallery?.addEventListener('mouseenter', () => clearInterval(interval));
    gallery?.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            changeImage((currentIndex + 1) % heroImages.length);
        }, 4000);
    });
}

// Search toggle functionality
function initializeSearchFunctionality() {
    const searchButton = document.getElementById("mobile-search-button");
    const searchBox = document.getElementById("search-box");

    let isOpen = false;

    searchButton?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!isOpen) {
            gsap.to(searchBox, { x: 0, opacity: 1, duration: 0.3, pointerEvents: "auto" });
        } else {
            gsap.to(searchBox, { x: 20, opacity: 0, duration: 0.3, pointerEvents: "none" });
        }
        isOpen = !isOpen;
    });

    document.addEventListener("click", (e) => {
        if (searchBox && !searchBox.contains(e.target)) {
            gsap.to(searchBox, { x: 20, opacity: 0, duration: 0.3, pointerEvents: "none" });
            isOpen = false;
        }
    });
}

// Inject hamburger toggle CSS
function injectHamburgerCSS() {
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
}
function dynamicStickyNav() {
    const nav = document.querySelector(".desktopNav");
    const originalPosition = nav.style.position; // Store original position
    const originalTop = nav.style.top; // Store original top
    const navHeight = nav.offsetHeight;
    const originalBgColor = "bg-white";
    const scrolledBgColor = "bg-[#002D71]";
    const originalTextColor = "text-gray-800";
    const scrolledTextColor = "text-white";

    // Set initial state (non-sticky)
    gsap.set(nav, {
        position: "relative",
        top: "auto",
        width: "auto"
    });

    // Create ScrollTrigger
    ScrollTrigger.create({
        trigger: "body",
        start: "top 10%",
        end: "max",
        onUpdate: (self) => {
            const scrollY = self.scroll();
            const threshold = window.innerHeight * 0.05; // 5% of viewport height
            
            if (scrollY > threshold) {
                // Scrolled past 5% - make sticky and change style
                gsap.to(nav, {
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    duration: 0.3
                });
                nav.classList.remove(originalBgColor);
                nav.classList.add(scrolledBgColor);
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove(originalTextColor);
                    link.classList.add(scrolledTextColor);
                });
                
                // Add padding only when sticky
                document.body.style.paddingTop = `${navHeight}px`;
            } else {
                // Back at top - revert to original position and style
                gsap.to(nav, {
                    position: "relative",
                    top: "auto",
                    width: "auto",
                    duration: 0.3
                });
                nav.classList.add(originalBgColor);
                nav.classList.remove(scrolledBgColor);
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.add(originalTextColor);
                    link.classList.remove(scrolledTextColor);
                });
                
                // Remove padding when not sticky
                document.body.style.paddingTop = "0";
            }
        },
        markers: false // Set to true for debugging
    });
}

// Initialize when DOM is loaded and GSAP is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        dynamicStickyNav();
    } else {
        console.error("GSAP or ScrollTrigger not loaded");
    }
});
  dynamicStickyNav();
  function loading() {
    let tl = gsap.timeline(); // fixed typo here
    tl.to(".loadinggg div", {
      top: "-50%",
      height: 0,
      stagger: 0.2,
    });
    tl.to(".loadinggg", {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        document.querySelector(".loadinggg").style.display = "none";
      }
    });
  }
  
  loading();
  function startMarquee() {
    document.querySelectorAll('.marquee-content').forEach((el) => {
        // Duplicate the content multiple times for seamless looping
        const originalContent = el.innerHTML;
        el.innerHTML = originalContent.repeat(5); // Repeat 3 times for smooth effect

        const width = el.offsetWidth / 3; // Width of original content
        el.style.width = `${width * 3}px`; // Set width to accommodate duplicated content

        // GSAP animation
        const animation = gsap.fromTo(
            el,
            { x: 0 },
            {
                x: -width, // Move by the width of the original content
                duration:20, // Adjust speed as needed
                ease: 'linear',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % width) // Seamless loop
                }
            }
        );

        // Pause on hover
        el.addEventListener('mouseenter', () => {
            animation.pause();
        });

        // Resume on leave
        el.addEventListener('mouseleave', () => {
            animation.play();
        });
    });
}

// Initialize marquee
startMarquee();
  
document.addEventListener('DOMContentLoaded', () => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Smooth scrolling (similar to Lenis)
    gsap.to(window, {
        scrollTo: 0,
        duration: 1
    });
    
    // Card animations
    const cards = gsap.utils.toArray('.card');
    
    cards.forEach((card, i) => {
        const imageInner = card.querySelector('.card-image-inner');
        
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
        
        // Card scale animation (skip scaling for the last card)
        if (i !== cards.length - 1) {
            const targetScale = 1 - ((cards.length - i) * 0.05);
            gsap.to(card, {
                scale: targetScale,
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
});