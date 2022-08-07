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
    ordersDiv.style.display = 'inline-block';

    let h1 = document.createElement('h1');
    h1.innerHTML = `<i class="fa-duotone fa-clock-rotate-left" style="margin-right:0.5em;"></i> Your Order History`;
    h1.style.marginTop = `1.5em`;
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



                    document.getElementById('contentContainer').style.display = 'none';
                    document.getElementById('storeContainer').style.display = 'none';;
                    document.getElementById('storeItemContainer').style.display = 'none';
                    document.getElementById('cartContainer').style.display = 'none';
                    document.getElementById('orderHistoryItemContainer').style.display = 'none';
                    document.getElementById('editAccountContainer').style.display = 'none';
                });

        });

    ordersDiv.style.display = 'inline-block'
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

async function cancelOrder(orderId) {
    let resp = await fetch(apiUrl + '/order/' + orderId, {
        method: 'DELETE',
    });

    if (resp.ok) {
        showOrders()
    }

}

async function fetchEndpoint(url) {
    let resp = await fetch(url);
    let data = await resp.json();
    return data;
}

/**
 * 
 * @param {*} data 
 */
function showOrderProducts(data) {

    document.getElementById('orderHistoryItemContainer').innerHTML = '';

    let divSingle = document.createElement('div');
    let h1 = document.createElement('h2');
    h1.style.margin = '0.5em 0 1.5em 0'
    h1.style.fontSize = 'unset'
    h1.innerHTML = `<i class="fa-duotone fa-cart-circle-check" style="margin-right:0.5em;"></i> Order # ${data.orderId} placed on ${data.orderDate}`

    divSingle.appendChild(h1);

    let row = document.createElement('div')
    let products = document.createElement('div');
    let total = document.createElement('div');
    total.setAttribute('class', 'totalOrderPrice')
    total.innerHTML = `$${data.totalPrice}`

    let column1, column2, productImage, cancelBtn, productName
    column1 = document.createElement('div')
    column2 = document.createElement('div')
    cancelBtn = document.createElement('div');
    for (r of data.products) {

        fetchEndpoint(r.endpoint)
            .then((result) => {


                productImage = document.createElement('div');


                productName = document.createElement('h3');
                productName.style.borderBottom = "1px dotted #fff";
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
                productImage.style.padding = '3.5em';
                productImage.style.border = `5px #ffffff solid`
                column1.appendChild(productImage);

                cancelBtn.setAttribute('class', 'xButton');
                cancelBtn.style.display = 'inline-block'
                cancelBtn.style.marginTop = '1em'
                cancelBtn.innerHTML = `Cancel Order`;
                cancelBtn.style.float = 'right';
                cancelBtn.addEventListener('click', function() {


                    cancelOrder(data.orderId)

                })



            });

    }
    column2.appendChild(cancelBtn);
    divSingle.appendChild(row)
    divSingle.appendChild(products);
    divSingle.appendChild(total);
    document.getElementById('orderHistoryItemContainer').appendChild(divSingle);

    document.getElementById('orderContainer').style.display = 'none'
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';;
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderHistoryItemContainer').style.display = 'inline-block';
    document.getElementById('editAccountContainer').style.display = 'none';
}