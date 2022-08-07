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
    h1.innerHTML = `<i class="fa-duotone fa-clock-rotate-left" style="margin-right:0.5em;"></i> Your Order History`;
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

                    //
                    let cartItem = document.createElement('div')
                    div.setAttribute('class', 'cartItem')

                    let p1 = document.createElement('p')
                    p1.innerHTML = `Order #: ${order.orderId}`

                    let p2 = document.createElement('p')
                    p2.innerHTML = `Ordered On ${order.orderDate}`

                    let p3 = document.createElement('p')
                    p3.innerHTML = `<b>Total:</b> $${order.totalPrice}`

                    cartItem.appendChild(p1);
                    cartItem.appendChild(p2);
                    cartItem.appendChild(p3);

                    div.appendChild(cartItem)

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



                    ordersDiv.style.display = 'inline-block'
                    document.getElementById('contentContainer').style.display = 'none';
                    document.getElementById('storeContainer').style.display = 'none';;
                    document.getElementById('storeItemContainer').style.display = 'none';
                    document.getElementById('cartContainer').style.display = 'none';
                    document.getElementById('orderHistoryItemContainer').style.display = 'none';
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
    let data = await resp.json();

    showOrderProducts(data);
}


async function fetchEndpoint(url) {
    let resp = await fetch(url);
    let data = await resp.json();
    return data;
}

function showOrderProducts(data) {

    let h1 = document.createElement('h1');
    h1.innerHTML = `<i class="fa-duotone fa-cart-circle-check" style="margin-right:0.5em;"></i> Order # ${data.orderId} placed on ${data.orderDate}`

    let divSingle = document.createElement('div');
    divSingle.setAttribute('id', 'singleOrderDiv');

    for (r of data.products) {

        fetchEndpoint(r.endpoint)
            .then((result) => {

                let productImage = document.createElement('div');
                productImage.setAttribute('class', 'productImage');
                productImage.style.backgroundImage = `url('${result.image}')`;

                let p1 = document.createElement('p')
                p1.innerHTML = `<b>${result.title}</b>`;
                let p2 = document.createElement('p')
                p2.innerHTML = `<b>${result.price}</b>`;

                divSingle.appendChild(p1)
                divSingle.appendChild(p2);
                divSingle.appendChild(productImage);

                document.getElementById('orderHistoryItemContainer').appendChild(divSingle);

            });
    }
    document.getElementById('orderContainer').style.display = 'none'
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';;
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderHistoryItemContainer').style.display = 'inline-block';

}