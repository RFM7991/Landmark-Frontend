
export function testCall() {
    var request = {
        "level": "state",
        "state": "AK",
        "sublevel": true,
        "variables": [
            "B24124_407E",
            "age",
            "commute_time",
            "commute_time_carpool",
            "commute_time_other"
        ]
    }

    //Create a callback function to use the data returned
    var callback = function(response) {
        console.log('CITYSDK', response)
        // Do something with the response
     };

     // Make the request
     window.census.geoRequest(request, callback);
     window.census.apiRequest(request, callback);
}