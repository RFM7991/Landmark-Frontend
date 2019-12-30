import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../css/App.css';
import { getPopulation  } from '../Requests/city-requests' 
import { updateBusinessType} from '../Actions/business-actions'
import { updateReady } from '../Actions/ready-actions'
import { updateIsCity } from '../Actions/isCity-actions'
import { clearData } from '../Actions/root-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { BUSINESS_TYPES } from '../Constants'
import AutoCompleteBar from './AutoCompleteBar'
import * as selectors from '../Reducers/selectors'
import { updateAddress} from '../Actions/address-actions'
import { updatePlaces } from '../Actions/places-actions';
import { Redirect } from 'react-router'

class LookUpForm extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
 
    }

  

    render() {
        return (
           
        );
    }
}

const mapStateToProps = createSelector(
    selectors.businessTypeSelector,
    selectors.readySelector,
    selectors.addressSelector,
    selectors.isCitySelector,
    selectors.tradeZoneBoundsSelector,
    (business_type, ready, address, isCity, tradeZone_bounds) => ({
        business_type,
        ready,
        address,
        isCity,
        tradeZone_bounds
    })
);

const mapActionsToProps = {
     onUpdateBusinessType: updateBusinessType,
     onUpdateReady: updateReady,
     onUpdateIsCity: updateIsCity,
     onUpdateAddress: updateAddress
};

export default connect(mapStateToProps, mapActionsToProps) (LookUpForm);
