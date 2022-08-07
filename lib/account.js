/**
    Team Terminus

*/
getLoggedInCustomer();

let editAccountContainer = document.getElementById('editAccountContainer');


async function fetchAccountInfo() {

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let data = await resp.json();

    accountForm(data)
}

function accountForm(data) {

    let h1 = document.createElement('h1');
    h1.innerHTML = `Edit Account Information`

    let formDiv = document.createElement('div')
    formDiv
        .setAttribute('class', 'formDiv2')

    let msgDiv = document.createElement('div')
    msgDiv
        .setAttribute('class', 'msg')

    let fnameInp = document.createElement('input')
    fnameInp
        .setAttribute("id", "fname")
        .setAttribute("type", "text")
        .value = data.firstname;

    let lnameInp = document.createElement('input')
    lnameInp
        .setAttribute("id", "lname")
        .setAttribute("type", "text")
        .value = data.lastname;

    formDiv
        .appendChild(msgDiv)
        .appendChild(h1)
        .appendChild(fnameInp)
        .appendChild(lnameInp)

    editAccountContainer.style.display = 'inline-block'

}