import { API } from '../Constants'

export async function createListing(data) {

    return fetch(API + 'listings/create',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Create listing error:', error)
        })
}