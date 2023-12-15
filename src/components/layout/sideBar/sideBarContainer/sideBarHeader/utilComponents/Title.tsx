import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


//import { colors } from '../../../config/index';

const useStyles = makeStyles((theme) => ({
    group: {

    },
    heading: {
        justifySelf: 'start',
        width: '100%',
        marginBottom: '2px',
        fontSize:theme.typography.body1.fontSize,
        fontWeight:theme.typography.body1.fontWeight,
        lineHeight:theme.typography.body1.lineHeight,
        color:theme.palette.text.secondary
      },
}));


function Title(props:{text:string, group?:string}) {
    const classes = useStyles();

    return (
        <Grid container spacing={0} direction='column' alignContent='center'>
        {/* <Grid item>
        <Typography classes={{caption: classes.group}} variant='caption' noWrap>
          {props.group}
        </Typography>
        </Grid> */}
        <Grid item>

          <div className={classes.heading} >

          {props.text}
        </div>
       
        </Grid>
        </Grid>
    )
}

export default Title
