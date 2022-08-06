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
            <div onclick="getOrderProducts(${order})" class="xButton">View Order</div>
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
async function getOrderProducts(order) {
    let resp = await fetch(apiUrl + '/order/' + order.id);
    let products = await resp.json();

    if (resp.ok) {
        console.log(products)
    }
}