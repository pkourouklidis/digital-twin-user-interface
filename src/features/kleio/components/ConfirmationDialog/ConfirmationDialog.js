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

const ConfirmationDialog = (props) => {
    const { onClose, open } = props;
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const handleApply = () => {
        props.apply();
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="confirmation-dialog" open={open} maxWidth={maxWidth} fullWidth={fullWidth} scroll="body">
            <DialogTitle id="confirmation-dialog" >
                    <Grid container>
                    <Grid item xs={1}>
                        <ReportProblemIcon key="confirmation-dialog-warning-icon" fontSize="large" color="primary"/>
                    </Grid>
                    <Grid item xs={11}>
                        Attention
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{props.msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"><Box fontWeight="fontWeightBold">No</Box></Button>
                <Button onClick={handleApply} color="primary" autoFocus><Box fontWeight="fontWeightBold">Yes</Box></Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;