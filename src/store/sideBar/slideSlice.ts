import { createSlice, PayloadAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { TreeNode, ITreeState } from "./shared/Tree/types";
import nextId from "react-id-generator";
import {
  saveTreeReducer,
  checkNodeReducer,
  highlightNodeReducer,
  invertNodeReducer,
  expandNodeReducer,
  toggleVisibilityReducer,
  setCheckedVisibilityReducer,
  deleteNodeReducer
} from "./shared/Tree/reducers";
import viewpointSlice, {  saveViewpoint } from "store/viewpointSlice";
import { LeafCounter, RootCounter } from "components/utils/counter";
import { nanoid } from '@reduxjs/toolkit';
import { captureViewpointAsync } from "store/viewpointSlice";
import { toastMsg } from "store/toastSlice";
//import { includes } from "ramda";
// Define a type for the slice state
export enum SlideType {
  GROUP = 0,
  VIEW = 1,
}

interface SlideTreeNode extends TreeNode {
  downloaded: boolean;
  size: number;
  slideType: SlideType;
  thumbnailData?: string;
  isTitleEditable:boolean
}

interface SlideTreeState extends ITreeState {
  data: { [id: string]: SlideTreeNode };
  rootIds: string[];
  appliedSlide: string;
  selectedSlide: any [];
  viewpathCounter: number;
  viewpointCounter: number;
  isViewerDataChanged:boolean;
  isCircularProgress:boolean;
  selectAllSlideState:boolean;
}

const tempdata: any[] = [];

// Define the initial state using that type
const initialState: SlideTreeState = {
  data: {'slide_parent':{
    id:'slide_parent',
    pid:'-1',
    title:'slide_group',
    children:[],
    state:{expanded:true,visibility:true,checked:false,partiallyChecked:false},
    downloaded:true,
    size:0,
    slideType:1,
    attributes:{},
    isTitleEditable:false
  }},
  rootIds: ['slide_parent'], //["0", "1", "2"],
  appliedSlide: "-1",
  selectedSlide: [],
  viewpathCounter: 0,
  viewpointCounter: 0,
  isViewerDataChanged : false,
  isCircularProgress : false,
  selectAllSlideState :false
};

export const pasteGroup = createAsyncThunk(
  "slide/saveViewpointData",
  async (vpdata: any, { dispatch, getState }) => {
    dispatch(pasteSlide(vpdata));
    if (tempdata) tempdata.forEach((e) => dispatch(saveViewpoint(e)));
  }
);

export const createNodeAsync = createAsyncThunk(
  "node/createNodeAsync",
  async ({ nodeId }: { nodeId: string; }, { dispatch, getState }) => {
    // Generate a unique slide ID
    let slideId = "slide-leaf-" + nanoid();
    const state = getState(); // Get the current state

    while (state.viewPointData?.slides?.data[slideId]) {
      slideId = "slide-leaf-" + nanoid();
    }

    // Dispatch the necessary actions
    await dispatch(createNode({ pid: nodeId, id: slideId, options: {} }));
    await dispatch(captureViewpointAsync({ id: slideId }));
    
    await dispatch(slideSlice.actions.setSelectedSlideListEmpty());
    await dispatch(slideSlice.actions.setSelectedSlideId({tocheck:true,slideID:slideId}));
    await dispatch(slideSlice.actions.applyView(slideId));
    await dispatch(slideSlice.actions.setIsViewerDataChanged(false));
    // Dispatch the toastMsg action with the slide title
    // await dispatch(toastMsg({ msg: `Slide Created - ${name}` }));

    // Return the slide ID
    return slideId;
  }
);

export const setCheckedNodesAsync = createAsyncThunk(
  "labelSlice /setCheckedNodesAsync",
  async (
    data: { toCheck: boolean; nodeId: string; undoable?: boolean },
    { dispatch, getState }
  ) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    const { toCheck, nodeId} = data;
    dispatch(slideSlice.actions.checkNode({ ...data }));
  
  }
);

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    saveTree: saveTreeReducer,
    checkNode: checkNodeReducer,
    highlightNode: highlightNodeReducer,
    invertNode: invertNodeReducer,
    expandNode: expandNodeReducer,
    toggleVisibility: toggleVisibilityReducer,
    setCheckedVisibility: setCheckedVisibilityReducer,

    setSlideSelection: (state, action: PayloadAction<string>) => {
       state.selectedSlide.push(action.payload);
    },

    setSelectedSlideId: (state,action: PayloadAction<{tocheck:boolean,slideID:string}>) => {
      const {tocheck,slideID} = action.payload;
      if(tocheck === true) {
        //state.selectedSlide.length = 0;
        state.selectedSlide.push(slideID);
      }else if(tocheck === false){
          state.selectedSlide = state.selectedSlide.filter(item => item !== slideID)
      }
    },

    createNode: (
      state,
      action: PayloadAction<{
        pid: string;
        id: string;
        options: {
          thumbnailData?: string;
        };
      }>
    ) => {
      const { pid, id, options } = action.payload;
      let newData: SlideTreeNode = {
        id,
        pid,
        title: "Slide Group",
        children: [],
        state: {
          expanded: true,
          visibility: true,
          checked:false,
          partiallyChecked:false
        },
        downloaded: true,
        thumbnailData: options.thumbnailData,
        size: 200,
        slideType: pid === "-1" ? SlideType.GROUP : SlideType.VIEW,
        attributes: {},
        isTitleEditable:false
      };

      // switch (newData.slideType) {
      //   case SlideType.GROUP:
      //     state.viewpathCounter++;
      //     newData.title = `Slide Group ${RootCounter(current(state))}`;
      //     newData.size = 0;
      //     state.data[newData.id] = newData;
      //     state.rootIds.push(newData.id);
      //     break;

      //   default:
      //     state.viewpointCounter++;
      //     newData.title = `Slide ${LeafCounter(current(state),pid)}`;
      //     newData.slideType = SlideType.VIEW;
      //     state.data[newData.id] = newData;
      //     state.data[pid].children.push(newData.id);
      //     break;
      // }

        state.viewpointCounter++;
        newData.title = `Slide ${LeafCounter(current(state),pid)}`;
        newData.slideType = SlideType.VIEW;
        state.data[newData.id] = newData;
        state.data[pid].children.push(newData.id);

   

      if (pid !== "-1")
        slideSlice.caseReducers.downloadParentFolder(state, {
          payload: state.data[pid].id,
          type: "slideSlice/downloadParentFolder",
        });

      expandNode({ toOpen: true, nodeId: newData.id });
    },

    downloadFile: (state, action: PayloadAction<string>) => {
      state.data[action.payload].downloaded = true;
      slideSlice.caseReducers.downloadParentFolder(state, {
        payload: state.data[action.payload]
          ? state.data[action.payload].pid
          : "-1",
        type: "slideSlice/downloadParentFolder",
      });
    },

    downloadParentFolder: (state, action: PayloadAction<string>) => {
      const downloadParentFolderFunction = (pId: string) => {
        if (pId !== "-1") {
          const parentId = state.data[pId].id;
          const parentChildren = state.data[parentId ? parentId : -1].children;
          let downloadedCount = 0;

          let folderSize = 0;

          parentChildren.forEach((item) => {
            if (state.data[item].downloaded === true) downloadedCount++;

            if (state.data[item].downloaded === false)
              folderSize = folderSize + state.data[item].size;
          });

          state.data[parentId].size = folderSize;

          if (parentChildren.length === downloadedCount)
            state.data[parentId ? parentId : -1].downloaded = true;
          else state.data[parentId ? parentId : -1].downloaded = false;

          if (state.data[parentId].pid !== "-1") {
            const newPId = state.data[parentId].pid;
            downloadParentFolderFunction(newPId ? newPId : "-1");
          }
        }
      };

      downloadParentFolderFunction(action.payload);
    },

    applyView: (state, action: PayloadAction<string>) => {
      state.appliedSlide = action.payload;
    },

    updateSlideData: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
      state.rootIds = action.payload.rootIds;
      //state.appliedSlide = action.payload.appliedSlide;
      //state.selectedSlide.push(action.payload.selectedSlide);
      state.viewpathCounter = action.payload.viewpathCounter;
      state.viewpointCounter = action.payload.viewpointCounter;
    },

    replaceViewData: (state, action: PayloadAction<string>) => {
      state.data[action.payload].downloaded = false;

      if (state.data[action.payload].id === state.selectedSlide[0])
        state.appliedSlide = "-1";

      slideSlice.caseReducers.downloadParentFolder(state, {
        payload: state.data[action.payload]
          ? state.data[action.payload].pid
          : "-1",
        type: "slideSlice/downloadParentFolder",
      });
    },

    deleteNode: (state, action: PayloadAction<any[]>) => {
      // const toDelete = state.data[action.payload];
      // state.selectedSlide = "-1";
      // state.viewpointCounter--;
      // if (toDelete.slideType === SlideType.VIEW) {
      //   delete state.data[action.payload];
      //   Object.keys(state.data).forEach((key) => {
      //     state.data[key].children = state.data[key].children.filter(
      //       (item) => item !== action.payload
      //     );
      //   });
      // }

      // const deleteGroup = (id: string) => {
      //   const children = state.data[id].children;
      //   children.forEach((item) => {
      //     if (state.data[id].slideType === SlideType.VIEW)
      //       delete state.data[id];
      //     else deleteGroup(item);
      //   });

      //   if (state.data[id].pid === "-1") {
      //     delete state.data[id];
      //     state.rootIds = state.rootIds.filter((item) => item !== id);
      //   } else {
      //     delete state.data[id];
      //     state.appliedSlide="-1";
      //     Object.keys(state.data).forEach((key) => {
      //       state.data[key].children = state.data[key].children.filter(
      //         (item) => item !== id
      //       );
      //     });
      //   }
      // };

      // if (toDelete.slideType === SlideType.GROUP) {
      //   deleteGroup(action.payload);
      // }
      // slideSlice.caseReducers.downloadParentFolder(state, {
      //   payload: toDelete.pid,
      //   type: "slideSlice/downloadParentFolder",
      // });
      const toDelete = action.payload;
      toDelete.forEach((id)=>{
        deleteNodeReducer(state, {payload:{nodeId:id},type:'string'});
        state.selectedSlide = state.selectedSlide.filter(item => item !== id);
      })

    },

    pasteSlide: (
      state,
      action: PayloadAction<{
        copied: SlideTreeNode;
        pid: string;
        newId: string;
        viewPointsData?: any;
      }>
    ) => {
      let copiedSlideData = JSON.parse(JSON.stringify(action.payload.copied));

      const copyPasteGroup = (
        toCopiedGroupData: any,
        pid: string,
        id: string
      ) => {

        const toCopiedChildId = toCopiedGroupData.children;
        const toCopiedChildren: any[] = [];

        toCopiedChildId.forEach((item: string) => {
          toCopiedChildren.push(JSON.parse(JSON.stringify(state.data[item])));
        });

        toCopiedGroupData.children = [];
        state.viewpathCounter++;
        toCopiedGroupData.id = id;
        toCopiedGroupData.pid = pid;
        toCopiedGroupData.title = `Slide Group ${state.rootIds.length + 1}`;
        toCopiedGroupData.state.expanded = false;
        copiedSlideData.downloaded = true;

        // console.log("cp[",toCopiedGroupData )

        if (pid === "-1") {
          state.data[id] = toCopiedGroupData;
          state.rootIds.push(toCopiedGroupData.id);
        } else {
          state.data[id] = toCopiedGroupData;
          state.data[pid].children.push(toCopiedGroupData.id);
        }

        toCopiedChildren.forEach((item) => {
          if (item.slideType === SlideType.VIEW) {
            state.viewpointCounter++;
            let selectedViewPoint = action.payload.viewPointsData.find(
              (e) => e.uid === item.id
            );
            let slideId = nextId("slide-leaf-");
            while(state.data[slideId]){slideId = nextId("slide-leaf-")}
            let objCopy = { ...selectedViewPoint };
            objCopy.uid = slideId;
            item.id = slideId;
            item.title = `Slide ${state.data[toCopiedGroupData.id].children.length + 1}`;
            item.pid = toCopiedGroupData.id;
            item.isTitleEditable = false;
            item.downloaded = true;
            tempdata.push(objCopy);
            state.data[item.id] = item;
            state.data[item.pid].children.push(item.id);
          }

          if (item.slideType === SlideType.GROUP) {
            state.viewpathCounter++;
            pid = toCopiedGroupData.id;
            copyPasteGroup(item, pid, `${state.viewpathCounter}`);
            slideSlice.caseReducers.downloadParentFolder(state, {
              payload: pid,
              type: "slideSlice/downloadParentFolder",
            });
          }
        });
      };

      if (copiedSlideData.slideType === SlideType.GROUP) {
        copyPasteGroup(
          copiedSlideData,
          action.payload.pid,
          action.payload.newId
        );
        slideSlice.caseReducers.downloadParentFolder(state, {
          payload: action.payload.pid,
          type: "slideSlice/downloadParentFolder",
        });
      }

      if (copiedSlideData.slideType === SlideType.VIEW) {
       // if (state.selectedSlide !== "-1") {
          // state.viewpathCounter += 1;
          state.viewpointCounter += 1;
          copiedSlideData.id = action.payload.newId;
          copiedSlideData.title = `Slide ${state.data[action.payload.pid].children.length + 1}`;
          copiedSlideData.downloaded = true;
          copiedSlideData.pid = action.payload.pid;
          copiedSlideData.isTitleEditable = false;
          copiedSlideData.state.checked = false;
          state.data[copiedSlideData.id] = copiedSlideData;
          state.data[copiedSlideData.pid].children.push(copiedSlideData.id);

          slideSlice.caseReducers.downloadParentFolder(state, {
            payload: action.payload.pid,
            type: "slideSlice/downloadParentFolder",
          });
        }
     // }
    },

    setIsTitleEditable:(state,action:PayloadAction<{nodeId:string,isEditable:boolean}>)=> {
      const {nodeId,isEditable} = action.payload;
      state.data[nodeId].isTitleEditable = isEditable;
    },

    setNewTitle:(state,action:PayloadAction<{nodeId:string,newTitle:string}>)=>{ 
      const {nodeId,newTitle} = action.payload;
      state.data[nodeId].title = newTitle;

    },
    setIsViewerDataChanged:(state,action:PayloadAction<boolean>) =>{
      state.isViewerDataChanged = action.payload;
      if(action.payload === true) {
        state.appliedSlide = "-1"
      }

    },
    setSlideStatus:(state)=>{

        let arrayOfdata  = Object.values(state.data).filter((item) => item.pid === '-1');
         if(arrayOfdata.length > 0) {
           if(arrayOfdata[0].children.length > 0) {
             let id = arrayOfdata[0].children.filter((child,index) => index === 0).toString();
            slideSlice.caseReducers.applyView(state,{payload:id,type:"slideSlice/applyView"})
           }
         }
   
    },
    setisCircularProgress:(state,action:PayloadAction<boolean>) =>{

      state.isCircularProgress = action.payload;
    },
    // setSelectAllState:(state,action:PayloadAction<boolean>) =>{
    //  if(action.payload === true) {
    //   state.selectAllSlideState = true;
    //  }else {
    //   state.selectAllSlideState = false;
    //  }

    // },
    // updateSelectAllState:(state,action:PayloadAction) => {

    //   let checkedSlideID:any[] =[];
    //   let allSlides:any[] = [];
    //   Object.values(state.data).forEach((item)=>{
    //      if(item.state.checked === true && item.pid !== '-1') {
    //       checkedSlideID.push(item.id);
    //      }
    //   })  
    //   Object.values(state.data).forEach((item)=>{
    //     if(item.pid !== '-1') {
    //       allSlides.push(item.id);
    //     }
    //   })  
    //   if(allSlides.length > 0 && checkedSlideID.length === allSlides.length) {
    //     state.selectAllSlideState = true;
    //   }else if(allSlides.length > 0 && checkedSlideID.length !== allSlides.length) {
    //     state.selectAllSlideState = false;
    //   }
    //   else {
    //     state.selectAllSlideState = false;
    //   }
    // },
    setSelectedSlideListEmpty:(state,action:PayloadAction) =>{
      state.selectedSlide.length = 0;
    }
    

  },
});

//Define the Reducers
export const {
  updateSlideData,
  saveTree,
  checkNode,
  invertNode,
  expandNode,
  setSlideSelection,
  setSelectedSlideId,
  createNode,
  applyView,
  replaceViewData,
  deleteNode,
  pasteSlide,
  downloadFile,
  downloadParentFolder,
  setIsTitleEditable,
  setNewTitle,
  setIsViewerDataChanged,
  setSlideStatus,
  setisCircularProgress,
  // setSelectAllState,
  // updateSelectAllState,
  setSelectedSlideListEmpty

} = slideSlice.actions;

//Define the selectors
export const selectSlideData = (state: RootState) => state.slide.data;
export const selectRootIds = (state: RootState) => state.slide.rootIds;
export const selectAppliedSlide = (state: RootState) =>  state.slide.appliedSlide;
export const selectSelectedSlide = (state: RootState) =>  state.slide.selectedSlide;
export const selectViewpathCounter = (state: RootState) => state.slide.viewpathCounter;
export const selectViewpointCounter = (state: RootState) =>  state.slide.viewpointCounter;
export const selectViewerDataChanged =(state:RootState) => state.slide.isViewerDataChanged; 
export const selectCircularProgress =(state:RootState) => state.slide.isCircularProgress;

// export const selectCheckdSlide =(state:RootState) =>{

//   let checkedSlideID:any[] =[];

//   Object.values(state.slide.data).forEach((item)=>{
//      if(item.state.checked === true && item.pid !== '-1') {
//       checkedSlideID.push(item.id);
//      }
//   })

//  return checkedSlideID
// }
export const selectSelectAllCheckState =(state:RootState) => state.slide.selectAllSlideState;

export default slideSlice.reducer;
