export const postProject = async (gatewayURL, project, authContext) => {
    const projectURL = `${gatewayURL}/project`;
    const token = await authContext.issueAccessToken();
    const projectResponse = await fetch(projectURL, {
        method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
    });
    const projectJson = await projectResponse.json();
    return projectJson;
}

export const removeProject = async (gatewayURL, projectid, authContext) => {
    const projectURL = `${gatewayURL}/project/${projectid}`;
    const token = await authContext.issueAccessToken();
    const projectResponse = await fetch(projectURL, {
        method: 'DELETE',
            headers: {
                'Authorization': token
            }
    });
    return projectResponse.status > 199 && projectResponse.status < 300;
}

export const fetchProjects = async (gatewayURL, authContext) => {
    const projectsURL = `${gatewayURL}/project`;
    const token = await authContext.issueAccessToken();
    const projectsResponse = await fetch(projectsURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (projectsResponse.status > 199 && projectsResponse.status < 300) {
        const projectsJson = await projectsResponse.json();
        return projectsJson;   
    } else {
        return [];
    }
}

export const fetchProject = async (gatewayURL, projectid, authContext) => {
    const projectURL = `${gatewayURL}/project/${projectid}`;
    const token = await authContext.issueAccessToken();
    const projectResponse = await fetch(projectURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (projectResponse.status > 199 && projectResponse.status < 300) {
        const projectJson = await projectResponse.json();
        return projectJson;   
    } else {
        return {};
    }
}

export const setProjectOwners = async (gatewayURL, owners, projectid, authContext) => {
    const projectURL = `${gatewayURL}/project/${projectid}/users`;
    const token = await authContext.issueAccessToken();
    const projectResponse = await fetch(projectURL, {
        method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(owners)
    });
    return projectResponse.status >= 200 && projectResponse.status <= 299;
}

export const fetchNotifications = async (gatewayURL, authContext) => {
    const notificationsURL = `${gatewayURL}/notification`;
    const token = await authContext.issueAccessToken();
    const notificationsResponse = await fetch(notificationsURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    const notificationsJson = await notificationsResponse.json();
    return notificationsJson;
}

export const removeAllNotifications = async (gatewayURL, authContext) => {
    const notificationsURL = `${gatewayURL}/notification`;
    const token = await authContext.issueAccessToken();
    const notificationsResponse = await fetch(notificationsURL, {
        method: 'DELETE',
            headers: {
                'Authorization': token
            }
    });
    return notificationsResponse.status >= 200 && notificationsResponse.status <= 299;
}

export const removeNotification = async (gatewayURL, id, authContext) => {
    const notificationURL = `${gatewayURL}/notification/${id}`;
    const token = await authContext.issueAccessToken();
    const notificationResponse = await fetch(notificationURL, {
        method: 'DELETE',
            headers: {
                'Authorization': token
            }
    });
    return notificationResponse.status >= 200 && notificationResponse.status <= 299;
}

export const fetchWorkBenches = async (gatewayURL, authContext) => {
    const token = await authContext.issueAccessToken();
    const workBenchesResponse = await fetch(`${gatewayURL}/workbench`, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (workBenchesResponse.status > 199 && workBenchesResponse.status < 300) {
        const workBenchesJson = await workBenchesResponse.json();
        return workBenchesJson;    
    } else {
        return [];
    }
}

export const postRepository = async (gatewayURL, repoDetails, projectid, authContext) => {
    const url = `${gatewayURL}/project/${projectid}/repository`;
    const token = await authContext.issueAccessToken();
    const repoResponse = await fetch(url, {
        method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(repoDetails)
    });
    await repoResponse.json();
    return repoResponse.status > 199 && repoResponse.status < 300;
}

export const postDeployment = async (gatewayURL, deploymentDetails, projectid, authContext) => {
    const url = `${gatewayURL}/project/${projectid}/deployment`;
    const token = await authContext.issueAccessToken();
    const deploymentResponse = await fetch(url, {
        method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(deploymentDetails)
    });
    await deploymentResponse.json();
    return deploymentResponse.status > 199 && deploymentResponse.status < 300;
}

export const fetchUsers = async (gatewayURL, key, excludes, authContext) => {
    var excludesStr = encodeURIComponent(JSON.stringify(excludes));
    const searchURL = `${gatewayURL}/user?q=${key}&limit=5&excludes=${excludesStr}`;
    const token = await authContext.issueAccessToken();
    const searchResponse = await fetch(searchURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (searchResponse.status > 199 && searchResponse.status < 300) {
        const searchJson = await searchResponse.json();
        return searchJson;   
    } else {
        return [];
    }
}

export const removeElement = async (gatewayURL, elementType, elementId, projectId, authContext) => {
    const deleteURL = `${gatewayURL}/project/${projectId}/${elementType}/${elementId}`;
    const token = await authContext.issueAccessToken();
    const deleteResponse = await fetch(deleteURL, {
        method: 'DELETE',
            headers: {
                'Authorization': token
            }
    });
    return (deleteResponse.status > 199 && deleteResponse.status < 300);
}

export const editRepository = async (gatewayURL, repoDetails, projectid, repoId, authContext) => {
    const url = `${gatewayURL}/project/${projectid}/repository/${repoId}`;
    const token = await authContext.issueAccessToken();
    const repoResponse = await fetch(url, {
        method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(repoDetails)
    });
    await repoResponse.json();
    return repoResponse.status > 199 && repoResponse.status < 300;
}

export const editDeployment = async (gatewayURL, deploymentDetails, projectid, deploymentId, authContext) => {
    const url = `${gatewayURL}/project/${projectid}/deployment/${deploymentId}`;
    const token = await authContext.issueAccessToken();
    const deploymentResponse = await fetch(url, {
        method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(deploymentDetails)
    });
    await deploymentResponse.json();
    return deploymentResponse.status > 199 && deploymentResponse.status < 300;
}

export const fetchUserDetails = async (gatewayURL, authContext) => {
    const userURL = `${gatewayURL}/user`;
    const token = await authContext.issueAccessToken();
    const userResponse = await fetch(userURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (userResponse.status > 199 && userResponse.status < 300) {
        const userJson = await userResponse.json();
        return userJson;   
    } else {
        return {};
    }
}

export const setAllowEmailNotifications = async (gatewayURL, allow, authContext) => {
    const url = `${gatewayURL}/user/`;
    const token = await authContext.issueAccessToken();
    const updateResponse = await fetch(url, {
        method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ "allowEmailNotifications": allow })
    });
    return updateResponse.status > 199 && updateResponse.status < 300;
}