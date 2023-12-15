import { goBack } from "connected-react-router/immutable";
import BackIcon from "../shared/BackIcon";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";

import { makeStyles } from "@material-ui/styles";
import { useAppSelector, useAppDispatch } from "../../../../store/storeHooks";
import {
  selectCheckedLeafNodes,
  selectUnCheckedLeafNodes,
} from "../../../../store/sideBar/productTreeSlice";
import DisplayModeBody from "../DisplayModes/DisplayModesBody";
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import Footer from "../DisplayModes/Footer";
import {
  DownloadStates,
  fetchDisplayModes,
  selectApplyTo,
  Selection,
  setApplyTo,
  setDisplayModeAsync,
  setDownloadStatus,
} from "../../../../store/sideBar/displayModesSlice";
import { useEffect } from "react";
import { selectisTourRunning, tourListSlice } from "store/tourSlice";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton, Typography } from "@material-ui/core";
import { BytesToStructuredString } from "components/utils/networkUtils";
import {
  selectPanelStatusId,
  selectMenuStatusId,
} from "store/sideBar/displayModesSlice";
import HelpIcon from "@material-ui/icons/HelpOutline";
import { TOUR_MENU_NAMES } from "components/utils/tourMenus";
import { DialogueProps, dialogueState } from "store/tutorialSlice";

//HeaderIconButton

import HeaderIconButton from "../../../shared/headerIconButton/IconButton";
import { createTourListFor } from "components/layout/TourComponent/data";
// import useLocalStorage from "customHooks/useLocalStorage";
import { getIsTourVisitableState, getTourVisitedState, setDiaplayModesState } from "store/tourStateSlice";

const selectionStyle = makeStyles((theme: any) => ({
  bodyContent: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
    color: theme.palette.text.secondary,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.text.primary,
      opacity: 1,
    },
    '&.Mui-selected':{
      backgroundColor: `${theme.palette.action.selected} !important`,
      color:`${theme.palette.accent.primaryText}`,
      // backgroundColor:"transparent !important",
      // borderRadius: "4px",
    },
  },
}));

export default function DisplayModes(props: any) {
  const classes = selectionStyle();

  const checkedLeafNodes = useAppSelector(selectCheckedLeafNodes);
  const unCheckedLeafNodes = useAppSelector(selectUnCheckedLeafNodes);
  const applyTo = useAppSelector(selectApplyTo);
  const dispatch = useAppDispatch();
  const panelStatusId = useAppSelector(selectPanelStatusId);
  const menuStatusId = useAppSelector(selectMenuStatusId);

    const oldUser:any  = JSON.parse(localStorage.getItem("vct-tour")) || {};
    const tourVisitedState = useAppSelector(getTourVisitedState);
    const isTourVisitable = useAppSelector(getIsTourVisitableState)
    oldUser.displayModes = true;
    const isTourRunning = useAppSelector(selectisTourRunning)
    // const [userType, setUserType] = useLocalStorage("vct-tour");
    if(!(tourVisitedState?.displayModes) && !isTourRunning && isTourVisitable){
      let tour: any = createTourListFor(TOUR_MENU_NAMES.DISPLAY_MODES);
      let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: tour.title,
      description: tour.description as string,
      stepIndex: 1
    }
        dispatch(dialogueState(dialogProps));  
        // setUserType(oldUser);
        localStorage.setItem("vct-tour", JSON.stringify(oldUser));
        dispatch(setDiaplayModesState({displayModes: oldUser?.displayModes}))
    }

  useEffect(() => {
    if (checkedLeafNodes.length > 0)
      dispatch(setApplyTo(Selection.SELECTED_PARTS));
    },[])

  const IsListDisabled = (): boolean => {
      if((applyTo === Selection.SELECTED_PARTS && checkedLeafNodes.length === 0) ||
         (applyTo === Selection.UNSELECTED_PARTS && unCheckedLeafNodes.length ===  0)
      ) 
      {
        return true
    }
      else {
        return false
      }
    }

    const onClickBackIcon = () =>{
      dispatch(goBack());
  }

  const handleResultsClick = () => {
    let tour: any = createTourListFor(TOUR_MENU_NAMES.DISPLAY_MODES);
    let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: tour.title,
    description: tour.description as string,
    stepIndex: 1
  }
    dispatch(dialogueState(dialogProps));
  }
  
	const handleSelectChange = (e:React.ChangeEvent<{ value: Selection }>) => {
      dispatch(setApplyTo(e.target.value));
      dispatch(fetchDisplayModes());
    }
   const DisplayMode = () =>{
      dispatch(tourListSlice.actions.setUpdateAction("#step14"))
      dispatch(tourListSlice.actions.setManualStepForward()); 
    } 

    const getHeaderContent =()=>{

      return (

        <Title text={"Display Modes"}></Title>

      )
    }
    const  getHeaderRightIcon=()=>{

      return (

            <HeaderIconButton label={"help"} icon={<HelpIcon/>} onClick={handleResultsClick} disabled={false}></HeaderIconButton>
      )


    }
    const getAction = () => {
        return(
          <SelectAction
          className={classes.bodyContent}
          labelId="display-modes-selection-label-id"
          id="display-modes-selection-id"
          value={applyTo}
          onChange={handleSelectChange}
          onClick={DisplayMode}
          MenuProps={{
            disablePortal: true,
            anchorOrigin: {
              vertical:"bottom",
              horizontal:"left",
           },
           getContentAnchorEl: null
          }}
          >
            <MenuItem id='step15'  className={classes.bodyContent} value={Selection.ALL_PARTS}>All Parts</MenuItem>
            <MenuItem className={classes.bodyContent} value={Selection.SELECTED_PARTS}>Selected Parts</MenuItem>
            <MenuItem className={classes.bodyContent} value={Selection.UNSELECTED_PARTS}>Unselected Parts</MenuItem>

          </SelectAction>
        )
    }
    const getBody =()=>{

      return (

        <DisplayModeBody disabled={IsListDisabled()}/> 

      )
    }
    const getFooter = () => {
       return  <></>
    }

    return (<SideBarContainer
      headerContent= {getHeaderContent()}
      headerRightIcon= {getHeaderRightIcon()}
      headerAction = {getAction()}
      body = {getBody()}
      footer = {getFooter()}
      />)
}
