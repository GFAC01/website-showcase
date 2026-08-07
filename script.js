/* ==========================================================
   GA WEB STUDIO
   SCRIPT.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const header = document.querySelector(".header");

const menuButton = document.querySelector(".menu-button");

const mobileMenu = document.querySelector(".mobile-menu");

const menuOverlay = document.querySelector(".menu-overlay");

const desktopLinks = document.querySelectorAll(".navigation a");

const mobileLinks = document.querySelectorAll(".mobile-navigation a");

const allLinks = [...desktopLinks, ...mobileLinks];


/* ==========================================================
   MENU
========================================================== */

function openMenu() {

    menuButton.classList.add("active");

    mobileMenu.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeMenu() {

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";

}

function toggleMenu() {

    const opened = mobileMenu.classList.contains("active");

    opened ? closeMenu() : openMenu();

}


/* ==========================================================
   EVENTOS MENU
========================================================== */

if (menuButton) {

    menuButton.addEventListener("click", toggleMenu);

}

if (menuOverlay) {

    menuOverlay.addEventListener("click", closeMenu);

}


/* ==========================================================
   FECHAR AO CLICAR EM UM LINK
========================================================== */

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


/* ==========================================================
   ESC
========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* ==========================================================
   SCROLL SUAVE
========================================================== */

allLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (!href.startsWith("#")) return;

        event.preventDefault();

        const target = document.querySelector(href);

        if (!target) return;

        const offset = header.offsetHeight;

        const position =
            target.offsetTop - offset;

        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    });

});


/* ==========================================================
   TRAVAR SCROLL IOS
========================================================== */

function lockScroll() {

    document.body.classList.add("menu-open");

}

function unlockScroll() {

    document.body.classList.remove("menu-open");

}


/* ==========================================================
   MELHORAR MENU
========================================================== */

function openMenu() {

    menuButton.classList.add("active");

    mobileMenu.classList.add("active");

    menuOverlay.classList.add("active");

    lockScroll();

}

function closeMenu() {

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    unlockScroll();

}


/* ==========================================================
   CLICK FORA
========================================================== */

document.addEventListener("click", (event) => {

    const clickInsideMenu =
        mobileMenu.contains(event.target);

    const clickButton =
        menuButton.contains(event.target);

    if (clickInsideMenu) return;

    if (clickButton) return;

    closeMenu();

});


/* ==========================================================
   RESIZE
========================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        closeMenu();

    }

});


/* ==========================================================
   PRELOAD
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================================
   HEADER SCROLL
========================================================== */

let lastScroll = 0;

const SCROLL_LIMIT = 120;

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

function handleHeaderScroll() {

    const currentScroll = window.scrollY;

    /* HEADER GLASS */

    if (currentScroll > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

    /* HEADER INTELIGENTE */

    if (currentScroll > SCROLL_LIMIT) {

        if (currentScroll > lastScroll) {

            header.style.transform = "translateY(-100%)";

        } else {

            header.style.transform = "translateY(0)";

        }

    } else {

        header.style.transform = "translateY(0)";

    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;

}


/* ==========================================================
   PROGRESS BAR
========================================================== */

const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", updateProgressBar, {
    passive: true
});

function updateProgressBar() {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${percentage}%`;

}


/* ==========================================================
   BACK TO TOP
========================================================== */

const backToTop =
    document.querySelector(".back-to-top");

window.addEventListener("scroll", toggleBackToTop, {
    passive: true
});

function toggleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

backToTop?.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================================
   ACTIVE LINKS
========================================================== */

const sections =
    document.querySelectorAll("section[id]");

window.addEventListener("scroll", updateActiveLink, {
    passive: true
});

function updateActiveLink() {

    const scrollPosition =
        window.scrollY + header.offsetHeight + 80;

    sections.forEach(section => {

        const top = section.offsetTop;

        const bottom =
            top + section.offsetHeight;

        const id = section.id;

        if (
            scrollPosition >= top &&
            scrollPosition < bottom
        ) {

            allLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${id}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


/* ==========================================================
   HEADER TRANSITION
========================================================== */

header.style.transition =
    `
background .35s ease,
backdrop-filter .35s ease,
transform .35s ease,
box-shadow .35s ease
`;


/* ==========================================================
   INIT
========================================================== */

handleHeaderScroll();

updateProgressBar();

toggleBackToTop();

updateActiveLink();

/* ==========================================================
   HERO SLIDER
========================================================== */

const slider = document.querySelector(".hero-slider");

const slides = document.querySelectorAll(".hero-slide");

const indicators = document.querySelectorAll(".indicator");

const prevButton = document.querySelector(".slider-arrow--left");

const nextButton = document.querySelector(".slider-arrow--right");

let currentSlide = 0;

let autoplay = null;

const AUTO_TIME = 6000;


/* ==========================================================
   SHOW SLIDE
========================================================== */

function showSlide(index) {

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    indicators.forEach(indicator => {

        indicator.classList.remove("active");

    });

    currentSlide = index;

    slides[currentSlide].classList.add("active");

    indicators[currentSlide]?.classList.add("active");

}


/* ==========================================================
   NEXT
========================================================== */

function nextSlide() {

    let index = currentSlide + 1;

    if (index >= slides.length) {

        index = 0;

    }

    showSlide(index);

}


/* ==========================================================
   PREVIOUS
========================================================== */

function previousSlide() {

    let index = currentSlide - 1;

    if (index < 0) {

        index = slides.length - 1;

    }

    showSlide(index);

}


/* ==========================================================
   AUTOPLAY
========================================================== */

function startAutoplay() {

    stopAutoplay();

    autoplay = setInterval(nextSlide, AUTO_TIME);

}

function stopAutoplay() {

    if (autoplay) {

        clearInterval(autoplay);

    }

}


/* ==========================================================
   BUTTONS
========================================================== */

nextButton?.addEventListener("click", () => {

    nextSlide();

    startAutoplay();

});

prevButton?.addEventListener("click", () => {

    previousSlide();

    startAutoplay();

});


/* ==========================================================
   INDICATORS
========================================================== */

indicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {

        showSlide(index);

        startAutoplay();

    });

});


/* ==========================================================
   PAUSE HOVER
========================================================== */

slider?.addEventListener("mouseenter", stopAutoplay);

slider?.addEventListener("mouseleave", startAutoplay);


/* ==========================================================
   KEYBOARD
========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

        startAutoplay();

    }

    if (event.key === "ArrowLeft") {

        previousSlide();

        startAutoplay();

    }

});


/* ==========================================================
   TOUCH
========================================================== */

let touchStartX = 0;

let touchEndX = 0;

slider?.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });

slider?.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });


function handleSwipe() {

    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 60) {

        return;

    }

    if (distance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }

    startAutoplay();

}


/* ==========================================================
   INIT
========================================================== */

if (slides.length) {

    showSlide(0);

    startAutoplay();

}

/* ==========================================================
   INTERSECTION OBSERVER
========================================================== */

const revealElements = document.querySelectorAll(

    ".fade-up, .fade-down, .fade-left, .fade-right, .zoom-in"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        });

    },

    {

        threshold: .15,

        rootMargin: "0px 0px -80px 0px"

    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================================
   COUNTERS
========================================================== */

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            animateCounter(counter);

            counterObserver.unobserve(counter);

        });

    },

    {

        threshold: .5

    }

);


counters.forEach(counter => {

    counterObserver.observe(counter);

});


function animateCounter(element) {

    const target = Number(element.dataset.counter);

    const duration = 1800;

    const startTime = performance.now();

    function update(now) {

        const progress = Math.min(

            (now - startTime) / duration,

            1

        );

        const value = Math.floor(

            progress * target

        );

        element.textContent = value;

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent = target;

        }

    }

    requestAnimationFrame(update);

}


/* ==========================================================
   PARALLAX
========================================================== */

const parallaxItems =

    document.querySelectorAll("[data-parallax]");

window.addEventListener(

    "scroll",

    () => {

        const scroll = window.pageYOffset;

        parallaxItems.forEach(item => {

            const speed =

                Number(item.dataset.parallax) || .25;

            item.style.transform =

                `translateY(${scroll * speed}px)`;

        });

    },

    {

        passive: true

    }

);


/* ==========================================================
   FLOAT ELEMENTS
========================================================== */

const floatingElements =

    document.querySelectorAll(".floating");

floatingElements.forEach(

    (element, index) => {

        element.style.animationDelay =

            `${index * .3}s`;

    });



/* ==========================================================
   STAGGER
========================================================== */

const staggerGroups =

    document.querySelectorAll("[data-stagger]");

staggerGroups.forEach(group => {

    [...group.children].forEach(

        (child, index) => {

            child.style.animationDelay =

                `${index * .12}s`;

        });

});


/* ==========================================================
   IMAGE REVEAL
========================================================== */

const revealImages =

    document.querySelectorAll(

        ".project-card__image img"

    );

const imageObserver =

    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                imageObserver.unobserve(

                    entry.target

                );

            });

        },

        {

            threshold: .2

        }

    );

revealImages.forEach(image => {

    imageObserver.observe(image);

});

/* ==========================================================
   3D CARD EFFECT
========================================================== */


const cards3D = document.querySelectorAll(

    ".project-card, .benefit-card"

);



cards3D.forEach(card => {


    const strength = 12;


    card.addEventListener("mousemove", (event) => {


        const rect = card.getBoundingClientRect();


        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;


        const centerX = rect.width / 2;

        const centerY = rect.height / 2;



        const rotateX =

            ((y - centerY) / centerY)

            * -strength;



        const rotateY =

            ((x - centerX) / centerX)

            * strength;



        card.style.transform = `

            perspective(900px)

            rotateX(${rotateX}deg)

            rotateY(${rotateY}deg)

            translateY(-10px)

        `;


        card.style.setProperty(

            "--mouse-x",

            `${x}px`

        );


        card.style.setProperty(

            "--mouse-y",

            `${y}px`

        );


    });



    card.addEventListener("mouseleave", () => {


        card.style.transform = "";


    });


});



/* ==========================================================
   CARD GLOW FOLLOW
========================================================== */


const glowCards = document.querySelectorAll(

    ".project-card, .benefit-card"

);



glowCards.forEach(card => {


    const glow = document.createElement("div");


    glow.className = "card-glow";


    card.appendChild(glow);



    card.addEventListener("mousemove", (event) => {


        const rect = card.getBoundingClientRect();


        const x = event.clientX - rect.left - 130;

        const y = event.clientY - rect.top - 400;



        glow.style.left = `${x}px`;

        glow.style.top = `${y}px`;


        glow.style.opacity = "1";


    });



    card.addEventListener("mouseleave", () => {


        glow.style.opacity = "0";


    });


});



/* ==========================================================
   MAGNETIC BUTTONS
========================================================== */


const magneticButtons = document.querySelectorAll(

    ".primary-button, .secondary-button"

);



magneticButtons.forEach(button => {


    button.addEventListener("mousemove", (event) => {


        const rect = button.getBoundingClientRect();


        const x =

            event.clientX - rect.left - rect.width / 2;


        const y =

            event.clientY - rect.top - rect.height / 2;



        button.style.transform =

            `translate(${x * .15}px,${y * .15}px)`;


    });



    button.addEventListener("mouseleave", () => {


        button.style.transform = "";


    });



});



/* ==========================================================
   IMAGE PARALLAX INSIDE CARD
========================================================== */


const cardImages = document.querySelectorAll(

    ".project-card__image img"

);



cardImages.forEach(image => {


    const parent =

        image.closest(".project-card");



    parent?.addEventListener(

        "mousemove",

        (event) => {


            const rect = parent.getBoundingClientRect();


            const x = event.clientX - rect.left;

            const y = event.clientY - rect.top;



            image.style.transform = `

            scale(1.12)

            translate(

                ${(x - rect.width / 2) * 0.015}px,

                ${(y - rect.height / 2) * 0.015}px

            )

        `;


        });



    parent?.addEventListener(

        "mouseleave",

        () => {


            image.style.transform = "";


        });


});

/* ==========================================================
   PERFORMANCE UTILITIES
========================================================== */


/*
    Debounce:
    Executa uma função somente depois
    que o usuário parar uma ação.
*/

function debounce(callback, delay = 200) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}


/*
    Throttle:
    Limita a quantidade de execuções
    de uma função.

    Útil para scroll e resize.
*/

function throttle(callback, limit = 100) {

    let waiting = false;


    return (...args) => {


        if (waiting) return;


        callback(...args);


        waiting = true;


        setTimeout(() => {

            waiting = false;

        }, limit);


    };

}



/* ==========================================================
   LAZY LOADING IMAGES
========================================================== */


const lazyImages = document.querySelectorAll(

    "img[data-src]"

);



const imageLazyObserver = new IntersectionObserver(

    (entries, observer) => {


        entries.forEach(entry => {


            if (!entry.isIntersecting) return;


            const image = entry.target;


            image.src = image.dataset.src;


            image.removeAttribute(
                "data-src"
            );


            image.classList.add(
                "loaded"
            );


            observer.unobserve(image);


        });


    },

    {

        rootMargin: "100px"

    }

);



lazyImages.forEach(image => {


    imageLazyObserver.observe(image);


});



/* ==========================================================
   IMAGE ERROR HANDLER
========================================================== */


const images = document.querySelectorAll("img");


images.forEach(image => {


    image.addEventListener(

        "error",

        () => {


            image.style.opacity = "0";


        });


});



/* ==========================================================
   DISABLE EFFECTS ON TOUCH DEVICES
========================================================== */


const isTouchDevice =

    window.matchMedia(
        "(pointer:coarse)"
    ).matches;



if (isTouchDevice) {


    document.body.classList.add(
        "touch-device"
    );


}



/* ==========================================================
   REDUCE MOTION SUPPORT
========================================================== */


const prefersReducedMotion =

    window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches;



if (prefersReducedMotion) {


    document.body.classList.add(
        "reduce-motion"
    );


}



/* ==========================================================
   REMOVE 3D EFFECT MOBILE
========================================================== */


if (isTouchDevice) {


    cards3D.forEach(card => {


        card.style.transform = "";


    });


}



/* ==========================================================
   GLOBAL RESIZE OPTIMIZATION
========================================================== */


window.addEventListener(

    "resize",

    throttle(() => {


        closeMenu();


    }, 300)

);



/* ==========================================================
   PAGE VISIBILITY
========================================================== */


document.addEventListener(

    "visibilitychange",

    () => {


        if (document.hidden) {


            stopAutoplay?.();


        } else {


            startAutoplay?.();


        }


    });



/* ==========================================================
   FINAL INITIALIZATION
========================================================== */


function initializeGAWebStudio() {


    console.log(

        "%cGA Web Studio iniciado 🚀",

        `
        color:#3b82f6;
        font-size:16px;
        font-weight:bold;
        `

    );


}

/* ==========================================================
   LOADER
========================================================== */

const loader = document.querySelector(".loader");


window.addEventListener("load", () => {


    if (!loader) return;


    setTimeout(() => {


        loader.classList.add("hidden");


        setTimeout(() => {


            loader.remove();


        }, 700);


    }, 1500);


});

/* =====================================================
   FILTRO DOS PROJETOS
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-button");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove o active de todos */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Ativa o botão clicado */

        button.classList.add("active");


        /* Categoria selecionada */

        const filtro =
            button.dataset.filter;


        /* Filtra os projetos */

        projectCards.forEach(card => {

            const categoria =
                card.dataset.category;


            if (
                filtro === "todos" ||
                categoria === filtro
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


initializeGAWebStudio();