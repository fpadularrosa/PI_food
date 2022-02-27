import reducer from "./reducer";
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';

const store = createStore(
    reducer, 
    compose(
        applyMiddleware(thunkMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
);

export default store;