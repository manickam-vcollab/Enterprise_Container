import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
// import {
//   Scenes as Scene,
//   updateStateAsync as updateSceneStateAsync,
// } from "./sideBar/sceneSlice";
import {
  sceneState as scene,
  updateStateAsync as updateSceneStateAsync,
  updateSceneOldStateAsync
} from "./sideBar/sceneSlice";
import {
  planes as ClipPlane,
  updateStateAsync as updateClipPlaneStateAsync,
} from "./sideBar/clipSlice";
import {
  ProductTreeState as ProductTree,
  updateStateAsync as updateProductTreeStateAsync,
  updatePickandMoveState
} from "./sideBar/productTreeSlice";
import windowMgrSlice, {
  WindowMgrState,
  updateState as updateWindowState,
} from "./windowMgrSlice";

import {
  contourplotState as ContourPlot,
  updateStateAsync as updateContourplotStateStateAsync,
} from "./sideBar/contourplotSlice";
import {updateStateAsync as updateLabelStateAsync,deleteAllLabelsAsync } from './sideBar/labelSlice/AllLabelSlice';
import { deleteAllLineChartDataAsync, updateAllLineChartDataAsync } from './chartSlice';
import { deleteAllLineChartDataAsync as deleteAllLineChart3DDataAsync , updateAllLineChartDataAsync as updateAllLineChart3DDataAsync } from './chart3DSlice';
import { InitialState as Animation, updateStateAsync as updateAnimationStateAsync } from "./sideBar/AnimationSlice/AllAnimationSlice";
import { CAEResultState as caeData ,updateStateAsync as updateCaeStateAsync } from "./caeResultSlice";
import { InitialState as ColorMap ,updateStateAsync as updateColorMapStateAsync } from "./sideBar/colormapSlice";
import {setisCircularProgress,applyView, setSelectedSlideId,setSelectedSlideListEmpty} from "./sideBar/slideSlice";
import { updateView } from "../services/ServerConnector";
import { toastMsg } from "./toastSlice";
import { updateMessage,finishMessage } from "./sideBar/messageSlice";
import toastMessage from '../components/sideBarContents/messages/toastMessage.json';
type Viewpoint = {
  uid: string;
  version:string;
  scene: Partial<scene>;
  productTree: Partial<ProductTree>;
  windowMgr: Partial<WindowMgrState>;
  clipPlane: Partial<ClipPlane>;
  //contourplot: Partial<ContourPlot>;
  labels:any;
  chart :any;
  chart3D : any;
  animation:Partial<Animation>;
  caedata:Partial<caeData>;
  colormap:Partial<ColorMap>;
};

type ViewpointState = {
  viewpoints: Viewpoint[];
};
const initialState: ViewpointState = {
  viewpoints: [],
};

export const captureViewpointAsync = createAsyncThunk(
  "viewpoint/captureViewpointAsync",
  async (data: { id: string }, { dispatch, getState }) => {
    await dispatch(updatePickandMoveState());
    let rootState = getState() as RootState;
    const { productTree, windowMgr, clipPlane, contourplot,label , chart, chart3D,animation,caeResult,colormap,scene } = rootState;
    
    let windows:any = {};
    if(windowMgr && windowMgr.windows){
      if(windowMgr.windows["colorPlotWindow"])
        windows.colorPlotWindow = windowMgr.windows["colorPlotWindow"];
      if(windowMgr.windows["axisTriadWindow"])
        windows.axisTriadWindow = windowMgr.windows["axisTriadWindow"];
      if(windowMgr.windows["LogoWindow"])
        windows.LogoWindow = windowMgr.windows["LogoWindow"];

      // for (const key in windowMgr.windows) {
      //   if(windowMgr.windows[key]){
      //     windows[key]=windowMgr.windows[key];
      //   }
      // }
    }

    let viewpoint: Viewpoint = {
      uid: data.id,
      version:'0.1',
      scene : {
        userViews:scene.userViews,
        activeCamera:scene.activeCamera,
        appliedView:scene.appliedView,
        background:scene.background,
        axisTriad:scene.axisTriad
      },
      productTree: {
        rootIds: productTree.rootIds,
        data: productTree.data,
      },
      windowMgr: {
        isEnabled: windowMgr.isEnabled,
        activeLayers: windowMgr.activeLayers, //windowMgr.windows,
        windowsCount: Object.keys(windows).length, //windowMgr.windowsCount,
        windows: windows,       
      },
      clipPlane: {
        colors: clipPlane.colors,
        planes: clipPlane.planes,
        settings: clipPlane.settings,
      },

      /*
      contourplot: {
        caeResult: contourplot.caeResult,
        selectedVariableId: contourplot.selectedVariableId,
        selectedDerivedTypeId: contourplot.selectedDerivedTypeId,
        selectedStepId: contourplot.selectedStepId,
      },*/
      labels:{
        data: label.data,
        rootIds: label.rootIds,
        labelsListSettings:label.labelsListSettings,
        editableNodeId: label.editableNodeId,
        selectionPointerId:label.selectionPointerId,
        dropDownItemIndex : label.dropDownItemIndex,
        routerHistory:label.routerHistory,
        colorsApplyTo: label.colorsApplyTo
      },
      chart :{
        lineChartDataList: chart.lineChartDataList,
      },
      chart3D : {
        lineChartDataList: chart3D.lineChartDataList,
        editDataList: chart3D.editDataList,
      },
      animation:{
        data : animation.data,
        rootIds : animation.rootIds,
        animationListSettings : animation.animationListSettings,
        editableNodeId: animation.editableNodeId,
      },
      caedata: {
        data: caeResult.data,
        rootIds: caeResult.rootIds,
        caeData: caeResult.caeData,
        variablesRootIds:caeResult.variablesRootIds,
        stepsRootIds:caeResult.stepsRootIds,
        derivedTypeRootIds:caeResult.derivedTypeRootIds
      },
      colormap:{

        colormapTree: colormap.colormapTree,
        colormapSettings: colormap.colormapSettings,
      
        colorPaletteTree: colormap.colorPaletteTree,
        colorPaletteSettings: colormap.colorPaletteSettings,
      
        selectedColorMapId: colormap.selectedColorMapId,
        appliedColorMapId: colormap.appliedColorMapId,
        selectedColorPaletteId: colormap.selectedColorPaletteId,
        showAxis: colormap.showAxis,
        legendTitle: colormap.legendTitle,
        paletteType: colormap.paletteType,
        direction: colormap.direction,
        ticPosition: colormap.ticPosition,
        titlePlacement: colormap.titlePlacement,
        valuePlacement: colormap.valuePlacement,
        legendList: colormap.legendList,
        resultMinMax : colormap.resultMinMax,
        isCAEDataChange:colormap.isCAEDataChange,
        isLegendEnable:colormap.isLegendEnable,
        isColorSetValueChanged:colormap.isColorSetValueChanged

      }

    };
    await dispatch(viewpointSlice.actions.saveViewpoint(viewpoint));
    updateViewpointOnServer(getState() as RootState);
   
    
  }
);

export const applyViewpointAsync = createAsyncThunk(
  "viewpoint/applyViewpoint",
  async (data: { id: string, name:any }, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const allWindows = JSON.parse(JSON.stringify(rootState.windowMgr.windows));
    const { viewpoint } = rootState;
    const selected = viewpoint.viewpoints.find((e) => e.uid === data.id);
    if (selected) {                                                             

      await dispatch(deleteAllLabelsAsync({}));      
      await dispatch(deleteAllLineChartDataAsync({}));     
      await dispatch(deleteAllLineChart3DDataAsync({}));
      await dispatch(setSelectedSlideListEmpty());
      
      const treeState = selected.productTree;
      //const sceneState = selected.scene;
      const sceneState = selected.scene;
      const clipState = selected.clipPlane;
      const windowMgrState = selected.windowMgr;
      //const contourState = selected.contourplot;
      const labelState = selected.labels;
      const chartState = selected.chart;
      const chart3DState = selected.chart3D;
      const animationState = selected.animation;
      //const caeState = selected.caedata;
      const colormap = selected.colormap;

      if(sceneState.activeCamera){
        await dispatch(updateSceneStateAsync(sceneState)); 
      }else{
        await dispatch(updateSceneOldStateAsync({sceneState,windowMgrState})); 
      }
       //done
      await dispatch(updateProductTreeStateAsync(treeState));   //done     
      await dispatch(updateClipPlaneStateAsync(clipState));     //done
      await dispatch(updateWindowState(windowMgrState));        //done   
      await dispatch(updateColorMapStateAsync(colormap));       //done
      //dispatch(updateContourplotStateStateAsync(contourState));    
      
      await dispatch(updateAllLineChart3DDataAsync({ chart3DState}));
      let hotspotlabels : Array<any> = []; 
      let  labelStateCloned = JSON.parse(JSON.stringify(labelState));      
      labelStateCloned.rootIds = labelState.rootIds.filter((id : string) => id in labelState.data); //remove invalid ids
      Object.keys(labelStateCloned.data).forEach( (labelId : string) => {
        if(labelStateCloned.data[labelId]?.type === 'HOTSPOTPARENT'){
          labelStateCloned.data[labelId].children.forEach((cid :string) => {
            hotspotlabels.push(JSON.parse(JSON.stringify(labelStateCloned.data[cid])));
            delete labelStateCloned.data[cid];
          });
          labelStateCloned.data[labelId].children = [];
        }
      });  
      await dispatch(updateLabelStateAsync({ labelState : labelStateCloned , hotspotlabels }));  
      await dispatch(updateAllLineChartDataAsync({ chartState})); 
      //await dispatch(updateCaeStateAsync(caeState));
      await dispatch(updateAnimationStateAsync({animationState, colormap}));  //done
     
      updateViewpointOnServer(getState() as RootState);
      if(data.name === undefined){
        await dispatch(toastMsg({msg:""}))
      }
      else {

      await dispatch(toastMsg({msg:`Slide applied - ${data.name}`}))
      dispatch(updateMessage({id:data.id, transferredSize:'Unknown'}))
      setTimeout(()=>{
        dispatch(finishMessage({id:data.id})) 
        dispatch(setisCircularProgress(false));
      },2000)
      
      dispatch(applyView(data.id));
      dispatch(setSelectedSlideId({tocheck:true,slideID:data.id}))
      }
      
    }
  }
);

export const deleteViewpointAsync = createAsyncThunk(
  "viewpoint/deleteViewpointAsync",
  async (data: { id: string }, { dispatch, getState }) => {
    await dispatch(viewpointSlice.actions.removeViewPoint({ id: data.id }));
    updateViewpointOnServer(getState() as RootState);
  }
);

export const updateViewpointOnServer = (rootState : RootState) => {
  let vpData = {
    slide: {
      data: rootState.slide.data,
      rootIds: rootState.slide.rootIds,
      viewpathCounter: rootState.slide.viewpathCounter,
      viewpointCounter: rootState.slide.viewpointCounter,
      appliedSlide: rootState.slide.appliedSlide,
      selectedSlide: rootState.slide.selectedSlide,
    },
    viewpoint: {
      viewpoints :rootState.viewpoint.viewpoints
    },
  };
  //console.log(vpData);
  const data = {"views": vpData};
  if(rootState.app.currentReportId !== "")
    updateView(rootState.app.currentReportId,data);
    
}

const viewpointSlice = createSlice({
  name: "viewpoint",
  initialState,
  reducers: {
    saveViewpoint: (state, action: PayloadAction<Viewpoint>) => {   
      const objFound=state.viewpoints.some((key)=> key.uid===action.payload.uid)
      if(objFound)
      {
        const index=state.viewpoints.findIndex((key)=>{ return key.uid === action.payload.uid })
        state.viewpoints.splice(index,1,action.payload)
      }
      else{
          state.viewpoints.push(action.payload)
      }            
    }, 
    removeViewPoint: (state, action: PayloadAction<{ id: string }>) => {
      const idx = state.viewpoints.findIndex((e) => e.uid === action.payload.id);
      state.viewpoints.splice(idx, 1);
    },
    updateViewpoint : (state, action: PayloadAction<Viewpoint[]>) => {
      state.viewpoints = action.payload;
    }
  },
});
export const {saveViewpoint, updateViewpoint, removeViewPoint } = viewpointSlice.actions
export const selectViewPoint =(state:RootState)=> state.viewpoint;

export default viewpointSlice.reducer;
