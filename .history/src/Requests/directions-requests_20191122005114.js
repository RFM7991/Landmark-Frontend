import { google } from '../Constants.js'
import { allResolved } from 'q';
import { resolve } from 'dns';

export const getDistance = (origin, destination, method) => {
    return new Promise((resolve, reject) => {
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: method
        }, (results, status) => {
            console.log('Results', results)
            resolve(results)
            console.log('status', status)
        });
    })
}

