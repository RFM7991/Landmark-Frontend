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
              //  native_american : r.B01001C_001E,
              //  pacific_islander : r.B01001E_001E,
                mixed : r.B01001G_001E,
                other : r.B01001F_001E
            },

            marital_status : {
                married: r.B12001_001E,
                never_married: r.B12001_003E,
                divorced: r.B12001_010E,
                widowed: r.B12001_009E
           //     median_age_marriage_male: r.B12007_001E,
             //   median_age_marriage_female: r.B12007_002E
            },

            income : {
                median: r.B19013_001E,
                below_poverty_line: r.B16009_002E,
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
                _200000_MORE: r.B19001_017E,
            },

            employment : {
                employed : r.B24011_001E,
                students : r.B14007_002E,
                work_from_home: r.B08006_017E
                
            },

            education : {
                less_than_high_school : r.B06009_002E,
                highschool_graduate : r.B06009_003E,
                some_college_or_associates : r.B06009_003E,
                bachelors : r.B06009_005E,
                graduate : r.B06009_006E
            },

            transportation : {
                drive : r.B08006_002E,
                public_transportation : r.B08006_008E,
                bicycle : r.B08006_014E,
                walk : r.B08006_015E,
                other : r.B08006_016E
            }
        }
        console.log(response)
        return (response)
    },

    filterAge(data) {
        const r = data[0]

        const response = {
            MEDIAN_AGE : r.B01002_001E,

            MALE_TOTAL : r.B01001_002E,
            MALE_ZERO_FIVE : r.B01001_003E, // <=5
            MALE_FIVE_NINE : r.B01001_004E, // 5-9
            MALE_TEN_FOURTEEN : r.B01001_005E, // 10-14
            MALE_FIFTEEN_SEVENTEEN : r.B01001_006E, // 15-17
            MALE_EIGHTEEN_NINETEEN : r.B01001_007E, // 18-19
            MALE_TWENTY : r.B01001_008E, // 20
            MALE_TWENTYONE : r.B01001_009E, // 21
            MALE_TWENTYTWO_TWENTY4 : r.B01001_010E, // 22-24
            MALE_TWENTYFIVE_TWENTYNINE : r.B01001_011E, // 25-29
            MALE_THIRTY_THIRTYFOUR : r.B01001_012E, // 30-34
            MALE_THIRTYFIVE_THIRTYNINE : r.B01001_013E, // 35-39
            MALE_FORTY_FORTYFOUR : r.B01001_014E, // 40-44
            MALE_FORTYFIVE_FORTYNINE : r.B01001_015E, // 45-49
            MALE_FIFTY_FIFTYFOUR : r.B01001_016E, // 50-54
            MALE_FIFTY_FIFTYNINE : r.B01001_017E, // 55-59
            MALE_SIXTY_SIXTYONE : r.B01001_018E, // 60-61
            MALE_SIXTYTWO_SIXTYFOUR : r.B01001_019E, // 62-64
            MALE_SIXTYFIVE_SIXTYSIX : r.B01001_020E, // 65-66
            MALE_SIXTYSEVEN_SIXTYNINE : r.B01001_021E, // 67-69
            MALE_SEVENTY_SEVENTYFOUR : r.B01001_022E, // 70-74
            MALE_SEVENTYFIVE_SEVENTYNINE : r.B01001_023E, // 75-79
            MALE_EIGHTY_EIGHTYFOUR : r.B01001_024E,  // 80-84
            MALE_EIGHTYFIVE_UP: r.B01001_025E, // >=85

            FEMALE_TOTAL : r.B01001_026E,
            FEMALE_ZERO_FIVE : r.B01001_027E, // <=5
            FEMALE_FIVE_NINE : r.B01001_028E, // 5-9
            FEMALE_TEN_FOURTEEN : r.B01001_029E, // 10-14
            FEMALE_FIFTEEN_SEVENTEEN : r.B01001_030E, // 15-17
            FEMALE_EIGHTEEN_NINETEEN : r.B01001_031E, // 18-19
            FEMALE_TWENTY : r.B01001_032E, // 20
            FEMALE_TWENTYONE : r.B01001_0033, // 21
            FEMALE_TWENTYTWO_TWENTY4 : r.B01001_034E, // 22-24
            FEMALE_TWENTYFIVE_TWENTYNINE : r.B01001_035E, // 25-29
            FEMALE_THIRTY_THIRTYFOUR : r.B01001_036E, // 30-34
            FEMALE_THIRTYFIVE_THIRTYNINE : r.B01001_037E, // 35-39
            FEMALE_FORTY_FORTYFOUR : r.B01001_038E, // 40-44
            FORTYFIVE_FORTYNINE : r.B01001_039E, // 45-49
            FEMALE_FIFTY_FIFTYFOUR : r.B01001_016E, // 50-54
            FEMALE_FIFTY_FIFTYNINE : r.B01001_017E, // 55-59
            FEMALE_SIXTY_SIXTYONE : r.B01001_018E, // 60-61
            FEMALE_SIXTYTWO_SIXTYFOUR : r.B01001_019E, // 62-64
            FEMALE_SIXTYFIVE_SIXTYSIX : r.B01001_020E, // 65-66
            FEMALE_SIXTYSEVEN_SIXTYNINE : r.B01001_021E, // 67-69
            FEMALE_SEVENTY_SEVENTYFOUR : r.B01001_022E, // 70-74
            FEMALE_SEVENTYFIVE_SEVENTYNINE : r.B01001_023E, // 75-79
            FEMALE_EIGHTY_EIGHTYFOUR : r.B01001_024E,  // 80-84
            FEMALE_EIGHTYFIVE_UP: r.B01001_025E // >=85
        }
        console.log(response)
        return(response)
    },

    filterIncome : function(data) {
        const r = data[0]

        const response = {
            income : {
                median: r.B19013_001E,
                below_poverty_line: r.B16009_002E,
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
                _200000_MORE: r.B19001_017E,
            }
        }

            console.log(response)
            return response
        }
    }


module.exports = methods