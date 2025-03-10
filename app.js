// Cache DOM elements for better performance
const menu = document.querySelector('#menu');
const aside = document.querySelector('aside');
let isOpen = false; // Track menu state
const tl = gsap.timeline(); // GSAP timeline for smooth animations
const bar1 = document.querySelector('#bar1');
const bar2 = document.querySelector('#bar2');
const h4 = document.querySelector('aside h4');
const menuLinks = document.querySelectorAll("#links-wrap a");
const telegramBtn = document.querySelector('#telegram-btn');
const telegramSvg = document.querySelector('#telegram-btn img');
const getStartedBtn = document.querySelector('#get-started-btn');
const btnOverlay = document.querySelector('#btn-overlay');
const arrowSvg = document.querySelector('#get-started-btn img');
const heroTxtSpans = document.querySelectorAll('#topTxt p span');
const mainHeadingSpans = document.querySelectorAll('#mainHeading span');
const preloader = document.querySelector('#preloader');
const preloaderContainer = document.querySelector('#preloader-Container');
const main = document.querySelector('main');

// Toggle functionality for opening/closing the menu
menu.addEventListener('click', () => {
    if (!isOpen) {
        // Open the menu
        gsap.to(menu, { backgroundColor: '#05df72' });
        gsap.to(bar1, { xPercent: -50, yPercent: -50, rotation: -45, top: '50%', backgroundColor: '#111' });
        gsap.to(bar2, { xPercent: -50, yPercent: -50, rotation: 45, top: '50%', backgroundColor: '#111' });
        gsap.to(aside, { duration: 0.5, right: '0%', ease: 'power4.out', opacity: 1 });
        gsap.fromTo(h4, { y: 16, opacity: 0 }, { duration: 0.5, y: 0, opacity: 1, delay: 0.3 });
        gsap.fromTo(menuLinks, { x: 250, opacity: 0 }, { stagger: 0.01, duration: 0.4, x: 0, opacity: 1, delay: 0.2 });
        main.classList.add('overflow-y-hidden'); // Disable page scroll
        isOpen = true;
    } else {
        // Close the menu
        gsap.to(menu, { backgroundColor: 'transparent' });
        gsap.to(menuLinks, { stagger: 0.02, duration: 0.4, x: 250, opacity: 0 });
        gsap.to(h4, { duration: 0.5, y: 16, opacity: 0 });
        gsap.to(aside, { duration: 0.5, right: '-110%', ease: 'power2.in', opacity: 0, delay: 0.2 });
        gsap.to(bar1, { xPercent: -50, yPercent: -50, rotation: 0, top: '0%', backgroundColor: '#fff' });
        gsap.to(bar2, { xPercent: -50, yPercent: -50, rotation: 0, top: '100%', backgroundColor: '#fff' });
        main.classList.remove('overflow-y-hidden'); // Enable page scroll
        isOpen = false;
    }
});

// Telegram button hover animation
telegramBtn.addEventListener('mouseenter', () => {
    gsap.to(telegramSvg, { rotation: 60, duration: 0.7, ease: 'back.inOut' });
});
telegramBtn.addEventListener('mouseleave', () => {
    gsap.to(telegramSvg, { rotation: 0, duration: 0.7, ease: 'back.inOut' });
});

// Get Started button hover animation
getStartedBtn.addEventListener('mouseenter', () => {
    gsap.to(btnOverlay, { height: '100%', borderRadius: 0, duration: 0.5, ease: 'power2.in' });
    gsap.to(arrowSvg, { rotation: -45 });
});
getStartedBtn.addEventListener('mouseleave', () => {
    gsap.to(btnOverlay, { height: '0%', borderRadius: '50%', duration: 0.5, ease: 'power2.out' });
    gsap.to(arrowSvg, { rotation: 0 });
});

// Preloader animations
gsap.to(preloader, { height: 0, duration: 0.7 });
tl.to(preloaderContainer, { height: 0, duration: 0.7, delay: 0.4 });

// Hero section animations
gsap.from(heroTxtSpans, { y: 25, opacity: 0, stagger: 0.1, duration: 0.3, delay: 0.6 });
gsap.from(mainHeadingSpans, { y: 180, opacity: 0, duration: 0.4, delay: 0.5, stagger: 0.1 });
gsap.from(getStartedBtn, { y: 55, opacity: 0, duration: 0.4, delay: 1 });
tl.from('#heroBottomTxt p', { y: 92, opacity: 0, duration: 0.4 });

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('main'), // Scroll container
    smooth: true
});

// Sync Locomotive Scroll with ScrollTrigger
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy('main', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('main').style.transform ? "transform" : "fixed"
});

// Scroll-triggered animations
gsap.from('#page2 #txt-block', {
    x: -200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page2 #txt-block',
        start: 'top 60%',
        end: 'top 60%',
        scrub: 2
    }
});

gsap.from('#page2 #box1', {
    x: -200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page2 #box1',
        start: 'top 65%',
        end: 'top 65%',
        scrub: 2
    }
});

gsap.from('#page2 #box2', {
    y: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page2 #box2',
        start: 'top 75%',
        end: 'top 65%',
        scrub: 2
    }
});

gsap.from('#page2 #box3', {
    x: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page2 #box3',
        start: 'top 65%',
        end: 'top 65%',
        scrub: 2
    }
});

gsap.from('#page4 #Questions', {
    x: -200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page4 #Questions',
        start: 'top 45%',
        end: 'top 45%',
        scrub: 2
    }
});

gsap.from('#page4 #FAQ-container img', {
    x: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page4 #FAQ-container img',
        start: 'top 45%',
        end: 'top 45%',
        scrub: 2
    }
});

gsap.from('#page4 #telegram-bot', {
    y: 184,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page4 #telegram-bot',
        start: 'top 99%',
        end: 'top 99%',
        scrub: 2
    }
});

// Example animation for SVG icon
tl.from('#svgicon img', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#svgicon img',
        start: 'top 66%',
        end: 'top 66%',
        scrub: 2
    }
});
tl.from('#svgicon span', {
    x: -100,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#svgicon span',
        start: 'top 75%',
        end: 'top 75%',
        scrub: 2
    }
});

// Scroll-triggered animations for page 3 content
gsap.from('#page3 #text-block', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page3 #text-block',
        start: 'top 68%',
        end: 'top 68%',
        scrub: 2
    }
});

gsap.from('#page3 #secret-salt', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page3 #secret-salt',
        start: 'top 65%',
        end: 'top 65%',
        scrub: 2
    }
});

gsap.from('#page3 #spins', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page3 #spins',
        start: 'top 60%',
        end: 'top 60%',
        scrub: 2
    }
});

gsap.from('#page3 #encoding', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page3 #encoding',
        start: 'top 55%',
        end: 'top 55%',
        scrub: 2
    }
});

gsap.from('#page3 #boySvg', {
    x: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main',
        trigger: '#page3 #boySvg',
        start: 'top 65%',
        end: 'top 65%',
        scrub: 2
    }
});

// Refresh ScrollTrigger and Locomotive Scroll after updates
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();
