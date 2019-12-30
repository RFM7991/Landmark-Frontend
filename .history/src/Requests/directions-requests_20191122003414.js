import { google } from '../Constants.js'
import { allResolved } from 'q';
import { resolve } from 'dns';

export const getDistance = (originPoint, destinationPoint, method) => {
    return new Promise((result, reject) => {
        let origin = new google.maps.LatLng(origin.lat, origin.lng);
        let destination = new google.maps.LatLng(destination.lat, destination.lng);
        let service = new google.maps.DistanceMatrixService();
        origin = new google.maps.LatLng(55.930385, -3.118425);
        destination = new google.maps.LatLng(50.087692, 14.421150);
    
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

export const getDistancesFromMap = (placeMap, method) => {
    return new Promise((result, reject) => {
        let origin = new google.maps.LatLng(origin.lat, origin.lng);
        let destination = new google.maps.LatLng(destination.lat, destination.lng);
        let service = new google.maps.DistanceMatrixService();
        origin = new google.maps.LatLng(55.930385, -3.118425);
        destination = new google.maps.LatLng(50.087692, 14.421150);
    
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