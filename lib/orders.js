/**
Team Terminus

@authors 
    - Tony Wiedman
    
*/

getLoggedInCustomer();


/**
 * SHOW ORDER HISTORY
 */
async function showOrders() {

    let ordersDiv = document.getElementById('orderContainer');
    ordersDiv.innerHTML = '';

    getOrderJson()
        .then((orders) => {
            orders.array.forEach(order => {


                // create a div for each order
                let div = document.createElement('div');
                div.setAttribute("class", "orderItem");

                div.innerHTML = `
                        <div class="cartItem">
                        <p>Order #: ${order.orderId}</p>
                        <p>Ordered On ${order.orderDate}</p>
                        <p><b>Total:</b> $${order.totalPrice}</p>
                        <div onclick="getOrderProducts(${order.orderId})" class="xButton" style="display: inline-block;float: right;margin-top: -5.5em;margin-right: 1em;">View Order</div>
                        </div>`;

                ordersDiv.appendChild(div);
                ordersDiv.style.display = 'inline-block'
                document.getElementById('contentContainer').style.display = 'none';
                document.getElementById('storeContainer').style.display = 'none';;
                document.getElementById('storeItemContainer').style.display = 'none';
                document.getElementById('cartContainer').style.display = 'none';

            });

            //console.log(orders);
            //console.log(order); 


        });
}
async function getOrderJson() {
    console.log(apiUrl + '/customer/' + loggedInCustomer.id);
    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let returnJSON = await resp.json();

    if (resp.ok) {
        return JSON.parse(returnJSON.orders);
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

let hash = $(location).prop('hash').substr(1);

if (hash == "orders") {
    alert("Order Completed!");
    showOrders();
}