var methods = {}
const KEY = '28a04efd887ab5cf335f99aabcde1978452de2cf'

methods = {
    test: function() {
        headers = new Headers()
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        fetch('',
        {
            method: 'POST',
            credentials: "same-origin",
            headers: headers,
        })
    }
}


module.exports = methods