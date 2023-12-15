import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { useState } from 'react';
import { addNodeReducer, checkNodeReducer, deleteNodeReducer } from '../shared/Tree/allReducer';
import { ITreeState } from '../shared/Tree/types';
import nextId from 'react-id-generator';
import { delete3DLabel as deleteAnimationAPI } from 'backend/viewerAPIProxy';
import { AnimationMode, AnimationType, IAnimation,Linear, AnimationSettings,ANIMATIONSTATE } from './shared/types';
import { AnimationTemplate } from "../../../components/sideBarContents/animations/pages/components/shared/Editor/common";
import {selectInteractionMode} from '../../../store/appSlice';
import interactionMode from '../../../backend/ViewerManager';
import { push } from 'connected-react-router/immutable';
import { Routes } from 'routes';
import { AnimationAllType } from './shared/types';

import { getDeformationValues, setAnimationData, startAnimation, stopAnimation, pauseAnimation, setAnimationScaleFactor } from 'backend/viewerAPIProxy';
// import {AnimationTemplate} from '../../../components/sideBarContents/animations/pages/components/shared/Editor/common.ts'

interface animationSettings extends AnimationSettings {
    defaultParameters : IAnimation,
    linearCount: number,
    eigenCount: number,
    transientCount: number,
    viewPointCount: number,
    
    
}


export interface InitialState extends ITreeState {
    data : {[id:string]:IAnimation},
    rootIds : string[],
    animationListSettings : animationSettings,
    editableNodeId: string,
    selectedAnimationType : number,
    
}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    animationListSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
                animationType: AnimationType.LINEAR,
                state: {
                    checked : false,
                    partiallyChecked : false,
                    expanded : true,
                    highlighted : false,
                    visibility : true,
                    selected: false,
                },
                attributes: {},               
                frames:16,
                slider:60,
                frameSlider:1,
                scaleFactor:1,
                animationState:ANIMATIONSTATE.STOPPED,
                isTitleEditable:false,
                
                
        },
        mode : AnimationMode.VIEW,
        linearCount:0,
        eigenCount: 0,
        transientCount: 0,
        viewPointCount: 0, 
        
    },
    editableNodeId:'',
    selectedAnimationType : 0
}

export const handleLinearCreation = createAsyncThunk(
    "AnimationAllSlice/handleLinearCreation",
    (data:{data: any},{dispatch,getState}) => {

            let idNew = nextId('linear')
            
            dispatch(createAnimation({id:idNew,pid:AnimationType.LINEAR,type:AnimationType.LINEAR,msg:JSON.stringify(AnimationTemplate)}));
            dispatch(push(Routes.ANIMATION_EDIT));
            dispatch(setEditableNodeId(idNew));
});

export const handleEigenCreation = createAsyncThunk(
    "AnimationAllSlice/handleEigenCreation",
(data:{data: any},{dispatch,getState}) => {

    let idNew = nextId('eigen')
        dispatch(createAnimation({id:idNew,pid:AnimationType.EIGEN,type:AnimationType.EIGEN,msg:JSON.stringify(AnimationTemplate)}));
        dispatch(push(Routes.ANIMATION_EDIT));
        dispatch(setEditableNodeId(idNew));

});

export const handleTransientCreation = createAsyncThunk(
    "AnimationAllSlice/handleTransientCreation",
    (data:{data: any},{dispatch,getState}) => {

        let idNew = nextId('transient')
            dispatch(createAnimation({id:idNew,pid:AnimationType.TRANSIENT,type:AnimationType.TRANSIENT,msg:JSON.stringify(AnimationTemplate)}));
            dispatch(push(Routes.ANIMATION_EDIT));
            dispatch(setEditableNodeId(idNew));

});

export const handleViewPointCreation = createAsyncThunk(
    "AnimationAllSlice/handleViewPointCreation",
    (data:{data: any},{dispatch,getState}) => {

        let idNew = nextId('viewPoint')
            dispatch(createAnimation({id:idNew,pid:AnimationType.VIEWPOINT,type:AnimationType.VIEWPOINT,msg:JSON.stringify(AnimationTemplate)}));
            dispatch(push(Routes.ANIMATION_EDIT));
            dispatch(setEditableNodeId(idNew));

});

export const handleSetFrameNumber = createAsyncThunk(
    "AnimationAllSlice/handleSetFrameNumber",
    (data:{data: any},{dispatch,getState}) => {
        let rootState = getState() as RootState;
        const state:any = rootState.animation;
        const editableNodeId = rootState.animation.editableNodeId;
        const updatedValue = data.data.data.frameNumber
            dispatch(setFrameSlider({animationFrameSliderId:editableNodeId,updatedValue:updatedValue}))
});
        
export const  updateStateAsync = createAsyncThunk(
    "AnimationAllSlice/updateStateAsync",
    async (data: any, { dispatch, getState }) => {
        const { animationState, colormap } = data; 
        await dispatch(AnimationAllSlice.actions.updateState(animationState));
        const rootState = getState() as RootState;

        let appliedStep = "";
        const appliedColorMapId = colormap?.appliedColorMapId;
        const colormapTreeData = colormap?.colormapTree?.data;
        if(colormapTreeData && appliedColorMapId && appliedColorMapId !== '-1' && appliedColorMapId in colormapTreeData)
            appliedStep = colormapTreeData[appliedColorMapId].step;
                
            
        const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
        stopAnimation(viewerId);
        
        if(appliedStep && appliedStep !== "")
        {                       
            const animationTreeState = rootState.animation;                 
            const animationData = animationTreeState.data; 
            Object.values(animationData).map(async (v) => {                        
                if(v.animationState === ANIMATIONSTATE.STARTED){
                    const selectedAnimationId : string = v.animationType;
                    const selectedFrameCount = v.frames;
                    const selectedAnimationSpeed = v.slider;
                    const selectedScaleFactor = v.scaleFactor;                               
                
                    let animationType = "NONE";
                    if(selectedAnimationId === AnimationAllType.LINEAR)
                        animationType = "LINEAR";
                    else if (selectedAnimationId === AnimationAllType.EIGEN)
                        animationType = "EIGENNONCOMPEX";
                
                    const animationSpeed  = 1000 / selectedAnimationSpeed;
                    const result = "Displacement";
                    const derivedType = "sixdof_tvec";                             
                    
                    await getDeformationValues(result, appliedStep, derivedType, viewerId)
                    .then(async (response) => {
                        await setAnimationData(animationType , selectedFrameCount, animationSpeed , viewerId);
                        await setAnimationScaleFactor([selectedScaleFactor, selectedScaleFactor, selectedScaleFactor],viewerId);
                        startAnimation(viewerId); 
                    });
                }  
            });
        }                  
});

export const deleteAnimation =  createAsyncThunk(
    "AnimationAllSlice/deleteAnimation",
    (data:{undoable?: boolean ,checkedNodes:string[]},{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.animation;
        let keys:string[] = [];
        let dataList : any[] = [];

        let nodesToDelete = data.checkedNodes;

        nodesToDelete.forEach((nodeID)=> {

            let animationNode = state.data[nodeID];

            if(animationNode.children.length > 0) {

                animationNode.children.forEach((nodeID)=> {

                    deleteAnimationAPI(nodeID,viewerId);
                    dispatch(AnimationAllSlice.actions.deleteLabel({keys:nodeID}));

                })


            }

            deleteAnimationAPI(nodeID,viewerId);
            dispatch(AnimationAllSlice.actions.deleteLabel({keys:nodeID}));
        

        })

    }
);

export const AnimationAllSlice = createSlice({
    name: "animation",
    initialState : initialState,
    reducers: {
            checkNode: checkNodeReducer,
            setEditableNodeId:(state, action:PayloadAction<any>) =>{
                state.editableNodeId = action.payload;
            },
            setFrames:(
                state,
                action: PayloadAction<{ animationFrameId: string; updatedValue: any }>
            )=>{
                state.data[action.payload.animationFrameId].frames = action.payload.updatedValue
            },
            setSlider:(
                state,
                action: PayloadAction<{ animationSliderId: any; updatedValue: number }>
            )=>{
                state.data[action.payload.animationSliderId].slider = action.payload.updatedValue
            },
            setFrameSlider:(
                state,
                action: PayloadAction<{ animationFrameSliderId: any; updatedValue: number }>
            )=>{
                state.data[action.payload.animationFrameSliderId].frameSlider = action.payload.updatedValue
            },
            setScaleFactor:(
                state,
                action: PayloadAction<{ animationFrameId: string; updatedValue: any }>
            )=>{
                state.data[action.payload.animationFrameId].scaleFactor = action.payload.updatedValue
            },
            setAnimationStates:(
                state,
                action: PayloadAction<{ animationStateId: any; updatedValue: number }>
            )=>{
                if(state.data.hasOwnProperty(action.payload.animationStateId))
                    state.data[action.payload.animationStateId].animationState = action.payload.updatedValue
            },
            createAnimation : (state , action: PayloadAction<{pid:string,id:string,type:AnimationType,msg:string}>) => {
                            
                const {id,pid,msg} = action.payload;
                let newNote:any = {...state.animationListSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                // newNote.anim = msg;
                newNote.isTitleEditable = false;
                if(newNote.pid === AnimationType.LINEAR){
                    state.animationListSettings.linearCount+= 1;
                    newNote.title = `Linear ${state.animationListSettings.linearCount}`;
                    newNote.animationType = AnimationType.LINEAR
                }
                if(newNote.pid === AnimationType.EIGEN){
                    state.animationListSettings.eigenCount+= 1;
                    newNote.title = `Eigen Vector ${state.animationListSettings.eigenCount}`;
                    newNote.animationType = AnimationType.EIGEN
                }
                if(newNote.pid === AnimationType.TRANSIENT){
                    state.animationListSettings.transientCount+= 1;
                    newNote.title = `Transient ${state.animationListSettings.transientCount}`;
                    newNote.animationType = AnimationType.TRANSIENT
                }
                if(newNote.pid === AnimationType.VIEWPOINT){
                    state.animationListSettings.viewPointCount+= 1;
                    newNote.title = `View Point ${state.animationListSettings.viewPointCount}`;
                    newNote.animationType = AnimationType.VIEWPOINT
                }



                addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});

            },
            deleteLabel: (state, action: PayloadAction<{keys:string}>) => {
                let keys = action.payload.keys;
    
                deleteNodeReducer(state, {payload:{nodeId:keys},type:'string'})
                // keys.forEach(k => {
                   
                // })
            },
            updateState:(state,action:PayloadAction<any>)=>{
                const { payload } = action; 
                state.rootIds=payload.rootIds;
                let clone = {...payload.data} 
                  Object.keys(clone).forEach((i:any)=>{
                   
                   if(clone[i].animationState === ANIMATIONSTATE.STARTED)
                   {
                    clone[i] = {
                        ...clone[i],
                        state:{
                          ...clone[i].state,
                      checked: true,
                        }
                      
                    }
                }
                
                   })
                state.data=clone;
                state.animationListSettings=payload.animationListSettings;
                state.editableNodeId = payload.editableNodeId;  
            },
            setIsTitleEditable:(state,action:PayloadAction<{nodeId:string,isEditable:boolean}>)=> {
                const {nodeId,isEditable} = action.payload;
                state.data[nodeId].isTitleEditable = isEditable;
            },
            setNewTitle:(state,action:PayloadAction<{nodeId:string,newTitle:string}>)=>{ 
            const {nodeId,newTitle} = action.payload;
            state.data[nodeId].title = newTitle;
        
            },
            setSelectedAnimationType: (state, action:PayloadAction<number>) => {
                state.selectedAnimationType = action.payload;
            },
            updatePlayState:(state, action:PayloadAction<{editableNodeId:string}>) =>{
                const SelectedNodeId:string = action.payload.editableNodeId;
                Object.values(state.data).forEach((item)=>{
                    if(item.id === SelectedNodeId){
                        state.data[item.id].animationState = ANIMATIONSTATE.STARTED;
                    }
                    else if(item.animationState !== ANIMATIONSTATE.PAUSED) {
                        state.data[item.id].animationState = ANIMATIONSTATE.STOPPED;
                    }
                })
                
            },
        },
    })

export default AnimationAllSlice.reducer;

export const {
    createAnimation,    
    checkNode,
    setEditableNodeId,
    setFrames,
    setSlider,
    setFrameSlider,
    setScaleFactor,
    setAnimationStates,
    setIsTitleEditable,
    setNewTitle,
    setSelectedAnimationType,
    updatePlayState
}= AnimationAllSlice.actions;

//selectors


export const selectRootIds = (state:RootState) => state.animation.rootIds;

export const selectLabelData = (state:RootState) => state.animation.data;

export const selectEditableNodeId = (state:RootState) => state.animation.editableNodeId;

export const selectFrames = (state:RootState) => state.animation.animationListSettings.defaultParameters.frames;

export const selectScaleFactor = (state:RootState) => state.animation.animationListSettings.defaultParameters.scaleFactor;
export const selectSlider = (state:RootState) => state.animation.animationListSettings.defaultParameters.slider;

export const selectAnimationState = (state:RootState) =>
{
    let animationStateData:any[] = [];
    Object.keys(state.animation.data).forEach(key => {

        animationStateData.push(state.animation.data[key].animationState)
    })
    return animationStateData

}
//  state.animation.animationListSettings.defaultParameters.animationState;

export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.animation.data).forEach(key => {
        if (state.animation.data[key].state.checked === true)
            if(state.animation.data[key].pid === "-1" )
                return null
            else
                array.push(key)
     })

     return (array.length);
}

export const selectCheckedNodeForALLLabelType = (state:RootState) => {

    let checkedAllAnimationNodesID:any[] = [];

    Object.keys(state.animation.data).forEach(key => {

            if(state.animation.data[key].state.checked === true && state.animation.data[key].state.partiallyChecked === false)  {
                          
                checkedAllAnimationNodesID.push(state.animation.data[key].id);
    
            }
            else {

                state.animation.data[key].children.forEach((childID)=>{


                  if(state.animation.data[childID].state.checked === true) {

                    checkedAllAnimationNodesID.push(childID);
                  }

                })
            }


    })

    return checkedAllAnimationNodesID
}

export const selectedAnimationType = (state:RootState) => state.animation.selectedAnimationType;
