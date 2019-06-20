import census from 'citysdk'
import {variables} from '../CitySDK/Variables'
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'
/*
// population
"B00001_001E", // population
  // gender
  
  
  "B01001_002E", // male
  "B01001_026E", // female

  // age
  "B06002_001E", // median age
  // race

// income
*/


// https://api.census.gov/data/2017/acs/acs5/variables.html
export function testCall() {
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
        "B00001_001E", // population
        "B01001_002E", // male
        "B01001_026E", // female
        "" 
        ],          
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => console.log(res)
    )
}

  /*
        , 
        "B00001_001E", // population
        "B00002_001E", // housing units
        "B01001_002E", // male
        "B01001_026E" // female
        */

export function medianAge() {
    census({
        "vintage" : 2015,             // required
        "geoHierarchy" : {            // required
          "place" : {
            "lat" : 40.8581292, 
            "lng" : -74.2053012
          }
        },
        "sourcePath" : ["acs", "acs5"],        // required 
        "values" : ["B06002_001E", "NAME"],          // required 
        "statsKey" : KEY // required for > 500 calls per day
      }, 
      (err, res) => console.log(res)
    )
}

export function getPopulation() {
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
      "B00001_001E", // population
      "B06002_001E", // medianage
      "B01001_002E", // male total
      "B01001_026E", // female total 
      // male age range ages
      "B01001_003E", // <5
      "B01001_004E", // 5-9
      "B01001_005E", // 10-14
      "B01001_006E", //
      ],          
      "statsKey" : KEY // required for > 500 calls per day
    }, 
    (err, res) => console.log(res)
  )
}