import React from 'react';
import NotificationIcon from "./NotificationIcon";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const Notification = (props) => {

    const [showDelete , setShowDelete] = React.useState(false);
    const [mouseOver , setMouseOver] = React.useState(false);

    return (
        <ListItem key={props.keyId + "listitem"} button onMouseOver={() => setShowDelete(true)} onMouseOut={() => setShowDelete(false)} onClick={() => props.triggerNotification()}>
            <ListItemText key={props.keyId + "listitemtext"}>
            <Grid container spacing={2} key={props.keyId + "grid"}>
                <Grid item xs={1} key={props.keyId + "grid2"}>
                    <Box style={{marginTop: 2, marginLeft: 1}} key={props.keyId + "iconbox"}>
                        <NotificationIcon notificationid={props.notificationid} notificationtype={props.notificationtype} />
                    </Box>
                </Grid>
                <Grid item xs={11} key={props.keyId + "grid3"}>
                        <Typography style={{ color: "grey" }} key={props.keyId + "typo"}>
                            <Box style={{marginBottom: 3}} fontWeight="fontWeightBold" key="notification-title-box" display="flex" flexWrap="wrap" >
                                {props.notificationtitle}
                            </Box>
                            <Box key="notification-message-box" display="flex"flexWrap="wrap" >
                                {props.notificationmessage}
                            </Box>
                        </Typography>
                </Grid>
            </Grid>
            </ListItemText>
            <ListItemSecondaryAction onClick={() => props.cancelNotification()} key={props.keyId + "listitemsecondaryaction"}>
                <IconButton edge="end" aria-label="delete"  size="small" key={props.keyId + "iconbutton"}>
                    <CloseIcon key={props.keyId + "icon"} fontSize="small" onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} style={{ color: showDelete ? "lightgrey" : (mouseOver ? "lightgrey" : "white") }} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Notification;