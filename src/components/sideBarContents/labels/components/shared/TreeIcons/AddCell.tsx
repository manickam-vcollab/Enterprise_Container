import React from 'react'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add';
import {useStyles, useCustomStyles } from '../../../../../shared/RsTreeTable/styles/TreeNodeStyle'
import ToggleButton  from '@material-ui/lab/ToggleButton';
import Grid from '@material-ui/core/Grid';
import { ITreeNode } from '../../../../../shared/RsTreeTable'
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from '@material-ui/lab/ToggleButton';

// const Add = (props:any) => {
//         const classes = useStyles();
//         return <AddIcon fontSize='small' className={clsx({[classes.actionShow]: props.visibility,
//                                           [classes.actionHide]: !props.visibility,
//                                     })} 
//                 width='16' height='16' />
// }

// const useBtnStyles = makeStyles(theme => ({
//     toggleBtnSmall : {
//         padding: 1
//     }
// }))
interface AddCellProps {
    node: ITreeNode,
    selected: boolean,
    onToggle : (node:ITreeNode) => void
}

function AddCell(props:AddCellProps) {
    
    const classes = useStyles();
    const toggleButtonClass = useCustomStyles()
    // const toggleBtnClasses = useBtnStyles();
    return (
        // <Grid container alignItems='center' className={classes.hideText} style={{height:'100%',width:'100%'}}>
        //     <Grid item>
        //         <MuiToggleButton style={{marginLeft:10}} className={toggleButtonClass.root} classes={{sizeSmall:toggleBtnClasses.toggleBtnSmall}} size="small"  
        //         selected={props.selected}
        //         onClick = {() => props.onToggle(props.node)}>
        //         <Add  visibility = {props.node.state.visibility} >
        //         </Add>
        //         </MuiToggleButton>
        //     </Grid>
        // </Grid>
        <MuiToggleButton style={{marginLeft:'10px'}} className={toggleButtonClass.root} selected = {props.selected} disabled={false} onClick = {(event: React.MouseEvent<HTMLButtonElement>) => {event.stopPropagation();props.onToggle(props.node)}} >
          <AddIcon className = {toggleButtonClass.icon} />
        </MuiToggleButton>
    )
}

export default AddCell;

