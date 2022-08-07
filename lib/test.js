async function getOrderJsonTest() {

    let resp = await fetch('http://p2terminusoms-env.eba-fcyktpid.us-east-1.elasticbeanstalk.com/order/187');
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