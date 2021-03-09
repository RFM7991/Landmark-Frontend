import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { updateAddress} from '../Actions/address-actions'
import { updateBusinessType} from '../Actions/business-actions'
import { updateZip } from '../Actions/zip-actions'
import { updateState } from '../Actions/state-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { GOOGLE_KEY } from '../Constants';


class AutoCompleteBar extends React.Component {
  constructor(props) {
    super(props);
    let address = ''
  
    if (this.props.urlParams != undefined) {
       address = JSON.parse(this.props.urlParams.address)
    }
    this.state = { address: address};
    this.handleChange = this.handleChange.bind(this)
    this.onUpdateAddress = this.onUpdateAddress.bind(this)
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    this.handleChange(address)
    //  this.onUpdateAddress(addressState)
    this.props.addressFunction(address)
  };

  onUpdateAddress(address) {
    this.props.onUpdateAddress(address)
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ flex: 1, zIndex: 1000, width: '100%' }}>
            <input style= {{width: '100%', height: '35px', borderRadius: 8, fontSize: (this.props.fontSize == undefined) ? 22 : this.props.fontSize}}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div style={{ position: 'absolute', marginTop: this.props.marginTop, color: 'black'}}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer', width: '100%', color: 'black' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer', width: '100%', color: 'black' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span style={{ color: 'black'}}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = createSelector(
    selectors.addressSelector,
    selectors.businessTypeSelector,
    selectors.zipSelector,
    selectors.stateSelector,
    (address, business_type, zip, state) => ({
        address,
        business_type,
        zip,
        state
    })
);

const mapActionsToProps = {
     onUpdateAddress: updateAddress,
     onUpdateBusinessType: updateBusinessType,
     onUpdateZip: updateZip,
     onUpdateState: updateState
};

export default connect(mapStateToProps, mapActionsToProps) (AutoCompleteBar);