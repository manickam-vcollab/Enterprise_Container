import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { useRef, useState } from 'react';
import MuiTypography from "@material-ui/core/Typography";
import MuiButton from "@material-ui/core/Button";
//import styles from './style'
import TreeView from '../../../shared/RcTree/Animations/AnimationTreeView';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import { convertListToTree } from 'components/utils/tree';
import {goBack,push} from 'connected-react-router/immutable';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import globalThemes from 'theme/globalThemes';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import GroupIcon from 'components/icons/group';
import Dropdownbutton from './components/Dropdownbutton';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/styles';
import { Routes } from 'routes';
import { AnimationAllType } from 'store/sideBar/AnimationSlice/shared/types';
import { handleLinearCreation , handleEigenCreation, handleTransientCreation, handleViewPointCreation, setEditableNodeId, selectCheckedNodeForALLLabelType,setIsTitleEditable,setNewTitle,updatePlayState} from 'store/sideBar/AnimationSlice/AllAnimationSlice';

import { selectLabelData,setAnimationStates,selectAnimationState, selectEditableNodeId,selectRootIds, checkNode, deleteAnimation, selectedLength} from 'store/sideBar/AnimationSlice/AllAnimationSlice';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';

import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';

import { selectActiveViewerID } from 'store/appSlice';
import { getDeformationValues, setAnimationData, startAnimation, stopAnimation, pauseAnimation } from 'backend/viewerAPIProxy';
import playIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import {ANIMATIONSTATE} from 'store/sideBar/AnimationSlice/shared/types';
import { selectcolormapData } from 'store/sideBar/colormapSlice';

export default function AnimationList(){

    const dispatch = useAppDispatch(); 

    
  const containerRef = useRef(null);
  const useMyStyles = makeStyles<Theme>((theme) => ({
    root: {

      '&.Mui-selected':{
        color:`${theme.palette.accent.primaryText} !important`,
        backgroundColor: `${theme.palette.action.selected} !important`,
        borderRadius: "4px",
      },
      '&.MuiIconButton-root':{
        marginTop: '5px',
        padding: '3px'
      }
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
  }
    
  }))

  const customClasses = globalThemes();
  const treeDataRedux = useAppSelector(selectLabelData);
  const treeRootIds = useAppSelector(selectRootIds);
  const selectedAnimationState = useAppSelector(selectAnimationState);
  const viewerId = useAppSelector(selectActiveViewerID);
  const editableNodeId : string = useAppSelector(selectEditableNodeId);
  let [isAnimation,setIsAnimation] = useState(false);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
  let [isPanBtnPressed,setIsPanBtnPressed] = useState(false);
  const checkedNodeIds : any  = useAppSelector(selectCheckedNodeForALLLabelType);
  const selectedCount = useAppSelector(selectedLength);
  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.ANIMATION
  }


  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData);
  let appliedStep = "";
  if(activeColormapId in colormapsData)
    appliedStep = colormapsData[activeColormapId].step;

  let data = Object.values(treeDataRedux)


  var output = data.filter((value:any) => value.animationState === 1);

  const activeTitle = () =>{
    for(var i=0;i<output.length;i++){
   let title =  output[i].title
   return title;
  }
}
  const title = activeTitle();
  const animState = treeDataRedux[checkedNodeIds]?.animationState;
  const [animationState, setAnimationState] = useState(animState)

  const getHeaderRightIcon = () => {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
    return (

      <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
    )
  }

  const onHandleLabelAdd=(id:string,event:any)=> {
    onHandleStopAnimation();
    if(id === AnimationAllType.LINEAR)
    {
        dispatch(handleLinearCreation({data:event}));
    }
    if(id === AnimationAllType.EIGEN)
    {
        dispatch(handleEigenCreation({data:event}));
    }
    if(id === AnimationAllType.TRANSIENT)
    {
        dispatch(handleTransientCreation({data:event}));
    }
    if(id === AnimationAllType.VIEWPOINT)
    {
        dispatch(handleViewPointCreation({data:event}));
    }
    

  }
  
  const handleCheck = (toCheck:boolean, nodeId:string) => {
    setIsAnimation(false)
    dispatch(checkNode({toCheck,nodeId}));
    dispatch(setEditableNodeId(nodeId));
    
  }
 
  const onHandleEdit=(id:string)=> {
    setIsAnimation(false)
    dispatch(push(Routes.ANIMATION_EDIT));
    dispatch(setEditableNodeId(id));
  }
  
  const Edit=()=>{
    setIsAnimation(false)
    dispatch(push(Routes.ANIMATION_EDIT));
    dispatch(setEditableNodeId(checkedNodeIds[0]));
  }

  const onHandleDeleteButton = () => {
   
    dispatch(deleteAnimation({checkedNodes:checkedNodeIds}));
    setIsPanBtnPressed(!isPanBtnPressed);
    setIsAnimation(false)
  
  }

  const onHandleDelete = () =>{
    setIsAnimation(true)
    onHandleStopAnimation();

  }

  
  const onHandlePlayPauseAnimation = () => {

    setIsAnimation(false)

    if(animState === ANIMATIONSTATE.STARTED){
      
      pauseAnimation(viewerId);
      setAnimationState(ANIMATIONSTATE.PAUSED);
       dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.PAUSED}))
   
      
    }
    else{
      const selectedAnimationId : string = treeDataRedux[checkedNodeIds]?.animationType;
      const selectedFrameCount = treeDataRedux[checkedNodeIds]?.frames;
      const selectedAnimationSpeed = treeDataRedux[checkedNodeIds]?.slider;

      let animationType = "NONE";
      if(selectedAnimationId === AnimationAllType.LINEAR)
        animationType = "LINEAR";
      else if (selectedAnimationId === AnimationAllType.EIGEN)
        animationType = "EIGENNONCOMPEX";

      const animationSpeed  = 1000 / selectedAnimationSpeed;
      const result = "Displacement";
      const derivedType = "sixdof_tvec";
      if(animState === ANIMATIONSTATE.STOPPED){
        //getDeformationValues("Displacement", "L1M1", "sixdof_tvec", viewerId)
        getDeformationValues(result, appliedStep, derivedType, viewerId)
        .then(response => {
          setAnimationData(animationType , selectedFrameCount, animationSpeed , viewerId);
          startAnimation(viewerId); 
        });
         }
      else if (animState === ANIMATIONSTATE.PAUSED){
        setAnimationData(animationType , selectedFrameCount, animationSpeed , viewerId);
        startAnimation(viewerId); 
        
      }    
      setAnimationState(ANIMATIONSTATE.STARTED);
      dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.STARTED})) 
      dispatch(updatePlayState({editableNodeId:editableNodeId}));
      
    }
  }


  const onHandleStopAnimation = () => {
    setAnimationState(ANIMATIONSTATE.STOPPED);
    stopAnimation(viewerId); 
    
    dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.STOPPED}))
    
  }


  const getHeaderContent =()=> {

    return (
      <div><Title text={"Animations" } group="animations"/></div>
    )
      
    
  }

  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) => {
    setIsAnimation(false)
    dispatch(setIsTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {
    setIsAnimation(false)
    dispatch(setNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }

  const getBody = () => {

    return (
      <div ref = {containerRef}  >
        <div style={{marginTop:'10px', textAlign:'center'}}>
          <Dropdownbutton  onHandleLabelAdd={onHandleLabelAdd} ></Dropdownbutton>
        </div>
        <div style={{marginTop:'10px'}}>

        <TreeView 
        treedata={roots} 
        labelIcon={true} 
        nodes={treeDataRedux} 
        check={handleCheck} 
        edit={onHandleEdit} 
        isTitleEditable = {true}
        onHandleIsTitleEditable = {onHandleIsTitleEditable}
        setNewTitleTitle = {setNewTitleTitle}/>

</div>
        
       
    </div>
    )
  }

  const classes = useMyStyles();

  const getFooter = () => {

    return(
      <div>
        {!isAnimation ?(
          <div>
              <OptionContainer>
              <Option
                    id="play"
                    label={animState === ANIMATIONSTATE.STARTED ? "Pause" : "Play"}
                    active={selectedCount < 1 || selectedCount > 1 }
                    icon={animState === ANIMATIONSTATE.STARTED ? PauseIcon : playIcon}
                    onClickUpdate={onHandlePlayPauseAnimation}
                  />
              <Option
                id="stop"
                label="Stop"
                active={selectedCount < 1 || selectedCount > 1}
                icon={StopIcon}
                onClickUpdate={onHandleStopAnimation}

              />

              <Option
                id="edit"
                label="Edit"
                active={selectedCount < 1 || selectedCount > 1}
                icon={EditIcon}
                onClickUpdate={Edit}
              />
              
              <Option
                id="delete"
                label="Delete"
                active={selectedCount >= 1 ? false : true }
                icon={MuiDeleteForeverOutlinedIcon}
                onClickUpdate={onHandleDelete}
              />
              
              </OptionContainer>
          </div>
    ):
    (
      <div>
            <div style={{ margin:"15px 5px" }}>
              <MuiTypography style={{ margin: "5px 5px", fontSize: "14px" }}>
              Are you sure want to delete the selected Animation?
              </MuiTypography>
              <div style={{display:'flex', gap:'10px', justifyContent:'center', alignContent: "center" }}>
                <MuiButton
                  className={customClasses.Muibtn}
                  autoFocus
                  onClick={onHandleDeleteButton}
                >
                  Confirm
                </MuiButton>
                <MuiButton
                  className={customClasses.BtnOutlined}
                   onClick={() => setIsAnimation(false)}
                >
                  Cancel
                </MuiButton>
              </div>
            </div>
          </div>
    )
  }
  </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={getHeaderContent()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
