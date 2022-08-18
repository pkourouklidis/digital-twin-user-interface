import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { messages } from './features/kleio/reducers';
import { simulation, settings, settingsChanged, processing } from './features/app/reducers';

const reducers = {
    messages,
    simulation,
    settings,
    settingsChanged,
    processing
};

const rootReducer = combineReducers(reducers);

const initialState = {
    messages: { successMessage: "", failureMessage: "", warningMessage: "", infoMessage: "" },
    simulation: {},
    settings: {},
    settingsChanged: { settingsChanged: false },
    processing: { processing: false }
}

export const configureStore = () => createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));