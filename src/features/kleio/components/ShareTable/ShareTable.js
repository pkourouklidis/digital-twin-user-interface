/**
 * Created Date: Wednesday, June 9th 2021, 2:57:35 pm
 * Author: Joost Noppen, BetaLab, Applied Research
 * Copyright (c) 2021 British Telecommunications plc
 */


import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import UserSearchWidget from './UserSearchWidget';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
 
 const useStyles = makeStyles({
     table: {
       minWidth: "100%",
     },
   });
 
 const ShareTable = ({onChange, user, ownersList, newOwnersList, updateNewOwners}) => {
     const [owners, setOwners] = React.useState(ownersList);
     const classes = useStyles();
 
     useEffect(() => {
         if (onChange !== undefined) {
             onChange(owners);
         }
     },[owners])
 
    const deleteOwner = (userName) => {
        var cloneArray = [...owners];
        setOwners(cloneArray.filter(function (ownerElt) { return !(ownerElt.subject === userName); }));
    };
 
     if (owners === undefined) {
         setOwners([]);
         return <div>This project has not been shared with anyone yet<br /><br /><UserSearchWidget /></div>;
     }
     
     if (owners.length === 0) {
         return <div>This project has not been shared with anyone yet<br /><br /><UserSearchWidget /></div>;
     }
     
     if (user === undefined) {
        return <div>Could not determine project sharing information<br /><br /><UserSearchWidget /></div>;
     }

     var content = (
        <Box key="sharetable-box">
            <TableContainer key="sharetable-container" component={Paper}>
                <Table key="sharetable-table" className={classes.table} aria-label="simple table" >
                    <TableHead key="sharetable-table-head">
                        <TableRow key="sharetable-table-head-row">
                            <TableCell key="sharetable-table-head-shared-with-cell"><Box fontWeight="fontWeightBold">Currently shared with</Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody key="sharetable-table-body">
                        { owners.sort((a, b) => (a.displayName > b.displayName) - (a.displayName < b.displayName)).map((owner) => (
                            <TableRow key={owner.subject + "-row"}>
                                <TableCell>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>
                                            <Box style={{marginTop: 2, marginLeft: 1}}>
                                                <AccountCircleIcon fontSize="large" color="primary" />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={9} >
                                            <Typography style={{ color: "grey" }} >
                                                <Box style={{marginBottom: 3}} fontWeight="fontWeightBold" display="flex" flexWrap="wrap" >
                                                    {   owner.subject == user.subject ? 
                                                        user.displayName + (user.organisationalUnit ? ", " + user.organisationalUnit : "")
                                                        :
                                                        owner.displayName + (owner.organisationalUnit ? ", " + owner.organisationalUnit : "")
                                                    }
                                                </Box>
                                                <Box display="flex" flexWrap="wrap">
                                                    { owner.subject == user.subject ? user.email : owner.email }
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {   owner.subject != user.subject ?
                                                    <IconButton style={{ marginLeft: 10 }} key={owner.subject + "-delete-button"} onClick={() => deleteOwner(owner.subject)} >
                                                        <DeleteIcon key={owner.subject + "-delete-icon"} color="primary" />
                                                    </IconButton>
                                                : <Box fontWeight="fontWeightBold" style={{ marginTop: 15, marginLeft: 20 }} >You</Box>
                                            }
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><br />
            <UserSearchWidget owners={ownersList} newOwners={newOwnersList} addNewOwners={(owners) => updateNewOwners(owners)}/>
        </Box>

     );
 
     return content;
 }
 
 export default ShareTable;