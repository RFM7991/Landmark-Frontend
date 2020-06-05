import React from 'react';
import { Slide } from 'react-slideshow-image';
 
const slideImages = [
  'images/slide_2.jpg',
  'images/slide_3.jpg',
  'images/slide_4.jpg'
];
 
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
 
export default Slideshow = props => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
            {props.slideImages.map((e, i) => {
                return (
                <div className="each-slide" key={i+"_slideshow_"+e}>
                        <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                        <span>Slide 1</span>
                        </div>
                    </div>
                )
            })}
        </Slide>
      </div>
    )
}