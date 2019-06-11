
import { applyMiddleware, compose, createStore, combineReducers} from 'redux';
import productsReducer from './Reducers/products-reducer'
import userReducer from './Reducers/user-reducer'
import addressReducer from './Reducers/address-reducer'
import placesReducer from './Reducers/places-reducers'
import thunk from 'redux-thunk';

const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    address: addressReducer,
    places: placesReducer
});

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(
    allReducers, 
    {
    products: [{name: 'Iphone'}],
    user: 'Rob',
    address: undefined,
    places: []
    },
   
    allStoreEnhancers
    );

console.log("store init state: ", store.getState())

export default store;