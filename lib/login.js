/**
Team Terminus

@authors
    - Noah Cavazos
    - Tony Wiedman
*/
document.querySelectorAll('.cred').addEventListener('keydown', event => {
    if (event.key === "Enter") {
        login();
    }
})


/**
 * LOGIN - POST TO /AUTH ENDPOINT ON THE BACKEND TO AUTHENTICATE CREDS
 */
async function login() {
    let msgSpan = document.getElementById('msg');
    msgSpan.innerText = '';

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (!username | !password) {
        msgSpan.innerText = 'Username and password fields are required';
        return;
    }

    let credentials = { username: username, password: password };

    let resp = await fetch(apiUrl + '/auth', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    if (resp.status === 200) {
        loggedInCustomer = await resp.json();
        if (loggedInCustomer) {
            sessionStorage.setItem('terminus-tkn', resp.headers.get('Auth'));
            sessionStorage.setItem('terminus-id', loggedInCustomer.id);
            window.location.href = './index.html';

        }
    } else {
        msgSpan.innerText = 'Incorrect credentials. Please try again.';
    }

}