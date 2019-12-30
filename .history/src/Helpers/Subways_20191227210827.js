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
        for (let e of subways) {
            console.log(e[1])
            coords.push(e[1].place.geometry.location)
        //    places.push(e.place)
        }
        console.log('SUBWAYS', subways)
        let results = await getSubwayTotals(coords)
        for (let e of results) {
            console.log(e)
            let destination = {lat: Number(e.data.G_LAT), lng: Number(e.data.G_LNG)}
            
            let dir = await getDistance(origin, destination, method)
            console.log('directions', dir.rows[0].elements[0].duration.value)
            e.directions = dir.rows[0].elements[0].duration.value
         //   e.place = places[i]
        }
        resolve(results)
    })
}
