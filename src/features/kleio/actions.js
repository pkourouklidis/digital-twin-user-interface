export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const setSuccessMsg = successMessage => ({
    type: SET_SUCCESS_MESSAGE,
    payload: { successMessage },
});

export const SET_FAILURE_MESSAGE = 'SET_FAILURE_MESSAGE';
export const setFailureMsg = failureMessage => ({
    type: SET_FAILURE_MESSAGE,
    payload: { failureMessage },
});

export const SET_WARNING_MESSAGE = 'SET_WARNING_MESSAGE';
export const setWarningMsg = warningMessage => ({
    type: SET_WARNING_MESSAGE,
    payload: { warningMessage },
});

export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE';
export const setInfoMsg = infoMessage => ({
    type: SET_INFO_MESSAGE,
    payload: { infoMessage },
});