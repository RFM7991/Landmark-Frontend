import { showError } from '../Actions/user-actions'
import { API } from '../Constants'


export async function registerUser(data) {

    var formBody = {
        'first': data.first,
        'last': data.last,
        'username': data.username,
        'email': data.email,
        'password': data.password
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


