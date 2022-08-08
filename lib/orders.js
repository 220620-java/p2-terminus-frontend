/**
Team Terminus
    
*/

getLoggedInCustomer();


/**
 * SHOW ORDER HISTORY
 *
 * The main function to get the current logged in customers order information.
 */
async function showOrders() {

    let ordersDiv = document.getElementById('orderContainer');
    ordersDiv.innerHTML = '';
    ordersDiv.style.display = 'inline-block';

    let h1 = document.createElement('h1');
    h1.innerHTML = `<i class="fa-duotone fa-clock-rotate-left" style="margin-right:0.5em;"></i> Your Order History`;
    h1.style.marginTop = `1.5em`;
    ordersDiv.appendChild(h1);

    // async function to grab the customers orders
    getOrderJson()
        .then((orders) => {
            orders
            // Sort the most recent order first
                .reverse()
                // Iterate through the orders and apply elements
                .forEach(order => {

                    // create a div for each order
                    let div = document.createElement('div');
                    div.setAttribute("class", "orderItem");

                    let productItem = document.createElement('div')
                    div.setAttribute('class', 'productItem')

                    let p1 = document.createElement('p')
                    p1.innerHTML = `Order #: ${order.orderId}`

                    let p2 = document.createElement('p')
                    p2.innerHTML = `Ordered On ${order.orderDate}`

                    let p3 = document.createElement('p')
                    p3.innerHTML = `<b>Total:</b> $${order.totalPrice}`

                    productItem.appendChild(p1);
                    productItem.appendChild(p2);
                    productItem.appendChild(p3);

                    div.appendChild(productItem)

                    let btn = document.createElement('div')
                    btn.setAttribute('class', 'xButton');
                    btn.style.display = 'inline-block';
                    btn.style.float = 'right'
                    btn.style.marginTop = '-5.5em';
                    btn.style.marginRight = '1em';
                    btn.innerText = 'View Order'
                    btn.addEventListener('click', () => {
                        getOrderProducts(order.orderId)
                    });

                    div.appendChild(btn);

                    ordersDiv.appendChild(div);

                });

            let noItems = document.createElement('div');
            noItems.style.fontSize = '20px';
            noItems.style.marginTop = '2em';
            noItems.innerHTML = `You have no previous order history...`;
            if (orders.length === 0) {
                ordersDiv.appendChild(noItems);
            }
        });

    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';;
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderHistoryItemContainer').style.display = 'none';
    document.getElementById('editAccountContainer').style.display = 'none';

    document.getElementById('orderContainer').style.display = 'inline-block'
}

/**
 * FETCH ALL OF THE CUSTOMERS ORDERS
 * 
 * @returns Logged in customers order history
 */
async function getOrderJson() {

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let returnJSON = await resp.json();

    if (resp.ok) {
        return returnJSON.orders;
    }

}


/**
 * GET ORDER DETAILS FROM BACKEND BY ID 
 *
 * @param {*} orderId The customers order number.
 * @returns Order JSON for the requested order id from the backend.
 */
async function getOrderProducts(orderId) {
    let resp = await fetch(apiUrl + '/order/' + orderId);
    let data = await resp.json();

    showOrderProducts(data);
}


/**
 * Confirm that the customer if they are sure that they want to delete an order
 * @param {} id 
 */
function confirmCancel(id) {
    let text = "Are you sure you want to cancel your order?";
    if (confirm(text) == true) {
        cancelOrder(id)
    } else {
        text = "You canceled!";
    }
}


/**
 * A customer has confirmed that they would like to delete an order.
 * 
 * @param {*} id The order id that is getting deleted.
 */
async function cancelOrder(id) {
    let resp = await fetch(apiUrl + '/order/' + id, {
        method: 'DELETE',
    });

    if (resp.ok) {
        showOrders();
        message('info', 'Your order has been canceled')
    }

}


/**
 * API ENDPOINT FETCHER
 * @param {*} url  Product endpoint url from a customer order
 * @returns FakeStore Api JSON
 */
async function fetchEndpoint(url) {
    let resp = await fetch(url);
    let data = await resp.json();
    return data;
}


/**
 * VIEW ORDER DETAILS
 * Create elements with the fetch order data 
 *
 * @param {*} data Order JSON
 */
function showOrderProducts(data) {

    // Clear the container
    document.getElementById('orderHistoryItemContainer').innerHTML = '';

    let divSingle = document.createElement('div');

    let h1 = document.createElement('h2');
    h1.style.margin = '0.5em 0 1.5em 0'
    h1.style.fontSize = 'unset'
    h1.innerHTML = `<i class="fa-duotone fa-cart-circle-check" style="margin-right:0.5em;"></i> Order # ${data.orderId} placed on ${data.orderDate}`
    divSingle.appendChild(h1);

    let products = document.createElement('div');

    let total = document.createElement('div');
    total.setAttribute('class', 'totalOrderPrice')
    total.innerHTML = `Total Price $${data.totalPrice}`

    // Create the responsive row, columns elements outside of the for loop
    let row = document.createElement('div')
    let column1, column2, productImage, cancelBtn, productName
    column1 = document.createElement('div')
    column2 = document.createElement('div')
    cancelBtn = document.createElement('div');

    // Fetch the customers products (stored in the database as fakestore api endpoints)
    for (r of data.products) {

        // Fetch each of those endpoints and create HTML elements
        fetchEndpoint(r.endpoint)
            .then((result) => {

                productImage = document.createElement('div');


                productName = document.createElement('h3');
                productName.style.fontWeight = "300";
                productName.style.margin = "1em";

                productName.innerHTML = `${result.title} <span style="float:right;">$${result.price}</span>`;
                products.appendChild(productName)

                divSingle.setAttribute('id', 'singleOrderDiv');
                row.setAttribute('class', 'row')
                column1.setAttribute('class', 'column')
                column2.setAttribute('class', 'column')

                row.appendChild(column1)
                row.appendChild(column2)

                productImage.setAttribute('class', 'productImage');
                productImage.style.backgroundImage = `url('${result.image}')`;
                productImage.style.display = 'inline-block';
                productImage.style.marginRight = '1em';
                productImage.style.padding = '3em';
                productImage.style.border = `5px #ffffff solid`
                column1.appendChild(productImage);

                cancelBtn.setAttribute('class', 'xButton');
                cancelBtn.style.display = 'inline-block'
                cancelBtn.style.marginTop = '1em'
                cancelBtn.innerHTML = `Cancel Order`;
                cancelBtn.style.float = 'right';

            });

    }

    cancelBtn.addEventListener('click', function() {
        confirmCancel(data.orderId)
    })

    column2.appendChild(cancelBtn);
    divSingle.appendChild(row)
    divSingle.appendChild(products);
    divSingle.appendChild(total);
    document.getElementById('orderHistoryItemContainer').appendChild(divSingle);

    // HIDE/SHOW CONTAINERS
    document.getElementById('orderContainer').style.display = 'none'
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';;
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderHistoryItemContainer').style.display = 'inline-block';
    document.getElementById('editAccountContainer').style.display = 'none';
}
