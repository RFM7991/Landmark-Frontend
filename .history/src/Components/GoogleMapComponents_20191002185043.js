import { google } from '../Constants.js'
import React, { Component } from 'react';

export const renderCircle = (radius, color, map, center) => new google.maps.Circle({
    strokeColor: color,
    strokeOpacity: 0.5,
    strokeWeight: 4,
    fillColor: "#00ff00",
    fillOpacity: 0.0,
    map: map,
    center: center,
    radius: radius
  });

export const renderMarker = (key, position, map, title, icon, label) =>  new google.maps.Marker({
    key: key,
    position: position,
    map: map,
    animation: google.maps.Animation.DROP,
    title: title,
    icon: icon,
    labelContent : label
  });

  export const renderComplexMarker = (key, position, map, title, icon, origin, label) =>  new google.maps.Marker({
    key: key,
    position: position,
    map: map,
    title: title,
    icon: {
      url: icon,
      origin : anchor
    },
    labelContent : label
  });

export function renderInfoContent(place) {
  var details = this.state.place_details.get(place.id)
  var photo_url = this.state.place_photos.get(place.id)

  /**
   * <ReactStreetview 
            height = '200px'
            width = '600px'
            apiKey={GOOGLE_KEY}
            streetViewPanoramaOptions={streetViewPanoramaOptions}
          />
   */
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
  </div>
  )
}

export const BLUE_MARKER = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
export const YELLOW_MARKER = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
export const RED_MARKER = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
export const GREEN_MARKER = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
export const YELLOW_DOT = "https://mcphersondev.com/yellow-dot.png"
export const BLUE_DOT = "https://mcphersondev.com/blue-dot.png"