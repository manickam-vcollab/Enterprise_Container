import { useEffect } from "react";
import MuiIconButton from "@material-ui/core/IconButton";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import {
  setWindowPos,
  setWindowAnchor,
  selectWindowSize,
  setEditMode,
} from "store/windowMgrSlice";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";
import DuplicateIcon from '../../../icons/duplicate';
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import MuiListSubHeader from "@material-ui/core/ListSubheader";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { ViewerContext } from "components/App";
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';
import { selectActiveViewerID} from '../../../../store/appSlice';
import toastMessage from '../../messages/toastMessage.json';
import {
  colormapElements,
  selectColorPaletteData,
  setColorMapSelection,
  selectColorPaletteRootIds,
  expandColorPaletteNode,
  createPalette,
  setColorPalette,
  selectcolormapData,
  selectedColorPaletteId,
  setSelectedColorPalette,
  deleteColorPalette,
  pasteColorPalette,
  ColormapType,
  checkNodeColorPalette,
  CheckedColorPalette,
  CheckedColorPaletteIds,
  selectIsColorSetValueChanged,
  setIsColorSetValueChanged,LegendType,
  setIsColorPaletteTitleEditable,
  setColorPaletteNewTitle
} from "../../../../store/sideBar/colormapSlice";
import { undoStack } from "../../../utils/undoStack";

import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";

import { goBack, push } from "connected-react-router/immutable";
import { useState, useContext } from "react";

import RTree from "../../../shared/RsTreeTable";
import TreeView from "../../../shared/RcTree/ColorMaps/ColorMapsTreeView";
import AddIcon from "@material-ui/icons/Add";

import { convertListToTree } from "../../../utils/tree";

import TreeNodeWithoutCheckbox from "../../../shared/RsTreeTable/treeNodeWithoutCheckbox";
import TreeCollapseIcon from "@material-ui/icons/ChevronRight";
import TreeExpandedIcon from "@material-ui/icons/ExpandMore";
import MuiGrid from "@material-ui/core/Grid";
import { windowId } from "../shared/colorPlot/colorplotWindow";
import { useRef } from "react";
import useContainer from "../../../../customHooks/useContainer";
import {
  selectlegendList,
  setApplyItem,
} from "../../../../store/sideBar/colormapSlice";
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
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import styles from './style';

import { Routes } from "../../../../routes";
import globalThemes from "theme/globalThemes";
import { toastMsg } from "store/toastSlice";

export default function ColorPalette() {
  const selectedColorMapId = useAppSelector(
    (state) => state.colormap.selectedColorMapId
  );
  const checkedColorPaletteId = useAppSelector((state) =>
    CheckedColorPalette(state)
  );

  const appliedColorMapId = useAppSelector(
    (state) => state.colormap.appliedColorMapId
  );

  const checkedNodeIds = useAppSelector((state) =>
    CheckedColorPaletteIds(state)
  );
  const windowSize = useAppSelector((state) =>
    selectWindowSize(state, windowId)
  );
  const listItems = useAppSelector(selectlegendList);
  const viewerContainerRef = useContext(ViewerContext);
  const colormapsData = useAppSelector(selectcolormapData);
  const colormapNamelist = useAppSelector(colormapElements);

  const customClasses = globalThemes();
  const classes = styles();

  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId);
  // const appliedColorPalette = colormapsData[activeColormapId].colorPalette;
  let isColorPalettUsed:boolean = false;
  let appliedColorPalette:any = null;
  let selectedKey:string;
  if(appliedColorMapId !== '-1') {

    appliedColorPalette = colormapsData[selectedColorMapId].colorPalette;
  }

  const selectedColorPalette = useAppSelector(selectedColorPaletteId);

  // const readOnly =
  //   colormapsData[activeColormapId].colormapType === ColormapType.SYSTEM
  //     ? true
  //     : false;
  const isColorSetChanged = useAppSelector(selectIsColorSetValueChanged);
  const treeDataRedux = useAppSelector(selectColorPaletteData);
  const treeRootIds = useAppSelector(selectColorPaletteRootIds);
  const { roots, expanded } = convertListToTree(treeDataRedux, treeRootIds);
  const [currentId, setCurrentId] = useState("-1");
  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef, [
    treeDataRedux,
  ]);
  const legendPaletteType = colormapsData[selectedColorMapId].paletteType;
  const selectedColorMapColorPalette = colormapsData[selectedColorMapId].colorPalette ;
  const colorSet = selectedColorPalette === "-1"? treeDataRedux[selectedColorMapColorPalette].colorSet: treeDataRedux[selectedColorPalette].colorSet;
  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();
  const activeViewerID = useAppSelector(selectActiveViewerID);

  const dispatch = useAppDispatch();

  const colorPaletteList = useAppSelector(
    (state) => state.colormap.colorPaletteTree.data
  );
  const noResultColor =  colorPaletteList[selectedColorPalette].noResultColor;
  const noResultColorRGBA = noResultColor[0].color;
  const resultBelowMinColor =  colorPaletteList[selectedColorPalette].belowMinColor;
  const belowMinColorRGBA    =  resultBelowMinColor[0].color;
  const resultAboveMaxColor =  colorPaletteList[selectedColorPalette].aboveMaxColor;
  const aboveMaxColorRGBA = resultAboveMaxColor[0].color;

  if(selectedColorPalette !== "-1") {

      selectedKey = selectedColorPalette;
  }
  else {
    selectedKey = appliedColorPalette;
  }

  // useEffect(()=>{

  //   if(appliedColorPalette !== null && appliedColorPalette!== "-1" )
  //   dispatch(setSelectedColorPalette(appliedColorPalette));

  // },[])

  Object.values(colormapsData).forEach((colorMap:any)=> {
      if(selectedColorPalette === colorMap.colorPalette){
        isColorPalettUsed = true;
      }

  })
  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  const onHandleSelect = (id: string) => {
    setActiveColormapId(id);
    dispatch(setColorMapSelection(id));
  };

  const handleExpand = (toOpen: boolean, nodeId: string) => {
    dispatch(expandColorPaletteNode({ toOpen, nodeId }));
  };

  const handleCreatePalette = () => {
    dispatch(createPalette());
  };

  // const handlePaletteClick = (node: any) => {
  //   if (
  //     treeDataRedux[node.id].pid !== "-1" &&
  //     treeDataRedux[node.id].children.length === 0
  //   )
  //     dispatch(setSelectedColorPalette(node.id));
  //   setOpenDelete(false);
  // };

  const handleRowClick = ( node: any) => {
    const nodeId = node.id;
    // if (undoable) {
    //   undoStack.add({
    //     undo: () => handleRowClick(!toCheck, node.id),
    //     redo: () => handleRowClick(toCheck, node.id),
    //   });
    // }
    if (node.children.length === 0 && node.pid !== '-1') { 
      dispatch(setSelectedColorPalette(node.id));
      setOpenDelete(false);
    }

  };

  const [singleSelectTimer, setSingleSelectTimer] = useState<number|null>(null);
  const onHandleRowClick = (node:any) => {
    if (singleSelectTimer) {
      // if there is a single click timer set, it means this is a double click
      clearTimeout(singleSelectTimer);
      setSingleSelectTimer(null);
      // handleDoubleClick();
      // props.handleRowUnselect();
      // if(props.unselect === true) {
      //   setTreeSelectedKey("");  
      //   props.handleRowUnselect();
    
      //  }
    } else {
      // if there's no single click timer, set one for the single click
      setSingleSelectTimer(window.setTimeout(() => {
        setSingleSelectTimer(null);
        handleRowClick(node);
        // console.log('test single clicik data',node)
      }, 200));
    }
  }

  const handleRowUnselect = () =>{

    //dispatch(setSelectedColorPalette("-1"));

  }

  const onHandleApply = () => {

      dispatch(
        setColorPalette({
          colorMapId: activeColormapId,
          colorPaletteId: selectedColorPalette,
        })
      );

      let legendType = (parseInt(legendPaletteType) === LegendType.CONTINUOUS ? 0 : 1)
      let colorSetValues:any[] = [];

      colorSet.forEach(data => {

        let R = data.color.r ;
        let G = data.color.g ;
        let B = data.color.b ;
        let A = data.color.a ;

       colorSetValues.push([R,G,B]);

    })

    if(appliedColorMapId === selectedColorMapId) {
      //let newColorSet = colorSetValues.slice(1, colorSetValues.length -1);
      viewerAPIProxy.setAboveMaxColor([aboveMaxColorRGBA.r,aboveMaxColorRGBA.g,aboveMaxColorRGBA.b,aboveMaxColorRGBA.a],  activeViewerID);
      viewerAPIProxy.setBelowMinColor([belowMinColorRGBA.r,belowMinColorRGBA.g,belowMinColorRGBA.b,belowMinColorRGBA.a],  activeViewerID);
      viewerAPIProxy.setNoResultColor([noResultColorRGBA.r,noResultColorRGBA.g,noResultColorRGBA.b,noResultColorRGBA.a], activeViewerID);
      viewerAPIProxy.setLegendData(legendType, colorSetValues, activeViewerID);
    }
 
    dispatch(setIsColorSetValueChanged(false));
    dispatch(toastMsg({msg:toastMessage.colormaps001}))
  };

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  };

  const onHandleDelete = () => {
    if (selectedColorPalette) {
          dispatch(deleteColorPalette(selectedColorPalette));
          // dispatch(setSelectedColorPalette("-1"));
          appliedColorPalette ? dispatch(setSelectedColorPalette(appliedColorPalette)) : dispatch(setSelectedColorPalette("2"));
          setOpenDelete(false);
    }
  };

  const onHandleDuplicate = () => {
    const newCopy = treeDataRedux[selectedColorPalette];
    dispatch(pasteColorPalette(newCopy));
    //setCopied(newCopy);
  };

  const onHandlePaste = () => {
    // if (copied) dispatch(pasteColorPalette(copied));
   
  };

  const onHandleEdit = () => {
    // setColorPalette(checkedColorPaletteId);
    dispatch(push(Routes.COLORMAPS_COLOR_PALETTE_EDIT));
  };

  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) => {
    dispatch(setIsColorPaletteTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {

    dispatch(setColorPaletteNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }

  // const checkStateForDelete = () => {
  //   var constainsPid = false;
  //   checkedNodeIds?.forEach((id) => {
  //     if (treeDataRedux[id].pid === "0") {
  //       constainsPid = true;
  //     }
  //   });
  //   let ret;
  //   if (checkedNodeIds) {
  //     if (checkedNodeIds.length >= 1 && !constainsPid) {
  //       ret = false;
  //     } else {
  //       ret = true;
  //     }
  //   }
  //   return ret;
  // };

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}>
        <BackButton />
      </MuiIconButton>
    );
  };

  const getAction = () => {
    const parentNodes = colormapNamelist.filter(
      (item) => item.children?.length !== 0
    );

    return (
      <SelectAction
        labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
        value={activeColormapId}
        onChange={(e: any) => {
          if (e.target.value) onHandleSelect(e.target.value);
        }}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        <MuiListSubHeader key={parentNodes[0].id}>
          {parentNodes[0].name}
        </MuiListSubHeader>
        {colormapNamelist.map((element: any) => {
          return element.pid === parentNodes[0].id ? (
            <MuiMenuItem className={customClasses.selected} key={element.id} value={element.id}>
              {element.name}
            </MuiMenuItem>
          ) : null;
        })}

  
      </SelectAction>
    );
  };

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.COLOR_PALETTE
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
  
  
    return (
  
           <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
  
    )
  
  } 
  
  const getBody = () => {
    return (
      <div
        ref={containerRef}
       className={classes.scrollBar}
      >
        <TreeView
          treedata={roots}
          defaultExpandAll
          nodes={treeDataRedux}
          onExpand={handleExpand}
          selectedKey={[selectedKey]}
          unselect = {true}
          add = {handleCreatePalette}
          isTitleEditable = {true}
          // check={handlePaletteClick}
          //check={handleCheck}
          onHandleIsTitleEditable = {onHandleIsTitleEditable}
          setNewTitleTitle = {setNewTitleTitle}
          PidName="ColorPalette"
          containerwidth={containerWidth}
          // add={handleCreateLabel}
          onClick={handleRowClick}
          handleRowUnselect={handleRowUnselect}
        />
      </div>
    );
  };

  const getFooter = () => {
    return (
      <div>
        {!openDelete ? (
          <div>
            {(selectedColorPalette !== "-1" &&
            selectedColorPalette !== appliedColorPalette)?(
              <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                <MuiButton
                  // style={{
                  //   backgroundColor: "#5958FF",
                  //   width: "20%",
                  //   fontSize: "9px",
                  //   marginRight: "5px",
                  // }}
                  className={customClasses.Muibtn}
                  autoFocus
                  onClick={onHandleApply}
                  // disabled={readOnly}
                  // color="primary"
                >
                {appliedColorMapId === activeColormapId ? 'Apply' : 'Save'} 
                </MuiButton>
              </div>
            ) : null}

            <OptionContainer>
              <Option
                label={
                  treeDataRedux[selectedColorPalette]?.pid !== "0"
                    ? "Edit"
                    : "View"
                }
                active={
                  selectedColorPalette === "-1" 
                  // !checkStateForEdit()
                }
                onClickUpdate={onHandleEdit}
                icon={
                  treeDataRedux[selectedColorPalette]?.pid !== "0" 
                    ? MuiEditIcon
                    : MuiVisibilityIcon
                }
              />

              <Option
                label="Duplicate"
                active={selectedColorPalette === "-1"}
                icon={DuplicateIcon}
                onClickUpdate={onHandleDuplicate}
              />
              <Option
                label="Delete"
                active={
                  (selectedColorPalette === "-1" || treeDataRedux[selectedColorPalette]?.pid === "0") || (isColorPalettUsed === true) 
                }
                icon={MuiDeleteForeverOutlinedIcon}
                onClickUpdate={onHandleDeleteButton}
              />
            </OptionContainer>
          </div>
        ) : (
          <div>
            <div style={{ margin:"15px 5px" }}>
              <MuiTypography style={{ margin: "5px 5px", fontSize: "14px" }}>
                Are you sure want to delete the selected Color Palette?
              </MuiTypography>
              <div style={{display:'flex', gap:'10px', justifyContent:'center', alignContent: "center" }}>
                <MuiButton
                  // style={{
                  //   backgroundColor: "#5958FF",
                  //   width: "20%",
                  //   fontSize: "9px",
                  //   marginRight: "5px",
                  // }}
                  className={customClasses.Muibtn}
                  autoFocus
                  onClick={onHandleDelete}
                  // color="primary"
                >
                  Confirm
                </MuiButton>
                <MuiButton
                  // style={{ width: "20%", fontSize: "9px" }}
                  className={customClasses.BtnOutlined}
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
      headerContent = {<Title text={"Color Palette"} group="Color Maps" />}
      headerAction = {getAction()}
      headerRightIcon = {getHeaderRightIcon()}
      body = {getBody()}
      footer = {getFooter()}
    />
  );
}
