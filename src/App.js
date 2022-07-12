// import React from 'react';
import './App.css';
import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import Header from './features/kleio/components/header/header';
import { ProtectedRoute } from "@BETALAB/betalab-react-auth";
import { Switch, Redirect } from "react-router-dom";
import NoProjectDashboard from './features/app/views/NoProjectDashboard';
import ProjectView from './features/kleio/views/ProjectView';
import WelcomeView from './features/kleio/views/WelcomeView';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import { updateUserDetails } from './features/kleio/thunks';
import { loadProjects } from './features/kleio/thunks';
import ToastSuccessMessage from './features/kleio/components/ToastMessage/ToastSuccessMessage';
import ToastFailureMessage from './features/kleio/components/ToastMessage/ToastFailureMessage';
import ToastWarningMessage from './features/kleio/components/ToastMessage/ToastWarningMessage';
import ToastInfoMessage from './features/kleio/components/ToastMessage/ToastInfoMessage';

const App = ({setUserDetails, startLoadingProjects}) => {
  const auth = useContext(AuthenticationContext);
  useEffect(() => { document.title = process.env.REACT_APP_NAME }, [])
  useEffect(() => setUserDetails(auth), []);
  useEffect(() => startLoadingProjects(auth), []);

  return (
    <div>
      <Header showHamburgerMenuButton={process.env.REACT_APP_HAMBURGER_MENU != undefined && process.env.REACT_APP_HAMBURGER_MENU == "yes"} />
      <Switch>
        <Redirect from='/project/' to='/' exact />
        <ProtectedRoute
              path="/project/:projectid"
              render={({match}) => <ProjectView projectId={match.params.projectid} />} />
        <ProtectedRoute
              path="/welcome"
              render={() => <WelcomeView />} />
        <ProtectedRoute
            path="/"
            render={() => <NoProjectDashboard />} />
      </Switch>
      <ToastSuccessMessage />
      <ToastFailureMessage />
      <ToastWarningMessage />
      <ToastInfoMessage />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setUserDetails: (auth) => dispatch(updateUserDetails(auth)),
  startLoadingProjects: (authContext) => dispatch(loadProjects(authContext))
})

export default connect(null, mapDispatchToProps)(App);