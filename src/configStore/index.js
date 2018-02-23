import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore() {
    /* eslint-disable no-underscore-dangle */
    const store = createStore(
        rootReducer, /* preloadedState, */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunkMiddleware, createLogger()),
        // applyMiddleware(thunkMiddleware)
    )
    /* eslint-enable */

    return store;
}