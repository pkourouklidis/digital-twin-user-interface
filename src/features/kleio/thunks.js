import {
    postProject,
    removeProject,
    fetchProjects,
    fetchProject,
    setProjectOwners,
    postRepository,
    postDeployment,
    fetchNotifications,
    fetchWorkBenches,
    removeAllNotifications,
    removeNotification,
    fetchUsers,
    removeElement,
    editDeployment,
    editRepository,
    fetchUserDetails,
    setAllowEmailNotifications
} from './api';

import {
    addProjectInProgress,
    addProjectSuccess,
    addProjectFailure,
    loadProjectsInProgress,
    loadProjectsSuccess,
    loadProjectsFailure,
    loadProjectInProgress,
    loadProjectSuccess,
    loadProjectFailure,
    clearProject,
    setSuccessMsg,
    setFailureMsg,
    setWarningMsg,
    setInfoMsg,
    setUserDetails,
    loadNotificationsInProgress,
    loadNotificationsSuccess,
    loadNotificationsFailure,
    loadWorkBenchesInProgress,
    loadWorkBenchesSuccess,
    loadWorkBenchesFailure,
    searchUsersInProgress,
    searchUsersSuccess,
    searchUsersFailure,
    clearFoundUsers
} from './actions';

export const addProject = (project, history, authContext) => async (dispatch) => {
    try {
        dispatch(addProjectInProgress());
        const addedProject = await postProject(process.env.REACT_APP_GATEWAY_URL, project, authContext);
        dispatch(addProjectSuccess(addedProject));
        dispatch(setSuccessMessage("Project successfully created"));
        history.push(`/project/${addedProject.id}`);
        dispatch(loadProjects(authContext));
    } catch (e) {
        dispatch(addProjectFailure());
        dispatch(setFailureMessage("Error when trying to create new project"));
    }    
}

export const deleteProject = (projectid, history, authContext) => async (dispatch) => {
    try {
        const addOk = await removeProject(process.env.REACT_APP_GATEWAY_URL, projectid, authContext);
        if (addOk) {
            dispatch(setSuccessMessage("Project successfully deleted"));
            dispatch(clearProjectDetails());
            dispatch(loadProjects(authContext));
            history.push(`/`);
        } else {
            dispatch(setFailureMessage("Error when trying to delete project"));
        }
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to delete project"));
    }    
}

export const clearProjectDetails = () => async (dispatch) => {
    dispatch(clearProject());
}

export const resetProject = () => {
    // clearProject();
}

export const loadProjects = (authContext) => async (dispatch) => {
    try {
        dispatch(loadProjectsInProgress());
        const projects = await fetchProjects(process.env.REACT_APP_GATEWAY_URL, authContext);
        dispatch(loadProjectsSuccess(projects)); 
    } catch (e) {
        dispatch(loadProjectsFailure());
    }    
}

export const loadProject = (projectId, authContext) => async (dispatch) => {
    try {
        dispatch(loadProjectInProgress());
        const project = await fetchProject(process.env.REACT_APP_GATEWAY_URL, projectId, authContext);
        dispatch(loadProjectSuccess(project)); 
    } catch (e) {
        dispatch(loadProjectFailure());
        dispatch(setFailureMessage("Error when trying to load project"));
    }    
}

export const updateProjectOwners = (owners, projectId, authContext) => async (dispatch) => {
    try {
        const result = await setProjectOwners(process.env.REACT_APP_GATEWAY_URL, owners, projectId, authContext);
        if (result) {
            dispatch(setSuccessMessage("Sharing details successfully updated"));
            dispatch(loadProject(projectId, authContext));
        } else {
            dispatch(setFailureMessage("Could not update sharing details"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to updating sharing details"));
    }  
}

export const updateAllowEmailNotifications = (allow, authContext) => async (dispatch) => {
    try {
        const result = await setAllowEmailNotifications(process.env.REACT_APP_GATEWAY_URL, allow, authContext);
        if (result) {
            dispatch(updateUserDetails(authContext));
        } else {
            dispatch(setFailureMessage("Could not update user settings"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to updating user settings"));
    }  
}

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

export const updateUserDetails = (authContext) => async (dispatch) => {
    try {
        const result = await fetchUserDetails(process.env.REACT_APP_GATEWAY_URL, authContext);
        dispatch(setUserDetails(result));   
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to retrieve user details"));
    }  
    
}

export const loadNotifications = (authContext) => async (dispatch) => {
    try {
        dispatch(loadNotificationsInProgress());
        const notifications = await fetchNotifications(process.env.REACT_APP_GATEWAY_URL, authContext);
        dispatch(loadNotificationsSuccess(notifications));
    } catch (e) {
        dispatch(loadNotificationsFailure());
    }    
}

export const clearNotifications = (authContext) => async (dispatch) => {
    if (await removeAllNotifications(process.env.REACT_APP_GATEWAY_URL, authContext)) {
        dispatch(loadNotifications(authContext));
    }
}

export const clearNotification = (id, authContext) => async (dispatch) => {
    if (await removeNotification(process.env.REACT_APP_GATEWAY_URL, id, authContext)) {
        dispatch(loadNotifications(authContext));
    }
}

export const processNotificationIntent = (intent, history) => async () => {
    try {
        let url = new URL(intent);
        if (window.location.hostname == url.hostname) {
            history.push(url.pathname);
        } else {
            window.location.replace(intent);
        }
    } catch(e) {
        history.push(intent);
    }
}

export const loadWorkBenches = (authContext) => async (dispatch) => {
    try {
        dispatch(loadWorkBenchesInProgress());
        const workbenches = await fetchWorkBenches(process.env.REACT_APP_GATEWAY_URL, authContext);
        dispatch(loadWorkBenchesSuccess(workbenches));
    } catch (e) {
        dispatch(loadWorkBenchesFailure());
    }    
}

export const switchWorkBench = (workbenchUrl, projectId) => async () => {
    projectId ? 
    window.location.replace(`${workbenchUrl}/project/${projectId}`) :
    window.location.replace(workbenchUrl);
}

export const addRepository = (repoDetails, projectid, authContext) => async (dispatch) => {
    try {
        const result = await postRepository(process.env.REACT_APP_GATEWAY_URL, repoDetails, projectid, authContext);
        if (result) {
            dispatch(setSuccessMessage("Repository successfully added"));
            dispatch(loadProject(projectid, authContext));
        } else {
            dispatch(setFailureMessage("Could not add new repository"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to add new repository"));
    }    
}

export const addDeployment = (deploymentDetails, projectid, authContext) => async (dispatch) => {
    try {
        const result = await postDeployment(process.env.REACT_APP_GATEWAY_URL, deploymentDetails, projectid, authContext);
        if (result) {
            dispatch(setSuccessMessage("Deployment successfully added"));
            dispatch(loadProject(projectid, authContext));
        } else {
            dispatch(setFailureMessage("Could not add new deployment"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to add new deployment"));
    }    
}

export const searchUsers = (key, excludes, authContext) => async (dispatch) => {
    try {
        dispatch(searchUsersInProgress());
        const users = await fetchUsers(process.env.REACT_APP_GATEWAY_URL, key, excludes, authContext);
        dispatch(searchUsersSuccess(users)); 
    } catch (e) {
        dispatch(searchUsersFailure());
    }    
}

export const resetFoundUsers = () => async (dispatch) => {
    dispatch(clearFoundUsers());
}

export const deleteElement = (elementType, elementId, projectId, authContext) => async (dispatch) => {
    try {
        const result = await removeElement(process.env.REACT_APP_GATEWAY_URL, elementType, elementId, projectId, authContext);
        if (result) {
            dispatch(setSuccessMessage("Successfully deleted " + elementType));
            dispatch(loadProject(projectId, authContext));
        } else {
            dispatch(setFailureMessage("Could not delete " + elementType));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to delete " + elementType));
    }    
}

export const updateDeployment = (deploymentDetails, projectId, deploymentId, authContext) => async (dispatch) => {
    try {
        const result = await editDeployment(process.env.REACT_APP_GATEWAY_URL, deploymentDetails, projectId, deploymentId, authContext);
        if (result) {
            dispatch(setSuccessMessage("Successfully updated deployment"));
            dispatch(loadProject(projectId, authContext));
        } else {
            dispatch(setFailureMessage("Could not update deployment"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to update deployment"));
    }    
}

export const updateRepository = (repositoryDetails, projectId, repoId, authContext) => async (dispatch) => {
    try {
        const result = await editRepository(process.env.REACT_APP_GATEWAY_URL, repositoryDetails, projectId, repoId, authContext);
        if (result) {
            dispatch(setSuccessMessage("Successfully updated repository"));
            dispatch(loadProject(projectId, authContext));
        } else {
            dispatch(setFailureMessage("Could not update repository"));
        }        
    } catch (e) {
        dispatch(setFailureMessage("Error when trying to update repository"));
    }    
}