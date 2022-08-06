/*
Team Terminus

@authors 
    - Tony Wiedman
    
    
    
*/

let apiUrl = 'http://p2terminusoms-env.eba-fcyktpid.us-east-1.elasticbeanstalk.com';
let loggedInCustomer;

//let loginNav = document.getElementById('loginNav');
//let logoutNav = document.getElementById('logoutNav');


// retrieve the currently logged in customer from the back end
async function getLoggedInCustomer() {
    let customerId = sessionStorage.getItem('terminus-id');
    if (customerId) {
        let resp = await fetch(apiUrl + '/customer/' + customerId, {
            headers: new Headers({
                'Auth': sessionStorage.getItem('terminus-tkn')
            })
        });

        if (resp.ok) {
            loggedInCustomer = await resp.json();
        }
    }

    if (loggedInCustomer) {
        showLoggedInDisplay();
    } else {
        showLoggedOutDisplay();
    }

}



function showLoggedInDisplay() {
    document.getElementById('accountNav').style.opacity = '1';


    document.getElementById("topLoginBtn").style.display = 'none';

    document.getElementById("topSignupBtn").style.display = 'none';



}

function showLoggedOutDisplay() {
    document.getElementById('accountNav').style.opacity = '0';

    document.getElementById("topLoginBtn").style.display = 'inline-block';
    document.getElementById("topSignupBtn").style.display = 'inline-block';

}

function logOut() {
    loggedInCustomer = null;
    sessionStorage.clear();
    showLoggedOutDisplay();
}