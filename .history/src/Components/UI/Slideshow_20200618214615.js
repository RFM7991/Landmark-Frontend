import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import '../../css/listingView.css'
 
const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"

export default class Slideshow extends React.Component {

    constructor(props) {
        super(props)
    }

 
render() {
    return (
        <Carousel style={{ width: this.props.width}}>
            {this.props.photos.map((e, i) => {
                return (
                    <Carousel.Item >
                         
                         <div className="d-block w-100" style={{backgroundColor : 'black', height : this.props.height}}> 
                        
                            <Image 
                            id="noBlur"
                            src={S3_BASE + e}
                            alt="First slide"
                            fluid
                            style={{  height: '98%', width: '98%'}}
                            />
                         </div>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
            
        </Carousel>
    )
    }
}

/**
 * <
                        className="d-block w-100"
                        src={S3_BASE + e}
                        alt="First slide"
                        fluid
                        style={{ width: '100%', height : this.props.height}}
                        />
 */