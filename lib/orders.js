/**
Team Terminus

@authors 
    - Tony Wiedman
    
*/

getLoggedInCustomer();


/**
 * SHOW ORDER HISTORY
 */
function showOrders() {

    let orders = loggedInCustomer.orders;
    let ordersDiv = document.getElementById('orderContainer');

    ordersDiv.innerHTML = '';

    for (let order of orders) {
        // create a div for each order
        let div = document.createElement('div');
        div.setAttribute("class", "orderItem");

        div.innerHTML = `
        <div class="cartItem">
            <p>Order #: ${order.orderId}</p>
            <p>Ordered On ${order.orderDate}</p>
            <p><b>Total:</b> $${order.totalPrice}</p>
            <div onclick="getOrderProducts(${order.orderId})" class="xButton" style="display: inline-block;float: right;margin-top: -5.5em;margin-right: 1em;">View Order</div>
          </div>

        `;
        ordersDiv.appendChild(div);
        ordersDiv.style.display = 'inline-block'
        document.getElementById('contentContainer').style.display = 'none';
        document.getElementById('storeContainer').style.display = 'none';;
        document.getElementById('storeItemContainer').style.display = 'none';
        document.getElementById('cartContainer').style.display = 'none';


    }
}

/**
 * GET ORDER DETAILS FROM BACKEND BY ID 
 *
 * @param {*} orderId 
 * @returns 
 */
async function getOrderProducts(orderId) {
    let resp = await fetch(apiUrl + '/order/' + orderId);
    let orderObj = await resp.json();

    console.log(orderObj);
    console.log(orderObj.products)

    for (endpoint of orderObj.products) {
        console.log(endpoint.endpoint)
        alert(endpoint.endpoint)
    }

    if (resp.ok) {

    }
}