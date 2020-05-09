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


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// get number of sections
// for each section make a new list item and append it to the element with the id 'navbar__list'
const buildNavigationForAllSections = (event) => {
    const sections = document.querySelectorAll("section");
    const navbar = document.getElementById("navbar__list");
    if (navbar && sections && sections.length > 0) {
        console.log('in if-clause');
        sections.forEach((value) => {
            const sectionListElement = document.createElement("li");
            sectionListElement.innerText = value.dataset.nav;
            sectionListElement.classList.add("menu__link");
            console.log(sectionListElement.innerText);
            navbar.appendChild(sectionListElement);
        })
    }
};


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM ready')
    buildNavigationForAllSections(event);
});

// Scroll to section on link click

// Set sections as active


