var fs = require("fs")
const zipwriter = require('../mongo/zipwriter')

var methods = {
    getCart: (state, zip, callback) => {
      zipwriter.findZip(state, zip, (data) => {
        callback(data)
      })
    }
   
}

module.exports = methods