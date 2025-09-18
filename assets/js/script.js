'use strict';



/*PRELOAD*/
/*loading will be end after document is laoder*/

const preloaded = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
    preloaded.classList.add("loaded");
    document.body.classList.add("loaded");
});

// window.addEventListener("load", function () {
//     preloader.classList.add("loaded");
//     document.body.classList.add("loaded");
// });

// add event listener on multiples elements 

const addEventOnElements = function (elements, eventType, callBack) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callBack);
    }
}




    // NAVBAR
    
    const navbar = document.querySelector("[data-navbar]"); 
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const overlay = document.querySelector("[data-overlay");

    const toggleNavbar = function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("nav-active");
    }


    addEventOnElements(navTogglers, "click", toggleNavbar);


    // HEADER & BACK TOP BTN

    const header = document.querySelector("[data-header");
    const backTopBtn = document.querySelector("[data-back-top-btn]");

    let lastScrollPos = 0;

    const hideHeader = function () {
        const isScrollButton = lastScrollPos < window.scrollY;
        if (isScrollButton) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }

        lastScrollPos = window.scrollY;
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY >= 50) {
            header.classList.add("active");
            backTopBtn.classList.add("active");
            hideHeader();
        } else {
            header.classList.remove("active");
            backTopBtn.classList.remove("active");
        }
    }); 



    // HERO SLIDER


    const heroSlider = document.querySelector("[data-hero-slider]");
    const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
    const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
    const heroSliderNextBtn = document.querySelector("[data-next-btn]");

    let currentSliderPos = 0;
    let lastActiveSliderItem = heroSliderItems[0];

    const updateSliderPos = function () {
        lastActiveSliderItem.classList.remove("active");
        heroSliderItems[currentSliderPos].classList.add("active");
        lastActiveSliderItem = heroSliderItems[currentSliderPos];
    }

    const slideNext = function () { 
        if (currentSliderPos >= heroSliderItems.length - 1) {
            currentSliderPos = 0;
        } else {
            currentSliderPos++;
        }

        updateSliderPos();
    }

    heroSliderNextBtn.addEventListener("click", slideNext);

    const slidePrev = function () {
        if (currentSliderPos <= 0) {
            currentSliderPos = heroSliderItems.length - 1;
        } else {
            currentSliderPos--;
        }

        updateSliderPos();
    }

    heroSliderPrevBtn.addEventListener("click", slidePrev);

    // auto slide

    let autoSlideInterval;

    const autoSlide = function () {
        autoSlideInterval = setInterval(function () {
            slideNext();
        }, 7000);
    }

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
        clearInterval(autoSlideInterval);
    });

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

    window.addEventListener("load", autoSlide); 


    // PARALLAX EFFECT

    const parallaxItems = document.querySelectorAll("[data-parallax-item]");

    let x, y;

    window.addEventListener("mousemove", function (event) {

        x = (event.clientX / window.innerWidth * 10) - 5;
        y = (event.clientY / window.innerHeight * 10) - 5;

        x = x - (x * 2);
        y = y - (y * 2);

        for (let i = 0, len = parallaxItems.length; i < len; i++) { 
            x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
            y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
            parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        }
    });