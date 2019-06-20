import React, { Component } from 'react';
import defaultMarker from './images/blue-marker.png'
import homeMarker from './images/dot-marker.png'
import selectedMarker from './images/selected-dot-marker.png'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
export const SELECTED = 'selected'
export const HOME = 'home'
export const DEFAULT = 'default'

class Marker extends Component {
    constructor(props) {
        super(props) 
        this.state = {active: ''}

        this.getImage = this.getImage.bind(this)

        this.props.image = this.getImage()
    }

    toggle() {
        var toggle = this.state.active === 'is-active' ? '' : 'is-active';
        this.setState({active: toggle});
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
        <OverlayTrigger rootClose={true} onHide={() => this.setState({show: false})}  trigger="click" placement="top" overlay={popover}>          
            <div >
            <img style={{width: '32px', height: '32px'}} src={this.getImage}></img>
            </div>
        </OverlayTrigger>
        )
    }
}

export default Marker;