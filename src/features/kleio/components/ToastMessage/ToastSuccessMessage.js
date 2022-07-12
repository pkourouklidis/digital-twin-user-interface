import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getSuccessMessage } from '../../selectors';
import { connect } from 'react-redux';
import { setSuccessMessage } from '../../thunks';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const ToastSuccessMessage = ({ successMessage, updateSuccessMessage }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => { setShow(successMessage != undefined && successMessage != "") }, [successMessage]);

  const clearMessage = () => {
    setShow(false);
    setTimeout(function(){ updateSuccessMessage("") }, 1000);
  };

    return (
      <Snackbar open={show} onClose={() => clearMessage()} autoHideDuration={6000} anchorOrigin={ { vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={"success"}>{successMessage}</Alert>
      </Snackbar>
    )
  }

const mapStateToProps = state => ({
    successMessage: getSuccessMessage(state)
});

const mapDispatchToProps = dispatch => ({
  updateSuccessMessage: (message) => dispatch(setSuccessMessage(message))
})

export default connect(mapStateToProps,mapDispatchToProps)(ToastSuccessMessage);