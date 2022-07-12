import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Switch } from "react-router-dom";

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import { Provider } from 'react-redux';
import { configureStore } from './store';

const store = configureStore();

import {
    AuthenticationRouter,
    OIDCAuthenticationProvider,
    ProtectedRoute
} from '@BETALAB/betalab-react-auth';

const theme = createTheme({
    palette: {
        background: {
            default: "#f9f9f9",
            paper: "#ffffff"
        },
    primary: {
        light: '#fff',
        main: '#5514B4',
        dark: '#000'
    },
    secondary: {
        light: '#5514B4',
        main: '#E60050',
        dark: '#000'
    }
    },
    typography: { 
        useNextVariants: true,
        fontSize: 12
    },
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                marginTop: 64
            }
        }
    } 
});

const loadApplication = () => {
    
    const providerConfig = {
        providerBaseUrl: process.env.REACT_APP_AUTH_PROVIDER_URL,
        clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
        tenantId: process.env.REACT_APP_AUTH_TENANT_ID,
        scopes: process.env.REACT_APP_AUTH_SCOPES ? process.env.REACT_APP_AUTH_SCOPES.split(",") : [],
        role: process.env.REACT_APP_AUTH_ROLE
    }
    
    ReactDOM.render(
        <React.StrictMode>
            <MuiThemeProvider theme = { theme }>
                <CssBaseline />
                <Provider store={store}>
                    <AuthenticationRouter
                        provider={OIDCAuthenticationProvider}
                        providerConfig={providerConfig}
                        successPath="/"
                        loggedOutPath="/"
                        authBasePath="/auth"
                        errorComponent={() => "Error signing in!"}
                    >
                        <Switch>
                            <ProtectedRoute
                                path="/"
                                render={() => <App />} />
                        </Switch>
                    </AuthenticationRouter>
                </Provider>
            </MuiThemeProvider>
        </React.StrictMode>, document.getElementById('root'));

}

// Load the application config and then kick-off loading the application
const bootstrapEnv = async (loadAppFunc) => {

    // Load the configuration file
    let response = await (await fetch(`/config.json`)).json();

    // Mount the config on process.env
    process.env = Object.assign(process.env, response);

    // Launch the application
    loadAppFunc();

}

bootstrapEnv(loadApplication);
