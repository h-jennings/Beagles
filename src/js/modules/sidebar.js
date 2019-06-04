import { TimelineMax, Power3 } from 'gsap';


export default class Sidebar {
  constructor() {
    this.body = document.body;
    this.sidebar = document.querySelector('aside.sidebar');
    this.mobileSidebarWrapper = document.querySelector('.m-sidebar--wrapper');
    this.contentWrapper = document.querySelector('.content-wrapper');
    this.transitionBlock = document.querySelector('.transition-block');
    this.menuBtn = document.querySelector('button.menu--btn');
    this.menuBtnTxt = document.querySelector('.menu--txt');
    this.mobileMenuBtn = document.querySelector('button.m-menu-btn');
    this.hamburger = document.querySelector('.hamburger');
    this.hamburgerBars = document.querySelectorAll('.bar');
    this.bookTxt = document.querySelector('.book--txt');
    this.sideBarLinks = document.querySelector('nav.sidebar-links');
    this.closeMenuBtn = document.querySelector('button[data-button-type="close"]');

    // Animation Values
    this.defaultEase = Power3.easeInOut;
    this.defaultDuration = 0.3;
    this.defaultStagger = 0.1;
    this.defaultDelay = 0.1;
    this.longerDelay = 0.4;
    this.durationLonger = 0.5;

    // Calling the init function
    this.init();

    // Calling the browser check method
    this.isMobile = false;
    this.hasMobileMenuBeenSet = false;
    this.browserCheck();
  }

  // Initializes object
  init() {
    // setting sidebar state
    this.sidebar.dataset.state = 'closed';

    // Handles clicks for desktop menu
    const clickHandler = (e) => {
      const buttonDataset = e.currentTarget.dataset.buttonType;
      if (buttonDataset === 'hamburger') {
        e.stopPropagation();
      }

      const desktopEventOptions = {
        menu: {
          functions: [
            this.openMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        book: {
          functions: [
            this.closeMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        hamburger: {
          functions: [
            this.openMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        close: {
          functions: [
            this.closeMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
      };

      // ! Need to add all of the mobile styles here
      // ! These will be evaluated the same way the desktop click handlers were evaluated
      const mobileEventOptions = {
        mobileMenu: {
          functions: [
            this.openMobileMenuAnimation.bind(this),
          ],
        },
      };

      /*

      ! MAGIC HAPPENING HERE

      This runs the corresponding functions into the 'eventOptions' object
      based on the event target's data- attribute (which represents the button's functionality)

      */
      if (!this.isMobile) {
        desktopEventOptions[buttonDataset].functions.forEach(fn => fn(buttonDataset));
      } else {
        // run mobile specific animations here

        // Evaluating and running the mobile specific functions based on their data attributes
        mobileEventOptions[buttonDataset].functions.forEach(fn => fn(buttonDataset));
      }
    };

    // Adding event listeners
    [this.menuBtn, this.hamburger, this.closeMenuBtn, this.mobileMenuBtn].forEach(elm => elm.addEventListener('click', clickHandler));

    // Running the browser check on resize to reset the isMobile variable
    window.addEventListener('resize', this.browserCheck.bind(this));
  }

  // checking browser width and setting the 'isMobile' boolean accordingly
  browserCheck() {
    document.body.getBoundingClientRect().width <= 900
      ? this.isMobile = true
      : this.isMobile = false;

    // If it's not a mobile device then return early
    if (!this.isMobile) return;

    // If it's not a mobile device then return early
    if (this.isMobile && this.hasMobileMenuBeenSet) return;

    // Resetting the styles of the menu to be in the 'open state'  if it's a mobile device
    this.setMobileMenu();
  }

  changeButtonState(state) {
    const menuButtonStates = ['menu', 'hamburger'];
    let btnState = state;

    menuButtonStates.includes(state) ? btnState = 'book' : btnState = 'menu';

    if (btnState === 'book') {
      this.setBookFn();
    } else {
      this.setMenuFn();
    }
  }

  setBookFn() {
    // ! Need to add this functionality back in once the page transition logic is needed
    // this.menuBtn.setAttribute('onclick', 'location.href=\'/contact.html\'');
    this.menuBtn.dataset.buttonType = 'book';
  }

  setMenuFn() {
    // ! Need to add this functionality back in once the page transition logic is needed
    // this.menuBtn.removeAttribute('onclick');
    this.menuBtn.dataset.buttonType = 'menu';
  }

  // Resets mobile menu styles once the mobile device is detected
  setMobileMenu() {
    this.hasMobileMenuBeenSet = true;
    this.menuBtnTxt.style.opacity = 0;
    this.hamburger.style.opacity = 0;
    this.hamburger.style.display = 'none';
    this.hamburgerBars.forEach(bar => bar.setAttribute('style', 'transform: translateX(-100%)'));
    this.sideBarLinks.style.display = 'flex';
    [this.bookTxt, this.closeMenuBtn]
      .forEach(elm => elm.setAttribute('style', 'opacity: 1; display: inline-block;'));
    this.transitionBlock.style.transform = 'translate(0, 100%)';
  }

  openMobileMenuAnimation() {
    const openMobileMenuAnimationMasterTl = new TimelineMax();

    const fadeOutMobileContent = () => {
      const fadeOutContentTl = new TimelineMax();
      fadeOutContentTl
        .to([this.mobileSidebarWrapper, this.contentWrapper], this.defaultDuration, {
          ease: this.defaultEase,
          opacity: 0,
        })
        .to(this.body, this.defaultDuration, {
          overflow: 'hidden',
        }, `-=${this.defaultDuration}`)
        .set(this.transitionBlock, {
          x: '0%',
          y: '0%',
        });

      return fadeOutContentTl;
    };

    const mobileSidebarSlideAnimation = () => {
      const sideBarSlideTl = new TimelineMax();

      sideBarSlideTl
        .to(this.transitionBlock, this.defaultDuration, {
          ease: this.defaultEase,
          x: '100%',
        })
        .to(this.sidebar, this.durationLonger, {
          ease: this.defaultEase,
          x: '0%',
          delay: this.defaultDelay,
        })
        .to(this.transitionBlock, this.durationLonger, {
          ease: this.defaultEase,
          delay: this.defaultDelay,
          x: '200%',
        })
        .set(this.transitionBlock, {
          x: '-100%',
        });

      return sideBarSlideTl;
    };

    openMobileMenuAnimationMasterTl
      .add(fadeOutMobileContent())
      .add(mobileSidebarSlideAnimation());
  }

  openMenuAnimation() {
    const openMenuMasterTl = new TimelineMax();

    // Animating the content within the hamburger menu (desktop)
    const hamburgerContentAnimation = () => {
      const hamburgerContentTl = new TimelineMax();
      hamburgerContentTl
        .to(this.menuBtnTxt, this.defaultDuration, {
          opacity: 0,
          ease: this.defaultEase,
        })
        .staggerTo(this.hamburgerBars, this.defaultDuration,
          {
            delay: this.defaultDelay,
            x: '-100%',
            ease: this.defaultEase,
          }, this.defaultStagger, `-=${this.defaultDuration}`)
        .to(this.hamburger, 0, {
          display: 'none',
        });

      return hamburgerContentTl;
    };

    // Animating transition block that runs over the sidebar
    const sideBarTransitionAnimation = () => {
      const sideBarTransitionTl = new TimelineMax();

      sideBarTransitionTl
        .to(this.transitionBlock, this.durationLonger, {
          y: '0%',
          ease: this.defaultEase,
        })
        .to(this.sideBarLinks, 0, {
          display: 'flex',
        })
        .to([this.bookTxt, this.closeMenuBtn], 0, {
          display: 'inline-block',
        })
        .to(this.transitionBlock, this.durationLonger, {
          y: '100%',
          ease: this.defaultEase,
          delay: this.defaultDelay,
        })
        .to([this.bookTxt, this.closeMenuBtn], this.defaultDuration, {
          opacity: 1,
          ease: this.defaultEase,
          delay: this.defaultDelay,
        });


      return sideBarTransitionTl;
    };

    openMenuMasterTl
      .add(hamburgerContentAnimation())
      .add(sideBarTransitionAnimation());
  }

  closeMenuAnimation() {
    const closeMenuMasterTl = new TimelineMax();

    const closeMenuTransition = () => {
      const closeMenuTransitionTl = new TimelineMax();
      closeMenuTransitionTl
        .to([this.bookTxt, this.closeMenuBtn], this.defaultDuration, {
          opacity: 0,
          ease: this.defaultEase,
        })
        .to(this.transitionBlock, this.durationLonger, {
          y: '0%',
          ease: this.defaultEase,
          delay: this.defaultDelay,
        })
        .to(this.hamburger, 0, {
          display: 'unset',
        })
        .to(this.hamburgerBars, 0, {
          x: '100%',
        })
        .to(this.sideBarLinks, 0, {
          display: 'none',
        })
        .to([this.bookTxt, this.closeMenuBtn], 0, {
          display: 'none',
        })
        .to(this.transitionBlock, this.durationLonger, {
          y: '-100%',
          ease: this.defaultEase,
          delay: this.defaultDelay,
        });

      return closeMenuTransitionTl;
    };

    const menuAppearAnimation = () => {
      const menuAppearAnimationTl = new TimelineMax();

      menuAppearAnimationTl
        .to(this.menuBtnTxt, this.defaultDuration, {
          opacity: 1,
        })
        .staggerTo(this.hamburgerBars, this.defaultDuration, {
          x: '0%',
        }, this.defaultStagger);


      return menuAppearAnimationTl;
    };

    closeMenuMasterTl
      .add(closeMenuTransition())
      .add(menuAppearAnimation());
  }
}
