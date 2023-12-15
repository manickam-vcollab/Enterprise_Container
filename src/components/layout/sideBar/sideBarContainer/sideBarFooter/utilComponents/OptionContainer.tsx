import React from 'react'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'

function OptionContainer(props:any) {

    return (
        <Grid id='step20' container justify={props.justify? props.justify : 'space-around'} style={{width:'300px', height:'90px', top:'810px',left:'80px'}} >
            {props.children}
        </Grid>
    )
}

export default OptionContainer
