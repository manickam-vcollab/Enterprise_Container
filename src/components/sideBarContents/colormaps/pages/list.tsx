import MuiIconButton from "@material-ui/core/IconButton";
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";

import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";

import styles from "./style";

import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";

import { goBack, push } from "connected-react-router/immutable";

//import RTree from "../../../shared/RsTreeTable";
import TreeView from "../../../shared/RcTree/ColorMaps/ColorMapsTreeView";

import { undoStack } from "../../../utils/undoStack";

//import AddIcon from "@material-ui/icons/Add";

import { LegendType, setResultMinMax } from "../../../../store/sideBar/colormapSlice";
import { updateLabelMSGAsync } from 'store/sideBar/labelSlice/AllLabelSlice';
import {
  selectcolormapData,
  selectColormapRootIds,
  expandNode,
  createColorMap,
  deleteColorMap,
  setColorMapSelection,
  ColormapType,
  applyColorMap,
  pasteColormap,
  checkNode,
  selectCheckedNodeForALLLabelType,
  singleCheckedNodeId,
  selectedColormapID,
  CheckedNodeIds,
  setPaletteValueAndUserRange,
  selectColorPaletteData,selectCAEDataChange,setCAEDataChange,setLegendEnabled,setIsTitleEditable,setNewTitle,circularProgressStatus,circularProgessStatusChange
} from "../../../../store/sideBar/colormapSlice";
import {caeSelection} from "../../../../store/caeResultSlice";
import { selectActiveViewerID} from '../../../../store/appSlice';

import TreeNodeWithoutCheckbox from "../../../shared/RsTreeTable/treeNodeWithoutCheckbox";
import TreeCollapseIcon from "@material-ui/icons/ChevronRight";
import TreeExpandedIcon from "@material-ui/icons/ExpandMore";
import MuiGrid from "@material-ui/core/Grid";

import { convertListToTree } from "../../../utils/tree";

import { useRef, useEffect, Children } from "react";
import useContainer from "../../../../customHooks/useContainer";

import MuiEditIcon from "@material-ui/icons/EditOutlined";
import MuiFileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import MuiPaste from "@material-ui/icons/AssignmentOutlined";
import MuiDeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import MuiVisibilityIcon from "@material-ui/icons/Visibility";
import OptionContainer from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer";
import Option from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option";
import MuiButton from "@material-ui/core/Button";
import MuiTypography from "@material-ui/core/Typography";
import MuiCheckIcon from "@material-ui/icons/Check";

import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuicloudDoneIcon from "@material-ui/icons/CloudDone";

import { Routes } from "../../../../routes";

import { useState } from "react";

import { setChildItem } from "../../../../store/mainMenuSlice";

import sizeCalculator from "../../../../customHooks/useSizeCalculator";
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import globalThemes from "theme/globalThemes";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function List() {
  const treeDataRedux = useAppSelector(selectcolormapData);
  const colorPaletteData = useAppSelector(selectColorPaletteData);
  const treeRootIds = useAppSelector(selectColormapRootIds);
  const caeSelectionObj = useAppSelector(caeSelection);
  const isCAEDataChanged = useAppSelector(selectCAEDataChange);
  const { roots, expanded } = convertListToTree(treeDataRedux, treeRootIds);
  const isCAEChanged = useAppSelector(selectCAEDataChange);
  const selectedNodeIds = useAppSelector((state) =>
    selectCheckedNodeForALLLabelType(state)
  );
  let circularProgressStatusShow = useAppSelector(circularProgressStatus)

  const classes = globalThemes()

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef, [
    treeDataRedux,
  ]);

  const appliedColorMapId = useAppSelector(
    (state) => state.colormap.appliedColorMapId
  );

  const selectedColorMapId = useAppSelector(
    (state) => state.colormap.selectedColorMapId
  );

  const checkedColorMapId = useAppSelector((state) =>
    singleCheckedNodeId(state)
  );

  const selectCheckedNode = useAppSelector((state) =>
    selectCheckedNodeForALLLabelType(state)
  );
  const legendPaletteType = treeDataRedux[selectedColorMapId].paletteType;
  const selectedColorMapColorPalette = treeDataRedux[selectedColorMapId].colorPalette ;
  const colorSet =  colorPaletteData[selectedColorMapColorPalette].colorSet ;
  const color = colorPaletteData[selectedColorMapColorPalette].noResultColor;
  const noResultColorRGBA = color[0].color;
  const resultBelowMinColor =  colorPaletteData[selectedColorMapColorPalette].belowMinColor;
  const belowMinColorRGBA    =  resultBelowMinColor[0].color;
  const resultAboveMaxColor =  colorPaletteData[selectedColorMapColorPalette].aboveMaxColor;
  const aboveMaxColorRGBA = resultAboveMaxColor[0].color;

  const checkedNodeIds = useAppSelector((state) => CheckedNodeIds(state));

  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();

  // const classes = styles();
  const dispatch = useAppDispatch();
  const activeViewerID = useAppSelector(selectActiveViewerID);

  const treeSelectedkey:any[] = [];
  treeSelectedkey.push(selectedColorMapId);
  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  // useEffect(() => {
  //   if (selectedColorMapId === "-1") {
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps42",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps43",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps44",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps45",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps46",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps47",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps48",
  //         boolean: true,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps49",
  //         boolean: true,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps42",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps43",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps44",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps45",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps46",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps47",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps48",
  //         boolean: false,
  //       })
  //     );
  //     dispatch(
  //       setChildItem({
  //         panelId: "Color Maps4",
  //         childId: "Color Maps49",
  //         boolean: false,
  //       })
  //     );
  //   }
  // }, [selectedColorMapId]);

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}>
        <BackButton />
      </MuiIconButton>
    );
  };

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.COLOR_MAP_LIST
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
  
  
    return (
  
           <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
  
    )
  
  
  } 
  

  const handleExpand = (toOpen: boolean, nodeId: string) => {
    dispatch(expandNode({ toOpen, nodeId }));
  };

  const handleCreateLabel = (nodeId: string) => {
    dispatch(createColorMap({nodeId,caeSelectionObj}));
  };

  const handleRowClick = (node: any) => {

    if (node.children.length === 0 && node.pid !== '-1') {
      dispatch(setColorMapSelection(node.id));
      setOpenDelete(false);
    }

  };

  const handleCheck = (toCheck: boolean, node: any, undoable?: boolean) => {
    const nodeId = node.id;
    dispatch(checkNode({ toCheck, nodeId }));
    if (undoable) {
      undoStack.add({
        undo: () => handleCheck(!toCheck, node.id),
        redo: () => handleCheck(toCheck, node.id),
      });
    }

    // if (checkStateForApply()) {
    setOpenDelete(false);
    if(toCheck === true) {
      dispatch(setColorMapSelection(nodeId));
    }
    else {
      dispatch(setColorMapSelection('-1'));
    }

    // if (node.children.length === 0) {
    //   if (toCheck) {
    //     dispatch(setColorMapSelection(checkedColorMapId));
    //   } else {
    //     dispatch(setColorMapSelection(checkedColorMapId));
    //   }
    // }
    // }
  };

  const onHandleEdit = () => {
    dispatch(setColorMapSelection(selectedColorMapId));
    dispatch(push(Routes.COLORMAPS_EDIT));
    // dispatch(setColorMapSelection(checkedColorMapId));
  };

  const onHandleCopy = () => {
    const newCopy = treeDataRedux[selectedColorMapId];
    setCopied(newCopy);
  };

  const onHandlePaste = () => {
    dispatch(pasteColormap(copied));
  };

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  };

  // const filterCheckedNodes = () => {
  //   let checkedNodesID: any[] = [];
  //   // console.log("treeDataRedux", treeDataRedux);
  //   for (var key in treeDataRedux) {
  //     if (treeDataRedux[key].state.hasOwnProperty("checked")) {
  //       if (
  //         treeDataRedux[key].state.checked === true &&
  //         treeDataRedux[key].state.partiallyChecked === false
  //       ) {
  //         // if (treeDataRedux[key].title !== "System") checkedNodesID.push(key);
  //         checkedNodesID.push(key);
  //       }
  //     }
  //   }
  //   return checkedNodesID;
  // };
  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) =>{
    dispatch(setIsTitleEditable({colorMapId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {

    dispatch(setNewTitle({colorMapId:nodeId,newTitle:newTitle}));
  }

  const onHandleDelete = () => {
    // const checkedNodesID = filterCheckedNodes();
    if (selectedColorMapId) {
      let tempSelectedColorMapId = selectedColorMapId;
      let modifiedSelectedId = '-1';
      for (let key in treeDataRedux) 
        if(treeDataRedux[key].title === "System")
          modifiedSelectedId = treeDataRedux[key].id;  
      dispatch(setColorMapSelection(modifiedSelectedId));
      dispatch(deleteColorMap(tempSelectedColorMapId));
      setOpenDelete(false);
    }
  };

  const onHandleApply = () => {
    
    dispatch(circularProgessStatusChange(true))

   let selectedData = treeDataRedux[selectedColorMapId]; 
   
   let variableId = selectedData.variable;
   let stepId = selectedData.step;
   let derivedTypeId =  selectedData.derivedType.includes(":")?selectedData.derivedType.split(":")[1]:selectedData.derivedType;
   let legendType = (parseInt(legendPaletteType) === LegendType.CONTINUOUS ? 0 : 1)
   let colorSetValues:any[] = [];

    colorSet.forEach(data => {

        let R = data.color.r ;
        let G = data.color.g ;
        let B = data.color.b ;
        //let A = data.color.a ;

       colorSetValues.push([R,G,B]);

    })

    // 0 - CONTINUOUS, 1 - DISCRETE
    //let newColorSet = colorSetValues.slice(1, colorSetValues.length -1);
    viewerAPIProxy.setLegendData(legendType, colorSetValues, activeViewerID);
    viewerAPIProxy.setAboveMaxColor([aboveMaxColorRGBA.r,aboveMaxColorRGBA.g,aboveMaxColorRGBA.b,aboveMaxColorRGBA.a],  activeViewerID);
    viewerAPIProxy.setBelowMinColor([belowMinColorRGBA.r,belowMinColorRGBA.g,belowMinColorRGBA.b,belowMinColorRGBA.a],  activeViewerID);
    viewerAPIProxy.setNoResultColor([noResultColorRGBA.r,noResultColorRGBA.g,noResultColorRGBA.b,noResultColorRGBA.a],  activeViewerID);

    viewerAPIProxy.applyResult(variableId,stepId,derivedTypeId ,activeViewerID)
    .then(
    (resp : any) => {
      let minmax = viewerAPIProxy.getCurrentResultMinMAX(activeViewerID);
      dispatch(setResultMinMax({minmax : [minmax.min, minmax.max]}));
      dispatch(setPaletteValueAndUserRange({minmax : [minmax.min, minmax.max]}));
      // console.log(resp);
      dispatch(circularProgessStatusChange(false));    
      dispatch(updateLabelMSGAsync({}));     
    })
    .catch((error : any ) => {
      console.error(error);
    }
  )
     dispatch(setColorMapSelection(selectedColorMapId));
     dispatch(applyColorMap(selectedColorMapId));
     dispatch(setLegendEnabled(true));
     dispatch(setCAEDataChange(false));
  };

  const checkStateForDelete = () => {
    var constainsSystem = false;
    checkedNodeIds?.forEach((id) => {
      if (treeDataRedux[id].title === "System") {
        constainsSystem = true;
      }
    });
    if (checkedNodeIds) {
      if (checkedNodeIds.length >= 1 && !constainsSystem) {
        return false;
      } else {
        return true;
      }
    }
  };

  // const checkStateForEdit = () => {
  //   var numberOfCheckedChildren = 0;
  //   for (var key in treeDataRedux) {
  //     if (treeDataRedux[key].state.hasOwnProperty("checked")) {
  //       if (treeDataRedux[key].state.checked == true) {
  //         numberOfCheckedChildren++;
  //       }
  //     }
  //   }
  //   if (numberOfCheckedChildren > 2) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const checkStateForApply = () => {
  //   var numberOfCheckedChildren = 0;
  //   for (var key in treeDataRedux) {
  //     if (treeDataRedux[key].state.hasOwnProperty("checked")) {
  //       if (treeDataRedux[key].state.checked == true) {
  //         numberOfCheckedChildren++;
  //         // console.log(
  //         //   "===checked title",
  //         //   treeDataRedux[key].title,
  //         //   treeDataRedux[selectedColorMapId].title
  //         // );
  //       }
  //     }
  //   }
  //   if (numberOfCheckedChildren > 2) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const getBody = () => {
    return (
      <div
        ref={containerRef}
        // style={{ height: "100%", background: "transparent" }}
      >
        <TreeView
          treedata={roots}
          defaultExpandAll
          nodes={treeDataRedux}
          onExpand={handleExpand}
          add={handleCreateLabel}
          onClick={handleRowClick}
          isTitleEditable = {true}
          onHandleIsTitleEditable = {onHandleIsTitleEditable}
          setNewTitleTitle = {setNewTitleTitle}
          //check={handleCheck}
          PidName = "List"
          containerwidth = {containerWidth}
          selectedKey = {treeSelectedkey}
      

          // node={treeDataRedux[appliedColorMapId]}
          // check={handleCheck}
          // selectionpoint={handleSelectPoints}
          // onSelect={[selectedColorMapId]}
          // onClick={handleRowClick(treeDataRedux[appliedColorMapId])}
          // onRowClick={handleRowClick}
          // onClick={handleRowClick}
          // selected={[selectedColorMapId]}
          // selectionpoint={handleSelectPoints}
        />
      </div>
    );
  };

  const getFooter = () => {
    return (
      <div>
        {!openDelete ? (
          <div>
            {((selectedColorMapId !== "-1" &&
            selectedColorMapId !== appliedColorMapId)
            || (selectedColorMapId !== "-1" && selectedColorMapId  === appliedColorMapId && isCAEChanged === true)
            ) ? (
              <MuiGrid
                container
                style={{ marginTop: "20px", display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',alignContent:'center',gap:'10px' }}
              >
                {treeDataRedux[selectedColorMapId].downloaded === true ? (
                  null
                ) : ( 
                  <MuiGrid item xs={4} style={{display:'flex',alignItems:'center'}}>
                    {" "}
                    {sizeCalculator(treeDataRedux[selectedColorMapId].size)}{" "}
                  </MuiGrid>
                )}
                <MuiGrid item>
                  <MuiButton
                    className={classes.Muibtn}
                    // style={{ marginRight: "5px" }}
                    autoFocus
                    onClick={onHandleApply}
                    // disabled={readOnly}
                    // color="primary"
                  >
                    {treeDataRedux[selectedColorMapId].downloaded === true
                      ? "Apply"
                      : "Download & Apply"}
                  </MuiButton>
                </MuiGrid>
              </MuiGrid>
            ) : circularProgressStatusShow ? <CircularProgress style={{marginTop:'20px'}} size={30} color='inherit' ></CircularProgress> : null}

            <OptionContainer>
              <Option
                label = "Edit"
                active={selectedColorMapId === "-1"}
                onClickUpdate={onHandleEdit}
                icon = {MuiEditIcon}
              />

              <Option
                label="Copy"
                active={selectedColorMapId === "-1"}
                icon={MuiFileCopyOutlinedIcon}
                onClickUpdate={onHandleCopy}
              />
              <Option
                label="Paste"
                active={!copied || selectedColorMapId === "-1"}
                icon={MuiPaste}
                onClickUpdate={onHandlePaste}
              />
              <Option
                label="Delete"
                active={
                  treeDataRedux[selectedColorMapId]?.colormapType === ColormapType.SYSTEM || selectedColorMapId?.includes(appliedColorMapId)
                  //checkStateForDelete()
                }
                icon={MuiDeleteForeverOutlinedIcon}
                onClickUpdate={onHandleDeleteButton}
              />
            </OptionContainer>
          </div>
        ) : (
          <div style={{ margin:"20px 10px"}}>
            <div style={{ margin:"10px"}}>
              <MuiTypography style={{ marginBottom: "5px", fontSize: "14px" }}>
                Are you sure want to delete the selected Color Map?
              </MuiTypography>
              <div style={{display:'flex', alignContent: "center",justifyContent:'center',gap:'10px',marginBottom:'10px' }}>
                <MuiButton
                  // style={{
                  //   backgroundColor: "#5958FF",
                  //   width: "20%",
                  //   fontSize: "9px",
                  //   marginRight: "5px",
                  // }}
                  className={classes.Muibtn}
                  style={{width:'max-content'}}
                  autoFocus
                  onClick={onHandleDelete}
                  // color="primary"
                >
                  Confirm
                </MuiButton>
                <MuiButton
                  className={classes.BtnOutlined}
                  // style={{ width: "unset", backgroundColor:'unset',border:'1px solid'}}
                  onClick={() => setOpenDelete(false)}
                  // color="primary"
                >
                  Cancel
                </MuiButton>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <SideBarContainer
      headerContent={<Title text={"List"} group="Color Maps" />}
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
