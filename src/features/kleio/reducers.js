import {
    SET_SUCCESS_MESSAGE,
    SET_FAILURE_MESSAGE,
    SET_WARNING_MESSAGE,
    SET_INFO_MESSAGE
} from "./actions";

const initialMessagesState = {
    successMessage: "",
    failureMessage: "",
    warningMessage: "",
    infoMessage: ""
}

export const messages = (state = initialMessagesState, action) => {
    const { type, payload } = action;

    switch (type){
        case SET_SUCCESS_MESSAGE: {
            return {
                ...state,
                successMessage: payload.successMessage
            };
        }
        case SET_FAILURE_MESSAGE: {
            return {
                ...state,
                failureMessage: payload.failureMessage
            };
        }
        case SET_WARNING_MESSAGE: {
            return {
                ...state,
                warningMessage: payload.warningMessage
            };
        }
        case SET_INFO_MESSAGE: {
            return {
                ...state,
                infoMessage: payload.infoMessage
            };
        }
        default: 
            return state;
    }
}