var fs = require("fs")
const zipwriter = require('../mongo/zipwriter')
const tractWriter = require('../mongo/tractwriter')

var methods = {
    getZipCart: (state, zip, callback) => {
      zipwriter.findZip(state, zip, (data) => {
        callback(data)
      })
    },

    getTractCart: (state, tract, callback) => {
      tractWriter.findTract(state, tract, (data) => {
        callback(data)
      })
    }
   
}

module.exports = methods