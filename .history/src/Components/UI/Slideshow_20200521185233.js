import React from 'react';
import { Slide } from 'react-slideshow-image';
import { renderCircle } from '../GoogleMapComponents';
 
export default class Slideshow extends React.Component {

    constructor(props) {
        super(props)
    }

 
render() {
    return (
      <div className="slide-container">
        <Slide 
          duration={5000}
          transitionDuration= {500}>

           
        </Slide>
      </div>
    )
    }
}

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  }