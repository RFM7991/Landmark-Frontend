import React, { Component } from 'react';
import defaultMarker from './images/default-marker.png'
import homeMarker from './images/home-marker.png'
import selectedMarker from './images/selected-marker.png'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { readFileSync } from 'fs';
export const SELECTED = 'selected'
export const HOME = 'home'
export const DEFAULT = 'default'

class Marker extends Component {
    constructor(props) {
        super(props) 
        this.state = {active: ''}

        this.getImage = this.getImage.bind(this)

        console.log('marker props', this.props)

        if (this.props.type) {
            refs.overlay.show()
        }
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

    render() {
        const popover = (
            
            <Popover id="popover-basic" title={this.props.title}>
            And here's some <strong>amazing</strong> Description
            </Popover>
        );
        
        return (
        <OverlayTrigger ref='overlay' rootClose={true} onHide={() => this.setState({show: true})}  trigger="click" placement="top" overlay={popover}>          
            <div>
            <img style={{width: '32px', height: '32px'}} src={require('./images/' + this.props.type + '-marker.png')}></img>
            </div>
        </OverlayTrigger>
        )
    }
}

export default Marker;