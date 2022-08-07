/**
    Team Terminus

*/
getLoggedInCustomer();

let editAccountContainer = document.getElementById('editAccountContainer');


async function fetchAccountInfo() {

    let resp = await fetch(apiUrl + '/customer/' + loggedInCustomer.id);
    let data = await resp.json();
    console.log(data)
    accountForm(data)
}

function accountForm(data) {
    console.log(data)
    for (let r of data) {
        let h1 = document.createElement('h1');
        h1.innerHTML = `Edit Account Information`

        let formDiv = document.createElement('div')
        formDiv.setAttribute('class', 'formDiv2')

        let msgDiv = document.createElement('div')
        msgDiv.setAttribute('class', 'msg')

        let fnameInp = document.createElement('input')
        fnameInp.setAttribute("id", "fname"),
            fnameInp.setAttribute("type", "text"),
            fnameInp.value = r.firstname;

        let lnameInp = document.createElement('input')
        lnameInp.setAttribute("id", "lname")
        lnameInp.setAttribute("type", "text")
        lnameInp.value = r.lastname;

    }
    formDiv.appendChild(msgDiv)
    formDiv.appendChild(h1)
    formDiv.appendChild(fnameInp)
    formDiv.appendChild(lnameInp)

    editAccountContainer.style.display = 'inline-block'

}