import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class Marker extends Component {
    constructor(props) {
        super(props) 
        this.state = {active: ''}
    }

    toggle() {
        var toggle = this.state.active === 'is-active' ? '' : 'is-active';
        this.setState({active: toggle});
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
            <img style={{width: '32px', height: '32px'}} src={this.props.imgSrc}></img>
            </div>
        </OverlayTrigger>
        )
    }
}

export default Marker;