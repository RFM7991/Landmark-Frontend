import { showError } from '../Actions/user-actions'
import { API } from '../Constants'


export async function registerUser(data) {

    var formBody = {
        'first': data.first.value,
        'last': data.last.value,
        'username': data.username.value.toLowerCase(),
        'email': data.email.value.toLowerCase(),
        'password': data.password.value
    };
    
    return fetch(API + 'users/register',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(formBody)
    })
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Register User Error:', error)
        })
}


export async function loginUser(email, password) {

    var formBody = {
        'email': email.toLowerCase(),
        'password': password
    };
    
    return fetch(API + 'users/login',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(formBody)
    })
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Register User Error:', error)
        })
}

export async function pushRecentSearch(uid, location) {

    var formBody = {
        'uid': uid,
        'location': location
    };
    
    return fetch(API + 'users/login',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(formBody)
    })
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Register User Error:', error)
        })
}

