import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { Routes } from 'routes';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import MuiGrid from '@material-ui/core/Grid';
import styles from './style';
import {push} from 'connected-react-router/immutable';
import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';
import { selectLabelData, selectEditableNodeId,selectAnimationState, setFrames,setSlider, setFrameSlider,setScaleFactor, selectCheckedNodeForALLLabelType, setAnimationStates,updatePlayState } from 'store/sideBar/AnimationSlice/AllAnimationSlice';
import { undoStack } from 'components/utils/undoStack';
import MuiTextField from "@material-ui/core/TextField";
import MuiButton from '@material-ui/core/Button';
import {useRef, useState,useEffect} from 'react';
import { ILabel, AnimationType } from 'store/sideBar/AnimationSlice/shared/types';
import { Box } from '@material-ui/core';
import {Slider} from '@material-ui/core';
import { selectActiveViewerID } from 'store/appSlice';
import { changeAnimationFrameDelay } from 'backend/viewerAPIProxy';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import HelpIcon from '@material-ui/icons/HelpOutline';
import FastForwardIcon from '@material-ui/icons/FastForward';
import MuiIconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import { AnimationAllType } from 'store/sideBar/AnimationSlice/shared/types';
import { getDeformationValues, setAnimationData, startAnimation, stopAnimation, pauseAnimation, moveForwardAnimationFrame, moveBackwardAnimationFrame,moveToSpecificAnimationFrame,setAnimationScaleFactor } from 'backend/viewerAPIProxy';
import {ANIMATIONSTATE} from 'store/sideBar/AnimationSlice/shared/types';
import { hide3DLabelsAsync, showandUpdateAll3DLabelPositionAsync } from 'store/sideBar/labelSlice/AllLabelSlice';
import { selectcolormapData } from 'store/sideBar/colormapSlice';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
export default function AnimationEdit(){

  
  
    const childRef = useRef();
    const treeDataRedux = useAppSelector(selectLabelData);
    const editableNodeId : string = useAppSelector(selectEditableNodeId);
    const [frames,setFrame] = useState<number>(treeDataRedux[editableNodeId]?.frames);
    const [slider,setSliders] = useState<number>(treeDataRedux[editableNodeId]?.slider);
    const [scaleFactor,setupdateScaleFactor] = useState<number>(treeDataRedux[editableNodeId]?.scaleFactor);
    const selectedLabel = [treeDataRedux[editableNodeId]];
    const selectedLabels = selectedLabel ;
    const checkedNodeIds : any  = useAppSelector(selectCheckedNodeForALLLabelType);
    let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: TOUR_MENU_NAMES.ANIMATION
    }
    const classes = styles();
    const dispatch = useAppDispatch();  

    const viewerId = useAppSelector(selectActiveViewerID);
    const animationState = (selectedLabels[0] as ILabel).animationState
    const [animState, setAnimationState] = useState(animationState);
    const UpdatedFrameSlider = treeDataRedux[editableNodeId]?.frameSlider;
    // const [currentIndex, setCurrentIndex] = useState<number>(UpdatedFrameSlider);
    
   const currentIndex = UpdatedFrameSlider;

   const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
   const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
   const colormapsData = useAppSelector(selectcolormapData)
   let appliedStep = "";
   if(activeColormapId in colormapsData)
    appliedStep = colormapsData[activeColormapId].step;

 

    const _handleIndexChange = (event:any, currentIndex:any) => {
      //  setCurrentIndex(currentIndex);
      moveToSpecificAnimationFrame(currentIndex,viewerId)
       dispatch(setFrameSlider({animationFrameSliderId:editableNodeId, updatedValue:currentIndex}))
    };
    const _handleNext = (currentIndex:any) => {
      // setCurrentIndex(currentIndex);
      //const updatedValue=currentIndex + 1;
      //dispatch(setFrameSlider({animationFrameSliderId:editableNodeId, updatedValue:updatedValue}));
      moveForwardAnimationFrame(viewerId);
      // console.log('currentIndexNext',currentIndex)
      
    };
    const _handlePrev = (currentIndex:any) => {
      // setCurrentIndex(currentIndex - 1);
      //const updatedValue = currentIndex - 1;
      //dispatch(setFrameSlider({animationFrameSliderId:editableNodeId, updatedValue:updatedValue}));
      moveBackwardAnimationFrame(viewerId);
      // console.log('currentIndexPrev',currentIndex)
     
    };
    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

  useEffect(() => {
    setFrame(treeDataRedux[editableNodeId]?.frames);
    setSliders(treeDataRedux[editableNodeId]?.slider);
  },[editableNodeId]);

 
  const onHandleEditValue = ( e: any) => {
    setFrame(frames);
  }
  const onHandleSave = () => {
   dispatch(setFrames({animationFrameId:editableNodeId, updatedValue:frames}))
   dispatch(setSlider({animationSliderId:editableNodeId, updatedValue:slider}))
   dispatch(setScaleFactor({animationFrameId:editableNodeId,updatedValue:scaleFactor}))
   dispatch(push(Routes.ANIMATION_LIST))
  }



  const handleFrame = (newValue:number,undoable:boolean) => {

    setFrame(Number(newValue));
    dispatch(setFrames({animationFrameId:editableNodeId, updatedValue:Number(newValue)}));

    if(undoable) {
      undoStack.add({
        undo:()=>{setFrame(frames)},
        redo:()=>{setFrame(Number(newValue))}
      })
      }
  }

  const handleScaleFactor = (newValue:number,undoable:boolean) => {
   
       
    const aniScaleFactor = Number(newValue);
    setAnimationScaleFactor([aniScaleFactor, aniScaleFactor, aniScaleFactor],viewerId);
    setupdateScaleFactor(aniScaleFactor);
    dispatch(setScaleFactor({animationFrameId:editableNodeId,updatedValue:aniScaleFactor}))

    if(undoable) {
      undoStack.add({
        undo:()=>{setupdateScaleFactor(scaleFactor)},
        redo:()=>{setupdateScaleFactor(aniScaleFactor)}
      })
      }
  }

  const onHandlePlayPauseAnimation = () => {

    if(animationState === ANIMATIONSTATE.STARTED){
      dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.PAUSED})); 
      setAnimationState(ANIMATIONSTATE.PAUSED);
      pauseAnimation(viewerId);    
      dispatch(showandUpdateAll3DLabelPositionAsync({ activeViewerID : viewerId}));   
      //dispatch(show3DLabelsAsync({}));  
    }
    else{
      const selectedAnimationId : string = (selectedLabels[0] as ILabel).animationType;
      const selectedFrameCount = (selectedLabels[0] as ILabel).frames;
      const selectedAnimationSpeed = (selectedLabels[0] as ILabel).slider;

      let animationType = "NONE";
      if(selectedAnimationId === AnimationAllType.LINEAR)
        animationType = "LINEAR";
      else if (selectedAnimationId === AnimationAllType.EIGEN)
        animationType = "EIGENNONCOMPEX";

      const animationSpeed  = 1000 / selectedAnimationSpeed;
      const result = "Displacement";
      const derivedType = "sixdof_tvec";
      if(animationState === ANIMATIONSTATE.STOPPED){
        getDeformationValues(result, appliedStep, derivedType, viewerId)
        .then(response => {
          setAnimationData(animationType , selectedFrameCount, animationSpeed , viewerId);
          startAnimation(viewerId); 
        });
         }
      else if (animationState === ANIMATIONSTATE.PAUSED){
        setAnimationData(animationType , selectedFrameCount, animationSpeed , viewerId);
        startAnimation(viewerId); 
        
      }    
      dispatch(setAnimationStates({animationStateId:editableNodeId,updatedValue:ANIMATIONSTATE.STARTED})) 
      setAnimationState(ANIMATIONSTATE.STARTED);
      dispatch(hide3DLabelsAsync({}));
      dispatch(updatePlayState({editableNodeId:editableNodeId}));
      
    }
  }

  const onHandleStopAnimation = () => {
    dispatch(setAnimationStates({animationStateId:editableNodeId, updatedValue:ANIMATIONSTATE.STOPPED}))
    setAnimationState(ANIMATIONSTATE.STOPPED);
    stopAnimation(viewerId); 
    // setCurrentIndex(1);
    dispatch(showandUpdateAll3DLabelPositionAsync({ activeViewerID : viewerId}));     
    //dispatch(show3DLabelsAsync({}));  
    
  }

  const handleChange = (event:any, newValue:any) => {
    setSliders(newValue);
if(selectedLabel[0].animationState === 1){
    const animationSpeed  = 1000 / newValue;
    changeAnimationFrameDelay(animationSpeed, viewerId);
}
   
  };
  const getHeaderRightIcon = () => {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
    return (

      <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
    )
  }

  const marks = (frames:any) =>{
    let arr = [];
    for (let i = 0; i < frames; i++) {
      if (i === 0 || i === frames - 1) {
        arr.push({
          value: i+1,
          label: i + 1
        });
      } else {
        arr.push({
          value: i+1,
          label: ""
        });
      }
     
    }
    return arr;
  }
  
  const getBody = () => {
    return (
        <div style={{paddingTop:'28px'}}>
        <div className={classes.sidebarText} style={{marginLeft:'20px',marginBottom:'10px'}}>Animation Controls :</div>
        <Box style={{marginTop:'10px',marginBottom:'10px', marginLeft:'40px'}}>
          <MuiIconButton className={animationState === ANIMATIONSTATE.STARTED ? classes.disabled : classes.iconColor} style={{marginRight:'4px',}}onClick={() =>currentIndex < 2 ? _handlePrev(frames + 1): _handlePrev(currentIndex)}><FastRewindIcon /></MuiIconButton>
          <MuiIconButton className={classes.iconColor} style={{marginLeft:'5px'}} onClick={onHandlePlayPauseAnimation}> {animationState === ANIMATIONSTATE.STARTED ? <PauseIcon /> : <PlayIcon />}</MuiIconButton>
          <MuiIconButton className={classes.iconColor} style={{ marginLeft:'5px'}} onClick={onHandleStopAnimation}><StopIcon /></MuiIconButton>
          <MuiIconButton className={animationState === ANIMATIONSTATE.STARTED ? classes.disabled : classes.iconColor}style={{marginLeft:'5px'}} onClick={() => currentIndex < frames ?  _handleNext(currentIndex) : _handleNext(0)}><FastForwardIcon /></MuiIconButton>
        </Box>
        <div className={classes.sidebarText} style={{marginTop:'10px',marginLeft:'20px'}}>Animation Speed :</div>
        <Box  width= {250} style={{marginTop:'10px',marginLeft:'20px',marginBottom:'20px'}}>
          <Slider defaultValue={slider} value={slider} name='slider' aria-label="Default" valueLabelDisplay="auto" min={1} max={120}
          onChange={handleChange}
          //onChange={(e:any)=>handleSlider(e,true)}
          />
        </Box>
        <MuiGrid container>
            <MuiGrid item xs={12} sm={4}>
            <div className={classes.sidebarText} style={{marginTop:'10px',marginLeft:'20px'}}>Frames :</div>
            </MuiGrid>
        <MuiGrid item xs={12} sm={3} >
              <MuiTextField
                variant="outlined"
                className={classes.inputTranslate} 
                style={{width: "170px",marginBottom:'5px'}} 
                size="small"
                type="number" 
                value={frames}
                disabled = {animationState === ANIMATIONSTATE.STOPPED? false : true}
                onChange={(e:any)=>handleFrame(e.target.value , true)}
                />
        </MuiGrid>
        <Box  width= {250} style={{marginTop:'25px',marginLeft:'20px',marginBottom:'20px'}}>
          <Slider
            step={1}
            marks={marks(frames)}
            // marks={true}
            min={1}
            max={frames}
            defaultValue={currentIndex}
            className={classes.scrollBarFrame}
            valueLabelDisplay="auto"
            value={animationState === ANIMATIONSTATE.STARTED ? currentIndex : 0}
            onChange={_handleIndexChange}
            disabled={animationState === ANIMATIONSTATE.STARTED ? true : false}
            // onChange={handleChange}
            // onChange={(e:any)=>handleSlider(e,true)}
          />
        </Box>
        <MuiGrid item xs={12} sm={4}>
            <div className={classes.sidebarText} style={{marginTop:'10px'}}>Scale Factor :</div>
            </MuiGrid>
        <MuiGrid item xs={12} sm={3} >
              <MuiTextField
                variant="outlined"
                className={classes.inputTranslate} 
                style={{width: "150px",marginBottom:'5px',marginLeft:'20px'}} 
                size="small"
                type="number" 
                inputProps={{
                  step: "1"
                }}
                value={scaleFactor}
                onChange={(e:any)=>handleScaleFactor(e.target.value , true)}
                />
        </MuiGrid>
        </MuiGrid>
        </div>
        
        
    )
  }

  const getFooter = () => {

   
    return(
      <div className={classes.editPageFooter}>
       
     
        <MuiButton className={classes.resetButton}
            autoFocus 
            variant="contained" 
            color="primary"
            size="medium"
            onClick={onHandleSave}
        >
          Apply
        </MuiButton>
      </div>
    ) 
  }

  const getHeaderContent = () => {
    const type = (selectedLabels[0] as ILabel).animationType;
      const text = selectedLabels.length > 1 ? "..." : selectedLabels[0].title;
      return(<Title text={text} group={`Animation - ${type}`}/>)
     
  }
  return (
          <SideBarContainer
            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            //footer = { getFooter() }
          />

  )
}
