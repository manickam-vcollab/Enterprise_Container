import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  MouseEventHandler,
} from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import MuiToolbar from "@material-ui/core/Toolbar";
import MuiTypography from "@material-ui/core/Typography";
import MuiIconButton from "@material-ui/core/IconButton";
import MuiTooltip from "@material-ui/core/Tooltip";
import MuiClickAwayListener from "@material-ui/core/ClickAwayListener";
import MuiToggleButton from "@material-ui/lab/ToggleButton";
import ToggleSplitBtn from "components/shared/ToggleSplitBtn";
import HomeIcon from "@material-ui/icons/Home";

import clsx from "clsx";
import Displaymodes from "../../icons/displaymodes";
import Fitview from "../../icons/fitview";
import Fullscreen from "../../icons/fullscreen";
import MeasureP2PIcon from "@material-ui/icons/Straighten";
import MeasureArcIcon from "@material-ui/icons/Looks";

import ProbeLabelIcon from "@material-ui/icons/Room";
import ProbeIcon from "@material-ui/icons/Colorize";
import NoteIcon from "@material-ui/icons/NoteAdd";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { goBack, push } from "connected-react-router/immutable";
import FullscreenClose from "../../icons/fullscreen_exit";
import Hamburger from "../../icons/hamburger";
import Popout from "../../icons/popout";
import More from "../../icons/more";
import Undo from "components/icons/undo";
import Redo from "components/icons/redo";
import { useFullscreen } from "@mantine/hooks";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setCurrentUser } from "../../../store/appSlice";

import {
  selectModelName,
  selectFullscreenStatus,
  selectSidebarVisibility,
  selectActiveViewerID,
  setFullscreenState,
  setSidebarVisibility,
  setPopupMenuActiveContent,
  setPopupMenuDisplayMode,
  setInteractionModeAsync,
  selectInteractionMode,
  selectLabelInsertState,
  selectSelectedLabelInsertMode,
  setSelectedLabelMode,
  setLabelInsertionState,
  togglePopout,
  setTogglePopout,
} from "../../../store/appSlice";
import { enableProbe, selectProbeEnabled } from "../../../store/probeSlice";
import { useAppSelector, useAppDispatch } from "../../../store/storeHooks";

import * as viewerAPIProxy from "../../../backend/viewerAPIProxy";
import {
  InteractionMode,
  setInteractionMode,
} from "../../../backend/viewerAPIProxy";
import { popupMenuContentTypes } from "../../../config";
import PopupMenu from "../popupMenu";
import styles from "./style";
import { undo, redo, undoStack, UndoEvents } from "../../utils/undoStack";
import zIndex from "@material-ui/core/styles/zIndex";
import { Steps } from "rsuite";
import { selectUpdateAction, tourListSlice } from "store/tourSlice";
import {
  captureViewpointAsync,
  deleteViewpointAsync,
} from "store/viewpointSlice";
import { setEditMode, selectWindows } from "../../../store/windowMgrSlice";
import { selectLegendEnabled } from "store/sideBar/colormapSlice";
import { Routes } from "../../../routes/index";
import tutorialSteps from "../TourComponent/data/tutorialSteps";

function AppBar() {
  const classes = styles();

  const mounted = useRef(false);
  const { toggle, fullscreen } = useFullscreen();
  const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const interactionMode = useAppSelector(selectInteractionMode);
  const labelInsertionState = useAppSelector(selectLabelInsertState);
  const [selectedLabelInsertionMode, setSelectedLabelInsertionMode] = useState(
    InteractionMode.LABEL2D
  );
  const [isToggleClicked, setToggleClicked] = useState(false);
  const AllWindows = useAppSelector(selectWindows);
  const isLgendEnabled = useAppSelector(selectLegendEnabled);
  const togglePopoutButton = useAppSelector(togglePopout);

  const labelInsertModeOptions = [
    {
      id: InteractionMode.LABEL2D,
      title: "2D Note",
      icon: <NoteIcon />,
    },
    {
      id: InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT,
      title: "P2P",
      icon: <MeasureP2PIcon></MeasureP2PIcon>,
    },
    {
      id: InteractionMode.LABEL_MEASUREMENT_3PT_ARC,
      title: "Arc",
      icon: <MeasureArcIcon></MeasureArcIcon>,
    },
    {
      id: InteractionMode.LABEL3D_POINT,
      title: "Probe Point",
      icon: <ProbeLabelIcon />,
    },
  ];

  const isContinousProbeEnabled =
    interactionMode === InteractionMode.CONTINUOUS_PROBE;
  const activeViewerID = useAppSelector(selectActiveViewerID);
  const modelName = useAppSelector(selectModelName);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedMenu, setClickedMenu] = useState<string>(
    popupMenuContentTypes.none
  );
  const popupMenuDisplayMode = useAppSelector(
    (state) => state.app.popupMenuActiveContent
  );
  const [isUndoable, setIsUndoable] = useState(false);
  const [isRedoable, setIsRedoable] = useState(false);
  const onClickFullscreen = () => {
    dispatch(setFullscreenState(!isFullscreenEnabled));
    toggle();
    //dispatch(tourListSlice.actions.setUpdateAction(tutorialSteps.steps[2].target.slice(1)));
    if (isFullscreenEnabled) {
      dispatch(tourListSlice.actions.setManualStepForward());
    }
    // dispatch(tourListSlice.actions.setUpdateActionAutoPass("#step3"))
  };

  useLayoutEffect(() => {
    fullscreen
      ? dispatch(setFullscreenState(true))
      : dispatch(setFullscreenState(false));
  }, [fullscreen]);
  //==========================================================================================

  //===========================================================================================

  const handleLabelInsertModeChange = (id: number) => {
    setSelectedLabelInsertionMode(id);
  };

  const handleUndoStackUpdate = (e: any) => {
    // setIsUndoable(undoStack.isUndoable());
    // setIsRedoable(undoStack.isRedoable());
  };

  useEffect(() => {
    undoStack.addEventListener(UndoEvents.UPDATE, handleUndoStackUpdate);
    return () => {
      undoStack.removeEventListener(UndoEvents.UPDATE);
    };
  }, []);

  useEffect(() => {
    switch (interactionMode) {
      case InteractionMode.LABEL2D:
        setSelectedLabelInsertionMode(InteractionMode.LABEL2D);
        break;
      case InteractionMode.LABEL3D_POINT:
        setSelectedLabelInsertionMode(InteractionMode.LABEL3D_POINT);
        break;
      case InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT:
        setSelectedLabelInsertionMode(
          InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT
        );
        break;
      case InteractionMode.LABEL_MEASUREMENT_3PT_ARC:
        setSelectedLabelInsertionMode(
          InteractionMode.LABEL_MEASUREMENT_3PT_ARC
        );
        break;
      default:
        dispatch(setLabelInsertionState(false));
        break;
    }
  }, [interactionMode]);

  const handleLabelInsertModeClick = () => {
    let id = !labelInsertionState
      ? selectedLabelInsertionMode
      : InteractionMode.DEFAULT;
    viewerAPIProxy.setInteractionMode(id, activeViewerID);
    dispatch(setLabelInsertionState(!labelInsertionState));
  };

  const onClickProbe = () => {
    viewerAPIProxy.setInteractionMode(
      activeViewerID,
      !isContinousProbeEnabled
        ? InteractionMode.CONTINUOUS_PROBE
        : InteractionMode.DEFAULT
    );
  };

  const onClickFitview = function () {
    viewerAPIProxy.fitView(activeViewerID);
  };

  const onClickHamburger = function () {
    dispatch(setSidebarVisibility(!isSidebarVisible));
  };

  const onClickAwayMenuPopup = function () {
    if (
      clickedMenu === popupMenuContentTypes.displayModes ||
      clickedMenu === popupMenuContentTypes.more
    )
      setClickedMenu(popupMenuContentTypes.none);
    else {
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none));
    }
  };

  const onClickMenuIcon = (evt: any, selectedMode: string) => {
    if (selectedMode === popupMenuContentTypes.displayModes) {
      viewerAPIProxy
        .getDisplayModes([], activeViewerID)
        .then((response: any) => {
          dispatch(setPopupMenuDisplayMode(response));
        });
    }

    // Inactive the dropdown while click the active dropdown menu button

    if (
      selectedMode !== popupMenuContentTypes.none &&
      selectedMode === popupMenuDisplayMode
    ) {
      setClickedMenu(popupMenuContentTypes.none);
      // setAnchorEl( evt.currentTarget );
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none));
    } else {
      setClickedMenu(selectedMode);
      setAnchorEl(evt.currentTarget);
      dispatch(setPopupMenuActiveContent(selectedMode));
    }
  };

  const handleUndo = () => {
    undo(dispatch);
  };

  const handleRedo = () => {
    redo(dispatch);
  };

  const OnclickPopout = () => {
    // setToggleClicked(!isToggleClicked);
    dispatch(setTogglePopout(!togglePopoutButton));
    Object.values(AllWindows).forEach((item) => {
      let uid = item.id;
      if (togglePopoutButton === false) {
        if (uid === "colorPlotWindow") {
          if (isLgendEnabled === true) {
            dispatch(setEditMode({ uid, isEdit: true }));
          } else {
            dispatch(setEditMode({ uid, isEdit: false }));
          }
        } else {
          dispatch(setEditMode({ uid, isEdit: true }));
        }
      } else {
        dispatch(setEditMode({ uid, isEdit: false }));
      }
    });
  };

  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const onClickSignOut = () => {
    removeCookie("auth", { path: "/", maxAge: 1800 }); // 60 * 30
    dispatch(setCurrentUser(null));
    //history.push('/login');
    window.location.reload();
  };

  const onHandleHome = () => {
    dispatch(push(Routes.HOME));
  };

  return (
    <MuiAppBar
      className={clsx(classes.appBar, {
        [classes.appBarwithSideBar]: isSidebarVisible,
      })}
      position="fixed"
    >
      <MuiToolbar className={classes.toolBar}>
        <div className={classes.toolBarLeftContent}>
          <div
            className={clsx(classes.leftTitle, {
              [classes.leftTitleHidden]: isSidebarVisible,
            })}
          >
            <MuiTooltip title={modelName} aria-label="ModelName">
              <div
                id={tutorialSteps.steps[0].target.slice(1)}
                className={tutorialSteps.steps[0].target.slice(1)}
              >
                {modelName}
              </div>
            </MuiTooltip>
          </div>
        </div>
        <div
          className={classes.toolBarRightContent}
          id={tutorialSteps.steps[2].target.slice(1)}
        >
          <div className={classes.leftAlign}>
            <div onClick={OnclickPopout}>
              <div className={classes.toggleButton}>
                <MuiToggleButton
                  value="cont probe"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    width: "0px",
                    height: "0px",
                    padding: "0px",
                    textTransform: "none",
                  }}
                  classes={{ selected: classes.toggleSelected }}
                  selected={togglePopoutButton}
                >
                  <Popout fontSize="small" />
                </MuiToggleButton>
              </div>

              <div>
                {" "}
                <span className={classes.popOutText}>Pop </span>{" "}
              </div>
            </div>

            {/* <div className={classes.divIcon} onClick={handleUndo}>
           
            <div disabled={!isUndoable}  > <span className={classes.icontext}> Undo</span> <Undo /></div> 
            </div>
            
           
            <div className={classes.divIcon} onClick={handleRedo}>
            <div disabled={!isRedoable} > <span className={classes.icontext}> Redo</span>  <Redo/></div> 
            </div>
             */}
          </div>
          {/* <div className={classes.divIcon} onClick={() => {}}>
            <ToggleSplitBtn 
              options={labelInsertModeOptions}
              selectedId={selectedLabelInsertionMode}
              isSelectionEnabled={labelInsertionState}
              onChange={handleLabelInsertModeChange}
              onClick={handleLabelInsertModeClick}
            />
            </div>

            <div className={classes.divIcon} onClick={ onClickProbe } >
            <MuiToggleButton value='cont probe' selected={ isContinousProbeEnabled } ><ProbeIcon /></MuiToggleButton> 
            </div>

            <div className={classes.divIcon}  onClick={(evt) => onClickMenuIcon(evt, popupMenuContentTypes.displayModes) }>
              <MuiIconButton><Displaymodes /></MuiIconButton> 
            </div>
            
            <div className={classes.divIcon} onClick={ onClickFitview }>
              <MuiIconButton><Fitview/></MuiIconButton>
            </div>
            
            <div className={classes.divIcon} onClick={(evt) => onClickMenuIcon(evt,  popupMenuContentTypes.more) }>
              <MuiIconButton><More /></MuiIconButton>
            </div> 

            <div className={classes.logOuticon} onClick={(evt) => onHandleHome() }>
              <div ><span className={classes.icontextLogout}>Home</span><HomeIcon /></div> 
            </div>
            <div className={classes.logOuticon} onClick={(evt) => onClickSignOut() }>
              <div ><span className={classes.icontextLogout}>Logout</span><ExitToAppIcon  /></div> 
            </div>
            */}

          <div className={classes.divIconfs} onClick={onClickFullscreen}>
            {isFullscreenEnabled ? (
              <div>
                {" "}
                <span className={classes.icontextfsexit}>Exit</span>
                <FullscreenClose />
              </div>
            ) : (
              <div>
                {" "}
                <span className={classes.icontextfs}>
                  {" "}
                  Full&nbsp;Screen
                </span>{" "}
                <Fullscreen />
              </div>
            )}
          </div>
        </div>
      </MuiToolbar>

      {false && (
        <MuiClickAwayListener onClickAway={() => onClickAwayMenuPopup()}>
          <div>
            <PopupMenu anchorEl={anchorEl} />
          </div>
        </MuiClickAwayListener>
      )}
    </MuiAppBar>
  );
}

export default AppBar;
