import { createSlice,createAsyncThunk, PayloadAction ,applyMiddleware} from '@reduxjs/toolkit';
import {add3DLabel,delete3DLabel as delete3DLabelApi, get3DLabelCanvasPos, probe, getLabel3DInfo, addMeasurementLabel} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {LabelMode, Label2D, LabelSettings, Label2DType, LabelType, ILabel, Label3DType, Label3D,LabelChartType,ImageStyle} from './shared/types';
import { setLabelModeReducer } from './shared/reducers';
import {ITreeState} from "../shared/Tree/types";
import {   
    selectCheckedLeafNodes as selectCheckedLeafNodesTree, 
    selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree
} from 'store/sideBar/shared/Tree/selectors';
import { traverseNode } from '../shared/Tree/helpers'
import {
    saveTreeReducer, 
    checkNodeReducer, 
    highlightNodeReducer,
    addNodeReducer,
    deleteNodeReducer, 
    invertNodeReducer, 
    expandNodeReducer, 
    toggleVisibilityReducer, 
    setCheckedVisibilityReducer, 
    invertCheckedVisibilityReducer,
    regroupReducer} from "../shared/Tree/allReducer";
import nextId from 'react-id-generator';
import { selectInteractionMode } from 'store/appSlice';
import { InteractionMode } from 'backend/ViewerManager';
import {
    
    setHighlightedNodes,
    getHotspotData,
    add3dLabelforNodeIndex,
    showHideLabelVisibility
  
  } from "../../../backend/viewerAPIProxy";
import { Label2DTemplate, Label3DTemplate, LabelProbeTemplate } from 'components/sideBarContents/labels/components/shared/Editor/commonSlatejs';

import {Routes} from '../../../routes/index'
import {goBack,push} from 'connected-react-router/immutable';

import {undoStack} from "../../../components/utils/undoStack"
import { AnyArray } from 'immer/dist/internal';
import {data, firstThreeLineChartData, lastThreeLineChartData } from 'components/shared/lineChart/data';
import { deleteCoOrdinate, deleteLineChartData, setChartData, setCoOrdinate } from 'store/chartSlice';
import { delete3DChartData, delete3DChartEditData, set3DChartData } from 'store/chart3DSlice';
import { batch} from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { setWindowPos,setWindowSize } from '../../windowMgrSlice';
import { arrangeLabel } from "store/windowMgrSlice";
export const windowPrefixId = "Label2D";
export const windowPrefixIdChart = "CHART3D";


export enum ColorSelection {
    BACKGROUND,
     FONT,
    BORDER,
    BACKGROUNDIMAGE
   }

interface labelSettings extends LabelSettings {
    defaultParameters : ILabel,
    count2D: number,
    count2DChart: number,
    count3DChart: number,
    countPoint : number,
    countFace : number,
    countMeasurementP2P : number,
    countMeasurementARC:number,
    chartLeafCount : number,
    chart3DLeafCount : number,
    probeLeafCount : number,
    hotspotCount:number,
    faceLeafCount : number,
    distanceLeafCount : number,
    arcLeafCount : number,

} 

interface InitialState extends ITreeState {
    data : {[id:string]:ILabel},
    rootIds : string[],
    labelsListSettings : labelSettings,
    editableNodeId: string,
    selectionPointerId: string,
    dropDownItemIndex:number,
    routerHistory : string,
    colorsApplyTo: ColorSelection,
        hotspotData:[{
        id:string,
        checked:boolean,
        labelName:string,
        labelValue:number
    },
    {
        id:string,
        checked:boolean,
        labelName:string,
        labelValue:number
    },
    {
        id:string,
        checked:boolean,
        labelName:string,
        labelValue:number
    },
    {
        id:string,
        checked:boolean,
        labelName:string,
        labelValue:number
    }],
    searchHints: { [id: string]: any };
    prevSearches: { [id: string]: any };
    searchQuery: string;
    searchResults: any[];
    hotspotCircularProgress : boolean;
    arrangeLabelstatus:boolean;
    popoutLabelBorderColor:string;
    popoutLabelBorderPreviousColor:string;
    backgroundPreviousColor:string;
    backgroundPreviousImage: any;

}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    labelsListSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
                labelType: LabelType.LABEL2D,
                pos:[0,0], 
                size:[100,30],
                autoPosition:true,
                attachPartVisibility:true,
                state: {
                    checked : false,
                    partiallyChecked : false,
                    expanded : true,
                    highlighted : false,
                    visibility : true,
                    selected: false,
                },
                attributes: {}, 
                label: "Lorem ipsum dolor sit amet",
                bgColor: '#ffffff',
                childLabelCount:0,
                color:"#000000",
                borderColor:"#000000",
                isBorderEnabled: true,
                isBackgroundEnabled: true,
                 file: null,
                 isImageActive:false,
                 isTitleEditable:false,
                 imageStyle:ImageStyle.TILE
        },
        mode: LabelMode.VIEW,
        count2D: 0,
        count2DChart :0,
        count3DChart: 0,
        countPoint : 0,
        countFace : 0,
        countMeasurementP2P : 0,
        countMeasurementARC:0,
        chartLeafCount : 0,
        chart3DLeafCount : 0,
        probeLeafCount : 0,
        hotspotCount : 0,
        faceLeafCount :0,
        distanceLeafCount : 0,
        arcLeafCount : 0 ,
    },
    editableNodeId:'',
    selectionPointerId:'',
    dropDownItemIndex : 0,
    routerHistory:'',
    colorsApplyTo: ColorSelection.BACKGROUND,
        hotspotData:[{
        id:"hotspot1",
        checked:false,
        labelName: "Min",
        labelValue:0

          },
          {
            id:"hotspot2",
            checked:false,
            labelName: "Max",
            labelValue:0
    
          },
          {
            id:"hotspot3",
            checked:false,
            labelName: "Top",
            labelValue:0
    
          },
          {
            id:"hotspot4",
            checked:false,
            labelName: "Bottom",
            labelValue:0
    
          }
        ],
    searchHints: {},
    prevSearches: {},
    searchQuery: "",
    searchResults: [],
    hotspotCircularProgress:false,
    arrangeLabelstatus:true,
    popoutLabelBorderColor:'#FF0000',
    popoutLabelBorderPreviousColor:'',
    backgroundPreviousColor:'',
    backgroundPreviousImage:''
}

export const init = createAsyncThunk(
    "labelSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.label.rootIds;
        if(treeRootIds.length === 0) {
            //  dispatch(createParentLabel({id:LabelType.LABEL2D,name:"Notes", pid:"-1"}));
            // dispatch(createParentLabel({id:LabelType.LABEL3D,name:"3D Labels",pid:"-1"}));
            // dispatch(createParentLabel({id:LabelType.MEASUREMENT,name:"Measurements",pid:"-1"}));

            // dispatch(createParentLabel({id:Label3DType.PROBE,name:"Point",pid:LabelType.LABEL3D}))
            // dispatch(createParentLabel({id:Label3DType.FACE,name:"Face",pid:LabelType.LABEL3D}))

            // dispatch(createParentLabel({id:Label3DType.DISTANCE ,name:"Point to Point",pid:LabelType.MEASUREMENT}));
            // dispatch(createParentLabel({id:Label3DType.ARC, name:"3 Point Arc Length",pid:LabelType.MEASUREMENT}));
          }
    }
)

// const RedoHandleLabel2DCreation =  createAsyncThunk(
//     "labelSlice/handleLabel2DCreation",
//     (data:{data: any , undoable?:boolean , id?: string },{dispatch,getState}) => {
//         let rootState = getState() as RootState;
        
//         let e = data.data.data as PointerEvent;
//             let pos = [e.offsetX,e.offsetY];
//             console.log("e",e);
//             let idNew = data.id? data.id : nextId('label-2d')
//             dispatch(createLabel({id:idNew,pid:LabelType.LABEL2D,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:JSON.stringify(Label2DTemplate)}));

//               if(data.undoable) {
//             undoStack.add(
//               {
//                 undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelType.LABEL2D,}},
//                 redo: {reducer: handleLabel2DCreation, payload:{id:idNew, data: data.data}},
//               }
//             )
//             }
// });


export const handleLabel2DCreation = createAsyncThunk(
    "labelSlice/handleLabel2DCreation",
    (data:{data: any , undoable?:boolean;},{dispatch,getState}) => {

        let rootState = getState() as RootState;
        let mode = selectInteractionMode(rootState);
        let e = data.data.data as PointerEvent;

        // if(mode === InteractionMode.DEFAULT)
        //     return;
        
        //let e = data.data.data as PointerEvent;
        
        if(mode === InteractionMode.LABEL2D) {
            let pos = [100,100];
            let idNew = nextId('label-2d')
            dispatch(createLabel({id:idNew,pid:LabelType.LABEL2D,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:JSON.stringify(Label2DTemplate)}));
            dispatch(setEditableNodeId(idNew));
            dispatch(push(Routes.All_LABELS_EDIT));

              if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelType.LABEL2D,}},
                redo: {reducer: createLabel, payload:{id:idNew,pid:LabelType.LABEL2D,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:JSON.stringify(Label2DTemplate)}},
              }
            )
            }
        }
        if(mode === InteractionMode.LABELCHART) {
            //let pos = [e.offsetX,e.offsetY];
            let pos = [100,100];
            let idNew = nextId('label-Chart')
            dispatch(createLabel({id:idNew,pid:LabelType.LABELCHART,pos:pos as [number,number],type:LabelChartType.LINECHART,msg:JSON.stringify(Label2DTemplate)}));
            // const dataArrayList = dataArray[getRandomInt(3)]
            const dataArrayList =[{ id: '1', data: [ { x: null, y: null }] }]
            dispatch(setChartData({id:idNew,lineChartData:dataArrayList}))
            dispatch(setEditableNodeId(idNew));
            dispatch(push(Routes.All_LABELS_EDIT));

              if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelType.LABELCHART,}},
                redo: {reducer: createLabel, payload:{id:idNew,pid:LabelType.LABELCHART,pos:pos as [number,number],type:LabelChartType.LINECHART,msg:JSON.stringify(Label2DTemplate)}},
              }
            )
            }  
        }
        
});

export const handleChartHeadCreation = createAsyncThunk(
    "labelListSlice/handleProbeLabelCreation",
    (data:{ data?:any, undoable?: boolean},{dispatch, getState}) => {
        // let e = data.data;
        const idNew = nextId('label-chart')
        dispatch(createInterLabel({id:idNew,pid:LabelChartType.LINECHART,pos:[10,10],type:LabelChartType.LINECHART,msg:JSON.stringify(Label3DTemplate)}));
        dispatch(setActiveLabel({id: idNew}));
        dispatch(setSelectionPointerId(idNew));
        const dataArrayList =[{ id: '1', data: [ { x: null, y: null }] }]
        dispatch(setChartData({id:idNew,lineChartData:dataArrayList}))
        dispatch(setEditableNodeId(idNew));
        dispatch(push(Routes.All_LABELS_EDIT));
       
            if(data.undoable) {
                undoStack.add(
                  {
                    undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelChartType.LINECHART,}},
                    redo: {reducer: createInterLabel, payload:{id:idNew,pid:LabelChartType.LINECHART,pos:[-10,-10],type:LabelChartType.LINECHART,msg:"nill"}},
                  }
                )
            }
});

export const handle3dChartHeadCreation = createAsyncThunk(
    "labelListSlice/handleProbeLabelCreation",
    (data:{undoable?: boolean},{dispatch, getState}) => {
        // let e = data.data;
        const idNew = nextId('label-3d-chart')
        dispatch(createInterLabel({id:idNew,pid:LabelChartType.LINECHART3D,pos:[-10,-10],type:LabelChartType.LINECHART3D,msg:JSON.stringify(Label3DTemplate)}));
        dispatch(setActiveLabel({id: idNew}));
        dispatch(setSelectionPointerId(idNew));
        dispatch(setEditableNodeId(idNew));
        dispatch(push(Routes.All_LABELS_EDIT));
       
            if(data.undoable) {
                undoStack.add(
                  {
                    undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelChartType.LINECHART3D,}},
                    redo: {reducer: createInterLabel, payload:{id:idNew,pid:LabelChartType.LINECHART3D,pos:[-10,-10],type:LabelChartType.LINECHART3D,msg:"nill"}},
                  }
                )
            }
});

export const handleProbeHeadCreation = createAsyncThunk(
"labelSlice/handleProbeLabelCreation",
(data:{undoable?: boolean},{dispatch, getState}) => {
    let e = data;
    const idNew = nextId('label-3d')
    dispatch(createInterLabel({id:idNew,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:JSON.stringify(Label3DTemplate)}));

    dispatch(setSelectionPointerId(idNew));
    dispatch(setActiveLabel({id: idNew}));
    dispatch(setEditableNodeId(idNew));
    dispatch(push(Routes.All_LABELS_EDIT));
 
    if(data.undoable) {
        undoStack.add(
            {
            undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:Label3DType.PROBE,}},
            redo: {reducer: createInterLabel, payload:{id:idNew,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:JSON.stringify(Label3DTemplate)}},
            }
        )
    }
});

export const handleFaceHeadCreation = createAsyncThunk(
    "labelSlice/handleProbeLabelCreation",
    (data:{undoable? : boolean},{dispatch, getState}) => {
        // let e = data.data;
        const idNew = nextId('label-3d')
        dispatch(createInterLabel({id:idNew,pid:Label3DType.FACE,pos:[-10,-10],type:Label3DType.FACE,msg:JSON.stringify(Label3DTemplate)}));
        dispatch(setActiveLabel({id: idNew}));
        dispatch(setEditableNodeId(idNew));
        dispatch(setSelectionPointerId(idNew));
        dispatch(push(Routes.All_LABELS_EDIT));

        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:Label3DType.FACE,}},
                redo: {reducer: createInterLabel, payload:{id:idNew,pid:Label3DType.FACE,pos:[-10,-10],type:Label3DType.FACE,msg:JSON.stringify(Label3DTemplate)}},
              }
            )
        }

        
});

export const handleMeasurementHeadCreation = createAsyncThunk(
    'labelSlice/handleMeasurementLabelCreation',
    async (data: {pid: any, undoable?: boolean}, {dispatch,getState}) => {

        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let e = data.pid;
        const idNew = nextId('label-3d')
        dispatch(createInterLabel({
            id: idNew,
            pid: e,
            type:LabelType.MEASUREMENT,
            msg: JSON.stringify(LabelProbeTemplate),
            pos:[-10,-10],
        }));
        dispatch(setSelectionPointerId(idNew));
        dispatch(setActiveLabel({id: idNew}));
        dispatch(setEditableNodeId(idNew));
        dispatch(push(Routes.All_LABELS_EDIT));

        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid: e,}},
                redo: {reducer: createInterLabel, payload:{id: idNew,pid: e,type:e,msg: JSON.stringify(LabelProbeTemplate),pos:[-10,-10],}},
              }
            )
        }
 })

export const handleHotspotsHeadCreation = createAsyncThunk(
    "labelSlice/handleHotspotsHeadCreation",
    (data:{undoable?: boolean, pid?:any, hotSpotData?:any},{dispatch, getState}) => {
        // let e = data.data;

        let rootState = getState() as RootState;
        let parentLabel = rootState.label.data[data.pid]
        let hasHotspotLabel = (parentLabel.children.length !== 0) && parentLabel.children.filter( i => (rootState.label.data[i].title === `Hotspot`))

        let pos = [100,100];
        let idNew = nextId('label-3d-hotspot')
        //const idCNew = nextId('label-hotspot-child')
        if((!hasHotspotLabel) || (hasHotspotLabel.length === 0)){
            dispatch(createInterLabel({id:idNew,pid:data.pid,pos:[-10,-10],type:Label3DType.HOTSPOTPARENT,msg:JSON.stringify(Label3DTemplate),hotSpotData:data.hotSpotData}));
        }else if(hasHotspotLabel.length === 1){
            idNew = hasHotspotLabel[0]
        }
        //dispatch(createLabel({id:idCNew,pid:idNew,pos:pos as [number,number],type:Label3DType.HOTSPOT,msg:JSON.stringify(Label2DTemplate)}));
        
            if(data.undoable) {
                undoStack.add(
                  {
                    undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:Label3DType.PROBE,}},
                    redo: {reducer: createInterLabel, payload:{id:idNew,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:JSON.stringify(Label3DTemplate)}},
                  }
                )
            }
}); 

export const handleProbeLabelCreation = createAsyncThunk(
    "labelSlice/handleProbeLabelCreation",
    async(data:{data:any, undoable?: boolean ,activeViewerID:string},{dispatch,getState}) => {

        let rootState = getState() as RootState;
        const state:any = rootState.label;
        let parentLabelID = rootState.label.selectionPointerId


        let e = data.data.data;
        let undoable:boolean = data.undoable!;

        // Label counter     
        let activeLabel = state.selectionPointerId;  
        //let labelCount:number = state.data[activeLabel].childLabelCount + 1;
        if(!activeLabel || activeLabel === '')
            return false;

        
        const isNodeExits = () => {
            return rootState.chart?.lineChartDataList?.find(e => (e.id === parentLabelID))?.lineChartData[0]?.data?.map(i => i.y).includes((+(e.msg)))
        }

        if(state?.data[activeLabel]?.pid === LabelChartType.LINECHART){
            const hitPoint = (e.msg);
            !((state?.data[activeLabel]?.pid === LabelChartType.LINECHART) && e.msg ==='NA') && (!(isNodeExits()) && dispatch(setCoOrdinate({id:activeLabel, pointId:e.labelId, x:`N${e.nodeId}`, y:hitPoint})));
        }

        (state?.data[activeLabel]?.pid === LabelChartType.LINECHART3D) && dispatch(set3DChartData({id:e.labelId, lineChartData:lastThreeLineChartData}));
    
        if(!((state?.data[activeLabel]?.pid === LabelChartType.LINECHART) && e.msg ==='NA')){
            // let rootState = getState() as RootState;
            /*
            if(e.labelId === "Hotspot0" || e.labelId === "Hotspot1"){
                e.type = Label3DType.HOTSPOT;
            }
            */
            let parentLabel = rootState.label.data[parentLabelID];
           if((e.type === Label3DType.PROBE) && !(state?.data[activeLabel]?.pid === LabelChartType.LINECHART) && (state?.data[activeLabel]?.pid !== LabelChartType.LINECHART3D)){
            let hasHotspotLabel = (parentLabel?.children?.length !== 0) && parentLabel?.children?.filter( i => (rootState.label.data[i].title === `Probe`))
            let idNew = nextId('label-3d-probe')
            
            if((!hasHotspotLabel) || (hasHotspotLabel.length === 0)){
                dispatch(createInterLabel({id:idNew,pid:parentLabelID,pos:[-10,-10],type:Label3DType.PROBE,msg:JSON.stringify(Label3DTemplate)}));
            }else if(hasHotspotLabel.length === 1){
                idNew = hasHotspotLabel[0]
            }

            dispatch(handleProbeLabelCreationUndoRedo({data:e,undoable:undoable,activeViewerID:data.activeViewerID,pid:idNew,gpid:parentLabelID}))
           }
           else if((e.type === Label3DType.HOTSPOT) && !(state?.data[activeLabel]?.pid === LabelChartType.LINECHART)&& (state?.data[activeLabel]?.pid !== LabelChartType.LINECHART3D)&& (state?.data[activeLabel]?.type !== Label3DType.FACE)){
                let hasHotspotLabel = (parentLabel.children.length !== 0) && parentLabel.children.filter( i => (rootState.label.data[i].title === `Hotspot`));
                let idNew = nextId('label-3d-hotspot');

                if((!hasHotspotLabel) || (hasHotspotLabel.length === 0)){
                    dispatch(createInterLabel({id:idNew,pid:parentLabelID,pos:[-10,-10],type:Label3DType.HOTSPOTPARENT,msg:JSON.stringify(Label3DTemplate)}));
                } else if(hasHotspotLabel.length === 1){
                    idNew = hasHotspotLabel[0]
                }
                dispatch(handleProbeLabelCreationUndoRedo({data:e,undoable:undoable,activeViewerID:data.activeViewerID,pid:idNew,gpid:parentLabelID}));
                //dispatch(createLabel({id:idCNew,pid:idNew,pos:pos as [number,number],type:Label3DType.HOTSPOT,msg:JSON.stringify(Label2DTemplate)}));
           }
           else {
            if(state?.data[activeLabel]?.pid === LabelChartType.LINECHART)
                (!(isNodeExits())) && dispatch(handleProbeLabelCreationUndoRedo({data:e,undoable:undoable,activeViewerID:data.activeViewerID}));
            else 
                dispatch(handleProbeLabelCreationUndoRedo({data:e,undoable:undoable,activeViewerID:data.activeViewerID}));
           }
        }
       
        if(rootState.label.arrangeLabelstatus === true)
            dispatch(arrangeLabel());
       
});

let labelPosVisibilityMap = new Map<"string",{position : [number, number], visibility :boolean}>();
let timer : number | null = null;
export const handleLableAnchorPositionUpdate = createAsyncThunk(
    "labelSlice/handleLableAnchorPositionUpdate",
    async(data:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        let { labelId , labelPosition } = data.data.data;  
        const visibility:any = rootState.label.data[labelId].state.visibility
        labelPosVisibilityMap.set(labelId, { position : labelPosition, visibility : visibility });
        dispatch(toggleVisibility({
            toShow: false,
            nodeId:labelId
        }));

        if (timer !== null)
            clearTimeout(timer);   

        timer = window.setTimeout(()=>{
            let rootState = getState() as RootState;
            const state:any = rootState.label;
            batch(() => {
                labelPosVisibilityMap.forEach((value, key)=>{      
                    if(key && state && state.data)  {
                        const label = state.data[key];
                        dispatch(setLabelPos({id:key,pos:label.pos, anchor:value.position}));
                        dispatch(toggleVisibility({
                            toShow : value.visibility,
                            nodeId : key
                        }))
                    }    
                });
            });
            timer = null;  
            labelPosVisibilityMap.clear();
        },500);
});

export const delete3DLabel = createAsyncThunk(
    "labelSlice/delete3DLabel",
    (data:{undoable?: boolean ,checkedNodes:string[], forceDeleteAll?: boolean},{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.label;
        let keys:string[] = [];
        let dataList : any[] = [];


        let nodesToDelete = data.checkedNodes;

        nodesToDelete.forEach(async (nodeID)=> {

            let labelNode = state.data[nodeID];

            if( data.forceDeleteAll === true || (labelNode.state.checked && (!labelNode.state.partiallyChecked))){
                if(labelNode.children.length > 0) {

                    (labelNode.pid===LabelChartType.LINECHART && labelNode.type === LabelChartType.LINECHART) && dispatch(deleteLineChartData({id:labelNode.id}));
                    if(labelNode.pid===LabelChartType.LINECHART3D && labelNode.type === LabelChartType.LINECHART3D){
                        await dispatch(delete3DChartEditData({pid:labelNode.id}));
                        labelNode.children.forEach(async(i) => {
                            const id = i;
                            await dispatch(delete3DChartData({id:id}));
                        })
                    }

                    labelNode.children.forEach(async(nodeID)=> {

                        delete3DLabelApi(nodeID,viewerId);
                        await dispatch(LabelSlice.actions.deleteLabel({keys:nodeID}));

                    })


                }

                if(labelNode.pid){
                    ((labelNode.type === LabelChartType.LINECHART) && labelNode.pid!==LabelChartType.LINECHART ) && await dispatch(deleteCoOrdinate({pid:labelNode.pid, pointId:labelNode.id}));
                    ((labelNode.type === LabelChartType.LINECHART3D) && labelNode.pid!==LabelChartType.LINECHART3D ) && await dispatch(delete3DChartData({id:labelNode.id}));
                }

                delete3DLabelApi(nodeID,viewerId);
                await dispatch(LabelSlice.actions.deleteLabel({keys:nodeID}));
           }     
        });
        // Object.keys(state.data).forEach( key => {
        //     if( state.data[key].state.checked === true && state.data[key].pid !== "-1" && state.data[key].id !== Label3DType.PROBE && state.data[key].id !== Label3DType.DISTANCE && state.data[key].id !== Label3DType.ARC){

        //         delete3DLabelApi(key,viewerId);

        //         // if(state.data[key].state.partiallyChecked === false)
        //         // keys.push(key);

        //         if(state.data[key].children.length === 0){
        //             keys.push(key);
        //             dataList.push(state.data[key])
        //         }
                
        //     }
        // })
        // dispatch(LabelSlice.actions.deleteLabel({keys}));
        
        if(data.undoable){
            undoStack.add(
                {
                  undo: {reducer: undoDelete, payload:{dataList}},
                  redo: {reducer: redoDelete, payload:{keys}},
                }
              )
        }
});
export const setCheckedNodesAsync = createAsyncThunk(
    "labelSlice /setCheckedNodesAsync",
    async (
      data: { toCheck: boolean; nodeId: string; undoable?: boolean },
      { dispatch, getState }
    ) => {
      const rootState = getState() as RootState;
      const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
      const { toCheck, nodeId} = data;
      if (data.undoable) {
        undoStack.add({
          undo: {
            reducer: setCheckedNodesAsync,
            payload: {
              toCheck: rootState.label.data[nodeId].state.checked,
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
      traverseNode(data.nodeId, rootState.label, (node) => {
   
         leafNodesId.push(node.id);
      });
      dispatch(LabelSlice.actions.checkNode({ ...data }));
    
    }
  );
const redoDelete = createAsyncThunk(
    "labelSlice/delete3DLabel",
    (data:{keys: string},{dispatch,getState}) => {
        // let rootState = getState() as RootState;
        // let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];

        // data.keys?.forEach((item :any) => {
        //     delete3DLabelApi(item,viewerId)
            
        // })

        dispatch(LabelSlice.actions.deleteLabel({keys: data.keys}));
});

const undoDelete = createAsyncThunk(
    "labelListSlice/handleProbeLabelCreation",
    (data:{dataList : any},{dispatch,getState}) => {


        data.dataList.forEach((item: any) => 
            dispatch(LabelSlice.actions.undoDeleted(item))
        )
    
});

const handleProbeLabelCreationUndoRedoAsync = createAsyncThunk(

    "labelSlice/handleProbeLabelCreationUndoRedo",

    (data:{id:string,pid: string,pos: number[], anchor:number,type:any,msg:any,probeData:any, activeLabel: string,labelType:any,probeDataInArray:any,selectedPoints:any,activeViewerID:string},{dispatch,getState}) => {


        add3DLabel(data.id,data.selectedPoints[0],data.labelType,data.probeDataInArray,data.activeViewerID);


     }
);

export const fetchSearchHints = createAsyncThunk(
    "labelSlice/fetchSearchHints",
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

export const reGroupLabel = createAsyncThunk(
    "labelSlice/RegroupLabel",
    (data:{selectedNodes: any, grandPid: any, currentPid: string, undoable?: boolean, redoPid?: string},{dispatch,getState})=>{

        let {selectedNodes, grandPid, currentPid, redoPid} = data;

        let newPid : string = "";

        if(grandPid === Label3DType.PROBE){
            newPid = redoPid? redoPid : nextId('label-3d')
            dispatch(createInterLabel({id:newPid,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:JSON.stringify(Label3DTemplate)}))
          }
      
          if(grandPid === Label3DType.FACE){
            newPid = redoPid? redoPid: nextId('label-3d')
            dispatch(createInterLabel({id:newPid,pid:Label3DType.FACE,pos:[-10,-10],type:Label3DType.FACE,msg: JSON.stringify(Label3DTemplate)}));
          }
      
          if(grandPid === Label3DType.DISTANCE){
            newPid = redoPid? redoPid: nextId('label-3d')
                dispatch(createInterLabel({id: newPid,pid: Label3DType.DISTANCE,type:Label3DType.DISTANCE,msg: JSON.stringify(Label3DTemplate) ,pos:[-10,-10],}));
          }
      
          if(grandPid === Label3DType.ARC){
            newPid = redoPid? redoPid: nextId('label-3d')
                dispatch(createInterLabel({id: newPid,pid: Label3DType.ARC,type:Label3DType.ARC,msg: JSON.stringify(Label3DTemplate),pos:[-10,-10],}));
          }
         
        selectedNodes.forEach((item: string )=> 
            dispatch(LabelSlice.actions.regroupLabel({key: item, newPid : newPid}))
        )

        if(data.undoable){
            undoStack.add(
                {
                  undo: {reducer: undoRegroup, payload:{selectedNodes,oldPid: currentPid, currentPid: newPid, grandPid}},
                  redo: {reducer: reGroupLabel, payload:{selectedNodes,grandPid, redoPid : newPid}},
                }
            )
        }
        
    }
);

export const hide3DLabelsAsync = createAsyncThunk(
    "labelSlice/hide3DLabels",
    (data : {}, { dispatch, getState}) =>{
        let rootState = getState() as RootState;   
        batch(() => {
            Object.values(rootState.label.data).forEach(l => {
                if(l.labelType !== LabelType.LABEL2D && l.title.includes("N:")){
                    dispatch(toggleVisibility({toShow: false, nodeId: l.id}));                  
                }
            }); 
        });
    }
);

export const show3DLabelsAsync = createAsyncThunk(
    "labelSlice/show3DLabels",
    (data : {},{ dispatch, getState}) =>{
        let rootState = getState() as RootState;  
        batch(() => {
            Object.values(rootState.label.data).forEach(l => {
                if(l.labelType !== LabelType.LABEL2D && l.title.includes("N:")){
                    dispatch(toggleVisibility({toShow: true, nodeId: l.id}));                  
                }
            });
        });
    }
);

export const updateAll3DLabelPositionAsync = createAsyncThunk(
    "labelSlice/updateAll3DLabelPosition",
     (data : {activeViewerID : string},{ dispatch, getState}) =>{
        let rootState = getState() as RootState; 
        batch(() => {
            Object.values(rootState.label.data).forEach(l => {
                if(l.labelType !== LabelType.LABEL2D && l.title.includes("N:")){
                    let hitPos = get3DLabelCanvasPos(l.id, data.activeViewerID) as [number,number];
                    let p = l.pos;
                    if(hitPos){
                        let isInitial = p[0] === 0 && p[1] === 0 ? true : false; 
                        dispatch(setLabelPos({id: l.id, pos:isInitial ? hitPos : p, anchor:hitPos}));
                    }           
                }
            });
        });
    }
);

export const showandUpdateAll3DLabelPositionAsync = createAsyncThunk(
    "labelSlice/updateAll3DLabelPosition",
     (data : {activeViewerID : string},{ dispatch, getState}) =>{
        let rootState = getState() as RootState; 
        setTimeout(() => {
            batch(() => {
                Object.values(rootState.label.data).forEach(async l => {
                    if(l.labelType !== LabelType.LABEL2D && l.title.includes("N:")){
                        let hitPos = get3DLabelCanvasPos(l.id, data.activeViewerID) as [number,number];
                        let p = l.pos;
                        if(hitPos){
                            let isInitial = p[0] === 0 && p[1] === 0 ? true : false; 
                            await dispatch(setLabelPos({id: l.id, pos:isInitial ? hitPos : p, anchor:hitPos}));
                            await dispatch(toggleVisibility({toShow: true, nodeId: l.id}));
                        }           
                    }
                });
            });
        }, 200);
     
    }
);

export const LabelSlice = createSlice({
    name: "label",
    initialState : initialState,
    reducers: {
        saveTree: saveTreeReducer,
        checkNode: checkNodeReducer,
        highlightNode: highlightNodeReducer,
        invertNode: invertNodeReducer,
        expandNode: expandNodeReducer,
        toggleVisibility: toggleVisibilityReducer,

        setEditableNodeId:(state, action:PayloadAction<string>) =>{
            state.editableNodeId = action.payload;
        },

        setSelectionPointerId:(state, action:PayloadAction<string>) => {
            state.selectionPointerId = action.payload;
        },

        setCheckedVisibility: (state, action:PayloadAction<{toShow:boolean,leafIds:any, undoable?:boolean}>) => {
            const {toShow, leafIds,undoable} = action.payload;
            if(undoable)
            undoStack.add(
              {
                undo: {reducer: setCheckedVisibility, payload:{toShow: !toShow , leafIds}},
                redo: {reducer: setCheckedVisibility, payload:{toShow,leafIds}}
              }
            )
            setCheckedVisibilityReducer(state,action);
        },

        invertCheckedVisibility: (state, action:PayloadAction<{leafIds:any, undoable?:boolean}>) => {
            const {leafIds,undoable} = action.payload;
            if(undoable)
            undoStack.add(
              {
                undo: {reducer: invertCheckedVisibility, payload:{leafIds}},
                redo: {reducer: invertCheckedVisibility, payload:{leafIds}}
              }
            )
            invertCheckedVisibilityReducer(state,action);
        },

        setlabelMode: (state,action) => setLabelModeReducer(state.labelsListSettings,action),
        createParentLabel : (state, action : PayloadAction<{id:string,name: string, pid: string}>) => {
            const {id,name, pid} = action.payload;
            let newParent = {...state.labelsListSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = pid;
            newParent.title = name;
            newParent.label = "";
            newParent.isGroup = true;
            addNodeReducer(state,{payload: newParent, type: 'ITreeNode'});
        },

        createInterLabel: (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:LabelType |Label2DType | Label3DType | LabelChartType ,msg:string, hotSpotData?:any}>) => {

            const {id,pid,pos,msg,type} = action.payload;

            let newNote = {...state.labelsListSettings.defaultParameters};
            newNote.id = id
            newNote.pid = pid
            newNote.label = msg;
            newNote.pos = pos;

            if(newNote.pid === LabelChartType.LINECHART){
                newNote.anchor = pos;
                state.labelsListSettings.count2DChart+= 1;
                newNote.title = `LineChart ${state.labelsListSettings.count2DChart}`;
                newNote.labelType = LabelType.LABELCHART;
                newNote.type = LabelChartType.LINECHART;
            }

            if(newNote.pid === LabelChartType.LINECHART3D){
                newNote.anchor = pos;
                state.labelsListSettings.count3DChart+= 1;
                newNote.title = `Chart3D ${state.labelsListSettings.count3DChart}`;
                newNote.labelType = LabelType.LABELCHART;
                newNote.type = LabelChartType.LINECHART3D;
                // newNote.imageStyle = state.data[pid].imageStyle
                
            }

            if(newNote.pid === Label3DType.PROBE){
                newNote.anchor = pos;
                state.labelsListSettings.countPoint+= 1;
                newNote.title = `Point Label ${state.labelsListSettings.countPoint}`;
                newNote.labelType = LabelType.LABEL3D;
                //newNote.type = Label3DType.PROBEPARENT ;

            }

            if((newNote.pid !== Label3DType.PROBE) && (type === Label3DType.PROBE) ){
                newNote.anchor = pos;
                newNote.title = `Probe`;
                newNote.labelType = LabelType.LABEL3D;
                newNote.bgColor = state.data[pid].bgColor
                newNote.color = state.data[pid].color
                newNote.borderColor = state.data[pid].borderColor
                newNote.isBorderEnabled = state.data[pid].isBorderEnabled
                newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                newNote.file = state.data[pid].file
                newNote.isImageActive = state.data[pid].isImageActive
                newNote.imageStyle = state.data[pid].imageStyle
                newNote.type = Label3DType.PROBEPARENT ;
            }

            if(newNote.pid === Label3DType.FACE){
                newNote.anchor = pos;
                state.labelsListSettings.countFace+= 1;
                newNote.title = `Face Label ${state.labelsListSettings.countFace}`;
                newNote.labelType = LabelType.LABEL3D;
            }

            if(newNote.pid === Label3DType.DISTANCE){
                newNote.anchor = pos; 
                state.labelsListSettings.countMeasurementP2P += 1;
                newNote.title = `Point to Point ${state.labelsListSettings.countMeasurementP2P}`;
                newNote.labelType = LabelType.MEASUREMENT;
            }

            if(newNote.pid === Label3DType.ARC){
                newNote.anchor = pos; 
                state.labelsListSettings.countMeasurementARC+= 1;
                newNote.title = `ARC ${state.labelsListSettings.countMeasurementARC}`;
                newNote.labelType = LabelType.MEASUREMENT;
            }

            if(type === Label3DType.HOTSPOTPARENT){
                const hotSpotData = action.payload.hotSpotData
                newNote.anchor = pos;
                newNote.title = `Hotspot`;
                newNote.labelType = LabelType.LABEL3D;
                newNote.type = Label3DType.HOTSPOTPARENT;
                newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                        newNote.imageStyle = state.data[pid].imageStyle
                
                if((!state.data[pid].hotSpotData) || (state.data[pid].hotSpotData !== hotSpotData)){
                    state.data[pid].hotSpotData = hotSpotData;
                }
            }
            addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
        },

        undoDeleted : (state, action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType ,msg:string, probeData?:any, activeLabel?:string}>) => {
            addNodeReducer(state,{payload: action.payload, type: 'ITreeNode'});
        },

        createLabel : (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType | LabelChartType ,msg:string, probeData?:any, activeLabel?:string, eventData?:any, gpid?:string}>) => {
                
                const {id,pid,pos,msg,probeData,eventData,type,gpid} = action.payload;
                let newNote:any = {...state.labelsListSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.label = msg;
                newNote.pos = pos;
                newNote.isTitleEditable = false;

                if(probeData)
                newNote.probeData = probeData;
                if(eventData)
                newNote.eventData =JSON.parse(JSON.stringify(eventData)); ;
                if(newNote.pid === LabelType.LABEL2D){
                    state.labelsListSettings.count2D+= 1;
                    newNote.title = `Note ${state.labelsListSettings.count2D}`;
                    newNote.labelType = LabelType.LABEL2D
                }
                if(newNote.pid === LabelType.LABELCHART){
                    state.labelsListSettings.count2DChart+= 1;
                    newNote.title = `LineChart ${state.labelsListSettings.count2DChart}`;
                    newNote.labelType = LabelType.LABELCHART;
                    newNote.type = LabelChartType.LINECHART; 
                }
                if(type === Label3DType.HOTSPOT){
                    state.labelsListSettings.count2DChart+= 1;
                    newNote.title = `N: ${state.labelsListSettings.count2DChart}`;
                    newNote.labelType = LabelType.HOTSPOTS;
                    newNote.type = Label3DType.HOTSPOT; 
                    
                }


                // Label counter 
    
                let activeLabel = state.selectionPointerId;  
                let labelCount:number = 0;

                Object.keys(state.data).forEach((labels)=> {

                if(state.data[labels].id === activeLabel) {

                        labelCount = (++state.data[labels].childLabelCount);

                }

                })
 

                if(newNote.pid === action.payload.activeLabel || (gpid && gpid === action.payload.activeLabel)){

                    if((state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === LabelChartType.LINECHART)){
                        newNote.anchor = pos;
                        state.labelsListSettings.chartLeafCount = labelCount ;
                        newNote.title = (eventData?.nodeId) ? `N${eventData.nodeId}` : `Node:${labelCount}`;
                        newNote.labelType =LabelType.LABELCHART;
                        newNote.type = LabelChartType.LINECHART;
                        newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                     
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === LabelChartType.LINECHART3D){
                        newNote.anchor = pos;
                        state.labelsListSettings.chart3DLeafCount +=1 ;
                        newNote.title = `N:3D Chart ${labelCount}`;
                        newNote.labelType =LabelType.LABELCHART;
                        newNote.type = LabelChartType.LINECHART3D;
                        newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                        newNote.imageStyle = state.data[pid].imageStyle
                        
                        
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.PROBE){
                        newNote.anchor = pos;
                        state.labelsListSettings.probeLeafCount +=1 ;
                        newNote.title = (eventData?.nodeId) ? `N:${eventData.nodeId}` : `N: Point ${labelCount}`;
                        newNote.labelType = LabelType.LABEL3D;
                        newNote.type = Label3DType.PROBE;
                        newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                        newNote.imageStyle = state.data[pid].imageStyle
                
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.FACE){
                        newNote.anchor = pos;
                        state.labelsListSettings.faceLeafCount +=1 ;
                        newNote.title = eventData?.elementId ? `E:${eventData.elementId}` : `E: Face ${labelCount}`;
                        newNote.labelType = LabelType.LABEL3D;
                        newNote.type = Label3DType.FACE;
                        newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.DISTANCE){
                        newNote.anchor = pos;
                        state.labelsListSettings.distanceLeafCount += 1;
                        newNote.title = `N: Point-Point ${labelCount}`;
                        newNote.labelType = LabelType.MEASUREMENT;
                        newNote.type = Label3DType.DISTANCE;
                        newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.ARC){
                        newNote.anchor = pos;
                        state.labelsListSettings.arcLeafCount += 1;
                        newNote.title = `N: Arc ${labelCount}`;
                        newNote.labelType = LabelType.MEASUREMENT;
                        newNote.type = Label3DType.ARC;
                        newNote.bgColor=state.data[pid].bgColor
                        newNote.color=state.data[pid].color
                        newNote.borderColor=state.data[pid].borderColor
                        newNote.isBorderEnabled=state.data[pid].isBorderEnabled
                        newNote.isBackgroundEnabled = state.data[pid].isBackgroundEnabled
                        newNote.file=state.data[pid].file
                        newNote.isImageActive=state.data[pid].isImageActive
                    }
                }

                addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});

                // if(true) {
                //     undoStack.add(
                //       {
                //         undo: {reducer: undoCreateLabel, payload:{id,pid}},
                //         redo: {reducer: createLabel, payload: action.payload},
                //       }
                //     )
                //     }
        },

        undoCreateLabel : (state , action: PayloadAction<{id:string, pid: string ,activeViewerID:string}>) => {

            const parentnodeList : string[] = [LabelType.LABEL2D,Label3DType.PROBE, Label3DType.FACE, Label3DType.DISTANCE,Label3DType.ARC]

            if(parentnodeList.includes(action.payload.pid)){

                switch(action.payload.pid){
                    case LabelType.LABEL2D :
                        state.labelsListSettings.count2D--;
                    break;
                    case Label3DType.PROBE:
                        state.labelsListSettings.countPoint--;
                    break;
                    case Label3DType.FACE:
                        state.labelsListSettings.countFace--;
                    break;
                    case Label3DType.DISTANCE :
                        state.labelsListSettings.countMeasurementP2P--;
                    break;
                    case Label3DType.ARC :
                        state.labelsListSettings.countMeasurementARC--;
                    break;
                    default:
                }
            } 

            else{
                const labelType = JSON.parse(JSON.stringify(state.data[action.payload.id].type ? state.data[action.payload.id].type : "sda"));
                switch(labelType){
                    case Label3DType.PROBE:
                        state.labelsListSettings.probeLeafCount--;
                    break;
                    case Label3DType.FACE:
                        state.labelsListSettings.faceLeafCount--;
                    break;
                    case Label3DType.DISTANCE :
                        state.labelsListSettings.distanceLeafCount--;
                        
                    break;
                    case Label3DType.ARC :
                        state.labelsListSettings.arcLeafCount--;
                    break;
                    default:
            }
        }

        delete3DLabelApi(action.payload.id ,action.payload.activeViewerID);
        deleteNodeReducer(state, {payload:{nodeId:action.payload.id},type:'string'})
  
        },
        redoCreateLabel: (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType ,msg:string, probeData?:any, activeLabel?:string,labelType:Label2DType | Label3DType,probeDataInArray:any,selectedPoints:AnyArray,activeViewerID:string}>) => {

           const {id,pid,pos,msg,probeData,labelType,probeDataInArray,selectedPoints,activeViewerID} = action.payload;
           

           let newNote:any = {...state.labelsListSettings.defaultParameters};
           newNote.id = id
           newNote.pid = pid
           newNote.label = msg;
           newNote.pos = pos;
           if(probeData)
           newNote.probeData = probeData;
           if(newNote.pid === LabelType.LABEL2D){
               state.labelsListSettings.count2D+= 1;
               newNote.title = `Note ${state.labelsListSettings.count2D}`;
               newNote.labelType = LabelType.LABEL2D
           }


        
           if(newNote.pid === action.payload.activeLabel){

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.PROBE){
                   newNote.anchor = pos;
                   state.labelsListSettings.probeLeafCount +=1 ;
                   newNote.title = `N: Point ${state.labelsListSettings.probeLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.PROBE;
               }

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.FACE){
                   newNote.anchor = pos;
                   state.labelsListSettings.faceLeafCount +=1 ;
                   newNote.title = `N: Face ${state.labelsListSettings.faceLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.FACE;
               }

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.DISTANCE){
                   newNote.anchor = pos;
                   state.labelsListSettings.distanceLeafCount += 1;
                   newNote.title = `N: Point-Point ${state.labelsListSettings.distanceLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.DISTANCE;
               }

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.ARC){
                   newNote.anchor = pos;
                   state.labelsListSettings.arcLeafCount += 1;
                   newNote.title = `N: Arc ${state.labelsListSettings.arcLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.ARC;
               }
           }
          
           addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
           add3DLabel(id,selectedPoints,labelType,probeDataInArray,activeViewerID);
          
        },

        setLabelPos:(state, action:PayloadAction<{id:string,pos:[number,number],anchor?: [number,number]}>) => {
            const {id,pos,anchor} = action.payload;
            if(id !== "-1") {
                if(state && state.data && id in state.data){
                    state.data[id].pos = pos;
                    if(anchor){
                        (state.data[id] as Label3D).anchor = anchor;
                    }
                }
            }
        },

        editLabel: (state, action: PayloadAction<{id:string, value:string}>) => {
            const {id,value} = action.payload;
            if(id !== "-1"){
                state.data[id].label = value;
            }
        },
        updateState:(state,action:PayloadAction<any>)=>{
            const { payload } = action;
            state.rootIds=payload.rootIds;
            state.data=payload.data;
            state.labelsListSettings=payload.labelsListSettings;
            state.editableNodeId = ""; //payload.editableNodeId;
            //state.selectionPointerId = ""; //payload.selectionPointerId;            
            state.dropDownItemIndex = 0; //payload.dropDownItemIndex;
            state.routerHistory = "";   //payload.routerHistory;
            state.colorsApplyTo = 0;   //payload.colorsApplyTo;  
               
        },

        updateProbeMSGState:(state,action:PayloadAction<any>)=>{
            const { payload } = action;
            (state.data[payload.id] as Label3D).probeData = payload.data;               
        },

        updateHotspotlabelProperties: (state,action:PayloadAction<any>)=>{
            const { payload } = action;
            const HotspotlblID = payload.HotspotlblID; 
            const hotspotLabel = payload.hotspotLabel;
       
            state.data[HotspotlblID].anchor = hotspotLabel.anchor;
            state.data[HotspotlblID].attributes = hotspotLabel.attributes;
            state.data[HotspotlblID].bgColor = hotspotLabel.bgColor;
            state.data[HotspotlblID].borderColor = hotspotLabel.borderColor;
            state.data[HotspotlblID].isBorderEnabled = hotspotLabel.isBorderEnabled;
            state.data[HotspotlblID].isBackgroundEnabled = hotspotLabel.isBackgroundEnabled;
            state.data[HotspotlblID].color = hotspotLabel.color;
            state.data[HotspotlblID].file = hotspotLabel.file;
            state.data[HotspotlblID].imageStyle = hotspotLabel.imageStyle;
            state.data[HotspotlblID].isImageActive = hotspotLabel.isImageActive;
            state.data[HotspotlblID].label = hotspotLabel.label;
            state.data[HotspotlblID].pos = hotspotLabel.pos;
            state.data[HotspotlblID].size = hotspotLabel.size;
            state.data[HotspotlblID].state = hotspotLabel.state;
        },

        resetSelectionState : (state,action:PayloadAction<any>)=>{
            state.editableNodeId = ""; 
            state.selectionPointerId = ""; 
        },

        updatelabelMSG:(state,action:PayloadAction<any>)=>{
            const { payload } = action;
            const label = state?.data[payload.labelId] as Label3D
            if(label && label.probeData)
                (state?.data[payload.labelId] as Label3D).probeData  = payload.msg;  
        },

        updateHotSpotInfo:(state,action:PayloadAction<any>)=>{
            const { payload } = action;
            const label = state?.data[payload.labelId] as Label3D
            if(label && label.probeData && label.attributes)
                state.data[payload.labelId].attributes = {}
                state.data[payload.labelId].attributes.hotspotData = payload.data;     
        },        

        editLabelBackground: (state, action: PayloadAction<{id:string, color:string}>) => {
            const {id,color} = action.payload;
              state.data[id].isImageActive=false;
           state.data[id].isBackgroundEnabled ? state.data[id].bgColor = color : state.data[id].bgColor = 'rgba(255, 255, 255, 0)';
        },
        editLabelFontColor: (state, action: PayloadAction<{id:string, color:string}>) => {
            const {id,color} = action.payload;
            state.data[id].color = color;
        },
        editLabelBorderColor: (state, action: PayloadAction<{id:string, color:any}>) => {
            const {id,color} = action.payload;
               state.data[id].isBorderEnabled ? state.data[id].borderColor = color : state.data[id].borderColor = 'rgba(255, 255, 255, 0)';
        },
        setpopoutLabelBorder:(state,action:PayloadAction<{id:string, isPopout:boolean}>)=>{
            const {id,isPopout} = action.payload;
            let labelId = id.replace('Label2D',"");
            if(state.data[labelId] && isPopout === true) {
                if(state.data[labelId].borderColor !== state.popoutLabelBorderColor)
                state.popoutLabelBorderPreviousColor = state.data[labelId].borderColor;
                state.data[labelId].borderColor = state.popoutLabelBorderColor;
            }else if( state.popoutLabelBorderPreviousColor !== ''){
                state.data[labelId].borderColor =  state.popoutLabelBorderPreviousColor; 
            }

        },

        setLabelBorderEnable:(state,action:PayloadAction<{id:string, enabled:boolean}>)=>{
            const {id,enabled} = action.payload;
            if(state.data[id].children.length > 0 && state.data[id].type !== 'LINECHART')
            {
                state.data[id].children.forEach((key) =>
                {
                    if(state.data[key].children.length > 0)
                    {
                    state.data[key].children.forEach((item) => {
                        if(enabled === false) {
                            if(state.data[item].borderColor !== 'rgba(255, 255, 255, 0)')
                            state.popoutLabelBorderPreviousColor = state.data[item].borderColor;
                            state.data[item].borderColor = 'rgba(255, 255, 255, 0)';
                        }else{
                            state.data[item].borderColor =  state.popoutLabelBorderPreviousColor; 
                        }
                    })
                }
                else {
                   
                        if(enabled === false) {
                            if(state.data[key].borderColor !== 'rgba(255, 255, 255, 0)')
                            state.popoutLabelBorderPreviousColor = state.data[key].borderColor;
                            state.data[key].borderColor = 'rgba(255, 255, 255, 0)';
                        }else{
                            state.data[key].borderColor =  state.popoutLabelBorderPreviousColor; 
                        }
                }
                    
                })
            }
            else {
            if(enabled === false) {
                if(state.data[id].borderColor !== 'rgba(255, 255, 255, 0)')
                state.popoutLabelBorderPreviousColor = state.data[id].borderColor;
                state.data[id].borderColor = 'rgba(255, 255, 255, 0)';
            }else{
                state.data[id].borderColor =  state.popoutLabelBorderPreviousColor; 
            }
        }

        },
        setLabelBackgroundEnable: (state, action: PayloadAction<{ id: string, enabled: boolean }>) => {
            const { id, enabled } = action.payload;
          
            const setTransparentBackground = (itemId: string) => {
              if (enabled === false) {
                if (state.data[itemId].bgColor !== 'rgba(255, 255, 255, 0)') {
                  state.backgroundPreviousColor = state.data[itemId].bgColor;
                  state.data[itemId].bgColor = 'rgba(255, 255, 255, 0)';
                }
          
                // Handle background image
                if (state.data[itemId].file) {
                  state.backgroundPreviousImage = state.data[itemId].file;
                  state.data[itemId].file = null;
                }
              } else {
                state.data[itemId].bgColor = state.backgroundPreviousColor;
          
                // Restore background image
                if (state.backgroundPreviousImage) {
                  state.data[itemId].file = state.backgroundPreviousImage;
                }
              }
            };
          
            if (state.data[id].children.length > 0 && state.data[id].type !== 'LINECHART') {
              state.data[id].children.forEach((key) => {
                if (state.data[key].children.length > 0) {
                  state.data[key].children.forEach((item) => {
                    setTransparentBackground(item);
                  });
                } else {
                  setTransparentBackground(key);
                }
              });
            } else {
              setTransparentBackground(id);
            }
          },
          
          
        updateBackgroundImage:  (state, action: PayloadAction<{id:any, file:any}>) => {
            const {id,file}=action.payload
             state.data[id].isImageActive=true
            state.data[id].file=file
              },
              editImageStyle: (state, action: PayloadAction<{id:string, value:any}>) => {
                const {id,value} = action.payload;
                state.data[id].imageStyle = value;
            
            },     
        deleteLabel: (state, action: PayloadAction<{keys:string}>) => {
            let keys = action.payload.keys;

            deleteNodeReducer(state, {payload:{nodeId:keys},type:'string'})
            // keys.forEach(k => {
               
            // })
        },

        regroupLabel: (state, action: PayloadAction<{key:string, newPid:string}>) => {
            
            let key = action.payload.key;
            let array: string[] = [];
            Object.keys(state.data).forEach( key => {
                if( state.data[key].state.selected === true)
                    array.push(state.data[key].id)
            })
            regroupReducer(state,{payload: {nodeId : key, newParentId : action.payload.newPid}, type:'ITreeNode'})
        },

        undoRegroup: (state, action: PayloadAction<{selectedNodes : string[],oldPid: string, currentPid: string, grandPid : string }>) => {

            const {selectedNodes, oldPid, currentPid, grandPid} = action.payload;
            
            selectedNodes.forEach(item =>
                LabelSlice.caseReducers.regroupLabel(state, {payload:{key: item, newPid: oldPid}, type:"labelSlice/regroupLabel"})
            )
            LabelSlice.caseReducers.undoCreateLabel(state, {payload:{id: currentPid, pid: grandPid}, type:"labelSlice/undoCreateLabel"});
        },

        setActiveLabel : (state, action: PayloadAction<{id:string}>) => {

            if(state.data[action.payload.id].state.selected === true)
                state.data[action.payload.id].state.selected = false;
            else
                if(state.data[action.payload.id].pid === Label3DType.PROBE ||state.data[action.payload.id].pid === Label3DType.DISTANCE || state.data[action.payload.id].pid === Label3DType.ARC || state.data[action.payload.id].pid === Label3DType.FACE )
                    state.data[action.payload.id].state.selected = true;

            Object.keys(state.data).forEach( key => {
                if( state.data[key].state.selected === true && key !== action.payload.id)
                    state.data[key].state.selected = false;
            })
        },

        handleProbeLabelCreationUndoRedo:(state ,action: PayloadAction<{data:any,undoable:boolean,activeViewerID:string, pid?:string, gpid?:string}>) =>{

             const {data , undoable , activeViewerID, pid, gpid } = action.payload;

             let pos = get3DLabelCanvasPos(data.labelId,activeViewerID);

            //  console.log('dataLabelId ==>',data.labelId);

            //    let array : string[] = [];
            //      let activeLabel = "-1"
            //      Object.keys(state.data).forEach(key => {
            //          if (state.data[key].state.selected === true)
            //              array.push(state.data[key].id)
            //      })
            
            //      if(array.length >= 1)
            //         activeLabel = array[0];
   
            let activeLabel = state.selectionPointerId;  
            let labelMsg = '';

            Object.keys(state.data).forEach((labels)=>{

               if(state.data[labels].id === activeLabel) {

                labelMsg = state.data[labels].label;
               }


            })
      

         LabelSlice.caseReducers.createLabel(state, {payload:{id:data.labelId,pid: (pid ? pid : activeLabel),pos: pos as [number,number], anchor: pos as [number,number],type:data.type,msg:labelMsg,probeData:data.msg, activeLabel: activeLabel, eventData:data, gpid}, type:"labelSlice/handleProbeLabelCreation"})
               //  createLabel({id:data.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:data.type,msg:JSON.stringify(Label3DTemplate),probeData:data.msg, activeLabel: activeLabel});

        if(undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : data.labelId,pid: activeLabel, activeViewerID:activeViewerID}},
                redo: {reducer: handleProbeLabelCreationUndoRedoAsync, payload:{id:data.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:data.type,msg:JSON.stringify(Label3DTemplate),probeData:data.msg, activeLabel: activeLabel,labelType:data.type,probeDataInArray:data.probeData,selectedPoints:data.selectedPoints,activeViewerID:activeViewerID}},
              }
            )
        }

        },
        setDropdownSelectedIndex: (state, action:PayloadAction<number>) => {

            state.dropDownItemIndex = action.payload;
        },
        setRouterHistory:(state ,action:PayloadAction<string>) => {

            state.routerHistory = action.payload

        },
        setcolorsApplyTo: (state, action:PayloadAction<ColorSelection>) => {
            state.colorsApplyTo = action.payload;
        },
        setIsTitleEditable:(state,action:PayloadAction<{nodeId:string,isEditable:boolean}>)=> {
            const {nodeId,isEditable} = action.payload;
            state.data[nodeId].isTitleEditable = isEditable;
        },
        setLabelSize:(state,action:PayloadAction<{labelId:string,size:[number,number]}>) =>{
            let labelId = action.payload.labelId.replace('Label2D',"");
            if(state.data[labelId]){
                state.data[labelId].size = action.payload.size;
            }
        },
        setLabelAutoposition:(state,action:PayloadAction<{labelId:string,isAutoposition:boolean}>) =>{
            let labelId = action.payload.labelId.replace('Label2D',"");
            if(state.data[labelId]){
                state.data[labelId].autoPosition = action.payload.isAutoposition;
            }
        },
        setNewTitle:(state,action:PayloadAction<{nodeId:string,newTitle:string}>)=>{ 
            const {nodeId,newTitle} = action.payload;
            state.data[nodeId].title = newTitle;    
        },

        updatePrevSearches: (state, action: PayloadAction<string>) => {
            const query = action.payload;
            if (!state.prevSearches[query] && query !== "") {
              state.prevSearches[query] = Object.keys(state.prevSearches).length;
            }
        },
        setHotspotCircularProgress : (state,action:PayloadAction<boolean>) =>{
            state.hotspotCircularProgress = action.payload;
        },
        setarrangeLabelStatus : (state,action:PayloadAction<boolean>) =>{
            state.arrangeLabelstatus = action.payload;
        },
        deleteHotspotLeafNodes :(state,action:PayloadAction) =>{
            let parentLabelID = state.selectionPointerId;
            let parentLabel = state.data[parentLabelID];
            let hasHotspotLabel = (parentLabel.children.length !== 0) && parentLabel.children.filter( i => (state.data[i].title === `Hotspot`));
            if(hasHotspotLabel !== false) {
                let clonedState:any = JSON.parse(JSON.stringify({...state}));
                if(clonedState.data[hasHotspotLabel[0]]){         
                    clonedState?.data[hasHotspotLabel[0]]?.children.forEach((hotspotLeaf:string)=>{
                        delete clonedState.data[hotspotLeaf]
                        
                    });                
                    clonedState.data[hasHotspotLabel[0]].children = [];
                    LabelSlice.caseReducers.updateState(state,{payload:clonedState,type:"labelSlice/updateState"}); 
                }
            }

        },
        setAttachPartVisibility:(state,action:PayloadAction<{labelId:string,visibility:boolean}>)=>{
           const {labelId,visibility} = action.payload;
           if(state.data[labelId]) {
            state.data[labelId].attachPartVisibility = visibility;
           }

        }

    },
    extraReducers: (builder) => {
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
})

export default LabelSlice.reducer;
export const {
    //reuse from tree 
    saveTree , 
    checkNode, 
    highlightNode, 
    invertNode, 
    expandNode, 
    toggleVisibility, 
    setCheckedVisibility,
    invertCheckedVisibility,
    editLabelBorderColor,
    setpopoutLabelBorder,
    setLabelBorderEnable,
    setLabelBackgroundEnable,
    editLabelFontColor,
    //current 
    setEditableNodeId,
    setSelectionPointerId,
    createLabel,
    handleProbeLabelCreationUndoRedo,
    createInterLabel,
    editLabel,
    editLabelBackground,
    setlabelMode,
    setLabelPos, 
    createParentLabel,
    setActiveLabel,
    undoCreateLabel,
    redoCreateLabel,
    undoRegroup,
    setDropdownSelectedIndex,
    setRouterHistory,
    setcolorsApplyTo,
    setIsTitleEditable,
    setNewTitle,
    updateBackgroundImage,
    editImageStyle,
    updatePrevSearches,
    resetSelectionState,
    updateHotspotlabelProperties,
    setHotspotCircularProgress,
    deleteHotspotLeafNodes,
    setarrangeLabelStatus,
    updateProbeMSGState,
    setLabelSize,
    setLabelAutoposition,
    setAttachPartVisibility
} = LabelSlice.actions;
 
export const  deleteAllLabelsAsync = createAsyncThunk(
    "label/deleteAllLabelsAsync",
    async (data: any, { dispatch, getState }) => {
        const rootState = getState() as RootState;     
        let ids:string[] =  Object.keys(rootState.label.data);  
        let label3DIds:string[] = [];
        ids.forEach(async (id) => {
            const label = rootState.label.data[id] as ILabel;
            if(label.labelType === LabelType.LABEL2D)
                await dispatch(LabelSlice.actions.deleteLabel({keys:id}));
            else
                label3DIds.push(id);
        })     
        if(label3DIds.length > 0)
            await dispatch(delete3DLabel({ undoable: false ,checkedNodes:label3DIds, forceDeleteAll : true })); 
});

export const  updateStateAsync = createAsyncThunk(
    "label/updateStateAsync",
    async (data: any, { dispatch, getState }) => {
        const rootState = getState() as RootState;
        const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""]; 
        const { labelState, hotspotlabels } = data; 
        await dispatch(LabelSlice.actions.resetSelectionState({}));
        
        let  labelStateCloned = JSON.parse(JSON.stringify(labelState));
        await dispatch(LabelSlice.actions.updateState(labelStateCloned)); // update to create hotspot parent label

        let ids:string[] =  Object.keys(labelState.data);  
        for (const id of ids) {
            const label = labelState.data[id] as Label3D;
            if(label.labelType === LabelType.LABEL3D && label.children.length === 0 && label.type === "PROBE" && (label.pid && label.pid!==Label3DType.PROBE)){
                add3DLabel(label.id, label.eventData?.selectedPoints[0],label.type,label.eventData?.probeData,viewerId);
                //dispatch(redoCreateLabel({pid:label.pid, id:label.id,pos:label.pos,type:label.type,selectedPoints:label.eventData?.selectedPoints,probeDataInArray:label.eventData?.probeData,activeViewerID:viewerId,labelType:label.labelType}))
            }

            if(label?.labelType === "LABELCHART" &&  label?.children?.length === 0){
                add3DLabel(label.id, label.eventData?.selectedPoints[0], "PROBE", label.eventData?.probeData, viewerId);
            }

            if(label?.labelType === "MEASUREMENT"  &&  label?.children?.length === 0) {
                if (label.eventData?.selectedPoints.length===2) {
                    let dataPoints = [new Float32Array([label.eventData?.selectedPoints[0][0],label.eventData?.selectedPoints[0][1],label.eventData?.selectedPoints[0][2]]),
                    new Float32Array([label.eventData?.selectedPoints[1][0],label.eventData?.selectedPoints[1][1],label.eventData?.selectedPoints[1][2]])]
                    addMeasurementLabel(label.id, dataPoints, label.type, label.eventData?.probeData, viewerId)
                    

                } else if (label.eventData?.selectedPoints.length===3) {
                    let dataPoints = [new Float32Array([label.eventData?.selectedPoints[0][0],label.eventData?.selectedPoints[0][1],label.eventData?.selectedPoints[0][2]]),
                    new Float32Array([label.eventData?.selectedPoints[1][0],label.eventData?.selectedPoints[1][1],label.eventData?.selectedPoints[1][2]]),
                    new Float32Array([label.eventData?.selectedPoints[2][0],label.eventData?.selectedPoints[2][1],label.eventData?.selectedPoints[2][2]])]
                    addMeasurementLabel(label.id, dataPoints, label.type, label.eventData?.probeData, viewerId)

                }

                showHideLabelVisibility(label.id,label.state.visibility,viewerId)
                
            }

            //We are setting the selected point id so  added at last- dispatch(setSelectionPointerId(label.id));
            if(label.attributes?.hotspotData){
                const data = label.attributes?.hotspotData;
                const { hotspotInfo, variableId, stepId, derivedTypeId } = data;
                const params = hotspotInfo;   
                await dispatch(setSelectionPointerId(label.id));
                //dispatch(setEditableNodeId(label.id));           
           
                if(params.bTop === true && params.bBottom === true)
                {
                    //get the bottom hotspot
                    const nodeIndexes = await getHotspotData(params, variableId, stepId, derivedTypeId, viewerId)
                    //console.log(nodeIndexes);
                    let labelIds : Array<string> = [];
                    let labelCounter = 0;
                    nodeIndexes.every((nodeIndex, index) => {
                        //if(params.bottom > 0 && index >= params.bottom) 
                        if(params.bottom > 0 && labelCounter >= params.bottom)
                            return false;      
                        let modelIndex = 0;
                        let id = "Hotspot_" + nanoid();
                        let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
                        labelIds.push(labelId);
                        if(labelId)
                            labelCounter = labelCounter + 1;
                        return true;
                    });
                    //console.log(labelIds);
           
                    //get the TOP hotspot
                    const newParams = {...params, bBottom : false};
                    const nodeIndexes2 = await getHotspotData(newParams, variableId, stepId, derivedTypeId, viewerId)
                    //console.log(nodeIndexes);
                    let labelIds2 : Array<string> = [];
                    let labelCounter1 = 0;
                    nodeIndexes2.every((nodeIndex, index) => {
                        //if(newParams.top > 0 && index >= newParams.top) 
                        if(newParams.top > 0 && labelCounter1 >= newParams.top)
                            return false;    
                        let modelIndex = 0;
                        let id = "Hotspot_" + nanoid();
                        let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
                        labelIds2.push(labelId);
                        if(labelId)
                            labelCounter1 = labelCounter1 + 1;
                        return true;
                    });
                    //console.log(labelIds2);
                }
                else if(params.bTop === false && params.bBottom === true)
                {
                    //get the bottom hotspot
                    const nodeIndexes =  await getHotspotData(params, variableId, stepId, derivedTypeId, viewerId)
                    //console.log(nodeIndexes);
                    let labelIds : Array<string> = [];
                    let labelCounter = 0;
                    nodeIndexes.every((nodeIndex, index) => {
                        //if(params.bottom > 0 && index >= params.bottom) 
                        if(params.bottom > 0 && labelCounter >= params.bottom)
                            return false;      
                        let modelIndex = 0;
                        let id = "Hotspot_" + nanoid();
                        let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
                        labelIds.push(labelId);
                        if(labelId)
                            labelCounter = labelCounter + 1;
                        return true;
                    });
                    //console.log(labelIds);
                }
                else if((params.bTop === true && params.bBottom === false) || 
                        (params.bTop === false && params.bBottom === false))
                {
                    //get the TOP hotspot
                    params.bBottom = false;
                    const nodeIndexes =  await getHotspotData(params, variableId, stepId, derivedTypeId, viewerId);
                   //console.log(nodeIndexes);
                    let labelIds : Array<string> = [];
                    let labelCounter = 0;
                    nodeIndexes.every((nodeIndex, index) => {
                        //if(params.top > 0 && index >= params.top) 
                        if(params.top > 0 && labelCounter >= params.top)
                            return false;    
                        let modelIndex = 0;
                        let id = "Hotspot_" + nanoid();                 
                        let labelId : string = add3dLabelforNodeIndex(id, Label3DType.HOTSPOT, nodeIndex, modelIndex, viewerId);
                        labelIds.push(labelId);
                        if(labelId)
                            labelCounter = labelCounter + 1;
                        return true;
                    });
                    //console.log(labelIds);
                }
               
                const rootState = getState() as RootState;
                Object.keys(rootState.label.data).forEach( id => {
                    if(rootState.label.data[id].id === label.id){
                        rootState.label.data[id].children.forEach( lblChild => {
                            if(rootState.label?.data[lblChild]?.type === 'HOTSPOTPARENT')
                            {
                                rootState.label?.data[lblChild]?.children?.forEach(HotspotlblID =>{
                                    hotspotlabels.forEach((hotspotLabel : any) => {
                                        if(hotspotLabel.title === rootState.label?.data[HotspotlblID].title &&
                                            hotspotLabel.pid === rootState.label?.data[HotspotlblID].pid)
                                        {  
                                            /*                                      
                                            dispatch(LabelSlice.actions.setLabelPos({
                                                id:rootState.label?.data[HotspotlblID].id,
                                                pos:hotspotLabel.pos,
                                            }));  
                                            */
                                            dispatch(setWindowPos({
                                                uid: windowPrefixId+rootState.label?.data[HotspotlblID].id,
                                                pos:hotspotLabel.pos,
                                            })); 
                                            dispatch(setWindowSize({
                                                uid: windowPrefixId+rootState.label?.data[HotspotlblID].id,
                                                size:hotspotLabel.size,
                                            })); 
                                            dispatch(LabelSlice.actions.updateHotspotlabelProperties({ HotspotlblID, hotspotLabel}));                                      
                                        }                                        
                                    });
                                });
                            }
                        })
                    }
                }) ; 

                await dispatch(setSelectionPointerId(''));                  
            }                
        }
     
        //updated the lable value
        //let  labelStateCloned = JSON.parse(JSON.stringify(labelState));
        for (const id of ids) {
            const label = labelState.data[id] as Label3D;
            if(label.labelType === LabelType.LABEL3D && label.children.length === 0 && label.type === "PROBE" && (label.pid && label.pid!==Label3DType.PROBE)){
                const labelData : any = getLabel3DInfo(label.id, viewerId);
                //labelStateCloned.data[id].probeData = labelData?.msg; 
                await dispatch(LabelSlice.actions.updateProbeMSGState({id:label.id, data: labelData?.msg}));          
            }
            if(label?.labelType === "LABELCHART" &&  label?.children?.length === 0){
                const labelData : any = getLabel3DInfo(label.id, viewerId);
                //labelStateCloned.data[id].probeData = labelData?.msg; 
                await dispatch(LabelSlice.actions.updateProbeMSGState({id:label.id, data: labelData?.msg}));  
            }
        }
        //await dispatch(LabelSlice.actions.updateState(labelStateCloned));// update to set new probe value    
})


export const  updateLabelMSGAsync = createAsyncThunk(
    "label/updateLabelMSGAsync",
    async (data: any, { dispatch, getState }) => {
        const rootState = getState() as RootState;
        const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""]; 
        let ids:string[] =  Object.keys(rootState.label.data);  
        ids.forEach(id => {
            const label = rootState.label.data[id] as Label3D;
            if(label.labelType === LabelType.LABEL3D && label.children.length === 0 && (label.pid && label.pid!==Label3DType.PROBE)){
                const labelData : any = getLabel3DInfo(label.id, viewerId);
                let msg =labelData?.msg;
                dispatch(LabelSlice.actions.updatelabelMSG({msg : msg, labelId : id}));             
            }
        });         
})

export const updateHotSpotInfo = createAsyncThunk(
    "label/updateHotSpotInfo",
    async (data : any, { dispatch, getState}) =>{
        const rootState = getState() as RootState;
        const editableNodeId = rootState.label.selectionPointerId;
        if(editableNodeId)
            dispatch(LabelSlice.actions.updateHotSpotInfo({data : data, labelId : editableNodeId}));    
            dispatch(LabelSlice.actions.setHotspotCircularProgress(false));   
    }
)
  
//Selectors

export const selectRootIds = (state:RootState) => state.label.rootIds
export const selectLabelData = (state:RootState) => state.label.data
export const selectEditableNodeId = (state:RootState) => state.label.editableNodeId
export const selectSelectionPointerId = (state:RootState) => state.label.selectionPointerId
export const selectAppliedColorType= (state:RootState) => state.label.colorsApplyTo
export const selectArrangeLabelStatus=(state:RootState)=>state.label.arrangeLabelstatus

export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.label.data).forEach(key => {
        if (state.label.data[key].state.checked === true)
            if(state.label.data[key].pid === "-1" || state.label.data[key].pid === LabelType.LABEL3D || state.label.data[key].pid === LabelType.MEASUREMENT)
                return null
            else
                array.push(key)
     })

     return (array.length);
}

export const selectedLeafNodes = (state:RootState) => {
    const array : string[] = [];
    const typeLabel : any[] = [];
     Object.keys(state.label.data).forEach(key => {
        if (state.label.data[key].state.checked === true)
            if(state.label.data[key].pid === "-1" || state.label.data[key].pid === LabelType.LABEL3D || state.label.data[key].pid === LabelType.MEASUREMENT || state.label.data[key].pid === LabelType.LABEL2D || state.label.data[key].pid === Label3DType.PROBE || state.label.data[key].pid === Label3DType.ARC || state.label.data[key].pid === Label3DType.DISTANCE || state.label.data[key].pid === Label3DType.FACE)
                return null
            else{
                array.push(key)
                typeLabel.push(state.label.data[key].type);
            }
            })
     
        const filtered = typeLabel.filter(item => item === typeLabel[0]);

        if(filtered.length === typeLabel.length)
            return (array);
        else    
            return([])
}

export const selectLabelMode = (state:RootState):LabelMode => state.label.labelsListSettings.mode;
export const selectedLabel2D = (state: RootState):Label2D | null=> {
    let node:Label2D | null = null;
    const length = selectedLength(state);

    if(length === 1){
    Object.keys(state.label.data).forEach(key => {
        if (state.label.data[key].state.checked === true && state.label.data[key].pid !== "-1" )
            node = state.label.data[key]
     })
    }
    return(node);
}

export const selectActiveId = (state:RootState) => {

    let array : string[] = [];

    Object.keys(state.label.data).forEach(key => {
        if (state.label.data[key].state.selected === true)
            array.push(state.label.data[key].id)
    })

    if(array.length >= 1)
        return(array[0])
    else return("-1")
}

export const selectCheckedLeafNodes = (state:RootState) =>  selectCheckedLeafNodesTree(state.label)
export const selectUnCheckedLeafNodes = (state:RootState) =>  selectUnCheckedLeafNodesTree(state.label)

export const selectDropdownItemIndex = (state:RootState) => state.label.dropDownItemIndex

export const selectRouterHistory = (state:RootState)=> state.label.routerHistory

export const selectActiveLabel = (state:RootState) => {

    let labelString:string = ''

  Object.keys(state.label.data).forEach(key => {

    if(state.label.data[key].id === state.label.editableNodeId ) {

        labelString = state.label.data[key].label ;
    }
           
    })

    return labelString


}

export const selectCheckedNodeForLabelType = (state:RootState,parentType:string) => {

    let checkedNodesID:any[] = [];

    Object.keys(state.label.data).forEach(key => {


        if(state.label.data[key].pid === parentType  ) {


            if(state.label.data[key].pid === parentType && state.label.data[key].state.checked === true && state.label.data[key].state.partiallyChecked === false)  {
                          
                checkedNodesID.push(state.label.data[key].id);

                if(state.label.data[key].children.length > 0){
                    state.label.data[key].children.forEach((childID) => {
                        checkedNodesID.push(childID)
                    })
                }
    
            }
            else {

                state.label.data[key].children.forEach((childID)=>{

                    if(state.label.data[childID].children.length > 0){
                        state.label.data[childID].children.forEach((leafId) =>{
                            if(state.label.data[leafId].state.checked === true) {
                                checkedNodesID.push(leafId);
                              }
                        })
                    } else if(state.label.data[childID].state.checked === true) {

                    checkedNodesID.push(childID);
                  }

                })
            }

        }


    })

    return checkedNodesID;

}

export const selectCheckedNodeForALLLabelType = (state:RootState) => {

    let checkedAllLabelNodesID:any[] = [];

    Object.keys(state.label.data).forEach(key => {

            if(state.label.data[key].state.checked === true && state.label.data[key].state.partiallyChecked === false)  {
                          
                checkedAllLabelNodesID.push(state.label.data[key].id);
    
            }
            else {

                state.label.data[key].children.forEach((childID)=>{


                  if(state.label.data[childID].state.checked === true) {

                    checkedAllLabelNodesID.push(childID);
                  }

                })
            }


    })

    return checkedAllLabelNodesID



}

export const selectImage = (state: RootState) =>{
    let file:any
    Object.keys(state.label.data).forEach((key) => {
        file=state.label.data[key].file;
   
    })
   return file
}

export const selectImageStyle = (state: RootState) =>{
    let img:any
    Object.keys(state.label.data).forEach((key) => {
        img=state.label.data[key].imageStyle;
   
    })
   return img
}
export const selectHotspotData = (state:RootState) => state.label.hotspotData;
export const selectSearchHints = (state: RootState) =>
  Object.keys(state.label.searchHints);
export const selectPrevSearches = (state: RootState) =>
  Object.keys(state.label.prevSearches);
export const selectHotspotCircularProgressbar = (state:RootState)  => state.label.hotspotCircularProgress;