import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import Grid from '@material-ui/core/Grid';

const WorkBench = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <Box style={{marginTop: 2, marginLeft: 1}}>
                    <FiberManualRecordOutlinedIcon key={props.workbenchname + "icon"} fontSize="small" color={ location.protocol + '//' + location.host == props.workbenchlocation ? "secondary" : "primary" } />
                </Box>
            </Grid>
            <Grid item xs={11}>
                <Typography style={{ color: "grey" }} >
                    <Box style={{marginBottom: 3}} fontWeight="fontWeightBold" key={props.workbenchname + "workbench-title-box"} display="flex" flexWrap="wrap" >
                        {props.workbenchname}
                    </Box>
                    <Box display="flex" flexWrap="wrap" key={props.workbenchname + "workbench-description-box"} >
                        {props.workbenchdescription}
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default WorkBench;