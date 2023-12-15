import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { useRef, useState } from 'react';
import styles from './style'
import { makeStyles } from '@material-ui/styles';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import playIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import GroupIcon from 'components/icons/group'  
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import OptionContainer from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import Option from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {goBack,push} from 'connected-react-router/immutable';
import { Routes } from 'routes';                                                                                                                                                                                                                                                                                  
import LinearIcon from '../../../icons/linear';
import TreeView from 'components/shared/RcTree/Animations/AnimationTreeView';
import { selectLabelData, selectRootIds, checkNode, setEditableNodeId, deleteAnimation, selectedLength, selectCheckedNodeForALLLabelType,setIsTitleEditable,setNewTitle,setAnimationStates,selectEditableNodeId } from 'store/sideBar/AnimationSlice/AllAnimationSlice';
import { convertListToTree } from 'components/utils/tree';
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { AnimationType } from 'store/sideBar/AnimationSlice/shared/types';
import {ANIMATIONSTATE} from 'store/sideBar/AnimationSlice/shared/types';
import { handleLinearCreation } from 'store/sideBar/AnimationSlice/AllAnimationSlice';
import { selectcolormapData } from 'store/sideBar/colormapSlice';
import { getDeformationValues, setAnimationData, startAnimation, stopAnimation, pauseAnimation } from 'backend/viewerAPIProxy';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import { selectActiveViewerID } from 'store/appSlice';

export default function Linear(){

  
  const useMyStyles = makeStyles<Theme>((theme) => ({
    buttonGroup:{
      width:'95%',
      height:'40px'
    },
    
    button:{
      width:'100%',
      borderRightColor:'transparent',
      lineHeight:'5px',
      textTransform:'none',
      justifyContent: "flex-start",
      // color:theme.palette.text.secondary,
      backgroundColor:theme.palette.accent.primary,
      color:theme.palette.accent.primaryText,
      fontSize:theme.typography.body2.fontSize,
      fontFamily:theme.typography.fontFamily,
      '&:hover': {
        // backgroundColor:theme.palette.primary.main,
        backgroundColor:theme.palette.accent.secondary,
        // color: theme.palette.text.primary,
      }
  
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
    listItemIcon:{
      minWidth:'35px',
      color:theme.palette.text.secondary,
  
    },
    root: {

      '&.Mui-selected':{
        backgroundColor: `${theme.palette.action.selected} !important`,
        // backgroundColor:"transparent !important",
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
  const dispatch = useAppDispatch();
  const treeDataRedux = useAppSelector(selectLabelData);
  const treeRootIds = useAppSelector(selectRootIds);
  const checkedNodeIds : any  = useAppSelector(selectCheckedNodeForALLLabelType);
  const editableNodeId : string = useAppSelector(selectEditableNodeId);
  const animState = treeDataRedux[checkedNodeIds]?.animationState;
  const viewerId = useAppSelector(selectActiveViewerID);
  const colormapsData = useAppSelector(selectcolormapData);
  const activeColormapId = useAppSelector(state => state.colormap.selectedColorMapId);
  let appliedStep = "";
  if(activeColormapId in colormapsData)
    appliedStep = colormapsData[activeColormapId].step;
  
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
  let [isPanBtnPressed,setIsPanBtnPressed] = useState(false);
  const selectedCount = useAppSelector(selectedLength);
  const linearData = roots.filter((treeData:any) => {
    return treeData.pid === 'LINEAR';
  });

  const onHandleLabelAdd=(id:string,event:any)=> {

    if(id === AnimationType.LINEAR) {
      dispatch(handleLinearCreation({data:event}));
    }
  }


  const handleCheck = (toCheck:boolean, nodeId:string) => {
    dispatch(checkNode({toCheck,nodeId}));
  }

  const onHandleEdit = (id:string) =>{
    dispatch(setEditableNodeId(id));
    dispatch(push(Routes.ANIMATION_EDIT));
  }

  
  const onHandleDeleteButton = () => {
    
    dispatch(deleteAnimation({checkedNodes:checkedNodeIds}));
    setIsPanBtnPressed(!isPanBtnPressed);
  }

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.LINEAR
  }

  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) => {
    dispatch(setIsTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {
    dispatch(setNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
  
  
    return (
  
           <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
  
    )
  
  
  } 
  

  const getBody = () => {

    return (
      <div style={{marginTop:'10px', textAlign:'center'}}>
        
      <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary"  aria-label="split button">
      <Button className={classes.button}  onClick={(event)=>onHandleLabelAdd('LINEAR',event)} >
      <div className={classes.divIcon}>
      <LinearIcon fontSize="small" />
        </div>
        <div style={{marginLeft:'10px'}}>Add Linear</div> 
      </Button>
      </ButtonGroup>
      <div style={{marginTop:'10px'}}>
      
    <TreeView 
    treedata={linearData}
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

  const onHandlePlayPauseAnimation = () => {

    //setIsAnimation(false)

    if(animState === ANIMATIONSTATE.STARTED){
      
      pauseAnimation(viewerId);
      //setAnimationState(ANIMATIONSTATE.PAUSED);
       dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.PAUSED}))
   
      
    }
    else{
      const selectedAnimationId : string = treeDataRedux[checkedNodeIds]?.animationType;
      const selectedFrameCount = treeDataRedux[checkedNodeIds]?.frames;
      const selectedAnimationSpeed = treeDataRedux[checkedNodeIds]?.slider;

      let animationType = "NONE";
      if(selectedAnimationId === AnimationType.LINEAR)
        animationType = "LINEAR";
      else if (selectedAnimationId === AnimationType.EIGEN)
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
      dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.STARTED})) 
      
    }
  }
  const onHandleStopAnimation = () => {
    stopAnimation(viewerId); 
    
    dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.STOPPED}))
    
  }

    
  const onClickEdit=()=>{
    dispatch(push(Routes.ANIMATION_EDIT));
    dispatch(setEditableNodeId(checkedNodeIds));
  }


  const getFooter = () => {

    return(
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
            onClickUpdate={onClickEdit}
          />
            <Option
              id="delete"
              label="Delete"
              active={selectedCount >= 1 ? false : true}
              icon={MuiDeleteForeverOutlinedIcon}
             onClickUpdate={onHandleDeleteButton}
            />
         
      </OptionContainer>
    </div>
      ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Linear Animation" } group="animations"/>
             }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
