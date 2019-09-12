
export function getBoundaries(state, zip) {
    var data = require('../map-data/nj_zipcodes.json'); 
    var boundary;
    console.log('zip', this.props.zip)
    for(var i = 0; i < data.features.length; i++) {
        var obj = data.features[i].properties.ZCTA5CE10;
        if (obj == this.props.zip) {
          console.log(data.features[i]);
          boundary = data.features[i]
          break;
        }
    } 
}

function getState(state) {
    var data = require('../map-data/'+ state +'_zipcodes.json'); 
    return data
}