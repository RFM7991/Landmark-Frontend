import { getDistance } from '../Requests/directions-requests' 
import { google } from '../Constants'
import {parseCSV} from './csv'
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

        console.log('RES', subways)
        let names = []
        subways.forEach(e => names.push(e.place.name))
        console.log('NAMES', names)
        resolve(await getSubwayTotals(names))
    })
}

// test sqlite on frontend
const queryTable = (places) => {
    parseCSV('../csvs/turnstile_data.csv')
}