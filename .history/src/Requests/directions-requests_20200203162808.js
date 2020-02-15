import { google } from '../Constants.js'

export const getDistance = (origin, destination, method) => {
    return new Promise((resolve, reject) => {
        let g_origin = new google.maps.LatLng(origin.lat, origin.lng);
        let g_destination = new google.maps.LatLng(destination.lat, destination.lng);
        let service = new google.maps.DistanceMatrixService();

        console.log('123', g_origin, g_destination, service)
        service.getDistanceMatrix(
        {
            origins: [g_origin],
            destinations: [g_destination],
            travelMode: method,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, (results, status) => {
            if (status != 'OK') {
                reject('error', status)
            } else {
                resolve(results)
            }
        });
    })
}

