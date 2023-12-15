import React from 'react'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Checkbox from '../checkbox'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {useStyles} from './styles/TreeNodeStyle'
import { ITreeNode } from '.'
import Title from '../RsTreeWithSearch/utilComponents/TitleNode'


interface ITreeNodeProps {
    node: ITreeNode,
    rowData?: any,
    onCheck: (isChecked:boolean,id:string, undoable?:boolean) => void,
    children: any,
}

const styles = makeStyles((theme)=>({

    contentStyle :{
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        color:theme.palette.text.secondary
    }

}))

function TreeNode(props:ITreeNodeProps) {

    const node = props.node;
    const style = styles();
    const classes = useStyles({});


    return (
        <Grid container className={node.state.visibility ?classes.actionShow:classes.actionHide} alignItems='center' >
            <Grid item>
            <Checkbox id='step24' style={{opacity:node.state.visibility ? 1.0 : 0.5}} size='small' checked= {node.state.checked} indeterminate={node.state.partiallyChecked} disableRipple onClick={(e:React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} onChange = {(e:any) => props.onCheck(e.target.checked,node.id, true)}></Checkbox>
            </Grid>
            <Grid item className={style.contentStyle}>
            <Title rowData={props.rowData ? props.rowData : props.node}/>
             </Grid>
        </Grid>
    )
}

export default TreeNode
