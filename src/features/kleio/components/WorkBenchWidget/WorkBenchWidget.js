import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { getWorkBenches, getProject } from '../../selectors';
import { loadWorkBenches, switchWorkBench } from '../../thunks';
import Menu from '@material-ui/core/Menu';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import {useHistory} from 'react-router-dom';
import WorkBenchIcon from '@material-ui/icons/Category';
import LabWorkBenchLogo from './LabWorkBenchLogo';
import WorkBench from './WorkBench';
import ScrollArea from 'react-scrollbar';
import Tooltip from '@material-ui/core/Tooltip';

const WorkBenchWidget = ({ project, workBenches, startLoadingWorkBenches, switchToWorkBench }) => {
    const [workBenchAnchorEl, setWorkBenchAnchorEl] = React.useState(null);

    const history = useHistory();

    const auth = useContext(AuthenticationContext);
    
    useEffect(() => { 
        startLoadingWorkBenches(auth);
    }, []);

    const handleWorkBenchIconClick = (event) => {
        setWorkBenchAnchorEl(event.currentTarget);
    };

    const handleworkBenchClose = () => {
        setWorkBenchAnchorEl(null);
      };

    const handleWorkBenchClick = (workbenchUrl, projectId) => {
        setWorkBenchAnchorEl(null);
        switchToWorkBench(workbenchUrl, projectId, history)
    }

    return (
        <Box display='inline'>
            <Tooltip title="Workbenches">
            <IconButton onClick={handleWorkBenchIconClick} key="workbench-button">
                <WorkBenchIcon key="workbench-icon" fontSize="medium" style={{ color: 'white' }} />
            </IconButton>
            </Tooltip>
            <Menu id="workbench-menu" key="workbench-menu" anchorEl={workBenchAnchorEl} onClose={handleworkBenchClose} keepMounted open={Boolean(workBenchAnchorEl)} PaperProps={{ style: { width: 450 }, }}>
                <MenuItem key="workbench-menu-header" disabled style={{opacity: 1, marginBottom: 2}}>
                    <ListItemIcon style={{minWidth: '35px'}}>
                        <WorkBenchIcon key="workbench-icon" fontSize="medium" style={{ color: "#5514b4" }} />
                    </ListItemIcon>
                    <Box fontWeight="fontWeightBold" display='inline'>Workbenches</Box>
                </MenuItem>
                <Box flexBasis={250} maxHeight={550} display="flex" flexDirection="column" key="workbench-listing-box">
                    <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false} key="workbench-listing-scrollarea">
                        { (workBenches != undefined && workBenches.filter(workBench => { return !workBench.lab }).length > 0) ? 
                                workBenches.filter(workBench => { return !workBench.labs }).map(workBench => 
                                        (location.protocol + '//' + location.host == workBench["url"]) ?
                                        <MenuItem key={"workbench-menuitem-" + workBench["name"]} style={{whiteSpace: 'normal', opacity: 1}} disabled >
                                            <WorkBench key={"workbench-" + workBench["name"]} workbenchname={workBench["name"]} workbenchdescription={workBench["description"]} workbenchlocation={workBench["url"]} />
                                        </MenuItem> :
                                        <MenuItem key={"workbench-menuitem-" + workBench["name"]} style={{whiteSpace: 'normal'}} onClick={() => handleWorkBenchClick(workBench["url"], project ? project.id : undefined)}>
                                            <WorkBench key={"workbench-" + workBench["name"]} workbenchname={workBench["name"]} workbenchdescription={workBench["description"]} workbenchlocation={workBench["url"]} />
                                        </MenuItem>
                                )
                            : <MenuItem disabled>No workbenches available</MenuItem>
                        }
                        { (workBenches != undefined && workBenches.filter(workBench => { return workBench.labs }).length > 0) ?
                            <Box key="lab-workbench-listing-box">
                            <br/><MenuItem key="lab-workbench-menu-header" disabled style={{opacity: 1}}>
                                    <ListItemIcon style={{minWidth: '35px'}}>
                                        <LabWorkBenchLogo key="lab-workbench-icon" height="17px" />
                                    </ListItemIcon>
                                    <Box fontWeight="fontWeightBold" display='inline'>Labs Section</Box>
                                </MenuItem>
                            { workBenches.filter(workBench => { return workBench.labs }).map(workBench => 
                                    (location.protocol + '//' + location.host == workBench["url"]) ?
                                    <MenuItem key={"workbench-lab-menuitem-" + workBench["name"]} style={{whiteSpace: 'normal', opacity: 1}} disabled >
                                        <WorkBench key={"workbench-lab-" + workBench["name"]} workbenchname={workBench["name"]} workbenchdescription={workBench["description"]} workbenchlocation={workBench["url"]} />
                                    </MenuItem> :
                                    <MenuItem key={"workbench-lab-menuitem-" + workBench["name"]} style={{whiteSpace: 'normal'}} onClick={() => handleWorkBenchClick(workBench["url"], project ? project.id : undefined)}>
                                        <WorkBench key={"workbench-lab-" + workBench["name"]} workbenchname={workBench["name"]} workbenchdescription={workBench["description"]} workbenchlocation={workBench["url"]} />
                                    </MenuItem>
                                ) 
                            }
                            </Box>
                            : ""
                        }
                    </ScrollArea>
                </Box>
            </Menu>
        </Box>
    );
}

const mapStateToProps = state => ({
    workBenches: getWorkBenches(state),
    project: getProject(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingWorkBenches: (authContext) => dispatch(loadWorkBenches(authContext)),
    switchToWorkBench: (workbenchUrl, projectId, history) => dispatch(switchWorkBench(workbenchUrl, projectId, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkBenchWidget);