import React from 'react';
import Box from '@material-ui/core/Box';
import ProjectList from '../components/ProjectList/ProjectList';
import Project from '../components/Project/Project';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjectLoading, getProject } from '../selectors';
import { getUserDetails } from '../selectors';
import { resetFoundUsers } from '../thunks';
import { updateProjectOwners } from '../thunks';

const ProjectsDrawer = ({ toggle }) => {

    const history = useHistory();

    const loadProject = (projectSummary) => {
      history.push(`/project/${projectSummary.id}`);
      toggle();
    };
    
    return (
      <Box display="flex" flexDirection="column" m={2} width={610} height="calc(100vh - 90px)" justifyContent="space-between">
          <Project toggleDrawer={() => toggle()} />
          <ProjectList loadProject={(id) => loadProject(id)} toggleDrawer={() => toggle()} />
      </Box>
    );
}

const mapStateToProps = state => ({
  isLoading: getProjectLoading(state),
  project: getProject(state),
  userDetails: getUserDetails(state)
});

const mapDispatchToProps = dispatch => ({
  editProjectOwners: (owners, projectid, auth) => dispatch(updateProjectOwners(owners, projectid, auth)),
  clearFoundUsers: () => dispatch(resetFoundUsers())
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectsDrawer);