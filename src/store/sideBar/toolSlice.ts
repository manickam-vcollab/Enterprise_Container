import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { useState } from "react";
import { checkNodeReducer } from "./shared/Tree/reducers";

import {
  selectCheckedLeafNodes as selectCheckedLeafNodesTree,
  selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree,
  selectAllLeafNodes as selectAllLeafNodesTree,
} from "./shared/Tree/selectors";


export interface InitialState {
    data: { [id: string] };
    rootIds: string[];
}

const initialState: InitialState = {
    data: { 
       PopOut: {
      id: "PopOut",
      title: "PopOut",
      name:'PopOut',
    },
    Undo: {
      id: "Undo",
      title: "Undo",
      name:'Undo',
    },
    Redo: {
      id: "Redo",
      title: "Redo",
      name:'Redo',
    },
    FullScreen: {
      id: "FullScreen",
      title: "FullScreen",
      name:'FullScreen',
    },
    'Previous Slide': {
      id: "Previous Slide",
      title: "Previous Slide",
      name:'Previous Slide',
    },
    'Next Slide': {
      id: "Next Slide",
      title: "Next Slide",
      name:'Next Slide',
    },
    'Update Slide': {
      id: "Update Slide",
      title: "Update Slide",
      name:'Update Slide',
    },
    'Add Slide': {
      id: "Add Slide",
      title: "Add Slide",
      name:'Add Slide',
    },
    'Fit View': {
      id: "Fit View",
      title: "Fit View",
      name:"Fit View",
    },
    'Pick & Move':{
      id: "Pick & Move",
      title: "Pick & Move",
      name:"Pick & Move",
    },
    'Arrange Labels':{
      id: "Arrange Labels",
      title: "Arrange Labels",
      name:"Arrange Labels",
    },
    'Reset':{
      id: "Reset",
      title: "Reset",
      name:"Reset",
    },
  },
    rootIds: [],
}


export const setCheckedNodesAsync = createAsyncThunk(
  "toolSlice/setCheckedNodesAsync",
  async (
    data: { toCheck: boolean; nodeId: string; undoable?: boolean },
    { dispatch, getState }
  ) => {
    const rootState = getState() as RootState;
    // const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
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

    dispatch(toolSlice.actions.checkNode({ ...data }));
  }
);



export const toolSlice = createSlice({
    name: "tools",
    initialState: initialState,
    reducers: {
      checkNode: checkNodeReducer,
      toggleChecked: (state, action) => {
        const tool = state.data.find((tool:any) => tool.id === action.payload);
        if (tool) {
          tool.checked = !tool.checked;
        }
      },
      saveData: (state, action: PayloadAction<{ id: string, data: any }>) => {
        const { id, data } = action.payload;
        state.data[id] = data; // update the state with the data and the corresponding ID
      },
     
    },
  });

  //Define the Reducers
export const {
  
  checkNode,
  toggleChecked,
  saveData,
} = toolSlice.actions;

export const selectRootIds = (state: RootState) => state.tools.rootIds;

export const toolsList = (state: RootState) => state.tools.data;

export const getSelectedTools = (state: RootState, currentId: string) => {
  const selectedTools: string[] = [];
  const currentData = state.toolBar.data[currentId];
  
  if (currentData && currentData.children) {
    currentData.children.forEach((toolId: string) => {
      const tool = state.tools.data[toolId];
      if (tool) selectedTools.push(tool.name);
    });
  }
  
  return selectedTools;
};



export default toolSlice.reducer;