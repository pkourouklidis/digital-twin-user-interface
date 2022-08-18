// import React from 'react';
import './App.css';
import { useEffect } from 'react';
import Header from './features/kleio/components/header/header';
import SimulationView from './features/app/views/SimulationView';
import ToastSuccessMessage from './features/kleio/components/ToastMessage/ToastSuccessMessage';
import ToastFailureMessage from './features/kleio/components/ToastMessage/ToastFailureMessage';
import ToastWarningMessage from './features/kleio/components/ToastMessage/ToastWarningMessage';
import ToastInfoMessage from './features/kleio/components/ToastMessage/ToastInfoMessage';

const App = () => {
  useEffect(() => { document.title = process.env.REACT_APP_NAME }, [])

  return (
    <div>
      <Header showHamburgerMenuButton={process.env.REACT_APP_HAMBURGER_MENU != undefined && process.env.REACT_APP_HAMBURGER_MENU == "yes"} />
      <SimulationView />
      <ToastSuccessMessage />
      <ToastFailureMessage />
      <ToastWarningMessage />
      <ToastInfoMessage />
    </div>
  );
}

export default App;