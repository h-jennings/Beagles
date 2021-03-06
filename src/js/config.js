import { Power3 } from 'gsap';

const config = {
  animation: {
    defaultEase: Power3.easeInOut,
    defaultDuration: 0.3,
    defaultStagger: 0.1,
    defaultDelay: 0.1,
    longerDelay: 0.4,
    durationLonger: 0.5,
    instant: 0.001,
  },
  elm: {
    // Global elements
    body: document.body,
    mainContainer: document.querySelector('main'),
    contentWrapper: document.querySelector('.content-wrapper'),
    mainFooter: document.querySelector('footer.primary'),
    nameWrapper: document.querySelector('.name-wrapper'),
    nameSvg: document.querySelector('.name-wrapper svg'),

    // Desktop specific elements
    desktopSidebar: document.querySelector('aside.sidebar[data-type="desktop"]'),
    hamburger: document.querySelector('.hamburger'),
    hamburgerBars: document.querySelectorAll('.bar'),
    desktopTransitionBlock: document.querySelector('.d-sidebar-transition-block'),
    desktopSideBarLinks: document.querySelectorAll('nav.d-sidebar-links li'),
    desktopSideBarLinkWrapper: document.querySelector('nav.d-sidebar-links'),
    menuBtn: document.querySelector('button.menu--btn'),
    desktopBookBtn: document.querySelector('button.d-book--btn'),
    menuBtnTxt: document.querySelector('.menu--txt'),
    desktopBookTxt: document.querySelector('.d-book--txt'),
    closeMenuBtnDesktop: document.querySelector('button.d-close'),

    // Mobile specific elements
    mobileSidebar: document.querySelector('aside.sidebar[data-type="mobile"]'),
    mobileTransitionBlock: document.querySelector('.mobile-menu-transition-block'),
    mobileSidebarWrapper: document.querySelector('.m-sidebar--wrapper'),
    mobileSideBarLinksWrapper: document.querySelectorAll('nav.m-sidebar-links'),
    mobileSideBarLinks: document.querySelectorAll('nav.m-sidebar-links li'),
    mobileMenuBtn: document.querySelector('button.m-menu-btn'),
    closeMenuBtnMobile: document.querySelector('button.m-close'),
    mobileBookBtn: document.querySelector('button.m-book--btn'),
    mobileBookTxt: document.querySelector('.m-book--txt'),
  },
};

export default config;
