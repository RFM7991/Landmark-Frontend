const vars = require('../Variables')

const methods = {

    filterPopulation(data) {
        const r = data[0]
        const response = {

            city: r.NAME,
            population : r.B01003_001E,
            median_age: r.B01002_001E,
            gender : {
                males : r.B01002_002E,
                females : r.B01002_003E
            },
            
            race : {
                white : r.B01001A_001E,
                african_american : r.B01001B_001E,
                asian : r.B01001D_001E,
                hispanic_or_latin : r.B01001I_001E,
                native_american : r.B01001C_001E,
                pacific_islander : r.B01001E_001E,
                other : r.B01001F_001E
            },

            
        }
        console.log(response)
    }
}

module.exports = methods