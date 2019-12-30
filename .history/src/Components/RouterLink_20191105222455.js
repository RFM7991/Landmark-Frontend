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
        this.onUpdateReady = this.onUpdateReady.bind(this)
        await this.onUpdateReady(false)
    }

    async componentWillMount() {
        // initialize ready to false for look up page
     
       console.log('Router Link will mount', this.props.ready)
    }

    componentWillUnmount() {
        console.log('Router link will UNMOUNT')
    }
 
    onUpdateReady(isReady) {
        console.log('RL Update isReady')
        this.props.onUpdateReady(isReady)
    }

    render() {
        console.log('ROUTER LINK', this.props)
        let link = <div></div>
        if (this.props.ready) {
            let address = encodeURI(JSON.stringify(this.props.address))
            let business_type = encodeURI(this.props.business_type.type)
            let distance = 'driving'
            if (this.props.isCity) distance = 'walking'
            distance = encodeURI(distance)
            let url = '/' + address + '/' + business_type + '/' + distance
            console.log('URL', url)
           link =  <Redirect push to = {url}/>
        }
        return (
            <div>
            {link}
            </div>
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
