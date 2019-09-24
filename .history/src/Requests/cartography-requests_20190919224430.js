import { showError } from '../Actions/user-actions'
import { API } from '../Constants'

export function getZipCartography(state, zip) {
    let URL = API +'cart/zip/' + state +'/'+ zip
    console.log(URL)
    return fetch(URL)
        .then(response => response.json())
        .catch(error =>  { 
            showError()
            console.error('Zip Cartography Error:',API +'cartography/zip/' + state +'/'+ zip,  error)
        })
}

export function getTradeZoneCartography(state, bounds) {

    var formBody = {
        'state': state,
        'center': {
            'lat': center.lat,
            'lng': center.lng
        },
        'bounds': bounds
    };
    
    return fetch(API + 'cart/tradezone/',
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
            console.error('Trade Zone Cartography Error:', error)
        })
}

export function getTractCartography(state, tract) {
    return fetch(API +'cart/tract/' + state +'/'+ tract)
        .then(response => response.json())
        .catch(error =>  { 
            showError()
            console.error('Tract Cartograhpy Error:', error)
        })
}


