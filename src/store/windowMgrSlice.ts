import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { stringify } from "querystring";
import type { RootState } from "./index";
import store from "../store";

import labelPositioner from "../services/arrangeLabelAlgorithms/index";
import { getViewerSize } from '../backend/viewerAPIProxy';
import { undoStack } from "../components/utils/undoStack";
import { setLabelPos,setpopoutLabelBorder} from "store/sideBar/labelSlice/AllLabelSlice";
import { batch } from 'react-redux';
import { labelData, anchorData, viewport, opts } from '../services/arrangeLabelAlgorithms/types';

export enum Layers {
  BACKGROUND = "BACKGROUND",
  VIEWER = "VIEWER",
  BACK = "BACK",
  FRONT = "FRONT",
}
export type WindowState = {
  id: string;
  zOrder: number;
  isEditMode: boolean;
  isHidden: boolean;
  pos: [number, number];
  anchor: [number, number];
  size: [number, number];
};

export type WindowMgrState = {
  windows: { [id: string]: WindowState };
  windowsCount: number;
  isEnabled: boolean;
  activeLayers: { [key in keyof typeof Layers]: boolean };
};

const initialState = {
  isEnabled: false,
  windowsCount: 0,
  windows: {},
  activeLayers: {
    VIEWER: true,
  },
} as WindowMgrState;

export const setEditMode = createAsyncThunk(
  "windowMgrSlice/setEditMode",
  (data:any,{dispatch,getState}) => {
    let rootState = getState() as RootState;

    if(data.allWindowPopout) {
      dispatch(setWindowEditMode({uid:data.uid,isEdit:data.isEdit}));
      dispatch(setpopoutLabelBorder({id:data.uid,isPopout:data.isEdit}));
    }else {
      dispatch(setWindowEditMode({uid:data.uid,isEdit:data.isEdit}));
      dispatch(setpopoutLabelBorder({id:data.uid,isPopout:data.isEdit}));
    }

  }
)
export const arrangeLabel = createAsyncThunk(
  "windowMgrSlice/arrangeLabel",
   (_: void,{ dispatch, getState}) =>{
      let rootState = getState() as RootState; 
      const windows = rootState.windowMgr.windows;
      const labelData = rootState.label.data;
      let anchor_array: anchorData[] = [];
      let label_array: labelData[] = [];
      let labelProperties: any = {
        width: 100,
        height: 30
      };

      Object.keys(windows).forEach((key : any, index : number) => {
        if(key.includes('probe') || key.includes('Hotspot')){
          let newKey : string  = key.replace("Label2D","");
          if(labelData && labelData[newKey] && labelData[newKey].autoPosition === true) {
            let anchorX  = windows[key].anchor[0];
            let anchorY  = windows[key].anchor[1];
            /*
            if(labelData[newKey].anchor){
              anchorX =   labelData[newKey].anchor?.[0]??0;
              anchorY = labelData[newKey].anchor?.[1]??0;
            }
            */
  
            anchor_array.push({
              id : key,
              x : anchorX,
              y : anchorY,
            })
  
            label_array.push({
              id: key,
              x: windows[key].pos[0],
              y: windows[key].pos[1],
              width : windows[key].size[0],
              height: windows[key].size[1]
            });
          }
        }
      });
      const canvasSize = getViewerSize(rootState?.app?.viewers[rootState?.app?.activeViewer || '']);
      
      let viewport: viewport = {
        width: canvasSize[0],
        height: canvasSize[1]
      };

      let simAnnOptions = {
        algorithm: 'simulated_annealing',
        data: {
          nsweeps: 1000
        }
      }

      let forceBasedOptions = {
        algorithm: 'force_based',
        data: {
          strength: 5,
          forcecenter: false,
          forcemanybody: true,
          forcex: true,
          forcey: true,
          forcecollide: true,
          forceclamp: true,
        }
      }

      let options: opts = simAnnOptions;

      const newPosObj = labelPositioner(options, viewport, label_array, labelProperties, anchor_array, { anchorRadius: 50 });
      

      //exportData(viewport, label_array, labelProperties, anchor_array);
      batch(() => {
        newPosObj.forEach(item => {
          dispatch(setWindowPos({ uid : item.id , pos : [ item.x , item.y ]}));
          dispatch(setLabelPos({ id : item.id.replace("Label2D", ""), pos : [ item.x , item.y ]}));          
        });  
      });
  }
);

let textFile : any = null;
const makeTextFile  =  function(text : any) {
  var data = new Blob([text], {type: 'json/plain'});

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  // returns a URL you can use as a href
  return textFile;
};
const exportData  = function(viewport: any, labelProperties: any, label_array: any[], anchor_array: any[]) {
  var data = {
    viewport: viewport,
    labelProperties: labelProperties,
    label_array: label_array,
    anchor_array: anchor_array
  };

  var link = document.createElement('a');
    link.setAttribute('download', 'data.json');
    link.href = makeTextFile(JSON.stringify(data));
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
};


export const windowMgrSlice = createSlice({
  name: "windowMgr",
  initialState,
  reducers: {
    addWindow: (state, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      if (state.windows[uid] !== undefined) {
        throw new Error("The provided window id in not unique");
      }
      state.windows[uid] = {
        id: uid,
        pos: [-1, -1],
        anchor: [0, 0],
        size: [300, 300],
        isEditMode: false,
        isHidden: false,
        zOrder: 0,
      };
      state.windowsCount = state.windowsCount + 1;
    },
    removeWindow: (state, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      if (state.windows[uid]) {
          delete state.windows[uid];
          state.windowsCount = state.windowsCount - 1;
      } 
        /*else {
          throw new Error("The provided window id does not exist");
        }*/
    },
    setWindowEditMode: (
      state,
      action: PayloadAction<{ uid: string; isEdit: boolean }>
    ) => {
      const { uid, isEdit } = action.payload;
      if (state.windows[uid] !== undefined) {
        state.windows[uid].isEditMode = isEdit;
        let selectedWindow = state.windows[uid];
        if (isEdit === true) {
          selectedWindow.zOrder = 1;
        } else {
          selectedWindow.zOrder = 0;
        }
      } else {
        console.warn("Invalid window uid");
      }
    },
    setHiddenState: (state,action: PayloadAction<{ uid: string; isHidden: boolean }>) => {
      const { uid, isHidden } = action.payload;
      if(state && state.windows && uid in state.windows)
        {
        if (state.windows[uid] !== undefined) {
          state.windows[uid].isHidden = isHidden;
        } 
        else {
          console.log("Invalid window uid")
          //throw new Error("Invalid window uid");
        }
      }
    },
    setWindowPos: (
      state,
      action: PayloadAction<{ uid: string; pos: [number, number] }>
    ) => {
      let { uid, pos } = action.payload;
      if (state.windows[uid]) state.windows[uid].pos = pos;
    },
    setWindowAnchor: (
      state,
      action: PayloadAction<{ uid: string; anchor: [number, number] }>
    ) => {
      const { uid, anchor } = action.payload;
      state.windows[uid].anchor = anchor;
    },

    undoWindowSize: (
      state,
      action: PayloadAction<{
        uid: string;
        size: [number, number];
        pos: [number, number];
      }>
    ) => {
      let { uid, size, pos } = action.payload;
      state.windows[uid].size = size;
      state.windows[uid].pos = pos;
    },
    setWindowSize: (
      state,
      action: PayloadAction<{ uid: string; size: [number, number] }>
    ) => {
      let { uid, size } = action.payload;
      state.windows[uid].size = size;
    },

    setWindowPostionHandler: (
      state,
      action: PayloadAction<{
        uid: string;
        anchor: [number, number];
        pos: [number, number];
        undoable?: boolean;
      }>
    ) => {
      const { uid, pos, anchor, undoable } = action.payload;

      const oldPos = JSON.parse(JSON.stringify(state.windows[uid].pos));
      const oldAnchor = JSON.parse(JSON.stringify(state.windows[uid].anchor));

      windowMgrSlice.caseReducers.setWindowAnchor(state, {
        payload: { uid, anchor },
        type: "windowMrgSlice/setWindowAnchor",
      });
      windowMgrSlice.caseReducers.setWindowPos(state, {
        payload: { uid, pos },
        type: "windowMrgSlice/setWindowPos",
      });

      // if (undoable) {
      //   undoStack.add({
      //     undo: {
      //       reducer: setWindowPostionHandler,
      //       payload: { uid, anchor: oldAnchor, pos: oldPos },
      //     },
      //     redo: {
      //       reducer: setWindowPostionHandler,
      //       payload: { uid, anchor, pos },
      //     },
      //   });
      // }
    },

    setWindowSizeHandler: (
      state,
      action: PayloadAction<{
        uid: string;
        size: [number, number];
        pos: [number, number];
        undoable?: boolean;
      }>
    ) => {
      let { uid, size, pos } = action.payload;

      const oldSize = JSON.parse(JSON.stringify(state.windows[uid].size));
      const oldPos = JSON.parse(JSON.stringify(state.windows[uid].pos));

      state.windows[uid].size = size;
      // state.windows[uid].pos = pos;
      windowMgrSlice.caseReducers.setWindowPos(state, {
        payload: { uid, pos },
        type: "windowMrgSlice/setWindowPos",
      });

      // if (action.payload.undoable) {
      //   undoStack.add({
      //     undo: {
      //       reducer: undoWindowSize,
      //       payload: { uid, size: oldSize, pos: oldPos },
      //     },
      //     redo: { reducer: setWindowSizeHandler, payload: { uid, size, pos } },
      //   });
      // }
    },

    setActiveLayers: (state, action: PayloadAction<Layers[]>) => {
      const layers = action.payload;
      let selection: any = {};
      layers.forEach((l) => {
        selection[l] = true;
      });
      if (selection[Layers.VIEWER]) {
        selection = {};
        selection[Layers.VIEWER] = true;
      }
      state.activeLayers = selection;
    },

    updateState: (state, action: PayloadAction<Partial<WindowMgrState>>) => {
      const { payload } = action;
      state.isEnabled = payload.isEnabled ?? false;
      if (payload.activeLayers) state.activeLayers = payload.activeLayers;

      if (payload.windows) {
        Object.values(payload.windows).forEach(item => {  
          state.windows[item.id].isEditMode = false;
        });    
        Object.values(payload.windows).forEach(item => {
          if (item.id in state.windows) 
           state.windows[item.id] = payload.windows[item.id]
        })
      }


      // if (payload.WindowMgrState.windowsCount !== undefined) state.windowsCount = payload.WindowMgrState.windowsCount;
    },
  },
});

export const {
  addWindow,
  removeWindow,
  setHiddenState,
  setWindowPos,
  setWindowEditMode,
  setWindowSize,
  setWindowSizeHandler,
  setWindowPostionHandler,
  setWindowAnchor,
  setActiveLayers,
  undoWindowSize,
  updateState,
} = windowMgrSlice.actions;

export const selectActiveLayers = (state: RootState): Layers[] =>
  Object.keys(state.windowMgr.activeLayers) as Layers[];
  export const selectWindows =(state:RootState) => state.windowMgr.windows;  
export const selectWindowMgr = (state: RootState) => state.windowMgr;
export const selectWindowSize = (state: RootState, id: string) =>
  state.windowMgr.windows[id] ? state.windowMgr.windows[id].size : [-1, -1];
export const selectWindowXY = (state: RootState, id: string) =>
  state.windowMgr.windows[id] ? state.windowMgr.windows[id].pos : [-1, -1];
export const selectWindowAnchor = (state: RootState, id: string) =>
  state.windowMgr.windows[id] ? state.windowMgr.windows[id].anchor : [0, 0];
export default windowMgrSlice.reducer;
