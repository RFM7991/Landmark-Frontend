import data from '../geojson/block-group.json'

export const getBlockGroups = (bounds) => {


    for (let i=0; i < data.length; i++) {
        console.log('FEATURE_SET', data[i])
    }
}