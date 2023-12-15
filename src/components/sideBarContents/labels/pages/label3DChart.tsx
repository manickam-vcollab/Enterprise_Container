import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';                                                                                                                                                                                                                                                                                  

import PointLabelIcon from '../../../icons/labelNotes';
import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import  TreeView from '../../../shared/RcTree/Labels/LabelTreeView';
import { selectCheckedLeafNodes, selectEditableNodeId, selectSelectionPointerId, setEditableNodeId, setSelectionPointerId,handleLabel2DCreation, handle3dChartHeadCreation, setRouterHistory,setIsTitleEditable,setNewTitle } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import {invertNode, expandNode, selectLabelData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel, setActiveLabel, handleProbeHeadCreation, handleMeasurementHeadCreation, selectedLeafNodes, reGroupLabel, selectActiveId, handleFaceHeadCreation,selectCheckedNodeForLabelType,
  selectSearchHints,
  removeSearchHint, 
  selectPrevSearches,
  updatePrevSearches
} from "../../../../store/sideBar/labelSlice/AllLabelSlice";
import SearchHints from '../../../shared/hintsPanel'
import SearchBox from 'components/shared/searchBox';
import Clear from '../components/shared/ClearIcon';
import AddCell from '../components/shared/TreeIcons/AddCell'

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import VisibilityOptions from '../components/shared/Footer/Options/VisibilityOption';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';

import {goBack,push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes";

import InvertCell from '../../../shared/RsTreeTable/Invert';
import TreeNode from '../../../shared/RsTreeTable/TreeNode';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import MuiGrid from '@material-ui/core/Grid';
import PanToolIcon from '@material-ui/icons/PanTool';

import { convertListToTree } from '../../../utils/tree';

import { ReactHTMLElement, useEffect, useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { Layers, selectActiveLayers , selectWindowMgr, setActiveLayers, setEditMode,selectWindows} from '../../../../store/windowMgrSlice';
import { windowPrefixId } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { selectInteractionMode, setLabelInsertionState, selectActiveViewerID } from 'store/appSlice';
import { InteractionMode, setInteractionMode } from 'backend/viewerAPIProxy';
import { LabelType,Label3DType,LabelChartType } from 'store/sideBar/labelSlice/shared/types';

import SelectPointIcon from 'components/icons/selectPoint';
import XYPlotsIcon from 'components/icons/xyplots';

import MuiAddIcon from '@material-ui/icons/Add';
import MuiCreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';

import {undoStack} from "../../../utils/undoStack";
import { Label } from '@material-ui/icons';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { IconButton, Theme } from '@material-ui/core';
import clsx from 'clsx';
import SelectionPointer from 'components/shared/RsTreeTable/SelectionPointer';
import EyeIcon from 'components/icons/eyeIcon';
import EyeSlashIcon from 'components/icons/eyeSlashIcon';
import EyeInvert from 'components/icons/eyeInvert';
import EditButton from 'components/shared/RsTreeTable/EditButton';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '../components/shared/SearchIcon';
import { tourListSlice } from 'store/tourSlice';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';

// Dropdownbutton 
import Dropdownbutton from '../components/Dropdownbutton';
// import { LabelChartType } from 'store/sideBar/labelSliceNew/shared/types';

// CustomHook for RouterHistory

import useRouterHistory from 'customHooks/useRouterHistory';


export default function Label3DChart(){

  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack()); 
  }
  
  const [routerHistory] = useRouterHistory();
  const treeDataRedux = useAppSelector(selectLabelData);
  const treeRootIds = useAppSelector(selectRootIds);
  const checkedNodes = useAppSelector(selectCheckedLeafNodes);
  const windows = useAppSelector(selectWindows);

  const selectedCount = useAppSelector(selectedLength);
  
  const selectedLeafNode = useAppSelector(selectedLeafNodes)
  const selectedLeafCount = selectedLeafNode.length
  const activeLayer = useAppSelector(selectActiveLayers);
  const interactionMode = useAppSelector(selectInteractionMode);
  const viewerId = useAppSelector(selectActiveViewerID);

  const [selectToggle, setSelectToggle] = useState<boolean>(false);
  const [popOutActiveLabelID , setPopOutActiveLabelID] = useState("");
  const [popOutLabelID , setPopOutLabelID] = useState("");
  const activeLabelId : string = useAppSelector(selectActiveId)
  const selectionPointerId : string = useAppSelector(selectSelectionPointerId)
  const editableNodeId : string = useAppSelector(selectEditableNodeId);

  let [isPanBtnPressed,setIsPanBtnPressed] = useState(false);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
  const [scrollx ,setScrollX] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const prevSearches = useAppSelector(selectPrevSearches);
  const searchHints = useAppSelector(selectSearchHints);
  const headerRef = useRef(null);

  const checkedNodeIds  = useAppSelector(state => selectCheckedNodeForLabelType(state,LabelChartType.LINECHART3D));

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);
  const [isPressed,setIsPressed] = useState(false);
  const windowMgr = useAppSelector(selectWindowMgr);


  const useMyStyles = makeStyles<Theme>((theme) => ({
    buttonGroup:{
      width:'95%',
      height:'40px'
    },
    
    button:{
      width:'100%',
      borderRightColor:'transparent',
      lineHeight:'5px',
      textTransform:'none',
      justifyContent: "flex-start",
      backgroundColor:theme.palette.accent.primary,
      color:theme.palette.accent.primaryText,
      fontSize:theme.typography.body2.fontSize,
      fontFamily:theme.typography.fontFamily,
      '&:hover': {
        backgroundColor:theme.palette.accent.secondary,
        color:theme.palette.accent.primaryText,
      }
  
    },
    divIcon:{
      display:'inherit',
      alignItems:'inherit',
      justifyContent:'inherit',
      marginLeft:'-10px'
  
    } ,
    divider:{
      position:'absolute',
      right:'0',
      height:'80%',
      border:'1px solid',
      borderLeftColor:theme.palette.text.secondary
    },
    dropdownButton:{
      width:'10%',
      marginLeft:'-1px',
      color:theme.palette.text.secondary,
      '&:hover': {
        backgroundColor:theme.palette.primary.main,
        color: theme.palette.text.primary,
      }
  
    },
    dropdownPaper:{
      width:'95%',
      marginTop:'10px',
      zIndex:99999999
      //backgroundColor:theme.palette.background.paper
    },
    menuItem:{
      color:theme.palette.text.secondary,
      fontSize:theme.typography.body2.fontSize,
      fontFamily:theme.typography.fontFamily,
      '&:hover svg': {
        color: theme.palette.text.primary,
      },
      '&:hover': {
        color: theme.palette.text.primary,
    }
    },
    listItemIcon:{
      minWidth:'35px',
      color:theme.palette.text.secondary,
  
    },
    root: {

      '&.Mui-selected':{
        backgroundColor: `${theme.palette.action.selected} !important`,
        // backgroundColor:"transparent !important",
        color:theme.palette.accent.primaryColor,
        borderRadius: "4px",
      },
      '&.MuiIconButton-root':{
        marginTop: '5px',
        padding: '3px'
      }
    },
    icon: {
      height:"20px",
      width:"20px"
    },
    iconTextColor:{
      color:theme.palette.text.secondary,
      '&:hover svg':{
          color:theme.palette.text.primary
      }
  }
  
  }))


  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  useEffect(() => {
    isSetPanChange().then((value) =>{
      if(value){
        Object.values(treeDataRedux).forEach((e) => {
          const uid = windowPrefixId + e.id;
          //checking if leaf node exists and if exits, weather isEdit mode of leaf node is true
          if ((e.children.length === 0) && e.pid && !(['PROBE','DISTANCE','ARC','FACE','LABEL3D','MEASUREMENT','-1'].includes(e.pid))) {
            if(windowMgr.windows[uid]?.isEditMode){
              dispatch(setEditMode({uid,isEdit:false}))
            }//setting window[uid].isEdit value to false when labelList is mounted in-order to handle toggling of "getHeaderRightIcon"
          }
        })
      }
    })
    return () =>{
//      // dispatch(setSelectionPointerId(''));
      dispatch(setRouterHistory(routerHistory));
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
      // if(isPressed){console.log("isPressed is active")}
    }
  },[])

  //functiion to check for the existence of leaf nodes
  const isSetPanChange  = async () => {
    let isEditSet = false;
    await Object.values(treeDataRedux).forEach((e) => {
      if ((e.children.length === 0) && e.pid && !(['PROBE','DISTANCE','ARC','FACE','LABEL3D','MEASUREMENT','-1'].includes(e.pid))) {
        isEditSet = true;
      } 
    })
    return isEditSet;
  } 

  useEffect (() => {
    isSetPanChange().then((value) => { if(!value){setIsPressed(false)}})
  },[isPanBtnPressed])

  useEffect ( () => {
    if (!isPressed &&( activeLayer[0] === Layers.FRONT)){
      dispatch(setActiveLayers([Layers.VIEWER]));
    } 
  },[isPressed]);
  useEffect ( () => {
    if (isPressed &&( activeLayer[0] !== Layers.FRONT)){
      setIsPressed(false);
    }

 // new Labelgui

  },[activeLayer]);

  const handlePanChange = async () => {
    let localIsPressed = isPressed;
    Object.values(treeDataRedux).forEach((e) => {
      if ((e.children.length === 0) && e.pid && !(['PROBE','DISTANCE','ARC','FACE','LABEL3D','MEASUREMENT','-1'].includes(e.pid))) {
        dispatch(setEditMode({
          uid: windowPrefixId + e.id,
          isEdit: !localIsPressed
        }));
      }
    })

    const isToggleEnable = await isSetPanChange()
    if(isToggleEnable){
      setIsPressed(!isPressed);
      dispatch(setSelectionPointerId(''))
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
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
      : <Title text="3D Charts" group="Labels"/>)
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

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    // dispatch(expandNode({toOpen,nodeId}));
    let toOpenval = treeDataRedux[nodeId.node.id].state.expanded
    toOpenval=!toOpenval
    dispatch(expandNode({ toOpen: toOpenval, nodeId: nodeId.node.id }));
  }

  const handleInvert = (node:ITreeNode, undoable?:boolean) => {
    dispatch(invertNode({nodeId:node.id}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleInvert(node),
          redo: () => handleInvert(node),
        }
      )
    }
    
  }
  
  const handleCheck = (toCheck:boolean, nodeId:string, undoable?:boolean) => {
    dispatch(checkNode({toCheck,nodeId}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleCheck(!toCheck, nodeId),
          redo: () => handleCheck(toCheck, nodeId),
        }
      )
    }
  }

  const dataPointtopoint = roots.filter((treeData:any) => {
    return treeData.pid === 'LINECHART3D';
  });

  const handleVisibility = (toShow:boolean,node:ITreeNode,undoable?:boolean) => {
    const leafIds = [node.id];
    const pids = [node.pid];
    dispatch(setCheckedVisibility({toShow, leafIds}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleVisibility(!toShow, node),
          redo: () => handleVisibility(toShow, node),
        }
      )
    }
  }

  const handleAdd = (node:ITreeNode) => {
    if(node.id === LabelType.LABEL2D){
      if(selectionPointerId !== ''){
        dispatch(setSelectionPointerId(''));
      } 
      let mode = interactionMode !== InteractionMode.LABEL2D ? InteractionMode.LABEL2D : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL2D));
      (isPressed) && handlePanChange()
    }

    if(node.id === Label3DType.PROBE){
      dispatch(handleProbeHeadCreation({undoable: true}))
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
    }

    if(node.id === Label3DType.FACE){
      dispatch(handleFaceHeadCreation({undoable: true}))
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
    }

    if(node.id === Label3DType.DISTANCE){
      dispatch(handleMeasurementHeadCreation({pid :Label3DType.DISTANCE, undoable: true }))
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
    }

    if(node.id === Label3DType.ARC){
      dispatch(handleMeasurementHeadCreation({pid : Label3DType.ARC,  undoable: true}))
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
    }

    
    // if(node.id === Label3DType.DISTANCE){
    //   let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT));
    // }
    
    // if(node.id === Label3DType.ARC){
    //   let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC));
    // }

  }

  const handleSelectPoints = (node:any) => {
    // const node = treeDataRedux[activeLabelId]

    // setSelectToggle(!selectToggle)
    // selectionPointerId === node.id ? dispatch(setSelectionPointerId('')) : dispatch(setSelectionPointerId(node.id))
    // if(isPressed){handlePanChange()}

    dispatch(setSelectionPointerId(node.id));

    dispatch(push(Routes.SELECT_WINDOW));

    // if(node.pid === LabelChartType.LINECHART3D){
    //   let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    // }


    // if(node.pid === Label3DType.PROBE){
    //   let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    // }

    // if(node.pid === Label3DType.FACE){
    //   let mode = interactionMode !== InteractionMode.LABEL3D_FACE ? InteractionMode.LABEL3D_FACE : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_FACE));
    // }

    // if(node.pid === Label3DType.DISTANCE){
    //   let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT));
    // }

    // if(node.pid === Label3DType.ARC){
    //       let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT;
    //       setInteractionMode(viewerId, mode);
    //       dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC));
    // }

    
  }

  const onHandleRegroup = () => {
    const id = selectedLeafNode[0]
    const pid = treeDataRedux[id].pid;

    const mainPid = treeDataRedux[pid].pid;

    setInteractionMode(InteractionMode.DEFAULT, viewerId);
    dispatch(setLabelInsertionState(false));

    dispatch(reGroupLabel({selectedNodes : selectedLeafNode, grandPid: mainPid, currentPid:pid, undoable: true}))
  }

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.LABELS
  }

  const handleResultsClick = (e:any) => {
  dispatch(dialogueState(dialogProps));
  }

  const onHandleShow = () => {
    dispatch(setCheckedVisibility({
      toShow: true,
      leafIds: checkedNodes.map(n => n.id),
      undoable: true,
    }))

  }

  const onHandleHide = () =>{
    dispatch(setCheckedVisibility({
      toShow: false,
      leafIds: checkedNodes.map(n => n.id),
      undoable: true,
    }))
  }

  const onHandleInvert = () =>{
    dispatch(invertCheckedVisibility({
      leafIds: checkedNodes.map(n => n.id),
      undoable: true,
    }))
  }

  
  const onHandleDeleteButton = () => {

    dispatch(delete3DLabel({ undoable: true ,checkedNodes:checkedNodeIds}));
    setIsPanBtnPressed(!isPanBtnPressed);
  };

  
 // New Label Gui 

 useEffect(()=>{

  Object.values(windows).forEach((item)=> {

    let id = windowPrefixId + popOutActiveLabelID;
  
    if(id === item.id) {
  
          item.isEditMode ? setPopOutLabelID(popOutActiveLabelID) : setPopOutLabelID('');
    }
  
  })

 },[activeLayer])
 

  const onHandleLabelAdd=(id:string,event:any)=> {

    if(id === LabelType.LABEL2D) {

      if(selectionPointerId !== '') {
        dispatch(setSelectionPointerId(''));
      } 
      let mode = interactionMode !== InteractionMode.LABEL2D ? InteractionMode.LABEL2D : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL2D));
      (isPressed) && handlePanChange()
      dispatch(handleLabel2DCreation({data:event, undoable: true}));
      setInteractionMode(InteractionMode.DEFAULT, viewerId);

    }

    if(id === LabelChartType.LINECHART3D){
        dispatch(handle3dChartHeadCreation({undoable: true}))
        setInteractionMode(InteractionMode.DEFAULT, viewerId);
        dispatch(setLabelInsertionState(false));

      }

    if(id === Label3DType.PROBE) {

      // dispatch(createParentLabel({id:Label3DType.PROBE,name:"Point Label",pid:"-1"}));
      dispatch(handleProbeHeadCreation({undoable: true}))
      setInteractionMode(InteractionMode.DEFAULT, viewerId);
      dispatch(setLabelInsertionState(false));
    }

  }

  const onHandleAddSelectionPoint =(node:ITreeNode)=> {

    selectionPointerId === node.id ? dispatch(setSelectionPointerId('')) : dispatch(setSelectionPointerId(node.id));

    if(node.pid === Label3DType.PROBE) {
      let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
      setInteractionMode(mode, viewerId);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    }

  }
  const onHandlePopOut=(id:string)=> {

    setPopOutActiveLabelID(id);

    let popOutLabel:boolean= true;

    Object.values(treeDataRedux).forEach((e) => {

      if(id === e.id) {

            setPopOutLabelID(id);

            if(popOutLabelID === e.id) {

              popOutLabel = false ;
              dispatch(setActiveLayers([Layers.VIEWER]));
               setPopOutLabelID("");
            }
            else {

             dispatch(setActiveLayers([Layers.FRONT]));
              popOutLabel = true ;
            }

            dispatch(setEditMode({
              uid: windowPrefixId + id,
              isEdit: popOutLabel
            }));

      }
      else {

          popOutLabel = false ;

          dispatch(setEditMode({
            uid: windowPrefixId + e.id,
            isEdit: popOutLabel
          }));

      }

    }) 

  }

  const onHandleEdit=(id:string)=> {

    dispatch(setEditableNodeId(id));
    dispatch(push(Routes.All_LABELS_EDIT));
  }

  const onHandleIsTitleEditable = (nodeId:string,editable:boolean) => {
    dispatch(setIsTitleEditable({nodeId:nodeId,isEditable:editable}));
  }
  const setNewTitleTitle = (nodeId:string,newTitle:string)=> {
    dispatch(setNewTitle({nodeId:nodeId,newTitle:newTitle}));
  }
    
  const getBody = () => {

    return (
      <div ref = {containerRef} style={{marginTop:'10px'}}>
      
      <div ref = {headerRef} >
                {
                    isSearchMode ?
                    <SearchHints data = {generateOptions()} onClick={handleHintsClick} onDelete={handleHintsDelete}></SearchHints>
                    :null
                }
                </div>
        
      <div style={{display:"flex",justifyContent:"center"}}>
      <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary"  aria-label="split button">
      <Button className={classes.button}  onClick={(event)=>onHandleLabelAdd('LINECHART3D',event)}>
      <div className={classes.divIcon}>
      <XYPlotsIcon fontSize="small"/>
        </div>
        <div style={{marginLeft:'10px'}}>Add 3D Charts</div> 
      </Button>
      </ButtonGroup>
      </div>

      <TreeView 
        treedata={dataPointtopoint}  
        nodes={treeDataRedux} 
        check={handleCheck}  
        containerwidth={containerWidth}
        invert={handleInvert}
        expanded={expanded}
        handleExpand={handleExpand}
        visibility={handleVisibility} 
        selectionpoint={handleSelectPoints} 
        // selected={selectionPointerId} 
        popout={onHandlePopOut}
        edit={onHandleEdit}
        isTitleEditable = {true}
        onHandleIsTitleEditable = {onHandleIsTitleEditable}
        setNewTitleTitle = {setNewTitleTitle}
        scrollValue={scrollx}
        searchtext={searchText}
        searchmode={isSearchMode}
      />
      <div style={{marginTop:'10px'}}>

  
  </div>
    </div>
    )
  }

  const classes = useMyStyles();

  // A function that returns list of pid's of checked nodes
  // let checkedNodePIDArrayFun = () => {
  //   let pidArray:any[] = [];
  //   checkedNodes.forEach((item) => {
  //     pidArray.push(item.pid);
  //   })
  //   return [...new Set(pidArray)]
  // }


  //Function to confirm weather only 2dArray is checked
  // const isOnly2dArryChecked = () => (checkedNodePIDArrayFun().length === 1 ? (checkedNodePIDArrayFun().includes('LABEL2D')) : false)
  const getFooter = () => {

    return(
      <div>
      <OptionContainer>
      <Option
            id="visibilityShow"
            label="Show"
            active={selectedCount < 1}
            icon={EyeIcon}
            onClickUpdate={onHandleShow}
          />
          <Option
            id="visibilityHide"
            label="Hide"
            active={selectedCount < 1}
            icon={EyeSlashIcon}
            onClickUpdate={onHandleHide}
          />
          <Option
            id="visibilityInvert"
            label="Invert"
            active={selectedCount < 1}
            icon={EyeSlashIcon}
            onClickUpdate={onHandleInvert}
          />
          <Option
            id="delete"
            label="Delete"
            active={selectedCount >= 1 ? false : true}
            icon={MuiDeleteForeverOutlinedIcon}
            onClickUpdate={onHandleDeleteButton}
          />
       
    </OptionContainer>
  </div>
    ) 
  }


  return (
          <SideBarContainer

            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
