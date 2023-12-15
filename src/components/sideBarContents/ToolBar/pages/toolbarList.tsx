import MuiIconButton from "@material-ui/core/IconButton";
import { push } from "connected-react-router/immutable";
import { Routes } from "../../../../routes";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import MuiButton from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {undoStack} from "../../../utils/undoStack";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import { Layers, selectActiveLayers , selectWindowMgr, setActiveLayers, setEditMode,selectWindows} from '../../../../store/windowMgrSlice';

import styles from "./style";
import { useAppSelector, useAppDispatch } from "../../../../store/storeHooks";
import { useRef, useState,useEffect } from "react";
import ShowHide from "../../../shared/RcTree/ShowHide";
import { ActionIcon } from "@mantine/core";
import MuiTypography from "@material-ui/core/Typography";
import "react-toggle/style.css";
import globalThemes from "theme/globalThemes";
import MuiEditIcon from "@material-ui/icons/EditOutlined";
import MuiDeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import TransformIcon from "../../../icons/transform";
import PopOut from "components/icons/popout";
import OptionContainer from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer";
import Option from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option";

import { TOUR_MENU_NAMES } from "components/utils/tourMenus";
import HelpIcon from "@material-ui/icons/HelpOutline";
import { DialogueProps, dialogueState } from "store/tutorialSlice";

import {
  setCheckedNodesAsync,
  selectCheckedNodes,
  toolBarList,
  defaultList,
  handleToolBarCreate,
  deleteToolBar,
  setTextValue,
  setCheckedVisibility,
} from "store/sideBar/ToolBar/toolBarSlice";
import { selectedLength } from "store/sideBar/ToolBar/toolBarSlice";
import { setEditableNodeId } from "store/sideBar/ToolBar/toolBarSlice";
import {
  selectCheckedNodeForALLToolType,
  selectEditableNodeId,
  combinedDataList
} from "store/sideBar/ToolBar/toolBarSlice";
//HeaderIconButton

import HeaderIconButton from "../../../shared/headerIconButton/IconButton";
import { createTourListFor } from "components/layout/TourComponent/data";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";

import ToolBarButton from "../components/button";
import { ToolBarAllType } from "store/sideBar/ToolBar/shared/types";

const style = makeStyles((theme: any) => ({
  
  scrollBar: {
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
  disabled: {
    pointerEvents: "none",
    opacity: 0.3,
  },
  overlaystyling: {
    display: "flex",
    width: "100%",

    justifyContent: "flex-end",
    paddingBottom: 2,
  },

  overlayicons: {
    //   backgroundColor: theme.palette.background.default,
    opacity: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: "0px",
  },
  iconHover: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "transparent",
      border: theme.palette.background.default,
    },
  },
}));

export default function ToolBarList() {
  const dispatch = useAppDispatch();
  const treeDataRedux = useAppSelector(toolBarList);
  const combinedToolbarList = useAppSelector(combinedDataList)
  const defaultTools = useAppSelector(defaultList)
  const [checkedItems, setCheckedItems] = useState([]);
  const myContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectedCount = useAppSelector(selectedLength);
  let [isToolbar, setIsToolbar] = useState(false);
  const checkedNodeIds: any = useAppSelector(selectCheckedNodeForALLToolType);
  const selectCheckedElements = useAppSelector(selectCheckedNodes);
  const [hovered, setHovered] = useState("");
  const [defhovered, defsethovered] = useState("");
  const [editingToolbarId, setEditingToolbarId] = useState<string | null>(null);
  const windows = useAppSelector(selectWindows);
  const [popOutActiveLabelID , setPopOutActiveLabelID] = useState("");
  const [popOutLabelID , setPopOutLabelID] = useState("");
  const editableNodeId: string = useAppSelector(selectEditableNodeId);
  
  const activeLayer = useAppSelector(selectActiveLayers);
  const classes = style();
  const customClasses = globalThemes();
  const handleCheck = (toCheck: boolean, nodeId: string) => {
    dispatch(setCheckedNodesAsync({ toCheck, nodeId, undoable: true }));
  };
  const onClickAddItem = () => {
    dispatch(push(Routes.TOOLBARITEMS));
  };

  const onHandleLabelAdd = (id: string, event: any) => {
    if (id === ToolBarAllType.TOOLBAR) {
      dispatch(handleToolBarCreate({ data: event }));
    }
  };
  const defHandleMouseEnter = (index: any) => {
    defsethovered(index);
  };
  const defHandleMouseLeave = () => {
    defsethovered("");
  };

  const handleMouseEnter = (index: any) => {
    setHovered(index);
  };
  const handleMouseLeave = () => {
    setHovered("");
  };

  const onHandleDeleteButton = () => {
    dispatch(deleteToolBar({ checkedNodes: checkedNodeIds }));
    setIsToolbar(false);
  };

  const onHandleDelete = () => {
    setIsToolbar(true);
  };

  const Edit = () => {
    setIsToolbar(false);
    dispatch(push(Routes.TOOLBARITEMS));
    dispatch(setEditableNodeId(checkedNodeIds));
  };

  const onHandleTransform = () => {
    setIsToolbar(false);
    dispatch(push(Routes.TOOLBARPOSITION));
    dispatch(setEditableNodeId(checkedNodeIds));
  };

 

  useEffect(()=>{

    Object.values(windows).forEach((item)=> {
  
      let id =  popOutActiveLabelID;
    
      if(id === item.id) {
    
            item.isEditMode ? setPopOutLabelID(popOutActiveLabelID) : setPopOutLabelID('');
      }
    
    })
  
   },[activeLayer])
  const onHandlePopOut=(id:string)=> {

    setPopOutActiveLabelID(id);

    let popOutLabel:boolean= true;

    Object.values(combinedToolbarList).forEach((e) => {

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
              uid:  id,
              isEdit: popOutLabel
            }));

      }
      else {

          popOutLabel = false ;

          dispatch(setEditMode({
            uid: editableNodeId + e.id,
            isEdit: popOutLabel
          }));

      }

    }) 

  }

  const handleVisibility = (toShow: boolean, undoable?: boolean, node?: any) => {
    const leafIds = [node.id];
     const pids = [node.pid];
    dispatch(setCheckedVisibility({ toShow, leafIds }));
  
    if (undoable) {
      undoStack.add({
        undo: () => handleVisibility(!toShow, undoable, node),
        redo: () => handleVisibility(toShow, undoable, node),
      });
    }
  };
  const getHeaderRightIcon = () => {
    return (
      <div>
        <HeaderIconButton
          icon={<HelpIcon />}
          label={"helpIcon"}
          disabled={false}
          onClick={handleResultsClick}
        ></HeaderIconButton>
      </div>
    );
  };

  const handleCheckboxChange = (toCheck: boolean, itemId: string) => {
    if (itemId==='0') {
      const nodeId = 'toolBar_FullScreen'
      dispatch(setCheckedNodesAsync({ toCheck, nodeId, undoable: true }));
    } 
    else if(itemId==='1'){
      const nodeId = 'toolBar_Presentation'
      dispatch(setCheckedNodesAsync({ toCheck, nodeId, undoable: true }));
    }
    
    else{
      const nodeId = 'toolBar_Popout'
      dispatch(setCheckedNodesAsync({ toCheck, nodeId, undoable: true }));
    }

    if (toCheck) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== itemId));
    }
  };
  const data = Object.values(treeDataRedux);

  const defaultData = Object.values(defaultTools);

  const getBody = () => {
    return (
      <div className={classes.scrollBar}>
        <div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <ToolBarButton onHandleLabelAdd={onHandleLabelAdd}></ToolBarButton>
          </div>

          <div ref={myContainer} style={{ height: "100%" }}>
            <List dense style={{ marginTop: -10, width: "100%" }}>
              {Object.keys(defaultData).map((values: any, val: any) => {
                const default_toolbar = defaultData[values];
                return (
                  <div
                    key={defaultData[values].id}
                    onMouseOver={() => defHandleMouseEnter(val)}
                    onMouseLeave={defHandleMouseLeave}
                    style={{ cursor: "pointer", marginBottom: -10 }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          size="small"
                          checked={default_toolbar.state.checked}
                          onChange={(e:any) => handleCheckboxChange(e.target.checked, values)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={defaultData[values].title} className={default_toolbar.state.visibility ==false  ? classes.disabled : ""}/>
                      {val === defhovered ? (
                        <ListItemSecondaryAction>
                          <div className={classes.overlaystyling}>
                            <div className={classes.overlayicons}>
                              <ActionIcon className={classes.iconHover}>
                                <PopOut
                                  node={default_toolbar}
                                  fontSize="inherit"
                                  onClick={() => onHandlePopOut(default_toolbar.id)}
                                  className={classes.disabled}
                                  // disabled={!default_toolbar.state.visibility}
                                ></PopOut>
                              </ActionIcon>
                              <ActionIcon className={classes.disabled}>
                                <ShowHide
                                  node={default_toolbar}
                                  // onToggle={handleVisibility}
                                  // onToggle={(toShow: boolean,node:any, undoable?: boolean) =>
                                  //   handleVisibility(toShow, undoable, default_toolbar)
                                  // }
                                  onToggle={(toShow: boolean,node:any, undoable?: boolean) =>
                                    handleVisibility(toShow, undoable, default_toolbar)
                                  }
                                  
                                ></ShowHide>
                              </ActionIcon>
                            </div>
                          </div>
                        </ListItemSecondaryAction>
                      ) : null}
                    </ListItem>
                  </div>
                );
              })}
            </List>
            <List dense style={{ marginTop: -10, width: "100%" }}>
              {Object.keys(data).map((items: any, index: any) => {
                const toolbar = data[items];

                const handleDoubleClick = () => {
                  setEditingToolbarId(toolbar.id);
                };

                const handleTitleChange = (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const newTitle = event.target.value;
                  // Update the toolbar title in Redux store
                  dispatch(
                    setTextValue({ toolbarId: toolbar.id, newTitle: newTitle })
                  );
                };

                return (
                  <div
                    key={toolbar.id}
                    onMouseOver={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: "pointer", marginBottom: -10 }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          size="small"
                          checked={toolbar.state.checked}
                          indeterminate={toolbar.state.partiallyChecked}
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            e.stopPropagation()
                          }
                          onChange={(e: any) =>
                            handleCheck(e.target.checked, toolbar.id)
                          }
                        ></Checkbox>
                      </ListItemIcon>
                      {editingToolbarId === toolbar.id ? (
                        <TextField
                          value={toolbar.title}
                          onChange={handleTitleChange}
                          autoFocus
                          onBlur={() => setEditingToolbarId(null)}
                        />
                      ) : (
                        <ListItemText onDoubleClick={handleDoubleClick} className={toolbar.state.visibility ==false  ? classes.disabled : ""} >
                          {toolbar.title}
                        </ListItemText>
                      )}
                      {index === hovered && (
                        <ListItemSecondaryAction>
                          <div className={classes.overlaystyling}>
                            <div className={classes.overlayicons}>
                              <ActionIcon className={classes.iconHover}>
                                <PopOut
                                  node={toolbar}
                                  fontSize="inherit"
                                  onClick={() => onHandlePopOut(toolbar.id)}
                                ></PopOut>
                              </ActionIcon>
                              <ActionIcon className={classes.iconHover}>
                                <ShowHide
                                  node={toolbar}
                                  onToggle={(toShow: boolean,node:any, undoable?: boolean) =>
                                    handleVisibility(toShow, undoable, toolbar)
                                  }
                                ></ShowHide>
                              </ActionIcon>
                            </div>
                          </div>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </div>

         
        </div>
      </div>
    );
  };

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.TOOLBAR
  }
  const handleResultsClick = () => {
   
    dispatch(dialogueState(dialogProps));
  };

  const getFooter = () => {
    return (
      <div>
        {!isToolbar ? (
          <div>
            <OptionContainer>
              <Option
                id="step21"
                label="Edit Tools"
                active={selectedCount < 1 || selectedCount > 1}
                icon={MuiEditIcon}
                onClickUpdate={Edit}
              />
              <Option
                label="Position & Orientation"
                icon={TransformIcon}
                active={selectedCount < 1 || selectedCount > 1}
                onClickUpdate={onHandleTransform}
              />
              <Option
                id="step31"
                label="Delete"
                active={selectedCount < 1}
                icon={MuiDeleteForeverOutlinedIcon}
                onClickUpdate={onHandleDelete}
              />
            </OptionContainer>
          </div>
        ) : (
          <div>
            <div style={{ margin: "15px 5px" }}>
              <MuiTypography style={{ margin: "5px 5px", fontSize: "14px" }}>
                Are you sure want to delete the selected Toolbar?
              </MuiTypography>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <MuiButton
                  className={customClasses.Muibtn}
                  autoFocus
                  onClick={onHandleDeleteButton}
                >
                  Confirm
                </MuiButton>
                <MuiButton
                  className={customClasses.BtnOutlined}
                  onClick={() => setIsToolbar(false)}
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
      headerContent={
        <div
          style={{
            columnGap: "228px",
            display: "inline-flex",
            justifyContent: "stretch",
            cursor: "pointer",
          }}
        >
          <Title text={"Toolbars"} group="Tool Bar" />
        </div>
      }
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
