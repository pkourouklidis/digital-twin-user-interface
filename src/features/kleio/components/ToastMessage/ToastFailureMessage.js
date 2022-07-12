import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getFailureMessage } from '../../selectors';
import { connect } from 'react-redux';
import { setFailureMessage } from '../../thunks';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const ToastFailureMessage = ({ failureMessage, updateFailureMessage }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => { setShow(failureMessage  != undefined && failureMessage != "") }, [failureMessage]);

  const clearMessage = () => {
    setShow(false);
    setTimeout(function(){ updateFailureMessage("") }, 1000);
  };

    return (
      <Snackbar open={show} onClose={() => clearMessage()} autoHideDuration={6000} anchorOrigin={ { vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={"error"}>{failureMessage}</Alert>
      </Snackbar>
    )
  }

const mapStateToProps = state => ({
    failureMessage: getFailureMessage(state)
});

const mapDispatchToProps = dispatch => ({
  updateFailureMessage: (message) => dispatch(setFailureMessage(message))
})

export default connect(mapStateToProps,mapDispatchToProps)(ToastFailureMessage);