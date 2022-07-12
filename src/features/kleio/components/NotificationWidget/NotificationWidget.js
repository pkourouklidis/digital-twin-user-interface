import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotifications } from '../../selectors';
import { loadNotifications, clearNotifications, clearNotification, processNotificationIntent } from '../../thunks';
import Menu from '@material-ui/core/Menu';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import Notification from './Notification';
import ScrollArea from 'react-scrollbar';
import {useHistory} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const NotificationWidget = ({ notifications, startLoadingNotifications, startClearingNotifications, startClearingNotification, triggerNotificationIntent }) => {
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

    const auth = useContext(AuthenticationContext);
    const history = useHistory();

    useEffect(() => { 
        startLoadingNotifications(auth);
        setInterval(() => {startLoadingNotifications(auth)}, 5000); 
    }, []);

    const handleNotificationIconClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
      };
  
    const handleNotificationClose = () => {
      setNotificationAnchorEl(null);
    };

    const handleNotificationClear = () => {
      startClearingNotifications(auth);
      setNotificationAnchorEl(null);
    };

    const handleNotificationClick = (intent, notificationId) => {
        if (intent != undefined && intent != "") {
            setNotificationAnchorEl(null);
            triggerNotificationIntent(intent, history);
        }
        startClearingNotification(notificationId, auth);
    }

    const handleNotificationCancelClick = (notificationId) => {
        startClearingNotification(notificationId, auth);
    }

    return (
        <Box display='inline' key="notification-box">
            <Tooltip title="Notifications">
            <IconButton onClick={handleNotificationIconClick} key="notification-button">
                <Badge id="notification-badge" key="notification-badge" badgeContent={notifications !== undefined ? notifications.length : 0} color="secondary" style={{ padding: '0 0px' }} max={99}>
                    <NotificationsIcon id="notification-icon" key="notification-icon" fontSize="medium" style={{ color: 'white' }} />
                </Badge>
            </IconButton>
            </Tooltip>
            <Menu id="notification-menu" key="notification-menu" anchorEl={notificationAnchorEl} keepMounted open={Boolean(notificationAnchorEl)} onClose={handleNotificationClose} PaperProps={{ style: { width: 450 }, }}>
                <MenuItem key="notification-menu-header" disabled style={{opacity: 1, marginBottom: 2 }}>
                    <ListItemIcon style={{minWidth: '35px'}}>
                        <NotificationsIcon key="notifications-icon" fontSize="medium" style={{ color: "#5514b4" }} />
                    </ListItemIcon>
                    <Box fontWeight="fontWeightBold" display='inline' key="header-box">Notifications</Box>
                </MenuItem>
                <Box flexBasis={250} maxHeight={550} display="flex" flexDirection="column">
                    <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false}>
                    { (notifications !== undefined && notifications.length > 0) ? 
                            notifications.map(
                                (notification) => (
                                    <Notification key={notification["notificationId"]} keyId={notification["notificationId"]} triggerNotification={() => handleNotificationClick(notification["intent"], notification["notificationId"])} cancelNotification={() => handleNotificationCancelClick(notification["notificationId"])} notificationid={notification["notificationId"]} notificationtype={notification["type"]} notificationmessage={notification['message']} notificationtitle={notification['title']} />)
                            )
                            : <MenuItem key="no-notifications" disabled style={{opacity: 1}}>No new notifications</MenuItem> }
                    </ScrollArea>
                </Box>
                { (notifications != undefined && notifications.length > 0) ? 
                        <MenuItem key="clear-item" onClick={handleNotificationClear} >
                            <Typography key="clear-typography" align="right" color="primary" ><Box key="clear-box" fontWeight="fontWeightBold">Clear</Box></Typography >
                        </MenuItem>
                        : ""
                }
            </Menu>
        </Box>
    );
}

const mapStateToProps = state => ({
    notifications: getNotifications(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingNotifications: (authContext) => dispatch(loadNotifications(authContext)),
    startClearingNotifications: (authContext) => dispatch(clearNotifications(authContext)),
    startClearingNotification: (id, authContext) => dispatch(clearNotification(id, authContext)),
    triggerNotificationIntent: (intent, history) => dispatch(processNotificationIntent(intent, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationWidget);