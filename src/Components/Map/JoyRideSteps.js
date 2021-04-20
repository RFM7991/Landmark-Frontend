import React from 'react'

export const steps =  [
    {
      target: 'body ',
      content: "Welcome to Landmark Map Interface, let's get started",
      placement: 'center'
    },
    {
      target: '.map_container ',
      content: <div>
          <h3 style={{fontSize: '24px'}}>Map</h3>
          <p style={{fontSize: '14px', textAlign: 'left'}}>The Map interface is your guide to the location and its surroundings</p>
          <p style={{fontSize: '14px', textAlign: 'left'}}>You can toggle between "Map" and "Satellite," zoom in and out, and drag the yellow "pegman"
          in the lower right corner on to the map to enter street view. </p>
         </div>,
      placement: 'center',
    },
    {
      target: '.map-control_bar ',
      content: <div>
           <h3 style={{fontSize: '24px'}}>Map Tools</h3>
      <p>Use this toolbar to customize your map view </p>
      <p style={{fontSize: '14px', textAlign: 'left'}}>1. Center - automatically pans to your original position</p>
      <p style={{fontSize: '14px', textAlign: 'left'}}>2. Street View - Toggles street view window</p>
      <p style={{fontSize: '14px', textAlign: 'left'}}>3. Overlay - Toggle Zip code or Trade Zone overlay </p>
      <p style={{fontSize: '14px', textAlign: 'left'}}>4. Businesses - Select which nearby businesses to mark on the map </p>
      <p style={{fontSize: '14px', textAlign: 'left'}}>5. Places of Interest - Select which nearby Places of Interest to mark on the map </p>
      <p style={{fontSize: '14px', textAlign: 'left'}}>6. Results - Select between 20, 40, and 60 results for selected nearby businesses or places of interest  </p>
     </div>,
    },
    {
      target: '.demographics-list-vertical',
      placement: 'right-start',
      content: <div>
           <h3 style={{fontSize: '24px'}}>Demographics Panel</h3>
           <p style={{fontSize: '14px', textAlign: 'left'}}>1. Zip / Tradezone - Select which area to display statistics for and display on the map</p>
           <p style={{fontSize: '14px', textAlign: 'left'}}>2. statistics - Click through the different categories to see more specific demographics information for your location</p>
     </div>,
    }, 
    {
      target: '.places-list',
      placement: 'left-start',
      content: <div>
           <h3 style={{fontSize: '24px'}}>Nearby Businesses Panel</h3>
           <p style={{fontSize: '14px', textAlign: 'left'}}>Here is a list of nearby business and places of interest currently displayed on the map. Click an item to view it's details on the map </p>
     </div>,
    },
    {
      target: 'body ',
      content: <div>
      <h3 style={{fontSize: '24px'}}>Get Started</h3>
      <p style={{fontSize: '14px', textAlign: 'left'}}>Click the '?' again if you need help, Good Luck! </p>
  </div>,
      placement: 'center'
    },
  
    //
  ]
  