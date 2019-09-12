const vars = require('../Variables')

const methods = {

    filterPopulation(data) {
       
        console.log(data[0].NAME)
        console.log(data[0].vars.POPULATION.TOTAL)
    }
}

module.exports = methods