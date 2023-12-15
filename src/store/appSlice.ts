import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes, popupMenuContentTypes, displayMenuItems } from '../config';
import {enableProbe} from './probeSlice';
import {InteractionMode} from '../backend/viewerAPIProxy';
import * as viewerAPIProxy from '../backend/viewerAPIProxy';
type Viewer  = {
    name :string,
    id :string
}
export const ROLE = {
    designer : "designer",
    analyst : "analyst"
}

export type User = {
    name : string,
    password : string,
    role : string
}

export enum reportType {
    OPEN_REPORT = 'OPEN_REPORT',
    CREATE_REPORT = 'CREATE_REPORT',
    COMPOSE_REPORT = 'COMPOSE_REPORT'
}

// Define a type for the slice state
type AppState = {
    appDisplayName : string,
    appVersion : string,
    isAppBarVisible: boolean,
    isFullscreenEnabled: boolean,
    isSideBarVisible : boolean,
    sideBarActiveContent : string,
    isDarkModeEnable : boolean,
    popupMenuActiveContent :string,
    popupMenuDisplayMode : any | null,

    interactionMode: InteractionMode,
    labelInsertState: boolean,
    selectedLabelInsertMode: InteractionMode,
    isModelLoaded:boolean,
    modelLoadingStatus : string ,
    modelInfo : Array<any>,
    viewers : { [id: string]: string; },
    activeViewer : string | null,
    currentUser : User | null,
    selectedReport : any,
    selectedModel : any,
    reportType :reportType,
    newReportName:string,
    currentReportId :string,
    currentRoleId :string,
    togglePopout : boolean,
    isPickAndMoveEnabled: boolean,
}

// Define the initial state using that type
const initialState: AppState = {
    appDisplayName : 'VCollab Enterprise',
    appVersion : 'Alpha v1.0.0',
    isAppBarVisible: false,
    isFullscreenEnabled: false,
    isSideBarVisible : false,
    sideBarActiveContent : sideBarContentTypes.mainMenu,
    isDarkModeEnable: true,
    popupMenuActiveContent : popupMenuContentTypes.none,
    popupMenuDisplayMode : null,
    isPickAndMoveEnabled: false,
    interactionMode: InteractionMode.DEFAULT,
    labelInsertState: false,
    selectedLabelInsertMode: InteractionMode.LABEL2D,
    isModelLoaded:false,
    modelLoadingStatus : '' ,
    modelInfo:[],
    viewers : {},
    activeViewer : null,
    currentUser : null,
    selectedReport : {},
    selectedModel  : {},
    reportType : reportType.OPEN_REPORT,
    newReportName:'',
    togglePopout : false,
    currentReportId : "",
    currentRoleId : "",
}

const setDefaultInteractModeAsync = createAsyncThunk("appSlice/setDefaultInteractModeAsync",
(data:any,{dispatch,getState}) => {
    let rootState:RootState = getState() as RootState;
    let viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    viewerAPIProxy.enablePickAndMove(false, viewerId);
    dispatch(enableProbe({isEnabled: false}));
});

// do not use it, will be called from event of app
export const setInteractionModeAsync = createAsyncThunk("appSlice/setInteractionModeAsync",
(data:InteractionMode,{dispatch, getState}) => {
    dispatch(appSlice.actions.setInteractionMode(data));
});
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppBarVisibility : (state, action : PayloadAction<boolean>) => {
        state.isAppBarVisible = action.payload
    },
    setFullscreenState : (state, action : PayloadAction<boolean>) => {
        state.isFullscreenEnabled = action.payload
    },
    setSidebarVisibility : (state, action : PayloadAction<boolean>) => {
        // console.log("SIDEBAR VISIBILITY: ",action.payload);
        state.isSideBarVisible = action.payload
    },
    setSidebarActiveContent : (state, action : PayloadAction<string>) => {
      state.sideBarActiveContent = action.payload
    },
    setDarkModeEnable : (state, action : PayloadAction<boolean>) => {
        state.isDarkModeEnable = action.payload
    },
    setPopupMenuActiveContent : (state, action : PayloadAction<string>) => {
        state.popupMenuActiveContent = action.payload
    },
    setModelLoadedState: (state,action : PayloadAction<boolean>) => {
        state.isModelLoaded = action.payload;
    },
    setModelLoadingStatus : (state, action : PayloadAction<string>) => {
        state.modelLoadingStatus = action.payload
    },
    setModelInfo : (state, action : PayloadAction<Array<any>>) => {
        state.modelInfo = action.payload;
    },
    setInteractionMode :(state, action: PayloadAction<InteractionMode>) => {
        state.interactionMode = action.payload;
    },
    setLabelInsertionState :(state, action: PayloadAction<boolean>) => {
        state.labelInsertState = action.payload;
    },
    setSelectedLabelMode: (state, action:PayloadAction<InteractionMode>) => {
        state.selectedLabelInsertMode = action.payload;
    },
    addViewer : (state,action : PayloadAction<Viewer>) => {
        state.viewers[action.payload.name] = action.payload.id;
        if(state.activeViewer === null)
            state.activeViewer = action.payload.name;
    },
    setActiveViewer: (state,action : PayloadAction<string>) => {
        state.activeViewer = action.payload;
    },
    setPopupMenuDisplayMode :  (state,action : PayloadAction<any>) => {
        state.popupMenuDisplayMode = action.payload;
    },
    setCurrentUser : (state,action : PayloadAction<User | null>) => {
        state.currentUser = action.payload;
    },
    setSelectedReport : (state,action: PayloadAction<any>) => {
      state.selectedReport = action.payload;
    },
    setSelectedModel : (state,action: PayloadAction<any>) => {
        state.selectedModel = action.payload;
    },
    setReportType : (state,action: PayloadAction<any>) => {
        state.reportType = action.payload;
    },
    setNewReportName : (state,action: PayloadAction<string>) => {
        state.newReportName = action.payload;
    },
    setTogglePopout : (state,action : PayloadAction<any>) => {
        state.togglePopout = action.payload;
    },
    setCurrentReportId: (state,action : PayloadAction<any>) => {
        state.currentReportId = action.payload;
    },
    setCurrentRoleId: (state,action : PayloadAction<any>) => {
        state.currentRoleId = action.payload;
    },
    setPickAndMoveEnabled: (state, action) => {
        state.isPickAndMoveEnabled = action.payload;
      },
      resetPickAndMove: (state) => {
        state.isPickAndMoveEnabled = false;
        state.interactionMode = InteractionMode.DEFAULT;
      },

  },
});

//Define the Reducers
export const { setAppBarVisibility, 
                setFullscreenState, 
                setSidebarVisibility, 
                setSidebarActiveContent, 
                setDarkModeEnable,
                setPopupMenuActiveContent,
                setModelLoadedState,
                setModelLoadingStatus,
                setModelInfo,
                setLabelInsertionState,
                setSelectedLabelMode,
                addViewer,
                setActiveViewer,
                setPopupMenuDisplayMode,
                setCurrentUser,
                setSelectedReport,
                setSelectedModel,
                setReportType,
                setNewReportName,
                setTogglePopout,
                setCurrentReportId,
                setCurrentRoleId,
                setPickAndMoveEnabled,
                resetPickAndMove,
                setInteractionMode

            } = appSlice.actions;

//Define the Selectors
export const selectAppBarVisibility = (state : RootState) => state.app.isAppBarVisible;
export const selectFullscreenStatus = (state : RootState) => state.app.isFullscreenEnabled;
export const selectSidebarVisibility = (state : RootState) => state.app.isSideBarVisible;
export const selectSideBarActiveContent = (state : RootState) => state.app.sideBarActiveContent;
export const selectPopupMenuActiveContent = (state : RootState) => state.app.popupMenuActiveContent;
export const selectDarkModeEnable = (state : RootState) => state.app.isDarkModeEnable;
export const selectModelLoadedState = (state : RootState) => state.app.isModelLoaded;
export const selectModelLoadingStatus = (state : RootState) => state.app.modelLoadingStatus;
export const selectModelInfo = (state : RootState) => state.app.modelInfo;
export const selectModelName= (state : RootState) => {
    if(state.app.modelInfo && state.app.modelInfo.length > 0)
        return state.app.modelInfo[0].name
    return "";
};
export const selectInteractionMode = (state:RootState):InteractionMode => state.app.interactionMode;
export const selectLabelInsertState = (state:RootState):boolean => state.app.labelInsertState;
export const selectSelectedLabelInsertMode = (state:RootState):InteractionMode => state.app.selectedLabelInsertMode;
export const selectActiveViewerID = (state : RootState) => state.app.viewers[state.app.activeViewer  || ''];
export const selectPopupMenuDisplayMode= (state : RootState) => {
    const data = [...displayMenuItems];
    if(state.app.popupMenuDisplayMode){
        data.forEach( (item, index) =>{
            state.app.popupMenuDisplayMode.forEach((displayMode : any) =>{ 
                if(item.id === displayMode.id){
                    data[index] = {...item, ...displayMode}
                }
            });
        });
    }
    return data;
}
export const selectCurrentUser = (state : RootState) => state.app.currentUser;
export const togglePopout = (state : RootState) => state.app.togglePopout;
export const selectedReport = (state : RootState) => state.app.selectedReport;
export const selectedModel = (state : RootState) => state.app.selectedModel;
export const selectedCurrentReportId = (state : RootState) => state.app.currentReportId;
export const selectedCurrentRoleId = (state : RootState) => state.app.currentRoleId;
export const selectAppdisplayName = (state: RootState) => state.app.appDisplayName;
export const selectAppVersion = (state:RootState) => state.app.appVersion;
export default appSlice.reducer;