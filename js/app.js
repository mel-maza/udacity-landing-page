/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// Flag, if dom was already built
let domBuilt = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// list of all sections
const getSections = () => domBuilt ? document.querySelectorAll("section") : undefined;

// navbar
const getNavbarList = () => domBuilt ? document.getElementById("navbar__list") : undefined;

// list of all nav-Elements
const getNavListItems = () => domBuilt ? getNavbarList().querySelectorAll("li") : undefined;

const createNewNavbarListItem = (currentSection) => {
    const sectionListElement = document.createElement("li");
    sectionListElement.innerText = currentSection.dataset.nav;
    sectionListElement.classList.add("menu__link");
    sectionListElement.setAttribute('sectionid', currentSection.id);
    sectionListElement.setAttribute('id', currentSection.id + 'listelement');
    sectionListElement.addEventListener('click', 
        (event) => {
            const sectionId = getSectionIdToScrollTo(event.target);
            scrollToSection(sectionId);
        });

    return sectionListElement;
}

const getLastActiveListElement = () => {
    const allListItems = getNavListItems();
    allListItems && allListItems.forEach((listItem) => {
        if (listItem.classList.contains('menu__link-active')) {
            return listItem;
        }
    })
    return undefined;
}

const activateSection = (currentSection, lastSection, lastActiveListElement) => {
    const rect = currentSection.getBoundingClientRect();
    const currentListElement = document.getElementById(currentSection.id + 'listelement');
    const activationHeight = window.innerHeight * 0.7;
    if (rect.top < activationHeight) {
        currentListElement.classList.add('menu__link-active');
        currentSection.classList.add('is-active');
        if (lastSection) {
            lastSection.classList.remove('is-active');
        }
        if (lastActiveListElement) {
            lastActiveListElement.classList.remove('menu__link-active');
        }
    } else {
        currentSection.classList.remove('is-active');
        currentListElement.classList.remove('menu__link-active');
    }
    return currentListElement;
}

const getSectionIdToScrollTo = (selectedSection) => {
    const sectionId = selectedSection.getAttribute("sectionid");
    return sectionId;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// get number of sections
// for each section make a new list item and append it to the element with the id 'navbar__list'
const buildNavigationForAllSections = (event) => {
    const sections = getSections();
    const navbar = getNavbarList();
    if (sections && sections.length > 0) {
        sections.forEach((value) => {
            const sectionListElement = createNewNavbarListItem(value);
            navbar && navbar.appendChild(sectionListElement);
        })
    }
};


// Add class 'active' to section when near top of viewport
const showActiveSection = (event) => {
    const sections = getSections();
    let lastActiveListElement = getLastActiveListElement();
    let lastSection;
    sections && sections.forEach((value) => {
        const currentListElement = activateSection(value, lastSection, lastActiveListElement);
        lastActiveListElement = currentListElement;
        lastSection = value;
    })
}


// Scroll to anchor ID using scrollTO event
// get Section from event - value in click-Event and then do section.scrollTo
const scrollToSection = (sectionIdToScrollTo) => {
    const sectionToScrollTo = document.getElementById(sectionIdToScrollTo);
    const navbar = getNavbarList();
    const navbarHeight = navbar ?  navbar.offsetHeight : 0;
    sectionToScrollTo && setTimeout(() => window.scrollTo({
        top: sectionToScrollTo.offsetTop - navbarHeight, 
        left: sectionToScrollTo.offsetLeft
    }), 20);
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('DOMContentLoaded', (event) => {
    domBuilt = true;
    buildNavigationForAllSections(event);
    scrollToSection('section1');
});

// Scroll to section on link click
// event is set, when creating navbarlistItem for section


// Set sections as active
let timer;
window.addEventListener('scroll', (event) => {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout( () => showActiveSection(event), 10);
});


