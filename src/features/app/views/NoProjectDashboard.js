import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
        padding: theme.spacing(10)
    },
    spinner: {
        margin: theme.spacing(5)
    }
}));

const NoProjectDashboard = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Typography align="center" style={{ color: 'lightgrey', fontSize: '25px', lineHeight: '120px' }} >
                    <br/>You can add your content here when the workbench has been opened but no projects have been loaded.
                </Typography>
            </div>
        </React.Fragment>);
}

export default NoProjectDashboard;