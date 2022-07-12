import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const NotificationIcon = (props) => {
    if (props.notificationtype) {
        if (props.notificationtype == "success") {
            return <CheckCircleOutlineIcon key={props.notificationid + "icon"} fontSize="small" style={{ color: "#4caf50" }} />
        } else if (props.notificationtype == "failure") {
            return <HighlightOffIcon key={props.notificationid + "icon"} fontSize="small" style={{ color: "#f44336" }}/>
        } else if (props.notificationtype == "warning") {
            return <ReportProblemOutlinedIcon key={props.notificationid + "icon"} fontSize="small" style={{ color: "#ff9800" }}/>
        } else if (props.notificationtype == "info") {
            return <InfoOutlinedIcon key={props.notificationid + "icon"} fontSize="small" style={{ color: "#2196f3" }}/>
        }
    }
    return <HelpOutlineOutlinedIcon key={props.notificationid + "icon"} fontSize="small" color="primary"/>
}

export default NotificationIcon;