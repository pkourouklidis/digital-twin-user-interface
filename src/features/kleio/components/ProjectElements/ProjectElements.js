import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ProjectElementCard from './ProjectElementCard'
import Divider from '@material-ui/core/Divider';
import NewRepository from '../NewRepository/NewRepository';
import EditRepository from '../EditRepository/EditRepository';
import NewDeployment from '../NewDeployment/NewDeployment';
import EditDeployment from '../EditDeployment/EditDeployment';
import { getProject } from '../../selectors';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ScrollArea from 'react-scrollbar';
import { deleteElement } from '../../thunks';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import RepositoryItem from './RepositoryItem';
import DeploymentItem from './DeploymentItem';


const ProjectElements = ({ project, startDeletingElement }) => {

    const auth = React.useContext(AuthenticationContext);
    
    const [newRepoOpen , setNewRepoOpen] = React.useState(false);
    const [editRepoOpen , setEditRepoOpen] = React.useState(false);
    const [newDeploymentOpen , setNewDeploymentOpen] = React.useState(false);
    const [editDeploymentOpen , setEditDeploymentOpen] = React.useState(false);
    const [currentElement, setCurrentElement] = React.useState({});

    const handleNewRepoClickOpen = () => {
        setNewRepoOpen(true);
    };

    const handleNewRepoClose = () => {
        setNewRepoOpen(false);
    };

    const handleEditRepoClickOpen = () => {
        setEditRepoOpen(true);
    };

    const handleEditRepoClose = () => {
        setEditRepoOpen(false);
    };

    const handleNewDeploymentClickOpen = () => {
        setNewDeploymentOpen(true);
    };

    const handleNewDeploymentClose = () => {
        setNewDeploymentOpen(false);
    };

    const handleEditDeploymentClickOpen = () => {
        setEditDeploymentOpen(true);
    };

    const handleEditDeploymentClose = () => {
        setEditDeploymentOpen(false);
    };

    const content =
        <Box flexBasis={230} display="flex" flexDirection="column" border={0}>
            <Box flexGrow={1} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" alignItems="left">
                <Box flexBasis={250} maxHeight={222} display="flex" flexDirection="column">
                        <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false}>
                        <List dense={true} overflow="scroll">
                            { (project != undefined && project.repositories !== undefined) ? project.repositories.sort((a, b) => (a.name > b.name) - (a.name < b.name)).map((repo) => 
                                <RepositoryItem key={repo.repoId} repository={repo} clickHandler={() => setCurrentElement(repo)} deleteHandler={() => startDeletingElement("repository", repo.repoId, project.id, auth)} />)
                            : "" }
                            { (project != undefined && project.deployments !== undefined) ? project.deployments.sort((a, b) => (a.name > b.name) - (a.name < b.name)).map((deployment) => 
                                <DeploymentItem key={deployment.deploymentId} deploy={deployment} clickHandler={() => setCurrentElement(deployment)} deleteHandler={() => startDeletingElement("deployment", deployment.deploymentId, project.id, auth)} />)
                            : "" }
                        </List>
                        </ScrollArea>
                    {(project != undefined && project.repositories != undefined && project.repositories.length > 0) || (project != undefined && project.deployments != undefined && project.deployments.length > 0) ? <Divider /> : "" }
                    <Box display='inline'>
                        <Button style={{textTransform: 'none', width: "50%"}} color="primary" onClick={() => handleNewRepoClickOpen(false)}><Box fontWeight="fontWeightBold">Add repository...</Box></Button>
                        <Button style={{textTransform: 'none', width: "50%"}} color="primary" onClick={() => handleNewDeploymentClickOpen(false)}><Box fontWeight="fontWeightBold">Add deployment...</Box></Button>
                    </Box>
                </Box>
                <ProjectElementCard content={currentElement} editRepoOpen={() => handleEditRepoClickOpen()} editDeploymentOpen={() => handleEditDeploymentClickOpen()}/>
            </Box>
            <NewRepository open={newRepoOpen} onClose={handleNewRepoClose} />
            <EditRepository open={editRepoOpen} editData={currentElement} onClose={handleEditRepoClose} />
            <NewDeployment open={newDeploymentOpen} onClose={handleNewDeploymentClose} />
            <EditDeployment open={editDeploymentOpen} editData={currentElement} onClose={handleEditDeploymentClose} />
        </Box>;
    return (project != undefined) ? content : "";
}

const mapStateToProps = state => ({
    project: getProject(state),
});

const mapDispatchToProps = dispatch => ({
    startDeletingElement: (elementType, elementId, projectId, authContext) => dispatch(deleteElement(elementType, elementId, projectId, authContext))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectElements);