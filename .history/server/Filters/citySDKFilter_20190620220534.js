const vars = require('../Variables')

const methods = {

    filterPopulation(data) {
        const r = data[0]
        const response = {

            city: r.NAME,
            median_age: r.B01002_001E
        }
       
        console.log(response)
    }
}

module.exports = methods