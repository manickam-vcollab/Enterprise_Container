import React from 'react'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({

    selectionContent: {
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        color:theme.palette.text.secondary
      },
      select: {
        '&.MuiOutlinedInput-root': {
          width: '200px'
        },
       '& .MuiOutlinedInput-notchedOutline': {
           borderColor: 'red',
             '&:hover': {
             borderColor: 'green'
           }
        },
   
       },
     icon: {
        fill: theme.palette.text.secondary,
    },

}));

function SelectAction(props:any) {

    const classes = useStyles();
    
    return (
        <FormControl   style={{width:'100%', margin:'auto',padding:2}}>
            <InputLabel 
            >{props.label ?? "Apply To"}</InputLabel>
            <Select
            className={clsx(classes.selectionContent,classes.select)}
            inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
            {...props}
            >
            {props.children}
            </Select>
        </FormControl>

    )
}

export default SelectAction

