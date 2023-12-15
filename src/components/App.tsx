import { useRef,  useCallback, useEffect, createContext,  useState } from 'react';
import clsx from 'clsx';
import { useResizeDetector } from 'react-resize-detector';

import styles from './App.style';
import FileLoadingOverlay from './layout/fileLoadingOverlay';
import Sidebar from './layout/sideBar';
import AppBar from './layout/appBar';
import LeftBar from './layout/leftBar';
import FullscreenIcon from './layout/fullscreenIcon';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import {selectAppBarVisibility,selectFullscreenStatus,selectSidebarVisibility,
        setAppBarVisibility, setFullscreenState ,selectModelLoadedState, setPopupMenuActiveContent } from '../store/appSlice';
import { setIsViewerDataChanged,applyView} from '../store/sideBar/slideSlice';
import { appBarMinHeight, leftbarWidth, popupMenuContentTypes } from '../config';
import LayerStack from "./layout/LayerStack";
import { fetchCameraMatrix, fetchCameraStdViews } from '../store/sideBar/sceneSlice';
import Grid from '@material-ui/core/Grid'
import { selectActiveTab, selectBottonTabOptions, selectDefaultOptions } from '../store/mainMenuSlice';
import Tour from 'components/layout/TourComponent/Tour';
import { DialogueProps, dialogueState } from '../store/tutorialSlice';
import { selectisTourRunning, selectActiveTourIndex, selectTour } from '../store/tourSlice';

import { tourListSlice } from 'store/tourSlice';
import tutorialSteps from './layout/TourComponent/data/tutorialSteps';
// import useLocalStorage from '../customHooks/useLocalStorage';
import { setTourVisitedState, getTourVisitedState, setAppVisitedState, getIsTourVisitableState, setIsTourVisitableState } from 'store/tourStateSlice';
export const ViewerContext = createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);

function App() {

  const isModelLoaded = useAppSelector(selectModelLoadedState);

  const classes = styles();
  const isAppBarVisible  = useAppSelector(selectAppBarVisibility);
  const isFullscreenOn = useAppSelector(selectFullscreenStatus);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const activeLeftBarItem = useAppSelector(selectActiveTab);
  const leftBarDefaultItems = useAppSelector(selectDefaultOptions);
  const leftBarBtmOptions = useAppSelector(selectBottonTabOptions);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);
  const viewerContainerRef = useRef(null);

  const isTourRunning = useAppSelector(selectisTourRunning);
  const activeTourIndex : number = useAppSelector(selectActiveTourIndex) || 0;
  const Tours = useAppSelector(selectTour);

  let oldUser:any  = JSON.parse(localStorage.getItem("vct-tour"))||{};
  oldUser = (typeof(oldUser) === 'object') ? oldUser : {};

  // const storedData = JSON.parse(localStorage.getItem("vct-tour"));
  const storedData = (typeof(JSON.parse(localStorage.getItem("vct-tour"))) === 'object') ? JSON.parse(localStorage.getItem("vct-tour")) : null;
  let tourVisitedState = useAppSelector(getTourVisitedState);

  if(storedData && (!(tourVisitedState))){
    dispatch(setTourVisitedState({tourVisited:storedData}))
  }

  tourVisitedState = useAppSelector(getTourVisitedState);
  let isTourVisitable = useAppSelector(getIsTourVisitableState)

  oldUser.appVisited = true;
  const globalIsTourVisitable = (typeof(JSON.parse(localStorage.getItem("vct-tour-globalState"))) === 'boolean' )? JSON.parse(localStorage.getItem("vct-tour-globalState")): true;
  localStorage.setItem("vct-tour-globalState", JSON.stringify(globalIsTourVisitable));
  (globalIsTourVisitable !== isTourVisitable) && dispatch(setIsTourVisitableState({isTourVisitable:globalIsTourVisitable}))
  // const [userType, setUserType] = useLocalStorage("vct-tour");
  isTourVisitable = useAppSelector(getIsTourVisitableState)
  if(!(tourVisitedState?.appVisited) && !isTourRunning && isTourVisitable){
    //dispatch(tourListSlice.actions.setStartTour(tutorialSteps.title));

    let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: tutorialSteps.title,
      description: tutorialSteps.description
    }
      dispatch(dialogueState(dialogProps)); 
      // setUserType(oldUser);
      localStorage.setItem("vct-tour", JSON.stringify(oldUser));
      dispatch(setAppVisitedState({appVisited:oldUser?.appVisited}))
  }

  //===========================================================================

  const onResize = useCallback((width ?:number, height ?: number) => {
    dispatch(fetchCameraStdViews());
    dispatch(fetchCameraMatrix());
    if(height && height > appBarMinHeight){
          dispatch(setAppBarVisibility(true));
          //console.log(height,appBarMinHeight,"true")
        }
      else {
          dispatch(setAppBarVisibility(false));
          //console.log(height,appBarMinHeight,"false")
        }
  }, []);


useResizeDetector({ 
    refreshMode: 'debounce',
    refreshRate: 400,
    refreshOptions :{trailing : true, leading : false },
    onResize,
    targetRef,
    skipOnMount :true
  });


  const handleFullscreen = (isFullscreenEnabled : any) =>{
    if(isFullscreenEnabled !== isFullscreenOn) // To avoid unnecessary dispatch and handle exit fullscreen by pressing esc key
      dispatch(setFullscreenState(isFullscreenEnabled));
  }
  
  useEffect(() => {
    if(isAppBarVisible === false)
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
  },[isAppBarVisible]);
   
  const [leftMouseMoveDone, setLeftMouseMoveState] = useState(false);
  const [middleMouseMoveDone, setMiddleMouseMoveState] = useState(false);
  const [rightMouseMoveDone, setRightMouseMoveState] = useState(false);
  const [onWheelMouseDone, setonWheelMouseState] = useState(false);
  const [cursor, setCursor] = useState('default');

  const viewerContainerOnMouseUp = (event : any,eventType:any) =>{
    if(eventType !=="wheel")
      event.preventDefault();
    if(event._reactName === "onMouseUp")
      setCursor('default');
          
    if(isTourRunning && Tours[activeTourIndex].title ===  tutorialSteps.title){

      if((event.button === 0 && eventType==="mouse") && leftMouseMoveDone === false){
        //console.log("leftMouseMoveDone:",event.button);
        setLeftMouseMoveState(true);
        dispatch(tourListSlice.actions.setUpdateAction(tutorialSteps.steps[1].target.slice(1)));
        
      }

      if((event.button === 1 || eventType==="wheel")  && onWheelMouseDone === false && middleMouseMoveDone === false && leftMouseMoveDone === true){
        setMiddleMouseMoveState(true);
        setonWheelMouseState(true);
        dispatch(tourListSlice.actions.setUpdateAction(tutorialSteps.steps[1].target.slice(1)));  
      }

      if((event.button === 2 && eventType==="mouse")  && rightMouseMoveDone === false && onWheelMouseDone===true  && middleMouseMoveDone === true && leftMouseMoveDone === true){
        setRightMouseMoveState(true);
        dispatch(tourListSlice.actions.setUpdateAction(tutorialSteps.steps[1].target.slice(1)));
        setTimeout(() => {
          dispatch(tourListSlice.actions.setManualStepForward()); 
        }, 100);  
        setMiddleMouseMoveState(false);
        setonWheelMouseState(false);
        setLeftMouseMoveState(false); 
        setRightMouseMoveState(false);
      }

    }

    dispatch(setIsViewerDataChanged(true));

  }

  const viewerContainerOnMouseDown = (event : any) =>{
    event.preventDefault();
    if(event._reactName === "onMouseDown")
      setCursor('crosshair');
  }
  

  return (
    <ViewerContext.Provider value={viewerContainerRef}>
      <Grid style={{height: '100%'}} container spacing={0}>
        <Grid item style={{height: '100%'}} >
         <LeftBar topTabs={leftBarDefaultItems} bottomTabs={leftBarBtmOptions}/>
        </Grid>
        <Grid item style={{width:`calc(100% - ${leftbarWidth}px)`}} >
          <div className={classes.root} ref = { targetRef }>         
            { isModelLoaded === false && <FileLoadingOverlay />}   
            {/* isAppBarVisible == true  => show AppBar else show fullscreen icon alone */}   
            { isAppBarVisible ?   
            <>
              {/* <AppBar  />   */} 
              <Sidebar selectedItem={activeLeftBarItem} />           
            </>
            : 
            // <FullscreenIcon /> 
            null
            }

            {/* 3D Renderer */}
            <main  className={ clsx(classes.content , {[classes.contentWithSideBar]: isSidebarVisible} , {[classes.contentWithTopBar]: isAppBarVisible}) }>
              <div ref = {viewerContainerRef} 
              className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isAppBarVisible})} 
              onWheel ={(e)=>viewerContainerOnMouseUp(e,"wheel")} 
              onMouseUp={(e)=>viewerContainerOnMouseUp(e,"mouse")} 
              onMouseDown={(e)=>viewerContainerOnMouseDown(e)}  
              style={{ cursor: cursor }}>
                <LayerStack parentRef={viewerContainerRef}/>
              </div>     
            </main>
          </div>
        </Grid>
      </Grid>
      { isModelLoaded === true && <Tour /> }
    </ViewerContext.Provider>
  );
}

export default App;
