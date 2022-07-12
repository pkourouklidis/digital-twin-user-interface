import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { addProject } from '../../thunks';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Grid from '@material-ui/core/Grid';

const NewProject = (props) => {

    const auth = useContext(AuthenticationContext);
    const history = useHistory();

    const { onClose, open, createProject } = props;

    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const [projectName, setProjectName] = React.useState("");
    const [projectDescription, setProjectDescription] = React.useState("");

    const [projectNameErrorText, setProjectNameErrorText] = React.useState("");
    const [projectDescriptionErrorText, setProjectDescriptionErrorText] = React.useState("");

    useEffect(() => {
        if (!open) {
            setProjectNameErrorText("");
            setProjectDescriptionErrorText("");
            setProjectName("");
            setProjectDescription("");
        }
      }, [open])

    const handleApply = () => {
        var invalid = false;
        setProjectNameErrorText("");
        setProjectDescriptionErrorText("");

        if (projectName == "") {
            invalid = true;
            setProjectNameErrorText("Project name cannot be empty");
        }

        if (projectDescription == "") {
            invalid = true;
            setProjectDescriptionErrorText("Project description cannot be empty");
        }

        if (!invalid) {
            const project = {
                name: projectName,
                description: projectDescription
            }
            createProject(project, history, auth);
            onClose(true);
        }
    };

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="new-resource-dialog" open={open} maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle id="new-project-dialog" >
                <Grid container>
                    <Grid item xs={1}>
                        <AccountTreeIcon color="primary" fontSize="large"/>
                    </Grid>
                    <Grid item xs={11}>
                        New Project
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>

                <TextField
                    error ={projectNameErrorText.length === 0 ? false : true }
                    helperText={projectNameErrorText}
                    required
                    id="new-project-name"
                    label="Project Name"
                    style={{ minWidth: "100%" }}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)} /><br /><br />

                <TextField
                    error ={projectDescriptionErrorText.length === 0 ? false : true }
                    helperText={projectDescriptionErrorText}
                    required
                    multiline
                    rows={5}
                    label="Project Description"
                    id="new-project-description"
                    style={{ minWidth: "100%" }}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"><Box fontWeight="fontWeightBold">Cancel</Box></Button>
                <Button onClick={handleApply} color="primary" autoFocus><Box fontWeight="fontWeightBold">Apply</Box></Button>
            </DialogActions>
        </Dialog>
    );
}

const mapDispatchToProps = dispatch => ({
    createProject: (project, history, authContext) => dispatch(addProject(project, history, authContext))
})

export default connect(null , mapDispatchToProps)(NewProject);