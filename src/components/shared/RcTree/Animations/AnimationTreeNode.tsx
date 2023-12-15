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
import { AnimationType } from 'store/sideBar/AnimationSlice/shared/types';
import { LabelType,Label3DType, LabelChartType } from 'store/sideBar/labelSlice/shared/types';
import {useAppDispatch, useAppSelector} from 'store/storeHooks';
import { selectSelectionPointerId } from 'store/sideBar/labelSlice/AllLabelSlice';

import SelectionPointer from '../SelectionPointer';

import { preProcessFile } from 'typescript';
import clsx from 'clsx'
import { useRef } from 'react';
import Input from '@material-ui/core/Input';

//Icons
import LinearIcon from 'components/icons/linear';
import TransientIcon from 'components/icons/transient';
import ViewPointIcon from 'components/icons/viewPoint';
// import AddNotes from '../../../icons/labelNotes';
// import PointLabelIcon from '../../../icons/pointLabel';
// import FaceLabelIcon from '../../../icons/faceLabel';
// import PointToPointLabelIcon from '../../../icons/pointToPointLabel';
// import LabelArcPointIcon from '../../../icons/labelArcPoint';
// import XYPlotsIcon from '../../../icons/xyplots';


import EditIcon from '../../../icons/edit';


const AnimationTitle = ({...props} ) => {


const selectionPointerId : string = useAppSelector(selectSelectionPointerId);

const treenoderef=useRef() as React.MutableRefObject<HTMLInputElement>;

const treenodeleftWidth=treenoderef.current?.offsetLeft

const treenodeWidth= props.conwidth - treenodeleftWidth

const style = useStyles();

const { hovered, ref } = useHover()
const useOverlay=()=>{

const edit= <ActionIcon  className={clsx(style.iconHover)}><div className={props.node.state.visibility==false  ? style.disabled : ""}  onClick={(event)=> props.onHandleEdit(props.node.id)}><EditIcon  fontSize="inherit"></EditIcon></div></ActionIcon>
  return [edit]
}

const [edit]=  useOverlay(); 


const getOverlayIcons=(pid:string)=>{
    if( pid == AnimationType.LINEAR || pid== AnimationType.EIGEN || pid== AnimationType.TRANSIENT || pid== AnimationType.VIEWPOINT)
    {
  return [edit] 
    
  }
  
  
      
} 

const getIcon =(pid:string)=> {


  let icon = null;

  switch (pid) {

    case AnimationType.LINEAR :
    icon = <LinearIcon fontSize="inherit" />
    break;
    case AnimationType.EIGEN :
    icon = <LinearIcon fontSize="inherit" />
    break ;
    case AnimationType.TRANSIENT :
    icon = <TransientIcon fontSize="inherit" />
    break ;
    case AnimationType.VIEWPOINT :
    icon = <ViewPointIcon fontSize="inherit" />
    break ;
   
    

  }
  return icon
  
}

  return (
    <div ref={treenoderef} >
   
    <div  style={{width: treenodeWidth }}  
    onDoubleClick = {()=>{
      if(props.isTitleEditable === true)
      props.onHandleIsTitleEditable(props.node.id,true);
    }}
     ref={ref} >
         <Group spacing="sm">

         <Checkbox className={style.checkbox} disabled={props.node.state.visibility == false ? true : false} style={{opacity:props.node.state.visibility ? 1.0 : 0.5}} size='small' checked= {props.node.state.checked} indeterminate={props.node.state.partiallyChecked} disableRipple onClick={(e:React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} onChange = {(e:any) => props.onCheck(e.target.checked,props.node.id, true)}></Checkbox>
       
         {props.labelIcon && props.node.pid === AnimationType.LINEAR || props.node.pid === AnimationType.EIGEN || props.node.pid === AnimationType.TRANSIENT || props.node.pid === AnimationType.VIEWPOINT ? <div className={props.node.state.visibility==false  ? style.disabled : ""} style={{marginTop:'5px'}}>{ getIcon(props.node.pid)}</div>:null}
         {props.node.isTitleEditable ? <Input type="text" style={{width:'80%'}} defaultValue= {props.node.title} autoFocus={true}
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
               getOverlayIcons(props.node.pid)
            }
          
           

          </div>
       </div> : null
       }
      </Group>

    </div>
 
    </div>
  )
}

export default AnimationTitle
