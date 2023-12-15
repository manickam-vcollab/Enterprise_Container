import IconButton from "@material-ui/core/IconButton";
import { useEffect, useLayoutEffect, useRef } from "react";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import { push } from "connected-react-router/immutable";
import { Routes } from "../../../../routes";
import { useAppSelector, useAppDispatch } from "../../../../store/storeHooks";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import { undoStack } from "components/utils/undoStack";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/HelpOutline";
import MuiAvTimerIcon from '@material-ui/icons/AvTimer';
import { makeStyles } from "@material-ui/styles";
import { selectedTools,setEditableNodeId,updateAppliedOrientation,combinedDataList,defaultList } from "store/sideBar/ToolBar/toolBarSlice";
import { setWindowSize } from '../../../../store/windowMgrSlice';
import { ListItemSecondaryAction } from "@material-ui/core";
import { ActionIcon } from "@mantine/core";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import MuiMenuItem from "@material-ui/core/MenuItem";
import SelectAction from "components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import Replace from "components/icons/update";
import {
  toolBarList,
  selectEditableNodeId,
} from "store/sideBar/ToolBar/toolBarSlice";
import { setTextValue } from "store/sideBar/ToolBar/toolBarSlice";
import { toolsList } from "store/sideBar/toolSlice";
import Divider from "@material-ui/core/Divider";
import MuiButton from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { IToolBar } from "store/sideBar/ToolBar/shared/types";
import PopOut from "components/icons/popout";
import Undo from "components/icons/undo";
import Redo from "components/icons/redo";
import FullScreen from "components/icons/full-Screen";
import NextSlide  from "components/icons/nextSlide";
import PreviousSlide  from "components/icons/previousSlide";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import PickAndMoveIcon from '@material-ui/icons/ThreeDRotation';
import CenterFocusWeakSharpIcon from '@material-ui/icons/CenterFocusWeakSharp';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import AddGroup from "components/icons/addGroup";

const style = makeStyles((theme: any) => ({
  Scrollbar: {
    scrollbarColor: theme.palette.scrollbar.main,
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.7em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "20px",
      backgroundColor: theme.palette.scrollbar.main,
    },
  },
 
  textStyle: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  root: {
    width: "100%",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  checkbox: {
    maxWidth: 3,
    maxHeight: 3,
    marginLeft: 12,
  },

  overlaystyling: {
    display: "flex",
    width: "100%",

    justifyContent: "flex-start",
    paddingBottom: 2,
  },
  divider: {
    height: 2,
    width: "100%",
  },
  overlayicons: {
    opacity: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginRight: "0px",
  },
  iconHover: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "transparent",
      border: theme.palette.background.default,
    },
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.3,
  },
  Muibtn: {
    backgroundColor: theme.palette.accent.primary,
    color: theme.palette.accent.primaryText,
    fontSize: "14px",
    borderRadius: "4px",
    height: "30px",
    margin: 0,
    lineHeight: "16px",
    fontWeight: 500,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.accent.secondary,
      color: theme.palette.accent.primaryText,
    },
  },
  listItemIcon:{
    minWidth:'35px',
    color:theme.palette.text.secondary,

  },
  iconStyle :{
    display:'inline-block',
    verticalAlign:'bottom',
    marginRight:'12px',
    width:18,
    height:18,
    color: theme.palette.text.secondary,
  },
  BtnOutlined: {
    border: `1px solid ${theme.palette.accent.primary}`,
    color: theme.palette.accent.primary,
    fontSize: "14px",
    borderRadius: "4px",
    height: "30px",
    margin: 0,
    lineHeight: "16px",
    fontWeight: 500,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function ToolBarList(props: any) {
  const containerRef = useRef(null);
  const myContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useAppDispatch();
  const treeDataRedux = useAppSelector(toolsList);
  const toolBarData = useAppSelector(toolBarList);
  const defaultsToolBarData = useAppSelector(defaultList)
  const combinedToolbarList = useAppSelector(combinedDataList)

  const [checkedItems, setCheckedItems] = useState([]);
  const classes = style();
  const editableNodeId: string = useAppSelector(selectEditableNodeId);
  const selectedLabel = [toolBarData[editableNodeId]];

  const [isCheckAll, setIsCheckAll] = useState(false);
  
  // const checkedList = Object.keys(treeDataRedux).filter((item) =>
  //   checkedItems.includes(treeDataRedux[item].id)
  // );

  
  const checkedList = checkedItems.map((item)=>{
    // console.log(Object.keys(treeDataRedux))
    const checkedArray=[]
    if (Object.keys(treeDataRedux).includes(item)) {
      return item
    }
  })

  const uncheckedList = Object.keys(treeDataRedux).filter(
    (item: any) => !checkedItems.includes(treeDataRedux[item].id)
  );






























  const getHeaderContent = () => {
    return <Title text={"Edit Toolbar"} group="Toolbar" />;
  };

  const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "lightblue" : "transparent",
    // padding: grid,
    // width: 250
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "#0078d4" : "transparent",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getHeaderRightIcon = () => {
    return (
      <div style={{ display: "inherit" }}>
        <IconButton>
          <HelpIcon />
        </IconButton>
      </div>
    );
  };


  const handleCheckboxChange = (event: any, itemId: string) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== itemId));
    }
  };

  useEffect(() => {
    const selectedObject = combinedToolbarList[editableNodeId];
    const checkedIdsArray = selectedObject?.selectedTools || [];
    setCheckedItems(checkedIdsArray);
  }, [editableNodeId, toolBarData]);

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      setCheckedItems(Object.values(treeDataRedux).map((li) => li.id));
      setIsCheckAll(true);
    } else {
      setCheckedItems([]);
      setIsCheckAll(false);
    }

    setIsCheckAll(e.target.checked && Object.values(treeDataRedux).length > 0);
    
  };
  

  const onHandleApply = () => {
    let id: any[] = [];
    checkedItems.forEach((item) => {
      id.push(item);
    });
    dispatch(selectedTools({ toolBarId: editableNodeId, id: id}));
    dispatch(push(Routes.TOOLBARLIST));

    if (document.getElementById(editableNodeId)) {

      
      let windowWidth = document.getElementById(editableNodeId)?.clientWidth
      let windowHeight = document.getElementById(editableNodeId)?.clientHeight
      
      if (windowWidth && windowHeight) {
        if (toolBarData[editableNodeId]?.appliedOrientation !== '2') {
          let width = checkedItems.length * 45
          dispatch(setWindowSize({uid:editableNodeId,size:[width,windowHeight]}));
        } else {
          if (checkedItems.length===0) {
            dispatch(updateAppliedOrientation({ toolBarId: editableNodeId, id: '1' }));
          } else {
            let height = checkedItems.length * 45
            dispatch(setWindowSize({uid:editableNodeId,size:[windowWidth,height]}));
          }
          
        }
        
      }
      

    }
    
  };

  const selectedObject = combinedToolbarList[editableNodeId];


  const checkedIdsArray = selectedObject?.selectedTools ?? [];
  const onHandleReset = () => {
    const filteredItems = checkedItems.filter((item) =>
      checkedIdsArray.includes(item)
    );
    setCheckedItems(filteredItems);
  };

  const getIconForData = (data: any) => {
    if (data === "PopOut") {
      return <PopOut className={classes.iconStyle} />;
    } else if (data === "Undo") {
      return <Undo className={classes.iconStyle} />;
    } else if (data === "Redo") {
      return <Redo className={classes.iconStyle} />;
    } else if (data === "FullScreen") {
      return <FullScreen className={classes.iconStyle} />;
    } else if (data === "Previous Slide") {
      return <PreviousSlide className={classes.iconStyle} />;
    } else if (data === "Next Slide") {
      return <NextSlide className={classes.iconStyle} />;
    } else if (data === "Fit View") {
      return <CenterFocusWeakSharpIcon className={classes.iconStyle} />;
    }
    else if (data === "Pick & Move") {
      return <PickAndMoveIcon className={classes.iconStyle} />;
    }
    else if (data === "Arrange Labels") {
      return <MuiAvTimerIcon  className={classes.iconStyle} />;
    }
    else if (data === "Reset") {
      return <RotateLeftIcon  className={classes.iconStyle} />;
    }
    else if (data === "Update Slide") {
      return <Replace  className={classes.iconStyle} />;
    }
    else if (data === "Add Slide") {
      return <AddGroup  className={classes.iconStyle} />;
    }
  };
  // const selectedToolBar = useAppSelector(
  //   (state) => state.toolBar.data[editableNodeId]
  // );
  const selectedToolBar = combinedToolbarList[editableNodeId]
  const toSelectList = Object.values(combinedToolbarList).map((item) => ({
    id: item.id,
    title: item.title,
  }));

  useLayoutEffect(()=>{
    let selectedItem= toSelectList.length === 3 ? toSelectList[0].id : selectedToolBar?.id
    dispatch(setEditableNodeId(selectedItem))
  },[])
  const [selectedValue, setSelectedValue] = useState(selectedToolBar?.id || toSelectList[0]?.id)

  const onHandleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    dispatch(setEditableNodeId(selectedValue));
  };

  const list = useAppSelector((state) => state.toolBar.data);
 

  const getAction = () => {
    return (
      <SelectAction
        labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
        value={selectedValue}
        onChange={(e: any) => onHandleSelect(e.target.value)}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {toSelectList.map((item) => (
          <MuiMenuItem key={item.id} value={item.id}>
            {item.title}
          </MuiMenuItem>
        ))}
      </SelectAction>
    );
  };

  const reorder = (list:any[], startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const handleDragEnd = (result:any) => {
    console.log(result)
    // setIsDragging(false);
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const checkedList:any[] = reorder(
      checkedItems,
      result.source.index,
      result.destination.index
    );

    setCheckedItems(checkedList);
  }

  const getBody = () => {
    return (
      <div
        ref={containerRef}
        id="assmebly"
        style={{ width: "100%", height: "100%" }}
      >
        <div ref={myContainer} style={{ height: "100%" }}>
          <div style={{ paddingLeft: 15, paddingTop: 20 }}>
            <Checkbox
              style={{ paddingLeft: 10 }}
              size="small"
              onChange={handleSelectAll}
              disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) || defaultsToolBarData.hasOwnProperty(selectedValue) ? true : false}
              indeterminate={
                !isCheckAll &&
                checkedItems.length > 0 &&
                checkedItems.length < Object.values(treeDataRedux).length
              }
              checked={
                isCheckAll ||
                (checkedItems.length === Object.values(treeDataRedux).length &&
                  Object.values(treeDataRedux).length > 0)
              }
            ></Checkbox>
            <div
              style={{
                display: "inline",
                paddingLeft: "5px",
                paddingTop: "3px",
              }}
            >
              {" "}
              Select All{" "}
            </div>
          </div>
          {checkedList.length > 0 && (
            <>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
              {(Dropableprovided, snapshot) => (
                <div
                  {...Dropableprovided.droppableProps}
                  ref={Dropableprovided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                >
                  <List dense style={{ marginTop: -10, width: "100%" }}>
                    {checkedItems.map((item,index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => (
                        <div key={item}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItem>
                            <ListItemIcon>
                              <Checkbox
                                size="small"
                                checked
                                onChange={(e) => handleCheckboxChange(e, item)}
                                disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) || defaultsToolBarData.hasOwnProperty(selectedValue) ? true : false}
                              />
                            </ListItemIcon>
                            <ListItemText>
                              {getIconForData(item)}
                              {item}
                            </ListItemText>
                          </ListItem>
                        </div>)}
                      </Draggable>
                    ))}
                    <Divider variant="middle" />
                  </List>
                  {Dropableprovided.placeholder}
                </div>
                )}
                </Droppable>
            
              
            </DragDropContext>
            
              {/* <List dense style={{ marginTop: -10, width: "100%" }}>
                {checkedList.map((item) => (
                  <div key={item}>
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          size="small"
                          checked
                          onChange={(e) => handleCheckboxChange(e, item)}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        {getIconForData(item)}
                        {item}
                      </ListItemText>
                    </ListItem>
                  </div>
                ))}
                <Divider variant="middle" />
              </List> */}
            </>
          )}
          <List dense style={{ marginTop: -10, width: "100%" }}>
            {uncheckedList.map((item) => (
              <div key={item}>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      size="small"
                      checked={checkedItems.includes(item)}
                      onChange={(e) => handleCheckboxChange(e, item)}
                      disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) || defaultsToolBarData.hasOwnProperty(selectedValue) ? true : false}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    {getIconForData(item)} {item}
                  </ListItemText>
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </div>
    );
  };

  const getFooter = () => {
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <MuiButton className={classes.Muibtn} autoFocus onClick={onHandleApply} disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) ? true : false}>
          Save
        </MuiButton>
        <MuiButton
          className={classes.BtnOutlined}
          autoFocus
          onClick={onHandleReset}
          disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) ? true : false}
        >
          Reset
        </MuiButton>
      </div>
    );
  };

  return (
    <SideBarContainer
      headerContent={getHeaderContent()}
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      headerAction={getAction()}
      footer={getFooter()}
    />
  );
}
