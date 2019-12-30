import { getDistance } from '../Requests/directions-requests' 
import { getSubwayTotals } from '../Requests/subway-requests'

export const getDistancesFromMap = async (placeMap, origin) => {
    return new Promise(async (resolve, reject) => {
        let method = 'WALKING'
        let subways = new Map()
        for (let [pid, place] of placeMap) {
            let destination = place.geometry.location
            let res = await getDistance(origin, destination, method)
      //      if (res.rows[0].elements[0].duration.value <= 630) { // 630 sec, 10.5 min
            console.log(place.name, res.rows[0].elements[0])
                subways.set(pid, {directions: res.rows[0].elements[0], place: place})
      //      }
        }
        let coords = []
        let directions = []
        let places = []
        subways.forEach(e => {
            coords.push(e.place.geometry.location)
            directions.push(e.directions)
            places.push(e.place)
        })
        console.log('SUBWAYS', subways)
        let results = await getSubwayTotals(coords)
        results.forEach((e, i) => {
            e.directions = directions[i]
            e.place = places[i]
        })
        resolve(results)
    })
}
