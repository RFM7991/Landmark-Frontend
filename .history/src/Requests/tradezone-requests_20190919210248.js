import { API } from '../Constants'

export function getTradeZoneBounds(isCity, center) {
    let lat = center.lat
    let lng = center.lng
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

export function getTradeZoneStats(lat, lng, type) {
    let url = API + 'tradezone/stats/' + type + '/' + lat + '/' + lng 

    return fetch(url,
    {
        method: 'GET',
        credentials: "same-origin", //include, same-origin
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .catch(error => console.error('TZ error', error))
}