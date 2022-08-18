export const LOAD_SIMULATION_IN_PROGRESS = 'LOAD_SIMULATION_IN_PROGRESS';
export const loadSimulationInProgress = () => ({
    type: LOAD_SIMULATION_IN_PROGRESS,
});

export const LOAD_SIMULATION_SUCCESS = 'LOAD_SIMULATION_SUCCESS';
export const loadSimulationSuccess = simulation => ({
    type: LOAD_SIMULATION_SUCCESS,
    payload: simulation,
});

export const LOAD_SIMULATION_FAILURE = 'LOAD_SIMULATION_FAILURE';
export const loadSimulationFailure = () => ({
    type: LOAD_SIMULATION_FAILURE,
});

export const LOAD_SETTINGS_IN_PROGRESS = 'LOAD_SETTINGS_IN_PROGRESS';
export const loadSettingsInProgress = () => ({
    type: LOAD_SETTINGS_IN_PROGRESS,
});

export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export const loadSettingsSuccess = simulation => ({
    type: LOAD_SETTINGS_SUCCESS,
    payload: simulation,
});

export const LOAD_SETTINGS_FAILURE = 'LOAD_SETTINGS_FAILURE';
export const loadSettingsFailure = () => ({
    type: LOAD_SETTINGS_FAILURE,
});

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const updateSettings = settings => ({
    type: UPDATE_SETTINGS,
    payload: settings,
});

export const SETTINGS_CHANGED = 'SETTINGS_CHANGED';
export const settingsChanged = hasChanged => ({
    type: SETTINGS_CHANGED,
    payload: hasChanged,
});

export const PROCESSING = 'PROCESSING';
export const processing = isProcessing => ({
    type: PROCESSING,
    payload: isProcessing,
});