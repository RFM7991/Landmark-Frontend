import { getDistance } from '../Requests/directions-requests' 
import { getSubwayTotals } from '../Requests/subway-requests'

export const getDistancesFromMap = async (placeMap, origin) => {
    return new Promise(async (resolve, reject) => {
        let method = 'WALKING'
        let subways = new Map()
        let count = 0;
        for (let [pid, place] of placeMap) {
            if (count < 10) {
                let destination = place.geometry.location
                let res = await getDistance(origin, destination, method)
                if (res.rows[0].elements[0].duration.value <= 630) { // 630 sec, 10.5 min
                    subways.set(pid, {directions: res.rows[0].elements[0], place: place})
            }
            } else {
                break;
            }
            count++
        }
        let names = []
        subways.forEach(e => names.push(e.place.name))
        resolve(await getSubwayTotals(names))
    })
}
