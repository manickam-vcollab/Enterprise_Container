import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type tourVisitedState = {
    assemblyTree?:boolean,
    clipPlanes?:boolean,
    displayModes?:boolean,
    guides?:boolean,
    history?:boolean,
    menus?:boolean,
    appVisited?:boolean
}

// const tourVisited:tourVisitedState ={
//     assemblyTree:false,
//     clipPlanes:false,
//     displayModes:false,
//     guides:false,
//     history:false,
//     menus:false,
//     appVisited:false
// }

const initialState = {
    tourVisited:undefined,
    isTourVisitable:true
}

export const tourStateSlice = createSlice({
    name:'tourState',
    initialState,
    reducers: {
        setAppVisitedState:(state:any, action:PayloadAction<{appVisited:boolean}>) => {
            state.tourVisited ?  state.tourVisited.appVisited = action.payload.appVisited :  state.tourVisited = action.payload;
        },
        setAssemblyTreeState:(state:any, action:PayloadAction<{assemblyTree:boolean}>) => {
            state.tourVisited.assemblyTree =action.payload.assemblyTree;
        },
        setClipPlanesState:(state:any, action:PayloadAction<{clipPlanes:boolean}>) => {
            state.tourVisited.clipPlanes =action.payload.clipPlanes;
        },
        setDiaplayModesState:(state:any, action:PayloadAction<{displayModes:boolean}>) => {
            state.tourVisited.displayModes =action.payload.displayModes;
        },
        setGuidesState:(state:any, action:PayloadAction<{guides:boolean}>) => {
            state.tourVisited.guides =action.payload.guides;
        },
        setHistoryState:(state:any, action:PayloadAction<{history:boolean}>) => {
            state.tourVisited.history =action.payload.history;
        },
        setIsTourVisitableState:(state:any, action:PayloadAction<{isTourVisitable:boolean}>) => {
            state.isTourVisitable = action.payload.isTourVisitable;
        },
        setMenusState:(state:any, action:PayloadAction<{menus:boolean}>) => {
            state.tourVisited.menus =action.payload.menus;
        },
        setTourVisitedState:(state:any, action:PayloadAction<{tourVisited:tourVisitedState}>) => {
            state.tourVisited = action.payload.tourVisited;
        },
    }
})

export const {setTourVisitedState, setAssemblyTreeState, setClipPlanesState, setDiaplayModesState, setGuidesState, setHistoryState, setIsTourVisitableState, setMenusState, setAppVisitedState} = tourStateSlice.actions;

export const getTourVisitedState = (state:RootState) =>{ return state.tourState.tourVisited?state.tourState.tourVisited:null};

export const getIsTourVisitableState = (state:RootState) =>state.tourState.isTourVisitable;

export default tourStateSlice.reducer;