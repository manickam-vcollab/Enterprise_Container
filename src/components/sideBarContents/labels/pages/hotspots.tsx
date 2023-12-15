import { useEffect} from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import MuiButton from '@material-ui/core/Button';
import {push ,goBack} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes";
import styles from './style'

import MuiMenuItem from '@material-ui/core/MenuItem';
import  TreeView from '../../../shared/RcTree/Labels/LabelTreeView';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import SelectPointerIcon from '../../../shared/RcTree/SelectionPointer';
import { Group} from '@mantine/core'
import {undoStack} from "../../../utils/undoStack";
import Button from '@material-ui/core/Button';                                                                                                                                                                                                                                                                                                

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import { selectCheckedLeafNodes, selectEditableNodeId, selectSelectionPointerId, setEditableNodeId, setSelectionPointerId,handleLabel2DCreation,handleHotspotsHeadCreation } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import {invertNode, expandNode, selectLabelData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel, setActiveLabel, handleProbeHeadCreation, handleMeasurementHeadCreation, selectedLeafNodes, reGroupLabel, selectActiveId, handleFaceHeadCreation,selectRouterHistory,setHotspotCircularProgress,selectHotspotCircularProgressbar,deleteHotspotLeafNodes} from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { windowPrefixId } from '../../../../store/sideBar/labelSlice/AllLabelSlice';

import { LabelType,Label3DType,LabelChartType } from 'store/sideBar/labelSlice/shared/types';

import PanToolIcon from '@material-ui/icons/PanTool';

import { convertListToTree } from '../../../utils/tree';
import Checkbox from 'components/shared/checkbox';

import { selectInteractionMode, setLabelInsertionState, selectActiveViewerID } from 'store/appSlice';
import {  useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { Layers, selectActiveLayers , selectWindowMgr, setActiveLayers, setEditMode,selectWindows} from '../../../../store/windowMgrSlice';
import { InteractionMode, probe, setInteractionMode, IHotspotParams, getHotspotData, add3dLabelforNodeIndex } from 'backend/viewerAPIProxy';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from "../components/shared/SearchIcon";
import SelectPoint from 'components/icons/selectPoint';
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from '@material-ui/core/Grid';
import SelectionPointer from 'components/shared/RsTreeTable/SelectionPointer';
import SelectAction from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

import { updateHotSpotInfo } from "../../../../store/sideBar/labelSlice/AllLabelSlice"
import {
  selectedColormapID,
  selectcolormapData
} from "../../../../store/sideBar/colormapSlice";
import { nanoid } from '@reduxjs/toolkit';

// css for hotspot circularbar
import './hotspots.css';

export default function Hotspots({...props}){
  const dispatch = useAppDispatch();  

  const treeDataRedux = useAppSelector(selectLabelData);
  const treeDataReduxColorMap = useAppSelector(selectcolormapData);
  const treeRootIds = useAppSelector(selectRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
  
  const interactionMode = useAppSelector(selectInteractionMode);
  const selectionPointerId : string = useAppSelector(selectSelectionPointerId)

  const selectedColorMapId = useAppSelector(
    (state) => state.colormap.selectedColorMapId
  );

  const [popOutActiveLabelID , setPopOutActiveLabelID] = useState("");
  
  const [popOutLabelID , setPopOutLabelID] = useState("");
  const viewerId = useAppSelector(selectActiveViewerID);

  const checkedNodes = useAppSelector(selectCheckedLeafNodes);

  const [isPressed,setIsPressed] = useState(false);

  const routerHistory = useAppSelector(selectRouterHistory);

  const [isPointerIconSelect , setPointerIconSelect] = useState(true);

  const selectedLabelParentID:string|null = treeDataRedux[selectionPointerId].pid;

  const [dropdownSelectionID, setDropdownSelectionID] = useState(selectionPointerId);

  const isCircularProgress = useAppSelector(selectHotspotCircularProgressbar);

 // onHover tree Ref 
  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);


  useEffect(()=>{

    applyInteractionMode();
    
  },[])
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

  const labelData = treeDataRedux[selectionPointerId].hotSpotData

  const [minValue, setMinValue] = useState(labelData?labelData.minValue:0);
  const [isMinChecked, setIsMinChecked] = useState(labelData?labelData.isMinChecked:false)
  const [maxValue, setMaxValue] = useState(labelData?labelData.maxValue:0);
  const [isMaxChecked, setIsMaxChecked] = useState(labelData?labelData.isMaxChecked:false)
  const [topValue, setTopValue] = useState(labelData?labelData.topValue:2);
  const [isTopChecked, setIsTopChecked] = useState(labelData?labelData.isTopChecked:true);
  const [bottomValue, setBottomValue] = useState(labelData?labelData.bottomValue:2);
  const [isBottomChecked, setIsBottomChecked] = useState(labelData?labelData.isBottomChecked:false);

  const hotSpotData = {
    minValue:minValue,
    isMinChecked:isMinChecked,
    maxValue:maxValue,
    isMaxChecked:isMaxChecked,
    topValue:topValue,
    isTopChecked:isTopChecked,
    bottomValue:bottomValue,
    isBottomChecked:isBottomChecked
}

  const hotspotsData = [
    {
        id:"hotspot3",
        checked:isTopChecked,
        labelName: "Top",
        labelValue:topValue,
        handleCheck(e:any){
          setIsTopChecked(e.target.checked)
        },
        handleValueChange(e:any) {
          setTopValue(e.target.value)
        }

    },
    {
        id:"hotspot4",
        checked:isBottomChecked,
        labelName: "Bottom",
        labelValue:bottomValue,
        handleCheck(e:any){
          setIsBottomChecked(e.target.checked)
        },
        handleValueChange(e:any) {
          setBottomValue(e.target.value)
        }

    }
  ];

  const isAnyCheckboxChecked = isTopChecked || isBottomChecked;

 const selectionPointNodes = selectedLabelParentData[0].children;

 const useMyStyles = makeStyles<Theme>((theme) => ({
  buttonGroup:{
    width:'95%',
    height:'40px'
  },
  
  buttton:{
    width:'95%',
    borderRightColor:'transparent',
    lineHeight:'5px',
    textTransform:'none',
    justifyContent: "flex-start",
    color:theme.palette.text.secondary,
    fontSize:theme.typography.body2.fontSize,
    fontFamily:theme.typography.fontFamily,
    '&:hover': {
      backgroundColor:theme.palette.primary.main,
      color: theme.palette.text.primary,
    }

  },
  applyButton:{
      marginTop:"20px",
  marginBottom:"20px",
  
  },
  btn:{
      marginTop: 10,
      textAlign:"center",
       color:"#e4687e"
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
  backgroundColor:"#0078D4",
  width:"80%",
   fontSize:"14px" ,
   borderRadius: "10px",
   height:"40px",
   paddingRight: "20px",
   lineHeight:"16px",
   fontWeight:500,
   marginLeft:25,
   marginTop:25,
   marginBottom:25,
   textTransform:"none"
},

dividerline: {
  height: 2,
  width: '100%',
  backgroundColor: theme.palette.divider,
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

// console.warn(hotspotData)

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
          <MuiMenuItem value={item.id}>{item.title}</MuiMenuItem> 
      )}
      </SelectAction>
    );
  }
const onhandleCheck=(id,e)=>{
  console.warn(e.target.checked,id)
}

  const getBody = () => {

    return (
      <div ref = {containerRef} style={{marginTop:'10px'}}>
    {
      hotspotsData.map((item, index)=>{ 
        return (
          <div key={index} >
            <Group spacing="sm" style={{ marginTop: 40 }}>
              <Checkbox
                checked={item.checked}
                onChange={item.handleCheck}
              ></Checkbox>
              <div style={{display:"flex",justifyContent:"space-between", alignItems:"center", width:"75%", gap:"12px"}}>
                <div style={{}}>
                  {item.labelName}
                </div>

                <MuiTextField
                  variant="outlined"
                  style={{ width: "150px" }}
                  size="small"
                  type="number"
                  value={item.labelValue}
                  onChange={item.handleValueChange}
                />
              </div>
            </Group>
          </div>
        );
      })
          
       
              
           

    }
  
  
     {/* <Group spacing="sm" style={{marginTop:20}}>
          
          <Checkbox onChange={}></Checkbox>
 
           
            <div style={{marginRight:40}} >Max</div>
           
      
              <MuiTextField
                variant="outlined"
                style={{width: "150px"}} 
                size="small"
                type="number" 
          
               
                />
     </Group>
     <Group spacing="sm" style={{marginTop:20}}>
          
          <Checkbox></Checkbox>
 
           
            <div style={{marginRight:43}} >Top</div>
           
      
              <MuiTextField
                variant="outlined"
                style={{width: "150px"}} 
                size="small"
                type="number" 
          
               
                />
     </Group>
     <Group spacing="sm" style={{marginTop:20}}>
          
          <Checkbox></Checkbox>
 
           
            <div style={{marginRight:20}}  >Bottom</div>
           
      
              <MuiTextField
                variant="outlined"
                style={{width: "150px"}} 
                size="small"
                type="number" 
          
               
                />
     </Group> */}
        </div>
    )
  }


  const handleOnclickApply = async () => {
    // applyInteractionMode();
    //dispatch(handleHotspotsHeadCreation({undoable: true, pid:selectionPointerId, hotSpotData:hotSpotData}));
    await dispatch(setHotspotCircularProgress(true));
    await dispatch(deleteHotspotLeafNodes());

    let params : IHotspotParams = {
      //bMin: hotspotsData[0].checked,
      //bMax: hotspotsData[1].checked,
      //min: Math.max(0, parseInt(String(hotspotsData[0].labelValue))),
      //max: Math.max(0, parseInt(String(hotspotsData[1].labelValue))),
      bMin : false,
      bMax : false,
      min : 0,
      max : 0,
      bTop: hotspotsData[0].checked,
      bBottom: hotspotsData[1].checked,
      top: Math.max(0, parseInt(String(hotspotsData[0].labelValue))),
      bottom: Math.max(0, parseInt(String(hotspotsData[1].labelValue)))
    };    

    let selectedData = treeDataReduxColorMap[selectedColorMapId];
    let variableId = selectedData.variable;
    let stepId = selectedData.step;
    let derivedTypeId =  selectedData.derivedType.includes(":")?selectedData.derivedType.split(":")[1]:selectedData.derivedType;

    setTimeout(()=>{
      if(params.bTop === true && params.bBottom === true)
      {
          //get the bottom hotspot
          getHotspotData(params, variableId, stepId, derivedTypeId, viewerId)
          .then(nodeIndexes => {
            let labelIds : Array<string> = [];
           // dispatch(deleteHotspotLeafNodes());
            let labelCounter = 0;
            nodeIndexes.every((nodeIndex, index) => {
              //if(params.bottom > 0 && index >= params.bottom) 
              if(params.bottom > 0 && labelCounter >= params.bottom)
                return false;      
              let modelIndex = 0;
              let id = "Hotspot_" + nanoid();
              let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
              labelIds.push(labelId);
              if(labelId)
                labelCounter = labelCounter + 1;
              return true;
            });
            //console.log(labelIds);
          })
          .catch(err => console.error(err));
  
          //get the TOP hotspot
          const newParams = {...params, bBottom : false};
          getHotspotData(newParams, variableId, stepId, derivedTypeId, viewerId)
          .then(nodeIndexes => {
            //console.log(nodeIndexes);
            let labelIds : Array<string> = [];
           // dispatch(deleteHotspotLeafNodes());
            let labelCounter = 0;
            nodeIndexes.every((nodeIndex, index) => {
              //if(newParams.top > 0 && index >= newParams.top) 
              if(newParams.top > 0 && labelCounter >= newParams.top)
                return false;    
              let modelIndex = 0;
              let id = "Hotspot_" + nanoid();
              let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
              labelIds.push(labelId);
              if(labelId)
                labelCounter = labelCounter + 1;
              return true;
            });
            //console.log(labelIds);
          })
          .catch(err => console.error(err));
      }
      else if(params.bTop === false && params.bBottom === true)
      {
          //get the bottom hotspot
          getHotspotData(params, variableId, stepId, derivedTypeId, viewerId)
          .then(nodeIndexes => {
            let labelIds : Array<string> = [];
           // dispatch(deleteHotspotLeafNodes());
            let labelCounter = 0;
            nodeIndexes.every((nodeIndex, index) => {
              //if(params.bottom > 0 && index >= params.bottom) 
              if(params.bottom > 0 && labelCounter >= params.bottom)
                return false;      
              let modelIndex = 0;
              let id = "Hotspot_" + nanoid();
              let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
              labelIds.push(labelId);
              if(labelId)
                labelCounter = labelCounter + 1;
              return true;
            });
            //console.log(labelIds);
          })
          .catch(err => console.error(err));
      }
      else if((params.bTop === true && params.bBottom === false) || 
              (params.bTop === false && params.bBottom === false))
      {
          //get the TOP hotspot
          params.bBottom = false;
          getHotspotData(params, variableId, stepId, derivedTypeId, viewerId)
          .then(nodeIndexes => {
            let labelIds : Array<string> = [];
           // dispatch(deleteHotspotLeafNodes());
            let labelCounter = 0;
            nodeIndexes.every((nodeIndex, index) => {
              //if(params.top > 0 && index >= params.top) 
              if(params.top > 0 && labelCounter >= params.top)
                return false;    
              let modelIndex = 0;
              let id = "Hotspot_" + nanoid();
              let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
              labelIds.push(labelId);
              if(labelId)
                labelCounter = labelCounter + 1;
              return true;
            });
            //console.log(labelIds);
          })
          .catch(err => console.error(err));
      }
  
      // getHotspotData(params, "Displacement", "L1M1", "sixdof_tmag", viewerId) 
      let data = {
        hotspotInfo : params,
        variableId,
        stepId,
        derivedTypeId
      };
      dispatch(updateHotSpotInfo(data));
      dispatch(push(Routes.SELECT_WINDOW));

    },5000)

  }

  const getFooter = () => {
    return(
      <div>
      {isCircularProgress ? <div className={"lds-ring"}><div></div><div></div><div></div><div></div></div> : 
      <div className={classes.btn}>
      <div className={classes.applyButton}>
                  <MuiButton  
                  variant='contained'
                  color='primary'
                     onClick={handleOnclickApply} 
                    size='medium'
                    disabled={!isAnyCheckboxChecked}
                  >
                    Find & Add Hotspots
                  </MuiButton>
                </div>
    </div>  }
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
