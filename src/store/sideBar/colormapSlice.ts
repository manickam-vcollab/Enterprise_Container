import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from "../index";
import { TreeNode } from "./shared/Tree/types";

import { ITreeState } from "./shared/Tree/types";
import {
  saveTreeReducer,
  checkNodeReducer,
  highlightNodeReducer,
  invertNodeReducer,
  expandNodeReducer,
  toggleVisibilityReducer,
  setCheckedVisibilityReducer,
  addNodeReducer,
} from "./shared/Tree/reducers";

import {TreeType} from "../caeResultSlice";
import * as viewerAPIProxy from '../../backend/viewerAPIProxy';

import autoBar from "../../assets/images/autoBar.png";
import topright from "../../assets/images/topright.png";
import topleft from "../../assets/images/topleft.png";
import topmiddle from "../../assets/images/topmiddle.png";
import leftplace from "../../assets/images/leftplace.png";
import rightplace from "../../assets/images/rightplace.png";
import topplace from "../../assets/images/topplace.png";
import bottomplace from "../../assets/images/bottomplace.png";
import alterplace from "../../assets/images/alterplace.png";
import bottomleft from "../../assets/images/bottomleft.png";
import bottomright from "../../assets/images/bottomright.png";
import bottommiddle from "../../assets/images/bottommiddle.png";
import vertical from "../../assets/images/vertical.png";
import horizontal from "../../assets/images/horizontal.png";
import discrete from "../../assets/images/discrete.png";
import bottom from "../../assets/images/bottom.png";
import top from "../../assets/images/top.png";
import colorBar from "../../assets/images/horizontal.png";
import noticksBar from "../../assets/images/noticks.svg";
import insideBar from "../../assets/images/inside.svg";
import outsideBar from "../../assets/images/outside.svg";
import acrossBar from "../../assets/images/across.svg";
import { ObjectFlags } from "typescript";
import { toastMsg } from "store/toastSlice";

// Legend Setting Type

export enum LegendType {
  AUTO,
  CONTINUOUS,
  DISCRETE,
}
export enum LegendDirection {
  VERTICAL,
  HORIZONTAL,
  AUTO,
}
export enum LegendTicsType {
  NO_TICS,
  INSIDE,
  OUTSIDE,
  RUNNING_ACROSS,
}

export enum DownloadStates {
  DOWNLOADED,
  IN_PROGRESS,
  NOT_DOWNLOADED,
  NO_DATA_AVAILABLE
}

export enum LegendTitlePlacement {
  TOP,
  BOTTOM,
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT,
}
export enum LegendValuePlacement {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
  ALTERNATING,
}

type ColormapSettings = {
  idGenerator: number;
  defaultParameters: Colormap;
  userDefinedCount: number;
};

export enum ValueType {
  NONE = -1,
  LINEAR = 0,
  LOGARITHMIC = 1,
}

export enum ValueNature {
  NONE = -1,
  MAXMIN = 0,
  SINGLE = 1,
}

export enum ColormapType {
  SYSTEM = 0,
  USER = 1,
}

export interface Colormap extends TreeNode {
  id: string;
  pid: string | null;
  title: string;
  children: string[];
  state: any;
  attributes: any;
  type:ColormapType;
  colormapType: ColormapType;
  colorPalette: string;
  variable: string;
  derivedType: string;
  step: string;
  appliedVariable:string;
  appliedStep:string;
  appliedDerivedType:string;
  section: string;
  downloadStatus: DownloadStates;

  size: number;

  paletteType: string;
  direction: string;
  ticPosition: string;
  titlePlacement: string;
  valuePlacement: string;
  gap: number;
  isTitleEditable:boolean
  valueRange:[number,number] ;
  paletteRange:[number,number] ;
}

interface ColormapTreeState extends ITreeState {
  data: { [id: string]: Colormap };
  rootIds: string[];
}

export interface ColorPalette extends TreeNode {
  id: string;
  pid: string | null;
  title: string;
  children: string[];
  state: any;
  colorSet: any[];
  noResultColor:any[];
  aboveMaxColor:any[];
  belowMinColor:any[];
  valueSet: string[];
  valueNature: ValueNature;
  valueType: ValueType;
  attributes: any;
  type:any;
  colormapType: ColormapType;
  isTitleEditable:boolean;
}

type paletteType = {
  id: string;
  name: string;
  image: string;
  type: LegendType;
}[];

type paletteDirection = {
  id: string;
  name: string;
  image: string;
  direction: LegendDirection;
}[];

type tickType = {
  id: string;
  name: string;
  image: string;
  ticktype: LegendTicsType;
}[];

type titlePlacement = {
  id: string;
  name: string;
  image: string;
  position: LegendTitlePlacement;
  disable:boolean
}[];

type valuePlacement = {
  id: string;
  name: string;
  image: string;
  position: LegendValuePlacement;
  disable:boolean
}[];

type legendList = {
  id: any;
  text: string;
  selected: boolean;
  applied: boolean;
}[];


interface ColorPaletteTreeState extends ITreeState {
  data: { [id: string]: ColorPalette };
  rootIds: string[];
}

type ColorPaletteSettings = {
  idGenerator: number;
  counter: number;
};

export interface InitialState {
  colormapTree: ColormapTreeState;
  colormapSettings: ColormapSettings;

  colorPaletteTree: ColorPaletteTreeState;
  colorPaletteSettings: ColorPaletteSettings;

  selectedColorMapId: string;
  appliedColorMapId: string;
  selectedColorPaletteId: string;
  showAxis: boolean;
  legendTitle: string;
  paletteType: paletteType;
  direction: paletteDirection;
  ticPosition: tickType;
  titlePlacement: titlePlacement;
  valuePlacement: valuePlacement;
  legendList: legendList;
  resultMinMax : [number | null, number | null];
  isCAEDataChange:boolean;
  isLegendEnable:boolean;
  isColorSetValueChanged:boolean;
  circularProgressStatus : boolean;
  btndisable: boolean;

}

const initialState: InitialState = {
  colormapTree: {
    data: {},
    rootIds: [],
  },
  colormapSettings: {
    idGenerator: 6,
    defaultParameters: {
      id: "",
      pid: "-1",
      title: "",
      children: [],
      state: {
        expanded: true,
        visibility: true,
      },
      type:ColormapType.USER,
      colormapType: ColormapType.USER,
      colorPalette: "2",
      variable: "13",
      derivedType: "22",
      section: "12",
      step: "01",
      appliedVariable: "13",
      appliedStep: "01",
      appliedDerivedType: "22",
      attributes: {},
      downloadStatus: DownloadStates.NOT_DOWNLOADED,
      size: 2024,
      paletteType: "0",
      direction: "0",
      ticPosition: "2",
      titlePlacement: "0",
      valuePlacement: "1",
      gap: 1,
      isTitleEditable:false
    },
    userDefinedCount: 0,
    // headCount: 2,
  },
  showAxis: true,
  legendList: [{ id: "7", text: "Custom", selected: false, applied: false }],
  colorPaletteTree: {
    data: {
      "0": {
        id: "0",
        pid: "-1",
        title: "System Defined",
        children: ["2", "3"],
        state: {
          expanded: true,
          visibility: true,
        },
        type:ColormapType.SYSTEM,
        colormapType: ColormapType.SYSTEM,
        colorSet: [
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
          { id: 1, color: { r: 255, g: 112, b: 0, a: 255 } },
          { id: 2, color: { r: 247, g: 219, b: 0, a: 255 } },
          { id: 3, color: { r: 169, g: 255, b: 0, a: 255 } },
          { id: 4, color: { r: 56, g: 255, b: 0, a: 255 } },
          { id: 5, color: { r: 0, g: 255, b: 56, a: 255 } },
          { id: 6, color: { r: 0, g: 255, b: 169, a: 255 } },
          { id: 7, color: { r: 0, g: 219, b: 247, a: 255 } },
          { id: 8, color: { r: 0, g: 112, b: 255, a: 255 } },
          { id: 9, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        noResultColor:[
          { id: 0, color: { r: 211, g: 211, b: 211, a: 255 } },
        ],
        aboveMaxColor:[
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
        ],
        belowMinColor:[
          { id: 0, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        valueSet: [
          "+Infinity",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "-Infinity",
        ],
        valueNature: ValueNature.MAXMIN,
        valueType: ValueType.LINEAR,
        attributes: {},
        isTitleEditable:false
      },
      "1": {
        id: "1",
        pid: "-1",
        title: "User Defined",
        children: [],
        state: {
          expanded: true,
          visibility: true,
        },
        type:ColormapType.SYSTEM,
        colormapType: ColormapType.SYSTEM,
        colorSet: [],
        noResultColor:[],
        aboveMaxColor:[],
        belowMinColor:[],
        valueSet: [],
        valueNature: ValueNature.MAXMIN,
        valueType: ValueType.LINEAR,
        attributes: {},
        isTitleEditable:false
      },
      "2": {
        id: "2",
        pid: "0",
        title: "VCollab Default",
        children: [],
        state: {
          expanded: true,
          visibility: true,
        },
        type:ColormapType.SYSTEM,
        colormapType: ColormapType.SYSTEM,
        colorSet: [
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
          { id: 1, color: { r: 255, g: 112, b: 0, a: 255 } },
          { id: 2, color: { r: 247, g: 219, b: 0, a: 255 } },
          { id: 3, color: { r: 169, g: 255, b: 0, a: 255 } },
          { id: 4, color: { r: 56, g: 255, b: 0, a: 255 } },
          { id: 5, color: { r: 0, g: 255, b: 56, a: 255 } },
          { id: 6, color: { r: 0, g: 255, b: 169, a: 255 } },
          { id: 7, color: { r: 0, g: 219, b: 247, a: 255 } },
          { id: 8, color: { r: 0, g: 112, b: 255, a: 255 } },
          { id: 9, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        noResultColor:[
          { id: 0, color: { r: 211, g: 211, b: 211, a: 255 } },
        ],
        aboveMaxColor:[
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
        ],
        belowMinColor:[
          { id: 0, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        valueSet: [
          "+Infinity",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "-Infinity",
        ],
        valueNature: ValueNature.MAXMIN,
        valueType: ValueType.LINEAR,
        attributes: {},
        isTitleEditable:false
      },
      "3": {
        id: "3",
        pid: "0",
        title: "Abaqus",
        children: [],
        state: {
          expanded: true,
          visibility: true,
        },
        type:ColormapType.SYSTEM,
        colormapType: ColormapType.SYSTEM,
        colorSet: [
          { id: 0, color: { r: 255, g: 0, b: 0, a: 1 } },
          { id: 1, color: { r: 0, g: 255, b: 0, a: 1 } },
          { id: 2, color: { r: 0, g: 0, b: 255, a: 1 } },
        ],
        noResultColor:[
          { id: 0, color: { r: 211, g: 211, b: 211, a: 255 } },
        ],
        aboveMaxColor:[
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
        ],
        belowMinColor:[
          { id: 0, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        valueSet: ["+Infinity", "Auto", "Auto","-Infinity"],
        valueNature: ValueNature.MAXMIN,
        valueType: ValueType.LINEAR,
        attributes: {},
        isTitleEditable:false
      },
    },

    rootIds: ["0", "1"],
  },

  colorPaletteSettings: {
    idGenerator: 3,
    counter: 0,
  },
  selectedColorMapId: "-1",
  appliedColorMapId: "-1",
  selectedColorPaletteId: "2",
  legendTitle: "Legend",

  paletteType: [
    { id: "0", name: "Auto", image: autoBar, type: LegendType.AUTO },
    {
      id: "1",
      name: "Continious",
      image: colorBar,
      type: LegendType.CONTINUOUS,
    },
    { id: "2", name: "Discrete", image: discrete, type: LegendType.DISCRETE },
  ],

  direction: [
    {
      id: "0",
      name: "Vertical",
      image: vertical,
      direction: LegendDirection.VERTICAL,
    },
    {
      id: "1",
      name: "Horizontal",
      image: horizontal,
      direction: LegendDirection.HORIZONTAL,
    },
    { id: "2", name: "Auto", image: autoBar, direction: LegendDirection.AUTO },
  ],

  ticPosition: [
    {
      id: "0",
      name: "No tics",
      image: noticksBar,
      ticktype: LegendTicsType.NO_TICS,
    },
    {
      id: "1",
      name: "Inside",
      image: insideBar,
      ticktype: LegendTicsType.INSIDE,
    },
    {
      id: "2",
      name: "Outside",
      image: outsideBar,
      ticktype: LegendTicsType.OUTSIDE,
    },
    {
      id: "3",
      name: "Running across",
      image: acrossBar,
      ticktype: LegendTicsType.RUNNING_ACROSS,
    },
  ],

  titlePlacement: [
    { id: "0", 
    name: "Top", 
    image: top, 
    position: LegendTitlePlacement.TOP ,
    disable:false
   },
    {
      id: "1",
      name: "Bottom",
      image: bottom,
      position: LegendTitlePlacement.BOTTOM,
      disable:false
    
    },
    {
      id: "2",
      name: "Top Left",
      image: topleft,
      position: LegendTitlePlacement.TOP_LEFT,
      disable:false
    },
    {
      id: "3",
      name: "Top Middle",
      image: topmiddle,
      position: LegendTitlePlacement.TOP_MIDDLE,
      disable:false
    },
    {
      id: "4",
      name: "Top Right",
      image: topright,
      position: LegendTitlePlacement.TOP_RIGHT,
      disable:false
    },
    {
      id: "5",
      name: "Bottom Left",
      image: bottomleft,
      position: LegendTitlePlacement.BOTTOM_LEFT,
      disable:false
    },
    {
      id: "6",
      name: "Bottom Middle",
      image: bottommiddle,
      position: LegendTitlePlacement.BOTTOM_MIDDLE,
      disable:false
    },
    {
      id: "7",
      name: "Bottom Right",
      image: bottomright,
      position: LegendTitlePlacement.BOTTOM_RIGHT,
      disable:false
    },
  ],

  valuePlacement: [
    {
      id: "0",
      name: "Left",
      image: leftplace,
      position: LegendValuePlacement.LEFT,
      disable:false
    },
    {
      id: "1",
      name: "Right",
      image: rightplace,
      position: LegendValuePlacement.RIGHT,
      disable:false

    },
    {
      id: "2",
      name: "Top",
      image: topplace,
      position: LegendValuePlacement.TOP,
      disable:false
    },
    {
      id: "3",
      name: "Bottom",
      image: bottomplace,
      position: LegendValuePlacement.BOTTOM,
      disable:false
    },
    {
      id: "4",
      name: "Alternating",
      image: alterplace,
      position: LegendValuePlacement.ALTERNATING,
      disable:false
    },
  ],

  resultMinMax : [null, null],
  isCAEDataChange:false,
  isLegendEnable:false,
  isColorSetValueChanged:false,
  btndisable:false,
  circularProgressStatus: false

};

export const updatePaletteColorSet = createAsyncThunk(
  "colormap/updatePaletteColorSet",
  async (data:any, {dispatch,getState}) => {

      let response = await dispatch(
      editColorPalette({
        colorPaletteId: data.activeColorPaletteId,
        colorData: data.colorSet,
        noResultColorData:data.noResultColor,
        aboveMaxColorData: data.aboveMaxColor,
        belowMinColorData: data.belowMinColor,
        valueData: data.valueSet,
      })
    );
   return response;

  }
)

export const updateStateAsync = createAsyncThunk(
  "colormap/updateStateAsync",
  async (data: Partial<InitialState>, { dispatch, getState }) => {
    const state = getState() as RootState;
    const activeViewerID = state.app.viewers[state.app.activeViewer || ""];
    //const selectedColorMapId = state?.colormap?.selectedColorMapId;    
    const appliedColorMapId = data?.appliedColorMapId;
    const colormapTreeData = data?.colormapTree?.data;
    const colorPaletteTreeData = data?.colorPaletteTree?.data;
    if(colormapTreeData && appliedColorMapId && appliedColorMapId !== '-1')
    {
      if(colormapTreeData[appliedColorMapId])
      {
        const selectedData = colormapTreeData[appliedColorMapId];
        const variableId = selectedData.variable;
        const stepId = selectedData.step;
        const derivedTypeId =  selectedData.derivedType.includes(":")?selectedData.derivedType.split(":")[1]:selectedData.derivedType;
        try{        
          await viewerAPIProxy.applyResult(variableId,stepId,derivedTypeId ,activeViewerID)
          const paletteType = colormapTreeData[appliedColorMapId].paletteType;
          const colorPaletteIndex = colormapTreeData[appliedColorMapId].colorPalette;
          const paletteRange = colormapTreeData[appliedColorMapId].paletteRange;
          const noResult = colorPaletteTreeData?.[colorPaletteIndex].noResultColor;
          const noResultColor = noResult?.[0].color;
          const resultBelowMinColor =  colorPaletteTreeData?.[colorPaletteIndex].belowMinColor;
          const belowMinColorRGBA    =  resultBelowMinColor?.[0].color;
          const resultAboveMaxColor = colorPaletteTreeData?.[colorPaletteIndex].aboveMaxColor;
          const aboveMaxColorRGBA = resultAboveMaxColor?.[0].color;

          const  palette = data?.colorPaletteTree?.data?.[colorPaletteIndex];
          if(palette && palette.colorSet){
            let colorSetValues:any[] = [];
            palette.colorSet.forEach((data:any) => {
              let R = data.color.r ;
              let G = data.color.g ;
              let B = data.color.b ;
              //let A = data.color.a ;
            colorSetValues.push([R,G,B]);      
          });
            //let newColorSet = colorSetValues.slice(1, colorSetValues.length -1);
            let legendType = (parseInt(paletteType) === LegendType.CONTINUOUS ?  "CONTINUOUS" : "DISCRETE")
            viewerAPIProxy.setLegendData(legendType, colorSetValues, activeViewerID);
            viewerAPIProxy.setAboveMaxColor([aboveMaxColorRGBA.r,aboveMaxColorRGBA.g,aboveMaxColorRGBA.b,aboveMaxColorRGBA.a],  activeViewerID);
            viewerAPIProxy.setBelowMinColor([belowMinColorRGBA.r,belowMinColorRGBA.g,belowMinColorRGBA.b,belowMinColorRGBA.a],  activeViewerID);
            viewerAPIProxy.setNoResultColor([noResultColor.r,noResultColor.g,noResultColor.b,noResultColor.a], activeViewerID);
          }
          let minmax = viewerAPIProxy.getCurrentResultMinMAX(activeViewerID);  
          dispatch(updateAllState(data));
          dispatch(setResultMinMax({minmax : [minmax.min, minmax.max]}));
          viewerAPIProxy.setValueMinMax([paletteRange[0], paletteRange[1]], activeViewerID); 
        }
        catch(error : any ){
          console.error(error);
        }      
      }
    }
    else{
      viewerAPIProxy.applyMaterialColor([],activeViewerID);
      dispatch(setLegendEnabled(false));
    }
    //dispatch(updateAllState(data));
  }
);

export const setColorMapCaeSelection = createAsyncThunk(
  "colormap/setColorMapCaeSelection",
  async (
    data: {selectedColorMapId:string},
    { dispatch, getState }) => {

      dispatch(setBtnDisablle(false))
    const {selectedColorMapId} = data;  
    let Data = (getState() as RootState).caeResult.data;
    let caeData = (getState() as RootState).caeResult.caeData;

      dispatch(updateColorMapCaeSelection({Data,caeData,selectedColorMapId}));
      

  }
);

export const colormapSlice = createSlice({
  name: "colormap",
  initialState: initialState,
  reducers: {
    saveTree: (state, action) => saveTreeReducer(state.colormapTree, action),
    checkNode: (state, action) => checkNodeReducer(state.colormapTree, action),
    checkNodeColorPalette: (state, action) =>
      checkNodeReducer(state.colorPaletteTree, action),
    highlightNode: (state, action) =>
      highlightNodeReducer(state.colormapTree, action),
    invertNode: (state, action) =>
      invertNodeReducer(state.colormapTree, action),
    expandNode: (state, action) =>
      expandNodeReducer(state.colormapTree, action),
    toggleVisibility: (state, action) =>
      toggleVisibilityReducer(state.colormapTree, action),
    setCheckedVisibility: (state, action) =>
      setCheckedVisibilityReducer(state.colormapTree, action),

    expandColorPaletteNode: (state, action) =>
      expandNodeReducer(state.colorPaletteTree, action),

    addColorMap: (state,action: PayloadAction<{ modelName: string;data: { title: string;variableId: string;derivedId: string;stepId: string;sectionId: string; };}>) => {
      const { modelName, data } = action.payload;

      let rootNodes = state.colormapTree.rootIds.map(
        (id) => state.colormapTree.data[id]
      );
      let parent = rootNodes.filter((n) => n.title === modelName);
      function createParent(id: string, modelName: string): Colormap {
        let p = {
          id: id,
          pid: "-1",
          title: modelName,
          state: {
            expanded: true,
            visibility: true,
          },
          children: [],
          type:ColormapType.SYSTEM,
          colormapType: ColormapType.SYSTEM,
          colorPalette: "-1",
          variable: "-1",
          derivedType: "-1",
          step: "-1",
          appliedVariable:"-1",
          appliedStep:"-1",
          appliedDerivedType:"-1",
          section: "-1",
          attributes: {},
          downloadStatus: DownloadStates.NOT_DOWNLOADED,
          size: 10120,
          paletteType: "-1",
          direction: "-1",
          ticPosition: "-1",
          titlePlacement: "0",
          valuePlacement: "1",
          resultMinMax :[0,0],
          isTitleEditable:false,
          valueRange:[0,0],
          paletteRange:[0,0],
          gap: 1,
        };
        return p;
      }
      let parentNode: Colormap;

      if (parent.length >= 1) {
        parentNode = parent[0];
      } else {
        parentNode = createParent(
          (state.colormapSettings.idGenerator++).toString(),
          modelName
        );
        addNodeReducer(state.colormapTree, {
          payload: parentNode,
          type: "colormapSlice/addColorMap/addNodeReducer",
        });
      }

    addNodeReducer(state.colormapTree, {
        payload: <Colormap>{
          id: (state.colormapSettings.idGenerator++).toString(),
          pid: parentNode.id,
          title: data.title,
          attributes: {},
          children: [],
          type:ColormapType.SYSTEM,
          colormapType: ColormapType.SYSTEM,
          colorPalette: "2",
          state: { expanded: true, visibility: true ,checked:false,partiallyChecked:false},
          variable: data.variableId,
          derivedType: data.derivedId,
          section: data.sectionId,
          step: data.stepId,
          appliedVariable:data.variableId,
          appliedStep:data.stepId,
          appliedDerivedType:data.derivedId,
          downloadStatus: DownloadStates.NOT_DOWNLOADED,
        
          size: 1233,
          paletteType: "0",
          direction: "0",
          ticPosition: "2",
          titlePlacement: "0",
          valuePlacement: "1",
          isTitleEditable:false,
          valueRange:[0,0],
          paletteRange:[0,0],
          gap: 1,
        },
        type: "colormapSlice/addColorMap/addNodeReducer",
    });
    },
    updateInitialSelection:(state) => {


      Object.values(state.colormapTree.data).forEach((item)=>{

        if(item.title === "System") {

          state.selectedColorMapId = item.id;
          state.colormapTree.data[item.id].state.checked = true;
        }
      })
    },
    createColorMap: (state, action: PayloadAction<{nodeId:string,caeSelectionObj:any}>) => {

      const {nodeId ,caeSelectionObj} = action.payload;
      state.colormapSettings.idGenerator += 1;

      const id = state.colormapSettings.idGenerator;

      let systemItem = Object.values(state.colormapTree.data).filter(item => item.title === 'System');

      let newData = JSON.parse(
        JSON.stringify(state.colormapTree.data[systemItem[0].id])
      );

      let newNote = { ...newData };
      newNote.id = `${state.colormapSettings.idGenerator}`;
      newNote.pid = nodeId;
      newNote.type = ColormapType.USER;
      newNote.colormapType = ColormapType.USER;
      // if(newNote.pid === "0"){
      state.colormapSettings.userDefinedCount += 1;
      newNote.title = `Colormap ${state.colormapSettings.userDefinedCount}`;
      newNote.downloadStatus = DownloadStates.NOT_DOWNLOADED;
      newNote.size = 12312300;
      newNote.state = { expanded: false, visibility: true ,checked:false};
      newNote.variable = caeSelectionObj.variableId;
      newNote.step = caeSelectionObj.stepId;
      newNote.derivedType = caeSelectionObj.derivedTypeId;
      newNote.appliedVariable = caeSelectionObj.variableId;
      newNote.appliedStep = caeSelectionObj.stepId;
      newNote.appliedDerivedType = caeSelectionObj.derivedTypeId;
      newNote.isTitleEditable = newNote.isTitleEditable;
      newNote.valueRange =[0,0];
      newNote.paletteRange = [0,0];
      
      // }
      // else{
      //     state.colormapSettings.headCount +=1;
      //     newNote.title = `Colormap ${state.colormapSettings.headCount}`;
      // }

      state.colormapTree.data[`${id}`] = newNote;
      state.colormapTree.data[nodeId].children.push(newNote.id);
      // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
      saveTreeReducer(state.colormapTree, {
        payload: {
          tree: state.colormapTree.data,
          rootIds: state.colormapTree.rootIds,
        },
        type: "colormap/addColormap",
      });
    },
    setApplyItem: (state, action: PayloadAction<any>) => {
      state.legendList.forEach((item) => {
        if (item.id === action.payload) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        // Apply selected item
        if (item.selected === true) {
          item.applied = true;
          item.selected = false; //
        } else {
          item.applied = false;
        }
      });
    },
    setShowAxis: (state, action: PayloadAction<boolean>) => {
      state.showAxis = action.payload;
    },
    updateState: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      if (payload.legendList) state.legendList = payload.legendList;
      state.showAxis = payload.showAxis ?? false;
    },
    setColorMapSelection: (state, action: PayloadAction<string>) => {
      state.selectedColorMapId = action.payload;
      // if (state.selectedColorMapId === action.payload)
      //   state.selectedColorMapId = "-1";
      // else state.selectedColorMapId = action.payload;
    },
    deleteColorMap: (state, action: PayloadAction<string>) => {
      //state.selectedColorMapId = "-1";
      delete state.colormapTree.data[action.payload];
      Object.keys(state.colormapTree.data).forEach((key) => {
        state.colormapTree.data[key].children = state.colormapTree.data[
          key
        ].children.filter((item) => item !== action.payload);
      });
    },
    pasteColormap: (state, action: PayloadAction<Colormap>) => {
      let copiedColormapData = JSON.parse(JSON.stringify(action.payload));
      state.colormapSettings.idGenerator += 1;
      state.colormapSettings.userDefinedCount += 1;

      copiedColormapData.id = String(state.colormapSettings.idGenerator);
      copiedColormapData.title = `Colormap ${state.colormapSettings.userDefinedCount}`;
      copiedColormapData.type = ColormapType.USER;
      copiedColormapData.colormapType = ColormapType.USER;

      copiedColormapData.downloadStatus = DownloadStates.NOT_DOWNLOADED;
      copiedColormapData.size = 78731230;

      state.colormapTree.data[`${state.colormapSettings.idGenerator}`] =
        JSON.parse(JSON.stringify(copiedColormapData));
      state.colormapTree.data[copiedColormapData.pid].children.push(
        copiedColormapData.id
      );
    },
    applyColorMap: (state, action: PayloadAction<string>) => {
      state.appliedColorMapId = action.payload;
      if(action.payload !== '-1')
      state.colormapSettings.defaultParameters.downloadStatus= DownloadStates.DOWNLOADED;
    
     },
    createPalette: (state) => {
      state.colorPaletteSettings.idGenerator += 1;
      state.colorPaletteSettings.counter += 1;
      const newPalette = {
        id: `${state.colorPaletteSettings.idGenerator}`,
        pid: "1",
        title: `User defined ${state.colorPaletteSettings.counter}`,
        children: [],
        state: {
          expanded: true,
          visibility: true,
        },
        type: ColormapType.USER,
        colormapType: ColormapType.USER,
        colorSet: [
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
          { id: 1, color: { r: 0, g: 255, b: 0, a: 255 } },
          { id: 2, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        noResultColor:[
          { id: 0, color: { r: 211, g: 211, b: 211, a: 255 } },
        ],
        aboveMaxColor:[
          { id: 0, color: { r: 255, g: 0, b: 0, a: 255 } },
        ],
        belowMinColor:[
          { id: 0, color: { r: 0, g: 0, b: 255, a: 255 } },
        ],
        valueSet: ["+Infinity", "Auto", "Auto","-Infinity"],
        valueNature: ValueNature.MAXMIN,
        valueType: ValueType.LINEAR,
        attributes: {},
        isTitleEditable:false
      };

      state.colorPaletteTree.data[`${state.colorPaletteSettings.idGenerator}`] =
        newPalette;
      state.colorPaletteTree.data["1"].children.push(newPalette.id);

    saveTreeReducer(state.colorPaletteTree, {
        payload: {
          tree: state.colorPaletteTree.data,
          rootIds: state.colorPaletteTree.rootIds,
        },
        type: "colormap/addColorPalette",
    });
    },
    setSelectedColorPalette: (state, action: PayloadAction<string>) => {
          state.selectedColorPaletteId = action.payload;
    },
    setColorPalette: (
      state,
      action: PayloadAction<{ colorMapId: string; colorPaletteId: string }>
    ) => {
      state.colormapTree.data[action.payload.colorMapId].colorPalette =
        action.payload.colorPaletteId;
    },
    editColorPalette: (
      state,
      action: PayloadAction<{
        colorPaletteId: string;
        colorData: any[];
        noResultColorData: any[];
        aboveMaxColorData: any[];
        belowMinColorData :any[];
        valueData: string[];
      }>
    ) => {
      state.colorPaletteTree.data[action.payload.colorPaletteId].colorSet =
        action.payload.colorData;
        state.colorPaletteTree.data[action.payload.colorPaletteId].noResultColor =
        action.payload.noResultColorData;
        state.colorPaletteTree.data[action.payload.colorPaletteId].aboveMaxColor =
        action.payload.aboveMaxColorData;
        state.colorPaletteTree.data[action.payload.colorPaletteId].belowMinColor =
        action.payload.belowMinColorData;
      state.colorPaletteTree.data[action.payload.colorPaletteId].valueSet =
        action.payload.valueData;
    },
    editPaletteNature: (
      state,
      action: PayloadAction<{
        colorPaletteId: string;
        newValueNature: ValueNature;
      }>
    ) => {

      let newValueSet = [];
        const lengthOfData =
          state.colorPaletteTree.data[action.payload.colorPaletteId].colorSet
            .length;
      if (action.payload.newValueNature === ValueNature.MAXMIN) {
        for (let i = 0; i <= lengthOfData; i++) {
          
          if(i===0)
          {
            newValueSet.push("+infinity")
          }
          else if( i === lengthOfData)
          {
            newValueSet.push("-infinity")
          }
          else{
            newValueSet.push("Auto");
          }
        }
      }

      if (action.payload.newValueNature === ValueNature.SINGLE) {
        for (let i = 0; i < lengthOfData; i++) {
          if(i===0)
          {
            newValueSet.push("+infinity")
          }
          else if( i === lengthOfData-1)
          {
            newValueSet.push("-infinity")
          }
          else{
            newValueSet.push("Auto");
          }
        }
      }
      state.colorPaletteTree.data[action.payload.colorPaletteId].valueSet =
          newValueSet;
    },
    editColorPaletteNature: (
      state,
      action: PayloadAction<{
        colorPaletteId: string;
        newValueNature: ValueNature;
      }>
    ) => {
      const currentPaletteNature =
        state.colorPaletteTree.data[action.payload.colorPaletteId].valueNature;

      if (currentPaletteNature !== action.payload.newValueNature) {
        state.colorPaletteTree.data[action.payload.colorPaletteId].valueNature =
          action.payload.newValueNature;

        // state.colorPaletteTree.data[action.payload.colorPaletteId].valueSet
        let newValueSet = [];
        const lengthOfData =
          state.colorPaletteTree.data[action.payload.colorPaletteId].colorSet
            .length;
        if (action.payload.newValueNature === ValueNature.MAXMIN) {
          for (let i = 0; i <= lengthOfData; i++) {
            newValueSet.push("Auto");
          }
        }

        if (action.payload.newValueNature === ValueNature.SINGLE) {
          for (let i = 0; i < lengthOfData; i++) {
            newValueSet.push("Auto");
          }
        }

        state.colorPaletteTree.data[action.payload.colorPaletteId].valueSet =
          newValueSet;
      }
    },
    deleteColorPalette: (state, action: PayloadAction<string>) => {
      state.selectedColorPaletteId = "-1";
      delete state.colorPaletteTree.data[action.payload];
      Object.keys(state.colorPaletteTree.data).forEach((key) => {
        state.colorPaletteTree.data[key].children = state.colorPaletteTree.data[
          key
        ].children.filter((item) => item !== action.payload);
      });
    },

    setDownloadStatus: (state, action:PayloadAction<DownloadStates>) => {
   state.colormapSettings.defaultParameters.downloadStatus=action.payload
      if(state.colormapSettings.defaultParameters.downloadStatus === DownloadStates.DOWNLOADED)
      {
         state.btndisable=true;  
      }      else{
        state.btndisable=false;
      }
   },
    pasteColorPalette: (state, action: PayloadAction<ColorPalette>) => {
      let copiedColorPaletteData = JSON.parse(JSON.stringify(action.payload));
      var text: string;
      let copycount = 0;
      state.colorPaletteSettings.idGenerator += 1;

      copiedColorPaletteData.id = String(
        state.colorPaletteSettings.idGenerator
      );

      text = copiedColorPaletteData.title + 'Copy'

      Object.values(state.colorPaletteTree.data).map((item) => {

        Object.values(state.colorPaletteTree.data).forEach((elemettext) => {

          if (elemettext.title.includes(text))
            copycount++;
          {
            if (copycount == 0) {
              text = copiedColorPaletteData.title + ` Copy`

            }
            else {
              text = copiedColorPaletteData.title + ` Copy (${copycount}) `
            }
          }
        

        })

      });

      copiedColorPaletteData.title = text;
      copiedColorPaletteData.type = ColormapType.USER;


      copiedColorPaletteData.pid = "1";

      state.colorPaletteTree.data[`${state.colorPaletteSettings.idGenerator}`] =
        copiedColorPaletteData;
      state.colorPaletteTree.data["1"].children.push(copiedColorPaletteData.id);
    },
    setSelectedVariable: (
      state,
      action: PayloadAction<{ colorMapId: string; variableId: string }>
    ) => {
      state.colormapTree.data[action.payload.colorMapId].variable =
        action.payload.variableId;
    },
    setSelectedDerivedType: (
      state,
      action: PayloadAction<{ colorMapId: string; derivedTypeId: string }>
    ) => {
      state.colormapTree.data[action.payload.colorMapId].derivedType =
        action.payload.derivedTypeId;
    },
    setSelectedSection: (
      state,
      action: PayloadAction<{ colorMapId: string; sectionId: string }>
    ) => {
      state.colormapTree.data[action.payload.colorMapId].section =
        action.payload.sectionId;
    },
    setSelectedStep: (
      state,
      action: PayloadAction<{ colorMapId: string; stepId: string }>
    ) => {
      state.colormapTree.data[action.payload.colorMapId].step =
        action.payload.stepId;
    },
    setLegendSettings: (
      state,
      action: PayloadAction<{
        colorMapId: string;
        newPaletteType: string;
        newDirection: string;
        newTicPosition: string;
        newTitlePlacement: string;
        newValuePlacement: string;
        newGap: number;
      }>
    ) => {
      state.colormapTree.data[action.payload.colorMapId].paletteType =
        action.payload.newPaletteType;
      state.colormapTree.data[action.payload.colorMapId].direction =
        action.payload.newDirection;
      state.colormapTree.data[action.payload.colorMapId].ticPosition =
        action.payload.newTicPosition;
      state.colormapTree.data[action.payload.colorMapId].titlePlacement =
        action.payload.newTitlePlacement;
      state.colormapTree.data[action.payload.colorMapId].valuePlacement =
        action.payload.newValuePlacement;
      state.colormapTree.data[action.payload.colorMapId].gap =
        action.payload.newGap;
    },
    setSelectedValue: (
      state,
      action: PayloadAction<{ colorPaletteId: string; updatedValueSet: any[] }>
    ) => {
      let newData = [...action.payload.updatedValueSet];

      newData.forEach((item, index) => {
        if (item === "") newData[index] = "Auto";

        if (typeof item === "number")
          newData[index] = String(item) === "NaN" ? "Auto" : String(item);
      });

      state.colorPaletteTree.data[action.payload.colorPaletteId].valueSet =
        newData;
    },
    setSelectedValueType: (
      state,
      action: PayloadAction<{
        colorPaletteId: string;
        updatedValueType: ValueType;
      }>
    ) => {
      state.colorPaletteTree.data[action.payload.colorPaletteId].valueType =
        action.payload.updatedValueType;
    },
    setActiveColorPaletteValueNature:(
      state,
      action: PayloadAction<{
        colorPaletteId: string;
        valueNature: number;
      }>
    ) => {
      state.colorPaletteTree.data[action.payload.colorPaletteId].valueNature =
      action.payload.valueNature
    },
    updateColorMapCaeSelection:(state,action: PayloadAction<{Data:any,caeData:any,selectedColorMapId:string}>)=> {
state.btndisable=false
    const {Data,selectedColorMapId,caeData} = action.payload;
    let selectedVariable = state.colormapTree.data[selectedColorMapId].variable;
    let selectedVariableType:string = '';
    let derivedTypeNotMatched:string = '';
//  Updating DerivedType start
    Object.values(caeData.variables).forEach((item:any)=> { 
      if(item.id === selectedVariable) {
        selectedVariableType = item.type ;
      }
    })

    Object.values(caeData.variableTypes).forEach((item:any)=> { 
      if(item.id === selectedVariableType) {
          if(item.defaultDerived !== "") {
            //state.colormapTree.data[selectedColorMapId].derivedType = item.defaultDerived;
          }
          else {
            derivedTypeNotMatched = item.defaultDerived[0];
          }

      }
    })

    if(derivedTypeNotMatched) {

      Object.values(Data).forEach((item:any)=> { 
        let generator = item.id.split(":")[1];
        if(generator === selectedVariable) {
          //state.colormapTree.data[selectedColorMapId].derivedType = item.generator;
        }
      })


    }
//  Updating DerivedType end

//  Updating Steps start
    


    },
    setResultMinMax : (state, action : PayloadAction<{minmax: [number, number]}>) =>{
      let initialValues:[number,number] = [0,0];
      let paletteRange = state.colormapTree.data[state.selectedColorMapId].paletteRange;
      state.resultMinMax = action.payload.minmax;
      if(JSON.stringify(paletteRange) === JSON.stringify(initialValues)) {
        state.colormapTree.data[state.selectedColorMapId].valueRange =  action.payload.minmax;
        state.colormapTree.data[state.selectedColorMapId].paletteRange =  action.payload.minmax;
      }
    },
    setPaletteValueAndUserRange:(state, action : PayloadAction<{minmax: [number, number]}>) =>{
        state.colormapTree.data[state.selectedColorMapId].valueRange =  action.payload.minmax;
        state.colormapTree.data[state.selectedColorMapId].paletteRange =  action.payload.minmax;
    },
    updateAllState : (state , action)=> {

      const {
        colormapTree,
        colormapSettings,
        colorPaletteTree,
        colorPaletteSettings,
        selectedColorMapId,
        appliedColorMapId,
        selectedColorPaletteId,
        showAxis,
        legendTitle,
        paletteType,
        direction,
        ticPosition,
        titlePlacement,
        valuePlacement,
        legendList,
        resultMinMax,
        isCAEDataChange,
        isLegendEnable,
        isColorSetValueChanged

      } = action.payload;

      state.colormapTree = colormapTree;
      state.colormapSettings = colormapSettings;
      state.colorPaletteTree = colorPaletteTree;
      state.appliedColorMapId = appliedColorMapId;
      state.selectedColorPaletteId = selectedColorPaletteId;
      state.showAxis = showAxis;
      state.legendTitle = legendTitle;
      state.paletteType = paletteType;
      state.direction = direction;
      state.ticPosition = ticPosition;
      state.titlePlacement = titlePlacement;
      state.valuePlacement = valuePlacement;
      state.legendList = legendList;
      //state.resultMinMax = resultMinMax;
      state.isCAEDataChange = isCAEDataChange;
      state.isLegendEnable = isLegendEnable;
      state.isColorSetValueChanged = isColorSetValueChanged
      state.selectedColorMapId = selectedColorMapId;
      state.colorPaletteSettings = colorPaletteSettings
    },
    setCAEDataChange:(state ,action)=>{

      state.isCAEDataChange = action.payload;
    },
    setLegendEnabled:(state,action)=>{
      state.isLegendEnable = action.payload;
    },
    setIsColorSetValueChanged:(state,action)=>{
      state.isColorSetValueChanged = action.payload;
    },
    setIsTitleEditable:(state,action:PayloadAction<{colorMapId:string,isEditable:boolean}>)=> {
      const {colorMapId,isEditable} = action.payload;
      state.colormapTree.data[colorMapId].isTitleEditable = isEditable;
    },
    setNewTitle:(state,action:PayloadAction<{colorMapId:string,newTitle:string}>)=>{
      const {colorMapId,newTitle} = action.payload;
      state.colormapTree.data[colorMapId].title = newTitle;

    },
    setIsColorPaletteTitleEditable:(state,action:PayloadAction<{nodeId:string,isEditable:boolean}>)=> {
      const {nodeId,isEditable} = action.payload;
      state.colorPaletteTree.data[nodeId].isTitleEditable = isEditable;
    },
    setColorPaletteNewTitle:(state,action:PayloadAction<{nodeId:string,newTitle:string}>)=>{ 
      const {nodeId,newTitle} = action.payload;
      state.colorPaletteTree.data[nodeId].title = newTitle;

    },
    resetCAEdata:(state,action:PayloadAction<string>)=>{
      const selectedColorMapId = action.payload;
      state.colormapTree.data[selectedColorMapId].variable= state.colormapTree.data[selectedColorMapId].appliedVariable;
      state.colormapTree.data[selectedColorMapId].step = state.colormapTree.data[selectedColorMapId].appliedStep;
      state.colormapTree.data[selectedColorMapId].derivedType = state.colormapTree.data[selectedColorMapId].appliedDerivedType;
 
 

    },
    setAppliedCAEData:(state,action:PayloadAction<string>) =>{
      const selectedColorMapId = action.payload;
      state.colormapTree.data[selectedColorMapId].appliedVariable = state.colormapTree.data[selectedColorMapId].variable;
      state.colormapTree.data[selectedColorMapId].appliedStep = state.colormapTree.data[selectedColorMapId].step;
      state.colormapTree.data[selectedColorMapId].appliedDerivedType = state.colormapTree.data[selectedColorMapId].derivedType;
    },
    circularProgessStatusChange: (state,action:PayloadAction<boolean>) => {
      state.circularProgressStatus = action.payload;
    },

    setBtnDisablle:(state,action:PayloadAction<boolean>)=>{
      state.btndisable=action.payload
    },
    setPaletteRange:(state,action:PayloadAction<{values:[number,number],colorMapId:string}>)=>{
      const {values,colorMapId} = action.payload;
      state.colormapTree.data[colorMapId].paletteRange = values;

    },
    resetPaletteRange:(state,action:PayloadAction<{values:[number,number],colorMapId:string}>)=>{
      const {values,colorMapId} = action.payload;
      state.colormapTree.data[colorMapId].paletteRange = values;
    },
    // update title placement list based on selection
    updateLegendTitlePlacement:(state,action:PayloadAction<string>)=>{
     
       if(parseInt(action.payload) === LegendDirection.VERTICAL) {
          state.titlePlacement.forEach((item)=>{
             if(item.position === LegendTitlePlacement.BOTTOM || item.position === LegendTitlePlacement.TOP) {
               item.disable = false;
             }else{
              item.disable = true;
             }
          })
       }
       else if(parseInt(action.payload) === LegendDirection.HORIZONTAL){
          state.titlePlacement.forEach((item)=>{
            if(item.position === LegendTitlePlacement.BOTTOM || item.position === LegendTitlePlacement.TOP) {
              item.disable = true;
            }else{
            item.disable = false;
            }
        })
       }

    },
    // update value placement list based on selection
    updateLegendValuePlacement:(state,action:PayloadAction<string>)=>{
     
      if(parseInt(action.payload) === LegendDirection.VERTICAL) {
         state.valuePlacement.forEach((item)=>{
            if(item.position === LegendValuePlacement.RIGHT || item.position === LegendValuePlacement.LEFT) {
              item.disable = false;
            }else if(item.position === LegendValuePlacement.ALTERNATING){
             item.disable = false;
            }else{
              item.disable = true;
            }
         })
      }
      else if(parseInt(action.payload) === LegendDirection.HORIZONTAL){
         state.valuePlacement.forEach((item)=>{
           if(item.position === LegendValuePlacement.RIGHT || item.position === LegendValuePlacement.LEFT) {
             item.disable = true;
           }else if(item.position === LegendValuePlacement.ALTERNATING){
            item.disable = false;
           }else{
             item.disable = false;
           }
       })
      }

   }
  },
});

export default colormapSlice.reducer;
export const {
  addColorMap,
  saveTree,
  checkNode,
  checkNodeColorPalette,
  highlightNode,
  invertNode,
  expandNode,
  toggleVisibility,
  setCheckedVisibility,
  createColorMap,
  setApplyItem,
  setShowAxis,
  deleteColorMap,
  applyColorMap,
  pasteColormap,
  setColorMapSelection,
  expandColorPaletteNode,
  createPalette,
  setColorPalette,
  setSelectedColorPalette,
  deleteColorPalette,
  pasteColorPalette,
  setSelectedVariable,
  setSelectedDerivedType,
  setSelectedSection,
  setSelectedStep,
  editColorPalette,
  setSelectedValue,
  setSelectedValueType,
  editColorPaletteNature,
  editPaletteNature,
  setLegendSettings,
  updateColorMapCaeSelection,
  updateInitialSelection,
  setActiveColorPaletteValueNature,
  setResultMinMax,
  updateAllState,
  setCAEDataChange,
  setLegendEnabled,
  setIsColorSetValueChanged,
  setIsTitleEditable,
  setIsColorPaletteTitleEditable,
  setNewTitle,
  setColorPaletteNewTitle,
  resetCAEdata,
  setAppliedCAEData,
  circularProgessStatusChange,
  setDownloadStatus,
  setBtnDisablle,
  setPaletteRange,
  resetPaletteRange,
  setPaletteValueAndUserRange,
  updateLegendTitlePlacement,
  updateLegendValuePlacement
} = colormapSlice.actions;

//Selectors

export const selectColormapRootIds = (state: RootState) =>
  state.colormap.colormapTree.rootIds;
export const selectcolormapData = (state: RootState) =>
  state.colormap.colormapTree.data;
export const selectlegendList = (state: RootState) => state.colormap.legendList;
export const selectShowAxis = (state: RootState) => state.colormap.showAxis;
export const selectColorPaletteData = (state: RootState) =>
  state.colormap.colorPaletteTree.data;
export const selectColorPaletteRootIds = (state: RootState) =>
  state.colormap.colorPaletteTree.rootIds;

export const paletteTypeDataList = (state: RootState) =>
  state.colormap.paletteType;
export const directionDataList = (state: RootState) => state.colormap.direction;
export const ticPositionDataList = (state: RootState) =>
  state.colormap.ticPosition;
export const titlePlacementDataList = (state: RootState) =>
  state.colormap.titlePlacement;
export const valuePlacementDataList = (state: RootState) =>
  state.colormap.valuePlacement;

export const selectedColormapID = (state: RootState) =>
  state.colormap.selectedColorMapId;

export const selectLegendTitle = (state: RootState) =>
  state.colormap.legendTitle;

// export const selectVariableData = (state: RootState) => state.colormap.variableTree.data;
// export const selectVariableRootIds = (state : RootState) => state.colormap.variableTree.rootIds;

export const selectedColorPaletteId = (state: RootState) =>
  state.colormap.selectedColorPaletteId;

export const colormapElements = (state: RootState) => {
  let array: any[] = [];
  Object.keys(state.colormap.colormapTree.data).forEach((key) => {
    let node = state.colormap.colormapTree.data[key];
    array.push({
      id: node.id,
      name: node.title,
      pid: node.pid,
      children: node.children,
    });
  });

  return array;
};

export const colorPaletteElements = (state: RootState) => {
  let array: any[] = [];
  Object.keys(state.colormap.colorPaletteTree.data).forEach((key) => {
    if (state.colormap.colorPaletteTree.data[key].pid !== "-1")
      array.push({
        id: key,
        name: state.colormap.colorPaletteTree.data[key].title,
      });
  });

  return array;
};

// export const selectedLength = (state:RootState) => {
//     const array : string[] = [];
//      Object.keys(state.measurements.data).forEach(key => {
//         if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
//             array.push(key)
//      })

//      return (array.length);
// }

// export const selectedMeasurement = (state: RootState) => {
//     let node;
//     const length = selectedLength(state);

//     if(length === 1){
//     Object.keys(state.measurements.data).forEach(key => {
//         if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
//             node = state.measurements.data[key]
//      })
//     }
//     return(node);
// }

export const selectCheckedNodeForALLLabelType = (state: RootState) => {
  let checkedAllLabelNodesID: any[] = [];

  Object.keys(state.colormap.colormapTree.data).forEach((key) => {
    if (
      state.colormap.colormapTree.data[key].state.checked === true &&
      state.colormap.colormapTree.data[key].state.partiallyChecked === false
    ) {
      checkedAllLabelNodesID.push(state.colormap.colormapTree.data[key].id);
    } else {
      state.colormap.colormapTree.data[key].children.forEach((childID) => {
        if (state.colormap.colormapTree.data[childID].state.checked === true) {
          checkedAllLabelNodesID.push(childID);
        }
      });
    }
  });

  return checkedAllLabelNodesID;
};

export const singleCheckedNodeId = (state: RootState) => {
  let checkedNodeID: any[] = [];
  let checkednode = "7";
  for (var key in state.colormap.colormapTree.data) {
    // if (state.colormap.colormapTree.data[key].state.hasOwnProperty("checked")) {
    if (
      state.colormap.colormapTree.data[key].state.checked === true &&
      state.colormap.colormapTree.data[key].state.partiallyChecked === false
    ) {
      checkedNodeID.push(key);
    }
    // }
  }
  let parentNodes: any[] = [];
  for (var key in state.colormap.colormapTree.data) {
    if (
      state.colormap.colormapTree.data[key].state.checked === true &&
      state.colormap.colormapTree.data[key].children.length > 0
    ) {
      parentNodes.push(key);
    }
  }
  if (parentNodes && checkedNodeID) {
    checkedNodeID = checkedNodeID.filter((el) => !parentNodes.includes(el));
  }

  if (checkedNodeID.length === 1) {
    checkednode = String(checkedNodeID[0]);
  } else {
    checkednode = "-1";
  }
  return checkednode;
};

export const CheckedNodeIds = (state: RootState) => {
  let checkedNodeIDs: any[] = [];
  for (var key in state.colormap.colormapTree.data) {
    // if (state.colormap.colormapTree.data[key].state.hasOwnProperty("checked")) {
    if (
      state.colormap.colormapTree.data[key].state.checked === true &&
      state.colormap.colormapTree.data[key].state.partiallyChecked === false
    ) {
      checkedNodeIDs.push(key);
    }
    // }
  }
  let parentNodes: any[] = [];
  for (var key in state.colormap.colormapTree.data) {
    if (
      state.colormap.colormapTree.data[key].state.checked === true &&
      state.colormap.colormapTree.data[key].children.length > 0
    ) {
      parentNodes.push(key);
    }
  }
  if (parentNodes && checkedNodeIDs) {
    checkedNodeIDs = checkedNodeIDs.filter((el) => !parentNodes.includes(el));
    return checkedNodeIDs;
  }
};

export const CheckedColorPalette = (state: RootState) => {
  let checkedNodeID: any[] = [];
  let checkednode = "7";
  for (var key in state.colormap.colorPaletteTree.data) {
    // if (state.colormap.colormapTree.data[key].state.hasOwnProperty("checked")) {
    if (
      state.colormap.colorPaletteTree.data[key].state.checked === true &&
      state.colormap.colorPaletteTree.data[key].state.partiallyChecked === false
    ) {
      checkedNodeID.push(key);
    }
    // }
  }
  let parentNodes: any[] = [];
  for (var key in state.colormap.colorPaletteTree.data) {
    if (
      (state.colormap.colorPaletteTree.data[key].state.checked === true &&
        state.colormap.colorPaletteTree.data[key].children.length > 0) ||
      state.colormap.colorPaletteTree.data[key].title === "User Defined"
    ) {
      parentNodes.push(key);
    }
  }
  if (parentNodes && checkedNodeID) {
    checkedNodeID = checkedNodeID.filter((el) => !parentNodes.includes(el));
  }

  if (checkedNodeID.length === 1) {
    checkednode = String(checkedNodeID[0]);
  } else {
    checkednode = "-1";
  }

  return checkednode;
};

export const CheckedColorPaletteIds = (state: RootState) => {
  let checkedNodeIDs: any[] = [];
  for (var key in state.colormap.colorPaletteTree.data) {
    // if (state.colormap.colormapTree.data[key].state.hasOwnProperty("checked")) {
    if (
      state.colormap.colorPaletteTree.data[key].state.checked === true &&
      state.colormap.colorPaletteTree.data[key].state.partiallyChecked === false
    ) {
      checkedNodeIDs.push(key);
    }
    // }
  }
  let parentNodes: any[] = [];
  for (var key in state.colormap.colorPaletteTree.data) {
    if (
      (state.colormap.colorPaletteTree.data[key].state.checked === true &&
        state.colormap.colorPaletteTree.data[key].children.length > 0) ||
      state.colormap.colorPaletteTree.data[key].title === "User Defined"
    ) {
      parentNodes.push(key);
    }
  }
  // parentNodes.push("1");
  if (parentNodes && checkedNodeIDs) {
    checkedNodeIDs = checkedNodeIDs.filter((el) => !parentNodes.includes(el));
    return checkedNodeIDs;
  }
};

export const selectResultMinMax = (state: RootState) => {
  return state.colormap.resultMinMax;
};

export const selectCAEDataChange =(state:RootState)=> {
  return state.colormap.isCAEDataChange;

}

export const selectLegendEnabled = (state:RootState)=> {

  return state.colormap.isLegendEnable;
}

export const selectIsColorSetValueChanged = (state:RootState)=>{
  return state.colormap.isColorSetValueChanged;
}

export const circularProgressStatus = (state:RootState)=>{
  return state.colormap.circularProgressStatus;
}
export const selectdownloadedStatus = (state:RootState)=>{
  return state.colormap.colormapSettings.defaultParameters.downloadStatus
}
export const selectBtnDisable = (state:RootState) => state.colormap.btndisable;

export const selectValueRange = (state:RootState) => {
   return state.colormap.colormapTree.data[state.colormap.selectedColorMapId].valueRange;
}

export const selectPaletteRange = (state:RootState) =>{
  return state.colormap.colormapTree.data[state.colormap.appliedColorMapId].paletteRange;
}