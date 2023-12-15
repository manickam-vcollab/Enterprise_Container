import { PayloadAction } from "@reduxjs/toolkit";
import {TreeNode} from "../../shared/Tree/types";

export enum AnimationMode {
    EDIT,
    VIEW
}

export enum AnimationType {
    LINEAR = "LINEAR",
    EIGEN = "EIGEN",
    TRANSIENT  = "TRANSIENT",
    VIEWPOINT = "VIEWPOINT",
    
    
}

export enum AnimationAllType {

    LINEAR    = "LINEAR",
    EIGEN = "EIGEN",
    TRANSIENT  = "TRANSIENT",
    VIEWPOINT = "VIEWPOINT",
    
  }

  export enum ANIMATIONSTATE{
    STOPPED = 0,
    PAUSED = 0.5,
    STARTED = 1
  }

  export interface IAnimation extends TreeNode {
    animationType: AnimationType,
    anchor?: [number,number],
    frames:number,
    slider:number,
    frameSlider:number,
    scaleFactor:number,
    isTitleEditable:boolean,
    animationState:number,
    // animationState:ANIMATIONSTATE
    // type?: Label3DType,
}

export interface Linear extends IAnimation {
}

export type AnimationSettings = {
    mode: AnimationMode
}