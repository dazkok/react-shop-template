import {createStore, combineReducers} from "redux";
import {setUserReducer} from "./reducers/setUserReducer";
import {cartReducer} from "./reducers/cartReducer";
import {wishlistReducer} from "./reducers/wishlistReducer";

const rootReducer = combineReducers({
    user: setUserReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
});

export const configureStore = () => createStore(rootReducer)