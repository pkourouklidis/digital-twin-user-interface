import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import ShareTable from '../ShareTable/ShareTable';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function SharingDialog(props) {
    const { onClose, open } = props;
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');
    const [knownOwners, setKnownOwners] = React.useState([]);
    const [newOwners, setNewOwners] = React.useState([]);
  
    React.useEffect(() => setKnownOwners(props.owners), [props.owners]);
  
    const handleClose = () => {
        setKnownOwners(props.owners);
        setNewOwners([]);
        onClose();
    };
  
    const handleApply = () => {
      let knownOwnersClone = [...knownOwners];
      let newOwnersClone = [...newOwners];
      const ownerArray = knownOwnersClone.map((elt) => elt.subject).concat(newOwnersClone);
      props.update(Array.from([...new Set(ownerArray)]));
      onClose();
    };
  
    const setNewOwnersAndClear = (updatedOwners) => {
      setNewOwners(updatedOwners.map((elt) => elt.subject));
      props.clearSearchedOwners();
    };
   
    return (
        <Dialog key={"sharing-dialog"} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle id="simple-dialog-title" key={"sharing-dialog-title"}>
            <Grid container key={"grid"}>
                <Grid item xs={1} key={"grid2"}>
                    <PersonAddIcon color="primary" fontSize="large" key={"sharing-dialog-icon"}/>
                </Grid>
                <Grid item xs={11} key={"grid3"}>
                  Add Collaborators
                </Grid>
            </Grid>
          </DialogTitle>
        <DialogContent key={"sharing-dialog-content"}>
            <DialogContentText key={"sharing-dialog-content-text"}>
                <ShareTable key={"sharing-dialog-table"} ownersList={knownOwners} newOwnersList={newOwners} updateNewOwners={(updatedOwners) => setNewOwnersAndClear(updatedOwners)} user={props.user} onChange={(updatedOwners) => setKnownOwners(updatedOwners)} />
            </DialogContentText>
            </DialogContent>
            <DialogActions key={"sharing-dialog-actions"}>
            <Button key={"sharing-dialog-cancel-button"} onClick={handleClose} color="primary"><Box fontWeight="fontWeightBold">Cancel</Box></Button>
            <Button key={"sharing-dialog-apply-button"} onClick={handleApply} color="primary"><Box fontWeight="fontWeightBold">Apply</Box></Button>
            </DialogActions>
        </Dialog>
    );
  }

  export default SharingDialog;