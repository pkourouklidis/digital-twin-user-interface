import {
    LOAD_SIMULATION_IN_PROGRESS,
    LOAD_SIMULATION_SUCCESS,
    LOAD_SIMULATION_FAILURE,
    LOAD_SETTINGS_IN_PROGRESS,
    LOAD_SETTINGS_SUCCESS,
    LOAD_SETTINGS_FAILURE,
    UPDATE_SETTINGS,
    SETTINGS_CHANGED,
    PROCESSING
} from "./actions";

const initialSimulationState = {
    simulationLoading: false,
    simulationLoadingFailed: false,
    simulation: {}
}

export const simulation = (state = initialSimulationState, action) => {
    const { type, payload } = action;

    switch (type){
        case LOAD_SIMULATION_IN_PROGRESS: {
            return {
                ...state,
                simulationLoading: true,
                simulationLoadingFailed: false
            };
        }
        case LOAD_SIMULATION_SUCCESS: {
            return {
                ...state,
                simulationLoading: false,
                simulationLoadingFailed: false,
                simulation: payload
            };
        }
        case LOAD_SIMULATION_FAILURE: {
            return {
                ...state,
                simulationLoading: false,
                simulationLoadingFailed: true,
                simulation: {}
            };
        }
        default: 
            return state;
    }
}

const initialSettingsState = {
    settings: {}
}

export const settings = (state = initialSettingsState, action) => {
    const { type, payload } = action;

    switch (type){
        case LOAD_SETTINGS_IN_PROGRESS: {
            return {
                ...state,
                settingsLoading: true,
                settingsLoadingFailed: false
            };
        }
        case LOAD_SETTINGS_SUCCESS: {
            return {
                ...state,
                settingsLoading: false,
                settingsLoadingFailed: false,
                settings: payload
            };
        }
        case LOAD_SETTINGS_FAILURE: {
            return {
                ...state,
                settingsLoading: false,
                settingsLoadingFailed: true,
                settings: {}
            };
        }
        case UPDATE_SETTINGS: {
            return {
                ...state,
                settingsLoading: false,
                settingsLoadingFailed: true,
                settings: payload
            };
        }
        default: 
            return state;
    }
}

const initialSettingsChangedState = {
    changed: false
}

export const settingsChanged = (state = initialSettingsChangedState, action) => {
    const { type, payload } = action;

    switch (type){
        case SETTINGS_CHANGED: {
            return {
                ...state,
                settingsChanged: payload
            };
        }
        default: 
            return state;
    }
}

const initialProcessingChangedState = {
    processing: false
}

export const processing = (state = initialProcessingChangedState, action) => {
    const { type, payload } = action;

    switch (type){
        case PROCESSING: {
            return {
                ...state,
                processing: payload
            };
        }
        default: 
            return state;
    }
}