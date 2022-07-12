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
import { addRepository } from '../../thunks';
import Grid from '@material-ui/core/Grid';
import GitLabLogo from '../ProjectElements/GitLabLogo';

const NewRepository = ({ onClose, open, project, startAddingRepository }) => {
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const auth = React.useContext(AuthenticationContext);

    const [repoName, setRepoName] = React.useState("");
    const [repoDescription, setRepoDescription] = React.useState("");
    const [repoSrcPath, setRepoSrcPath] = React.useState("");
    const [repoUrl, setRepoUrl] = React.useState("");
    const [repoToken, setRepoToken] = React.useState("");
    const [nameErrorText, setNameErrorText] = React.useState("");
    const [descriptionErrorText, setDescriptionErrorText] = React.useState("");
    const [srcPathErrorText, setSrcPathErrorText] = React.useState("");
    const [urlErrorText, setUrlErrorText] = React.useState("");

    const handleApply = (name, description, srcPath, url, token) => {
        var invalid = false;

        setNameErrorText("");
        setDescriptionErrorText("");
        setSrcPathErrorText("");
        setUrlErrorText("");

        if (name == "") {
            setNameErrorText("Name cannot be empty");
            invalid = true;
        }

        if (description == "") {
            setDescriptionErrorText("Description cannot be empty");
            invalid = true;
        }

        if (srcPath == "") {
            setSrcPathErrorText("Code source path cannot be empty");
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

        if (!invalid) {
            let repoDetails = {
                "name": name,
                "description": description,
                "relativeCodePath": srcPath,
                "url": url,
                "token": token
            }
            startAddingRepository(repoDetails, project.id, auth);
        }
    };

    const handleClose = () => {
        setRepoName("");
        setRepoDescription("");
        setRepoSrcPath("");
        setRepoUrl("");
        setRepoToken("");
        setNameErrorText("");
        setDescriptionErrorText("");
        setSrcPathErrorText("");
        setUrlErrorText("");
        onClose();
    };
    
                    

    return (
        <Dialog onClose={handleClose} aria-labelledby="new-repo-dialog" open={open} maxWidth={maxWidth} fullWidth={fullWidth} scroll="body">
          <DialogTitle id="new-repo-dialog-title" >
                <Grid container>
                    <Grid item xs={1}>
                        <GitLabLogo height="24px" />
                    </Grid>
                    <Grid item xs={11}>
                    New Repository
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <TextField
                    error ={nameErrorText.length === 0 ? false : true }
                    helperText={nameErrorText}
                    required
                    id="new-repo-name"
                    label="Name"
                    style={{minWidth: "100%"}}
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={descriptionErrorText.length === 0 ? false : true }
                    helperText={descriptionErrorText}
                    required
                    multiline
                    rows={2}
                    id="new-repo-description"
                    label="Description"
                    style={{minWidth: "100%"}}
                    value={repoDescription}
                    onChange={(e) => setRepoDescription(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={srcPathErrorText.length === 0 ? false : true }
                    helperText={srcPathErrorText}
                    required
                    id="new-repo-srcpath"
                    label="Source Code Path"
                    style={{minWidth: "100%"}}
                    value={repoSrcPath}
                    onChange={(e) => setRepoSrcPath(e.target.value)}
                    /><br/><br/>
                <TextField
                    error ={urlErrorText.length === 0 ? false : true }
                    helperText={urlErrorText}
                    required
                    id="new-repo-url"
                    label="URL"
                    style={{minWidth: "100%"}}
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    /><br/><br/>
                <TextField
                    id="new-repo-token"
                    label="Token"
                    style={{minWidth: "100%"}}
                    value={repoToken}
                    onChange={(e) => setRepoToken(e.target.value)}
                    /><br/><br/><br/>
            </DialogContent>
          <DialogActions>
              <Button onClick={handleClose} color="primary"><Box fontWeight="fontWeightBold">Cancel</Box></Button>
              <Button onClick={() => handleApply(repoName, repoDescription, repoSrcPath, repoUrl, repoToken)} color="primary" autoFocus><Box fontWeight="fontWeightBold">Apply</Box></Button>
          </DialogActions>
      </Dialog>
    );
}

const mapStateToProps = state => ({
    project: getProject(state)
});

const mapDispatchToProps = dispatch => ({
    startAddingRepository: (repoDetails, projectId, authContext) => dispatch(addRepository(repoDetails, projectId, authContext))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewRepository);