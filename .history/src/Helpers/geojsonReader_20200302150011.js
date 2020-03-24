import data from '../geojson/block-group.json'

export const getBlockGroups = (tzBounds) => {
    let bounds = {...tzBounds}

    for (let i=0; i < 10; i++) {

        // check if matching bounds 
        for (let j = 0; j < bounds.length; j++) {
            console.log('TEST', data[j][0], data.features[i].properties)
            // county
            if (data.features[i].properties.COUTYFP == bounds[j][0].county) {
                console.log('MATCH', data[j][0], data.features[i].properties)
            }
        } 
    }
}