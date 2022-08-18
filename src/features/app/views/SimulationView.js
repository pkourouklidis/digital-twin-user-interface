import React, { useEffect, useContext } from 'react';
import StatusCards from '../components/StatusCards/StatusCards'
import ConfigurationCards from '../components/ConfigurationCards/ConfigurationCards'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import { loadSimulation, loadSettings } from '../thunks';


const SimulationView = ({ startLoadingSimulation, startLoadingSettings }) => {

    const auth = useContext(AuthenticationContext);

    useEffect(() => { 
        startLoadingSimulation(auth);
        setInterval(() => {startLoadingSimulation(auth)}, 5000); 
    }, []);

    useEffect(() => { 
        startLoadingSettings(auth);
    }, []);

    return (
        <Grid container>
            <Grid item xs={1}>
                <StatusCards />
            </Grid>
            <Grid item xs={10}>
                <ConfigurationCards />
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => ({
    startLoadingSimulation: (authContext) => dispatch(loadSimulation(authContext)),
    startLoadingSettings: (authContext) => dispatch(loadSettings(authContext)),
})

export default connect(null, mapDispatchToProps)(SimulationView);