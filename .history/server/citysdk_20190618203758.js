var methods = {}
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'
const fetch = require("node-fetch");


methods = {
    testCall: function() {

        var request_obj = {
            'zip': '21401',
            'state': 'MD',
            'level': 'state',
            'sublevel': false,
            'api': 'acs5',
            'year': 2010,
            'variables': ['income', 'population']
          }

        fetch('http://citysdk.commerce.gov',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Basic ' + KEY},
            body: JSON.stringify(request_obj)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
    }
}


module.exports = methods