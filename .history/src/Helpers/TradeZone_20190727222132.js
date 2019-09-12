
// get lat/lng of 5 points in a circle around specified center where radius = distance
// https://www.movable-type.co.uk/scripts/latlong.html
export function getPoints(center, distance) {
    let lat1 = center.lat
    let lng1 = center.lng 
    let d = distance
    let R = 6371 // radius of earth in KM
    let points = []
    for (let i = 0; i < 5; i++) {
        let brng = i * 72
        let φ2 = Math.asin( Math.sin(φ1)*Math.cos(d/R) +
            Math.cos(φ1)*Math.sin(d/R)*Math.cos(brng) );
        let λ2 = λ1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(φ1),
            Math.cos(d/R)-Math.sin(φ1)*Math.sin(φ2));
        let coords = {}
        coords.lat = lat
        coords.lng = lng
        points.push(coords)
    }
    return points
}