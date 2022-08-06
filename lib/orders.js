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

    let orderUrl = 'http://p2terminusoms-env.eba-fcyktpid.us-east-1.elasticbeanstalk.com/order/'

    let orders = await getAllOrders(orderUrl);

    console.log(orders);
    console.log(orders.title);

    for (let order in orders) {

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
        document.getElementById('orderContainer').appendChild(div);
        document.getElementById('orderContainer').style.display = 'inline-block'
        document.getElementById('contentContainer').style.display = 'none';
        document.getElementById('storeContainer').style.display = 'none';;
        document.getElementById('storeItemContainer').style.display = 'none';
        document.getElementById('cartContainer').style.display = 'none';


    }
}

async function getAllOrders(url) {

    let credentials = { customerId: loggedInCustomer.id };

    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    document.getElementById('orderContainer').innerHTML = '';
    if (resp.status === 201) {
        data = await resp.json();

        return data;
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