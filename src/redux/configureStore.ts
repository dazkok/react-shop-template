import {createStore, combineReducers} from "redux";
import {setUserReducer} from "./reducers/setUserReducer";
import {cartReducer} from "./reducers/cartReducer";

const rootReducer = combineReducers({
    user: setUserReducer,
    cart: cartReducer
});

export const configureStore = () => createStore(rootReducer)