var methods = {}
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

methods = {
    testCall: function() {

        var request_obj = {
            'zip': '21401',
            'state': 'MD',
            'level': 'state',
            'sublevel': False,
            'api': 'acs5',
            'year': 2010,
            'variables': ['income', 'population']
          }

        headers = new Headers()
        headers.append('Authorization', 'Basic ' + KEY);
        fetch('',
        {
            method: 'POST',
            credentials: "same-origin",
            headers: headers,
            body: request_obj
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error, console.error('CITYSDK Error:', error))
    }
}


module.exports = methods