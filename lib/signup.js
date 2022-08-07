/**
Team Terminus

@authors
    - Noah Cavazos
    - Tony Wiedman
*/


/**
 * SIGN UP - POST TO /CUSTOMER END POINT ON THE BACKEND
 */
async function signup() {
    let msgSpan = document.getElementById('msg');
    msgSpan.innerText = '';

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (!username | !password | !email | !fname) {
        return;
    }

    let newCustomer = { firstname: fname, lastname: lname, email: email, username: username, password: password };

    let resp = await fetch(apiUrl + '/customer', {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    if (resp.status === 201) {
        loggedInCustomer = await resp.json();
        if (loggedInCustomer) {
            sessionStorage.setItem('terminus-tkn', resp.headers.get('Auth'));
            sessionStorage.setItem('terminus-id', loggedInCustomer.id);
            window.location.href = './index.html';
        }
    } else {
        msgSpan.innerText = 'Error in the sign up process, try again!';
    }
}