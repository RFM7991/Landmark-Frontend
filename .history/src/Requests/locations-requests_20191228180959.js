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
            console.error('Create location error:', error)
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
            console.error('Location fetch Error:', error)
        })
}

export async function getComments(pid) {
    
    return fetch(API + 'locations/comments/' + pid,
    {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Comments Fetch Error:', error)
        })
}

