
// get lat/lng of 5 points in a circle around specified center where radius = distance
export function getPoints(center, distance) {
    let lat1 = center.lat
    let lng2 = center.lng 
    let d = distance
    let R = 6371 // radius of earth in KM

    for (let i = 0; i < 5; i++) {
        let brng = i * 72
        let lat = Math.asin(Math.sin(lat1) * Math.cos(d/))
    }
}