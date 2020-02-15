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
    let zip, number, street, city, state;
    let place;
    let geoCode = await geocodeByAddress(address)
      .then(results => { 
        console.log('999', results)
          for (let c of results[0].address_components) {
              for (let type of c.types) {
                if (type == 'street_number') 
                  number = (c.long_name != undefined) ? c.long_name : ''
                if (type == 'route')
                  street = (c.short_name != undefined) ? c.long_name : ''
                if (type == 'locality')
                    city = c.long_name
                if (type == 'administrative_area_level_1')
                    state = c.short_name
                if (type == "postal_code") 
                    zip = c.long_name
              }
          }
          place = results[0]
          return getLatLng(results[0])
        })
      .then(latLng => latLng)
      .catch(error => console.error('Error', error));
      let addressState = {}
      addressState.formatted = address
      addressState.street = number + ' ' + street
      addressState.city = city
      addressState.state = state
      addressState.zip = zip
      addressState.coords = geoCode
      addressState.place = place

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
          <div>
            <input style= {{width: '100%', borderRadius: 8, fontSize: 22}}
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