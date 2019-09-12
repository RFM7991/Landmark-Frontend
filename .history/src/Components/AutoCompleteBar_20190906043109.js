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

class AutoCompleteBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.handleChange = this.handleChange.bind(this)
    this.onUpdateAddress = this.onUpdateAddress.bind(this)
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    this.handleChange(address)
    let zip, street, city, state;
    let geoCode = await geocodeByAddress(address)
      .then(results => { 
          for (let c of results[0].address_components) {
              for (let type of c.types)
                if (type == "postal_code") {
                    zip = c.long_name
                }
          }
          console.log(zip)
          return getLatLng(results[0])
        })
      .then(latLng => latLng)
      .catch(error => console.error('Error', error));
      let addressComponents = cleanUpAddress(address)
      let addressState = {}
      if (addressComponents.length != 4) {
          console.error('Address component length error', addressComponents)
      }
      addressState.formatted = address
      addressState.street = addressComponents[0]
      addressState.city = addressComponents[1]
      addressState.state = addressComponents[2]
      addressState.zip = zip
      addressState.coords = geoCode

      this.onUpdateAddress(addressState)
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
          <div>
            <input style= {{width: '100%'}}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
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

const cleanUpAddress = (address) => {
    let split = address.split(',')
    let cleanUp = split.map((e) => e.trim())
    return cleanUp
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