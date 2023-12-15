import { PayloadAction } from "@reduxjs/toolkit";
import {TreeNode} from "../../shared/Tree/types";



export enum ToolBarType {
    TOOLBAR = "TOOLBAR",
    
    
}

export enum ToolBarAllType {

    TOOLBAR = "TOOLBAR",
    
  }


  export interface IToolBar extends TreeNode {
    // forEach(callback: (toolbar: IToolBar, index: number, array: IToolBar[]) => void): void;
     toolBarType: ToolBarType,    
    id: string;
  title: string;
  titleText:string;
  selectedTools:any[];
  appliedOrientation:string;
  appliedPosition:string;
  toolBarPositionList:ToolBarPositionList[];
  ToolBarOrientationList:ToolBarOrientationList[];
  state: {
    checked: boolean;
    partiallyChecked: boolean;
    expanded: boolean;
    highlighted: boolean;
    visibility: boolean;
    selected: boolean,
  };
  children: any[];
  orientation: any,
  pid: string|null;
  
    // animationState:number,
    // animationState:ANIMATIONSTATE
    // type?: Label3DType,
} 

export interface ITools extends TreeNode {
  id:string;
  title:string;
  state:{
    checked:boolean;
  }

}

export type ToolBarOrientationList = {
  id: any;
  text: string;
  selected: boolean;
  applied: boolean;
};

export type ToolBarPositionList = {
  id: any;
  text: string;
  selected: boolean;
  applied: boolean;
};

export interface ToolBar extends IToolBar {
}

