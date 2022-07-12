import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ProjectCard from './ProjectCard';
import SearchBar from "material-ui-search-bar";
import { connect } from 'react-redux';
import { getProjects } from '../../selectors';
import ScrollArea from 'react-scrollbar';
import CloudIcon from '@material-ui/icons/Cloud';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NewProject from '../NewProject/NewProject';

const ProjectList = ({ projects, loadProject, toggleDrawer }) => {    
    const [filteredProjects, setFilteredProjects] = React.useState([]);
    const [newProjectOpen, setNewProjectOpen] = React.useState(false);

    useEffect(() => {
        setFilteredProjects(projects);
    }, [projects])

    const handleNewProjectClickOpen = () => {
        setNewProjectOpen(true);
      };
  
      const handleNewProjectClose = (projectCreated) => {
        if (projectCreated) { toggleDrawer(); }
        setNewProjectOpen(false);
      };

    const filterProjects = (key) => {
        let filteredProjects = [];
        projects.map(project => {
            if (project['name'].includes(key)) {
                filteredProjects.push(project)
            } 
        });
        setFilteredProjects(filteredProjects);
    }

    const content =
        <Box key="project-list-box" flexGrow={1} overflow="hidden" display="flex" flexDirection="column" marginBottom={0}>

            <Grid container style={{ marginBottom: 10 }}>
                <Grid item xs={1}>
                    <CloudIcon color="primary" fontSize="large"/>
                </Grid>
                <Grid item xs={10}>
                    <Typography key="project-list-typography" variant="h6" component="h4">Projects</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="New project">
                        <IconButton onClick={handleNewProjectClickOpen} size="small"style={{ marginLeft: 20 }} ><AddIcon color="primary" fontSize="medium"/></IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            
            <SearchBar key="project-list-searchbar" placeholder="Search name or description..." onCancelSearch={() => filterProjects("")} onChange={(newValue) => filterProjects(newValue)} style={{width: "100%"}}/><br/>
            <ScrollArea
            key="project-list-scrollarea"
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
                <Box key="project-listing-box" flexGrow={1} overflow="hidden" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" alignItems="left" style={{width: "100%" }}>
                    { filteredProjects !== undefined ? filteredProjects.sort((a, b) => (a.name > b.name) - (a.name < b.name)).map(project => <ProjectCard key={"project" + project.id} id={project.id} name={project.name} description={project.description} load={() => loadProject(project)} />) : "" }
                </Box>
            </ScrollArea>
            <NewProject open={newProjectOpen} onClose={handleNewProjectClose} />
        </Box>;
    return content;
}

const mapStateToProps = state => ({
    projects: getProjects(state)
});

export default connect(mapStateToProps)(ProjectList);