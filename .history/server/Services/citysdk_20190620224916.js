const census = require('citysdk')
const vars = require('../Variables')
const filter = require('../Filters/citySDKFilter')

const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

var methods = {

  testCall : function() {
      census({
          "vintage" : 2015,             // required
          "geoHierarchy" : {            // required
            "place" : {
              "lat" : 40.8581292, 
              "lng" : -74.2053012
            }
          },
          "sourcePath" : ["acs", "acs5"],        // required 
          "values" : ["NAME", 
          "B06002_001E", // median
          vars.POPULATION.TOTAL, // population
          "B01001_002E", // male
          "B01001_026E" // female
          ],          
          "statsKey" : KEY // required for > 500 calls per day
        }, 
        (err, res) => console.log(res)
      )
  },
   getPopulation : function() {
    census({
        "vintage" : 2017,             
        "geoHierarchy" : {            
          "place" : {
            "lat" : 40.8581292, 
            "lng" : -74.2053012
          }
        },
        "sourcePath" : ["acs", "acs5"],        
        "values" : 
        ["NAME", 
        vars.POPULATION.TOTAL, 
        vars.POPULATION.AGE.MEDIAN.TOTAL, 
        vars.POPULATION.GENDER.MALE.TOTAL, 
        vars.POPULATION.GENDER.FEMALE.TOTAL,
        vars.POPULATION.RACE.WHITE.TOTAL,
        vars.POPULATION.RACE.AFRICAN_AMERICAN.TOTAL,
        vars.POPULATION.RACE.ASIAN.TOTAL,
        vars.POPULATION.RACE.HISPANIC_OR_LATINO.TOTAL,
        vars.POPULATION.RACE.NATIVE_AMERICAN.TOTAL,
        vars.POPULATION.RACE.PACIFIC_ISLANDER.TOTAL,
        vars.POPULATION.RACE.TWO_OR_MORE.TOTAL,
        vars.POPULATION.RACE.OTHER.TOTAL,
        vars.POPULATION.INCOME.MEDIAN,
        

        ],          
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => {
        filter.filterPopulation(res)
      }
    )
  }

}

module.exports = methods