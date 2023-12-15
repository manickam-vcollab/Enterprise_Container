import React from 'react'
import EyeIcon from '../../icons/eyeIcon';
import EyeSlashIcon from '../../icons/eyeSlashIcon';
import IconButton  from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {useStyles } from './TreeStyle'
import clsx from 'clsx'


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
  


const VisiblilityIcon = (props:any) => {
 
    const classes = useStyles();

    if(props.node.state.visibility === true){
        return (
            <IconButton size='small' onClick = {(event: React.MouseEvent<HTMLButtonElement>) =>{event.stopPropagation(); props.onClick(false,props.node,true)}}>
                <EyeIcon  fontSize='small' className={clsx({[classes.actionShow]: props.node.state.visibility,
                                          [classes.actionShow]: !props.node.state.visibility,
                                    })} 
                width='16' height='16' />
            </IconButton>
        )
    }
    else{
        return (
            <IconButton  size='small' onClick = {(event: React.MouseEvent<HTMLButtonElement>) => {event.stopPropagation();props.onClick(true,props.node,true)}}>
                <EyeSlashIcon fontSize='small' className={clsx({[classes.actionShow]: props.node.state.visibility,
                                          [classes.actionHide]: !props.node.state.visibility,
                                    })} 
                                   
                width='16' height='16'/>
            </IconButton>
        )
    }
}

interface ShowHideProps {
  node: ITreeNode
  onToggle: (toShow:boolean,node:ITreeNode, undoable?: boolean) => void
  selected? : boolean
 
}

function ShowHide(props:ShowHideProps) {

    const classes = useStyles();
    const node = props.node;
    return (
        <Grid container alignItems='center' style={{width:'100%',height:'100%'}}>
            <Grid item>
            <VisiblilityIcon node = {node} 
             onClick={props.onToggle} ></VisiblilityIcon>
            </Grid>
        </Grid>
    )
}

export default ShowHide;


