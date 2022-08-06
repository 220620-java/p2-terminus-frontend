/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/

//getLoggedInUser();
getLoggedInCustomer()
    // store all element ids in a list
const v = [...document.body.querySelectorAll('[id]')]
    .reduce((list, v) => {
        list[v.id] = document.getElementById(v.id)
        return list
    }, {})


// event listeners
//v.loginNav.addEventListener('click', loginFetch);
//v.signupNav.addEventListener('click', signupFetch);
v.homeLogo.addEventListener('click', main);


//initialization
//Main main.html the home page
main();

// event handlers
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



//  grab location to resource from parameter and fetch it!
// pass the response into parseHtml() function
async function getResource(html) {
    let response = await fetch(html)
    let data = await response.text();

    if (response) {
        hideloader();
    }
    parseHtml(data);

}

// Hello from the getResouce() function we will take your passed in response data
// and parse it into html and add it into the contentContainer
function parseHtml(data) {
    let parser = new DOMParser();

    let doc = parser.parseFromString(data, "text/html");
    let parsed = new XMLSerializer().serializeToString(doc);

    v.storeContainer.style.display = `none`;
    v.cartContainer.style.display = `none`;
    v.orderContainer.style.display = `none`;
    v.contentContainer.innerHTML = parsed;
    v.contentContainer.style.display = 'inline-block';

}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}


// Everything below here is just silly code for the navigation menu, ignore
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}

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


toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
    if (item.querySelector(".submenu")) {
        item.addEventListener("click", toggleItem, false);
    }
    item.addEventListener("keypress", toggleItem, false);
}

document.addEventListener("click", closeSubmenu, false);

let searchOpenStore = function searchOpenStore(char) {

    if ($("#storeContainer:visible").length == 0) {
        if (char.length >= 1) {
            getStore();
        }
    }

}

if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service_worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(swErr => console.log(
                `Service Worker Installation Error: ${swErr}}`));
    });
}