import React from 'react'
import { ITreeNode } from '.';
import MuiIconButton from '@material-ui/core/IconButton';
import SelectPointIcon from 'components/icons/selectPoint';
import {useCustomStyles, useStyles } from './styles/TreeNodeStyle';
import MuiToggleButton from '@material-ui/lab/ToggleButton';

interface SelectionPointerProps {
    node: ITreeNode
    onClick: (node:ITreeNode) => void
    selected : boolean
}


export default function SelectionPointer(props:SelectionPointerProps){
    const toggleButtonClass = useCustomStyles()
    const classes = useStyles();

    return(
        <MuiToggleButton style={{marginLeft:'10px'}} className={toggleButtonClass.root} selected = {props.selected} disabled={false} onClick = {(event: React.MouseEvent<HTMLButtonElement>) => {event.stopPropagation();props.onClick(props.node)}} >
          <SelectPointIcon className = {toggleButtonClass.icon} />
        </MuiToggleButton>
    )
}