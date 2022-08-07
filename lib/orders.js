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

    let h1 = document.createElement('h1');
    h1.innerText = "Your Order History"
    h1.style.marginTop = `1em`;
    ordersDiv.appendChild(h1);

    getOrderJson()
        .then((orders) => {
            orders
                .reverse()
                .forEach(order => {

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

        });
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
 * @param {*} orderId 
 * @returns 
 */
async function getOrderProducts(orderId) {
    let resp = await fetch(apiUrl + '/order/' + orderId);
    let orderObj = await resp.json();


    for (endpoint of orderObj.products) {

        console.log(`Fetching from: ${endpoint.endpoint}`)

        let api = await fetch(endpoint.endpoint);
        let apiObj = await api.json();

        console.log(apiObj)

        for (result in apiObj) {
            console.log(result)
        }
    }

    if (resp.ok) {

    }
}
//orderHistoryItemContainer
let hash = $(location).prop('hash').substr(1);

if (hash == "orders") {
    alert("Order Completed!");
    showOrders();
}