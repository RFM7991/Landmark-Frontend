var fs = require("fs")

census({
    "vintage" : 2017,
    "geoHierarchy" : {
      "metropolitan statistical area/micropolitan statistical area": "*"
    },
    "geoResolution" : "500k" // required
  }, 
  (err, res) => {
    fs.writeFile("./directory/filename.json", 
      JSON.stringify(res), 
      () => console.log("done")
  )}
)