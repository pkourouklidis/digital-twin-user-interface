import {
    setSuccessMsg,
    setFailureMsg,
    setWarningMsg,
    setInfoMsg
} from './actions';

export const setSuccessMessage = (message) => async (dispatch) => {
    dispatch(setSuccessMsg(message));
}

export const setFailureMessage = (message) => async (dispatch) => {
    dispatch(setFailureMsg(message));
}

export const setWarningMessage = (message) => async (dispatch) => {
    dispatch(setWarningMsg(message));
}

export const setInfoMessage = (message) => async (dispatch) => {
    dispatch(setInfoMsg(message));
}