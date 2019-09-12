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
       
     //   vars.POPULATION.RACE.OTHER.TOTAL,
     vars.POPULATION.INCOME.HOUSEHOLD.TOTAL


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