import { showError } from '../Actions/user-actions'

const API = //'https://landmark-backend.appspot.com/api/'
'http://localhost:8080/api/';

export function getZipBounds(state, zip) {
    return fetch(API +'cartography/zip/' + state +'/'+ zip)
        .then(response => response.json())
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}

export function getTractBounds(state, tract, callback) {
    fetch(API +'cartography/tract/' + state +'/'+ tract)
        .then(response => response.json())
        .then(data =>  callback(data))
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}