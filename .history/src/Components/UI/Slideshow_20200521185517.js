import React from 'react';
import { Slide } from 'react-slideshow-image';
import { renderCircle } from '../GoogleMapComponents';
const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"

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

        <div className="each-slide">
            <div style={{'backgroundImage': `url(${S3_BASE + this.props.slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>
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