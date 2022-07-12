import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';

const SyncStateDialog = (props) => {
    const { onClose, open } = props;
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="syncstate-dialog" open={open} maxWidth={maxWidth} fullWidth={fullWidth} scroll="body">
            <DialogTitle id="syncstate-dialog" >
                    <Grid container>
                    <Grid item xs={1}>
                        { props.type && props.type == "failure" ?  
                            <CancelIcon key="syncstate-dialog-icon" fontSize="large" color="primary"/>
                            :
                            <ReportProblemIcon key="syncstate-dialog-icon" fontSize="large" color="primary"/>
                        }
                    </Grid>
                    <Grid item xs={11}>
                        {props.title}
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{props.msg ? props.msg : "No further information availabe, please try again later"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"><Box fontWeight="fontWeightBold">Close</Box></Button>
            </DialogActions>
        </Dialog>
    );
}

export default SyncStateDialog;