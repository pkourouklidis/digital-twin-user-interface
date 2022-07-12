import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GitLabLogo from './GitLabLogo';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const RepositoryItem = ({ repository, clickHandler, deleteHandler }) => {

    const [showDelete , setShowDelete] = React.useState(false);
    const [mouseOver , setMouseOver] = React.useState(false);

    return  <ListItem button onClick={() => clickHandler()} onMouseOver={() => setShowDelete(true)} onMouseOut={() => setShowDelete(false)}>
                <ListItemIcon style={{minWidth: '35px'}}>
                    <GitLabLogo height="16px" />
                </ListItemIcon>
                <ListItemText primary={repository.name} />
                <ListItemSecondaryAction  >
                    { (!repository.syncStatus || repository.syncStatus == "warning") ? <IconButton disabled size="small"><ReportProblemOutlinedIcon fontSize="small" style={{ color: "#ff9800" }}/></IconButton> : "" }
                    { (repository.syncStatus && repository.syncStatus == "failed") ? <IconButton disabled size="small"><HighlightOffIcon key="sync-failed-icon" fontSize="small" style={{ color: "#f44336" }}/></IconButton> : "" }
                    <IconButton edge="end" aria-label="delete"  size="small" onClick={() => deleteHandler()}>
                        <CloseIcon fontSize="small" onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} style={{ color: showDelete ? "lightgrey" : (mouseOver ? "lightgrey" : "white") }} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
}

export default RepositoryItem;