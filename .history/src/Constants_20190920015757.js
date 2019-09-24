 // export const API = // 'https://landmark-backend-252701.appspot.com/'
 export const API = 'http://localhost:8080/';

 export const GOOGLE_KEY = 'AIzaSyDc1QhQx9sfS2E-ZdM0cDQuVtM_NlQhdSU'; 
 export const google = window.google;
 export const GOOGLE_SECRET = 'lpkXmFKRjuqOM9YXgLIrGRlPWIA=';

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
    mapTypeId: this.state.mapType,
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