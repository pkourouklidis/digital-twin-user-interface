import React from 'react';
import Grid from '@material-ui/core/Grid';
import CallCard from './CallCard'
import CustomerCard from './CustomerCard';
import WorkerCard from './WorkerCard';

const ConfigurationCards = () => {
    return (
        <Grid container style={{ marginLeft: 50 }} >
            <Grid item xs={4}>
                <CallCard />
            </Grid>
            <Grid item xs={4}>
                <CustomerCard />
            </Grid>
            <Grid item xs={4}>
            <WorkerCard />
            </Grid>
        </Grid>
    )
}

export default ConfigurationCards;