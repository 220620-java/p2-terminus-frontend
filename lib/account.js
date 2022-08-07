/**
    Team Terminus

*/
getLoggedInCustomer();

let editAccountContainer = document.getElementById('editAccountContainer');


async function fetchAccountInfo() {

    editAccountContainer.innerHTML = '';

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let data = await resp.json();

    accountForm(data)
}

function accountForm(data) {

    console.log(data)
    console.log(data.firstname)

    let h1 = document.createElement('h1');
    h1.style.marginTop = '1.5em'
    h1.innerHTML = `<i class="fa-duotone fa-file-user"></i> Edit Account Information`

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

    let button = document.createElement('div')
    button.addEventListener('click', function() {
        alert(`${fnameInp.value} ${lnameInp.value} ${emailInp.value}`)
    })


    formDiv.appendChild(msgDiv)
    formDiv.appendChild(fnameInp)
    formDiv.appendChild(lnameInp)
    formDiv.appendChild(emailInp)

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