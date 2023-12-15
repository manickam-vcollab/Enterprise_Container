import React, { useEffect, useState,useRef } from 'react'
import clsx from 'clsx'
import SwapIcon from '@material-ui/icons/SwapHoriz';

import IconButton  from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {useStyles} from './TreeStyle'


export interface ITreeNodeState {
    checked?: boolean,
    partiallyChecked?: boolean,
    expanded?: boolean,
    highlighted?: boolean,
    visibility?: boolean,
    selected?: boolean
  }
  
  export interface ITreeNode {
    id:string,
    pid:string|null,
    title:string,
    children:string[],
    isGroup?:boolean,
    state:ITreeNodeState,
    attributes?:any
  }
  


const InvertIcon = (props:any) => {


        const classes = useStyles();

        return <SwapIcon fontSize='small' className={clsx({[classes.actionShow]: props.node.state.visibility,
            [classes.actionHide]: !props.node.state.visibility,
                                    })} 
                width='16' height='16'  />
}

interface InvertCellProps {
    node: ITreeNode,
    onClick : (node:ITreeNode, undoable?: boolean) => void,
    selected? : boolean,
 
}

function InvertCell(props:InvertCellProps) {

    const classes = useStyles();
    return (
        <>
        
  
        <Grid container alignItems='center'   style={{height:'100%',width:'100%'}}>
            <Grid item>
            
                <IconButton size="small"  onClick = {  (event: React.MouseEvent<HTMLButtonElement>) => {event.stopPropagation();props.onClick(props.node,true)} }                          >
               
                <InvertIcon node={props.node}>

                
                </InvertIcon>
                </IconButton>
            </Grid>
        </Grid> 

        
</>
    
  
    )
}

export default InvertCell;

