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
                mixed : r.B01001G_001E,
                other : r.B01001F_001E
            },

            marital_status : {
                married: B12001_001E,
                never_married: B12001_003E,
                divorced: B12001_010E,
                widowed: B12001_009E,
                median_age_marriage_male: B12007_001E,
                median_age_marriage_female: B12007_002E
            },

            income : {
                MEDIAN: r.B19013_001E,
                _0_9999 : r.B19001_002E,
                _10000_14999 : r.B19001_003E,
                _15000_19999 : r.B19001_004E,
                _20000_24999: r.B19001_005E,
                _25000_29999: r.B19001_006E,
                _30000_34999: r.B19001_007E,
                _35000_39999: r.B19001_008E,
                _40000_44999: r.B19001_009E, 
                _45000_49999: r.B19001_010E,
                _50000_59999: r.B19001_011E,
                _60000_74999: r.B19001_012E,
                _75000_99999: r.B19001_013E,
                _100000_124999: r.B19001_014E,
                _125000_149999: r.B19001_015E,
                _150000_199999: r.B19001_016E,
                _200000_MORE: r.B19001_017E
            }


        }
        console.log(response)
    }
}

module.exports = methods