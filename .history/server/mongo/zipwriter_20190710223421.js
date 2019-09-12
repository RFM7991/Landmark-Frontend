
const methods = {

    test : () => {
        var data = getStateBounds('NJ')
        var boundary;
        for(var i = 0; i < data.features.length; i++) {
            var obj = data.features[i].properties.ZCTA5CE10;
            console.log(obj)
    } 
    }
}

function getStateBounds(state) {
    var data = require('../map-data/'+ state.toLowerCase() +'_zipcodes.json'); 
    return data
}

module.exports = methods