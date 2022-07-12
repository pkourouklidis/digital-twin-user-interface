import {
    LOAD_PROJECTS_IN_PROGRESS,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    LOAD_PROJECT_IN_PROGRESS,
    LOAD_PROJECT_SUCCESS,
    LOAD_PROJECT_FAILURE,
    CLEAR_PROJECT,
    ADD_PROJECT_IN_PROGRESS,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    SET_SUCCESS_MESSAGE,
    SET_FAILURE_MESSAGE,
    SET_WARNING_MESSAGE,
    SET_INFO_MESSAGE,
    SET_USER_DETAILS,
    LOAD_NOTIFICATIONS_IN_PROGRESS,
    LOAD_NOTIFICATIONS_SUCCESS,
    LOAD_NOTIFICATIONS_FAILURE,
    LOAD_WORKBENCHES_IN_PROGRESS,
    LOAD_WORKBENCHES_SUCCESS,
    LOAD_WORKBENCHES_FAILURE,
    SEARCH_USERS_IN_PROGRESS,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAILURE,
    CLEAR_FOUND_USERS
} from "./actions";

const initialProjectState = {
    projectsLoading: false,
    projectsLoadingFailed: false,
    projects: [],
    currentProjectLoading: false,
    currentProjectLoadingFailed: false,
    currentProject: {},
    currentProjectRepositories: [],
    currentProjectDeployments: [],
    successMessage: "",
    failureMessage: ""
}

export const project = (state = initialProjectState, action) => {
    const { type, payload } = action;

    switch (type){
        case ADD_PROJECT_IN_PROGRESS: {
            return {
                ...state,
                currentProjectLoading: true,
                currentProjectLoadingFailed: false
            }
        }
        case ADD_PROJECT_SUCCESS: {
            return {
                ...state,
                currentProjectLoading: false,
                currentProjectLoadingFailed: false
            };
        }
        case ADD_PROJECT_FAILURE: {
            return {
                ...state,
                currentProjectLoading: false,
                currentProjectLoadingFailed: true,
                currentProject: {}
            };
        }
        case LOAD_PROJECTS_IN_PROGRESS: {
            return {
                ...state,
                projectsLoading: true,
                projectsLoadingFailed: false
            };
        }
        case LOAD_PROJECTS_SUCCESS: {
            return {
                ...state,
                projectsLoading: false,
                projectsLoadingFailed: false,
                projects: payload.projects
            };
        }
        case LOAD_PROJECTS_FAILURE: {
            return {
                ...state,
                projectsLoading: false,
                projectsLoadingFailed: true,
                projects: []
            };
        }
        case LOAD_PROJECT_IN_PROGRESS: {
            return {
                ...state,
                currentProjectLoading: true,
                currentProjectLoadingFailed: false
            };
        }
        case LOAD_PROJECT_SUCCESS: {
            return {
                ...state,
                currentProjectLoading: false,
                currentProjectLoadingFailed: false,
                currentProject: payload.project
            };
        }
        case LOAD_PROJECT_FAILURE: {
            return {
                ...state,
                currentProjectLoading: false,
                currentProjectLoadingFailed: true,
                currentProject: {}
            };
        }
        case CLEAR_PROJECT: {
            return {
                ...state,
                currentProjectLoading: false,
                currentProjectLoadingFailed: false,
                currentProject: {}
            };
        }
        case SET_SUCCESS_MESSAGE: {
            return {
                ...state,
                successMessage: payload.message
            };
        }
        case SET_FAILURE_MESSAGE: {
            return {
                ...state,
                failureMessage: payload.message
            };
        }
        default: 
            return state;
    }
}

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

const userDetailsState = {
    userDetails: {}
}

export const userDetails = (state = userDetailsState, action) => {
    const { type, payload } = action;

    switch (type){
        case SET_USER_DETAILS: {
            return {
                ...state,
                userDetails: payload
            };
        }
        default: 
            return state;
    }
}

const initialNotificationsState = {
    notificationsLoading: false,
    notificationsLoadingFailed: false,
    notifications: []
}

export const notifications = (state = initialNotificationsState, action) => {
    const { type, payload } = action;

    switch (type){
        case LOAD_NOTIFICATIONS_IN_PROGRESS: {
            return {
                ...state,
                notificationsLoading: true,
                notificationsLoadingFailed: false
            };
        }
        case LOAD_NOTIFICATIONS_SUCCESS: {
            return {
                ...state,
                notificationsLoading: false,
                notificationsLoadingFailed: false,
                notifications: payload.notifications
            };
        }
        case LOAD_NOTIFICATIONS_FAILURE: {
            return {
                ...state,
                notificationsLoading: false,
                notificationsLoadingFailed: true,
                notifications: []
            };
        }
        default: 
            return state;
    }
}

const initialWorkBenchesState = {
    workbenchesLoading: false,
    workbenchesLoadingFailed: false,
    workbenchlist: []
}

export const workbenches = (state = initialWorkBenchesState, action) => {
    const { type, payload } = action;

    switch (type){
        case LOAD_WORKBENCHES_IN_PROGRESS: {
            return {
                ...state,
                workbenchesLoading: true,
                workbenchesLoadingFailed: false
            };
        }
        case LOAD_WORKBENCHES_SUCCESS: {
            return {
                ...state,
                workbenchesLoading: false,
                workbenchesLoadingFailed: false,
                workbenchlist: payload
            };
        }
        case LOAD_WORKBENCHES_FAILURE: {
            return {
                ...state,
                workbenchesLoading: false,
                workbenchesLoadingFailed: true,
                workbenchlist: []
            };
        }
        default: 
            return state;
    }
}

const initialFoundUsersState = {
    searchingUsers: false,
    searchingUsersFailed: false,
    users: []
}

export const foundUsers = (state = initialFoundUsersState, action) => {
    const { type, payload } = action;

    switch (type){
        case SEARCH_USERS_IN_PROGRESS: {
            return {
                ...state,
                searchingUsers: true,
                searchingUsersFailed: false,
                users: []
            };
        }
        case SEARCH_USERS_SUCCESS: {
            return {
                ...state,
                searchingUsers: false,
                searchingUsersFailed: false,
                users: payload
            };
        }
        case SEARCH_USERS_FAILURE: {
            return {
                ...state,
                searchingUsers: true,
                searchingUsersFailed: false,
                users: []
            };
        }
        case CLEAR_FOUND_USERS: {
            return {
                ...state,
                searchingUsers: false,
                searchingUsersFailed: false,
                users: []
            };
        }
        default: 
            return state;
    }
}