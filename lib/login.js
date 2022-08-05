/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/
//let loginBtn = document.getElementById('loginBtn');
//let logoutNav = document.getElementById('logoutNav');

//loginBtn.addEventListener('click', login);

async function login() {
    let msgSpan = document.getElementById('msg');
    msgSpan.innerText = '';

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

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
            alert('Welcome' + loggedInCustomer.firstname + ", ID:" + loggedInCustomer.id)
            window.location.href = './index.html';

        }
    } else {
        msgSpan.innerText = 'Incorrect credentials. Please try again.';
    }

}