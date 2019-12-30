import { getDistance } from '../Requests/directions-requests' 
import { getSubwayTotals } from '../Requests/subway-requests'

export const getDistancesFromMap = async (placeMap, origin) => {
    return new Promise(async (resolve, reject) => {
        let method = 'WALKING'
        let subways = new Map()
        for (let [pid, place] of placeMap) {
            let destination = place.geometry.location
            let res = await getDistance(origin, destination, method)
            if (res.rows[0].elements[0].duration.value <= 630) { // 630 sec, 10.5 min
                subways.set(pid, {directions: res.rows[0].elements[0], place: place})
            }
        }
        let coords = []
        let places = []
        console.log(subways)
        for (let e of subways) {
            console.log(e)
            coords.push(e.place.geometry.location)
        //    places.push(e.place)
        }
        console.log('SUBWAYS', subways)
        let results = await getSubwayTotals(coords)
        for (let e of results) {
            let destination = {lat: e.G_LAT, lng: e.G_LNG}
            let dir = await getDistance(origin, destination, method)
            e.directions = dir.rows[0].elements[0].duration.value
         //   e.place = places[i]
        }
        resolve(results)
    })
}
