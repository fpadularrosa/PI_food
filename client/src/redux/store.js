import reducer from "./reducer";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';

const store = createStore(
    reducer, 
    applyMiddleware(thunkMiddleWare)
);

export default store;