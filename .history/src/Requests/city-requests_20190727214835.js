import { showError } from '../Actions/user-actions'

const API = 'https://landmark-backend.appspot.com/'
 'http://localhost:3001/api/';

export function getPopulation(range, lat, lng, callback) {
    fetch(API + 'demo/population/' + range + '/' + lat +'/'+ lng )
        .then(response => response.json())
        .then(data =>  callback(data))
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}

export function getSocial(range, lat, lng, callback) {
    fetch(API + 'demo/social/' + range + '/' + lat +'/'+ lng)
        .then(response => response.json())
        .then(data =>  callback(data))
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}

export function getAge(range, lat, lng, callback) {
    fetch(API + 'demo/age/' + range + '/' + lat +'/'+ lng)
        .then(response => response.json())
        .then(data =>  callback(data))
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}

export function getIncome(range, lat, lng, callback) {
    fetch(API + 'demo/income/' + range + '/' + lat +'/'+ lng)
        .then(response => response.json())
        .then(data =>  callback(data))
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}

export function getTract(lat, lng, callback) {
    fetch(API + 'demo/tract/' + lat +'/'+ lng)
        .then(response => response.json())
        .then(data =>  callback(data))
        .catch(error =>  { 
            showError()
            console.error('Error:', error)
        })
}

