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
       
                e.map((listing, i) => {
                            return (
                                <ListingCard listing={listing}/>
                    
                            )
                        } 
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