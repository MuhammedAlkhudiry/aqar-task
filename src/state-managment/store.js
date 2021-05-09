import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";

const initialState = {};

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...[thunk])
    )
);
