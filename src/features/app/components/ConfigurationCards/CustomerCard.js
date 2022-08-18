import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { getSettings, getProcessing } from '../../selectors';
import { updateSettings } from '../../thunks';

const useStyles = makeStyles({
    root: {
      width: 450,
      height: 580,
      marginTop: 15,
      marginLeft: 15
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    }
  });

const CustomerCard = ({settings, isProcessing, startUpdatingSettings}) => {
    const classes = useStyles();

    const waittimemarks = [
        {
            value: 10,
            label: 'patient',
        },
        {
            value: 100,
            label: 'impatient',
        },
    ];

    const servicetimemarks = [
        {
            value: 10,
            label: 'patient',
        },
        {
            value: 100,
            label: 'impatient',
        },
    ];

    const understandingmarks = [
        {
            value: 10,
            label: 'tolerant',
        },
        {
            value: 100,
            label: 'intolerant',
        },
    ];

    const marks = [
        {
          value: 5,
          label: '5 s.',
        },
        {
          value: 30,
          label: '30 s.',
        },
      ];

    function valuetext(value) {
        return `${value} worker(s)`;
    }

    function updateNormalWaitTime(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.normalWaitTime = value;
        startUpdatingSettings(settingsClone);
    }

    function updateWaitTimeBias(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.waitTimeBias = value;
        startUpdatingSettings(settingsClone);
    }

    function updateServiceTimeBias(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.serviceTimeBias = value;
        startUpdatingSettings(settingsClone);
    }

    function updateUnderstandingBias(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.understandingBias = value;
        startUpdatingSettings(settingsClone);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'right' }}>Customer Configuration</Box>
                </Typography><br/><br/>
                <Typography gutterBottom>
                    Expected Wait Time
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.normalWaitTime : 10}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={5}
                    max={30}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, val) => updateNormalWaitTime(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Patience During Waiting
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.waitTimeBias : 50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="off"
                    marks={waittimemarks}
                    onChange={(e, val) => updateWaitTimeBias(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Patience During Service
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.serviceTimeBias : 50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="off"
                    marks={servicetimemarks}
                    onChange={(e, val) => updateServiceTimeBias(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Understanding for Failure
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.understandingBias : 50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="off"
                    marks={understandingmarks}
                    onChange={(e, val) => updateUnderstandingBias(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => ({
    settings: getSettings(state),
    isProcessing: getProcessing(state)
  });
  
  const mapDispatchToProps = dispatch => ({
    startUpdatingSettings: (settings) => dispatch(updateSettings(settings)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCard);