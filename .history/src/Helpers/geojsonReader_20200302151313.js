import data from '../geojson/block-group.json'

export const getBlockGroups = (tzBounds) => {
    let bounds = tzBounds

    for (let i=0; i < data.features.length; i++) {

        // check if matching bounds 
        for (let j = 0; j < bounds.length; j++) {

          //  console.log('TEST', data.features[i].properties.COUNTYFP == bounds[j][0].county,  data.features[i].properties.COUNTYFP, bounds[j][0].county)

            // county
            if (data.features[i].properties.COUNTYFP != bounds[j][0].county) {
                continue;
            }
            console.log('MATCH', data.features[i].properties, bounds[j][0])
           
        } 
    }
}