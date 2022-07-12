import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
        padding: theme.spacing(10)
    },
    spinner: {
        margin: theme.spacing(5)
    }
}));

const HamburgerMenuContent = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Typography align="center" style={{ color: 'lightgrey', fontSize: '15px', lineHeight: '120px' }} >
                    You can add your hamburger menu content here
                </Typography>
            </div>
            <Button onClick={() => props.toggleHamburgerMenu()} color="primary">
                <Box fontWeight="fontWeightBold">close</Box>
            </Button>
        </React.Fragment>);
}

export default HamburgerMenuContent;