import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getInfoMessage } from '../../selectors';
import { connect } from 'react-redux';
import { setInfoMessage } from '../../thunks';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const ToastInfoMessage = ({ infoMessage, updateInfoMessage }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => { setShow(infoMessage != undefined && infoMessage != "") }, [infoMessage]);

  const clearMessage = () => {
    setShow(false);
    setTimeout(function(){ updateInfoMessage("") }, 1000);
  };

    return (
      <Snackbar open={show} onClose={() => clearMessage()} autoHideDuration={6000} anchorOrigin={ { vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={"info"}>{infoMessage}</Alert>
      </Snackbar>
    )
  }

const mapStateToProps = state => ({
    infoMessage: getInfoMessage(state)
});

const mapDispatchToProps = dispatch => ({
    updateInfoMessage: (message) => dispatch(setInfoMessage(message))
})

export default connect(mapStateToProps,mapDispatchToProps)(ToastInfoMessage);