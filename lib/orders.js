/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/

getLoggedInCustomer();


function showOrders() {
    let orders = loggedInCustomer.orders;
    let ordersDiv = document.getElementById('orderContainer');

    ordersDiv.innerHTML = '';

    for (let order of orders) {
        // create a div for each order
        let div = document.createElement('div');
        div.setAttribute("class", "orderItem");

        let orderProducts = orderProductString(order.products);
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



function orderProductString(products) {
    if (products.length > 0) {
        let productsString = '<ul>';
        for (let product of products) {
            productsString += `<li>${product.name}</li><li>${product.price}</li>`;
        }
        return productsString + '</ul>';
    } else {
        return 'none';
    }
}