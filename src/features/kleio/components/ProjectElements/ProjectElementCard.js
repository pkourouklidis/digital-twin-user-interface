import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GitLabLogo from './GitLabLogo';
import KubernetesLogo from './KubernetesLogo';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import SyncStateIcon from './SyncStateIcon';

const useStyles = makeStyles({
    root: {
      width: 350,
      height: 220
    },
    content: {
        height: 175
      },
    title: {
        fontSize: 14
      },
  });

const ProjectElementCard = (props) => {
    const classes = useStyles();

    if (props.content !== undefined && !Object.keys(props.content).length == 0) {
        return (
            <Card  className={classes.root}>
                <CardContent className={classes.content}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        { props.content.nameSpaceId != undefined ? <KubernetesLogo height="25px" /> : <GitLabLogo height="25px" /> }
                    <Typography align="right" className={classes.title} color="textSecondary" gutterBottom>{props.content.name}</Typography>
                    </Box><br /><br/>
                    {props.content.description}<br/><br/><br/>
                    { props.content.nameSpaceId == undefined ? 
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}><Box fontWeight="fontWeightBold">Source Path:</Box></Grid>
                                <Grid item xs={8}><Box>{props.content.relativeCodePath}</Box></Grid>
                            </Grid>
                        </Box> :
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}><Box fontWeight="fontWeightBold">API URL:</Box></Grid>
                                <Grid item xs={8}><Box>{props.content.url}</Box></Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}><Box fontWeight="fontWeightBold">Namespace:</Box></Grid>
                                <Grid item xs={8}><Box>{props.content.nameSpaceId}</Box></Grid>
                            </Grid>
                        </Box>
                    }
                </CardContent>
                <DialogActions>
                    <SyncStateIcon syncState={props.content.syncState} isRepo={props.content.nameSpaceId == undefined} />
                    { props.content.nameSpaceId == undefined ?
                        <Tooltip title="Link to repository">
                            <IconButton size="small" onClick={() => window.open(props.content.url)}><LinkIcon color="primary" fontSize="medium"/></IconButton> 
                        </Tooltip>
                        : ""
                    }
                    <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => props.content.nameSpaceId != undefined ? props.editDeploymentOpen() : props.editRepoOpen()}><EditIcon color="primary" fontSize="medium"/></IconButton>
                    </Tooltip>
                </DialogActions>
            </Card>
        );
    } else {
        return (
            <Card  className={classes.root} />
        );
    }
}

export default ProjectElementCard;