import { PayloadAction } from "@reduxjs/toolkit";
import {TreeNode} from "../../shared/Tree/types";

export enum LabelMode {
    EDIT,
    VIEW
}

export enum LabelType {
    LABEL2D = "LABEL2D",
    LABEL3D = "LABEL3D",
    MEASUREMENT = "MEASUREMENT",
    LINECHART3D = "LINECHART3D",
    LABELCHART = "LABELCHART",
    HOTSPOTS = "HOTSPOTS"
}

export enum Label2DType {
    DEFAULT = 'DEFAULT'
}

export enum Label3DType {
    ANNOTATION = "ANNOTATION", 
    MINMAX = "MINMAX",
    PROBEPARENT = "PROBEPARENT", 
    PROBE = "PROBE",
    DISTANCE = "DISTANCE", 
    ARC = "ARC", 
    EDGE = "EDGE", 
    FACE = "FACE",
    HOTSPOTPARENT = "HOTSPOTPARENT",
    HOTSPOT = "HOTSPOT"
}

// LABEL NEW GUI ENUM
export enum LabelAllType {

  LABEL2D    = "LABEL2D",
  POINTLABEL = "POINTLABEL",
  FACELABEL  = "FACELABEL",
  POINTTOPOINTLABEL = "POINTTOPOINTLABEL",
  ARCLABEL = "ARCLABEL",
  LABELCHART = "LABELCHART"
} 
export enum ImageStyle {
    TILE,
     CENTER,
    STRETCH,
    FIT_VIEW
   }
export enum LabelChartType {
    LINECHART = "LINECHART",
    LINECHART3D ="LINECHART3D"
}
export interface ILabel extends TreeNode {
    label: string,
    pos: [number, number],
    size:[number,number],
    autoPosition:boolean,
    attachPartVisibility:boolean | null,
    labelType: LabelType,
    bgColor:string,
    anchor?: [number,number],
    type?: Label3DType|LabelChartType,
    childLabelCount:number,
    color:string,
    borderColor:any,
    isBorderEnabled: boolean,
    isBackgroundEnabled: boolean,
    file:any,
    backgroundPreviousImage:any,
    imageStyle:ImageStyle,
    isImageActive: boolean,
    eventData?:any,
    isTitleEditable:boolean,
    hotSpotData?:{
        minValue:number,
        isMinChecked:boolean,
        maxValue:number,
        isMaxChecked:boolean,
        topValue:number,
        isTopChecked:boolean,
        bottomValue:number,
        isBottomChecked:boolean
    }
}

export interface Label2D extends ILabel {
}

export interface Label3D extends ILabel {
    anchor: [number,number],
    probeData?: any,
    type: Label3DType,
}

export interface LabelChart extends ILabel {
    // type?: LabelChartType,
    anchor?: [number,number],
    probeData?: any,
    type?: LabelChartType,
}

export type LabelSettings = {
    mode: LabelMode
}
