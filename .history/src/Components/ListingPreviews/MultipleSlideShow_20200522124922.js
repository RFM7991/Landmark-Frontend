import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import '../../css/listingView.css'
import ListingCard from './ListingCard'
 
const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"

export default class Slideshow extends React.Component {

    constructor(props) {
        super(props)
    }

 
render() {
    return (
        <Carousel style={{ width: this.props.width}}>
            {this.props.data.map((e, i) => {
                return (
                    <Carousel.Item >
                         
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                {e.map((listing, i) => {
                                    return (
                                        <div className="d-block w-100" style={{backgroundColor : 'white', height: this.props.height}} onMouseOver={this.handleHover} onMouseLeave={this.handleMouseOut}> 
                                            <div style={{ height: '80%'}}>        
                                                <Image 
                                                id="noBlur"
                                                src={S3_BASE + listing.photos.site_photos[0]}
                                                alt="First slide"
                                                fluid
                                                style={{ zIndex : -5}}
                                                />
                                            </div>   
                                            <div style={{ color: 'black', fontSize : '14px'}}>
                                                <p>{this.props.listing.location.formatted}</p>
                                            </div>
                                        </div>
                                    )
                                } 
                             )}
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