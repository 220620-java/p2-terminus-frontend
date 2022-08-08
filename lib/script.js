/**
Team Terminus

@authors
    - Tony Wiedman
*/

getLoggedInCustomer()

// INITIALIZATION
main();




/**
 * PROPERTIES AND ELEMENTS
 */
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");
const v = [...document.body.querySelectorAll('[id]')]
    .reduce((list, v) => {
        list[v.id] = document.getElementById(v.id)
        return list
    }, {})


// EVENT LISTENERS
v.homeLogo.addEventListener('click', main);
toggle.addEventListener("click", toggleMenu, false);


// EVENT HANDLERS
function main() {
    document.getElementById("storeItemContainer").innerHTML = '';
    getResource('assets/html/main.html');
}

function loginFetch() {
    getResource('assets/html/login.html');
}

function signupFetch() {
    getResource('assets/html/signup.html');
}


/** 
 * HTML RESOURCE FETCHER
 *
 * Grab location to resource from parameter and fetch it!
 * Pass the response into parseHtml() function.
 *
 * @param {*} html 
 */
async function getResource(html) {
    let response = await fetch(html)
    let data = await response.text();

    if (response) {
        hideloader();
    }
    parseHtml(data);

}

/**
 * HTML RESOURCE PARSER
 *
 * @param {} data 
 */
function parseHtml(data) {
    let parser = new DOMParser();

    let doc = parser.parseFromString(data, "text/html");
    let parsed = new XMLSerializer().serializeToString(doc);

    v.storeContainer.style.display = `none`;
    v.cartContainer.style.display = `none`;
    v.orderContainer.style.display = `none`;
    v.contentContainer.innerHTML = parsed;
    v.contentContainer.style.display = 'inline-block';
    v.orderHistoryItemContainer.style.display = 'none';
    v.editAccountContainer.style.display = 'none';

}

// FETCH LOADER
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}


/**
 * NAVIGATION MENU
 */
// TOGGLE MOBILE MENU
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}

// TOGGLE SUBMENU
function toggleItem() {
    if (this.classList.contains("submenu-active")) {
        this.classList.remove("submenu-active");
    } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        this.classList.add("submenu-active");
    } else {
        this.classList.add("submenu-active");
    }
}

// CLOSE SUBMENU
function closeSubmenu(e) {
    if (menu.querySelector(".submenu-active")) {
        let isClickInside = menu
            .querySelector(".submenu-active")
            .contains(e.target);

        if (!isClickInside && menu.querySelector(".submenu-active")) {
            menu.querySelector(".submenu-active").classList.remove("submenu-active");
        }
    }
}

// ADD EVENT LISTENERS TO TOGGLE BUTTONS
for (let item of items) {
    if (item.querySelector(".submenu")) {
        item.addEventListener("click", toggleItem, false);
    }
    item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);

/**
 * FILTER SEARCH - UPDATE STORE ON CHAR CHANGE 
 *
 * @param {query} char 
 */
let searchOpenStore = function searchOpenStore(char) {

    if ($("#storeContainer:visible").length == 0) {
        if (char.length >= 1) {
            getStore();
        }
    }

}


// REGISTER SERVICE WORKER
if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service_worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(swErr => console.log(
                `Service Worker Installation Error: ${swErr}}`));
    });
}

function message(level, message) {

    if (level == "alert") {
        v.alertMessage.innerHTML = message
        v.alert.style.display = 'inline-block'
    } else if (level == "success") {
        v.successMessage.innerHTML = message
        v.success.style.display = 'inline-block'
    } else if (level == "info") {
        v.infoMessage.innerHTML = message
        v.info.style.display = 'inline-block'
    }

    let msgOutEffect = [{
            transform: 'translateY(0)',
            opacity: '1'
        },
        {
            transform: 'translateY(50px)',
            opacity: '0'
        },
        {
            display: 'none'
        }
    ];

    let msgOutTiming = {
        duration: 850,
        iterations: 1,
    }

    setTimeout(function() {
        document.getElementById(level).animate(msgOutEffect, msgOutTiming);
    }, 3000);
}