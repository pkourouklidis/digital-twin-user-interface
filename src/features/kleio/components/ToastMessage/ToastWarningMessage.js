import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getWarningMessage } from '../../selectors';
import { connect } from 'react-redux';
import { setWarningMessage } from '../../thunks';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const ToastWarningMessage = ({ warningMessage, updateWarningMessage }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => { setShow(warningMessage != undefined && warningMessage != "") }, [warningMessage]);

  const clearMessage = () => {
    setShow(false);
    setTimeout(function(){ updateWarningMessage("") }, 1000);
  };

    return (
      <Snackbar open={show} onClose={() => clearMessage()} autoHideDuration={6000} anchorOrigin={ { vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={"warning"}>{warningMessage}</Alert>
      </Snackbar>
    )
  }

const mapStateToProps = state => ({
    warningMessage: getWarningMessage(state)
});

const mapDispatchToProps = dispatch => ({
    updateWarningMessage: (message) => dispatch(setWarningMessage(message))
})

export default connect(mapStateToProps,mapDispatchToProps)(ToastWarningMessage);