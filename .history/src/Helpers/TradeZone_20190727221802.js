
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
        let lat = Math.asin(Math.sin(lat1) * Math.cos(d/R)
                + Math.cos(lat1) * Math.sin(d/R) * Math.cos(brng))
        let lng = lng1 + Math.atan2(Math.sin(brng) * Math.sin(d/R)*Math.acos(lat1),
                        Math.cos(d/R) - Math.sin(lat1) * Math.sin(lat))
        let coords = {}
        coords.lat = lat
        coords.lng = lng
        points.push(coords)
    }
    return points
}