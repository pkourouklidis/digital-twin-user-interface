export const fetchSimulation = async (gatewayURL, authContext) => {
    const simulationURL = `${gatewayURL}/simulation/status`;
    const token = await authContext.issueAccessToken();
    const simulationResponse = await fetch(simulationURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (simulationResponse.status > 199 && simulationResponse.status < 300) {
        const simulationJson = await simulationResponse.json();
        return simulationJson;   
    } else {
        return {};
    }
}

export const fetchSettings = async (gatewayURL, authContext) => {
    const settingsURL = `${gatewayURL}/simulation/settings`;
    const token = await authContext.issueAccessToken();
    const settingsResponse = await fetch(settingsURL, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (settingsResponse.status > 199 && settingsResponse.status < 300) {
        const settingsJson = await settingsResponse.json();
        return settingsJson;   
    } else {
        return {};
    }
}

export const apiStopSimulation = async (gatewayURL, authContext) => {
    const url = `${gatewayURL}/simulation/stop`;
    const token = await authContext.issueAccessToken();
    const response = await fetch(url, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (response.status > 199 && response.status < 300) {
        return true;  
    } else {
        return false;
    }
}

export const apiPauseSimulation = async (gatewayURL, authContext) => {
    const url = `${gatewayURL}/simulation/pause`;
    const token = await authContext.issueAccessToken();
    const response = await fetch(url, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    });
    if (response.status > 199 && response.status < 300) {
        return true;  
    } else {
        return false;
    }
}

export const apiUpdateSimulation = async (gatewayURL, settings, authContext) => {
    const url = `${gatewayURL}/simulation/update`;
    const token = await authContext.issueAccessToken();
    const response = await fetch(url, {
        method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(settings)
    });
    if (response.status > 199 && response.status < 300) {
        return true;  
    } else {
        return false;
    }
}

export const apiStartSimulation = async (gatewayURL, authContext) => {
    const url = `${gatewayURL}/simulation/start`;
    const token = await authContext.issueAccessToken();
    const response = await fetch(url, {
        method: 'GET',
            headers: {
                'Authorization': token,
            }
    });
    if (response.status > 199 && response.status < 300) {
        return true;  
    } else {
        return false;
    }
}

export const apiCreateSimulation = async (gatewayURL, settings, authContext) => {
    const url = `${gatewayURL}/simulation/create`;
    const token = await authContext.issueAccessToken();
    const response = await fetch(url, {
        method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(settings)
    });
    if (response.status > 199 && response.status < 300) {
        return true;  
    } else {
        return false;
    }
}