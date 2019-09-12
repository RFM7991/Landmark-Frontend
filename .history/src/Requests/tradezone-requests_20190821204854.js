const API = // 'https://landmark-backend.appspot.com/api/'
'http://localhost:8080/api/';

export function getTradeZoneCartography(state, center, isCity, callback) {
    console.log('LOADING TZ DATA')
    let lat = center.lat
    let lng = center.lng
    let url = API + 'tradezone/cartography/' + state.toLowerCase() + '/'
    + lat + '/'
    + lng + '/'
    + isCity
    console.log(url)
    fetch(url
    )
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('TZ error', error))
}

export function getTradeZoneStats(center) {
    let lat = center.lat
    let lng = center.lng
    let url = API + 'tradezone/stats/' + lat + '/' + lng 

    return fetch(url)
    .then(res => res.json())
    .catch(error => console.error('TZ error', error))
}