import React, { Component } from 'react';
import defaultMarker from './images/default-marker.png'
import homeMarker from './images/home-marker.png'
import selectedMarker from './images/selected-marker.png'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { readFileSync } from 'fs';

class Panorama extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {active: ''}

        this.getImage = this.getImage.bind(this)


    }
    getImage() {
        switch (this.props.type) {
            case HOME:
                return homeMarker
            case SELECTED:
                return selectedMarker
            case DEFAULT:
                return defaultMarker
            default:
                return defaultMarker
        }
    }

    componentDidMount() {

    }

    render() {
   
        
        return (
        <div id='pano-container'>
        </div>
        )
    }
}

export default Panorama;