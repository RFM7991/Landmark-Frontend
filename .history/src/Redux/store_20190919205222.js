
import { applyMiddleware, compose, createStore, combineReducers} from 'redux';
import userReducer from '../Reducers/user-reducer'
import addressReducer from '../Reducers/address-reducer'
import placesReducer from '../Reducers/places-reducers'
import activeReducer from '../Reducers/active-reducer'
import thunk from 'redux-thunk';
import businessReducer from '../Reducers/business-reducer';
import zipReducer from '../Reducers/zip-reducer';
import stateReducer from '../Reducers/state-reducer'
import tractReducer from '../Reducers/tract-reducer'
import dataRangeReducer from '../Reducers/dataRange-reducer'
import readyReducer from '../Reducers/ready-reducer'
import isCityReducer from '../Reducers/isCity-reducer'
import tradezoneBoundsReducer from '../Reducers/tradeZoneBounds-reducer'
import { ZIP} from  '../Components/DemographicsPanel'

const allReducers = combineReducers({
    user: userReducer,
    address: addressReducer,
    places: placesReducer,
    business_type: businessReducer,
    active_place: activeReducer,
    zip: zipReducer,
    state: stateReducer,
    tract: tractReducer,
    data_range: dataRangeReducer,
    ready: readyReducer,
    isCity : isCityReducer,
    tradezone_bounds : tradezoneBoundsReducer
});

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
 //   window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(
    allReducers, 
    {
    user: 'Rob',
    address: undefined,
    places: [],
    business_type: 'restaurant',
    active_place: undefined,
    state: undefined,
    zip: undefined,
    tract: undefined,
    data_range: ZIP,
    ready: false,
    isCity: true
    },
   
    allStoreEnhancers
    );

console.log("store init state: ", store.getState())

export default store;