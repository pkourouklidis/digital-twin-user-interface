import {
    fetchSimulation,
    fetchSettings,
    apiStopSimulation,
    apiPauseSimulation,
    apiUpdateSimulation,
    apiStartSimulation,
    apiCreateSimulation
} from './api';

import {
    loadSimulationInProgress,
    loadSimulationSuccess,
    loadSimulationFailure,
    loadSettingsInProgress,
    loadSettingsSuccess,
    loadSettingsFailure,
    settingsChanged,
    processing
} from './actions';

import { setInfoMessage, setSuccessMessage, setFailureMessage } from '../kleio/thunks';

export const loadSimulation = (authContext) => async (dispatch) => {
    try {
        dispatch(loadSimulationInProgress());
        const simulation = await fetchSimulation(process.env.REACT_APP_GATEWAY_URL, authContext);
        dispatch(loadSimulationSuccess(simulation));
    } catch (e) {
        dispatch(loadSimulationFailure());
    }    
}

export const loadSettings = (authContext) => async (dispatch) => {
    try {
        dispatch(loadSettingsInProgress());
        const settings = await fetchSettings(process.env.REACT_APP_GATEWAY_URL, authContext);
        dispatch(loadSettingsSuccess(settings));
    } catch (e) {
        dispatch(loadSettingsFailure());
    }    
}

export const updateSettings = (settings) => async (dispatch) => {
    dispatch(loadSettingsSuccess(settings));
    dispatch(settingsChanged(true));
}

export const updateProcessing = (isProcessing) => async (dispatch) => {
    dispatch(processing(isProcessing));
}

export const stopSimulation = (authContext) => async (dispatch) => {
    dispatch(updateProcessing(true));
    dispatch(setInfoMessage("Attempting to stop the simulation"));
    try {
        const success = await apiStopSimulation(process.env.REACT_APP_GATEWAY_URL, authContext);
        if (success) {
            dispatch(settingsChanged(false));
            dispatch(setSuccessMessage("Simulation stopped"));
        } else {
            dispatch(setFailureMessage("Simulation could not be stopped"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error occurred communicating with the simulation server"));
    }
    dispatch(updateProcessing(false));
}

export const pauseSimulation = (authContext) => async (dispatch) => {
    dispatch(updateProcessing(true));
    dispatch(setInfoMessage("Attempting to pause the simulation"));
    try {
        const success = await apiPauseSimulation(process.env.REACT_APP_GATEWAY_URL, authContext);
        if (success) {
            dispatch(setSuccessMessage("Simulation paused"));
        } else {
            dispatch(setFailureMessage("Simulation could not be paused"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error occurred communicating with the simulation server"));
    }
    dispatch(updateProcessing(false));
}

export const updateSimulation = (settings, authContext) => async (dispatch) => {
    dispatch(updateProcessing(true));
    dispatch(setInfoMessage("Attempting to update the simulation"));
    try {
        const success = await apiUpdateSimulation(process.env.REACT_APP_GATEWAY_URL, settings, authContext);
        if (success) {
            dispatch(settingsChanged(false));
            dispatch(setSuccessMessage("Simulation updated"));
        } else {
            dispatch(setFailureMessage("Simulation could not be updated"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error occurred communicating with the simulation server"));
    }
    dispatch(updateProcessing(false));
}

export const startSimulation = (authContext) => async (dispatch) => {
    dispatch(updateProcessing(true));
    dispatch(setInfoMessage("Attempting to start the simulation"));
    try {
        const success = await apiStartSimulation(process.env.REACT_APP_GATEWAY_URL, authContext);
        if (success) {
            dispatch(setSuccessMessage("Simulation started"));
        } else {
            dispatch(setFailureMessage("Simulation could not be started"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error occurred communicating with the simulation server"));
    }
    dispatch(updateProcessing(false));
}

export const createSimulation = (settings, authContext) => async (dispatch) => {
    dispatch(updateProcessing(true));
    dispatch(setInfoMessage("Attempting to create the simulation"));
    try {
        const success = await apiCreateSimulation(process.env.REACT_APP_GATEWAY_URL, settings, authContext);
        if (success) {
            dispatch(settingsChanged(false));
            dispatch(setSuccessMessage("Simulation created"));
        } else {
            dispatch(setFailureMessage("Simulation could not be created"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error occurred communicating with the simulation server"));
    }
    dispatch(updateProcessing(false));
}