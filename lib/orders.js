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
            <p>Order ID: ${order.orderId}</p>
            <p>Date: ${order.orderDate}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <hr>

        `;
        ordersDiv.appendChild(div);
        ordersDiv.style.display = 'inline-block'
        document.getElementById('contentContainer').style.display = 'none';
        document.getElementById('storeContainer').style.display = 'none';;
        document.getElementById('storeItemContainer').style.display = 'none';
        document.getElementById('cartContainer').style.display = 'none';


    }
}