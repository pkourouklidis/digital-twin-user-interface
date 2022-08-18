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

const WorkerCard = ({ settings, isProcessing, startUpdatingSettings }) => {
    const classes = useStyles();

    const marks = [
        {
          value: 1,
          label: '1',
        },
        {
          value: 25,
          label: '25',
        },
      ];


    const skillmarks = [
        {
            value: 10,
            label: 'unskilled',
        },
        {
            value: 100,
            label: 'skilled',
        },
    ];

    const speedmarks = [
        {
            value: 10,
            label: 'slow',
        },
        {
            value: 100,
            label: 'fast',
        },
    ];

    function valuetext(value) {
        return `${value} worker(s)`;
      }

    function updateWorkers(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.workers = value;
        startUpdatingSettings(settingsClone);
    }

    function updateWorkerSkillBias(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.workerSkillBias = value;
        startUpdatingSettings(settingsClone);
    }

    function updateWorkerSpeedBias(value) {
        let settingsClone = JSON.parse(JSON.stringify(settings));
        settingsClone.workerSpeedBias = value;
        startUpdatingSettings(settingsClone);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                <Box style={{ display:'flex', justifyContent:'right' }}>Worker Configuration</Box>
                </Typography><br/><br/>
                <Typography gutterBottom>
                    Number of Workers
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.workers : 3}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={1}
                    max={25}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, val) => updateWorkers(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Worker Skill
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    value={settings ? settings.workerSkillBias : 50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="off"
                    marks={skillmarks}
                    onChange={(e, val) => updateWorkerSkillBias(val)}
                    disabled={settings == null || isProcessing}
                />
                </Box><br/><br/>
                <Typography gutterBottom>
                    Average Worker Speed
                </Typography>
                <Box style={{ display:'flex', justifyContent:'center'}}>
                <Slider
                    style={{ width: 350 }}
                    defaultValue={settings ? settings.workerSpeedBias : 50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="off"
                    marks={speedmarks}
                    onChange={(e, val) => updateWorkerSpeedBias(val)}
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(WorkerCard);