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
            console.error('Create listing error:', error)
        })
}

export async function setListingPhotos(formData) {
    
    return fetch(API + 'listings/photos/add',
    {
        method : 'POST',
        body : formData
    })
        .then(response => response.json())
        .catch(error => {
            console.error('upload photos error:', error)
        })
}

/**
 *     locked = true 
    let data = undefined
    let error = undefined

    let didItWork = await fetch("https://www.hypeapi.info/video/upload",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
 */