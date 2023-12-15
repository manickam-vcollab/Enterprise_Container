import { useEffect} from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import MuiButton from '@material-ui/core/Button';
import {push ,goBack} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes";
import styles from './style'
// import FormControl from '@material-ui/core';
// import { useFormControl } from '@mui/material/FormControl';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MuiInput from '@material-ui/core/Input';

import MuiMenuItem from '@material-ui/core/MenuItem';
import  TreeView from '../../../shared/RcTree/Labels/LabelTreeView';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import SelectPointerIcon from '../../../shared/RcTree/SelectionPointer';

import {undoStack} from "../../../utils/undoStack";
import Button from '@material-ui/core/Button';                                                                                                                                                                                                                                                                                                

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import { selectCheckedLeafNodes, selectEditableNodeId, selectSelectionPointerId, setEditableNodeId, setSelectionPointerId,handleLabel2DCreation } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import {invertNode, expandNode, selectLabelData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel, setActiveLabel, handleProbeHeadCreation, handleMeasurementHeadCreation, selectedLeafNodes, reGroupLabel, selectActiveId, handleFaceHeadCreation,selectRouterHistory,setIsTitleEditable,setNewTitle} from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { windowPrefixId } from '../../../../store/sideBar/labelSlice/AllLabelSlice';

import { LabelType,Label3DType,LabelChartType,LabelAllType} from 'store/sideBar/labelSlice/shared/types';

import PanToolIcon from '@material-ui/icons/PanTool';

import { convertListToTree } from '../../../utils/tree';
import { DownloadStates } from 'store/sideBar/colormapSlice';
import { selectInteractionMode, setLabelInsertionState, selectActiveViewerID } from 'store/appSlice';
import {  useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { Layers, selectActiveLayers , selectWindowMgr, setActiveLayers, setEditMode,selectWindows} from '../../../../store/windowMgrSlice';
import { InteractionMode, probe, setInteractionMode, add3dLabelforNodeId } from 'backend/viewerAPIProxy';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SelectPoint from 'components/icons/selectPoint';
import { Typography } from '@material-ui/core';
import SelectionPointer from 'components/shared/RsTreeTable/SelectionPointer';
import SelectAction from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiTypography from "@material-ui/core/Typography";
import { selectdownloadedStatus } from 'store/sideBar/colormapSlice';


export default function PointLabel({...props}){
  const [checkInt, SetcheckInt] = useState<boolean>();
  // let checkInt: boolean = false
  const dispatch = useAppDispatch();  

  const treeDataRedux = useAppSelector(selectLabelData);
  const treeRootIds = useAppSelector(selectRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const interactionMode = useAppSelector(selectInteractionMode);
  const selectionPointerId : string = useAppSelector(selectSelectionPointerId)

  const [popOutActiveLabelID , setPopOutActiveLabelID] = useState("");

  const [textFieldValue, SetTextFieldValue] = useState<any>();
  
  const [popOutLabelID , setPopOutLabelID] = useState("");
  const viewerId = useAppSelector(selectActiveViewerID);

  const checkedNodes = useAppSelector(selectCheckedLeafNodes);
const downloadStatus=useAppSelector(selectdownloadedStatus)
  const [isPressed,setIsPressed] = useState(false);

  const routerHistory = useAppSelector(selectRouterHistory);

  const [isPointerIconSelect , setPointerIconSelect] = useState(true);

  const selectedLabelParentID:string|null = treeDataRedux[selectionPointerId]?.pid;

  const [dropdownSelectionID, setDropdownSelectionID] = useState(selectionPointerId);

 // onHover tree Ref 
  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);


  useEffect(()=>{

    applyInteractionMode();

    
  },[selectionPointerId])
  
  const selectedLabelParentData = roots.filter((treeData:any) => {
    
     if(treeData.pid === selectedLabelParentID) {

         if(treeData.id === selectionPointerId) {

            return treeData;


         }

     }
  });

 const selectionPointNodes = selectedLabelParentData[0]?.children;

 const hotspotLabels = roots.filter((treeData:any) => {
  if(treeData.pid === Label3DType.HOTSPOTPARENT) {
     return treeData;
  }
 })

 const useMyStyles = makeStyles<Theme>((theme) => ({
  buttonGroup:{
    width:'95%',
    height:'40px'
  },

  selected:{
    '&.Mui-selected':{
      backgroundColor: `${theme.palette.action.selected} !important`,
      color:`${theme.palette.accent.primaryText}`,
      // backgroundColor:"transparent !important",
      '&:hover':{
        color:theme.palette.accent.primaryText,
      },
    },
  },

  addButton: {
    textTransform:'none',
    height: '30px',
    // height: '95%',
    // justifyContent: "flex-start",
    backgroundColor:theme.palette.accent.primary,
    color:theme.palette.accent.primaryText,
    fontSize:theme.typography.body2.fontSize,
    fontFamily:theme.typography.fontFamily,
    '&:hover': {
      backgroundColor:theme.palette.accent.secondary,
      color: theme.palette.accent.primaryText,
    }
  },

  textBox: {
    background: theme.palette.divider,
  },
  
  buttton:{
    width:'95%',
    borderRightColor:'transparent',
    lineHeight:'5px',
    textTransform:'none',
    justifyContent: "flex-start",
    color:theme.palette.accent.primaryText,
    fontSize:theme.typography.body2.fontSize,
    fontFamily:theme.typography.fontFamily,
    backgroundColor:theme.palette.accent.primary,
    '&:hover': {
      backgroundColor:theme.palette.accent.secondary,
      color: theme.palette.accent.primaryText,
    }

  },
  applyButtonContainer:{
      marginTop:"20px",
      marginBottom:"20px",
     
  },
  applyButton:{
    color:theme.palette.accent.primaryText,
    backgroundColor:theme.palette.accent.primary,
    height:"30px",
    textTransform: 'none',
    '&:hover':{
      backgroundColor:theme.palette.accent.secondary,
    },
  },
  btn:{
      marginTop: 10,
      textAlign:"center",
  },
  divIcon:{
    display:'inherit',
    alignItems:'inherit',
    justifyContent:'inherit',
    marginLeft:'-10px'

  } ,
  divider:{
    position:'absolute',
    right:'0',
    height:'80%',
    border:'1px solid',
    borderLeftColor:theme.palette.text.secondary
  },
  dropdownButton:{
    width:'10%',
    marginLeft:'-1px',
    color:theme.palette.text.secondary,
    '&:hover': {
      backgroundColor:theme.palette.primary.main,
      color: theme.palette.text.primary,
    }

  },
  dropdownPaper:{
    width:'95%',
    marginTop:'10px',
    zIndex:99999999
    //backgroundColor:theme.palette.background.paper
  },
  menuItem:{
    color:theme.palette.text.secondary,
    fontSize:theme.typography.body2.fontSize,
    fontFamily:theme.typography.fontFamily,
    '&:hover svg': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      color: theme.palette.text.primary,
  }
  },
  selectButton:{
    border:'solid',
    borderWidth:'thin',
    minWidth:30,
    height:40,
    marginLeft:'30px',
    color: theme.palette.text.disabled,
    borderColor:theme.palette.text.disabled,
    borderRadius:'2px',
    '&:hover': {
        backgroundColor:theme.palette.primary.main,
        color: theme.palette.text.primary,
        borderColor:theme.palette.primary.main,
      }
  },

  text:{
    width:'190px',
    height:'20px'
  },
 
  icon: {
    height:"20px",
    width:"20px"
  },
  iconTextColor:{
    color:theme.palette.text.secondary,
    '&:hover svg':{
        color:theme.palette.text.primary
    }
} ,

selectWindowText:{
  fontSize:theme.typography.body2.fontSize,
  fontWeight:theme.typography.body2.fontWeight,
  lineHeight:theme.typography.body2.lineHeight,
  color:theme.palette.text.secondary,
  marginLeft:'20px'

},
hotspotButton:{
   textAlign : 'center',
   backgroundColor:theme.palette.accent.primary,
   width:"280px",
   color:theme.palette.accent.primaryText,
   fontSize:theme.typography.body2.fontSize,
   fontFamily:theme.typography.fontFamily,
   borderRadius: "10px",
  //  height:"40px",
   height:"35px",
   Padding: "0px, 10px, 0px, 10px",
   gap:"10px",
   lineHeight:theme.typography.body2.lineHeight,
   fontWeight:theme.typography.body2.fontWeight,
   marginTop:"20px",
   marginLeft:'10px',
   textTransform:"none",
   '&:hover':{
    backgroundColor:theme.palette.accent.secondary,
  },
},

}))

const classes = useMyStyles();

  const applyInteractionMode =()=>{

    if(selectedLabelParentID === LabelChartType.LINECHART){
      let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    }
    if(selectedLabelParentID === LabelChartType.LINECHART3D){
      let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    }
    if(selectedLabelParentID === Label3DType.PROBE){
      let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    }

    if(selectedLabelParentID === Label3DType.FACE){
      let mode = interactionMode !== InteractionMode.LABEL3D_FACE ? InteractionMode.LABEL3D_FACE : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_FACE));
    }

    if(selectedLabelParentID=== Label3DType.DISTANCE){
      let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT));
    }

    if(selectedLabelParentID=== Label3DType.ARC){
      let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC));
    }


  }

  const getHeaderRightIcon = () => {
    return (
      <div style={{display: "inherit"}}>
    
      <MuiIconButton className={classes.iconTextColor} aria-label="help" onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
      </MuiIconButton>
      </div>
    )
  }

  const onHandleAddSelectionPoint =()=> {

    setPointerIconSelect(!isPointerIconSelect);

    applyInteractionMode();

  }
  const handleCheck = (toCheck:boolean, nodeId:string, undoable?:boolean) => {
    dispatch(checkNode({toCheck,nodeId}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleCheck(!toCheck, nodeId),
          redo: () => handleCheck(toCheck, nodeId),
        }
      )
    }
  }

  const handleVisibility = (toShow:boolean,node:ITreeNode,undoable?:boolean) => {
    const leafIds = [node.id];
    const pids = [node.pid];
    dispatch(setCheckedVisibility({toShow, leafIds}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleVisibility(!toShow, node),
          redo: () => handleVisibility(toShow, node),
        }
      )
    }
  }

  const onHandlePopOut=(id:string)=>{
    setPopOutActiveLabelID(id)
    setPopOutLabelID(id)
   
   
    if(treeDataRedux[id].children.length > 0){
      

      if(popOutLabelID !== id){
 treeDataRedux[id].children.forEach((item)=>{
  dispatch(setEditMode({
          uid: windowPrefixId + item,
          isEdit: true
  
        }));
        dispatch(setActiveLayers([Layers.FRONT]));
        
  

 })

      }
      else{
        treeDataRedux[id].children.forEach((item)=>{
          dispatch(setEditMode({
                  uid: windowPrefixId + item,
                  isEdit: false
          
                }));
                dispatch(setActiveLayers([Layers.VIEWER]));
               
        
         })
     
         setPopOutLabelID("")
    }
  }
  else {
   
const labelID=windowPrefixId + id

    if( windows[labelID].isEditMode === false ){
    
      dispatch(setEditMode({
              uid: windowPrefixId + id,
              isEdit: true
      
            }));
            dispatch(setActiveLayers([Layers.FRONT]));
      
    
          }
      
          else{
       
              dispatch(setEditMode({
                      uid: windowPrefixId + id,
                      isEdit: false
              
                    }));
                    dispatch(setActiveLayers([Layers.VIEWER]));
                   
            
             
             setPopOutLabelID("")
        }  

  }
}


  const onHandleEdit=(id:string)=> {

    dispatch(setEditableNodeId(id));
    dispatch(push(Routes.All_LABELS_EDIT));
  }

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.LABELS
  }
  const handleResultsClick = (e:any) => {
  dispatch(dialogueState(dialogProps));
  }

  const onHandleSelect =(id:string)=> {

    dispatch(setSelectionPointerId(id));
    setDropdownSelectionID(id);
  }

  const handleExpand = (toOpen: boolean, nodeId: any) => {
    // dispatch(expandNode({ toOpen, nodeId }));
    let toOpenval = treeDataRedux[nodeId.node.id].state.expanded
    toOpenval=!toOpenval
    dispatch(expandNode({ toOpen: toOpenval, nodeId: nodeId.node.id }));
  };

  const onHanldehotspot=()=>{
    dispatch(push(Routes.HOTSPOT));
  }

  const onHandleInput=(e : any)=>{
    const vals : string[] = e.split(",");
    SetTextFieldValue(vals);
  }

  function checkIntegerArray(arr:any) {
    if(!Array.isArray(arr)) return false;
    return arr.every(function(element) {
      return /^\d+$/.test(element) && element > -1;
    });
  }
  
  const onHandleAddButton=()=>{
    if (checkIntegerArray(textFieldValue)) {
      SetcheckInt(false)
      //console.log('====onHandleAddButton',textFieldValue);
      textFieldValue.forEach((element : string, index : number) => {
        add3dLabelforNodeId("Probe_" + index,Label3DType.PROBE,[parseInt(element)],0,viewerId);
      });
    } else {
      SetcheckInt(true)
    }
  }

  const getAction = () => {
    return (
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={dropdownSelectionID}
      onChange={(e : any) => onHandleSelect(e.target.value)}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
       { 
        roots.map((item:any) => 
          <MuiMenuItem className= {classes.selected} value={item.id}>{item.title}</MuiMenuItem> 
      )}
      </SelectAction>
    );
  }

  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) => {
    dispatch(setIsTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {
    dispatch(setNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }

  const getBody = () => {
    const marginLeftVar = selectedLabelParentID === Label3DType.PROBE ? 0 : '-22px';
    return (
      <div ref = {containerRef} style={{marginTop:'10px'}}>

        <div style={{marginTop:'18px'}}>
             <span className={classes.selectWindowText}>Select Points from 3D Window</span>
              <div style={{float:'right',marginTop:'-8px',marginRight:'10px'}}>
                <SelectPointerIcon selected={isPointerIconSelect} onClick={()=>{onHandleAddSelectionPoint()}}></SelectPointerIcon>
              </div>
        </div>

        <Divider style= {{marginTop:"20px"}} variant='fullWidth' light={false}></Divider>

        {selectedLabelParentID === Label3DType.PROBE || selectedLabelParentID === Label3DType.ARC || selectedLabelParentID === Label3DType.DISTANCE ? <div>

          <div style={{float:'left',marginTop:'20px',marginRight:'10px', marginBottom:'5px'}}>
              <span className={classes.selectWindowText}>Add Probe: </span>
          </div>

          <div style={{float:'left',marginTop:'10px',marginBottom:'25px'}}>
            
                <MuiInput 
                  className={classes.textBox}
                  placeholder="Enter Node Id" 
                  disableUnderline={true}
                  value={textFieldValue}
                  onChange={(e) => onHandleInput(e.target.value)}
                  style={{marginLeft:'12px',border: checkInt ? '1px solid red': 'none'}}
                  inputProps={{style: { textAlign: 'left', 
                                        marginLeft:'10px', 
                                        },}}></MuiInput>
                
                <MuiButton 
                    className={classes.addButton} 
                    style={{marginLeft:'21px',marginBottom:'2px'}} 
                    variant="contained"
                    onClick={onHandleAddButton}
                    color="primary">
                      Add</MuiButton>

          </div>

          <Divider style= {{width:'100%'}} variant='fullWidth' light={false}></Divider>


        </div> : null}

        {selectedLabelParentID === Label3DType.PROBE?
            <MuiButton className={classes.hotspotButton} onClick={onHanldehotspot} disabled={downloadStatus !==DownloadStates.DOWNLOADED ? true : false }>Get Hotspots</MuiButton>:
        null}

        {selectedLabelParentID === Label3DType.PROBE?<Divider style= {{marginTop:"20px", width:'100%'}} variant='fullWidth' light={false}></Divider> :null}
        
       <div style={{marginLeft:marginLeftVar,marginTop:'10px'}}>

           <TreeView treedata={selectionPointNodes} nodes={treeDataRedux} defaultExpandAll expanded={expanded} handleExpand={handleExpand} check={handleCheck} containerwidth={containerWidth}  visibility={handleVisibility} popout={onHandlePopOut} edit={onHandleEdit}  isTitleEditable = {true} onHandleIsTitleEditable = {onHandleIsTitleEditable} setNewTitleTitle = {setNewTitleTitle}/> 

        </div>
      {/* {*hotspots tree */}

        <div style={{marginLeft:marginLeftVar,marginTop:'20px'}}>

          <TreeView treedata={hotspotLabels} nodes={treeDataRedux} defaultExpandAll expanded={expanded} handleExpand={handleExpand} check={handleCheck} containerwidth={containerWidth}  visibility={handleVisibility} popout={onHandlePopOut} edit={onHandleEdit}  isTitleEditable = {true} onHandleIsTitleEditable = {onHandleIsTitleEditable} setNewTitleTitle = {setNewTitleTitle}/> 

        </div>
       </div>
    )
  }

  const handleOnclickApply = () => {

    applyInteractionMode();
    dispatch(push(routerHistory));
  }
  
  const getFooter = () => {
    return(
      <div className={classes.btn}>
        {checkInt? (
          <MuiTypography style={{ marginBottom: "5px", fontSize: "14px" }}>
            Invalid Input.
          </MuiTypography>
        ):null}
        <div className={classes.applyButtonContainer}>
                    <MuiButton  
                    variant='contained'
                    className={classes.applyButton}
                       onClick={handleOnclickApply} 
                      size='small'
                    >
                      Apply
                    </MuiButton>
                  </div>
      </div>  
 
)
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Picker" } group="Labels"/>
            }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
