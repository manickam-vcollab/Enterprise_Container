import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { useState } from "react";
import { addNodeReducer, deleteNodeReducer,setCheckedVisibilityReducer,  } from "../shared/Tree/allReducer";
import { checkNodeReducer } from "../shared/Tree/reducers";
// import { addNodeReducer, checkNodeReducer, deleteNodeReducer } from '../shared/Tree/allReducer';
import { IToolBar, ITools, ToolBarType } from "./shared/types";
import nextId from "react-id-generator";
import { undoStack } from "components/utils/undoStack";
import { push } from "connected-react-router/immutable";
import { Routes } from "routes";
import {
  selectCheckedLeafNodes as selectCheckedLeafNodesTree,
  selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree,
  selectAllLeafNodes as selectAllLeafNodesTree,
} from "../shared/Tree/selectors";

interface toolBarSettings {
  defaultParameters: IToolBar;
  count: number;
}

interface defaultToolSetting {
  defaultTools : ITools;
}

export interface InitialState extends IToolBar {
  data: { [id: string]: IToolBar };
  rootIds: string[];
  defaultTools:{ [id: string]: IToolBar };
  toolBarListSettings: toolBarSettings;
  editableNodeId: string;
  selectedToolBarType: number;
  toolBarPositionList: ToolBarPositionList[];
  toolBarOrientationList: ToolBarOrientationList[];
  toolbarElementsList: ToolbarElementsList[];
}

export type ToolBarPositionList = {
  id: any;
  text: string;
  selected: boolean;
  applied: boolean;
};

export type ToolBarOrientationList = {
  id: any;
  text: string;
  selected: boolean;
  applied: boolean;
};

export type ToolbarElementsList = {
  id: any;
  name: string;
  checked: boolean;
  applied: boolean;
  position: any;
  orientation: any;
};

export enum IconNames {
  POPOUT = "POPOUT",
  UNDO = "UNDO",
  REDO  = "REDO", 
  FULLSCREEN = "FULLSCREEN",
  PRESENTATION = "PRESENTATIONS",
  PREVIOUSSLIDE = "PREVIOUS SLIDE",
  NEXTSLIDE = "NEXT SLIDE",
  FITTOSCREEN="FIT VIEW",
  PICKANDMOVE="PICK & MOVE",
  ARRANGELABEL="ARRANGE LABELS",
  RESET='RESET',
  ADDSLIDE='ADD SLIDE',
  UPDATESLIDE='UPDATE SLIDE'

}

const initialState: InitialState = {
  data: {},
  rootIds: [],
  // checkedData:{},
  defaultTools:{
        toolBar_FullScreen:{ 
          id:"toolBar_FullScreen",
          title:"FullScreen",
          children:[],
          selectedTools:['FullScreen'],
          appliedOrientation:'3',
          appliedPosition:'1',
          state:{
            checked:false,
            partiallyChecked: false,
            expanded: true,
            highlighted: false,
            visibility: true,
            selected: false,
          },
          // orientation:1

        },
        toolBar_Presentation:{
          id:'toolBar_Presentation',
          title:'Presentation',
          children:[],
          selectedTools:['Previous Slide', 'Add Slide','Update Slide','Next Slide'],
          appliedOrientation:'3',
          appliedPosition:'1',
          state:{
            checked:false,
            partiallyChecked: false,
            expanded: true,
            highlighted: false,
            visibility: true,
            selected: false,
          },
          // orientation:1
        },
        toolBar_Popout:{
          id:'toolBar_Popout',
          title:'Popout',
          children:[],
          selectedTools:["Popout", "Arrange Labels", "Pick & Move","Reset", "Fit View"],
          appliedOrientation:'3',
          appliedPosition:'1',
          state:{
            checked:false,
            partiallyChecked: false,
            expanded: true,
            highlighted: false,
            visibility: true,
            selected: false,
          },
          // orientation:1
        }
      
      
  },
  toolBarListSettings: {
    defaultParameters: {
      id: "",
      pid: null,
      title: "",
      children: [],
      selectedTools: [],
      appliedOrientation:'3',
      appliedPosition:'1',
      titleText: "",
      toolBarType: ToolBarType.TOOLBAR,
      state: {
        checked: false,
        partiallyChecked: false,
        expanded: true,
        highlighted: false,
        visibility: true,
        selected: false,
      },
      attributes: {},
      // orientation:1
    },

    count: 0,
  },
  editableNodeId: "",
  selectedToolBarType: 0,
  toolBarPositionList: [
    { id: "1", text: "Top Right", selected: false, applied: false },
    { id: "2", text: "Top Left", selected: false, applied: false },
    { id: "3", text: "Top Middle", selected: false, applied: false },
    { id: "4", text: "Bottom Middle", selected: false, applied: false },
    { id: "5", text: "Middle Right", selected: false, applied: false },
    { id: "6", text: "Middle Left", selected: false, applied: false },
    { id: "7", text: "Bottom Left", selected: false, applied: false },
    { id: "8", text: "Bottom Right", selected: false, applied: false },
    { id: "9", text: "Custom", selected: false, applied: false },
  ],
  toolBarOrientationList: [
    { id: "1", text: "Horizontal", selected: false, applied: false },
    { id: "2", text: "Vertical", selected: false, applied: false },
    { id: "3", text: "Auto", selected: false, applied: false },
  ],
  toolbarElementsList: [
    {
      id: "1",
      name: "Top Bar",
      checked: false,
      applied: false,
      position: "2",
      orientation: "1",
    },
    {
      id: "2",
      name: "Full Screen",
      checked: false,
      applied: false,
      position: "2",
      orientation: "2",
    },
    {
      id: "3",
      name: "Presentation",
      checked: false,
      applied: false,
      position: "4",
      orientation: "3",
    },
    {
      id: "4",
      name: "Popout",
      checked: false,
      applied: false,
      position: "2",
      orientation: "3",
    },
  ],
};

export const deleteToolBar = createAsyncThunk(
  "toolBarTreeSlice/deleteToolBar",
  (
    data: { undoable?: boolean; checkedNodes: string[] },
    { dispatch, getState }
  ) => {
    let rootState = getState() as RootState;
    // let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
    let state = rootState.toolBar;
    let keys: string[] = [];
    let dataList: any[] = [];

    let nodesToDelete = data.checkedNodes;

    nodesToDelete.forEach((nodeID) => {
      let ToolBarNode = state.data[nodeID];

      if (ToolBarNode.children.length > 0) {
        ToolBarNode.children.forEach((nodeID) => {
          // deleteAnimationAPI(nodeID,viewerId);
          dispatch(toolBarTreeSlice.actions.deleteTool({ keys: nodeID }));
        });
      }

      // deleteAnimationAPI(nodeID,viewerId);
      dispatch(toolBarTreeSlice.actions.deleteTool({ keys: nodeID }));
    });
  }
);

export const handleToolBarCreate = createAsyncThunk(
  "toolBarTreeSlice/handleLinearCreation",
  (data: { data: any }, { dispatch, getState }) => {
    let idNew = nextId("ToolBar");

    dispatch(createToolBar({ id: idNew, pid: ToolBarType.TOOLBAR }));
    dispatch(push(Routes.TOOLBARITEMS));
    dispatch(setEditableNodeId(idNew));
  }
);
export const setCheckedNodesAsync = createAsyncThunk(
  "toolBarTreeSlice/setCheckedNodesAsync",
  async (
    data: { toCheck: boolean; nodeId: string; undoable?: boolean },
    { dispatch, getState }
  ) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    const { toCheck, nodeId } = data;
    // if (data.undoable) {
    //   undoStack.add({
    //     undo: {
    //       reducer: setCheckedNodesAsync,
    //       payload: {
    //         toCheck: rootState.toolBar.data[nodeId].state.checked,
    //         nodeId,
    //       },
    //     },
    //     redo: {
    //       reducer: setCheckedNodesAsync,
    //       payload: { toCheck: toCheck, nodeId },
    //     },
    //   });
    // }
    // if (nodeId==='Presentation' || nodeId==='FullScreen') {
      if (rootState.toolBar.defaultTools.hasOwnProperty(nodeId)) {
      dispatch(toolBarTreeSlice.actions.checkNode({ ...data }));
      // this.state.first.toolBar.defaultTools[nodeId].state.checked = toCheck
      dispatch(setDefaultsState({tocheck:toCheck,id:nodeId}))

    } else {
      dispatch(toolBarTreeSlice.actions.checkNode({ ...data }));
    }
    
  }
);
export const toolBarTreeSlice = createSlice({
  name: "toolBar",
  initialState: initialState,
  reducers: {
    checkNode: checkNodeReducer,
    setEditableNodeId: (state, action: PayloadAction<any>) => {
      state.editableNodeId = action.payload;
    },
    selectedTools: (
      state,
      action: PayloadAction<{ toolBarId: string; id: any }>
    ) => {
      if (state.data.hasOwnProperty(action.payload.toolBarId)) {
      state.data[action.payload.toolBarId].selectedTools = action.payload.id;
      }
    },
    updateOrientationListItems: (state, action) => {
      state.toolBarOrientationList = action.payload; 
    },
    updateAppliedOrientation:(
        state,
        action: PayloadAction<{ toolBarId: string; id: any }>
      ) => {
        if (state.data.hasOwnProperty(action.payload.toolBarId)) {
          state.data[action.payload.toolBarId].appliedOrientation = action.payload.id;
        } else {
          state.defaultTools[action.payload.toolBarId].appliedOrientation = action.payload.id;
        }
        
      },
      updatePositionListItems: (state, action) => {
        state.toolBarPositionList = action.payload; 
      },
      updateAppliedPosition:(
          state,
          action: PayloadAction<{ toolBarId: string; id: any }>
        ) => {
          if (state.data.hasOwnProperty(action.payload.toolBarId)) {
            state.data[action.payload.toolBarId].appliedPosition = action.payload.id;
          } else {
            state.defaultTools[action.payload.toolBarId].appliedPosition = action.payload.id;
          }
            
        },
    setTextValue:  (state, action: PayloadAction<{ toolbarId: string; newTitle: string }>) => {
      const { toolbarId, newTitle } = action.payload;
      // Find the toolbar with the specified ID and update its title
      const toolbar = state.data[toolbarId];
      if (toolbar) {
        toolbar.title = newTitle;
      }
    },
    setToolbarEditable: (state, action: PayloadAction<{ toolbarId: any, editable: any }>) => {
      const { toolbarId, editable } = action.payload;
      // Find the toolbar by its ID and update the editable property
      const toolbar = state.data[toolbarId];
      if (toolbar) {
        toolbar.isTitleEditable = editable;
      }
    },
    createToolBar: (
      state,
      action: PayloadAction<{ pid: string; id: string }>
    ) => {
      const { id, pid } = action.payload;

      let newNote: any = { ...state.toolBarListSettings.defaultParameters };
      newNote.id = id;
      newNote.pid = pid;
      newNote.isTitleEditable = false;
      state.toolBarListSettings.count += 1;
      newNote.title = `ToolBar Group ${state.toolBarListSettings.count}`;
      newNote.ToolBarType = ToolBarType.TOOLBAR;

      addNodeReducer(state, { payload: newNote, type: "ITreeNode" });
    },

    setCheckedVisibility: (state, action:PayloadAction<{toShow:boolean,leafIds:any, undoable?:boolean}>) => {
      let {toShow, leafIds,undoable} = action.payload;
      // if (leafIds[0]==='Presentation' || leafIds[0]==='FullScreen') {
        if (state.defaultTools.hasOwnProperty(leafIds[0])) {
        state.defaultTools[leafIds[0]].state.visibility = toShow 
      }

      if(undoable)
      undoStack.add(
        {
          undo: {reducer: setCheckedVisibility, payload:{toShow: !toShow , leafIds}},
          redo: {reducer: setCheckedVisibility, payload:{toShow,leafIds}}
        }
      )
      // console.log(state,action)
      setCheckedVisibilityReducer(state,action);
  },

    deleteTool: (state, action: PayloadAction<{ keys: string }>) => {
      let keys = action.payload.keys;

      deleteNodeReducer(state, { payload: { nodeId: keys }, type: "string" });
      // keys.forEach(k => {

      // })
    },
    setApplyPositionItem: (state, action: PayloadAction<any>) => {
      state.toolBarPositionList.forEach((item) => {
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
      // if (selectCheckedNodes.length===1) {state.toolbarElementsList[selectCheckedNodes[0].id].position = action.payload}
    },
    setApplyOrientationItem: (state, action: PayloadAction<{checkedElement:any,orientationId:any}>) => {
      state.toolBarOrientationList.forEach((item) => {
        // console.log(action.payload)
        if (item.id === action.payload.orientationId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        // Apply selected item
        if (item.selected === true) {
          item.applied = true;
          item.selected = false; //
          // state.currentOrientation = item;
          if (state.data.hasOwnProperty(action.payload.checkedElement)) {
            state.data[action.payload.checkedElement].orientation = action.payload.orientationId

          }
          
        } else {
          item.applied = false;
        }
      });
    },
    setCheckedElements: (
      state,
      action: PayloadAction<{ tocheck: boolean; id: any }>
    ) => {
      state.toolbarElementsList.forEach((item) => {
        if (item.id === action.payload.id) {
          item.checked = action.payload.tocheck;
        }
      });
    },
    setSelectedToolBarType: (state, action: PayloadAction<number>) => {
      state.selectedToolBarType = action.payload;
    },

    setDefaultsState : (state,action: PayloadAction<{ tocheck: boolean; id: any }>) => {
      state.defaultTools[action.payload.id].state.checked = action.payload.tocheck
    },
  },
});

//Define the Reducers
export const {
  createToolBar,
  checkNode,
  selectedTools,
  setCheckedVisibility,
  updatePositionListItems,
  updateAppliedPosition,
  updateOrientationListItems,
  updateAppliedOrientation,
  setTextValue,
  setEditableNodeId,
  setApplyOrientationItem,
  setSelectedToolBarType,
  setCheckedElements,
  setApplyPositionItem,
  setDefaultsState,
} = toolBarTreeSlice.actions;

//selectors

export const selectRootIds = (state: RootState) => state.toolBar.rootIds;

export const toolBarList = (state: RootState) => state.toolBar.data;

export const defaultList = (state: RootState) => state.toolBar.defaultTools;

export const selectEditableNodeId = (state: RootState) =>
  state.toolBar.editableNodeId;

export const selectCheckedLeafNodes = (state: RootState) =>
  selectCheckedLeafNodesTree(state.toolBar);
// export const selectUnCheckedLeafNodes = (state: RootState) =>
//   selectUnCheckedLeafNodesTree(state.toolBar);
export const selectToolbarPositionList = (state: RootState) =>
  state.toolBar.toolBarPositionList;
export const selectToolbarOrientationList = (state: RootState) =>
  state.toolBar.toolBarOrientationList;
export const selectCheckedNodes = (state: RootState) => {
  let checkedAllNodesID: any[] = [];
  state.toolBar.toolbarElementsList.forEach((item) => {
    if (item.checked === true) {
      checkedAllNodesID.push(item);
    }
  });
  return checkedAllNodesID;
};
export const selectedLength = (state: RootState) => {
  const array: string[] = [];

  Object.keys(state.toolBar.defaultTools).forEach((item) => {
    if (state.toolBar.defaultTools[item].state.checked === true)
      array.push(item);
  });

  Object.keys(state.toolBar.data).forEach((key) => {
    if (state.toolBar.data[key].state.checked === true)
      if (state.toolBar.data[key].pid === "-1") return null;
      else array.push(key);
  });

  return array.length;
};
export const selectCheckedNodeForALLToolType = (state: RootState) => {
  let checkedAllToolBarNodesID: any[] = [];

  Object.keys(state.toolBar.data).forEach((key) => {
    if (
      state.toolBar.data[key].state.checked === true &&
      state.toolBar.data[key].state.partiallyChecked === false
    ) {
      checkedAllToolBarNodesID.push(state.toolBar.data[key].id);
    } else {
      state.toolBar.data[key].children.forEach((childID) => {
        if (state.toolBar.data[childID].state.checked === true) {
          checkedAllToolBarNodesID.push(childID);
        }
      });
    }
  });

  Object.keys(state.toolBar.defaultTools).forEach((key) => {
    if (
      state.toolBar.defaultTools[key].state.checked === true &&
      state.toolBar.defaultTools[key].state.partiallyChecked === false
    ) {
      checkedAllToolBarNodesID.push(state.toolBar.defaultTools[key].id);
    } else {
      state.toolBar.defaultTools[key].children.forEach((childID) => {
        if (state.toolBar.defaultTools[childID].state.checked === true) {
          checkedAllToolBarNodesID.push(childID);
        }
      });
    }
  });

  return checkedAllToolBarNodesID;
};

export const toolbarElementsList = (state: RootState) =>
  state.toolBar.toolbarElementsList;

export const selectedToolBarType = (state: RootState) =>
  state.toolBar.selectedToolBarType;

// export const currentOrientation = (state: RootState) =>
//   state.toolBar.currentOrientation;

export const currentToolbarDisplayList = (state: RootState) => {
  let toolbarDisplayList: any[] = [];
  const defaultsList = state.toolBar.defaultTools
  for (var key in defaultsList) {
    if (defaultsList.hasOwnProperty(key)) {
      const value = defaultsList[key];
        toolbarDisplayList.push(value);
    }
  }
  let addedToolbars = state.toolBar.data
  if (addedToolbars) {
    for (var key in addedToolbars) {
      toolbarDisplayList.push(addedToolbars[key])
    }

  }
  return toolbarDisplayList
}

export const combinedDataList = (state: RootState) => {
  return {...state.toolBar.data, ...state.toolBar.defaultTools }
}

export const defaultDataList = (state: RootState) => {
  return { ...state.toolBar.defaultTools }
}

export default toolBarTreeSlice.reducer;
