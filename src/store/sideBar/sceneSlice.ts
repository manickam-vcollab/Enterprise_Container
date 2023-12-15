import { createSlice, createAsyncThunk, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { mat4, vec3 } from "gl-matrix";
import { RootState } from "store";
import {
    getCameraInfo,
    getCameraStdViews,
    setCameraInfo,
    setCameraProjection,
} from "../../backend/viewerAPIProxy";
import {
    perspectiveToOrtho,
    orthoToPerspective,
  } from "../../components/utils/camera";
import { generateTitle} from "../../components/utils/titleGenerator"; 
import {CameraMode,BackgroundMode} from "store/defaultSlice";
import {setWindowPos} from '../windowMgrSlice'
import { undoStack } from "../../components/utils/undoStack";
import {rgbToHex} from '../../components/utils/colorConvertion';
import {  selectActiveTheme } from '../../store/sideBar/settings';


// Data types 
 type cameraView = {
    id:string,
    title:string,
    isUserDefined:boolean,
    cameraPosVector:any[],
    cameraDirVector:any[],
    cameraUpVector:any[],
    perspectiveFrustum:{
        yFOV:number,
        aspectRatio:number,
        farPlane:number,
        nearPlane:number
    },
    orthographicFrustum:{
        left:number,
        right:number,
        top:number,
        bottom:number,
        farPlane:number,
        nearPlane:number
    }
 }
 type activeCameraView = {
    id: string,
    title : string,
    isUserDefined : boolean,
    cameraMode : any,
    cameraPosVector :any [],
    cameraDirVector :any [],
    cameraUpVector  :any [], 
    perspectiveFrustum: {
        yFOV  : number,
        aspectRatio :number,
        farPlane : number,
        nearPlane  : number
    },
    orthographicFrustum: {
        left  : number,
        right  : number,
        top: number,
        bottom : number,
        farPlane : number,
        nearPlane  : number
    }  
 }
 type background = {
    colors:string[],
    imageFile:string,
    mode:BackgroundMode
 }
 type axisTriad =  {
    showAxis : boolean,
    position : {
        type:string,
        location :[number,number]
    },

 }
 export type sceneState = {
    userViews: cameraView[],
    activeCamera:activeCameraView,
    appliedView:string | null,
    background:background,
    axisTriad:axisTriad

 };



// Assign initial value 
const initialState:sceneState = {
    userViews :[],
    activeCamera:{
                id:`activeCamera_${nanoid()}`,
                title : "Active Camera",
                isUserDefined : true,
                cameraMode : CameraMode.PERSPECTIVE,
                cameraPosVector : [0.0416, -1.0719, -14.253],
                cameraDirVector : [0, 0, 1],
                cameraUpVector : [0, 1, 0], 
                perspectiveFrustum: {
                        yFOV  : 35,
                        aspectRatio :2.0931,
                        farPlane : 1000,
                        nearPlane  : 1
                },
                orthographicFrustum: {
                        left  : 100,
                        right  : 1000,
                        top : 100,
                        bottom : 100,
                        farPlane : 100,
                        nearPlane  : 1000
                }  
    },
    appliedView:'',
    background: {
                colors : ['#FFFFFF'],
                imageFile : "",
                mode : BackgroundMode.GRADIENT
                },
    axisTriad : {
                showAxis : true,
                position : {
                    type : 'windowPosition_top_left',
                    location : [ 0,0]
                }
                }
}

//camera apis
export const fetchCameraStdViews = createAsyncThunk(
  "scene/fetchCameraStdViews",
  async (data, { dispatch, getState }) => {
    const state = getState() as RootState;
    const viewerId = state.app.viewers[state.app.activeViewer || ""];
    let r: any[] = getCameraStdViews(viewerId);
    return r;
  }
);
// update camera move
export const fetchCameraMatrix = createAsyncThunk(
    "scene/fetchCameraMatrix",
    async (data, { dispatch, getState }) => {
      const state = getState() as RootState;
      const viewerId = state.app.viewers[state.app.activeViewer || ""];
      let cameraData: any = getCameraInfo(state.scene.activeCamera.cameraMode === CameraMode.PERSPECTIVE ? "PERSPECTIVE" : "ORTHOGRAPHIC", viewerId);
      const frustum = cameraData.frustum;

      return {
        id:state.scene.activeCamera.id,
        title:state.scene.activeCamera.title,
        isUserDefined:state.scene.activeCamera.isUserDefined,
        cameraMode:state.scene.activeCamera.cameraMode,
        cameraPosVector:[cameraData.pos[0],cameraData.pos[1],cameraData.pos[2]],
        cameraDirVector :[cameraData.dir[0],cameraData.dir[1],cameraData.dir[2]],
        cameraUpVector   :[cameraData.up[0],cameraData.up[1],cameraData.up[2]],
        perspectiveFrustum : {
          yFOV:frustum.fov,
          aspectRatio:frustum.aspect,
          farPlane:frustum.far ,
          nearPlane:frustum.near
        },
        
        orthographicFrustum :{
          left:state.scene.activeCamera.orthographicFrustum.left,
          right:state.scene.activeCamera.orthographicFrustum.right,
          top:state.scene.activeCamera.orthographicFrustum.top,
          bottom:state.scene.activeCamera.orthographicFrustum.bottom,
          farPlane:state.scene.activeCamera.orthographicFrustum.farPlane,
          nearPlane:state.scene.activeCamera.orthographicFrustum.nearPlane
        }
      } as activeCameraView
        
    }
);

// undo camera position
const undoSetCameraInfoAsync = createAsyncThunk(
    "scene/undoSetCameraInfoAsync",
    async (
      data: {
        id: string;
        callSetActive?: boolean;
        oldActivePresp?: any;
        oldActiveOrtho?: any;
      },
      { dispatch, getState }
    ) => {
      const state = getState() as RootState;
      const viewerId = state.app.viewers[state.app.activeViewer || ""];
  
      if (data.callSetActive) dispatch(setActiveCameraViewID(data.id));
  
      const { oldActivePresp, oldActiveOrtho } = data;
      let camData;
  
    //   if (data.id === -1)
    //     camData = {
    //       position: oldActivePresp?.pos,
    //       dir: oldActivePresp.dir,
    //       up: oldActivePresp?.up,
    //       perspective: oldActivePresp?.frustum,
    //       ortho: oldActiveOrtho?.frustum,
    //     };
  
    //   if (data.id !== -1) {
    //     const activeView = state.scene.cameraViews.find(
    //       (item) => item.id === data.id
    //     );
    console.log('state.settings.activeTheme',state.settings.activeTheme)
    const sceneData = state.defaultSlice.default.filter((item)=> item.name === 'Scene');
    const systemView = sceneData[0].cameraViews.filter((item) => item.id === data.id);
    const userView =   state.scene.userViews.filter((item) => item.id === data.id);
    const activeView = systemView.length > 0 ? state.scene.userViews.find((item) => item.id === data.id): sceneData[0].cameraViews.find((item) => item.id === data.id);

        camData = {
          position: [
            activeView?.cameraPosVector[0],
            activeView?.cameraPosVector[1],
            activeView?.cameraPosVector[2]
          ],
          dir: [
            activeView?.cameraDirVector[0],
            activeView?.cameraDirVector[1],
            activeView?.cameraDirVector[2],
          ],
          up: [
            activeView?.cameraUpVector[0],
            activeView?.cameraUpVector[1],
            activeView?.cameraUpVector[2],
          ],
          perspective: {
            fov: activeView?.perspectiveFrustum.yFOV,
            aspect: activeView?.perspectiveFrustum.aspectRatio,
            far: activeView?.perspectiveFrustum.farPlane,
            near: activeView?.perspectiveFrustum.nearPlane,
          },
          ortho: {
            left: activeView?.orthographicFrustum.left,
            right: activeView?.orthographicFrustum.right,
            top: activeView?.orthographicFrustum.top,
            bottom: activeView?.orthographicFrustum.bottom,
            far: activeView?.orthographicFrustum.farPlane,
            near: activeView?.orthographicFrustum.nearPlane
          },
        };
        setCameraInfo(camData,viewerId);
      }
    
);

// set camera position 
export const setCameraInfoAsync = createAsyncThunk(
    "scene/setCameraInfoAsync",
    async (
      data: {
        id: string;
        undoable?: boolean;
        isUserDefined?:boolean;
      },
      { dispatch, getState }
    ) => {
      const state = getState() as RootState;
      const viewerId = state.app.viewers[state.app.activeViewer || ""];
      const oldActiveId = state.scene.appliedView;
      //if (data.callSetActive) dispatch(setActiveId(data.id));
      const sceneData = state.defaultSlice.default.filter((item)=> item.name === 'Scene');
      let activeView:any
      if(data.id === "-1") {
        activeView = state.scene.activeCamera;

      } else {
        activeView = data.isUserDefined ? state.scene.userViews.find((item) => item.id === data.id): sceneData[0].cameraViews.find((item) => item.id === data.id);
      }

  
      const oldActivePresp = getCameraInfo("PERSPECTIVE", viewerId);
      const oldActiveOrtho = getCameraInfo("ORTHOGRAPHIC", viewerId);
  
      let camData = {
        position: [
          activeView?.cameraPosVector[0],
          activeView?.cameraPosVector[1],
          activeView?.cameraPosVector[2]
        ],
        dir: [
          activeView?.cameraDirVector[0],
          activeView?.cameraDirVector[1],
          activeView?.cameraDirVector[2]
        ],
        up: [
          activeView?.cameraUpVector[0],
          activeView?.cameraUpVector[1],
          activeView?.cameraUpVector[2]
        ],
        perspective: {
          fov: activeView?.perspectiveFrustum.yFOV,
          aspect: activeView?.perspectiveFrustum.aspectRatio,
          far: activeView?.perspectiveFrustum.farPlane,
          near: activeView?.perspectiveFrustum.nearPlane,
        },
        ortho: {
          left: activeView?.orthographicFrustum.left,
          right: activeView?.orthographicFrustum.right,
          top: activeView?.orthographicFrustum.top,
          bottom: activeView?.orthographicFrustum.bottom,
          far: activeView?.orthographicFrustum.farPlane,
          near: activeView?.orthographicFrustum.nearPlane,
        },
      };
      setCameraInfo(camData, viewerId);
      dispatch(sceneSlice.actions.setActiveCameraViewID(data.id));
      //dispatch(sceneSlice_New.actions.updateState({activeCamera:activeView}))
      dispatch(fetchCameraMatrix());
  
      if (data.undoable) {
        undoStack.add({
          undo: {
            reducer: undoSetCameraInfoAsync,
            payload: {
              id: oldActiveId,
              callSetActive: true,
              oldActiveOrtho,
              oldActivePresp,
            },
          },
          redo: {
            reducer: setCameraInfoAsync,
            payload: { id: data.id, callSetActive: true },
          },
        });
      }

    }
);

// set camera projection view
export const setProjectionAsync = createAsyncThunk(
    "scene/setProjectionAsync",
    async (
      data: { value:any; undoable?: boolean },
      { dispatch, getState }
    ) => {
      const state = getState() as RootState;
      const viewerId = state.app.viewers[state.app.activeViewer || ""];
      const oldValue = state.scene.activeCamera.cameraMode;
      setCameraProjection(data.value,viewerId);
      dispatch(sceneSlice.actions.updateActiveCameraMode(data.value === "PERSPECTIVE" ? CameraMode.PERSPECTIVE:CameraMode.ORTHOGRAPHIC));
  
      if (data.undoable) {
        undoStack.add({
          undo: { reducer: setProjectionAsync, payload: { value: oldValue } },
          redo: { reducer: setProjectionAsync, payload: { value: data.value } },
        });
      }
    }
);

// Viewpoints update
export const updateStateAsync = createAsyncThunk(
  "scene/updateStateAsync",
  async (data: Partial<sceneState>, { dispatch, getState }) => {
    const state = getState() as RootState;
    const viewerId = state.app.viewers[state.app.activeViewer || ""];
   
    await dispatch(sceneSlice.actions.updateState(data));
    if (data) 
      setCameraProjection(data.activeCamera?.cameraMode === CameraMode.PERSPECTIVE? "PERSPECTIVE":"ORTHOGRAPHIC", viewerId);
      if(data.axisTriad)
      dispatch(setWindowPos({uid:'axisTriadWindow',pos:data.axisTriad.position.location}));
    await dispatch(setCameraInfoAsync({ id: '-1', }));
    return data;
  }
);

export const updateSceneOldStateAsync = createAsyncThunk(
  "scene/updateSceneOldStateAsync",
  async (data: any, { dispatch, getState }) => {
    const {sceneState, windowMgrState} = data;
    let axisPos:[number,number] = [-1,-1];
    let axistriadAppliedPositionId:string = '';
    const state = getState() as RootState;
    const viewerId = state.app.viewers[state.app.activeViewer || ""];

    Object.values(windowMgrState.windows).filter((item:any)=> {
      if(item.id === 'axisTriadWindow') {
        axisPos = item.pos;
      }
     });

     sceneState.axisTriodList.forEach((item:any)=>{
       
        if(item.applied === true) {
          axistriadAppliedPositionId = item.id;
        }

     })


   
    await dispatch(sceneSlice.actions.updateOldState({sceneState,axisPos,axistriadAppliedPositionId}));
      setCameraProjection(sceneState.settings.projection,viewerId);
      dispatch(setWindowPos({uid:'axisTriadWindow',pos:axisPos}));
    await dispatch(setCameraInfoAsync({ id: '-1', }));
    return data;
  }
);

export const sceneSlice = createSlice({
    name: 'scene',
    initialState: initialState,
    reducers: {
    // updating camera mode     
        updateActiveCameraMode:(state,action:PayloadAction<CameraMode>)=>{
            state.activeCamera.cameraMode = action.payload
        },

    // set Active Camera View ID
        setActiveCameraViewID:(state,action:PayloadAction<string>)=>{
            state.appliedView = action.payload;
        },

    // add userDefined View     
        addCameraView:(state)=>{

            const cameraViewId: string = `camera_view_${nanoid()}`;
            let cameraViewTitle: string = ''
            if(state.userViews.length === 0) {
              cameraViewTitle = `Camera View 1`;
            } else {
              const filteredObj=state.userViews.filter((item)=>item.title.includes(`Camera View`))
              cameraViewTitle = generateTitle ('Camera View',filteredObj);
            }
            let activeCameraView =  state.activeCamera;
            let userDefinedCameraView:cameraView = {
                id:cameraViewId,
                title:cameraViewTitle,
                isUserDefined:true,
                cameraPosVector:activeCameraView.cameraPosVector,
                cameraDirVector:activeCameraView.cameraDirVector,
                cameraUpVector:activeCameraView.cameraUpVector,
                perspectiveFrustum:activeCameraView.perspectiveFrustum,
                orthographicFrustum:activeCameraView.orthographicFrustum
            };
            state.userViews.push(userDefinedCameraView);

        },
    // undo add camera view
        undoAddCameraView: (state, action: PayloadAction<{ id: string }>) => {
            state.userViews = state.userViews.filter(
              (item) => item.id !== action.payload.id
            );
        },
    
    // undo deleted camera view
        undoDeleteCameraView: (
            state,
            action: PayloadAction<{ cameraView: cameraView; index: number }>
          ) => {
            state.userViews.push(action.payload.cameraView);
        },

    // delete camera view
        deleteCameraView: (
            state,
            action: PayloadAction<{
            toDeleteItem: cameraView;
            undoable?: boolean;
            }>
        ) => {
            const indexOfDeletedCameraView = state.userViews.findIndex(
            (item) => item.id === action.payload.toDeleteItem?.id
            );
            const deletedCameraView = action.payload.toDeleteItem;
    
            sceneSlice.caseReducers.setActiveCameraViewID(state, {
            payload: '-1',
            type: "sceneSlice/setActiveId",
            });
            state.userViews = state.userViews.filter(
            (item) => item.id !== action.payload.toDeleteItem?.id
            );
    
            state.appliedView = '';
            if (action.payload.undoable) {
            undoStack.add({
                undo: {
                reducer: sceneSlice.caseReducers.undoDeleteCameraView,
                payload: {
                    cameraView: deletedCameraView,
                    index: indexOfDeletedCameraView,
                },
                },
                redo: {
                reducer: sceneSlice.caseReducers.deleteCameraView,
                payload: { toDeleteItem: deletedCameraView },
                },
            });
            }
        },

    // paste camera view
        pasteCameraView: (
            state,
            action: PayloadAction<{ data: cameraView; undoable?: true }>
            ) => {

            let clonedData = JSON.parse(JSON.stringify(action.payload.data));
            var text: string;
            let copycount = 0;

            text = clonedData.title + ' Copy'
        
            state.userViews.map((item) => {
        
                state.userViews.forEach((elemettext) => {
        
                if (elemettext.title.includes(text))
                    copycount++;
                {
                    if (copycount == 0) {
                    text = clonedData.title + ` Copy`
        
                    }
                    else {
                    text = clonedData.title + ` Copy (${copycount}) `
                    }
                }
        
                })
        
            });

            clonedData.id = `camera_view_${nanoid()}`;
            clonedData.title = text;
            clonedData.userDefined = true;
            state.userViews = [...state.userViews, clonedData];

            
            if (action.payload.undoable) {
                undoStack.add({
                undo: { reducer: sceneSlice.caseReducers.undoAddCameraView, payload: { id: clonedData.id } },
                redo: {
                    reducer: pasteCameraView,
                    payload: { data: action.payload.data },
                },
                });
    }

        },
          
    // Show and hide Axis Triad    
        setShowAxis : (state, action : PayloadAction<boolean>)=>{
            state.axisTriad.showAxis = action.payload
        },

    // Updating Triad position     
        setAppliedWindowPosition:(state, action:PayloadAction<string>)=>{
            state.axisTriad.position.type = action.payload
        },

    // Updating Triad Current XY position      
        setWindowCurrentLocation:(state,action:PayloadAction<[number,number]>)=>{
            state.axisTriad.position.location = action.payload
        },

    // Updating viewer background color    
        setBackgroundcolor:(state,action:PayloadAction<string[]>)=>{
            state.background.colors = action.payload;
            state.background.mode = BackgroundMode.GRADIENT;
            state.background.imageFile="";
        },

    // Updating viewer background image    
        updateBackgroundImage: (state, action:PayloadAction<any>) => {
            state.background.imageFile = action.payload;
            state.background.mode = BackgroundMode.IMAGE;
        },

    // update active camera edited datas    
        updateChange: (
            state,
            action: PayloadAction<{ data: cameraView; tab: CameraMode }>
          ) => {
            const { data, tab } = action.payload;
      
            // console.log("datta", data);
      
            const index = state.userViews.findIndex((item) => item.id === data.id);
            if (index > -1) {
              if (tab === CameraMode.PERSPECTIVE) {
                let fov = data.perspectiveFrustum.yFOV;
                let aspect = data.perspectiveFrustum.aspectRatio;
                let far = data.perspectiveFrustum.farPlane;
                let near = data.perspectiveFrustum.nearPlane;
                let orthoData = perspectiveToOrtho(fov, aspect, near, far);
      
                data.orthographicFrustum.left= orthoData.left;
                data.orthographicFrustum.right = orthoData.right;
                data.orthographicFrustum.top = orthoData.top;
                data.orthographicFrustum.bottom = orthoData.bottom;
                data.orthographicFrustum.farPlane = orthoData.far;
                data.orthographicFrustum.nearPlane = orthoData.near;
              } else {
                let left = data.orthographicFrustum.left
                let right = data.orthographicFrustum.right
                let top = data.orthographicFrustum.top
                let bottom = data.orthographicFrustum.bottom
                let far = data.orthographicFrustum.farPlane
                let near = data.orthographicFrustum.nearPlane
                let perspData = orthoToPerspective(
                  left,
                  right,
                  top,
                  bottom,
                  near,
                  far
                );
                data.perspectiveFrustum.yFOV = perspData.fov;
                data.perspectiveFrustum.aspectRatio = perspData.aspect;
                data.perspectiveFrustum.farPlane = perspData.far;
                data.perspectiveFrustum.nearPlane = perspData.near;
              }
              state.userViews[index] = { ...data };
            }
        },

        updateState: (state, action: PayloadAction<Partial<sceneState>>) => {
          const { payload } = action;
          if (payload.activeCamera) state.activeCamera = payload.activeCamera;
          if (payload.appliedView) state.appliedView = payload.appliedView;
          if (payload.axisTriad) state.axisTriad = payload.axisTriad;
          if (payload.background) state.background = payload.background;
          if (payload.userViews) state.userViews = payload.userViews;
    
        },
        updateBackground:(state, action:PayloadAction<string>)=>{
          if (action.payload==='1') {
            state.background.colors = ['#303030']
          } else {
            state.background.colors = ['#FFFFFF']
          }
            

        },
        updateOldState: (state,action:PayloadAction<{sceneState:any,axisPos:[number,number],axistriadAppliedPositionId:string}>) =>{
          const payload = action.payload.sceneState;
          let backgroundColor:any [] = [];

          state.activeCamera.cameraPosVector = [payload.activeCameraView.cameraPosition[0].value,payload.activeCameraView.cameraPosition[1].value,payload.activeCameraView.cameraPosition[2].value];
          state.activeCamera.cameraDirVector = [payload.activeCameraView.cameraDirection[0].value,payload.activeCameraView.cameraDirection[1].value,payload.activeCameraView.cameraDirection[2].value];
          state.activeCamera.cameraUpVector  = [payload.activeCameraView.cameraUp[0].value,payload.activeCameraView.cameraUp[1].value,payload.activeCameraView.cameraUp[2].value];
          state.activeCamera.orthographicFrustum.left = payload.activeCameraView.valueOrthographic[0].value;
          state.activeCamera.orthographicFrustum.right = payload.activeCameraView.valueOrthographic[1].value;
          state.activeCamera.orthographicFrustum.top = payload.activeCameraView.valueOrthographic[2].value;
          state.activeCamera.orthographicFrustum.bottom = payload.activeCameraView.valueOrthographic[3].value;
          state.activeCamera.orthographicFrustum.farPlane = payload.activeCameraView.valueOrthographic[4].value;
          state.activeCamera.orthographicFrustum.nearPlane = payload.activeCameraView.valueOrthographic[5].value;
          state.activeCamera.perspectiveFrustum.yFOV   = payload.activeCameraView.valuePerspective[0].value;
          state.activeCamera.perspectiveFrustum.aspectRatio = payload.activeCameraView.valuePerspective[1].value;
          state.activeCamera.perspectiveFrustum.farPlane    = payload.activeCameraView.valuePerspective[2].value;
          state.activeCamera.perspectiveFrustum.nearPlane   = payload.activeCameraView.valuePerspective[3].value;
          state.axisTriad.showAxis = payload.showAxis;
          state.appliedView = payload.settings.activeId.toString(); 

          payload.cameraViews.forEach((item:any)=>{
                
            if(item.userDefined === true) {

              let camData:cameraView = {

                id:item.id.toString(),
                title:item.name,
                isUserDefined:item.userDefined,
                cameraPosVector:[item.cameraDirection[0].value,item.cameraDirection[1].value,item.cameraDirection[2].value],
                cameraDirVector :[item.cameraDirection[0].value,item.cameraDirection[1].value,item.cameraDirection[2].value],
                cameraUpVector   :[item.cameraUp[0].value,item.cameraUp[1].value,item.cameraUp[2].value],
                perspectiveFrustum : {
                  yFOV:item.valuePerspective[0].value,
                  aspectRatio:item.valuePerspective[1].value,
                  farPlane:item.valuePerspective[2].value ,
                  nearPlane:item.valuePerspective[3].value
                },
                orthographicFrustum :{
                  left:item.valueOrthographic[0].value,
                  right:item.valueOrthographic[1].value,
                  top:item.valueOrthographic[2].value,
                  bottom:item.valueOrthographic[3].value,
                  farPlane:item.valueOrthographic[4].value,
                  nearPlane:item.valueOrthographic[5].value
                }
              }

              state.userViews.push(camData);

            }

          })

          payload.colorList.forEach((item:any)=>{
            let color:string = '';
            color = `rgba(${item.color.r},${item.color.g},${item.color.b},${item.color.a})`
            backgroundColor.push(rgbToHex(color)); 

          })
          
          state.background.colors = backgroundColor;
          state.background.imageFile = payload.file;
          if(payload.isImageActive === true){
            state.background.mode = BackgroundMode.IMAGE;
          }else{
            state.background.mode = BackgroundMode.GRADIENT;
          }

         state.axisTriad.position.location = action.payload.axisPos;

         switch(action.payload.axistriadAppliedPositionId) {
          case "1": 
              state.axisTriad.position.type = "windowPosition_top_right"
              break;
          case "2":
               state.axisTriad.position.type = "windowPosition_top_left"
              break;
          case "3":
              state.axisTriad.position.type = "windowPosition_middle_right"
              break;
          case "4":
              state.axisTriad.position.type = "windowPosition_middle_left"
              break;
          case "5":
              state.axisTriad.position.type = "windowPosition_bottom_left"
              break;
          case "6":
              state.axisTriad.position.type = "windowPosition_bottom_right"
              break;
          case "7":
              state.axisTriad.position.type = "windowPosition_top_center"
              break;
          case "8":
               state.axisTriad.position.type = "windowPosition_bottom_center"
               break;
          case "9":
              state.axisTriad.position.type = "windowPosition_custom"
              break;
          default:
              state.axisTriad.position.type = "windowPosition_top_left"
              break;
      }

        }
        
    },
    
    // extraReducer for updating active camera position
        extraReducers: (builder) => {
            builder.addCase(
                fetchCameraMatrix.fulfilled,
                (state, action: PayloadAction<activeCameraView>) => {
                const camInfo = action.payload;
                state.activeCamera = camInfo;
                }
            );
        }
        
})

// actions
export const {
    addCameraView,
    deleteCameraView,
    pasteCameraView,
    setShowAxis,
    setAppliedWindowPosition,
    setWindowCurrentLocation,
    setBackgroundcolor,
    updateBackgroundImage,
    setActiveCameraViewID,
    updateChange,
    updateBackground,
    updateState,} = sceneSlice.actions;

// selectors
export const selectShowAxis = (state:RootState) => state.scene.axisTriad.showAxis;
export const selectAppliedWindowPosition = (state:RootState) =>state.scene.axisTriad.position.type;
export const selectAppliedWindowLocation = (state:RootState) =>state.scene.axisTriad.position.location;
export const selectBackgroundcolor = (state:RootState) => state.scene.background.colors;
export const selectBackgrMode = (state:RootState) => state.scene.background.mode;
export const selectBackgroundImage = (state:RootState) => state.scene.background.imageFile;
export const selectActiveCameraView = (state:RootState) => state.scene.activeCamera;
export const selectAppliedCameraViewID = (state:RootState) => state.scene.appliedView;
export const selectUserView = (state:RootState) => state.scene.userViews;
export const selectCameraMatrix = (state: RootState) => {
  const activeCam = state.scene.activeCamera;
  let y = vec3.fromValues(
    activeCam.cameraUpVector[0],
    activeCam.cameraUpVector[1],
    activeCam.cameraUpVector[2]
  );
  let z = vec3.fromValues(
    activeCam.cameraDirVector[0],
    activeCam.cameraDirVector[1],
    activeCam.cameraDirVector[2]
  );
  let p = vec3.fromValues(
    activeCam.cameraPosVector[0],
    activeCam.cameraPosVector[1],
    activeCam.cameraPosVector[2]
  );
  let r = vec3.create();
  vec3.cross(r, z, y);
  return [...r, 0, ...y, 0, ...z, 0, ...p, 1];
};

export default sceneSlice.reducer;