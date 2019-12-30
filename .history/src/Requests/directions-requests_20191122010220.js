import { google } from '../Constants.js'
import { allResolved } from 'q';
import { resolve } from 'dns';

export const getDistance = (origin, destination, method) => {
    return new Promise((resolve, reject) => {
        let service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: method,
            units: 'imperial',
        }, (results, status) => {
            console.log('Results', results)
            resolve(results)
            console.log('status', status)
        });
    })
}

