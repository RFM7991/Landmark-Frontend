import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Toolbar(props) {

    const handleMap = () => {
        window.scrollTo({ top: 0, behavior: 'smooth'})
    }

    const handlePlaces = () => {
        window.scrollTo({ top: window.screen.availHeight -150, behavior: 'smooth' })
    }

    const handleStats = () => {
        window.scrollTo({ top: window.screen.availHeight*2 -150, behavior: 'smooth'})
    }

    return (
        <div className="mob-place_menu">
            {/* <Button variant="link">
                <FontAwesomeIcon icon={faBars} size="1x" color="#007BFF" />
            </Button> */}
            <Button variant="link" onClick={handleMap}>Map</Button>
            <Button variant="link" onClick={handlePlaces}>Places</Button>
            <Button variant="link" onClick={handleStats}>Stats</Button>
        </div>
    )
}

export default Toolbar