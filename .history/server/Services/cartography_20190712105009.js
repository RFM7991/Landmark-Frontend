var fs = require("fs")
const zipwriter = require('../mongo/zipwriter')
const tractWriter = require('../mongo/tractwriter')

var methods = {
    getCart: (state, zip, callback) => {
      zipwriter.findZip(state, zip, (data) => {
        callback(data)
      })
    },

    getTract: (state, tract, callback) => {
      tractWriter.findTract(state, tract, (callback) => {
        callback(data)
      })
    }
   
}

module.exports = methods