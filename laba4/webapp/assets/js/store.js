import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './ducks';

const logger = createLogger();

const defaultMiddlewares = [
    thunkMiddleware,
    logger
];

export default (function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...defaultMiddlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
})();