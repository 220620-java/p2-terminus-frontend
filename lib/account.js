/**
    Team Terminus

    @author
        -Tony Wiedman
*/
getLoggedInCustomer();

let editAccountContainer = document.getElementById('editAccountContainer');


async function fetchAccountInfo() {

    editAccountContainer.innerHTML = '';

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let data = await resp.json();

    accountForm(data)
}

async function putAccountInfo(fnameInp, lnameInp, emailInp, msgDiv) {

    let customer = { firstname: fnameInp, lastname: lnameInp, email: emailInp };
    console.log(customer)

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id, {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Auth': sessionStorage.getItem('terminus-tkn')
        })
    });

    if (resp.ok) {
        message('success', `Your account information has been saved`);
    } else {
        message('alert', `Cannot update your account information (Code: ${resp.status})`);
    }

}

function accountForm(data) {

    let h1 = document.createElement('h1');
    h1.style.marginTop = '1.5em'
    h1.innerHTML = `<i class="fa-duotone fa-file-user" style="margin-right:0.5em;"></i> Account Info`

    let formDiv = document.createElement('div')
    formDiv.setAttribute('class', 'formDiv2')

    let msgDiv = document.createElement('div')
    msgDiv.setAttribute('class', 'msg')

    let fnameInp = document.createElement('input')
    fnameInp.setAttribute("id", "fname")
    fnameInp.setAttribute("class", "edit");
    fnameInp.setAttribute("type", "text")
    fnameInp.value = data.firstname;

    let lnameInp = document.createElement('input')
    lnameInp.setAttribute("id", "lname")
    lnameInp.setAttribute("class", "edit");
    lnameInp.setAttribute("type", "text")
    lnameInp.value = data.lastname;

    let emailInp = document.createElement('input')
    emailInp.setAttribute("id", "email")
    emailInp.setAttribute("class", "edit");
    emailInp.setAttribute("type", "text")
    emailInp.value = data.email;

    let button = document.createElement('button')
    button.style.fontSize = 'unset'
    button.style.marginTop = '1em'
    button.innerText = 'Update Account'
    button.addEventListener('click', function() {

        console.log(fnameInp.value, lnameInp.value, emailInp.value)

        putAccountInfo(fnameInp.value, lnameInp.value, emailInp.value, msgDiv)

    })

    //return x; 
    let closeButton = document.createElement('button')
    closeButton.setAttribute('class', 'closeBtn')
    closeButton.style.fontSize = 'unset'
    closeButton.style.marginTop = '1em'
    closeButton.innerText = 'Close Account'
    closeButton.addEventListener('click', function() {

        console.log(fnameInp.value, lnameInp.value, emailInp.value)

        confirmClose(loggedInCustomer.id)

    })

    formDiv.appendChild(msgDiv)
    formDiv.appendChild(fnameInp)
    formDiv.appendChild(lnameInp)
    formDiv.appendChild(emailInp)
    formDiv.appendChild(button)
    formDiv.appendChild(closeButton)

    editAccountContainer.appendChild(h1)
    editAccountContainer.appendChild(formDiv)

    // HIDE/SHOW CONTAINERS
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById('cartContainer').style.display = 'none';
    document.getElementById('orderContainer').style.display = 'none';
    document.getElementById('orderHistoryItemContainer').style.display = 'none';
    document.getElementById('editAccountContainer').style.display = 'inline-block';

}



function confirmClose(id) {
    let text = "Are you sure you want to cancel your order?";
    if (confirm(text) == true) {
        closeAccount(id)
    } else {
        text = "You canceled!";
    }
}

async function closeAccount(id) {
    let resp = await fetch(apiUrl + '/customer/' + id, {
        method: 'DELETE',
    });

    if (resp.ok) {
        logOut();
    }

}