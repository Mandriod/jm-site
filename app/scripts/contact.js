// global
const characters = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
let navClick = 0;
const allSection = document.querySelectorAll('.js-section');
const bgDark = document.querySelectorAll('.js-bgc--dk');
const bgLight = document.querySelectorAll('.js-bgc--lt');
const logoDark = document.querySelector('.js-logo--dk');
const logoLight = document.querySelector('.js-logo--lt');
const iconDark = document.querySelector('.js-icon--dk');
const iconLight = document.querySelector('.js-icon--lt');
const mouseCircle = document.querySelector("div.o-circle");
const blurred = document.querySelectorAll('.js-img-blur');
// const blurredImg = document.querySelectorAll('.js-img-blur img');
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
blurred.forEach(entry => {
  const img = entry.querySelector('img');

  function loaded(){
    img.classList.add('loaded')
  }
  if (img.compete) {
    loarded();
  } else {
    img.addEventListener('load', loaded)
  }
})

//////
//// animation
// primary text animation for loading, hovers and more
function primeAnimate(element) {
  let logoAnimationIteration = 0;
  // let animationIteration = 0;
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

textLink.forEach(entry => {
  entry.addEventListener('mouseover', function() {
    primeAnimate(entry);
  })
});

// page load initial build animations
window.onload = (event) => {
  setTimeout(() => {primeAnimate(loaderLogo);}, 0);
  // setTimeout(() => {primeAnimate(headlineA);}, 1300);
  // setTimeout(() => {primeAnimate(headlineB);}, 1850);
  // setTimeout(() => {primeAnimate(headlineC);}, 2500);
  // setTimeout(() => {primeAnimate(headlineD);}, 2950);
};

//// logo dark/light
// observer options
const lightbgObserverOptions = {
  rootMargin: '-32px 0px -95% 0px',
};

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
}, lightbgObserverOptions);

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
  }
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


const contactCopyLinks = document.querySelector('div.js-links');
const contactAirplane = document.querySelector('div.js-airplane');
const contactAddress = document.querySelector('.js-hover-address');
const contactMailto = document.querySelector('.js-mailto');


//// hover circle mouse follow
let mouseX = 0;
let mouseY = 0;
let circleX = 0;
let circleY = 0;
let speed = 0.06;

let mouseFollow = function(){
  let distX = mouseX - circleX;
  let distY = mouseY - circleY;
  circleX = circleX + (distX * speed);
  circleY = circleY + (distY * speed);
  
  contactCopyLinks.style.left = circleX + "px";
  contactCopyLinks.style.top = circleY + "px";
  contactAirplane.style.left = circleX + "px";
  contactAirplane.style.top = circleY + "px";
  requestAnimationFrame(mouseFollow);
};
mouseFollow();

contactAddress.addEventListener('mouseenter', function() {
  contactCopyLinks.classList.remove('js-links-invisible');
});
contactCopyLinks.addEventListener('mouseenter', function() {
  contactCopyLinks.classList.remove('js-links-invisible');
});
contactAddress.addEventListener('mouseleave', function() {
  contactCopyLinks.classList.add('js-links-invisible');
});
contactCopyLinks.addEventListener('mouseleave', function() {
  contactCopyLinks.classList.add('js-links-invisible');
});

contactMailto.addEventListener('mouseenter', function() {
  contactCopyLinks.classList.add('js-links-invisible');
  contactAirplane.classList.remove('js-airplane-invisible');
});
contactAirplane.addEventListener('mouseenter', function() {
  contactCopyLinks.classList.add('js-links-invisible');
  contactAirplane.classList.remove('js-airplane-invisible');
});
contactMailto.addEventListener('mouseleave', function() {
  contactAirplane.classList.add('js-airplane-invisible');
});
contactAirplane.addEventListener('mouseleave', function() {
  contactAirplane.classList.add('js-airplane-invisible');
});

document.addEventListener("mousemove", function(e){
  mouseX = e.pageX;
  mouseY = e.pageY;
});



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
function mediaQ() {
  let query = window.matchMedia('(min-width: 767px)');
  // console.log(query); 
  if(query.matches === false) {
    // console.log(query);
    window.onscroll = function(event) {
      scrollDirection();
      this.scrollOld = this.scrollY;
    }
  } if(query.matches === true) {
    // console.log(query);
    window.onscroll = function(event) {
      scrollDirection();
      this.scrollOld = this.scrollY;
    }
  }
}

window.addEventListener("DOMContentLoaded", mediaQ);
window.addEventListener("resize", mediaQ);