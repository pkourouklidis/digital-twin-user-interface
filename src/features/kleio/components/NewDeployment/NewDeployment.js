import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { getProject } from '../../selectors';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import { addDeployment } from '../../thunks';
import Grid from '@material-ui/core/Grid';
import KubernetesLogo from '../ProjectElements/KubernetesLogo';

const NewDeployment = ({ onClose, open, project, startAddingDeployment }) => {
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const auth = React.useContext(AuthenticationContext);

    const [deploymentName, setDeploymentName] = React.useState("");
    const [deploymentDescription, setDeploymentDescription] = React.useState("");
    const [deploymentUrl, setDeploymentUrl] = React.useState("");
    const [deploymentId, setDeploymentId] = React.useState("");
    const [deploymentToken, setDeploymentToken] = React.useState("");
    const [nameErrorText, setNameErrorText] = React.useState("");
    const [descriptionErrorText, setDescriptionErrorText] = React.useState("");
    const [urlErrorText, setUrlErrorText] = React.useState("");
    const [idErrorText, setIdErrorText] = React.useState("");
    const [tokenErrorText, setTokenErrorText] = React.useState("");

    const handleApply = (name, id, description, url, token) => {
        var invalid = false;

        setNameErrorText("");
        setIdErrorText("");
        setDescriptionErrorText("");
        setUrlErrorText("");
        setTokenErrorText("");

        if (name == "") {
            setNameErrorText("Name cannot be empty");
            invalid = true;
        }

        if (id == "") {
            setIdErrorText("Namespace ID cannot be empty");
            invalid = true;
        }

        if (description == "") {
            setDescriptionErrorText("Description cannot be empty");
            invalid = true;
        }

        if (url == "") {
            setUrlErrorText("Url cannot be empty");
            invalid = true;
        } else {
            try {
                new URL(url);
            } catch (_) {
                setUrlErrorText("Not a valid URL"); 
                invalid = true;
            }
        }

        if (token == "") {
            setTokenErrorText("Token cannot be empty");
            invalid = true;
        }

        if (!invalid) {
            let deploymentDetails = {
                "name": name,
                "description": description,
                "url": url,
                "nameSpaceId": id,
                "token": token
            }
            startAddingDeployment(deploymentDetails, project.id, auth);
        }
    };

    const handleClose = () => {
        setDeploymentName("");
        setDeploymentDescription("");
        setDeploymentUrl("");
        setDeploymentId("");
        setDeploymentToken("");
        setNameErrorText("");
        setDescriptionErrorText("");
        setUrlErrorText("");
        setIdErrorText("");
        setTokenErrorText("");
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="new-deployment-dialog" open={open} maxWidth={maxWidth} fullWidth={fullWidth} scroll="body">
          <DialogTitle id="new-deployment-dialog-title" >
                <Grid container>
                    <Grid item xs={1}>
                        <KubernetesLogo height="28px" />
                    </Grid>
                    <Grid item xs={11}>
                    New Deployment
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <TextField
                    error ={nameErrorText.length === 0 ? false : true }
                    helperText={nameErrorText}
                    required
                    id="new-deployment-name"
                    label="Name"
                    style={{minWidth: "100%"}}
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={descriptionErrorText.length === 0 ? false : true }
                    helperText={descriptionErrorText}
                    required
                    multiline
                    rows={2}
                    id="new-deployment-description"
                    label="Description"
                    style={{minWidth: "100%"}}
                    value={deploymentDescription}
                    onChange={(e) => setDeploymentDescription(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={urlErrorText.length === 0 ? false : true }
                    helperText={urlErrorText}
                    required
                    id="new-deployment-url"
                    label="URL"
                    style={{minWidth: "100%"}}
                    value={deploymentUrl}
                    onChange={(e) => setDeploymentUrl(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={idErrorText.length === 0 ? false : true }
                    helperText={idErrorText}
                    required
                    id="new-deployment-id"
                    label="Namespace ID"
                    style={{minWidth: "100%"}}
                    value={deploymentId}
                    onChange={(e) => setDeploymentId(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={tokenErrorText.length === 0 ? false : true }
                    helperText={tokenErrorText}
                    required
                    id="new-deployment-token"
                    label="Token"
                    style={{minWidth: "100%"}}
                    value={deploymentToken}
                    onChange={(e) => setDeploymentToken(e.target.value)}
                    /><br/><br/><br/>
            </DialogContent>
          <DialogActions>
              <Button onClick={handleClose} color="primary"><Box fontWeight="fontWeightBold">Cancel</Box></Button>
              <Button onClick={() => handleApply(deploymentName, deploymentId, deploymentDescription, deploymentUrl, deploymentToken)} color="primary" autoFocus><Box fontWeight="fontWeightBold">Apply</Box></Button>
          </DialogActions>
      </Dialog>
    );
}

const mapStateToProps = state => ({
    project: getProject(state)
});

const mapDispatchToProps = dispatch => ({
    startAddingDeployment: (deploymentDetails, projectId, authContext) => dispatch(addDeployment(deploymentDetails, projectId, authContext))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewDeployment);