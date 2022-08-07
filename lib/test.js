async function getOrderJsonTest() {

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let returnJSON = await resp.json();

    if (resp.ok) {
        return returnJSON.orders;
    }

}

//
getOrderJsonTest()
    .then((orders) => {
        orders
            .reverse()
            .forEach(order => {
                console.log(order);
            })
    });