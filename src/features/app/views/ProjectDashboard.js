import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setSuccessMessage, setFailureMessage, setWarningMessage, setInfoMessage } from '../../kleio/thunks';
import { getProject } from '../../kleio/selectors';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
        padding: theme.spacing(10)
    },
    spinner: {
        margin: theme.spacing(5)
    }
}));

const ProjectDashboard = ({ project, successMessage, failureMessage, warningMessage, infoMessage }) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Typography align="center" style={{ color: 'lightgrey', fontSize: '25px', lineHeight: '120px' }} >
                    You can add your content here when a project has been loaded.<br/>
                    Example of getting the project name from Redux state: { project != undefined ? project.name : "" }
                </Typography>
            <Button onClick={() => successMessage("example success message")} color="primary">
                <Box fontWeight="fontWeightBold">click for success message</Box>
            </Button>
            <Button onClick={() => failureMessage("example failure message")} color="primary">
                <Box fontWeight="fontWeightBold">click for failure message</Box>
            </Button>
            <Button onClick={() => warningMessage("example warning message")} color="primary">
                <Box fontWeight="fontWeightBold">click for warning message</Box>
            </Button>
            <Button onClick={() => infoMessage("example info message")} color="primary">
                <Box fontWeight="fontWeightBold">click for info message</Box>
            </Button>
            </div>
        </React.Fragment>);
}

const mapStateToProps = state => ({
    project: getProject(state)
});

const mapDispatchToProps = dispatch => ({
    successMessage: (message) => dispatch(setSuccessMessage(message)),
    failureMessage: (message) => dispatch(setFailureMessage(message)),
    warningMessage: (message) => dispatch(setWarningMessage(message)),
    infoMessage: (message) => dispatch(setInfoMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboard);