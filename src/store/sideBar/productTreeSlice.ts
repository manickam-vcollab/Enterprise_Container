import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { TreeNode, ITreeState } from "./shared/Tree/types";
import {
  saveTreeReducer,
  checkNodeReducer,
  highlightNodeReducer,
  invertNodeReducer,
  expandNodeReducer,
  toggleVisibilityReducer,
  setCheckedVisibilityReducer,
  invertCheckedVisibilityReducer,
} from "./shared/Tree/reducers";
import {
  selectCheckedLeafNodes as selectCheckedLeafNodesTree,
  selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree,
  selectAllLeafNodes as selectAllLeafNodesTree,
} from "./shared/Tree/selectors";
import {
  setPartVisibility,
  setHighlightedNodes,
  fitView,
  getSearchHints,
  setDisplayMode,
  getPartPickandMoveMatrix,setPartPickandMoveMatrix
} from "../../backend/viewerAPIProxy";
import { traverseNode } from "./shared/Tree/helpers";
import { undoStack } from "../../components/utils/undoStack";
import { fetchDisplayModes } from "./displayModesSlice";
// Define a type for the slice state

export enum ProductTreeStates {
  Tree,
  Search,
  DisplayModes,
}

export enum Selection {
  ALL_PARTS,
  SELECTED_PARTS,
  UNSELECTED_PARTS,
}

export interface ProductTreeState extends ITreeState {
  data: { [id: string]: TreeNode };
  rootIds: string[];
  currentState: ProductTreeStates;
  applyTo: Selection;
  searchHints: { [id: string]: any };
  prevSearches: { [id: string]: any };
  partlistPrevSearches: { [id: string]: any };
  searchQuery: string;
  searchResults: any[];
}

// Define the initial state using that type
const initialState: ProductTreeState = {
  data: {},
  rootIds: [],
  currentState: ProductTreeStates.Tree,
  applyTo: Selection.ALL_PARTS,
  searchHints: {},
  prevSearches: {},
  partlistPrevSearches:{},
  searchQuery: "",
  searchResults: [],
};

export const toggleVisibilityAsync = createAsyncThunk(
  "productTree/toggleVisibilityAsync",
  async (data: any, { dispatch, getState }) => {
    let { toShow, nodeId } = data;
    const rootState = getState() as RootState;

    if (data.undoable) {
      undoStack.add({
        undo: {
          reducer: toggleVisibilityAsync,
          payload: {
            toShow: rootState.productTree.data[nodeId].state.visibility,
            nodeId,
          },
        },
        redo: {
          reducer: toggleVisibilityAsync,
          payload: { toShow: data.toShow, nodeId: data.nodeId },
        },
      });
    }
    let leafNodesId: string[] = [];
    traverseNode(nodeId, rootState.productTree, (node) => {
      if (node.children.length === 0) leafNodesId.push(node.id);
    });
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let result = "";
    if (viewerId)
      result = await setPartVisibility(leafNodesId, toShow, viewerId);
    if (result === "SUCCESS") {
      return Promise.resolve(data);
    } else {
      return Promise.reject();
    }
  }
);

export const invertVisibilityAsync = createAsyncThunk(
  "productTree/invertVisibilityAsync",
  async (data: { undoable?: boolean }, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    let checkedNodes: TreeNode[] = selectCheckedLeafNodes(rootState);
    let visibleNodeIds: string[] = [];
    let visibleNodePids: string[] = [];
    let invisibleNodeIds: string[] = [];
    let invisibleNodePids: string[] = [];

    if (data.undoable) {
      undoStack.add({
        undo: { reducer: invertVisibilityAsync, payload: {} },
        redo: { reducer: invertVisibilityAsync, payload: {} },
      });
    }
    let pid: string | null = null;
    checkedNodes.forEach((node: TreeNode) => {
      if (node.pid && node.pid !== pid) {
        node.state.visibility
          ? visibleNodePids.push(node.pid)
          : invisibleNodePids.push(node.pid);
        pid = node.pid;
      }
      node.state.visibility
        ? visibleNodeIds.push(node.id)
        : invisibleNodeIds.push(node.id);
    });
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];

    let result = "";
    if (visibleNodeIds.length > 0)
      result = await setPartVisibility(visibleNodeIds, false, viewerId);
    if (invisibleNodeIds.length > 0)
      result = await setPartVisibility(invisibleNodeIds, true, viewerId);
    if (result === "SUCCESS") {
      return Promise.resolve({ leafIds: checkedNodes.map((e) => e.id) });
    } else {
      return Promise.reject();
    }
  }
);

export const setCheckedNodesAsync = createAsyncThunk(
  "productTree/setCheckedNodesAsync",
  async (
    data: { toCheck: boolean; nodeId: string; undoable?: boolean },
    { dispatch, getState }
  ) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    const { toCheck, nodeId } = data;
    if (data.undoable) {
      undoStack.add({
        undo: {
          reducer: setCheckedNodesAsync,
          payload: {
            toCheck: rootState.productTree.data[nodeId].state.checked,
            nodeId,
          },
        },
        redo: {
          reducer: setCheckedNodesAsync,
          payload: { toCheck: toCheck, nodeId },
        },
      });
    }

    let leafNodesId: string[] = [];
    traverseNode(data.nodeId, rootState.productTree, (node) => {
      if (node.children.length == 0) leafNodesId.push(node.id);
    });
    let result = setHighlightedNodes(data.toCheck, leafNodesId, viewerId);
    if (result === "SUCCESS") {
      dispatch(productTreeSlice.actions.checkNode({ ...data }));
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
);

export const handleHighlightAsync = createAsyncThunk(
  "productTree/handleHighlightAsync",
  (
    data: { nodeIds: string[]; toHighlight: boolean },
    { dispatch, getState }
  ) => {
    const treeData = (getState() as RootState).productTree;
    const { nodeIds, toHighlight } = data;
    if (nodeIds.length > 0) {
      nodeIds.forEach((nodeId: string) => {
        dispatch(setHightLightedNodesAsync({ toHighlight, nodeId }));
      });
    } else {
      let rootIds = treeData.rootIds;
      dispatch(setHightLightedNodesAsync({ toHighlight, nodeId: rootIds[0] }));
    }
  }
);
export const setHightLightedNodesAsync = createAsyncThunk(
  "productTree/setHighLightedNodesAsync",
  async (
    data: { toHighlight: boolean; nodeId: string },
    { dispatch, getState }
  ) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let leafNodesId: string[] = [];
    traverseNode(data.nodeId, rootState.productTree, (node) => {
      if (node.children.length === 0) leafNodesId.push(node.id);
    });
    let result: string = setHighlightedNodes(
      data.toHighlight,
      leafNodesId,
      viewerId
    );

    if (result === "SUCCESS") {
      //dispatch(productTreeSlice.actions.highlightNode({...data}))
      dispatch(
        productTreeSlice.actions.checkNode({
          toCheck: data.toHighlight,
          nodeId: data.nodeId,
        })
      );
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
);

export const setCheckedVisibilityAsync = createAsyncThunk(
  "productTree/setCheckedVisibilityAsync",
  async (data: any, { dispatch, getState }) => {
    let { toShow } = data;
    const rootState = getState() as RootState;
    let checkedNodes: TreeNode[] = selectCheckedLeafNodes(rootState);
    let checkedNodesId: string[] = checkedNodes.map((e) => e.id);

    if (data.undoable) {
      let visibleCount = 0;
      checkedNodes.forEach((e) => {
        if (e.state.visibility !== undefined && e.state.visibility === true) {
          visibleCount += 1;
        }
      });
      undoStack.add({
        undo: {
          reducer: setCheckedVisibilityAsync,
          payload: { toShow: checkedNodes.length === visibleCount },
        },
        redo: {
          reducer: setCheckedVisibilityAsync,
          payload: { toShow: data.toShow },
        },
      });
    }

    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let result = "";
    if (viewerId)
      result = await setPartVisibility(checkedNodesId, toShow, viewerId);
    if (result === "SUCCESS") {
      return Promise.resolve({ toShow, leafIds: checkedNodesId });
    } else {
      return Promise.reject();
    }
  }
);

export const fetchSearchHints = createAsyncThunk(
  "productTree/fetchSearchHints",
  async (data, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let result: any[] = [];
    if (viewerId) result = await getSearchHints(viewerId);
    if (result instanceof Array) {
      return Promise.resolve(result);
    } else {
      return Promise.reject();
    }
  }
);
export const removeSearchHint = createAsyncThunk(
  "productTree/removeSearchHint",
  async (data: { data: string }, { dispatch, getState }) => {
    return data;
  }
);

export const  updatePickandMoveState = createAsyncThunk(
  "productTree/setUpdatePickandMoveState",
  async (data, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const productTree = rootState.productTree;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    await dispatch(productTreeSlice.actions.setpickandmoveMatrix(viewerId));
  }
);

export const updateStateAsync = createAsyncThunk(
  "productTree/updateStateAsync",
  async (data: Partial<ProductTreeState>, { dispatch, getState }) => {
    await dispatch(productTreeSlice.actions.updateState(data));
    const rootState = getState() as RootState;
    const treeState = rootState.productTree;
    const treeData = treeState.data;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    Object.values(treeData).map(async (v) => {
      if (v.children.length === 0) {
        await setPartVisibility([v.id], v.state.visibility ?? false, viewerId);
        let pickandmove:any  = v.customData?.pickandmoveMatrix;
        setPartPickandMoveMatrix( [v.id],pickandmove,viewerId);
        setHighlightedNodes(v.state.checked ?? false, [v.id], viewerId);
        if(v.customData)
          await setDisplayMode(v.customData.displayId, [v.id], viewerId);
      }
    });
    dispatch(fetchDisplayModes());
  }
);

export const productTreeSlice = createSlice({
  name: "productTree",
  initialState,
  reducers: {
    saveTree: saveTreeReducer,
    checkNode: checkNodeReducer,
    highlightNode: highlightNodeReducer,
    invertNode: (
      state,
      action: PayloadAction<{ nodeId: string; undoable?: boolean }>
    ) => {
      const { nodeId, undoable } = action.payload;
      if (undoable)
        undoStack.add({
          undo: { reducer: invertNode, payload: { nodeId } },
          redo: { reducer: invertNode, payload: { nodeId } },
        });
      invertNodeReducer(state, action);
    },
    expandNode: (
      state,
      action: PayloadAction<{
        toOpen: boolean;
        nodeId: string;
        undoable?: boolean;
      }>
    ) => {
      const { toOpen, nodeId, undoable } = action.payload;
      if (undoable)
        undoStack.add({
          undo: { reducer: expandNode, payload: { toOpen: !toOpen, nodeId } },
          redo: { reducer: expandNode, payload: { toOpen, nodeId } },
        });
      expandNodeReducer(state, action);
    },
    toggleVisibility: toggleVisibilityReducer,
    setCheckedVisibility: setCheckedVisibilityReducer,
    invertCheckedVisibility: invertCheckedVisibilityReducer,
    groupSelectedNodes: (state, action: PayloadAction<{ tagName: string }>) => {
      let { tagName } = action.payload;
      [...Object.values(state.data)].forEach((node: any) => {
        if (node.state.checked && node.children.length === 0) {
          if (node.attributes.tags) {
            if (node.attributes.tags.indexOf(tagName) < 0)
              node.attributes.tags.push(tagName);
          } else {
            node["attributes"] = { tags: [tagName] };
          }
        }
      });
    },
    focusSelectedNodes: (
      state,
      action: PayloadAction<{ viewerId: string }>
    ) => {
      let nodes = [...Object.values(state.data)] as TreeNode[];
      let checkedLeavesId = nodes
        .filter(
          (item: TreeNode) => item.children.length === 0 && item.state.checked
        )
        .map((item) => item.id);
      fitView(action.payload.viewerId, checkedLeavesId);
    },

    focusAllNodes: (
      state,
      action: PayloadAction<{ viewerId: string }>
    ) => {
      
     
      fitView(action.payload.viewerId, []);
    },
    setProductTreeState: (
      state,
      action: PayloadAction<{ data: ProductTreeStates }>
    ) => {
      state.currentState = action.payload.data;
    },
    updatePrevSearches: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      if (!state.prevSearches[query] && query !== "") {
        state.prevSearches[query] = Object.keys(state.prevSearches).length;
      }
    },

    updatePartListPrevSearches: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      if (!state.partlistPrevSearches[query] && query !== "") {
        state.partlistPrevSearches[query] = Object.keys(state.partlistPrevSearches).length;
      }
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    setApplyTo: (state, action: PayloadAction<Selection>) => {
      state.applyTo = action.payload;
    },
    updateDisplayMode: (state, action: PayloadAction<{nodeIds: string[], displayId: string}>) => {
      const {nodeIds, displayId} = action.payload;
      if(nodeIds){
        if(nodeIds.length > 0){
          nodeIds.forEach(id => {
            const customData = state.data[id].customData;
            if(customData)  
            customData.displayId = displayId;
          })
        }
        else {
          Object.keys(state.data).map( key => {
            const customData = state.data[key].customData;
            if(customData)  
              customData.displayId = displayId;
            return true;
        });
        }
      } 
    },
    updateState: (state, action: PayloadAction<Partial<ProductTreeState>>) => {
      const { payload } = action;
      if (payload.rootIds && payload.data) {
        //state.rootIds = payload.rootIds;
        //state.data = payload.data;        
        Object.values(state.data).map(async (v) => {
          const items = Object.values(payload.data as any).filter((item : any) => item.title === v.title);
            items.forEach((item : any) => {
              state.data[v.id].state = item.state;
              state.data[v.id].attributes = item.attributes;
              state.data[v.id].customData = item.customData;
           });
        });
      }
    },
    setpickandmoveMatrix:(state,action: PayloadAction<string>) =>{
     Object.values(state.data).forEach((node)=> {
      if(node?.customData) {
        node.customData.pickandmoveMatrix = [] ;
        let matrxiData = getPartPickandMoveMatrix(node.id,action.payload);
        if(matrxiData){
          matrxiData.forEach((item)=>{
            node.customData?.pickandmoveMatrix?.push(item);
          })
        }
      }
    })

    },
  },
    extraReducers: (builder) => {
      builder.addCase(toggleVisibilityAsync.fulfilled, (state, { payload }) => {
        productTreeSlice.caseReducers.toggleVisibility(state, {
          payload,
          type: "{toShow:boolean;nodeId:string}",
        });
      });
      builder.addCase(
        setCheckedVisibilityAsync.fulfilled,
        (state, { payload }) => {
          productTreeSlice.caseReducers.setCheckedVisibility(state, {
            payload,
            type: "{toShow:boolean}",
          });
        }
      );
      builder.addCase(invertVisibilityAsync.fulfilled, (state, { payload }) => {
        productTreeSlice.caseReducers.invertCheckedVisibility(state, {
          payload,
          type: "leafIds:string[]",
        });
      });
      builder.addCase(fetchSearchHints.fulfilled, (state, { payload }) => {
        payload.forEach((e, idx) => {
          state.searchHints[e["code"]] = idx;
        });
      });
      builder.addCase(removeSearchHint.fulfilled, (state, { payload }) => {
        let key = payload.data;
        if (state.prevSearches[key] !== undefined) {
          delete state.prevSearches[key];
        }
        if (state.searchHints[key] !== undefined) {
          delete state.searchHints[key];
        }
      });
  },
});

//Define the Reducers
export const {
  saveTree,
  checkNode,
  invertNode,
  expandNode,
  groupSelectedNodes,
  focusSelectedNodes,
  setProductTreeState,
  setSearchString,
  setSearchResults,
  setApplyTo,
  updateDisplayMode,
  updatePrevSearches,
  updatePartListPrevSearches,
  focusAllNodes
} = productTreeSlice.actions;

//Define the selectors
export const selectApplyTo = (state: RootState) => state.productTree.applyTo;
export const selectProductTreeData = (state: RootState) =>
  state.productTree.data;
export const selectModels = (state: RootState) =>
  state.productTree.rootIds.map((id) => state.productTree.data[id]);
export const selectCurrentState = (state: RootState) =>
  state.productTree.currentState;
export const selectRootIds = (state: RootState) => state.productTree.rootIds;
export const selectSearchHints = (state: RootState) =>
  Object.keys(state.productTree.searchHints);
export const selectPrevSearches = (state: RootState) =>
  Object.keys(state.productTree.prevSearches);
  export const selectPartListPrevSearches = (state: RootState) =>
  Object.keys(state.productTree.partlistPrevSearches);
export const selectSearchString = (state: RootState) =>
  state.productTree.searchQuery;
export const selectSearchResults = (state: RootState) =>
  state.productTree.searchResults;
export const selectCheckedLeafNodes = (state: RootState) =>
  selectCheckedLeafNodesTree(state.productTree);
export const selectUnCheckedLeafNodes = (state: RootState) =>
  selectUnCheckedLeafNodesTree(state.productTree);
export const selectAllLeafNodes = (state: RootState) =>
  selectAllLeafNodesTree(state.productTree);

export default productTreeSlice.reducer;
