import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import { AuthenticationContext } from '@BETALAB/betalab-react-auth';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { getFoundUsers, getSearchUsersInProgress } from '../../selectors';
import { searchUsers, resetFoundUsers } from '../../thunks';

const UserSearchWidget = ({ addNewOwners, foundUsers, searchUsersInProgress, startSearchingUsers, clearSearchedUsers, owners, newOwners }) => {
    const [searchKey, setSearchKey] = React.useState("");

    const auth = useContext(AuthenticationContext);

    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    
    const processInput = debounce((key) => performSearch(key));

    const performSearch = (key) => {
        setSearchKey(key);
        if (key == "") {
            clearSearchedUsers()
        } else {
            let knownOwnersClone = [...owners];
            let newOwnersClone = [...newOwners];
            const ownerArray = knownOwnersClone.map((elt) => elt.subject).concat(newOwnersClone);
            startSearchingUsers(key, [...new Set(ownerArray)], auth);
        }
    };

    return (
        <Autocomplete
            multiple
            size="small"
            forcePopupIcon={false}
            options={foundUsers}
            getOptionLabel={(option) => option.displayName || ''}
            loading={searchUsersInProgress}
            loadingText="Searching..."
            noOptionsText={'No users found'}
            open={searchKey != ""}
            filterOptions={(options) => options}
            renderOption={(option) => (
                <React.Fragment key={'option-fragment-' + option.sub}>
                    <Grid container spacing={2} key={'option-grid-' + option.sub}>
                        <Grid item xs={1} key={'option-account-grid-icon-' + option.sub}>
                            <Box style={{marginTop: 2, marginLeft: 1}} key={'option-account-icon-box-' + option.sub}>
                                <AccountCircleIcon key={'option-account-icon-' + option.sub} fontSize="large" color="primary" />
                            </Box>
                        </Grid>
                        <Grid item xs={11} key={'option-grid-details-' + option.sub}>
                            <Typography style={{ color: "grey" }} key={'option-typography-details-' + option.sub}>
                                <Box style={{marginBottom: 3}} key={'option-details-box-' + option.sub} fontWeight="fontWeightBold" display="flex" flexWrap="wrap" >
                                    {option.displayName + (option.organisationalUnit ? ", " + option.organisationalUnit : "")}
                                </Box>
                                <Box display="flex" flexWrap="wrap" key={'option-email-box-' + option.sub}>
                                    {option.email}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>                 
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Find users..."
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
            )}
            onChange={ (e, obj) => { addNewOwners(obj) } }
            onInputChange={ (e, obj) => { processInput(obj) } }
        />
    )
}

const mapStateToProps = state => ({
    foundUsers: getFoundUsers(state),
    searchUsersInProgress: getSearchUsersInProgress(state),
});

const mapDispatchToProps = dispatch => ({
    startSearchingUsers: (key, excludes, authContext) => dispatch(searchUsers(key, excludes, authContext)),
    clearSearchedUsers: () => dispatch(resetFoundUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchWidget);