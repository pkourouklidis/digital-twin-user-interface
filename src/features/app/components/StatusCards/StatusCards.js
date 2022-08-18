import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import { getSettingsChanged, getSimulation, getSettings } from '../../selectors';
import { stopSimulation, pauseSimulation, updateSimulation, startSimulation, createSimulation } from '../../thunks';

const useStyles = makeStyles({
    root: {
      width: 150,
      marginTop: 15,
      marginLeft: 15
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    }
  });

const StatusCards = ({ simulation, settings, settingsChanged, startStoppingSimulation, startPausingSimulation, startUpdatingSimulation, startStartingSimulation, startCreatingSimulation }) => {
    const [status, setStatus] = React.useState("unknown");

    const auth = useContext(AuthenticationContext);

    const classes = useStyles();

    useEffect(() => { 
        if (simulation && simulation.status) setStatus(simulation.status); 
    }, [simulation]);

    let start;

    if (simulation) start = new Date(simulation.simulationStartTime);

    const updateStatus = (action) => {
        if (action == "stop") {
            setStatus("stopping");
            startStoppingSimulation(auth);
        } else if (action == "pause") {
            setStatus("pausing");
            startPausingSimulation(auth);
        } else if (action == "update") {
            setStatus("updating");
            startUpdatingSimulation(settings, auth);
        } else if (action == "play") {
            setStatus("starting");
            if (status == "paused") {
                startStartingSimulation(auth)
            } else {
                startCreatingSimulation(settings, auth)
            }
        }
      };

    return (
        <Box>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'center', marginBottom: 10 }}>{status.charAt(0).toUpperCase() + status.slice(1)}</Box>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                <Box style={{ display:'flex', justifyContent:'center' }}>call centre status</Box>
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent:'center'}}>
                { 
                    status == "running" ? 
                    <Tooltip title="Pause the call centre simulation">
                    <IconButton size="small" onClick={() => updateStatus("pause")} disabled={status != "running"}>
                        <PauseIcon fontSize="small" color={status != "running" ? "disabled" : "primary"} />
                    </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title={ status == "paused" ? "Resume the call centre simulation" : "Start the call centre simulation with the current configuration" }>
                    <IconButton size="small" onClick={() => updateStatus("play")} disabled={status != "stopped" && status != "paused"}>
                        <PlayArrowIcon fontSize="small" color={status != "stopped" && status != "paused" ? "disabled" : "primary"} />
                    </IconButton>
                    </Tooltip>
                }
                
                <Tooltip title="Stop the call centre simulation">
                <IconButton size="small" onClick={() => updateStatus("stop")} disabled={status != "running" && status != "paused"}>
                    <StopIcon fontSize="small" color={status != "running" && status != "paused" ? "disabled" : "primary"} />
                </IconButton>
                </Tooltip>
                <Tooltip title="Update the call centre simulation with the current configuration">
                <IconButton size="small" onClick={() => updateStatus("update")} disabled={ !((status == "running" || status == "paused") && settingsChanged) }>
                    <DoneIcon fontSize="small" color={!((status == "running" || status == "paused") && settingsChanged) ? "disabled" :  "primary"} />
                </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'center', marginBottom: 10 }}>{simulation && simulation.queueDepth && status != "stopped" ? simulation.queueDepth : "N/A"}</Box>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                <Box style={{ display:'flex', justifyContent:'center' }}>calls in queue</Box>
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'center', marginBottom: 10 }}>{simulation && simulation.activeWorkers ? simulation.activeWorkers : "N/A"}</Box>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                <Box style={{ display:'flex', justifyContent:'center' }}>active workers</Box>
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'center', marginBottom: 10 }}>{start && (status == "running" || status == "paused") ? start.getHours() + ":" + (start.getMinutes() < 10 ? 0 : "") + start.getMinutes() : "N/A"}</Box>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                <Box style={{ display:'flex', justifyContent:'center' }}>start time</Box>
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'center', marginBottom: 10 }}>{start && (status == "running" || status == "paused") ? start.getDate() + "-" + (start.getMonth() + 1) + "-" + start.getFullYear() : "N/A"}</Box>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                <Box style={{ display:'flex', justifyContent:'center' }}>start date</Box>
                </Typography>
            </CardContent>
        </Card>
        </Box>
    )
}

const mapStateToProps = state => ({
    simulation: getSimulation(state),
    settingsChanged: getSettingsChanged(state),
    settings: getSettings(state)
});

const mapDispatchToProps = dispatch => ({
    startStoppingSimulation: (auth) => dispatch(stopSimulation(auth)),
    startPausingSimulation: (auth) => dispatch(pauseSimulation(auth)),
    startUpdatingSimulation: (settings, auth) => dispatch(updateSimulation(settings, auth)),
    startStartingSimulation: (auth) => dispatch(startSimulation(auth)),
    startCreatingSimulation: (settings, auth) => dispatch(createSimulation(settings, auth)),
})

export default connect(mapStateToProps,mapDispatchToProps)(StatusCards);