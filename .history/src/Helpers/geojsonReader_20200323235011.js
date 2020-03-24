import { getTradeZoneCartography} from "../Requests/cartography-requests" 

// block groups
export const getBlockGroups = async  (tzBounds, state) => {
    let bounds = tzBounds
    let results = []

    // get correct state
    const data = await getTradeZoneCartography(state, 'block')
    console.log('GEO_DATA', data, bounds)
    for (let i=0; i < data.length; i++) {

        // check if matching bounds 
        for (let j = 0; j < bounds.length; j++) {

          //  console.log('TEST', data.features[i].properties.COUNTYFP == bounds[j][0].county,  data.features[i].properties.COUNTYFP, bounds[j][0].county)

            // county
            if (data[i].properties.COUNTYFP != bounds[j][0].county) {
                continue;
            }
           
            // tract
            if (data[i].properties.TRACTCE != bounds[j][0].tract) {
                continue;
            }

            // Block
            if (data[i].properties.BLKGRPCE != bounds[j][0]['block-group']) {
                continue;
            }
            console.log('MATCH', data[i].properties, bounds[j][0])
            results.push(data[i])
        } 
    }
    console.log('RESULTS', results)

    return results;
}

// tracts
export const getTracts = (tzBounds, state) => {
    let bounds = tzBounds
    let results = []

    // get correct state
    const data = require('../geojson/tracts/tract-'+state.toLowerCase()+'.json')
    console.log('GET_ZIP_GEO_DATA', data, bounds)
    for (let i=0; i < data.features.length; i++) {

        // check if matching bounds 
        for (let j = 0; j < bounds.length; j++) {

            // county
            if (data.features[i].properties.COUNTYFP != bounds[j][0].county) {
                continue;
            }
           
            // tract
            if (data.features[i].properties.TRACTCE != bounds[j][0].tract) {
                continue;
            }

            console.log('MATCH', data.features[i].properties, bounds[j][0])
            results.push(data.features[i])
        } 
    }
    console.log('RESULTS', results)

    return results;
}

// zip codes
export const getZipCodes = (tzBounds, state) => {
    let bounds = tzBounds
    let results = []

    // get correct state
    const data = require('../geojson/zip/zip-'+state.toLowerCase()+'.json')
    console.log('GET_ZIP_GEO_DATA', data, bounds)
    for (let i=0; i < data.features.length; i++) {

        // check if matching bounds 
        for (let j = 0; j < bounds.length; j++) {

            // Block
            if (data.features[i].properties.ZCTA5CE10 != bounds[j][0]['zip-code-tabulation-area']) {
                continue;
            }
            console.log('MATCH', data.features[i].properties, bounds[j][0])
            results.push(data.features[i])
        } 
    }
    console.log('RESULTS', results)

    return results;
}

// zip codes
export const getDefaultZip = (zip, state) => {
    let results = []

    // get correct state
    const data = require('../geojson/zip/zip-'+state.toLowerCase()+'.json')
    for (let i=0; i < data.features.length; i++) {
        // Block
        if (data.features[i].properties.ZCTA5CE10 != zip) {
            continue;
        }
        results.push(data.features[i])

    }
    console.log('RESULTS', results)

    return results;
}