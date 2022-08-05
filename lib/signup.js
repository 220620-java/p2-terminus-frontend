/*
Team Terminus

@authors
    - Noah Cavazos
    - Tony Wiedman
*/
//signupBtn.addEventListener('click', signup);

async function signup() {
    //alert('Not yet implemented on the backend');
    let msgSpan = document.getElementById('msg');
    msgSpan.innerText = '';

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let credentials = { firstname: fname, lastname: lname, email: email, username: username, password: password };
    console.log('Endpoint:\n' + apiUrl + '/customer')
    console.log(`Method:\nPOST`);
    console.log(`Headers:\nContent-Type': 'application/json`)
    console.log('Body:\n' + JSON.stringify(credentials))

    let resp = await fetch(apiUrl + '/customer', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    if (resp.status === 201) {
        loggedInCustomer = await resp.json();
        if (loggedInCustomer) {
            sessionStorage.setItem('terminus-tkn', resp.headers.get('Auth'));
            sessionStorage.setItem('terminus-id', loggedInCustomer.id);
            main();
        }
    } else {
        msgSpan.innerText = 'Error in the sign up process, try again!';
    }
}