import { showError } from '../Actions/user-actions'
import { API } from '../Constants'


export async function createLocation(pid, location) {

    var formBody = {
        'pid': pid,
        'location': location
    };
    
    return fetch(API + 'locations/create',
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


export async function getLocation(pid) {
    
    return fetch(API + 'locations/' + pid,
    {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Register User Error:', error)
        })
}

