
// HERO SEC SLIDER |HOMEPAGE
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


// BELLOW SLIDER | HOMEPAGE
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
