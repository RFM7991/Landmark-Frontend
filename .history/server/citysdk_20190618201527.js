var methods = {}
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

methods = {
    test: function() {
        headers = new Headers()
        headers.append('Authorization', 'Basic ' + KEY);
        fetch('',
        {
            method: 'POST',
            credentials: "same-origin",
            headers: headers,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error, console.error('CITYSDK Error:', error))
    }
}


module.exports = methods