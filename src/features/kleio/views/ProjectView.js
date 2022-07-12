import React from 'react';
import { connect } from 'react-redux';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import { useEffect, useContext } from 'react';
import { loadProject } from '../thunks';
import { getProject } from '../selectors';
import ProjectDashboard from '../../app/views/ProjectDashboard';

const ProjectView = ({projectId, startLoadingProject}) => {

    const auth = useContext(AuthenticationContext);
    useEffect(() => startLoadingProject(projectId, auth), [projectId]);

    return (<ProjectDashboard />);
}

const mapStateToProps = state => ({
    project: getProject(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingProject: (id, authContext) => dispatch(loadProject(id, authContext))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);