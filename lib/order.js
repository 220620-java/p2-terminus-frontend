/*
Team Terminus

@authors 
    - Tony Wiedman
    
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
    for (let item of cart) {

        price = item.price;

        console.log(price)

    }
    let customer = {
        customerId: loggedInCustomer.id,
        orderDate: date,
        /**
        @TODO ADD UP PRODUCT PRICES
        */
        totalPrice: price
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

    if (resp.status === 201) {
        // The backend sends back the order object with the generated order id which we want
        orderReturn = await resp.json();
        if (orderReturn) {
            //alert('Order Id: ' + orderReturn.orderId);
            //saveProducts(orderId)
            for (let product of cart) {
                if (!product.id) {
                    //
                } else {
                    let orderId = orderReturn.orderId;
                    let endpoint = `https://fakestoreapi.com/products/${product.id}`
                    products.push({
                        orderId,
                        endpoint
                    })
                }
            }
            let productJSON = JSON.stringify(products).replace(/[\[\]']+/g, '');
            saveProducts(productJSON)

        }
    } else {
        alert('Something went wrong!');
    }

}


/**
 * SAVE PRODUCTS TO ORDER (COMPLETE ORDER)
 *
 * @param {*} orderId 
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
            console.log(`Products Save!`)
            cart = [];
        }
    }
}