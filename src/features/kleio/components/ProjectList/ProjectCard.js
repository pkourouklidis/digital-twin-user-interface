import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
    root: {
      width: 300,
      height: 100,
      marginBottom: 10
    },
    title: {
      fontSize: 14
    },
  });

const ProjectCard = (props) => {
    const classes = useStyles();
    
    return (
        <Box>
            <Card className={classes.root}>
                <CardActionArea style={{ height: "100%"}} onClick={() => props.load()}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <AccountTreeIcon color="primary" />
                            <Typography align="right" className={classes.title} color="textSecondary" gutterBottom>
                                {props.name}
                            </Typography>
                        </Box><br />
                        <Box height={75}>
                            <Typography variant="body2" component="p">{props.description}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default ProjectCard;