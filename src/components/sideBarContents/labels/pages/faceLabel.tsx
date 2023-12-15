import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import { Routes } from "../../../../routes";
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';

import  TreeView from '../../../shared/RcTree/Labels/LabelTreeView';
import { selectCheckedLeafNodes, selectEditableNodeId, selectSelectionPointerId, setEditableNodeId, setSelectionPointerId,handleLabel2DCreation,setIsTitleEditable,setNewTitle } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import {invertNode, expandNode, selectLabelData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel, setActiveLabel, handleProbeHeadCreation, handleMeasurementHeadCreation, selectedLeafNodes, reGroupLabel, selectActiveId, handleFaceHeadCreation,setRouterHistory,selectCheckedNodeForLabelType,
  selectSearchHints,
  removeSearchHint, 
  selectPrevSearches,
  updatePrevSearches
} from "../../../../store/sideBar/labelSlice/AllLabelSlice";
import SearchHints from '../../../shared/hintsPanel'
import SearchBox from 'components/shared/searchBox';
import Clear from '../components/shared/ClearIcon';

import { goBack, push } from 'connected-react-router/immutable';

import AddnotesIcon from '../../../icons/labelNotes';
import PanToolIcon from '@material-ui/icons/PanTool';


import { convertListToTree } from '../../../utils/tree';

import { ReactHTMLElement, useEffect, useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { Layers, selectActiveLayers, selectWindowMgr, setActiveLayers, setEditMode, selectWindows } from '../../../../store/windowMgrSlice';
import { windowPrefixId } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { selectInteractionMode, setLabelInsertionState, selectActiveViewerID } from 'store/appSlice';
import { InteractionMode, setInteractionMode } from 'backend/viewerAPIProxy';

import { undoStack } from "../../../utils/undoStack";

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { IconButton, Theme } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '../components/shared/SearchIcon';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import VisibilityOptions from '../components/shared/Footer/Options/VisibilityOption';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import GroupIcon from '../../../icons/group'
import EyeIcon from 'components/icons/eyeIcon';
import EyeSlashIcon from 'components/icons/eyeSlashIcon';
// Dropdownbutton 

//Custom Hook fro Router History

import useRouterHistory from 'customHooks/useRouterHistory';


export enum Label3DType {

  FACE = "FACE",

}

export default function FaceLabel(){

  const dispatch = useAppDispatch();
  const selectedLeafNode = useAppSelector(selectedLeafNodes)
  const checkedNodes = useAppSelector(selectCheckedLeafNodes);
  const [routerHistory] = useRouterHistory();
  const treeDataRedux = useAppSelector(selectLabelData);
  const windows = useAppSelector(selectWindows);
  const treeRootIds = useAppSelector(selectRootIds);
  const { roots, expanded } = convertListToTree(treeDataRedux, treeRootIds);
  const [scrollx ,setScrollX] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const prevSearches = useAppSelector(selectPrevSearches);
  const searchHints = useAppSelector(selectSearchHints);
  const headerRef = useRef(null);
  const selectedCount = useAppSelector(selectedLength);

  const activeLayer = useAppSelector(selectActiveLayers);
  const viewerId = useAppSelector(selectActiveViewerID);

  const [popOutActiveLabelID, setPopOutActiveLabelID] = useState("");
  const [popOutLabelID, setPopOutLabelID] = useState("");

  let [isPanBtnPressed, setIsPanBtnPressed] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const windowMgr = useAppSelector(selectWindowMgr);
  const interactionMode = useAppSelector(selectInteractionMode);
  const selectionPointerId: string = useAppSelector(selectSelectionPointerId);

   
  const containerRef = useRef(null); 
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const checkedNodeIds  = useAppSelector(state => selectCheckedNodeForLabelType(state,Label3DType.FACE));

  const useMyStyles = makeStyles<Theme>((theme) => ({
    buttonGroup: {
      width: '95%',
      height: '40px'
    },

    button: {
      width: '100%',
      borderRightColor: 'transparent',
      lineHeight: '5px',
      textTransform: 'none',
      justifyContent: "flex-start",
      backgroundColor:theme.palette.accent.primary,
      color:theme.palette.accent.primaryText,
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.fontFamily,
      '&:hover': {
        backgroundColor:theme.palette.accent.secondary,
        color:theme.palette.accent.primaryText,
      }

    },
    divIcon: {
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
      marginLeft: '-10px'

    },
    divider: {
      position: 'absolute',
      right: '0',
      height: '80%',
      border: '1px solid',
      borderLeftColor: theme.palette.text.secondary
    },
    dropdownButton: {
      width: '10%',
      marginLeft: '-1px',
      color: theme.palette.text.secondary,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
      }

    },
    dropdownPaper: {
      width: '95%',
      marginTop: '10px',
      zIndex: 99999999
      //backgroundColor:theme.palette.background.paper
    },
    menuItem: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.fontFamily,
      '&:hover svg': {
        color: theme.palette.text.primary,
      },
      '&:hover': {
        color: theme.palette.text.primary,
      }
    },
    listItemIcon: {
      minWidth: '35px',
      color: theme.palette.text.secondary,

    },
    root: {

      '&.Mui-selected': {
        backgroundColor: `${theme.palette.action.selected} !important`,
        // backgroundColor:"transparent !important",
        color:theme.palette.accent.primaryText,
        borderRadius: "4px",
      },
      '&.MuiIconButton-root': {
        marginTop: '5px',
        padding: '3px'
      }
    },
    icon: {
      height: "20px",
      width: "20px"
    },
    iconTextColor: {
      color: theme.palette.text.secondary,
      '&:hover svg': {
        color: theme.palette.text.primary
      }
    }

  }))


  useEffect(() => {
    isSetPanChange().then((value) => {
      if (value) {
        Object.values(treeDataRedux).forEach((e) => {
          const uid = windowPrefixId + e.id;
          //checking if leaf node exists and if exits, weather isEdit mode of leaf node is true
          if ((e.children.length === 0) && e.pid && !(['PROBE', 'DISTANCE', 'ARC', 'FACE', 'LABEL3D', 'MEASUREMENT', '-1'].includes(e.pid))) {
            if (windowMgr.windows[uid]?.isEditMode) {
              dispatch(setEditMode({ uid, isEdit: false }))
            }//setting window[uid].isEdit value to false when labelList is mounted in-order to handle toggling of "getHeaderRightIcon"
          }
        })
      }
    })
    return () =>{
      //dispatch(setSelectionPointerId(''));
      dispatch(setRouterHistory(routerHistory));
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
      // if (isPressed) { console.log("isPressed is active") }
    }
  }, [])

  //functiion to check for the existence of leaf nodes
  const isSetPanChange = async () => {
    let isEditSet = false;
    await Object.values(treeDataRedux).forEach((e) => {
      if ((e.children.length === 0) && e.pid && !(['PROBE', 'DISTANCE', 'ARC', 'FACE', 'LABEL3D', 'MEASUREMENT', '-1'].includes(e.pid))) {
        isEditSet = true;
      }
    })
    return isEditSet;
  }

  useEffect(() => {
    isSetPanChange().then((value) => { if (!value) { setIsPressed(false) } })
  }, [isPanBtnPressed])

  useEffect(() => {
    if (!isPressed && (activeLayer[0] === Layers.FRONT)) {
      dispatch(setActiveLayers([Layers.VIEWER]));
    }
  }, [isPressed]);
  useEffect(() => {
    if (isPressed && (activeLayer[0] !== Layers.FRONT)) {
      setIsPressed(false);
    }

    // new Labelgui

  }, [activeLayer]);

  const handlePanChange = async () => {
    let localIsPressed = isPressed;
    Object.values(treeDataRedux).forEach((e) => {
      if ((e.children.length === 0) && e.pid && !(['PROBE', 'DISTANCE', 'ARC', 'FACE', 'LABEL3D', 'MEASUREMENT', '-1'].includes(e.pid))) {
        dispatch(setEditMode({
          uid: windowPrefixId + e.id,
          isEdit: !localIsPressed
        }));
      }
    })

    const isToggleEnable = await isSetPanChange()
    if (isToggleEnable) {
      setIsPressed(!isPressed);
      //dispatch(setSelectionPointerId(''))
      setInteractionMode(InteractionMode.DEFAULT, viewerId );
      dispatch(setLabelInsertionState(false));
    }
  }

  const onClickSearchIcon = () => {
    setIsSearchMode(true);
  }

  const getHeaderContent = () => {

    return (isSearchMode ?
      <SearchBox 
      placeholder="Search" 
      text={searchText} 
      onChange={handleSearchTextChange}
      searchPool={treeDataRedux}
      onClear={() => {}}
      
      getAttribKeys={(data) => ["title"]}
  
      />
      : <Title text="Face Label" group="Labels"/>)
  }

  const getHeaderRightIcon = () => {
    return (
      isSearchMode ?
      <div style={{display: "inherit"}}>
      <Clear onClick={() => setIsSearchMode(false)}/>
      <IconButton onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
      </IconButton></div>
      : 
          
      <div style={{display: "inherit"}}>
      <SearchIcon onClick={onClickSearchIcon} />
      <IconButton onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
      </IconButton>
      </div>
    );
  };

  const generateOptions = () => {
    let options:any = {};
    prevSearches.forEach((e:string) => {
        options[e] = Object.keys(options).length;
    })
    searchHints.forEach((e:string) => {
        options[e] = Object.keys(options).length;
    })
    return Object.keys(options) as string[]
  }
  const handleHintsClick = (s:string) => {
      setSearchText(s);
  }
  const handleHintsDelete = (s:string) => {
      dispatch(removeSearchHint({data:s}));
  }
  const handleSearchResult = (results:any[]) => {
    let filtered = results.map(result => {
        let node =  JSON.parse(JSON.stringify(result.item));
        if(result.matches) node.matches =result.matches
        return node
      }
      );
    setSearchResults(filtered);
  }
  const handleSearchTextChange = (s:string, r: any[]) => {
    setSearchText(s);
    setSearchResults(r);
    handleSearchResult(r);
  }

  useEffect(() => {
    if (!isSearchMode){
      dispatch(updatePrevSearches(searchText))
    }
  },[isSearchMode, searchResults, treeDataRedux])


  const onHandlePopOut=(id:string)=>{
    setPopOutActiveLabelID(id)
    setPopOutLabelID(id)
   
   
    if(treeDataRedux[id].children.length > 0){
      

      if(popOutLabelID !== id){
 treeDataRedux[id].children.forEach((item)=>{
  dispatch(setEditMode({
          uid: windowPrefixId + item,
          isEdit: true
  
        }));
        dispatch(setActiveLayers([Layers.FRONT]));
        
  

 })

      }
      else{
        treeDataRedux[id].children.forEach((item)=>{
          dispatch(setEditMode({
                  uid: windowPrefixId + item,
                  isEdit: false
          
                }));
                dispatch(setActiveLayers([Layers.VIEWER]));
               
        
         })
     
         setPopOutLabelID("")
    }
  }
  else {
   
const labelID=windowPrefixId + id

    if( windows[labelID].isEditMode === false ){
    
      dispatch(setEditMode({
              uid: windowPrefixId + id,
              isEdit: true
      
            }));
            dispatch(setActiveLayers([Layers.FRONT]));
      
    
          }
      
          else{
       
              dispatch(setEditMode({
                      uid: windowPrefixId + id,
                      isEdit: false
              
                    }));
                    dispatch(setActiveLayers([Layers.VIEWER]));
                   
            
             
             setPopOutLabelID("")
        }  

  }
}

  const handleInvert = (node: ITreeNode, undoable?: boolean) => {
    dispatch(invertNode({ nodeId: node.id }));
    if (undoable) {
      undoStack.add(
        {
          undo: () => handleInvert(node),
          redo: () => handleInvert(node),
        }
      )
    }

  }
  const handleAdd = () => {
    dispatch(handleFaceHeadCreation({ undoable: true }))
    setInteractionMode(InteractionMode.DEFAULT, viewerId);
    dispatch(setLabelInsertionState(false))

  }

  const handleCheck = (toCheck: boolean, nodeId: string, undoable?: boolean) => {
    dispatch(checkNode({ toCheck, nodeId }));

    if (undoable) {
      undoStack.add(
        {
          undo: () => handleCheck(!toCheck, nodeId),
          redo: () => handleCheck(toCheck, nodeId),
        }
      )
    }
  }

  const handleVisibility = (toShow: boolean, node: ITreeNode, undoable?: boolean) => {
    const leafIds = [node.id];
    const pids = [node.pid];
    dispatch(setCheckedVisibility({ toShow, leafIds }));

    if (undoable) {
      undoStack.add(
        {
          undo: () => handleVisibility(!toShow, node),
          redo: () => handleVisibility(toShow, node),
        }
      )
    }
  }
  const onHandleDeleteButton = () => {
    dispatch(delete3DLabel({ undoable: true ,checkedNodes:checkedNodeIds}));
    setIsPanBtnPressed(!isPanBtnPressed);
  }
  const onHandleRegroup = () => {
    const id = selectedLeafNode[0]
    const pid = treeDataRedux[id].pid;
    const mainPid = treeDataRedux[pid].pid;

    setInteractionMode(InteractionMode.DEFAULT, viewerId);
    dispatch(setLabelInsertionState(false));

    dispatch(reGroupLabel({ selectedNodes: selectedLeafNode, grandPid: mainPid, currentPid: pid, undoable: true }))
  }


  const onHandleShow = () => {
    dispatch(setCheckedVisibility({
      toShow: true,
      leafIds: checkedNodes.map(n => n.id),
      undoable: true,
    }))

  }

  const onHandleInvert = () => {
    dispatch(invertCheckedVisibility({
      leafIds: checkedNodes.map(n => n.id),
      undoable: true,
    }))
  }

  const onHandleHide = () => {
    dispatch(setCheckedVisibility({
      toShow: false,
      leafIds: checkedNodes.map(n => n.id),
      undoable: true,
    }))
  }

  const faceLabelData = roots.filter((treeData: any) => {
    return treeData.pid === 'FACE';
  });

  let dialogProps: DialogueProps = {
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.LABELS
  }

  const handleResultsClick = (e: any) => {
    dispatch(dialogueState(dialogProps));
  }

  const onHandleEdit = (id: string) => {

    dispatch(setEditableNodeId(id));
    dispatch(push(Routes.All_LABELS_EDIT));
  }

  const handleExpand = (toOpen: boolean, nodeId: any) => {
    let toOpenval = treeDataRedux[nodeId.node.id].state.expanded
    toOpenval=!toOpenval
    dispatch(expandNode({ toOpen: toOpenval, nodeId: nodeId.node.id }));
  };

  const handleSelectPoints = (node: any) => {
    // const node = treeDataRedux[activeLabelId]

    // setSelectToggle(!selectToggle)


    // selectionPointerId === node.id ? dispatch(setSelectionPointerId('')) : dispatch(setSelectionPointerId(node.id))
    // if (isPressed) { handlePanChange() }

    // if (node.pid === Label3DType.FACE) {
    //   let mode = interactionMode !== InteractionMode.LABEL3D_FACE ? InteractionMode.LABEL3D_FACE : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_FACE));
    // }

    dispatch(setSelectionPointerId(node.id));

    dispatch(push(Routes.SELECT_WINDOW));


  }

  // New Label Gui 

  useEffect(() => {

    Object.values(windows).forEach((item) => {

      let id = windowPrefixId + popOutActiveLabelID;

      if (id === item.id) {

        item.isEditMode ? setPopOutLabelID(popOutActiveLabelID) : setPopOutLabelID('');
      }

    })

  }, [activeLayer])

  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) => {
    dispatch(setIsTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {
    dispatch(setNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }
    




  const getBody = () => {

    return (
      <div style={{ marginTop: '10px' }} ref = {containerRef}>
        <div ref = {headerRef} >
                {
                    isSearchMode ?
                    <SearchHints data = {generateOptions()} onClick={handleHintsClick} onDelete={handleHintsDelete}></SearchHints>
                    :null
                }
                </div>

        <div style={{display:"flex",justifyContent:"center"}}>
        <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" aria-label="split button">
          <Button className={classes.button} onClick={() => handleAdd()} >
            <div className={classes.divIcon}>
              <AddnotesIcon fontSize="small" />
            </div>
            <div style={{ marginLeft: '10px' }}>Add Face Label</div>
          </Button>
        </ButtonGroup>
        </div>
        
        <TreeView
          treedata={faceLabelData}
          nodes={treeDataRedux}
          labelIcon={false}
          check={handleCheck}
          containerwidth={containerWidth}
          invert={handleInvert}
          expanded={expanded}
          handleExpand={handleExpand}
          visibility={handleVisibility}
          selectionpoint={handleSelectPoints}
          // selected={selectionPointerId}
          edit={onHandleEdit}
          popout={onHandlePopOut}
          isTitleEditable = {true}
          onHandleIsTitleEditable = {onHandleIsTitleEditable}
          setNewTitleTitle = {setNewTitleTitle}
          scrollValue={scrollx}
          searchtext={searchText}
          searchmode={isSearchMode}
        />
      </div>
    )
  }

  const classes = useMyStyles();

  const getFooter = () => {


    return (

      <div>
        <OptionContainer>


          <Option label='Show' active={selectedCount < 1} icon={EyeIcon} onClickUpdate={onHandleShow} />
          <Option label='Hide' active={selectedCount < 1} icon={EyeSlashIcon} onClickUpdate={onHandleHide} />
          {/* <Option label='Group' active={selectedCount < 1} icon={GroupIcon} onClickUpdate ={onHandleRegroup}/> */}
          <Option label='Invert' active={selectedCount < 1} icon={EyeSlashIcon} onClickUpdate={onHandleInvert} />
          <Option label="Delete" active={selectedCount >= 1 ? false : true} icon={MuiDeleteForeverOutlinedIcon} onClickUpdate={onHandleDeleteButton} />

        </OptionContainer>
      </div>

    )
  }

  return (
    <SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />

  )
}
