
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import productReducer from "./reducers/ProductReducer";
import cartReducer from "./reducers/CartReducer";
import userReducer from "./reducers/userReducer";
import reviewReducer from "./reducers/reviewReducer";
import shippingAddressReducer from "./reducers/ShippingAddressReducer";
import paymentMethodReducer from "./reducers/PaymentMethodReducer";
import orderReducer from "./reducers/OrderReducer";
import orderPayReducer from "./reducers/orderPayReducer";
import usersReducer from "./reducers/usersReducer";
import singleUserReducer from "./reducers/SingleUserReducer";
import productListReducer from "./reducers/ProductListReducer";
import orderListReducer from "./reducers/OrderListReducer";

const reducers = combineReducers({
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    review: reviewReducer,
    shippingAddress: shippingAddressReducer,
    paymentMethod: paymentMethodReducer,
    order: orderReducer,
    orderPay: orderPayReducer,
    users: usersReducer,
    singleUser:singleUserReducer,
    productList: productListReducer,
    orderList: orderListReducer
});


const initialState = {
   
};

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;