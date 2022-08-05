getLoggedInCustomer();


let date = new Date().toLocaleDateString();


async function createOrder() {

    let customer = {
        customerId: loggedInCustomer.id,
        orderDate: date,
        totalPrice: 88.00
    }
    let products = [{}]
    console.log(JSON.stringify(customer))

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

            //saveProducts(orderId)
            for (let product of cart) {
                if (typeof product.id !== undefined) {
                    let orderId = orderReturn.orderId;
                    let endpoint = `https://fakestoreapi.com/products/${product.id}`
                    products.push({
                        orderId,
                        endpoint
                    })
                }
            }
            console.log(JSON.stringify(products).replace(/\[|\]/g, ''))
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
            //loggedInCustomer = await resp.json();
        }

    }
}

async function getOrder(orderId) {
    let resp = await fetch(apiUrl + '/order/' + orderId);
    if (resp.ok) {
        return await resp.json();
    }
}