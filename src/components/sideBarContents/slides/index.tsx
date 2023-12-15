import MuiIconButton from "@material-ui/core/IconButton";
import Title from "../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";

import SideBarContainer from "../../layout/sideBar/sideBarContainer";
import BackButton from "../../icons/back";
import { createNodeAsync } from "../../../store/sideBar/slideSlice";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";

import { goBack } from "connected-react-router/immutable";
import { FileImport } from "tabler-icons-react";
import { FileExport } from "tabler-icons-react";
import { toastMsg } from "store/toastSlice";
import React, { useEffect } from "react";
import toastMessage from '../messages/toastMessage.json'
import {
selectSlideData,
  selectRootIds,
  expandNode,
  setSlideSelection,
  setSelectedSlideId,
  createNode,
  applyView,
  replaceViewData,
  deleteNode,
  SlideType,
  pasteSlide,
  downloadFile,
  downloadParentFolder,
  updateSlideData,
  selectAppliedSlide,
  selectSelectedSlide,
  selectViewpathCounter,
  selectViewpointCounter,
  pasteGroup,
  setNewTitle,
  setIsTitleEditable,
  selectViewerDataChanged,
  setIsViewerDataChanged,
  selectCircularProgress,
  setisCircularProgress,
  selectSelectAllCheckState,
  setCheckedNodesAsync,
  // setSelectAllState,
  // updateSelectAllState,
  setSelectedSlideListEmpty
} from "../../../store/sideBar/slideSlice";

import MuiGrid from "@material-ui/core/Grid";
import MuiAddSlideButton from '@material-ui/core/Button';

// import GridViewIcon from "../../icons/gridView";
// import MuiFormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import updateIcon from "../../icons/update"
import DuplicateIcon from '../../icons/duplicate';
import MuiFileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import MuiPaste from "@material-ui/icons/AssignmentOutlined";
import MuiDeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import OptionContainer from "../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer";
import Option from "../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option";
import MuiButton from "@material-ui/core/Button";
import MuiTypography from "@material-ui/core/Typography";

import CreateNewFolderIcon from "../../icons/createNewFolder";

// import MuiSlideshowIcon from "@material-ui/icons/Slideshow";

import { useState,useRef } from "react";

// import { useReducer, useEffect, Children } from "react";
import useContainer from "../../../customHooks/useContainer";


import TreeView from "components/shared/RcTree/Slides/SlidesTreeView";
import { convertListToTree } from "../../utils/tree";

import sizeCalculator from "../../../customHooks/useSizeCalculator";
import useLocalStorage from "customHooks/useLocalStorage";

//HeaderIconButton

import HeaderIconButton from "../../shared/headerIconButton/IconButton";
import nextId from "react-id-generator";
import viewpointSlice, {
  applyViewpointAsync,
  captureViewpointAsync,
  deleteViewpointAsync,
  selectViewPoint,
  updateViewpoint,
  saveViewpoint,
} from "store/viewpointSlice";
import { selectModelName } from "../../../store/appSlice";
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import globalThemes from "theme/globalThemes";
import { nanoid } from '@reduxjs/toolkit';
import './style.css';
import store from "store";
import { setEditMode } from "store/windowMgrSlice";
import { editPause, editCancel, editCollapse, sortedNotification, addMessage, finishMessage } from 'store/sideBar/messageSlice';
import CardTransfer from 'components/sideBarContents/messages/components/cardTransfer';

export default function Slides() {

  const treeDataRedux = useAppSelector(selectSlideData);
  const treeRootIds = useAppSelector(selectRootIds);
  const { roots, expanded } = convertListToTree(treeDataRedux, treeRootIds);
  const viewPointCounter = useAppSelector(selectViewpointCounter);
  const viewPathCounter = useAppSelector(selectViewpathCounter);
  const selectedSlideId = useAppSelector((state) => state.slide.selectedSlide);
  const appliedSlideId = useAppSelector((state) => state.slide.appliedSlide);
  const isViewerDataChanged = useAppSelector(selectViewerDataChanged);
  const isCircularProgress = useAppSelector(selectCircularProgress);


  const slideIds = Object.keys(treeDataRedux);
  const mostRecentSlideId = slideIds[slideIds.length - 1];
  const mostRecentSlide = treeDataRedux[mostRecentSlideId];
  
  const mostRecentTitle = mostRecentSlide ? mostRecentSlide.title : null;
  
  const classes = globalThemes();
  const selectedSlide = Object.values(treeDataRedux).find((slide) => slide.id === selectedSlideId[0]);
  const selectedSlideTitle = selectedSlide?.title;

  const viewPoint = useAppSelector(selectViewPoint);
  const modelName = useAppSelector(selectModelName);

  const [openDelete, setOpenDelete] = useState(false);


  const [listView, setListView] = useState<boolean>(true);
  const [viewPointData, setViewPointData] = useLocalStorage(
    "viewPoint-" + modelName
  );
  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef, [
    treeDataRedux,
  ]);

  const notificationList = useAppSelector(sortedNotification)

  const dispatch = useAppDispatch();

  const treeData:any[] = [];
  if(roots[0].children.length > 0) {
    roots[0].children.forEach((item:any)=>{
      treeData.push(item)

    })
  }

  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.SLIDES
  }

  const getHeaderRightIcon=()=>{
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
  
    return(
      <>
    <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
    </>
    )
  }

  const onHandlePause = (id : string, pause : boolean) => {
    // console.log(id,pause)
    if(pause)
        dispatch(editPause({id:id, value: false}));
    else
        dispatch(editPause({id:id, value: true}));
  }

  const onHandleCollapse = (id : string, boolean: boolean) => {

    if(boolean)
    dispatch(editCollapse({id, value: true}))
    

    else
    dispatch(editCollapse({id, value: false}))

  }

  const onHandleCancel = (id: string) => {
   dispatch(editCancel(id));
  }
  function searchObjectIndex(_arr: any, searchString: String) {
    const searchTitle = `Slide`;
    let arr = _arr.reverse();
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].card.data.totalSize !== arr[i].card.data.transferredSize)
      if (arr[i].card.title.includes(searchTitle)) {
        var arrCopy = JSON.parse(JSON.stringify(arr[i]));
        arrCopy.card.title = `Downloading ${searchString}`
        return arrCopy;
      }
    }
    return -1; // if the searchString is not found in any object, return -1
  }



  const handleSwitchView = () => {
    setListView(!listView);
  };

  const handleSwitchFromView = (nodeId: string) => {
    setOpenDelete(false);
    dispatch(setSlideSelection(nodeId));
    dispatch(expandNode({ toOpen: true, nodeId }));
    setListView(false);
  };

  const handleExpand = (toOpen: boolean, nodeId: any) => {
    if (treeDataRedux[nodeId.node.id].slideType === SlideType.GROUP) {
      let toOpenval = treeDataRedux[nodeId.node.id].state.expanded
      toOpenval=!toOpenval
      dispatch(expandNode({ toOpen: toOpenval, nodeId: nodeId.node.id }));
    }
  };

  const handleSelectAll = (e:any) => {
    let tocheck = e.target.checked;
    let nodeId = e.target.id;
    //dispatch(setSelectAllState(tocheck));
    //dispatch(updateSelectAllState())
    roots[0].children.forEach((data: any) => {
      dispatch(setCheckedNodesAsync({ toCheck: tocheck, nodeId: data?.id, undoable:true}));
      dispatch(setSelectedSlideId({tocheck:tocheck,slideID:data?.id}));
    })
  }

  const handleCheck = (toCheck:boolean, nodeId:string, undoable?:boolean) => {

    // if(undoable){
    //   undoStack.add(
    //     {
    //       undo: () => handleCheck(!toCheck, nodeId),
    //       redo: () => handleCheck(toCheck, nodeId),
    //     }
    //   )
    // }

    setOpenDelete(false);
    dispatch(setSelectedSlideId({tocheck:toCheck,slideID:nodeId}));
    //dispatch(setSlideSelection(nodeId));
    //dispatch(updateSelectAllState());
    
  }

  const handleRowClick = async(event:any) => {
    let toCheck = event.selected;
    let nodeId = event.node.id
    // if(undoable){
    //   undoStack.add(
    //     {
    //       undo: () => handleCheck(!toCheck, nodeId),
    //       redo: () => handleCheck(toCheck, nodeId),
    //     }
    //   )
    // }

    if(event.nativeEvent.ctrlKey === false) {

       dispatch(setSelectedSlideListEmpty());
    }

    if(toCheck === false && selectedSlideId.length >= 1) {
      toCheck = true;
      dispatch(setSelectedSlideListEmpty());
    }

   setOpenDelete(false);
   await dispatch(setSelectedSlideId({tocheck:toCheck,slideID:nodeId}));
   //await dispatch(setSlideSelection(nodeId));
   //await dispatch(updateSelectAllState());
  };

  // const getCheckedNode =(type:string)=> {

  //   let checkedNodes:any[] =[];
  //   if(type === "visibility"){
  //     treeData.forEach((item)=> {
  //       if(item.state.checked === true) {
  //         checkedNodes.push(item.id)
  //       }
  //     })
  //     if(checkedNodes.length === 1 )
  //     return false
  //     else
  //     return true
  //   }
  //   else if(type === "nodeID"){
  //     treeData.forEach((item)=> {
  //       if(item.state.checked === true) {
  //         return item.id
  //       }
  //     })

  //   }
    
  // }

  const onHandleCreateGroup = () => {
    const slideId = "slide-group-" + nanoid(); //nextId("slide-group-");
    dispatch(createNode({ pid: "-1", id: slideId, options: {} }));
  };

  const handleCreateNode = (nodeId: string) => {
    dispatch(createNodeAsync({nodeId}));
    //dispatch(setSelectedSlideId(nodeId));
  };

  const handleCreateSlide = (nodeId:string) =>{

    dispatch(createNodeAsync({nodeId}));
    
  }

  useEffect(() => {
    if (mostRecentTitle) {
      if(mostRecentSlide.pid === '-1'){
        dispatch(toastMsg({ msg: `${toastMessage.slide001}${mostRecentTitle}` }));
      }
      else {
      dispatch(toastMsg({ msg: `${toastMessage.slide002} ${mostRecentTitle}` }));
      }
    }
  }, [mostRecentTitle, dispatch]);

  const onHandleApply = () => {
    dispatch(setisCircularProgress(true));
    dispatch(addMessage({ 
      id: selectedSlideId[0],
      data : {
        cancel: false,
        pause: false,
        timeLeft: "",
        totalSize: 'Unknown',
        transfferedSize: 'Unknown'
      },
      title: "Slide - " + selectedSlideTitle,
      type: 0,
    tags :["Downloads","SLIDE"],
    }))

    setTimeout(()=>{

      performApply();
      
    },5000)

  };

  const performApply = async () => {
    await dispatch(downloadFile(selectedSlideId[0]));
    // await dispatch(applyView(selectedSlideId));
  
    // Dispatch applyViewpointAsync and wait for it to complete
    await dispatch(applyViewpointAsync({ id: selectedSlideId[0], name: selectedSlideTitle }));
    dispatch(setIsViewerDataChanged(false));
  
    // Now that applyViewpointAsync is done, update edit mode
    const windows = store.getState().windowMgr.windows;
    Object.keys(windows).forEach((windowId) => {
      dispatch(setEditMode({ uid: windowId, isEdit: false }));
    });
  };

  // useEffect(()=> {

  //   if(selectedSlideId === '-1') {

  //    let arrayOfdata  = Object.values(treeDataRedux).filter((item) => item.pid === '-1');
  //     if(arrayOfdata.length > 0) {
  //       if(arrayOfdata[0].children.length > 0) {
  //         let id = arrayOfdata[0].children.filter((child,index) => index === 0).toString();
  //         dispatch(setSelectedSlideId(id));
  //         dispatch(applyView(id));
  //       }
  //     }

  //   }

  // },[treeDataRedux])
// useEffect(()=>{
//   if(viewPointCounter>0)
//   {
//   let parentCounter=0;
//   Object.values(treeDataRedux).forEach((key)=>{
//     parentCounter++;
//     if(parentCounter==1) {

//     if(key.children.length >0) {
//       let counter=0;
//       Object.values(key.children).forEach((item:any)=>{
// counter++;
// if(counter===1){
//   dispatch(applyView(treeDataRedux[item].id))
//   //dispatch(setSelectedSlideId(treeDataRedux[item].id))
// }
//       })
    
//     }
//   }
//   })
//   }
// },[treeDataRedux])


  // const onHandleDownload = () => {
  //   const toDownload = (id: string) => {
  //     treeDataRedux[id].children.map((item: string) => {
  //       if (treeDataRedux[id].slideType === SlideType.VIEW)
  //         dispatch(downloadFile(item));
  //       else toDownload(item);
  //     });
  //     dispatch(downloadFile(id));
  //   };
  //   toDownload(selectedSlideId);
  // };

  const onHandleReplace = () => {

    dispatch(captureViewpointAsync({ id: selectedSlideId[0], name: selectedSlideTitle}));
    if(selectedSlideTitle === undefined){
      dispatch(toastMsg({msg:""}))
    }
    else {
      dispatch(toastMsg({msg:`${toastMessage.slide003} ${selectedSlideTitle}`}))
    }
    
  };

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  };

  const onHandleImport = () => {
  
    if (viewPointData && viewPointData.viewpoints)
      dispatch(updateViewpoint(viewPointData.viewpoints));
    if (viewPointData && viewPointData.slides)
      dispatch(updateSlideData(viewPointData.slides));
     

  }; 


  // const onHandleExport = () => {
  //   let slides = {
  //     data: treeDataRedux,
  //     rootIds: treeRootIds,
  //     viewpathCounter: viewPathCounter,
  //     viewpointCounter: viewPointCounter,
  //     appliedSlide: appliedSlideId,
  //     selectedSlide: selectedSlideId,
  //   };
  //   let vpData = {
  //     slides: slides,
  //     viewpoints: viewPoint.viewpoints,
  //   };
  //   setViewPointData(vpData);
  // };

  /*
  useEffect(() => onHandleExport(),[viewPoint,selectedSlideId,appliedSlideId])
  useEffect(() => {
    if(viewPoint?.viewpoints?.length<=0){
      onHandleImport();
      dispatch(setSlideSelection("-1"));
      if(viewPointData && viewPointData.slides && (viewPointData?.slides?.appliedSlide !== "8")){
        dispatch(downloadFile(viewPointData.slides.appliedSlide));
        dispatch(applyView(viewPointData.slides.appliedSlide));
        dispatch(applyViewpointAsync({ id: viewPointData.slides.appliedSlide }));
        dispatch(setSlideSelection(viewPointData.slides.selectedSlide))
       
      }
    }
  },[])
  */

  const onHandleDelete = async() => {
   setOpenDelete(false); 
   selectedSlideId.forEach((slideId)=>{
     dispatch(deleteViewpointAsync({ id: slideId }));
   })
   await dispatch(deleteNode(selectedSlideId));
   //dispatch(updateSelectAllState());
    

  };


  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) =>{
    dispatch(setIsTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {

    dispatch(setNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }

  // const onHandlePaste = () => {
  //   if (selectedSlideId !== "-1") {
  //     if (treeDataRedux[selectedSlideId].slideType === SlideType.GROUP) {
  //       dispatch(
  //         pasteSlide({ copied: copied, pid: "-1", newId: selectedSlideId })
  //       );
  //       console.log("9ff9f9");
  //     }
  //     if (treeDataRedux[selectedSlideId].slideType === SlideType.VIEW) {
  //       dispatch(
  //         pasteSlide({
  //           copied: copied,
  //           pid: treeDataRedux[selectedSlideId].pid,
  //           newId: selectedSlideId,
  //         })
  //       );
  //       console.log("9ff9f9");
  //     }
  //   } else {
  //     dispatch(
  //       pasteSlide({ copied: copied, pid: "-1", newId: selectedSlideId })
  //     );
  //     console.log("9ff9f9");
  //   }
  // };
  const handleRowUnselect = () =>{

    dispatch(setSlideSelection("-1"));

  }

  const onHandlePaste = () => {
    const copied = JSON.parse(JSON.stringify(treeDataRedux[selectedSlideId[0]]));
    if (copied.pid === "-1") {
      const slideId = "slide-group-" + nanoid(); //nextId("slide-group-");
      dispatch(
        pasteGroup({
          copied: copied,
          pid: "-1",
          newId: slideId,
          viewPointsData: viewPoint.viewpoints,
        })
      );
    } else {
      let slideId = "slide-leaf-" + nanoid(); //nextId("slide-leaf-");
      // while(viewPointData.slides.data[slideId]){
      //   slideId = "slide-leaf-" + nanoid(); //nextId("slide-leaf-")
      // }
      let selectedViewPoint = viewPoint.viewpoints.find(
        (e) => e.uid === copied.id
      );
      let objCopy = { ...selectedViewPoint };
      objCopy.uid = slideId;

      if (selectedSlideId[0] !== "-1") {
        dispatch(saveViewpoint(objCopy));
        if (treeDataRedux[selectedSlideId[0]].pid !== "-1") {
          dispatch(
            pasteSlide({
              copied: copied,
              pid: treeDataRedux[selectedSlideId[0]].pid,
              newId: slideId,
            })
          );
        } else
          dispatch(
            pasteSlide({
              copied: copied,
              pid: treeDataRedux[selectedSlideId[0]].id,
              newId: slideId,
            })
          );
      } else {
        dispatch(
          pasteSlide({ copied: copied, pid: copied.pid, newId: slideId })
        );
      }
    }
  };

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={onClickBackIcon}>
        <BackButton />
      </MuiIconButton>
    );
  };

  // const getHeaderRightIcon = () => {
  //   return (
  //     <div>
  //       {/* {listView ? (
  //         // <GridViewIcon />
  //         <HeaderIconButton
  //           icon={<GridViewIcon />}
  //           label={"Grid View"}
  //           disabled={false}
  //           onClick={handleSwitchView}
  //         ></HeaderIconButton>
  //       ) : (
  //         // <MuiFormatListBulletedIcon/>
  //         <HeaderIconButton
  //           icon={<MuiFormatListBulletedIcon />}
  //           label={"Bullet View"}
  //           disabled={false}
  //           onClick={handleSwitchView}
  //         ></HeaderIconButton>
  //       )} */}
  //     </div>
  //   );
  // };

  const getAction = () => {
    return null;
  };

  const getBody = () => {
    return (
      <div
        ref={containerRef}
        // style={{ height: "100%", background: "transparent" }}
      >
        <div id="button_Parent"  style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
            <div style={{width:'98%',height:'40px',marginTop:'5px'}} onClick={()=>handleCreateNode('slide_parent')}>
              <MuiAddSlideButton variant="contained" color="primary" fullWidth={true}  size={'large'}>Add Slide</MuiAddSlideButton>
            </div>
        </div>

        <TreeView
          treeData={treeData}
          defaultExpandAll
          expanded={expanded}
          nodes={treeDataRedux}
          check = {handleCheck} 
          containerwidth={containerWidth}
          onExpand={handleExpand}
          isTitleEditable = {true}
          onHandleIsTitleEditable = {onHandleIsTitleEditable}
          setNewTitleTitle = {setNewTitleTitle}
           selectedSlideId={selectedSlideId}
          // selected={[selectedSlideId]}
           selectedKey={selectedSlideId}
          appliedSlideId={appliedSlideId}
          handleExpand={handleExpand}
          handleRowClick={handleRowClick}
          handleCreateNode={handleCreateNode}
          handleRowUnselect={handleRowUnselect}
          unselect = {true}
          isViewerDataChanged = {isViewerDataChanged}
        />
      </div>
      // <span>
      //   {listView ? (
      //     <ListView
      //       treeData={treeDataRedux}
      //       rootIds={treeRootIds}
      //       selectedSlideId={selectedSlideId}
      //       appliedSlideId={appliedSlideId}
      //       handleExpand={handleExpand}
      //       handleRowClick={handleRowClick}
      //       handleCreateNode={handleCreateNode}
      //       slideType={SlideType}
      //       handleSwitchView={handleSwitchFromView}
      //     />
      //   ) : (
      //     <GridMode
      //       treeData={treeDataRedux}
      //       rootIds={treeRootIds}
      //       selectedSlideId={selectedSlideId}
      //       appliedSlideId={appliedSlideId}
      //       handleExpand={handleExpand}
      //       handleRowClick={handleRowClick}
      //       handleCreateNode={handleCreateNode}
      //       slideType={SlideType}
      //     />
      //   )}
      // </span>
    );
  };

  const getFooter = () => {
    return (
      <div>
          { openDelete?
          < div style={{margin:"20px 10px"}}>
            <div style={{ marginBottom: "5px", marginTop: "5px" }}>
              <MuiTypography style={{ marginBottom: "5px", fontSize: "14px" }}>
                Are you sure want to delete ?
              </MuiTypography>
              <div style={{display:'flex', gap:'10px', alignContent: "center",justifyContent:"center"}}>
                <MuiButton
                  // 
                  className={classes.Muibtn}
                  autoFocus
                  onClick={onHandleDelete}
                  // color="primary"
                >
                  Confirm
                </MuiButton>
                <MuiButton
                  // style={{ width: "20%", fontSize: "9px" }}
                  className = {classes.BtnOutlined}
                  onClick={() => setOpenDelete(false)}
                  // color="primary"
                >
                  Cancel
                </MuiButton>
              </div>
            </div>
          </div>: 
          <div > 
              <MuiGrid container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {/* <MuiGrid item xs={4}>
                        {treeDataRedux[selectedSlideId].downloaded
                          ? null
                          : `${sizeCalculator(
                              treeDataRedux[selectedSlideId].size
                            )}`}
                      </MuiGrid> */}
                      {/* {isCircularProgress?  <div className={"lds-ring"}><div></div><div></div><div></div><div></div></div> :
                                            <MuiGrid item xs={6}>
                                            {selectedSlideId.length === 1 && selectedSlideId[0] !== appliedSlideId ? 
                                            <MuiButton
                                            style={{width:'max-content',marginTop:'20px'}}
                                            className = {classes.Muibtn}
                                            autoFocus
                                            onClick={onHandleApply}
                                          >
                                          Apply
                                          </MuiButton>
                                          :null }
                                          </MuiGrid>
                        } */}
                        {isCircularProgress ?  <div style={{marginLeft:'40px',marginBottom:'5px',width:'max-content',marginTop:'20px'}}> <CardTransfer item={searchObjectIndex(notificationList,treeDataRedux[selectedSlideId[0]]?.title)} handleCollapse={onHandleCollapse} handlePause={onHandlePause} handleCancel={onHandleCancel} timeArrowDivider={false}></CardTransfer></div> : 
                                            <MuiGrid item xs={6}>
                                              {selectedSlideId.length === 1 && selectedSlideId[0] !== appliedSlideId ? 
                                                <MuiButton
                                                style={{width:'max-content',marginTop:'20px'}}
                                                className = {classes.Muibtn}
                                                autoFocus
                                                onClick={onHandleApply}
                                              >
                                              Apply
                                              </MuiButton>
                                          :null }
                                          </MuiGrid>
                        }


                    </MuiGrid>
                <div> 
                {selectedSlideId.length >= 1 ?
                   !isCircularProgress ? 
                      <OptionContainer>
                            <Option
                              label="Update"
                              active={
                                selectedSlideId.length === 1 ? false :true
                              }
                              icon={updateIcon}
                              onClickUpdate={onHandleReplace}
                            />

                          <Option
                              label="Duplicate"
                              active={
                                selectedSlideId.length === 1 ? false :true
                              }
                              icon={DuplicateIcon}
                              onClickUpdate={onHandlePaste}
                            />

                            <Option
                              label="Delete"
                              active={
                                selectedSlideId.length >= 1 ? false :true
                              }
                              icon={MuiDeleteForeverOutlinedIcon}
                              onClickUpdate={onHandleDeleteButton}
                            />
                      </OptionContainer>:null : null }  
                </div>
          </div>    
          }
      </div>
    )
  };

  return (
    <SideBarContainer
  
    headerContent={ <Title text={"3D Slides"} /> }
      headerAction={getAction()}
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
