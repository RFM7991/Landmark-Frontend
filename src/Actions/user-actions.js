import $ from 'jquery';
import { distanceMatrix } from '@google/maps/lib/apis/distance-matrix';

export const UPDATE_USER = 'users:updateUser';
export const SHOW_ERROR = 'users:showError';
export const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho';
const GEO_CODE = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API = 'http://localhost:3001/api/';

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            user: 'ERROR!!'}
    }
}

export function apiRequest() {
    return dispatch => {
        $.ajax({
            url: 'http://google.com',
            success() {
                console.log('SUCCESS')
            },
            error() {
                console.log('ERROR')
                dispatch(showError())
            }
        });
    }
}
// to-do find out whether this is best done through express backen
export function getGeoCode(street, city, state, callback) {
    var f_street = street.replace(/ /g, '+')
    var f_city = city.replace(/ /g, '+')
    var f_state = state.replace(/ /g, '+')

    let f_address = f_street + ',' + '+'+f_city + ',' + '+'+f_state

    fetch(GEO_CODE + 'address=' + f_address +'&key=' + KEY)
        .then(response => response.json())
        .then(data =>  callback(data));
}

export function getNearby(address, search, type, distance, callBack) {
    console.log('get nearby')
    const lat = address.coords.lat
    const lng = address.coords.lng
    var token;

    fetch(API + 'places/' 
    + lat +'/'
    + lng + '/' 
    + search + '/'
    + type + '/'
    + distance,
    {
        method: 'GET',
        credentials: "same-origin", //include, same-origin
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
    .then(response => {
        token = response.headers.get('Pragma')
        return response.json()
    })
    .then(data => callBack(data, token))
    .catch(error => console.error('Error:', error))
}

export function getPages(token, callBack) {
    if (token != null) {
            fetch(API + 'places/' + token, {
                method: 'GET',
                credentials: "same-origin", //include, same-origin
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            })
            .then(response => {
                token = response.headers.get('Pragma')
                return response.json()
            })
            .then(data => callBack(data, token))
            .catch(error => console.error('Error:', error))
    }
}

function getAddressLine(add) {
    var address = add.street + ', ' + add.city + ', ' + add.state
    return address
}

