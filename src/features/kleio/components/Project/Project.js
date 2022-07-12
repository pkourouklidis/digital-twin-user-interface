import React from 'react';
import Box from '@material-ui/core/Box';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import ProjectElements from '../ProjectElements/ProjectElements';
import { connect } from 'react-redux';
import { getProjectLoading, getProject } from '../../selectors';

const Project = ({ project, isLoading, toggleDrawer }) => {

    let content;

    if (!isLoading && project !== undefined  && Object.keys(project).length != 0) {
        content = 
        <Box display="flex" flexDirection="column" justifyContent="space-between">
            <ProjectDetails toggle={() => toggleDrawer()} /><br/>
            <ProjectElements /><br/>
        </Box>;
    } else {
        content = "";
    }
    return content;
}

const mapStateToProps = state => ({
    isLoading: getProjectLoading(state),
    project: getProject(state)
});

export default connect(mapStateToProps)(Project); 