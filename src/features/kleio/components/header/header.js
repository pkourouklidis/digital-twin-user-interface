import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import BTLogo from './BTLogo';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { getUserDetails } from '../../selectors';
import ProjectsDrawer from '../../views/ProjectsDrawer';
import HamburgerMenu from '../../views/HamburgerMenu';
import NotificationWidget from '../NotificationWidget/NotificationWidget';
import WorkBenchWidget from '../WorkBenchWidget/WorkBenchWidget';
import { loadProjects } from '../../thunks';
import { useContext } from 'react';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import Tooltip from '@material-ui/core/Tooltip';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AccountWidget from '../AccountWidget/AccountWidget';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0.6),
    },
    title: {
        flexGrow: 1,
        color: 'white',
        fontSize: '17px',
        marginLeft: theme.spacing(2.1),
    },
    drawerPaper: {
        marginTop: "64px"
    }
  }));

const Header = ({ userDetails, startLoadingProjects, showHamburgerMenuButton }) => {
    const classes = useStyles();

    const [hamburgerState, setHamburgerState] = React.useState(false);
    
    const [state, setState] = React.useState(false);

    const auth = useContext(AuthenticationContext);

    const toggleHamburgerMenu = () => {
        setHamburgerState(!hamburgerState);
    };

    const toggleDrawer = () => {
        startLoadingProjects(auth);
        setState(!state);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                { showHamburgerMenuButton ? 
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleHamburgerMenu()}>
                        {hamburgerState ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton> : ""
                }
                <BTLogo />
                <Typography variant="h6" className={classes.title}>{process.env.REACT_APP_NAME}</Typography>
                { userDetails != undefined ? 
                    <Box>
                        <Tooltip title="Projects">
                        <IconButton onClick={() => toggleDrawer()}>
                            {state ? <AccountTreeOutlinedIcon fontSize="medium" style={{ color: 'white' }}  /> : <AccountTreeIcon fontSize="medium" style={{ color: 'white' }}  />}
                        </IconButton>
                        </Tooltip>
                        <WorkBenchWidget />
                        <NotificationWidget />
                        <AccountWidget />
                        
                    </Box> : ""
                }
            </Toolbar>
            <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} anchor="left" open={hamburgerState} onClose={() => setHamburgerState(false)}>
                <HamburgerMenu toggle={() => toggleHamburgerMenu()}/>
            </Drawer>
            <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} anchor="right" open={state} onClose={() => setState(false)}>
                <ProjectsDrawer toggle={() => toggleDrawer()}/>
            </Drawer>
        </AppBar>
    );
}

const mapStateToProps = state => ({
    userDetails: getUserDetails(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingProjects: (authContext) => dispatch(loadProjects(authContext))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Header);