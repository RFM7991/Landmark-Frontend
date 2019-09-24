import { showError } from '../Actions/user-actions'
import { API } from '../Constants'

export function getZipStats(lat, lng, type) {
    return fetch(API + 'demo/stats/zip/' + lat + '/' + lng)
        .then(res => res.json())
        .catch(err => console.error(err))
}

export function getTradeZoneStats(lat, lng, isCity) {
    return fetch(API + 'demo/stats/tradezone/' + isCity + '/'  + lat + '/' + lng)
        .then(res => res.json())
        .catch(err => console.error(err))
}

export function getPopulation(lat, lng) {
    console.log(API + 'demo/population/city/' + lat + '/' + lng)
    return fetch(API + 'demo/population/city/' + lat + '/' + lng)
        .then(res => res.json())
        .catch(err => console.error(err))
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

