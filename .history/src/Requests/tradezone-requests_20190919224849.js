import { API } from '../Constants'

export function getTradeZoneBounds(isCity, center) {
    let lat = center.lat
    let lng = center.lng
    console.log(API + 'bounds/tradezone/' + isCity + '/' + lat + '/' + lng)
    return fetch (API + 'bounds/tradezone/' + isCity + '/' + lat + '/' + lng,
    {
        method : 'GET',
        credentials: "same-origin", //include, same-origin
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => console.error('TZ error', error))
}

export function getTradeZoneCartography(state, center, isCity, callback) {
    console.log('LOADING TZ DATA')
    let lat = center.lat
    let lng = center.lng
    let url = API + 'tradezone/cartography/' + state.toLowerCase() + '/'
    + lat + '/'
    + lng + '/'
    + isCity
    fetch(url,
    {
        method: 'GET',
        credentials: "same-origin", //include, same-origin
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('TZ error', error))
}

export function getTradeZoneStats(state, bounds) {

    var formBody = {
        'state': state,
        'bounds': bounds
    };
    
    return fetch(API + 'stats/tradezone/',
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
            console.error('Trade Zone Stats Error:', error)
        })
}