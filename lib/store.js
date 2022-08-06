/*
Team Terminus

STORE.JS - The main library for store functions and properties.

@authors 
    - Tony Wiedman
    
*/
getLoggedInCustomer()

/**
    PROPERTIES
*/
const api_url = "https://fakestoreapi.com/products/";
let catBtn = document.getElementById("categoryBtn");
let cartBtn = document.getElementById("cartBtn");
let storeBtn = document.getElementById("storeNav");
let storeRows = document.getElementById("storeRows");
let tbodyRef = document.getElementById('storeRows').getElementsByTagName('tbody')[0];
let cart = [{}]


/**
    EVENT LISTENERS
*/
if (storeBtn) {
    storeBtn.addEventListener('click', getStore);
}
if (cartBtn) {
    cartBtn.addEventListener('click', addCart);
}


// LAUNCH STORE FUNCTION
function getStore() {
    getAllProducts(api_url)
}


/**
 * FETCH ALL API PRODUCTS JSON
 *
 * @param {*} url 
 */
async function getAllProducts(url) {
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    if (response) {
        hideloader();
    }

    showAllProducts(data);
}


/**
 * FETCH SINGLE API PRODUCT JSON
 *
 * @param {*} id 
 */
async function getProduct(id) {
    let response = await fetch(`${api_url}${id}`);
    let data = await response.json();

    if (response) {
        hideloader();
    }

    showProduct(data);
}


/**
 * SHOW SINGLE PRODUCT - HTML ELEMENTS
 *
 * @param {*} data 
 */
function showProduct(data) {
    let divs = ``;

    divs += `
        <div id="singleProductDiv">

        <h1 class="productTitle">${data.title}</h1>
        <h3>Category: ${data.category}</h3>

        <div class="row">

        <div class="column">
        <div class="singleProductImage" style="background-image: url('${data.image}');"></div>
        </div>
        <div class="column">
        ${data.description}

        <div class="singlePriceBox">
        <h3 style="margin-top:2em;margin-bottom:8px;">$${data.price}</h3>
        ${data.rating.rate} (${data.rating.count} ratings)
        <div id="cartBtn" onclick="update_cart(${data.id}, 1, '${data.title.replace(/["']/g, "")}', ${data.price});" style="margin-top:1em;width: fit-content;width:200px !important;" class="xButton" href="#">Add to Cart <i style="margin-left:0.7em;font-size:smaller;" class="fa-duotone fa-cart-shopping"></i></div>
        </div>
        </div>
        </div>
        </div>
        `;

    // HIDE/SHOW CONTAINERS
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'inline-block';
    document.getElementById("storeItemContainer").innerHTML = divs;
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderContainer').style.display = 'none';


}


/**
 * SHOW ALL PRODUCTS - HTML ELEMENTS
 *
 * @param {*} data 
 */
function showAllProducts(data) {
    $('#storeRows tbody').empty();
    for (let r of data) {

        //
        let newRow = tbodyRef.insertRow();
        let newCell = newRow.insertCell();

        //
        let productDiv = document.createElement('div');
        productDiv.setAttribute('id', 'productDiv');

        //
        let h1 = document.createElement("h1")
        h1.setAttribute('class', 'productTitle');
        h1.setAttribute("onClick", `javascript: getProduct('${r.id}');`);
        let text = document.createTextNode(r.title);
        h1.appendChild(text);

        //
        let productImage = document.createElement('div');
        productImage.setAttribute('class', 'productImage');
        productImage.style.backgroundImage = `url('${r.image}')`;

        //
        let rightDiv = document.createElement('div');
        rightDiv.style.float = 'right';
        rightDiv.style.marginTop = '-8em'
        rightDiv.innerHTML = `
        <h3 style="margin-bottom:8px;">$${r.price}</h3>
        ${r.rating.rate} (${r.rating.count} ratings)
        <div style="margin-top:1em;" class="xButton" onclick='getProduct(${r.id})'>View Product <i style="margin-left:0.4em;" class="fa-duotone fa-square-arrow-up-right"></i></div>
        `;

        // APPEND ELEMENTS
        productDiv.appendChild(h1);
        productDiv.appendChild(productImage);
        productDiv.appendChild(rightDiv);
        newCell.appendChild(productDiv);
    }

    // HIDE/SHOW CONTAINERS
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderContainer').style.display = 'none';
}


// FETCH LOADER
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// SEARCH FILTER
$(document).ready(function() {
    $("#filterSearch").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#storeRows tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


/**
 * STORE CART FUNCTION 
 *
 * @param {*} id 
 * @param {*} quantity 
 * @param {*} name 
 * @param {*} price 
 */
const update_cart = (id, quantity, name, price) => {

    //
    let item = cart.find(item => item.id === id)

    if (item) {
        item.quantity = item.quantity + quantity
    } else {
        cart.push({
            id,
            name,
            price
        })
    }

    // JS CSS KEYFRAMES
    let addedEffect = [
        { transform: 'scale3d(1, 1, 1)' },
        { transform: 'scale3d(1.25, 0.75, 1)' },
        { transform: 'scale3d(0.75, 1.25, 1)' },
        { transform: 'scale3d(1.15, 0.85, 1)' },
        { transform: 'scale3d(0.95, 1.05, 1)' },
        { transform: 'scale3d(1.05, 0.95, 1)' },
        { transform: 'scale3d(1, 1, 1)' },
        { background: '#2f4d70' }
    ];

    let addedTiming = {
        duration: 850,
        iterations: 1,
    }

    let cartEffect = [{
            transform: 'scale(1)',
            animationTimingFunction: 'ease-out',
            transformOrigin: 'center center'
        },
        {
            transform: 'scale(0.91)',
            animationTimingFunction: 'ease-in',
        },
        {
            transform: 'scale(0.98)',
            animationTimingFunction: 'ease-out',
        },
        {
            transform: 'scale(0.87)',
            animationTimingFunction: 'ease-in',
        },
        {
            transform: 'scale(1)',
            animationTimingFunction: 'ease-out',
        },
        { background: '#2f4d70' }
    ];

    let cartTiming = {
        duration: 850,
        iterations: 1,
    }
    document.getElementById('cartNav').animate(cartEffect, cartTiming);
    document.getElementById('cartBtn').animate(addedEffect, addedTiming);
    document.getElementById('cartBtn').innerHTML = `Added <i style='margin-left:0.7em;font-size:smaller;' class='fa-duotone fa-circle-check'></i>`;
    document.getElementById('cartBtn').style.backgroundColor = '#2f4d70';
    document.getElementById('cartBtn').setAttribute('class', 'xButton disabled');
}


/**
 * REMOVE ITEM FROM CART
 *
 * @param {*} key 
 */
function removeIndexCart(key) {
    cart.splice(key, 1);
    getCart();
}


/**
 * GET CART FUNCTION - HTML ELEMENTS
 *
 */
function getCart() {

    //
    let container = document.getElementById('cartContainer');
    container.innerHTML = ``;

    //
    let h1 = document.createElement('h1')
    h1.innerText = `Your Shopping Cart`;
    h1.style.marginTop = `1em`;
    container.appendChild(h1);

    //
    for (const [key, product] of Object.entries(cart)) {

        if (!product.id) {
            //no product?
        } else {

            let div = document.createElement('div');
            div.setAttribute('class', 'cartItem');

            //
            let p1 = document.createElement('p');
            p1.style.fontSize = 'larger'
            p1.style.fontWeight = '500'
            p1.innerHTML = product.name;

            //
            let p3 = document.createElement('p');
            p3.setAttribute('class', 'itemPrice');
            p3.innerHTML = '<i class="fa-duotone fa-circle-dollar" style="margin-right: 0.3em;"></i>' + product.price;

            //
            let a = document.createElement('a');
            a.setAttribute('onclick', `removeIndexCart(${key})`)
            a.setAttribute('class', 'removeBtn')
            a.innerHTML = `<i class="fa-duotone fa-circle-xmark" style="padding: 0px 2px 0px 0px;"></i> Remove`;

            //
            div.appendChild(p1);
            div.appendChild(p3);
            div.appendChild(a);

            //
            container.append(div);
        }

    }
    let price;
    for (let item of cart) {

        // price = item.price.reduce((partialSum, a) => partialSum + a, 0);

    }

    //
    let priceDiv = createElement('div');
    priceDiv.fontSize = '2rem';
    priceDiv.innerHTML = `Total Order Price: ${price}`
    container.appendChild(priceDiv);

    //
    let div = document.createElement('div')
    div.setAttribute('class', 'xButton');
    div.addEventListener('click', createOrder);
    div.innerText = `Create Order`;
    div.style.display = 'inline-block'
    div.style.marginTop = '1em'
    container.appendChild(div);

    //
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('orderContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'none';
    container.style.display = 'inline-block'
}