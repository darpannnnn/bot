let menu = document.querySelector('#menu');
let aside = document.querySelector('aside');
let isOpen = false;
let tl = gsap.timeline();
let bar1 = document.querySelector('#bar1');
let bar2 = document.querySelector('#bar2');
const h4 = document.querySelector('aside h4');
const menuLinks = document.querySelectorAll("#links-wrap a");
let telegramBtn = document.querySelector('#telegram-btn');
let telegramSvg = document.querySelector('#telegram-btn img');
let getStartedBtn = document.querySelector('#get-started-btn');
let btnOverlay = document.querySelector('#btn-overlay');
let arrowSvg = document.querySelector('#get-started-btn img');
let box1 = document.querySelector('#box1');
let box2 = document.querySelector('#box2');
let box3 = document.querySelector('#box3');
let heroTxtSpans = document.querySelectorAll('#topTxt p span');
let mainHeadingSpans = document.querySelectorAll('#mainHeading span');
let preloader = document.querySelector('#preloader');
let preloaderContainer = document.querySelector('#preloader-Container');
let main = document.querySelector('main');

// Toggle functionality
menu.addEventListener('click', () => {
    if (!isOpen) {
        // Open the menu

        gsap.to(menu,{
            backgroundColor:'#05df72'
        })

        gsap.to(bar1,{
            xPercent:-50,
            yPercent:-50,
            rotation:-45,
            top:'50%',
            backgroundColor:'#111'
        })
        gsap.to(bar2,{
            xPercent:-50,
            yPercent:-50,
            rotation:45,
            top:'50%',
            backgroundColor:'#111'
        })

        gsap.to(aside, {
            duration: 0.5,
            right:'0%',
            // ease: 'cubic-bezier(.7, 0, .2, 1)',
            ease:'power4.out',
            opacity:1
        });

        gsap.fromTo(h4,
            {
                y:16,
                opacity:0
            },
            {
                duration:0.5,
                y:0,
                opacity:1,
                delay:0.3
            }
        )

        // Stagger animation for menu links
        gsap.fromTo(menuLinks, 
            {
                x: 250, // Reset to starting position
                opacity: 0
            }, 
            {
                stagger: 0.01,
                duration: 0.4,
                x: 0, // Move to final position
                opacity: 1,
                delay: 0.2
            }
        );

        // Disable scrolling
        main.classList.add('overflow-y-hidden');

        isOpen = true;
    } else {
        // Close the menu

        gsap.to(menu,{
            backgroundColor:'transparent'
        })

        gsap.to(menuLinks,{
            stagger:0.02,
            duration:0.4,
            x:250,
            opacity:0,
            onComplete: () => {
                // Reset the position for the next time the menu opens
                gsap.set(menuLinks, { x: 250, opacity: 0 });
            }
        })

        gsap.to(h4,{
            duration:0.5,
            y:16,
            opacity:0,
            onComplete: ()=>{
                gsap.set(h4,{ y:16 , opacity:0})
            }
        })

        gsap.to(aside, {
            duration: 0.5,
            right:'-110%',
            // ease: 'cubic-bezier(.7, 0, .2, 1)',
            ease:'power2.in',
            opacity:0,
            delay:0.2
        });
        
        gsap.to(bar1,{
            xPercent:-50,
            yPercent:-50,
            rotation:0,
            top:'0%',
            backgroundColor:'#fff'
        })

        gsap.to(bar2,{
            xPercent:-50,
            yPercent:-50,
            rotation:0,
            top:'100%',
            backgroundColor:'#fff'
        })

        // Enable scrolling
        main.classList.remove('overflow-y-scroll');

        isOpen = false;
    }
});

telegramBtn.addEventListener('mouseenter',()=>{
    gsap.to(telegramSvg,{
        rotation:60,
        duration:0.7,
        ease:'power2.in'
    })
})
telegramBtn.addEventListener('mouseleave',()=>{
    gsap.to(telegramSvg,{
        rotation:0,
        duration:0.7,
        ease:'power2.out'
    })
})

getStartedBtn.addEventListener('mouseenter',()=>{
    gsap.to(btnOverlay,{
        height:'100%',
        borderRadius:0,
        duration:0.5,
        ease:'power2.in'
    });

    gsap.to(arrowSvg,{
        rotation:-45
    })
});
getStartedBtn.addEventListener('mouseleave',()=>{
    gsap.to(btnOverlay,{
        height:'0%',
        borderRadius:'50%',
        duration:0.5,
        ease:'power2.out'
    });
    gsap.to(arrowSvg,{
        rotation:0
    });
});

gsap.to(preloader,{
    height:0,
    duration:0.7
})
tl.to(preloaderContainer,{
    height:0,
    duration:0.7,
    delay:0.4
})
gsap.from(heroTxtSpans,{
    y:25,
    opacity:0,
    stagger:0.1,
    duration:0.3,
    delay:0.6 
})
gsap.from(mainHeadingSpans,0.5,{
    y:180, 
    opacity:0,
    delay:0.5,
    duration:0.4,
    stagger:0.1, 
})
gsap.from(getStartedBtn,0.5,{ 
    y:55,
    opacity:0,
    duration:0.4,
    delay:1
})
tl.from('#heroBottomTxt p',0.5,{
    y:92,
    duration:0.4,
    opacity:0
})


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('main'), // This is your scroll container
    smooth: true
});

// Sync Locomotive Scroll with ScrollTrigger
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy('main', {
    scrollTop(value) {
        return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector('main').style.transform ? "transform" : "fixed"
});

// Animate with GSAP and ScrollTrigger
gsap.from('#page2 #txt-block', {
    x: -200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page2 #txt-block',
        // markers: true,
        start: 'top 60%',
        end:'top 60%',
        scrub:2
    }
});

// gsap.from('#page2 #deposit-block',{
//     x: 200,
//     opacity: 0,
//     scrollTrigger: {
//         scroller: 'main', // Locomotive Scroll's container
//         trigger: '#page2 #deposit-block',
//         // markers: true,
//         start: 'top 80%',
//         end:'top 60%',
//         scrub:2
//     }
// });

gsap.from('#page2 #box1',{
    x: -200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page2 #box1',
        // markers: true,
        start: 'top 65%',
        end:'top 65%',
        scrub:2
    }
})
gsap.from('#page2 #box2',{
    y: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page2 #box2',
        // markers: true, 
        start: 'top 75%',
        end:'top 65%',
        scrub:2
    }
})
gsap.from('#page2 #box3',{
    x: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page2 #box3',
        // markers: true,
        start: 'top 65%',
        end:'top 65%',
        scrub:2
    }
})
gsap.from('#page4 #Questions',{
    x: -200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page4 #Questions',
        // markers: true,
        start: 'top 45%',
        end:'top 45%',
        scrub:2
    }
})
gsap.from('#page4 #FAQ-container img',{
    x: 200,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page4 #FAQ-container img',
        // markers: true,
        start: 'top 45%',
        end:'top 45%',
        scrub:2
    }
})
gsap.from('#page4 #telegram-bot',{
    y: 184,
    opacity: 0,
    scrollTrigger: {
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page4 #telegram-bot',
        // markers: true,
        start: 'top 99%',
        end:'top 99%',
        scrub:2
    }
})

tl.from('#svgicon img',{
    x:-100,
    opacity:0,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#svgicon img',
        // markers: true,
        start: 'top 66%',
        end:'top 66%',
        scrub:2
    }
})
tl.from('#svgicon span',{
    x:-100,
    opacity:0,
    stagger:0.1,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#svgicon span',
        // markers: true,
        start: 'top 75%',
        end:'top 75%',
        scrub:2
    }
})
  
gsap.from('#page3 #text-block',{
    x:-100,
    opacity:0,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page3 #text-block',
        // markers: true,
        start: 'top 68%',
        end:'top 68%',
        scrub:2
    }
})
gsap.from('#page3 #secret-salt',{
    x:-100,
    opacity:0,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page3 #text-block',
        // markers: true,
        start: 'top 65%',
        end:'top 65%',
        scrub:2
    }
})
gsap.from('#page3 #spins',{
    x:-100,
    opacity:0,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page3 #text-block',
        // markers: true,
        start: 'top 60%',
        end:'top 60%',
        scrub:2
    }
})
gsap.from('#page3 #encoding',{
    x:-100,
    opacity:0,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page3 #text-block',
        // markers: true,
        start: 'top 55%',
        end:'top 55%',
        scrub:2
    }
})
gsap.from('#page3 #boySvg',{
    x:200,
    opacity:0,
    scrollTrigger:{
        scroller: 'main', // Locomotive Scroll's container
        trigger: '#page3 #boySvg',
        // markers: true,
        start: 'top 65%',
        end:'top 65%',
        scrub:2
    }
})









// Refresh ScrollTrigger and Locomotive Scroll
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();
