import { google } from '../Constants.js'
import { allResolved } from 'q';
import { resolve } from 'dns';

export const getDistance = (origin, destination, method) => {
    return new Promise((resolve, reject) => {
        let g_origin = new google.maps.LatLng(origin.lat, origin.lng);
        let g_destination = new google.maps.LatLng(destination.lat, destination.lng);
        let service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: method,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, (results, status) => {
            console.log('Results', results)
            resolve(results)
            console.log('status', status)
        });
    })
}

