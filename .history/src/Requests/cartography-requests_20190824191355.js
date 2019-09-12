import { showError } from '../Actions/user-actions'
import { API } from '../Constants'

export function getZipCartography(state, zip) {
    return fetch(API +'cartography/zip/' + state +'/'+ zip)
        .then(response => response.json())
        .catch(error =>  { 
            showError()
            console.error('Zip Cartography Error:',API +'cartography/zip/' + state +'/'+ zip,  error)
        })
}

export function getTradeZoneCartography(state, lat, lng, tract) {
    return fetch(API + 'cartography/tradezone/' + state + '/' +  lat + '/' + lng)
        .then(response => response.json())
        .catch(error => {
            showError()
            console.error('Trade Zone Cartography Error:', API + 'zcartography/tradezone/' + state +'/' + lat + '/' + lng, error)
        })
}

export function getTractCartography(state, tract) {
    return fetch(API +'cartography/tract/' + state +'/'+ tract)
        .then(response => response.json())
        .catch(error =>  { 
            showError()
            console.error('Tract Cartograhpy Error:', error)
        })
}

export function getCartographicGeoJson() {
    return fetch (API + 'citysdk')
}

