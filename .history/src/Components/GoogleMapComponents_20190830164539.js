import { google } from '../Constants.js'

export const renderCircle = (radius, color, map, center) => new google.maps.Circle({
    strokeColor: "#00ff00",
    strokeOpacity: 0.5,
    strokeWeight: 4,
    fillColor: "#00ff00",
    fillOpacity: 0.0,
    map,
    center: center,
    radius: 402.336
  });

export const renderMarker = (key, position, map, title, icon) =>  new google.maps.Marker({
    key: key,
    position: position,
    map: map,
    title: title,
    icon: icon
  });
