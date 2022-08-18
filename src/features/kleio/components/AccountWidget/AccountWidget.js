import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { getUserDetails } from '../../selectors';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const AccountWidget = ({ userDetails }) => {
    const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

    const handleProfileClick = (event) => {
      setProfileAnchorEl(event.currentTarget);
    };
  
    const handleProfileClose = () => {
      setProfileAnchorEl(null);
    };

    return (
        <Box display='inline' key="account-box">
            <Tooltip title="Account information"><IconButton onClick={handleProfileClick} ><AccountCircleIcon fontSize="medium" style={{ color: 'white' }} /></IconButton></Tooltip>
            <Menu id="profile-menu" anchorEl={profileAnchorEl} keepMounted open={Boolean(profileAnchorEl)} onClose={handleProfileClose} PaperProps={{ style: { width: 350 }, }}>
                <MenuItem disabled style={{opacity: 1, marginBottom: 2}}>
                    <ListItemIcon style={{minWidth: '35px'}}>
                        <AccountCircleIcon key="account-icon" fontSize="medium" style={{ color: "#3d3d3d" }} />
                    </ListItemIcon>
                    <Box fontWeight="fontWeightBold" display='inline'>Profile Details</Box>
                </MenuItem>
                <MenuItem disabled style={{opacity: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Typography style={{ color: "grey" }} ><Box fontWeight="fontWeightBold">Name:</Box></Typography></Grid>
                        <Grid item xs={9}><Typography style={{ color: "grey" }} ><Box>{userDetails.displayName}</Box></Typography></Grid>
                    </Grid>
                </MenuItem>
                <MenuItem disabled style={{opacity: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Typography style={{ color: "grey" }} ><Box fontWeight="fontWeightBold">Unit:</Box></Typography></Grid>
                        <Grid item xs={9}><Typography style={{ color: "grey" }} ><Box>{userDetails.organisationalUnit}</Box></Typography></Grid>
                    </Grid>
                </MenuItem>
                <MenuItem disabled style={{opacity: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Typography style={{ color: "grey" }} ><Box fontWeight="fontWeightBold">E-mail:</Box></Typography></Grid>
                        <Grid item xs={9}><Typography style={{ color: "grey" }} ><Box>{userDetails.email}</Box></Typography></Grid>
                    </Grid>
                </MenuItem>
                <MenuItem style={{marginTop: 10}} onClick={handleProfileClose}><Typography align="right" color="primary" ><Box fontWeight="fontWeightBold">Log out</Box></Typography ></MenuItem>
            </Menu>
        </Box>
    );
}

const mapStateToProps = state => ({
    userDetails: getUserDetails(state)
});

export default connect(mapStateToProps)(AccountWidget);