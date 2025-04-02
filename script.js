const heroImages = [
    { "id": 1, "title": "Celebrating 25 Years of AMDA Siddhartha Children and Women Hospital_Butwal_20800716", "src": "https://www.amda.org.np/files/pics/25th%20Anniversary%20of%20SCWH.jpg" },
    { "id": 2, "title": "AMDA 65th General Assembly", "src": "https://amda.org.np/files/pics/65GA_20810724.jpg" },
    { "id": 3, "title": "Strategic Planning AMDA Nepal", "src": "https://amda.org.np/files/pics/StragetigPlanning_20810904-5.png" },
    { "id": 4, "title": "AMDA Nepal - AIHS Damak", "src": "https://amda.org.np/files/pics/AIHS_Damak-923.jpg" },
    { "id": 5, "title": "Relief Materials to Earthquake Victims_Jajarkor-Rukum Paschim_20800723", "src": "https://amda.org.np/files/pics/ReliefMaterialsToEarthquakeVictims_Jajarkor-Rukum%20Paschim_20800723.png" },
    { "id": 6, "title": "AMDA Nepal - Event Image", "src": "https://www.amda.org.np/files/pics/3.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis
    const lenis = new Lenis({ autoRaf: true });

    // Initialize all necessary functionalities
    initializeMobileMenu();
    initializeMobileMegaMenu();
    initializeDesktopMegaMenu();
    initializeGSAPAnimations();
    initializeImageGallery();
    initializeParallaxEffect();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Mobile Mega Menu Toggle
function initializeMobileMegaMenu() {
    const mobileMegaMenuButton = document.getElementById('mobile-mega-menu-button');
    const mobileMegaMenu = document.getElementById('mobile-mega-menu'); // Corrected this line
    const mobileMegaMenuIcon = mobileMegaMenuButton.querySelector('svg');

    mobileMegaMenuButton.addEventListener('click', () => {
        mobileMegaMenu.classList.toggle('max-h-0');
        mobileMegaMenu.classList.toggle('max-h-screen');
        mobileMegaMenuIcon.classList.toggle('rotate-180');
    });

}

// Desktop Mega Menu Hover Effect
function initializeDesktopMegaMenu() {
    const megaMenu = document.querySelector('.group');
    const megaMenuDropdown = document.querySelector('.mega-menu');

    megaMenu.addEventListener('mouseenter', () => {
        megaMenuDropdown.classList.add('active');
    });

    megaMenu.addEventListener('mouseleave', () => {
        megaMenuDropdown.classList.remove('active');
    });
}

// GSAP Animation for Text and Elements
function initializeGSAPAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".text-reveal", { duration: 1.2, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 50, opacity: 0, stagger: 0.2 })
      .to("p", { duration: 0.8, opacity: 1, y: 0 }, "-=0.6")
      .to(".flex.justify-center", { duration: 0.8, opacity: 1, y: 0 }, "-=0.4")
      .to(".absolute.bottom-10", { duration: 0.6, opacity: 1, y: 0 }, "-=0.4");
}

// Background video parallax effect on scroll
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

// Image Gallery with GSAP transitions
function initializeImageGallery() {
    let currentIndex = 0;
    const galleryImage = document.querySelector('.gallery-image');
    const herotext= document.querySelector('.textheading');
    const dotsContainer = document.querySelector('.absolute.bottom-8');

    // Create dot indicators based on heroImages
    heroImages.forEach((image, index) => {
        const dot = document.createElement('div');
        dot.className = `dot w-3 h-3 rounded-full bg-white/50 cursor-pointer ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => changeImage(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to change image with GSAP animation
    function changeImage(newIndex) {
        if (newIndex === currentIndex) return;

        const tl = gsap.timeline();
        tl.to(galleryImage, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                galleryImage.src = heroImages[newIndex].src;
                // Update active dot
                dots[currentIndex].classList.remove('active');
                dots[newIndex].classList.add('active');
                currentIndex = newIndex;
            }
        })
        .to(galleryImage, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    }

    // Navigation button event listeners
    document.querySelector('.next').addEventListener('click', () => {
        changeImage((currentIndex + 1) % heroImages.length);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        changeImage((currentIndex - 1 + heroImages.length) % heroImages.length);
    });

    // Auto-rotate images every 4 seconds
    let interval = setInterval(() => {
        changeImage((currentIndex + 1) % heroImages.length);
    }, 4000);

    // Pause auto-rotation on hover
    const gallery = document.querySelector('header');
    gallery.addEventListener('mouseenter', () => clearInterval(interval));
    gallery.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            changeImage((currentIndex + 1) % heroImages.length);
        }, 4000);
    });
}
