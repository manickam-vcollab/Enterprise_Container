import React, { useEffect } from 'react'
// import { EventDispatcher } from '../../backend/EventDispatcher';
import {getEventDispatcher,getEventsList} from "../../backend/viewerAPIProxy";
import { useAppDispatch , useAppSelector } from '../../store/storeHooks';
import { setModelLoadingStatus, setInteractionModeAsync , selectActiveViewerID } from '../../store/appSlice';
import { handlePlaneSelection } from '../../store/sideBar/clipSlice';
import { handleSetFrameNumber } from 'store/sideBar/AnimationSlice/AllAnimationSlice';
//import { selectEditableNodeId } from 'store/sideBar/AnimationSlice/AllAnimationSlice';
//import {init as label2dInit, handleLabel2DCreation, handleProbeLabelCreation} from '../../store/sideBar/labelSlice/labelAllSlice';
import {init as allLabel ,handleLabel2DCreation,handleProbeLabelCreation, handleLableAnchorPositionUpdate, setAttachPartVisibility} from '../../store/sideBar/labelSlice/AllLabelSlice';
import { addMessage, updateMessage, NetworkData, NotificationType, finishMessage,addMessageAsync } from '../../store/sideBar/messageSlice';
import { handleHighlightAsync } from '../../store/sideBar/productTreeSlice';
import { fetchCameraMatrix,setActiveCameraViewID } from '../../store/sideBar/sceneSlice';
import { toastMsg } from '../../store/toastSlice';
// import { viewerEvents } from '../../backend/ViewerManager';
// import {selectUndoable,setUndo} from "../../store/sideBar/displayModesSlice";
type Props = {
    mount: boolean
}

function setup(dispatch:any) {
  //dispatch(label2dInit({}));
  dispatch(allLabel({}));
}

function EventRegistry(props: Props) {
    const dispatch = useAppDispatch();
    const activeViewerID = useAppSelector(selectActiveViewerID);
    //const editableNodeId = useAppSelector(selectEditableNodeId);
    //  const undoredo = useAppSelector(addmessage);
    // console.log("event registry",undoredo)
    
    useEffect(() => {
      // console.log("undoredo",undoredo)
      setup(dispatch);
        if(props.mount) {
            let eventDispatcher = getEventDispatcher();
            let events = getEventsList();
            let labelMovedTimer : number | null = null;
            
              eventDispatcher?.addEventListener(
                events.viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,
                (event : any) => {
                  dispatch(setModelLoadingStatus(event.data));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.DOWNLOAD_START,
                (event: any) => {
                  let data = event.data;
                  let networkData:NetworkData = {
                    transfferedSize: 0,
                    totalSize: data.event.totalSize,
                    pause: false,
                    cancel: false,
                    timeLeft: ""
                  }
                  let obj = {
                    id: data.id,
                    type: NotificationType.NETWORK_TRANSFER_MESSAGE,
                    tags: ["Downloads"],
                    data: networkData,
                    title: data.event.title
                  };
                  obj.tags.push(data.event.tag);
                  // if(undoredo){
                  dispatch(addMessageAsync(obj));                   
                    // dispatch(addMessage({
                    //   id: data.id,
                    //   type: NotificationType.NETWORK_TRANSFER_MESSAGE,
                    //   tags: ["Downloads","Display Mode"],
                    //   data: networkData,
                    //   title: data.event.title
                    // }))
                  //   dispatch(setUndo(false))
                  //   console.log("undoable111",undoredo)
                  // }
                 
                  // else {
                  //   dispatch(setUndo(false))
                  // }
                  
                  dispatch(toastMsg({msg:`${data.event.title}`}));
                  // console.log("start",networkData.totalSize);
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.DOWNLOAD_PROGRESS,
                (event: any) => {
                  let data = event.data;
                  dispatch(updateMessage({
                    id: data.id,
                    transferredSize: data.event.loaded
                  }))
                  // console.log("update",data.event);
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.DOWNLOAD_END,
                (event: any) => {
                  let data = event.data;
                 
                  dispatch(finishMessage({
                    id: data.id
                  }))
                  dispatch(toastMsg({msg:`${data.event.title}`}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.MODEL_PART_HIGHLIGHTED,
                (event: any) => {
                    let nodeIds = event.data.nodeIds;
                    let toHighlight = event.data.isHighlighted;
                  dispatch(handleHighlightAsync({nodeIds,toHighlight}));            
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.SECTION_PLANE_SELECTED,
                (event : any) => {
                  let data = event.data;
                  dispatch(handlePlaneSelection({e:data}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.CAMERA_MOVED,
                (event:any) => {
                  dispatch(fetchCameraMatrix())
                  dispatch(setActiveCameraViewID(''));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.INTERACTION_MODE_CHANGED,
                (event:any) => {
                  let mode = event.data.currState;
                  dispatch(setInteractionModeAsync(mode));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.LABEL3D_CREATED,
                (event:any) => {
                  dispatch(handleProbeLabelCreation({data: event, undoable: true ,activeViewerID:activeViewerID}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.LABEL_MOVED,
                (event:any) => {   
                  dispatch(handleLableAnchorPositionUpdate({data: event, activeViewerID:activeViewerID}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.LABEL_VISIBILITY,
                (event:any) => {   
                  //console.log(event.data);
                  dispatch(setAttachPartVisibility({labelId: event.data.labelId, visibility: event.data.attachedParentVisibility}));
                }
              );
              
              eventDispatcher?.addEventListener(
                events.viewerEvents.VIEWER_CLICK,
                (event:any) => {
                  //dispatch(handleLabel2DCreation({data: event, undoable: true})); // handled directly in the label components
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.ANIMATION_FRAME_NUMBER,
                (event:any) => {
                  dispatch(handleSetFrameNumber({data:event}))
                 // dispatch(setFrameSlider({animationFrameSliderId:editableNodeId,updatedValue:event.data.frameNumber}))
                 
                }
              );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.mount])
    return (
        <>

        </>
    )
}

export default EventRegistry
