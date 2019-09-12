 //export const API =  'https://landmark-backend.appspot.com/api/'
 export const API = 'http://localhost:8080/api/';

export const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho'; 
const google = window.google;

 export const mapOptions =  {
    streetViewControl: true,
    scaleControl: true,
    fullscreenControl: false,
    styles: [{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }],
    gestureHandling: "greedy",
    disableDoubleClickZoom: true,
    minZoom: 5,
    maxZoom: 100,

    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          google.maps.MapTypeId.SATELLITE,
          google.maps.MapTypeId.HYBRID
        ]
    },
    zoomControl: true,
    clickableIcons: false
};