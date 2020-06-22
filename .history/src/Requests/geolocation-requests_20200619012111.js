import { showError } from '../Actions/user-actions'
import { API } from '../Constants'


export async function getZipCode(coordinates) {

    let formBody = {
        "coordinates" : coordinates 
    }
    
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
