import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";
import CustomFloatingWindow from "../../../shared/CustomFloatingWindow";
import {
  Layers,
  setEditMode,
  selectWindows,
} from "../../../../store/windowMgrSlice";
import MuiAvTimerIcon from '@material-ui/icons/AvTimer';
import { ActionIcon } from "@mantine/core";
import { tourListSlice } from "store/tourSlice";
import FullScreenClose from "components/icons/fullscreen_exit";
// import PopOut from 'components/icons/popout';
import { useStyles } from "./ToolbaarIconsStyle";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useFullscreen } from "@mantine/hooks";
import { selectLegendEnabled } from "store/sideBar/colormapSlice";
import {
  selectFullscreenStatus,
  setFullscreenState,
  setTogglePopout,
  togglePopout,
} from "store/appSlice";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { undoStack, undo, redo, UndoEvents } from "components/utils/undoStack";
// import Undo from 'components/icons/undo';
// import { Redo } from '@material-ui/icons';
// import { Fullscreen } from '@material-ui/icons';
// import { Slideshow } from '@material-ui/icons';
import MuiToggleButton from "@material-ui/lab/ToggleButton";
import PopOut from "components/icons/popout";
import PopIn from "components/icons/popIn";
import Undo from "components/icons/undo";
import Redo from "components/icons/redo";
import FullScreen from "components/icons/full-Screen";
import NextSlide from "components/icons/nextSlide";
import PreviousSlide from "components/icons/previousSlide";
import {
  selectSlideData,
  setSelectedSlideId,
  setSlideSelection,
  downloadFile,
  applyView,
  createNodeAsync,
  setSelectedSlideListEmpty
} from "store/sideBar/slideSlice";
import { applyViewpointAsync } from "store/viewpointSlice";
import { ViewerContext } from "../../../App";
import MuiToolTip from "@material-ui/core/Tooltip";
// import { Undo } from '@material-ui/icons';
import {
  IconNames,
  currentToolbarDisplayList,
  selectEditableNodeId,
  toolBarList,
  combinedDataList,
  defaultDataList,
} from "store/sideBar/ToolBar/toolBarSlice";
import {
  fetchCameraMatrix,
  updateState,
} from "../../../../store/sideBar/sceneSlice";

import { gettingStartedSteps } from "../../../layout/TourComponent/data/tutorialSteps";
import Fitview from "components/icons/fitview";
import PickAndMoveIcon from "@material-ui/icons/ThreeDRotation";
import CenterFocusWeakSharpIcon from "@material-ui/icons/CenterFocusWeakSharp";
import {
  selectActiveViewerID,
  selectInteractionMode,
  setPickAndMoveEnabled,
  setInteractionMode,resetPickAndMove
} from "../../../../store/appSlice";
import { focusAllNodes } from "../../../../store/sideBar/productTreeSlice";
import {setIsViewerDataChanged } from '../../../../store/sideBar/slideSlice';
import * as viewerAPIProxy from "backend/viewerAPIProxy";
import { InteractionMode } from "backend/ViewerManager";
import { setarrangeLabelStatus,selectArrangeLabelStatus } from "store/sideBar/labelSlice/AllLabelSlice";
import { setisCircularProgress } from "store/sideBar/slideSlice";
import AddIcon from "components/icons/add";
import Replace from "components/icons/update";
import AddGroup from "components/icons/addGroup";
import { toastMsg } from "store/toastSlice";
import { captureViewpointAsync } from "store/viewpointSlice";
import toastMessage from '../../messages/toastMessage.json';
import { addMessage } from 'store/sideBar/messageSlice';


export const windowId = "floatingWindow";
type Color = [number, number, number, number];

interface Props {
  parentRef: any;
  layerId: Layers;
}

function FloatingToolbarWindow(props: Props) {
  const dispatch = useAppDispatch();

  const viewerContainerRef = useContext(ViewerContext);
  const { toggle, fullscreen } = useFullscreen();
  const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
  const toolbarDisplayList = useAppSelector(currentToolbarDisplayList);
  let rect = viewerContainerRef?.current?.getBoundingClientRect();
  let screenWidth = rect?.width;
  let screenHeight = rect?.height;
  const toolBarData = useAppSelector(toolBarList);
  const combinedToolbarList = useAppSelector(combinedDataList);
  const editableNodeId: string = useAppSelector(selectEditableNodeId);
  const AllWindows = useAppSelector(selectWindows);
  const defaultToolbarList = useAppSelector(defaultDataList);
  const togglePopoutButton = useAppSelector(togglePopout);
  const isLgendEnabled = useAppSelector(selectLegendEnabled);
  const [isUndoable, setIsUndoable] = useState(false);
  const [isRedoable, setIsRedoable] = useState(false);
  const treeDataRedux = useAppSelector(selectSlideData);
  const selectedSlideId = useAppSelector((state) => state.slide.selectedSlide);
  const appliedSlideId = useAppSelector((state) => state.slide.appliedSlide);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [dataFlag, setdataFlag] = useState();
  const activeViewerId = useAppSelector(selectActiveViewerID);
  const interactionMode = useAppSelector(selectInteractionMode);
  const arrangeLabelStatus=useAppSelector(selectArrangeLabelStatus)
  const [arrangeLabels,setArrangeLabels]=useState(arrangeLabelStatus)
  const selectedSlide = Object.values(treeDataRedux).find((slide) => slide.id === selectedSlideId[0]);
  const selectedSlideTitle = selectedSlide?.title;

  // const isPickAndMoveEnabled =
  //   interactionMode === InteractionMode.PICK_AND_MOVE;
   const isPickAndMoveEnabled = interactionMode === InteractionMode.PICK_AND_MOVE;
  // const interactionMode = useAppSelector((state) => state.app.interactionMode);
  
  const [selected, setSelected] = useState(false);
  const data = Object.values(treeDataRedux);
  const uncommonData = Object.keys(AllWindows).reduce((result: any, key) => {
    if (!(key in defaultToolbarList)) {
      result[key] = AllWindows[key];
    }
    return result;
  }, {});

  useLayoutEffect(() => {
    
    let selectedViewpoint = treeDataRedux[selectedSlideId[0]];
    setPrev(true);
    if(selectedViewpoint) {
      const selectedViewpointParentID:string = selectedViewpoint.pid || '';
      const selectedViewpointParent   = treeDataRedux[selectedViewpointParentID];
      const viewPointList = selectedViewpointParent.children;
      const currentIndex = viewPointList.findIndex((item) => item === selectedSlideId[0]);
      if(viewPointList.length > 1  && selectedSlideId.length === 1) {
          if(currentIndex > 0){
            setPrev(false);
          }else{
            setPrev(true);
          }
      }
    }
  }, [prev, appliedSlideId, data]);

  useLayoutEffect(() => {

    let selectedViewpoint = treeDataRedux[selectedSlideId[0]];
    setNext(true);
    if(selectedViewpoint) {
      const selectedViewpointParentID:string = selectedViewpoint.pid || '';
      const selectedViewpointParent   = treeDataRedux[selectedViewpointParentID];
      const viewPointList = selectedViewpointParent.children;
      const currentIndex = viewPointList.findIndex((item) => item === selectedSlideId[0]);
      if(viewPointList.length > 1  && selectedSlideId.length === 1) {
          if(currentIndex < viewPointList.length - 1 ){
            setNext(false);
          }else{
            setNext(true);
          }
      }
    }
  }, [next, appliedSlideId, data]);


  const handlePreviousSlide = () => {

    const currentIndex = data.findIndex((node) => node.id === selectedSlideId[0]);
    let previousIndex = currentIndex - 1;

    // Find the previous leaf node index
    while (previousIndex >= 0) {
      const currentNode = data[previousIndex];
      if (currentNode.children.length === 0) {
        break; // Found a leaf node, exit the loop
      }
      previousIndex--;
    }

    // If the loop reached the start of the array, wrap around to the last leaf node
    if (previousIndex < 0) {
      previousIndex = data.length - 1;
      while (previousIndex !== currentIndex) {
        const currentNode = data[previousIndex];
        if (currentNode.children.length === 0) {
          break; // Found a leaf node, exit the loop
        }
        previousIndex--;
        if (previousIndex < 0) {
          previousIndex = data.length - 1;
        }
      }
    }

    // Get the ID of the previous slide
    const previousSlideId = data[previousIndex].id;
    dispatch(setSelectedSlideListEmpty());
    dispatch(setSlideSelection(previousSlideId));

    dispatch(setisCircularProgress(true));
    dispatch(addMessage({ 
      id: selectedSlideId[0],
      data : {
        cancel: false,
        pause: false,
        timeLeft: "",
        totalSize: 'Unknown',
        transfferedSize: 'Unknown'
      },
      title: "Slide - " + selectedSlideTitle,
      type: 0,
    tags :["Downloads","SLIDE"],
    }))

    setTimeout(()=>{

      performPrevApply();
      
    },5000)

    
  };
  

  const handleNextSlide = () => {
    // Find the index of the current selected slide
    const currentIndex = data.findIndex((node) => node.id === selectedSlideId[0]);

    // Calculate the index of the next slide
    let nextIndex = currentIndex + 1;

    // Find the next leaf node index
    while (nextIndex < data.length) {
      const currentNode = data[nextIndex];
      if (currentNode.children.length === 0) {
        break; // Found a leaf node, exit the loop
      }
      nextIndex++;
    }

    // If the loop reached the end of the array, wrap around to the first leaf node
    if (nextIndex >= data.length) {
      nextIndex = 0;
      while (nextIndex !== currentIndex) {
        const currentNode = data[nextIndex];
        if (currentNode.children.length === 0) {
          break; // Found a leaf node, exit the loop
        }
        nextIndex++;
        if (nextIndex >= data.length) {
          nextIndex = 0;
        }
      }
    }

    // Get the ID of the next slide
    const nextSlideId = data[nextIndex].id;
    dispatch(setSelectedSlideListEmpty());
    dispatch(setSlideSelection(nextSlideId));
    
     dispatch(setisCircularProgress(true));
     dispatch(addMessage({ 
      id: selectedSlideId[0],
      data : {
        cancel: false,
        pause: false,
        timeLeft: "",
        totalSize: 'Unknown',
        transfferedSize: 'Unknown'
      },
      title: "Slide - " + selectedSlideTitle,
      type: 0,
    tags :["Downloads","SLIDE"],
    }))

    setTimeout(()=>{

      performNextApply();
      
    },5000)

  };
 const performNextApply = async () => { 
    const currentIndex = data.findIndex((node) => node.id === selectedSlideId[0]);

    // Calculate the index of the next slide
    let nextIndex = currentIndex + 1;

    // Find the next leaf node index
    while (nextIndex < data.length) {
      const currentNode = data[nextIndex];
      if (currentNode.children.length === 0) {
        break; // Found a leaf node, exit the loop
      }
      nextIndex++;
    }

    // If the loop reached the end of the array, wrap around to the first leaf node
    if (nextIndex >= data.length) {
      nextIndex = 0;
      while (nextIndex !== currentIndex) {
        const currentNode = data[nextIndex];
        if (currentNode.children.length === 0) {
          break; // Found a leaf node, exit the loop
        }
        nextIndex++;
        if (nextIndex >= data.length) {
          nextIndex = 0;
        }
      }
    }

    // Get the ID of the next slide
    const nextSlideId = data[nextIndex].id;
 
    // Update the selected slide ID
    // dispatch(setSelectedSlideListEmpty());
    // dispatch(setSlideSelection(nextSlideId));
    dispatch(downloadFile(nextSlideId));
    dispatch(applyView(nextSlideId));
    dispatch(setIsViewerDataChanged(false));
    dispatch(
      applyViewpointAsync({ id: nextSlideId, name: data[nextIndex].title })
    );
   }
  const performPrevApply = async () => { 
    const currentIndex = data.findIndex((node) => node.id === selectedSlideId[0]);

    // Calculate the index of the previous slide
    let previousIndex = currentIndex - 1;

    // Find the previous leaf node index
    while (previousIndex >= 0) {
      const currentNode = data[previousIndex];
      if (currentNode.children.length === 0) {
        break; // Found a leaf node, exit the loop
      }
      previousIndex--;
    }

    // If the loop reached the start of the array, wrap around to the last leaf node
    if (previousIndex < 0) {
      previousIndex = data.length - 1;
      while (previousIndex !== currentIndex) {
        const currentNode = data[previousIndex];
        if (currentNode.children.length === 0) {
          break; // Found a leaf node, exit the loop
        }
        previousIndex--;
        if (previousIndex < 0) {
          previousIndex = data.length - 1;
        }
      }
    }

    // Get the ID of the previous slide
    const previousSlideId = data[previousIndex].id;

    // Update the selected slide ID
    // dispatch(setSelectedSlideListEmpty());
    // dispatch(setSlideSelection(previousSlideId));
    dispatch(downloadFile(previousSlideId));
    dispatch(applyView(previousSlideId));
    dispatch(setIsViewerDataChanged(false));
    dispatch(
      applyViewpointAsync({
        id: previousSlideId,
        name: data[previousIndex].title,
      })
    );

  }

const handleAddSlide=(nodeId:string)=>{
    dispatch(createNodeAsync({nodeId}))
}  
const handleReplace=()=>{
dispatch(captureViewpointAsync({ id: selectedSlideId[0], name: selectedSlideTitle}));
    if(selectedSlideTitle === undefined){
      dispatch(toastMsg({msg:""}))
    }
    else {
      dispatch(toastMsg({msg:`${toastMessage.floatingWindow001}${selectedSlideTitle}`}))
    }
  }
  const handleFittoScreen = () => {
    dispatch(focusAllNodes({ viewerId: activeViewerId }));

    const newCameraView = dispatch(fetchCameraMatrix());
    newCameraView.then((item) => {
      dispatch(updateState({ activeCameraView: item.payload }));
    });
  };
  const onClickPickAndMove = () => {
    // Toggle "Pick & Move" mode
    const newPickAndMoveEnabled = !isPickAndMoveEnabled;
    dispatch(setPickAndMoveEnabled(newPickAndMoveEnabled));

    // Set the appropriate interaction mode
    const newInteractionMode = newPickAndMoveEnabled
      ? InteractionMode.PICK_AND_MOVE
      : InteractionMode.DEFAULT;
    dispatch(setInteractionMode(newInteractionMode));

    // Enable/disable "Pick & Move" using viewerAPIProxy (if needed)
    viewerAPIProxy.enablePickAndMove(newPickAndMoveEnabled, activeViewerId);
    viewerAPIProxy.setInteractionMode(newInteractionMode, activeViewerId);
  };

  const handleReset = () => {
    // Dispatch action to reset "Pick & Move"
    dispatch(resetPickAndMove());

    // Reset the viewer using viewerAPIProxy (if needed)
    viewerAPIProxy.resetPickAndMove(activeViewerId);
    viewerAPIProxy.enablePickAndMove(false, activeViewerId);
    viewerAPIProxy.setInteractionMode(InteractionMode.DEFAULT, activeViewerId);
  
  };

  const handleArrangeLabel=()=>{
   
    setArrangeLabels(!arrangeLabels)
    arrangeLabels ?  dispatch(setarrangeLabelStatus(false)) :  dispatch(setarrangeLabelStatus(true))

  }
  const getIcon = (iconName: string) => {
    let icon = null;
    switch (iconName.toUpperCase()) {
      case IconNames.POPOUT:
        icon = (
          <MuiToggleButton
            selected={togglePopoutButton ? true : false}
            onChange={() => {
              setSelected(!selected);
            }}
            style={{
              padding: 0,
              border: "none",
              margin: 0,
              textTransform: "none",
            }}
          >
            <div onClick={onHandlePopout}>
              {togglePopoutButton ? (
                <div>
                  <PopIn fontSize="small" className={clsx(style.icon)}></PopIn>
                  <div className={clsx(style.iconText)}>{iconName}</div>
                </div>
              ) : (
                <div>
                  <PopOut
                    fontSize="small"
                    className={clsx(style.icon)}
                  ></PopOut>
                  <div className={clsx(style.iconText)}>{iconName}</div>
                </div>
              )}
            </div>
          </MuiToggleButton>
        );
        break;
      case IconNames.UNDO:
        icon = (
          <div>
            <Undo
              fontSize="small"
              className={clsx(style.icon)}
              onClick={onHandleUndo}
            ></Undo>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
      case IconNames.REDO:
        icon = (
          <div>
            <Redo
              fontSize="small"
              className={clsx(style.icon)}
              onClick={onHandleRedo}
            ></Redo>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
      case IconNames.FULLSCREEN:
        icon = (
          <div onClick={onHandleFullscreen}>
            {isFullscreenEnabled ? (
              <div>
                <FullScreenClose
                  fontSize="small"
                  className={clsx(style.icon)}
                />
                <div className={clsx(style.iconText)}>{"Exit"}</div>
              </div>
            ) : (
              <div>
                {/* {" "} */}
                <FullScreen
                  fontSize="small"
                  className={clsx(style.icon)}
                ></FullScreen>
                <div className={clsx(style.iconText)}>{iconName}</div>
              </div>
            )}
          </div>
        );

        break;
      case IconNames.PREVIOUSSLIDE:
        icon = (
          <div onClick={handlePreviousSlide}>
            <PreviousSlide
              fontSize="small"
              className={clsx(style.icon)}
              style={{ width: "19px", height: "19px" }}
            ></PreviousSlide>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
      case IconNames.NEXTSLIDE:
        icon = (
          <div onClick={handleNextSlide}>
            <NextSlide
              fontSize="small"
              className={clsx(style.icon)}
              style={{ width: "19px", height: "19px" }}
            ></NextSlide>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
      case IconNames.FITTOSCREEN:
        icon = (
          <div onClick={handleFittoScreen}>
            <CenterFocusWeakSharpIcon
              fontSize="small"
              className={clsx(style.icon)}
              style={{ width: "19px", height: "19px" }}
            ></CenterFocusWeakSharpIcon>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
      case IconNames.PICKANDMOVE:
        icon = (
          <MuiToggleButton
            value="pick & move"
            selected={isPickAndMoveEnabled}
            style={{
              padding: 0,
              border: "none",
              margin: 0,
              textTransform: "none",
            }}
          >
            <div onClick={onClickPickAndMove}>
              <PickAndMoveIcon
                fontSize="small"
                className={clsx(style.icon)}
                style={{ width: "19px", height: "19px" }}
              >
                {" "}
              </PickAndMoveIcon>
              <div className={clsx(style.iconText)} style={{ marginLeft: 4 }}>
                {iconName}
              </div>
            </div>
          </MuiToggleButton>
        );
        break;

        case IconNames.ARRANGELABEL:
          icon = (
            <MuiToggleButton
            value="arrangeLabel"
            selected={arrangeLabels}
            style={{
              padding: 0,
              border: "none",
              margin: 0,
              textTransform: "none",
            }}
          >
            <div onClick={handleArrangeLabel} style={{}}>
              < MuiAvTimerIcon
                fontSize="small"
                className={clsx(style.icon)}
                style={{ width: "19px", height: "19px" }}
              ></ MuiAvTimerIcon>
              <div className={clsx(style.iconText)}>{iconName}</div>
            </div>
            </MuiToggleButton>
          );
          break;
      case IconNames.RESET:
        icon = (
          <div onClick={handleReset} style={{ paddingRight: 10 }}>
            <RotateLeftIcon
              fontSize="small"
              className={clsx(style.icon)}
              style={{ width: "19px", height: "19px" }}
            ></RotateLeftIcon>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
case IconNames.ADDSLIDE:
        icon = (
          <div onClick={()=>handleAddSlide('slide_parent')}>
            <AddGroup
              fontSize="small"
              className={clsx(style.icon)}
              style={{ width: "17px", height: "17px" }}
            ></AddGroup>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
        case IconNames.UPDATESLIDE:
        icon = (
          <div onClick={handleReplace}>
            <Replace
              fontSize="small"
              className={clsx(style.icon)}
              style={{ width: "19px", height: "19px" }}
            ></Replace>
            <div className={clsx(style.iconText)}>{iconName}</div>
          </div>
        );
        break;
    }
    return icon;
  };

  const handleUndoStackUpdate = (e: any) => {
    // setIsUndoable(undoStack.isUndoable());
    // setIsRedoable(undoStack.isRedoable());
  };

  useEffect(() => {
    undoStack.addEventListener(UndoEvents.UPDATE, handleUndoStackUpdate);
    return () => {
      undoStack.removeEventListener(UndoEvents.UPDATE);
    };
  }, []);

  const onHandleUndo = () => {
    undo(dispatch);
  };

  const onHandleRedo = () => {
    redo(dispatch);
  };

  const onHandlePopout = () => {
    // setToggleClicked(!isToggleClicked);
    let allWindowPopout = true;
    dispatch(setTogglePopout(!togglePopoutButton));
    Object.values(uncommonData).forEach((item) => {
      let uid = item.id;
      if (togglePopoutButton === false) {
        if (uid === "colorPlotWindow") {
          if (isLgendEnabled === true) {
            dispatch(setEditMode({ uid, isEdit: true ,allWindowPopout}));
          } else {
            dispatch(setEditMode({ uid, isEdit: false ,allWindowPopout}));
          }
        } else {
          dispatch(setEditMode({ uid, isEdit: true ,allWindowPopout}));
        }
      } else {
        dispatch(setEditMode({ uid, isEdit: false ,allWindowPopout}));
      }
    });
  };

  const onHandleFullscreen = () => {
    dispatch(setFullscreenState(!isFullscreenEnabled));
    toggle();
    if (isFullscreenEnabled) {
      dispatch(
        tourListSlice.actions.setUpdateAction(
          gettingStartedSteps.fullScreen.target.slice(1)
        )
      );
      dispatch(tourListSlice.actions.setManualStepForward());
    }
  };

  useLayoutEffect(() => {
    fullscreen
      ? dispatch(setFullscreenState(true))
      : dispatch(setFullscreenState(false));
  }, [fullscreen]);

  // const onHandlePresentationPrevious = () => {
  //   console.log("Presentation Previous Button Clicked");
  // };

  // const onHandlePresentationNext = () => {
  //   console.log("Presentation Next Button Clicked");
  // };

  const createIcons = (selectedIcons: any) => {
    const icon = (
      <MuiToolTip title={selectedIcons}>
        <div
          className={
            selectedIcons === "Next Slide" || selectedIcons === "Previous Slide"
              ? selectedIcons === "Next Slide"
                ? next
                  ? style.toolbardisabledIcons
                  : style.toolbarIcons
                : prev
                ? style.toolbardisabledIcons
                : style.toolbarIcons
              : style.toolbarIcons
          }
        >
          <ActionIcon
            disabled={
              selectedIcons === "Next Slide" ||
              selectedIcons === "Previous Slide"
                ? selectedIcons === "Next Slide"
                  ? next
                    ? true
                    : false
                  : prev
                  ? true
                  : false
                : false
            }
            style={{
              // color:'red',
              background: "transparent",
              border: "none",
              margin: "auto",
              // display: "block",
              width: "100%",
              height: "100%",
              opacity:
                selectedIcons === "Next Slide" ||
                selectedIcons === "Previous Slide"
                  ? selectedIcons === "Next Slide"
                    ? next
                      ? 0.4
                      : ""
                    : prev
                    ? 0.4
                    : ""
                  : "",
            }}
          >
            {getIcon(selectedIcons)}
            {/* <div style={{ fontSize: 8, display:'flex',justifyContent:'center',marginTop:'6px' }}>
            {selectedIcons}
          </div> */}
          </ActionIcon>
        </div>
      </MuiToolTip>
    );

    return icon;
  };

  const [shouldHideWindow, setShouldHideWindow] = useState(false);
  const customFloatBar = (
    winowData: any,
    position: any,
    width: any,
    height: any
  ) => {
    // const toolbarIdsToHide = Object.keys(toolBarData).filter((toolbarId) => !toolBarData[toolbarId].state.visibility);
    // // const toolbarIdsToHide2 = Object.keys(combinedToolbarList).filter((toolbarId) => console.log(toolbarId));

    // const isVisible =
    // winowData.selectedTools.length > 0 &&
    // (toolBarData[winowData.id] || !toolBarData[editableNodeId]?.state.visibility)
    //  &&
    // !shouldHideWindow &&
    // !toolbarIdsToHide.includes(winowData.id);

    const toolbarIdsToHide = Object.keys(toolBarData).filter(
      (toolbarId) => toolbarId
    );
    // const toolbarIdsToHide2 = Object.keys(combinedToolbarList).filter((toolbarId) => console.log(toolbarId));

    const isVisible =
      winowData.selectedTools.length > 0 &&
      !combinedToolbarList[winowData.id]?.state.visibility;

    return (
      <CustomFloatingWindow
        uid={winowData.id}
        layer={props.layerId}
        visible={isVisible}
        parentRef={props.parentRef}
        xy={[position[0], position[1]]}
        width={width}
        height={height}
      >
        {winowData.selectedTools.length > 0 ? (
          <ButtonGroup
            className={clsx([style.iconBar])}
            style={{
              // marginLeft : winowData.id ==='toolBar_Presentation' ? '2px' : '',
              flexDirection:
                toolBarData[winowData.id]?.appliedOrientation === "2"
                  ? "column"
                  : "row",
            }}
            children={winowData.selectedTools.map((item: any) =>
              createIcons(item)
            )}
          />
        ) : null}
      </CustomFloatingWindow>
    );
  };

  const createWindows = (winowData: any) => {
    let position = [600, 2];
    // let barsWidth = 30;
    let width = winowData.selectedTools.length * 45;
    let height = 45;
    if (screenWidth) {
      if (
        winowData.id === "toolBar_FullScreen" &&
        screenWidth &&
        screenHeight
      ) {
        // let barsWidth = 20;
        width = 45;
        height = 45;
        position = [screenWidth - width, 2];
        return customFloatBar(winowData, position, width, height);
      } else if (
        winowData.id === "toolBar_Presentation" &&
        screenWidth &&
        screenHeight
      ) {
        width = 200;
        height = 45;
        position = [screenWidth / 2 - width / 2, screenHeight - height - 2];
        return customFloatBar(winowData, position, width, height);
      } else if (
        winowData.id === "toolBar_Popout" &&
        screenWidth &&
        screenHeight
      ) {
        width = 200;
        height = 45;
        position = [screenWidth - width, 2];

        return customFloatBar(winowData, position, width, height);
      } else {
        if (winowData.selectedTools.length > 0) {
          // width = winowData.selectedTools.length * 60 + 30
          // height=60
          return customFloatBar(winowData, position, width, height);
        }
      }
    }
  };

  const style = useStyles();
  const theme = useTheme();
  return <>{toolbarDisplayList.map((item) => createWindows(item))}</>;
}

export default FloatingToolbarWindow;
