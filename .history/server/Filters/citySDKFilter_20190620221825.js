const vars = require('../Variables')

const methods = {

    filterPopulation(data) {
        const r = data[0]
        const response = {

            city: r.NAME,
            median_age: r.B01002_001E,
            gender : {
                males : r.B01002_002E,
                females : r.B01002_003E
            },
            
            race : {
                white : r.B01001A_001E,
                african_american : r.B01001B_001E,
                

            }
        }
       
        console.log(response)
    }
}

module.exports = methods