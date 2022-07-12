export const LOAD_PROJECTS_IN_PROGRESS = 'LOAD_PROJECTS_IN_PROGRESS';
export const loadProjectsInProgress = () => ({
    type: LOAD_PROJECTS_IN_PROGRESS,
});

export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const loadProjectsSuccess = projects => ({
    type: LOAD_PROJECTS_SUCCESS,
    payload: { projects },
});

export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';
export const loadProjectsFailure = () => ({
    type: LOAD_PROJECTS_FAILURE,
});

export const LOAD_PROJECT_IN_PROGRESS = 'LOAD_PROJECT_IN_PROGRESS';
export const loadProjectInProgress = () => ({
    type: LOAD_PROJECT_IN_PROGRESS,
});

export const LOAD_PROJECT_SUCCESS = 'LOAD_PROJECT_SUCCESS';
export const loadProjectSuccess = project => ({
    type: LOAD_PROJECT_SUCCESS,
    payload: { project },
});

export const LOAD_PROJECT_FAILURE = 'LOAD_PROJECT_FAILURE';
export const loadProjectFailure = () => ({
    type: LOAD_PROJECT_FAILURE,
});

export const ADD_PROJECT_IN_PROGRESS = 'ADD_PROJECT_IN_PROGRESS';
export const addProjectInProgress = () => ({
    type: ADD_PROJECT_IN_PROGRESS,
});

export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const addProjectSuccess = () => ({
    type: ADD_PROJECT_SUCCESS,
});

export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_IN_FAILURE';
export const addProjectFailure = () => ({
    type: ADD_PROJECT_FAILURE,
});


export const CLEAR_PROJECT = 'CLEAR_PROJECT';
export const clearProject = () => ({
    type: CLEAR_PROJECT,
    payload: {},
});

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

export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const setUserDetails = details => ({
    type: SET_USER_DETAILS,
    payload: details,
});

export const LOAD_NOTIFICATIONS_IN_PROGRESS = 'LOAD_NOTIFICATIONS_IN_PROGRESS';
export const loadNotificationsInProgress = () => ({
    type: LOAD_NOTIFICATIONS_IN_PROGRESS,
});

export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const loadNotificationsSuccess = notifications => ({
    type: LOAD_NOTIFICATIONS_SUCCESS,
    payload: { notifications },
});

export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE';
export const loadNotificationsFailure = () => ({
    type: LOAD_NOTIFICATIONS_FAILURE,
});

export const LOAD_WORKBENCHES_IN_PROGRESS = 'LOAD_WORKBENCHES_IN_PROGRESS';
export const loadWorkBenchesInProgress = () => ({
    type: LOAD_WORKBENCHES_IN_PROGRESS,
});

export const LOAD_WORKBENCHES_SUCCESS = 'LOAD_WORKBENCHES_SUCCESS';
export const loadWorkBenchesSuccess = workBenches => ({
    type: LOAD_WORKBENCHES_SUCCESS,
    payload: workBenches,
});

export const LOAD_WORKBENCHES_FAILURE = 'LOAD_WORKBENCHES_FAILURE';
export const loadWorkBenchesFailure = () => ({
    type: LOAD_WORKBENCHES_FAILURE,
});

export const SEARCH_USERS_IN_PROGRESS = ' SEARCH_USERS_IN_PROGRESS';
export const searchUsersInProgress = () => ({
    type:  SEARCH_USERS_IN_PROGRESS,
});

export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const searchUsersSuccess = users => ({
    type: SEARCH_USERS_SUCCESS,
    payload: users,
});

export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';
export const searchUsersFailure = () => ({
    type: SEARCH_USERS_FAILURE,
});

export const CLEAR_FOUND_USERS = 'CLEAR_FOUND_USERS';
export const clearFoundUsers = () => ({
    type: CLEAR_FOUND_USERS,
});