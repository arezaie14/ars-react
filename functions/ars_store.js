import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

ars.store = {
    reducers: {},
    get_reducers: () => {
        return combineReducers(ars.store.reducers)
    },
    merge: (reducers) => {
        for (const [key, item] of Object.entries(reducer)) {
            ars.store.reducers[key] = item;
        }
    }
};
ars.store.db = createStore(ars.store.get_reducers, {}, composeWithDevTools(applyMiddleware(...[thunk])));
