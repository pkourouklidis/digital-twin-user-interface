import React, { useContext }  from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getProjectLoading, getProject, getUserDetails } from '../../selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import {useHistory} from 'react-router-dom';
import { deleteProject, resetFoundUsers, updateProjectOwners } from '../../thunks';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import SharingDialog from '../SharingDialog/SharingDialog';

const ProjectDetails = ({ isLoading, project, removeProject, editProjectOwners, userDetails, clearFoundUsers, toggle }) => {
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [shareOpen, setShareOpen] = React.useState(false);

    const auth = useContext(AuthenticationContext);
    const history = useHistory();

    const handleConfirmClickOpen = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleApply = () => {
        removeProject(project.id, history, auth)
        setConfirmOpen(false);
        toggle();
    }

    const handleShareClickOpen = () => {
        setShareOpen(true);
    };

    const handleShareClose = () => {
        clearFoundUsers();
        setShareOpen(false);
    };
    
    const content = (
        <Box border={0}>
            <Grid container style={{ marginBottom: 10 }} width="100%">
                <Grid item xs={1}>
                    <AccountTreeIcon color="primary" fontSize="large"/>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6" component="h4">
                        { project !== undefined  && Object.keys(project).length != 0 ? project.name : "No Project Loaded" }
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Tooltip title="Add collaborators">
                        <IconButton onClick={() => handleShareClickOpen()} size="small"style={{ marginLeft: 40 ,marginRight: 5 }} ><PersonAddIcon color="primary" fontSize="medium"/></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete project">
                        <IconButton size="small" onClick={() => handleConfirmClickOpen()}><DeleteIcon color="primary" fontSize="medium"/></IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            { project !== undefined  && Object.keys(project).length != 0 ? project.description : "" }
            <ConfirmationDialog open={confirmOpen} msg="You are about to remove this project from your profile. Are you sure?" apply={handleApply} onClose={handleConfirmClose} />
            <SharingDialog open={shareOpen} onClose={handleShareClose} clearSearchedOwners={() => clearFoundUsers()} owners={project.users} user={userDetails} update={(owners) => editProjectOwners(owners, project.id, auth)} />
        </Box>
    );

    const spinner = <Box style={{ width: 100, height: 100 }} ><div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} ><CircularProgress color="primary" /></div></Box>;  
    return isLoading ? spinner : content;
}

const mapStateToProps = state => ({
    isLoading: getProjectLoading(state),
    project: getProject(state),
    userDetails: getUserDetails(state)
});

const mapDispatchToProps = dispatch => ({
    removeProject: (id, history, auth) => dispatch(deleteProject(id, history, auth)),
    editProjectOwners: (owners, projectid, auth) => dispatch(updateProjectOwners(owners, projectid, auth)),
    clearFoundUsers: () => dispatch(resetFoundUsers())
  })

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);