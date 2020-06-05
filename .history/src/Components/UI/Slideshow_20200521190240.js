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
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${S3_BASE + this.props.slideImages[0]})`}}>
            </div>
          </div>
          {this.props.slideImages.map((e, i) => {
                return (
                <div className="each-slide" key={i+"_slideshow_"+e}>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${S3_BASE + this.props.slideImages[0]})`}}>
                            </div>
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
  /**
   *  {this.props.slideImages.map((e, i) => {
                return (
                <div className="each-slide" key={i+"_slideshow_"+e}>
                        <div style={{'backgroundImage': `url(${e})`}}>
                        <span>Slide 1</span>
                        </div>
                    </div>
                )
            })}
   */