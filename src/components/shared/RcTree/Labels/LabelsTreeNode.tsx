import { Text, Group, Button, ActionIcon } from '@mantine/core'
import {Typography } from '@material-ui/core';
import { useHover } from '@mantine/hooks'
import { Eye, Link } from 'tabler-icons-react';
import InvertCell from '../Invert';
import ShowHide from '../ShowHide';
import SelectPointerIcon from '../SelectionPointer';
import Grid from '@material-ui/core';
import {useStyles} from '../TreeStyle';
import Checkbox from '../../checkbox'
import { LabelType,Label3DType, LabelChartType } from 'store/sideBar/labelSlice/shared/types';
import {useAppDispatch, useAppSelector} from 'store/storeHooks';
import { selectSelectionPointerId } from 'store/sideBar/labelSlice/AllLabelSlice';
import Input from '@material-ui/core/Input';

import SelectionPointer from '../SelectionPointer';

import { preProcessFile } from 'typescript';
import clsx from 'clsx'
import { useTheme } from "@material-ui/core/styles";
import { useRef } from 'react';

//Icons

import AddNotes from '../../../icons/labelNotes';
import PointLabelIcon from '../../../icons/pointLabel';
import FaceLabelIcon from '../../../icons/faceLabel';
import PointToPointLabelIcon from '../../../icons/pointToPointLabel';
import LabelArcPointIcon from '../../../icons/labelArcPoint';
import XYPlotsIcon from '../../../icons/xyplots';


import EditIcon from '../../../icons/edit';
import PopOutIcon from '../../../icons/popout';


const LabelTitle = ({...props} ) => {


const selectionPointerId : string = useAppSelector(selectSelectionPointerId);

const treenoderef=useRef() as React.MutableRefObject<HTMLInputElement>;

const treenodeleftWidth=treenoderef.current?.offsetLeft

const treenodeWidth= props.conwidth - treenodeleftWidth

const style = useStyles();

const theme = useTheme();

const { hovered, ref } = useHover()
const useOverlay=()=>{

const edit= <ActionIcon  className={clsx(style.iconHover)}><div style={{color:theme.palette.action.active}}  className={props.node.state.visibility==false  ? style.disabled : ""}  onClick={(event)=> props.onHandleEdit(props.node.id)}><EditIcon  fontSize="inherit"></EditIcon></div></ActionIcon>
const selection=   <ActionIcon  className={clsx(style.iconHover)}><div style={{color:theme.palette.action.active}}  className={props.node.state.visibility==false  ? style.disabled : ""}> <SelectionPointer node = {props.node} selected={props.selectionPointerId === props.node.id} onClick={(event)=>props.onHandleSelect(props.node)}></SelectionPointer></div></ActionIcon>
const popout=   <ActionIcon  className={clsx(style.iconHover)}><div style={{color:theme.palette.action.active}}  className={props.node.state.visibility==false  ? style.disabled : ""}  onClick={(event)=> props.onHandlePopOut(props.node.id)}><PopOutIcon  fontSize="inherit"></PopOutIcon></div></ActionIcon>
const visible=   <ActionIcon  className={clsx(style.iconHover)}><ShowHide  node = {props.node} onToggle={props.handlevisibility} ></ShowHide></ActionIcon>
  return [edit,selection,popout,visible]
}

const [edit,selection,popout,visible]=  useOverlay(); 


const getOverlayIcons=(pid:string, node?:any)=>{
    if( pid === LabelType.LABEL2D || pid=== LabelType.LABELCHART)
    {
  return [popout,edit,visible] 
    
  }
  if(pid === Label3DType.DISTANCE || pid === Label3DType.PROBE ||  pid === Label3DType.ARC || pid === LabelType.MEASUREMENT || pid === LabelChartType.LINECHART || pid === LabelChartType.LINECHART3D  || pid === Label3DType.FACE){
    return ((pid === LabelChartType.LINECHART) ? [popout,edit,visible,selection] : [edit,selection])
  }
  else{
    return((node.title && node.title.includes("Node:") || node.type === LabelChartType.LINECHART)  ? [visible] : [popout,visible])
  }
 
  
  
      
} 

const getIcon =(pid:string)=> {


  let icon = null;

  switch (pid) {

    case LabelType.LABEL2D :
    icon = <AddNotes fontSize="inherit" />
    break;
    case Label3DType.PROBE :
    icon = <PointLabelIcon fontSize="inherit" />
    break ;
    case Label3DType.FACE :
    icon = <FaceLabelIcon fontSize="inherit" />
    break ;
    case Label3DType.DISTANCE :
    icon = <PointToPointLabelIcon fontSize="inherit" />
    break ;
    case Label3DType.ARC :
    icon = <LabelArcPointIcon fontSize="inherit" />
    break ;
    case  LabelType.LABELCHART :
    case  LabelChartType.LINECHART3D :
    case  LabelChartType.LINECHART : {
     icon = <XYPlotsIcon fontSize="inherit" />
     break ;

    }

  }
  return icon
  
}


const styleProps = {

  color:props.node.state.visibility ? theme.palette.text.secondary : theme.palette.text.disabled 
}

  return (
    <div ref={treenoderef} >
   
    <div  style={{width: treenodeWidth }}   
    onDoubleClick = {()=> {
      if(props.isTitleEditable === true && props.node.type !== Label3DType.PROBEPARENT && props.node.type !== Label3DType.HOTSPOTPARENT)
      props.onHandleIsTitleEditable(props.node.id,true);
    }}
    ref={ref} >
         <Group spacing="sm">

         <Checkbox className={style.checkbox} style={{styleProps}}  size='small' checked= {props.node.state.checked} indeterminate={props.node.state.partiallyChecked} disableRipple onClick={(e:React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} onChange = {(e:any) => props.onCheck(e.target.checked,props.node.id, true)}></Checkbox>
       
         {props.labelIcon ? <div className={props.node.state.visibility==false  ? style.disabled : ""} style={{marginTop:'5px'}}>{ getIcon(props.node.pid)}</div>:null}
         {props.node.isTitleEditable ? <Input type="text" style={{width:'40%'}} defaultValue= {props.node.title} autoFocus={true}
          onChange={event => props.setNewTitleTitle(props.node.id,event.target.value)}
          onMouseLeave={(event)=>{
          if(props.node.title.length >=1) {
            props.onHandleIsTitleEditable(props.node.id,false);
          }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Escape') {
              if(props.node.title.length >=1) {
                props.onHandleIsTitleEditable(props.node.id,false);
                event.preventDefault()
                event.stopPropagation() 
              }
            }
          }}/>:
         <Typography 
         align='left'
          style={{
             maxWidth: "75%",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            alignContent:'left' 
          }}
          className={props.node.state.visibility==false  ? style.disabled : ""} >

          {props.node.title}
   
         </Typography>}
 
         {
       
      hovered ? 
       <div className={style.overlaystyling}>
       <div className={style.overlayicons} >
    
           {
               getOverlayIcons(props.node.pid, props.node)
            }
          
           

          </div>
       </div> : null
       }
      </Group>

    </div>
 
    </div>
  )
}

export default LabelTitle
