// global
const characters = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
let navClick = 0;
// const allSection = document.querySelectorAll('.js-section');
const bgDark = document.querySelectorAll('.js-bgc--dk');
const bgLight = document.querySelectorAll('.js-bgc--lt');
const logoDark = document.querySelector('.js-logo--dk');
const logoLight = document.querySelector('.js-logo--lt');
const iconDark = document.querySelector('.js-icon--dk');
const iconLight = document.querySelector('.js-icon--lt');
const mouseCircle = document.querySelector("div.o-circle");
const blurred = document.querySelectorAll('.js-img-blur');
const textLink = document.querySelectorAll('.js-text-link')
// nav
const logoRise = document.querySelector('.js-logo');
const iconActions = document.querySelector('.js-icon');
const burgerRise = document.querySelector('.js-burger');
const burgerLines = document.querySelector('.js-burger__container');
const navAnimationHome = document.querySelector('.js-nav-animation-home');
const navAnimationWork = document.querySelector('.js-nav-animation-work');
const navAnimationAbout = document.querySelector('.js-nav-animation-about');
const navAnimationOffer = document.querySelector('.js-nav-animation-offer');
const navAnimationTalk = document.querySelector('.js-nav-animation-talk');
const menuToggler = document.querySelector('.c-burger__toggler');
const navigationClick = document.querySelector('.c-burger--divider');
const buildIn = document.querySelectorAll('.js-nav-menu--buid');
// hero
const bodyMain = document.querySelector('body');
const loaderLogo = document.querySelector('.js-loader-logo');
const headlineA = document.querySelector('.js-hero-headlineA');
const headlineB = document.querySelector('.js-hero-headlineB');
const headlineC = document.querySelector('.js-hero-headlineC');
const headlineD = document.querySelector('.js-hero-headlineD');
const heroH1 = document.querySelector('.js-hero__intro');
const heroVideo = document.querySelector('.js-hero--video');
// work
const parallaxLight = document.querySelectorAll('.js-parallax-light');
const parallaxRediculous = document.querySelectorAll('.js-parallax-rediculous');
const parallaxLudicrous = document.querySelectorAll('.js-parallax-ludicrous');
const parallaxPlaid = document.querySelectorAll('.js-parallax-plaid');
const browseCTA = document.querySelector('.js-browse-cta');
const circleHover = document.querySelector('.js-circle');
const imgHover = document.querySelectorAll('.js-hover-image');
// scroll
const canvas = document.querySelector("canvas");
// about
const parallaxAbout = document.querySelectorAll('.js-parallax-about')


//////
//// lazy load

// old single use option
// blurred.forEach(entry => {
//   const img = entry.querySelector('img');

//   function loaded(){
//     img.classList.add('loaded')
//   }
  
//   if (img.compete) {
//     loarded();
//   } else {
//     img.addEventListener('load', loaded)
//   }
// })

// multi use lazy load blurred image
// sets all targeted elements to var
blurred.forEach(entry => {
  const img = entry.querySelectorAll('.js-image');

  // funtion to apply js-loaded class
  function loaded() {
    img.forEach(image => {
      image.classList.add('js-loaded');
    });
  }
  // initiates the first image then moves onto each element after, applying loaded class as it progress through the array.
  if (img.length > 0 && img[0].complete) {
    loaded();
  } else {
    img.forEach(image => {
      image.addEventListener('load', loaded);
    });
  }
});

//////
//// text cycle animation
// primary text animation for loading, hovers and more
function primeAnimate(element) {
  let logoAnimationIteration = 0;
  let animationInterval = null;
  clearInterval(animationInterval);
    setTimeout(function () {
      animationInterval = setInterval(() => {
        element.innerText = element.dataset.value
        .split("")
        .map((letter, index) => {
          if (index < logoAnimationIteration) {
            return element.dataset.value[index];
          } 
          return characters[Math.floor(Math.random() * 36)];
        })
        .join("");
        
        if (logoAnimationIteration > element.dataset.value.length) {
          clearInterval(animationInterval);
        }
        // logoAnimationIteration += 0.125;
        logoAnimationIteration += element.dataset.value.length * .022;
      }, 15);
  });
};

// initiates the text cycle anuimation funtion for all selected text links.
textLink.forEach(entry => {
  entry.addEventListener('mouseover', function() {
    primeAnimate(entry);
  })
});

// page load and hero h1 initial build animations. timedout for specific delay amounts
window.onload = (event) => {
  setTimeout(() => {primeAnimate(loaderLogo);}, 0);
  setTimeout(() => {primeAnimate(headlineA);}, 1600); // 1300
  setTimeout(() => {primeAnimate(headlineB);}, 2300); // 1850
  setTimeout(() => {primeAnimate(headlineC);}, 3000); // 2500
  setTimeout(() => {primeAnimate(headlineD);}, 3700); // 3050
};

//// logo dark/light
// observer options to tigger change at correct point on section
const lightbgObserverOptions = {
  rootMargin: '-32px 0px -95% 0px',
};

// observer funtion to add and remove classes associated with logo/icon color change
const lightbgObserver = new IntersectionObserver (function(entries, lightbgObserver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      iconDark.classList.add('js-logo-invisible');
      iconLight.classList.remove('js-logo-invisible');
      burgerLines.classList.add('c-burger__container--lt');
      burgerLines.classList.remove('c-burger__container--dk');
      // return;
    } else {
      iconDark.classList.remove('js-logo-invisible');
      iconLight.classList.add('js-logo-invisible');
      burgerLines.classList.remove('c-burger__container--lt');
      burgerLines.classList.add('c-burger__container--dk');
    }
  })
}, lightbgObserverOptions); // callback to observer margin options

// initiate observer funtion for all sections with a light background
bgLight.forEach(target => {
  lightbgObserver.observe(target);
});

//////
//// navigation
// to stop scolling when menu is active, resume scroll when menu close and count open clicks on menu
menuToggler.addEventListener('change', function() {
  if (this.checked == true) {
    bodyMain.classList.toggle('o-noscroll');
    // on first click of menu - fade in + trigger mainAnimation
    if (navClick <= 0) {
      // fade in nav content
      buildIn.forEach((element) => {
          element.classList.add('js-nav-build--in');
      });
      // menu li build
      setTimeout(() => {primeAnimate(navAnimationHome)}, 300);
      setTimeout(() => {primeAnimate(navAnimationWork)}, 800);
      setTimeout(() => {primeAnimate(navAnimationAbout)}, 1300);
      setTimeout(() => {primeAnimate(navAnimationTalk)}, 1800);
    }
    navClick++; // I might use this to check how many times someone uses the menu toggle
  } if (this.checked == false) {
    bodyMain.classList.remove('o-noscroll')
  };
});

// for closing menu with click outside menu window and resume scrolling when menu closed
document.addEventListener('click', function(e) {
  if (menuToggler.checked == true && e.target == navigationClick) {
    menuToggler.checked = false;
    bodyMain.classList.remove('o-noscroll')
  }
});

// to close menu window when esc button pressed and resume scrolling when menu close 
document.addEventListener('keydown', function(e) {
  if (menuToggler.checked == true && e.key === 'Escape') {
    // menuClickToggle()
    menuToggler.checked = false;
    bodyMain.classList.remove('o-noscroll')
  }
});

//// hover circle mouse follow vars
let mouseX = 0;
let mouseY = 0;
let circleX = 0;
let circleY = 0;
let speed = 0.06;

// mouse follow funtion
let mouseFollow = function(){
  // assignes value to var using initiated values above
  let distX = mouseX - circleX;
  let distY = mouseY - circleY;
  // calcs seperate horizontal and vertical values, paring them with a speed value for a fluid motion
  circleX = circleX + (distX * speed); 
  circleY = circleY + (distY * speed); 
  // applies elements horizontal and vertical positioning using above calcs
  mouseCircle.style.left = circleX + 10 + "px";
  mouseCircle.style.top = circleY + 10 + "px";
  // window method requests browser call callback funtion before next action
  requestAnimationFrame(mouseFollow); 
};

// initiates above function for mouse follow
mouseFollow();

// tracks and translates mouse moments to be used in the mouseFollow funtion above
document.addEventListener("mousemove", function(e){
  mouseX = e.pageX;
  mouseY = e.pageY;
});

// image hover that shows secondary image and utilizes mouse follow element
let imgHoverIndex;
imgHover.forEach((entry, index) => {
  entry.addEventListener('mouseenter', e => {
    imgHoverIndex = index;
    circleHover.classList.remove('js-circle--invisible');
    imgHover[imgHoverIndex].classList.toggle('js-hide');
    imgHover[imgHoverIndex].play();
    circleHover.addEventListener('mouseenter', e => {
      circleHover.classList.remove('js-circle--invisible');
      imgHover[imgHoverIndex].classList.remove('js-hide');
      imgHover[imgHoverIndex].play();
    });
  });
  entry.addEventListener('mouseleave', e => {
    circleHover.classList.add('js-circle--invisible');
    imgHover[imgHoverIndex].classList.toggle('js-hide');
    imgHover[imgHoverIndex].pause();
  });
  circleHover.addEventListener('mouseleave', e => {
    circleHover.classList.add('js-circle--invisible');
    imgHover[imgHoverIndex].classList.add('js-hide');
  });
});


//////
//// canvas
const context = canvas.getContext("2d");
const frameCount = 180;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = '#3B3B3B';


const currentFrame = (index) => `images/${(index + 1).toString()}.jpg`;

const images = [];
let frames = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  // console.log(currentFrame(i));
  images.push(img);
}

gsap.to(frames, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    // anticipatePin: 1,
    trigger: canvas,
    scrub: 2,
    // pin: "canvas",
    end: "100%",
    // markers: true,
  },
  onUpdate: render,
});

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[frames.frame], 0, 0);
}


///////
//// scroll direction
let scrollDirection = function() {
  if (scrollY === 0) {
    logoRise.classList.remove("js-logo-rise");
    iconActions.classList.add("js-icon-rise");
   } if (this.scrollOld < this.scrollY){
    logoRise.classList.add("js-logo-rise");
    iconActions.classList.remove("js-icon-rise");
  } else {
    iconActions.classList.add("js-icon-rise");
  }
}


///////
//// mediaQ logo and nav scroll animation
let videoTags = document.querySelectorAll('.js-project-vid');

function mediaQ() {
  let query = window.matchMedia('(min-width: 767px)');
  // console.log(query); 
  if(query.matches === false) {
    // readds the autoplay attribute on all videos when on mobile and tablet
    videoTags.forEach((video) => {
      video.addAttribute('autoplay', '');
    });
    window.onscroll = function(event) {
      scrollDirection();
      this.scrollOld = this.scrollY;
    }
  } if(query.matches === true) {
    // removes the autoplay attribute on all videos when on mobile and tablet
    videoTags.forEach((video) => {
      video.removeAttribute('autoplay', '');
    });
    window.onscroll = function(event) {
      scrollDirection();
      this.scrollOld = this.scrollY;
    }
  }
}

window.addEventListener("DOMContentLoaded", mediaQ);
window.addEventListener("resize", mediaQ);


//////
//// parallax
// parallaxing elements - starting and stopping individually
// observer options
let parallaxOptions = {
  rootMargin: '0px 0px',
  threshold: .25
}

// observer callback information - turns eventListener on and off - negates initial load trigger
let parallaxCallback = (entries, observer) => {
  entries.forEach(entry => {
    // console.log(entry.target);
    if (!entry.isIntersecting){
      if (entry.target.classList.contains('js-parallax-light')) {
        window.removeEventListener('scroll', parallaxLightSpeed, false);
      } if (entry.target.classList.contains('js-parallax-rediculous')) {
        window.removeEventListener('scroll', parallaxRediculousSpeed, false);
      } if (entry.target.classList.contains('js-parallax-ludicrous')) {
        window.removeEventListener('scroll', parallaxLudicrousSpeed, false);
      } if (entry.target.classList.contains('js-parallax-plaid')) {
        window.removeEventListener('scroll', parallaxPlaidSpeed, false);
      } if (entry.target.classList.contains('js-parallax-about')) {
        window.removeEventListener('scroll', parallaxAboutSpeed, false);}
      return;
     } if(entry.isIntersecting && entry.target.classList.contains('js-parallax-light')) {
      window.addEventListener('scroll', parallaxLightSpeed, false);
     } if(entry.isIntersecting && entry.target.classList.contains('js-parallax-rediculous')) {
      window.addEventListener('scroll', parallaxRediculousSpeed, false);
     } if(entry.isIntersecting && entry.target.classList.contains('js-parallax-ludicrous')) {
      window.addEventListener('scroll', parallaxLudicrousSpeed, false);
     } if(entry.isIntersecting && entry.target.classList.contains('js-parallax-plaid')) {
      window.addEventListener('scroll', parallaxPlaidSpeed, false);
    } if(entry.isIntersecting && entry.target.classList.contains('js-parallax-about')) {
        window.addEventListener('scroll', parallaxAboutSpeed, false);}
  });
};

let observerParallax = new IntersectionObserver(parallaxCallback, parallaxOptions);

window.addEventListener('load', function(){
  let query = window.matchMedia('(min-width: 767px)');
  if(query.matches === true) {
    parallaxLight.forEach(target => {
      observerParallax.observe(target);
    });
    parallaxRediculous.forEach(target => {
      observerParallax.observe(target);
    });
    parallaxLudicrous.forEach(target => {
      observerParallax.observe(target);
    });
    parallaxPlaid.forEach(target => {
      observerParallax.observe(target);
    });
    parallaxAbout.forEach(target => {
      observerParallax.observe(target);
    });
  }
});

function parallaxLightSpeed() {
  const speed = window.scrollY * .07;
  parallaxLight.forEach(entry => {
    entry.style.translate = `0 ${speed}px`;
  });
};
function parallaxRediculousSpeed() {
  const speed = window.scrollY * .06;
  parallaxRediculous.forEach(entry => {
    entry.style.translate = `0 ${speed}px`;
  })
};
function parallaxLudicrousSpeed() {
  const speed = window.scrollY * .1;
  parallaxLudicrous.forEach(entry => {
    entry.style.translate = `0 ${speed}px`;
  });
};
function parallaxPlaidSpeed() {
  const speed = window.scrollY * .08;
  parallaxPlaid.forEach(entry => {
    entry.style.translate = `0 ${speed}px`;
  })
};
function parallaxAboutSpeed() {
  const speed = window.scrollY * .015;
  parallaxAbout.forEach(entry => {
    entry.style.translate = `0 ${speed}px`;
  })
};
