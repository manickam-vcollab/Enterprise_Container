import React from 'react'
//import { ITreeNode } from '.';
import MuiIconButton from '@material-ui/core/IconButton';
import SelectPointIcon from 'components/icons/selectPoint';
import {useCustomStyles, useStyles } from './styles/TreeNodeStyle';
import MuiToggleButton from '@material-ui/lab/ToggleButton';

// interface SelectionPointerProps {
//     node: ITreeNode
//     onClick: (node:ITreeNode) => void
//     selected : boolean
// }


export default function SelectionPointer(props:any){


     const toggleButtonClass = useCustomStyles()
     const classes = useStyles();

    return(
        <MuiToggleButton style={{marginLeft:'10px'}} className={toggleButtonClass.root}  selected = {props.selected} disabled={false}  >
          <SelectPointIcon className = {toggleButtonClass.icon} {...props} />
        </MuiToggleButton>
    )
}