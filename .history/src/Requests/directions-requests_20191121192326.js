
export const getDistance = (originPoint, destinationPoint, method) => {
    let origin = new google.maps.LatLng(origin.lat, origin.lng);
    let destination = new google.maps.LatLng(destination.lat, destination.lng);
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
        origins: [origin],
        destinations: [destination],
        travelMode: method
    }, (results, status) => {
        console.log('Results', results)
        console.log('status', status)
    });
}