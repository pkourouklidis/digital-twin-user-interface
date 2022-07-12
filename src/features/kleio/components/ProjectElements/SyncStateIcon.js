import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import IconButton from '@material-ui/core/IconButton';
import SyncStateDialog from './SyncStateDialog';

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress key="sync-in-progress-icon" style={{ color: "#2196f3" }} size={12}/>
            <Tooltip title={"Synchronisation in progress for this " + (props.isRepo ? "repository" : "deployment")} aria-label="in-progress-synchronised">
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                
                    <Typography variant="caption" component="div" style={{ color: "#2196f3" }}>i</Typography>
                </Box>
            </Tooltip>
        </Box>
    );
}

const SyncStateIcon = (props) => {
    const [warningOpen, setWarningOpen] = React.useState(false);
    const [failureOpen, setFailureOpen] = React.useState(false);

    const handleWarningClickOpen = () => {
        setWarningOpen(true);
    };

    const handleWarningClose = () => {
        setWarningOpen(false);
    };

    const handleFailureClickOpen = () => {
        setFailureOpen(true);
    };

    const handleFailureClose = () => {
        setFailureOpen(false);
    };

    let content =   <Box textAlign='left' width="100%" pl={1}>
    <IconButton size="small" onClick={() => handleWarningClickOpen()}>
        <Tooltip title={"Could not determine the synchronisation state for this " + (props.isRepo ? "repository" : "deployment")} aria-label="not-synchronised">
            <ReportProblemOutlinedIcon key="sync-unknown-icon" fontSize="small" style={{ color: "#ff9800" }}/>
        </Tooltip>
    </IconButton>
    <SyncStateDialog key="warning-dialog" open={warningOpen} type="warning" title="Synchronisation Status Unknown" msg={props.syncStateMessage} onClose={handleWarningClose} />
    </Box>;

    if (props.syncState != undefined && props.syncState == "failed") {
        content =   <Box textAlign='left' width="100%" pl={1}>    
                        <IconButton size="small" onClick={() => handleFailureClickOpen()}>
                            <Tooltip title={"Synchronisation has failed for this " + (props.isRepo ? "repository" : "deployment")} aria-label="failed-synchronised">
                                <HighlightOffIcon key="sync-failed-icon" fontSize="small" style={{ color: "#f44336" }}/>
                            </Tooltip>
                        </IconButton>
                        <SyncStateDialog key="failure-dialog" open={failureOpen} type="failure" title="Synchronisation Error" msg={props.syncStateMessage} onClose={handleFailureClose} />
                    </Box> 
    } else if (props.syncState != undefined && props.syncState == "success") {
        content =   <Box textAlign='left' width="100%" pl={1}>
                        <Tooltip title={"Synchronisation has been completed for this " + (props.isRepo ? "repository" : "deployment")} aria-label="success-synchronised">
                            <CheckCircleOutlineIcon key="sync-success-icon" fontSize="small" style={{ color: "#4caf50" }} />
                        </Tooltip>
                    </Box>
    } else if (props.syncState != undefined && props.syncState == "in-progress") {
        content =   <Box textAlign='left' width="100%" pl={1}>
                        <CircularProgressWithLabel isRepo={props.isRepo} />
                    </Box>
    }

    return content;
}

export default SyncStateIcon;