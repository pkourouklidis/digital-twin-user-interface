import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import WorkBenchIcon from '@material-ui/icons/Category';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import BTPurpleLogo from '../components/BTLogo/BTLogo';

const WelcomeView = () => {
    
    return (
        <Box style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: "100%"}}>
            <Box style={{ width: 650, marginTop: 100, flexWrap: 'wrap' }} >
                <Grid container style={{ marginBottom: 10 }} width="100%">
                    <Grid item xs={1}>
                        <BTPurpleLogo height="30px" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h4" style={{ marginBottom: 10 }}>
                            Welcome to the BT Software Engineering Toolkit
                        </Typography>
                        This is the BT's software engineering toolkit that provides a range of workbenches and tools to aid developers during the creation of their software. The toolkit centres around the vision of an augmented developer by leveraging historical data of software projects (repositories, run-time information, etc.) to give developers insight into the software systems they are developing.
                    </Grid>
                </Grid>

                <Grid container style={{ marginBottom: 10, marginTop: 40 }} width="100%">
                    <Grid item xs={1}>
                        <AccountTreeIcon color="primary" fontSize="large"/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h4" style={{ marginBottom: 10 }}>
                            Organising your work in projects
                        </Typography>
                        The toolkit is designed to work alongside existing development workflows with minimal impact. It assumes a software development project typically will consist of one or more git-based repositories and and or more deployment environment for the running software. Your work can be organised on this toolkit in identical fashion. By clicking the project icon on the header bar, the project menu will slide open and new projects can be created. For each project in turn one or more git repositories can be registered as well as one or more deployments. Once these are put in place, the analysis backend will track changes and events in your project and generate metrics. Project details can be found in the project drawer which you can reach by clicking the project icon on the header bar.
                    </Grid>
                </Grid>

                <Grid container style={{ marginBottom: 10, marginTop: 40 }} width="100%">
                    <Grid item xs={1}>
                        <WorkBenchIcon color="primary" fontSize="large"/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h4" style={{ marginBottom: 10 }}>
                            Workbenches for insight, analysis and assistance
                        </Typography>
                        In addition to collecting metrics, the toolkit has a range of workbenches available that can be used to analyse your software project for new insight and assistance with improvements and modification. For example, the testing workbench can assist with enabling mutation testing on your ci/cd pipelines and give you in-depth insight into the quality of your testing harnesses. The available workbenches can be selected by clicking the workbench icon on the header bar. When switching to another workbench the currently loaded project will remain active, like taking the current object to a new tool in a maker space.
                    </Grid>
                </Grid>

                <Grid container style={{ marginBottom: 10, marginTop: 40 }} width="100%">
                    <Grid item xs={1}>
                        <NotificationsIcon color="primary" fontSize="large"/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h4" style={{ marginBottom: 10 }}>
                            Notifications and other functions
                        </Typography>
                        Workbenches can perform long-running analyses on software systems, for example when attempting to identify candidate micro-services in legacy software systems. These are performed in the backend and will send you a notification once the work is complete. Notifications can be accessed by clicking the notification icon in the header bar. In addition it is possible to share your projects with collaborators by clicking the share icon in the project drawer.
                    </Grid>
                </Grid>

                <Grid container style={{ marginBottom: 10, marginTop: 40 }} width="100%">
                    <Grid item xs={1}>
                        <ContactSupportIcon color="primary" fontSize="large"/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h4" style={{ marginBottom: 10 }}>
                            Contact details for help and feedback
                        </Typography>
                        The Software Engineering Toolkit is built and maintained by the BetaLab team in Applied Research. If you have questions or feedback we would love to hear from you. Click <a href="mailto:se.toolkit@bt.com">here</a> to send us an email.
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default WelcomeView;