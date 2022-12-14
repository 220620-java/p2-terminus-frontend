/*
Team Terminus

*/

getLoggedInCustomer();

// PROPERTIES AND VARIABLES
let date = new Date().toLocaleDateString();

/**
 * CREATE ORDER FUNCTION
 *
 */
async function createOrder() {
    let price;
    let sum = 0;
    for (let item of cart) {
        if (!item.id) {} else {
            price = item.price;
            sum += parseInt(price);

            console.log(sum)
        }

    }
    let customer = {
        customerId: loggedInCustomer.id,
        orderDate: date,
        /**
        @TODO ADD UP PRODUCT PRICES
        */
        totalPrice: sum
    }

    let products = []

    let resp = await fetch(apiUrl + '/order', {
        method: 'POST',
        // Add the customer id of the logged in Customer to the post params

        body: JSON.stringify(customer),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    // 201 will return a repsonse after a post in this the case its the order id
    if (resp.status === 201) {
        orderReturn = await resp.json();
        if (orderReturn) {
            for (let product of cart) {

                let orderId = orderReturn.orderId;
                let endpoint = `https://fakestoreapi.com/products/${product.id}`
                products.push({
                    orderId,
                    endpoint
                })

            }

            for (let item of products) {
                let json = JSON.stringify(item);
                console.log(json)
                saveProducts(json)
            }

            cart = [];
            showOrders();
            message('success', 'Your order has been placed!')
        }
    } else {
        message('error', `Sorry we couldn't place your order!`)
    }

}

/**
 * SAVE PRODUCTS TO ORDER (COMPLETE ORDER)
 *
 * @param {*} json 
 */
async function saveProducts(json) {
    if (loggedInCustomer) {
        let resp = await fetch(apiUrl + '/product/', {
            method: 'POST',
            body: json,
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });

        if (resp.ok) {

        }
    }
}
