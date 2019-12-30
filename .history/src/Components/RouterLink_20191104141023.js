import React from 'react';
import '../css/App.css';
import { updateIsCity } from '../Actions/isCity-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { updateAddress} from '../Actions/address-actions'
import { Redirect } from 'react-router'

class RouterLink extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
 
    }

    render() {
        let link = <></>
        let address = encodeURI(JSON.stringify(this.props.address))
        let business_type = encodeURI(this.props.business_type.type)
        let distance = 'driving'
        if (this.props.isCity) distance = 'walking'
        distance = encodeURI(distance)
        let url = '/' + address + '/' + business_type + '/' + distance
        console.log('URL', url)
        link =  <Redirect push to = {url}/>

        return (
            {link}
        )
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

export default connect(mapStateToProps, mapActionsToProps) (RouterLink);
