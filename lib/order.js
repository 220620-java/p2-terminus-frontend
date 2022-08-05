getLoggedInCustomer();


async function createOrder() {

    let customer = {
        customerId: loggedInCustomer.id,
        orderDate: 'date here',
        totalPrice: 'price here'
    }

    let resp = await fetch(apiUrl + '/order', {
        method: 'POST',
        // Add the customer id of the logged in Customer to the post params

        body: JSON.stringify(customer),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    if (resp.status === 201) {
        // The backend sends back the order object with the generated order id which we want
        orderReturn = await resp.json();
        if (orderReturn) {
            // ORDER ID !!
            // call saveOrder
            alert('Order Id: ' + orderReturn.orderId);
            //saveProducts(orderId);
            console.log(JSON.stringify(Object.assign({}, orderId, cart)))
        }
    } else {
        alert('Something went wrong!');
        //msgSpan.innerText = 'Something went wrong!';
    }

    // console.log('Name: ' + product.name);
    // console.log('Endpoint: https://fakestoreapi.com/products/' + product.id);
    // console.log('Price: $' + product.price);


}

async function saveProducts(orderId) {
    if (loggedInCustomer) {


        let resp = await fetch(apiUrl + '/product/', {
            method: 'POST',
            body: JSON.stringify(Object.assign({}, orderId, cart)),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Auth': sessionStorage.getItem('terminus-tkn')
            })
        });

        if (resp.ok) {
            loggedInCustomer = await resp.json();
        }

    }
}

async function getOrder(orderId) {
    let resp = await fetch(apiUrl + '/order/' + orderId);
    if (resp.ok) {
        return await resp.json();
    }
}