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
     console.log( 'FLAG', vars.POPULATION.INCOME.HOUSEHOLD.MEDIAN)
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
        // gender
        vars.POPULATION.TOTAL, 
        vars.POPULATION.AGE.MEDIAN.TOTAL, 
        vars.POPULATION.GENDER.MALE.TOTAL, 
        vars.POPULATION.GENDER.FEMALE.TOTAL,

        // race
        vars.POPULATION.RACE.WHITE.TOTAL,
        vars.POPULATION.RACE.AFRICAN_AMERICAN.TOTAL,
        vars.POPULATION.RACE.ASIAN.TOTAL,
        vars.POPULATION.RACE.HISPANIC_OR_LATINO.TOTAL,
        vars.POPULATION.RACE.NATIVE_AMERICAN.TOTAL,
        vars.POPULATION.RACE.PACIFIC_ISLANDER.TOTAL,
        vars.POPULATION.RACE.TWO_OR_MORE.TOTAL,

        // marital status
        vars.POPULATION.RELATIONSHIP.MARRIED,
        vars.POPULATION.RELATIONSHIP.NEVER_MARRIED,
        vars.POPULATION.RELATIONSHIP.DIVORCED,
        vars.POPULATION.RELATIONSHIP.WIDOWED,
        vars.POPULATION.RELATIONSHIP.MEDIAN_AGE_MALE,
        vars.POPULATION.RELATIONSHIP.MEDIAN_AGE_FEMALE

        // income
        vars.POPULATION.INCOME.HOUSEHOLD.MEDIAN,
        vars.POPULATION.INCOME.HOUSEHOLD._0_9999,
        vars.POPULATION.INCOME.HOUSEHOLD._10000_14999,
        vars.POPULATION.INCOME.HOUSEHOLD._150000_199999,
        vars.POPULATION.INCOME.HOUSEHOLD._20000_24999,
        vars.POPULATION.INCOME.HOUSEHOLD._25000_29999,
        vars.POPULATION.INCOME.HOUSEHOLD._30000_34999,
        vars.POPULATION.INCOME.HOUSEHOLD._35000_39999,
        vars.POPULATION.INCOME.HOUSEHOLD._40000_44999,
        vars.POPULATION.INCOME.HOUSEHOLD._45000_49999,
        vars.POPULATION.INCOME.HOUSEHOLD._50000_59999,
        vars.POPULATION.INCOME.HOUSEHOLD._60000_74999,
        vars.POPULATION.INCOME.HOUSEHOLD._75000_99999,
        vars.POPULATION.INCOME.HOUSEHOLD._100000_124999,
        vars.POPULATION.INCOME.HOUSEHOLD._125000_149999,
        vars.POPULATION.INCOME.HOUSEHOLD._150000_199999,
        vars.POPULATION.INCOME.HOUSEHOLD._150000_199999, 
        vars.POPULATION.INCOME.HOUSEHOLD._200000_MORE



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