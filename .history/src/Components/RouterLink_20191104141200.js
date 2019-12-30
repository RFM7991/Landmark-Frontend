import React from 'react';
import '../css/App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { updateReady} from '../Actions/ready-actions'
import { Redirect } from 'react-router'

class RouterLink extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
 
    }

    onUpdateReady = (isReady) => {
        this.props.onUpdateReady(isReady)
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
    (business_type, ready, address, isCity) => ({
        business_type,
        ready,
        address,
        isCity,
    })
);

const mapActionsToProps = {
     onUpdateReady: updateReady,
};

export default connect(mapStateToProps, mapActionsToProps) (RouterLink);
