import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getDisplayModes, setDisplayMode} from "../../backend/viewerAPIProxy";
import {selectAllLeafNodes, selectCheckedLeafNodes, selectUnCheckedLeafNodes, updateDisplayMode} from "./productTreeSlice"
import { MsgSeverity, toastMsg} from "../toastSlice";
import {setIsViewerDataChanged} from '../sideBar/slideSlice';
import type { RootState } from '../index';
import { tourListSlice } from 'store/tourSlice';
import tutorialSteps from 'components/layout/TourComponent/data/tutorialSteps';
import toastMessage from '../../components/sideBarContents/messages/toastMessage.json';

export enum Selection {
  ALL_PARTS,
  SELECTED_PARTS,
  UNSELECTED_PARTS
}

// Define a type for the slice state
type DisplayModesState = {
    displayModesData: any[],
    applyTo: Selection,
    downloadStatus?:DownloadStates,
    panelStatusId?: number,
    menuStatusId?: number,
    menuSelected?:boolean,
    btndisable?:boolean,
    undoable?:boolean,
    
}

type DisplayMenuItem = {
    displayId:string,
    title: string,
    selected: boolean,
    order:number,
    size: number,
    status: DownloadStates
}

// Define the initial state using that type
const initialState: DisplayModesState = {
    displayModesData: [ {
        id: "Display Modes",
        icon: "ExpandMoreIcon",
        expanded: true,
        menuData: []
      },],
    applyTo: Selection.ALL_PARTS,
    menuSelected:false,
    btndisable:false,
    undoable:true

}

export enum DownloadStates {
  DOWNLOADED,
  IN_PROGRESS,
  NOT_DOWNLOADED,
  NO_DATA_AVAILABLE
}

export const fetchDisplayModes = createAsyncThunk("displayModes/fetchDisplayModes",
  async (data,{dispatch, getState}) => {
    let root = getState() as RootState;
    let nodeIds= [];
    const viewerId = root.app.viewers[root.app.activeViewer || ""];
    if(root.displayModes.applyTo === Selection.SELECTED_PARTS)
    {
      nodeIds = selectCheckedLeafNodes(root).map(node => node.id);
    }
    else if(root.displayModes.applyTo === Selection.UNSELECTED_PARTS)
    {
      nodeIds = selectUnCheckedLeafNodes(root).map(node => node.id);
    }
    else{
      nodeIds = selectAllLeafNodes(root).map(node => node.id);
    }

   // const nodeIds = selectCheckedLeafNodes(root).map(node => node.id);
    let result = await getDisplayModes(nodeIds, viewerId);
    let menuData:DisplayMenuItem[] = []
    result.forEach((item:any) => {
      if(item.displayOrder !== 0)
      menuData.push(
        {
          displayId: item.id,
          title: item.displayName,
          selected: false,
          order: item.displayOrder,
          size: item.downloadMetricValue,
          status: item.isDataAvailable ? DownloadStates.DOWNLOADED : DownloadStates.NOT_DOWNLOADED
        } as DisplayMenuItem
      )
    })
    menuData.sort((a,b) => a.order-b.order);
    dispatch(displayModesSlice.actions.setMenuData({panelId:0,menuData}));
  }
)

const getSelectedNodeIds = (root:RootState) : string[]=> {
  let displayModesState = root.displayModes;
  switch(displayModesState.applyTo) {
    case Selection.SELECTED_PARTS:
      return selectCheckedLeafNodes(root).map(node => node.id);
    case Selection.UNSELECTED_PARTS:
      return selectUnCheckedLeafNodes(root).map(node => node.id);
    default: 
      return [] as string[]
    
  }
  
}
export const setDisplayModeAsync = createAsyncThunk("displayModes/setDisplayModeAsync",
  async (data:{menuId:number}, {dispatch,getState}) => {
    let root = getState() as RootState;
    const viewerId = root.app.viewers[root.app.activeViewer || ""];
    const nodeIds = getSelectedNodeIds(root);
    const item = root.displayModes.displayModesData[0].menuData[data.menuId];
    let res = await setDisplayMode(item.displayId,nodeIds,viewerId);
    if(res === "SUCCESS")
    {      
      dispatch(updateDisplayMode({nodeIds : nodeIds, displayId : item.displayId}));
      dispatch(setDownloadStatus({panelId:0,menuId: data.menuId,status:DownloadStates.DOWNLOADED}));
      dispatch(tourListSlice.actions.setUpdateAction(tutorialSteps.steps[7].target.slice(1))); 
      dispatch(fetchDisplayModes());
      dispatch(toastMsg({msg:toastMessage.displayMode001,severity:MsgSeverity.Info})); 
      dispatch(setIsViewerDataChanged(true));
      
      // setTimeout(() => {
      //   dispatch(tourListSlice.actions.setManualStepForward());
      // }, 1000);   
    }
  });

export const displayModesSlice = createSlice({
  name: 'displayModes',
  initialState,
  reducers: {
      setApplyTo: (state, action:PayloadAction<Selection>) => {
        state.applyTo = action.payload;
      },
      expandPanel: (state, action:PayloadAction<{panelId:number,value:boolean}>) => {
        let selectedPanel = state.displayModesData[action.payload.panelId];
        selectedPanel.expanded = action.payload.value;
      },
      setMenuData: (state, action:PayloadAction<{panelId:number, menuData: any[]}>) => {
        let selectedPanel = state.displayModesData[action.payload.panelId];
        selectedPanel.menuData = action.payload.menuData;
      },
      setSelectedMenu: (state, action:PayloadAction<{panelId:number,menuId:number,value:boolean}>) => {
         let selectedMenu = state.displayModesData[action.payload.panelId].menuData[action.payload.menuId];
         selectedMenu.selected = action.payload.value;
      },
      setDownloadStatus: (state, action:PayloadAction<{panelId:number,menuId:number,status:DownloadStates}>) => {
         let selectedMenu = state.displayModesData[action.payload.panelId].menuData[action.payload.menuId];
         selectedMenu.status = action.payload.status;
         state.downloadStatus=action.payload.status;
         state.panelStatusId=action.payload.panelId;
         state.menuStatusId=action.payload.menuId;
         if(state.downloadStatus === DownloadStates.DOWNLOADED)   
            state.btndisable=true;        
      },
      setMenuSelected:(state, action:PayloadAction<boolean>)=>{
        state.menuSelected=action.payload
        state.btndisable=false;

      },
      setBtndisbale:(state, action:PayloadAction<boolean>)=>{
        state.btndisable=action.payload

      },      
      setUndo:(state, action:PayloadAction<boolean>)=>{
        state.undoable=action.payload

      }      
  },
})

//Define the Reducers
export const { 
    setApplyTo,
    expandPanel,
    setSelectedMenu,
    setDownloadStatus,
    setMenuSelected,
    setBtndisbale,
    setUndo,
} = displayModesSlice.actions;

//Define the selectors
export const selectDisplayModesData = (state:RootState) => state.displayModes.displayModesData;
export const selectApplyTo = (state:RootState) => state.displayModes.applyTo;
export const selectDownloadStatus = (state:RootState) => state.displayModes.downloadStatus
export const selectPanelStatusId = (state:RootState) => state.displayModes.panelStatusId
export const selectMenuStatusId = (state:RootState) => state.displayModes.menuStatusId;
export const selectMenuSelected = (state:RootState) => state.displayModes.menuSelected;
export const selectBtnDisable = (state:RootState) => state.displayModes.btndisable;
export const selectUndoable = (state:RootState) => state.displayModes.undoable;


export default displayModesSlice.reducer;
