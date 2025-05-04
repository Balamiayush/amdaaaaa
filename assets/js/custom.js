
// #HERO SEC SLIDER |HOMEPAGE
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
});


// #BELLOW SLIDER | HOMEPAGE
const carouselItems = document.querySelectorAll('[data-carousel-item]');
let currentIndex = 0;

// Function to show the next slide
function showNext() {
    carouselItems[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.remove('hidden');
}

// Function to show the previous slide
function showPrev() {
    carouselItems[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.remove('hidden');
}

// Automatically switch to the next slide every 3 seconds
setInterval(showNext, 3000);

// Set event listeners for next/previous buttons
document.querySelector('[data-carousel-next]').addEventListener('click', showNext);
document.querySelector('[data-carousel-prev]').addEventListener('click', showPrev);

// Initialize first item as visible
carouselItems[currentIndex].classList.remove('hidden');

// # TAB Section 
const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.dataset.tab;

        // Toggle active button
        buttons.forEach(btn => {
            btn.classList.remove('text-[#003D96]', 'border-b-2', 'border-[#003D96]');
            btn.classList.add('text-gray-500');
        });
        button.classList.add('text-[#003D96]', 'border-b-2', 'border-[#003D96]');
        button.classList.remove('text-gray-500');

        // Show content
        contents.forEach(content => {
            content.classList.add('hidden');
        });
        const activeTab = document.getElementById(tab);
        activeTab.classList.remove('hidden');
        activeTab.classList.add('animate-fade-in');
    });
});

// #POPUP BOX 
// Show popup after 4 seconds
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("popup").classList.remove("hidden");
    }, 20000);
});

// Close popup when close button is clicked
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
});


// #ALERT 
const alertBox = document.getElementById('alertBox');
const closeBtn = document.getElementById('closeAlert');

const closeAlert = () => {
    alertBox.classList.add('slide-up');
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 400); // Wait for animation to complete
};

closeBtn.addEventListener('click', closeAlert);
// Auto-close after 20 seconds
setTimeout(closeAlert, 20000);


//# MEGAMENU NAVBAR | HAMBURGER 
const hamburger = document.querySelector('.hamburgerFirstNav');
const secondNav = document.querySelector('#navBarMain');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    secondNav.classList.toggle('hideNavinMoble');
    // document.body.classList.toggle('activeHamburger');
});
