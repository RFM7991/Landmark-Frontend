import data from '../geojson/block-group.json'

export const getBlockGroups = (bounds) => {


    for (let i=0; i < bounds.length; i++) {
        console.log('FEATURE_SET', bounds[i])
    }
}