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

export async function getListingById(listingId) {
    
    return fetch(API + 'listings/id/' + listingId,
    {
        method : 'GET',
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Get Listing errror:', error)
        })
}

export async function getListingByPlaceId(place_id) {

    let body = { "place_id" : place_id }
    return fetch(API + 'listings/place_id',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Get Listing errror:', error)
        })
}

export function getRecents() {
    return fetch(API + 'listings/recent',
        {
            method : 'GET',
        })
        .then(res => res.json())
        .catch(err => console.log("Recent Listings error", err))
}

export function getListings(start, limit) {
    let body = {
        "start" : start,
        "limit" : limit
    }

    return fetch(API + 'listings/get', 
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(err => console.log("Get Listings error", err))
}

export function getNearbyListings(zip, distance) {
    let body = {
        "zip" : String(zip),
        "limit" : Number(distance)
    }

    return fetch(API + 'listings/nearby', 
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(err => console.log("Get Nearby Listings error", err))
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