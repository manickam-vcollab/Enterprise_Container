import React from 'react'
import { ITreeNode } from '.';
import MuiEditIcon from '@material-ui/icons/EditOutlined'
import {useCustomStyles, useStyles } from './styles/TreeNodeStyle';
import MuiToggleButton from '@material-ui/lab/ToggleButton';





interface EditButtonProps {
    disabled : boolean,
    onClick: (node:ITreeNode) => void
}


export default function EditButton(props:EditButtonProps){
    const toggleButtonClass = useCustomStyles()
    const classes = useStyles();

    return(
        <MuiToggleButton style={{border:'none'}} className={`${toggleButtonClass.root} ${toggleButtonClass.editIcon}`} disabled = {props.disabled}  onClick = {(event: React.MouseEvent<HTMLButtonElement>) => {event.stopPropagation();props.onClick()}} >
          <MuiEditIcon className = {toggleButtonClass.icon} />
        </MuiToggleButton>
    )
}