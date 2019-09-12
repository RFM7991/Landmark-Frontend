import { google } from '../Constants.js'
import React, { Component } from 'react';

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

export const renderInfoContent = (place) => {
  var details = this.state.place_details.get(place.id)
  var photo_url = this.state.place_photos.get(place.id)
  return (
  <div id="content">
    <div id="siteNotice">
    </div>
      <h3 style={{textAlign: 'center'}}>{place.name}</h3>
      <br></br>
      <img style={{display: 'block',  marginRight: 'auto', marginLeft: 'auto', width: '50%'}}src={photo_url}></img> 
      <br></br>
      <div id="bodyContent">
        <p style={{textAlign: 'center'}}><strong>{details.formatted_address}</strong></p>
        <p><a target="_blank" href={details.website}>{details.website}</a></p>
        <p>
          Rating: {place.rating} / 5.0
          <br></br>
          Total Ratings: {place.user_ratings_total}
          <br></br>
          Open Now: {this.getOpen(place.opening_hours)}
        </p>
    </div>
  </div>)
}