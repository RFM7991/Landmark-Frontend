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

export function getTradeZoneCartography(state, center, bounds) {

    var details = {
        'state': state,
        'center': {
            'lat': center.lat,
            'lng': center.lng
        },
        'bounds': bounds
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    return fetch(API + 'cart/tradezone/',
    {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body : formBody
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


