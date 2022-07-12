import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { project, messages, userDetails, notifications, workbenches, foundUsers } from './features/kleio/reducers';

const reducers = {
    userDetails,
    notifications,
    workbenches,
    project,
    messages,
    foundUsers
};

const rootReducer = combineReducers(reducers);

const initialState = {
    userDetails: {},
    notifications: [],
    workbenches: [],
    project: {},
    messages: { successMessage: "", failureMessage: "", warningMessage: "", infoMessage: "" },
    foundUsers: { users: [], searchingUsers: false, searchingUsersFailed: false }
}

export const configureStore = () => createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));