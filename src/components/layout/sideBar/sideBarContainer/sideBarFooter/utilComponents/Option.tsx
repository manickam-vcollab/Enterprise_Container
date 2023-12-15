import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles, createStyles} from '@material-ui/core/styles';



interface IOptionProp {
    id : string,
    label: string,
    icon: any,
    active:boolean,
    onClickUpdate:()=> void
}

const useStyles = makeStyles(theme => createStyles({
    iconColor: {
        color:theme.palette.text.secondary,
        "&:hover": {
            cursor:'pointer',
            color: theme.palette.text.primary,
            fill:theme.palette.text.primary,
            opacity: 1
          }
       
    },
    hoverEffect:{
        "&:hover": {
            cursor:'pointer',
            color: theme.palette.text.primary,
            fill:theme.palette.primary.main,
            opacity: 1
          }
    },

    disabled1:{
        color:theme.palette.text.disabled,
        pointerEvents:'none'
           },
           
}))

function Option(props:IOptionProp) {
    const classes = useStyles();


    return (
        <Grid id={props.id} item xs={3} style={{display: 'flex', alignItems : 'center'}} className={props.active ? classes.disabled1 : classes.iconColor  } onClick = {props.onClickUpdate} >
        <Grid container item direction='column'>
        <Grid item >
            <props.icon/>
        </Grid>
        <Grid item style={{marginTop:'-4px'}}>
            <Typography variant='overline' style={{textTransform:'none'}} >{props.label}</Typography>    
        </Grid>
        </Grid>
    </Grid>
    )
}

export default Option
