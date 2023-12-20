import { PropsWithChildren ,useState,useRef} from 'react';
import { vec3 } from "gl-matrix";
import * as viewerAPIProxy from '../../backend/viewerAPIProxy';
import {useAppSelector} from "../../store/storeHooks";
import { InteractionMode } from 'backend/ViewerManager';
import { MathUtils } from './MathUtilities';
import {selectInteractionMode} from '../../store/appSlice';
import './index.css';


export interface Props {
    style?: React.CSSProperties
    viewerId : string
}

const mouseDownButtons = {
  none:-1,
  left: 0,
  middle: 1,
  right: 2,
};

export default function Container(props: PropsWithChildren<Props>) {

  const interactionMode = useAppSelector(selectInteractionMode); 
  const isPickAndMoveEnabled = interactionMode === InteractionMode.PICK_AND_MOVE;
  const [pressedMouseButton,setPressedMouseButton] = useState<number>(mouseDownButtons.none);
  const [mouseLastXY,setMoouseLastXY] = useState<number[]>([]); 
  const containerID = props.viewerId;
  let canvasElement = document.getElementById(containerID)!;

  // getting container top,left,right,bottom values
  const getContainerBox = ()=> {
    let element = document.getElementById(containerID);
    let box = [0, 0, 0, 0];
    if (element) {
          var rect = element.getBoundingClientRect();
          box[0] = rect.top;
          box[1] = rect.left;
          box[2] = rect.bottom;
          box[3] = rect.right;
    }
  return box;
  }
  // getting current mouse position of container
  const getMousePos = (event:any)=> {
    let contatinerPos = getContainerBox();
    let containerTop = contatinerPos[0];
    let containerLeft = contatinerPos[1];
    let newX = event.clientX - containerLeft;
    let newY = event.clientY - containerTop;
    return [newX,newY]
  }
  // mouse wheel  point zoom in and point zoom out
  const onhandleMouseWheel= (e:any)=> {
    //if(isPickAndMoveEnabled === false) { 
      let mouseWheelData:number = Math.max(-1, Math.min(1, (e.nativeEvent.wheelDelta || e.nativeEvent.wheelDelta)));
      const newXY:number[] = getMousePos(e);
      if(mouseWheelData < 0){
        viewerAPIProxy.pointZoomOut(newXY[0],newXY[1],1,props.viewerId);
      }
      else{
        viewerAPIProxy.pointZoomIn(newXY[0],newXY[1],1,props.viewerId);
      }
   //}
  }  
  // handle mouse down 
  const onHandleMouseDown= (e:any)=> {
    setPressedMouseButton(e.button);
    const newXY = getMousePos(e);
    let newXYCopy = [...newXY];
    setMoouseLastXY(newXYCopy);
      
  }
  // handle mouse up 
  const onHandleMouseUp = (e:any)=> {
    setPressedMouseButton(mouseDownButtons.none);
    setMoouseLastXY([]);

  }
  // handle mouse move
  const onHandleMouseMove = (e:any)=> {
    if(pressedMouseButton !== -1) {
      const newXY = getMousePos(e);
      const mouseNewX = newXY[0];
      const mouseNewY = newXY[1];
      const mouseLastX = mouseLastXY[0];
      var mouseLastY = mouseLastXY[1];
      let dir = vec3.fromValues(mouseNewX-mouseLastX,mouseNewY-mouseLastY,0);
      vec3.normalize(dir,dir);
      let isVerticalDrag = Math.abs(vec3.dot(dir,vec3.fromValues(1,0,0))) > 0.5 ? false : true;
      let newXYCopy = [...newXY];
      setMoouseLastXY(newXYCopy);  
      if(pressedMouseButton === mouseDownButtons.middle){
          let delta = isVerticalDrag? mouseLastY-mouseNewY:mouseLastX-mouseNewX;
         // delta = delta *10;
          if(delta > 0) {
            if(isPickAndMoveEnabled === true) {
              viewerAPIProxy.translateZ(delta,props.viewerId);
            }else {
              viewerAPIProxy.zoomIn(delta,props.viewerId);

            }
          }else{
            if(isPickAndMoveEnabled === true) {
              viewerAPIProxy.translateZ(delta,props.viewerId);
            }else{
              viewerAPIProxy.zoomOut(delta,props.viewerId);
            }

          }
      }
      else if(pressedMouseButton === mouseDownButtons.left){
        const rotationAngle = MathUtils.getRotAngleAndNormalizedCamAxis(mouseNewX, mouseNewY, mouseLastX, mouseLastY, canvasElement);
        if(rotationAngle.angle && rotationAngle.axis_in_camera_coord){
          const axis_in_camera_coord : [number, number, number] =  [rotationAngle.axis_in_camera_coord[0],rotationAngle.axis_in_camera_coord[1],rotationAngle.axis_in_camera_coord[2]];
          if(isPickAndMoveEnabled === true) {
            viewerAPIProxy.rotatePartCamera(rotationAngle.angle,axis_in_camera_coord, props.viewerId);
          }else{
            viewerAPIProxy.rotateCamera(rotationAngle.angle, axis_in_camera_coord, props.viewerId);
          }
          
        }
      }
      else if(pressedMouseButton === mouseDownButtons.right){
        const deltaX = mouseNewX - mouseLastX;
        const deltaY = mouseNewY - mouseLastY;
        if(isPickAndMoveEnabled === true) {
          viewerAPIProxy.translatePart(mouseNewX,mouseNewY,mouseLastX,mouseLastY,props.viewerId);
        }else {
          viewerAPIProxy.panRotateCamera(deltaX, deltaY, props.viewerId);
        }

        //viewerAPIProxy.onMousePanRotation(mouseNewX,mouseNewY,mouseLastX,mouseLastY,props.viewerId);
      }
    }      
  }

  // handle mouseout
  const onHandleMouseOut = ()=>{
      setPressedMouseButton(mouseDownButtons.none);
  }
  // 
  const onHandleMouseClick = (event:any)=> {
    viewerAPIProxy.handleGUIEvents('CLICK',event,containerID);

  }
  const onHandleMouseDoubleClick = (event:any)=> {
    viewerAPIProxy.handleGUIEvents('DBL_CLICK',event,containerID);
  }
  return (
      <div className='container' id={containerID} style={ props.style } onWheel={onhandleMouseWheel} onContextMenu={(e) => e.preventDefault()} onMouseDown={onHandleMouseDown} onMouseUp={onHandleMouseUp} onMouseMove={onHandleMouseMove} onMouseOut={onHandleMouseOut}  onClick={onHandleMouseClick} onDoubleClick={onHandleMouseDoubleClick}>
            { props.children }
      </div>       
  )
}