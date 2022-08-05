/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/


// The fake store api endpoint this will be replaced with our local endpoint
// once we have the backend setup
const all_url =
    "https://fakestoreapi.com/products/";

let catBtn = document.getElementById("categoryBtn");
let cartBtn = document.getElementById("cartBtn");
let storeBtn = document.getElementById("storeNav");
let storeRows = document.getElementById("storeRows");
let storeBtns = document.getElementById("storeBtnContainer");
let tbodyRef = document.getElementById('storeRows').getElementsByTagName('tbody')[0];
let cart = [{}]


//Event Listeners
if (storeBtn) {
    storeBtn.addEventListener('click', getStore);
}

if (cartBtn) {
    cartBtn.addEventListener('click', addCart);
}
// Initialize the store as main page
//getStore();

// init function
function getStore() {
    getAllProducts(all_url)
}

function getCategory() {
    alert('Category');
}

function addCart() {
    console.log(cart)
}
// Fetch all products from the endpoint
async function getAllProducts(url) {

    // Storing response
    let response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }

    // Pass the response data to the showAllProducts function for styling/html
    showAllProducts(data);
}


// Fetch a single product from the endpoint
async function getProduct(id) {
    let response = await fetch(`${all_url}${id}`);
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }

    //Pass the single product data to the showProduct funtion for styling/html
    showProduct(data);
}


// Show single product function (this is where we make the html for the single product page)
function showProduct(data) {
    let divs = ``;

    divs += `
    <div onclick="getStore();" id="storeBtn" class="xButton" style="margin-right:0.8em;display: inline-block;min-width: 113px;text-align: center;"><i style="margin-right:0.5em;" class="fa-duotone fa-shop"></i></i> Back to Store</div>
    <div onclick="main();" id="backBtn" class="xButton" style="display: inline-block;min-width: 113px;text-align: center;"><i style="margin-right:0.5em;" class="fa-duotone fa-house"></i> Home</div>
    
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

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'inline-block';
    document.getElementById("storeBtnContainer").style.display = 'none';
    document.getElementById("storeItemContainer").innerHTML = divs;
    document.getElementById('cartContainer').style.display = 'none';



}


// Show all products function (this is where we make the html for the main store page)
function showAllProducts(data) {
    $('#storeRows tbody').empty();
    for (let r of data) {

        let newRow = tbodyRef.insertRow();
        let newCell = newRow.insertCell();


        let productDiv = document.createElement('div');
        productDiv.setAttribute('id', 'productDiv');

        let h1 = document.createElement("h1")
        h1.setAttribute('class', 'productTitle');
        h1.setAttribute("onClick", `javascript: getProduct('${r.id}');`);
        let text = document.createTextNode(r.title);
        h1.appendChild(text);

        let productImage = document.createElement('div');
        productImage.setAttribute('class', 'productImage');
        productImage.style.backgroundImage = `url('${r.image}')`;

        let rightDiv = document.createElement('div');
        rightDiv.style.float = 'right';
        rightDiv.style.marginTop = '-8em'
        rightDiv.innerHTML = `
        <h3 style="margin-bottom:8px;">$${r.price}</h3>
        ${r.rating.rate} (${r.rating.count} ratings)
        <div style="margin-top:1em;" class="xButton" onclick='getProduct(${r.id})'>View Product <i style="margin-left:0.4em;" class="fa-duotone fa-square-arrow-up-right"></i></div>
        `;

        productDiv.appendChild(h1);
        productDiv.appendChild(productImage);
        productDiv.appendChild(rightDiv);
        /*
                div = `
                <div id="productDiv">
                <h1 class="productTitle"><a href='#' onclick='getProduct(${r.id})'>${r.title}</a></h1>
                <div class="productImage" style="background-image: url('${r.image}');"></div>
                <div style="float:right;margin-top:-8em;">
                <h3 style="margin-bottom:8px;">$${r.price}</h3>
                ${r.rating.rate} (${r.rating.count} ratings)
                <div style="margin-top:1em;" class="xButton" onclick='getProduct(${r.id})'>View Product <i style="margin-left:0.4em;" class="fa-duotone fa-square-arrow-up-right"></i></div>
                </div>
                </div>
                `;*/

        newCell.appendChild(productDiv);
    }

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById("storeBtnContainer").style.display = 'inline-block';
    document.getElementById('cartContainer').style.display = 'none';
}



//document.getElementById("storeContainer").innerHTML += divs;

if (document.getElementById(`featuredBtn`)) {
    document.getElementById(`featuredBtn`).addEventListener('click', () => {
        //alert('Featured!');
    });
}

if (document.getElementById(`categoryBtn`)) {
    document.getElementById(`categoryBtn`).addEventListener('click', () => {
        //alert('Categories!');
    });
}

//hide fetch loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}


$(document).ready(function() {
    $("#filterSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#storeRows tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


const update_cart = (id, quantity, name, price) => {
    let item = cart.find(item => item.id === id)
        // Product is already in cart, need to increment
    if (item) {
        item.quantity = item.quantity + quantity
    }
    // Product is not in cart, need to add it
    else {
        cart.push({
            id,
            name,
            price
        })
    }

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
    console.log(cart);

}


function getCart() {

    let container = document.getElementById('cartContainer');
    container.innerHTML = ``;

    let h1 = document.createElement('h1')
    h1.innerText = `Your Shopping Cart`;
    container.appendChild(h1);

    for (let product of cart) {

        if (!product.id) {
            //no product?
        } else {
            let p1 = document.createElement('p');
            //let p2 = document.createElement('p');
            let p3 = document.createElement('p');
            let hr = document.createElement('hr');
            p1.innerHTML = '<b>Product Name:</b> ' + product.name;
            //p2.innerHTML = '<b>Quanity:</b> ' + product.quantity;
            p3.innerHTML = '<b>Price:</b> $' + product.price;
            container.appendChild(p1);
            //container.appendChild(p2);
            container.appendChild(p3);
            container.appendChild(hr);
        }

    }

    let div = document.createElement('div')
    div.setAttribute('class', 'xButton');
    div.addEventListener('click', createOrder);
    div.innerText = `Create Order`;
    container.appendChild(div);

    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById("storeBtnContainer").style.display = 'none';
    container.style.display = 'inline-block'
}


function createOrder() {
    alert(`Create order, get order id in return response, then call function to post products to order id`)
    cart.forEach(function(product) {
        if (typeof product.id !== "undefined") {
            console.log('Create order, get order id in return response, then call function to post products to order id\nPRODUCTS to insert: \n')
            console.log('Name: ' + product.name);
            console.log('Endpoint: https://fakestoreapi.com/products/' + product.id);
            console.log('Price: $' + product.price);
        }
    });
}