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
        <Slide {...properties}>
            {props.slideImages.map((e, i) => {
                return (
                <div className="each-slide" key={i+"_slideshow_"+e}>
                        <div style={{'backgroundImage': `url(${props.slideImages[0]})`}}>
                        <span>Slide 1</span>
                        </div>
                    </div>
                )
            })}
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