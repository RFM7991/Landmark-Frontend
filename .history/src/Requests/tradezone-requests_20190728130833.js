const API = // 'https://landmark-backend.appspot.com/api/'
'http://localhost:8080/api/';

export function getTradeZoneCartography(state, center, isCity, callback) {
    let lat = center.lat
    let lng = center.lng
    fetch(API + '/tradezone/cartography' + state + '/'
    + lat + '/'
    + lng + '/'
    + isCity
    )
    .then(response => response.json())
    .then(data =>  data);
}