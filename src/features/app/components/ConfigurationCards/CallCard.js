import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { getProcessing, getSettings } from '../../selectors';
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

const CallCard = ({ settings, isProcessing, startUpdatingSettings }) => {
    const classes = useStyles();

    const marks = [
        {
          value: 1,
          label: '1 s.',
        },
        {
          value: 25,
          label: '25 s.',
        },
      ];

    const difficultymarks = [
        {
            value: 10,
            label: 'easy',
        },
        {
            value: 100,
            label: 'hard',
        },
    ];

    const bouncemarks = [
      {
        value: 10,
        label: '10 s.',
      },
      {
        value: 50,
        label: '50 s.',
      },
    ];

    const servicemarks = [
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
        return `${value} s.`;
      }

    function updateCallDelay(value) {
      let settingsClone = JSON.parse(JSON.stringify(settings));
      settingsClone.callDelay = value * 1000;
      startUpdatingSettings(settingsClone);
    }

    function updateDifficultyBias(value) {
      let settingsClone = JSON.parse(JSON.stringify(settings));
      settingsClone.difficultyBias = value;
      startUpdatingSettings(settingsClone);
    }

    function updateBounceWaitTime(value) {
      let settingsClone = JSON.parse(JSON.stringify(settings));
      settingsClone.bounceWaitTime = value;
      startUpdatingSettings(settingsClone);
    }

    function updateNormalServiceTime(value) {
      let settingsClone = JSON.parse(JSON.stringify(settings));
      settingsClone.normalServiceTime = value;
      startUpdatingSettings(settingsClone);
    }


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'right' }}>Call Configuration</Box>
                </Typography><br/><br/>
                <Typography gutterBottom>
                    Call Interval
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.callDelay / 1000 : 5}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={1}
                    max={25}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, val) => updateCallDelay(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Call Difficulty
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.difficultyBias : 50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="off"
                    marks={difficultymarks}
                    onChange={(e, val) => updateDifficultyBias(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Wait Time Until Call Gets Bounced
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.bounceWaitTime : 25}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={10}
                    max={50}
                    valueLabelDisplay="auto"
                    marks={bouncemarks}
                    onChange={(e, val) => updateBounceWaitTime(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Service Time
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.normalServiceTime : 15}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={5}
                    max={30}
                    valueLabelDisplay="auto"
                    marks={servicemarks}
                    onChange={(e, val) => updateNormalServiceTime(val)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CallCard);