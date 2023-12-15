//External Imports
import Joyride, {
  CallBackProps,
  STATUS,
  EVENTS,
  ACTIONS,
  Styles
} from 'react-joyride';
import {Dialog} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import toastMessage from '../../sideBarContents/messages/toastMessage.json'

//Style
import appTheme from '../../../theme/index';
import tourStyle from './style';

//Store - actions - selectors
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import { selectActiveTourIndex, selectisTourRunning, selectTour, selectTourLocale, tourListSlice, selectIsManualUpdate,setIsTourRunning } from 'store/tourSlice';
import { DialogueProps, dialogueState, getDialogProps } from 'store/tutorialSlice';
import  GettingStatedTour  from './data/tutorialSteps';
import {toastMsg} from '../../../store/toastSlice';
import { TOUR_MENU_NAMES } from '../../../components/utils/tourMenus';
import { createTourListFor } from "../../../components/layout/TourComponent/data";

import { useEffect } from 'react';

export const Tour = (props: any) => {

  const dispatch=useAppDispatch();
  const isRunning = useAppSelector(selectisTourRunning);
  const isManualUpdate = useAppSelector(selectIsManualUpdate);  
  const locale = useAppSelector(selectTourLocale);
  const activeTourIndex = useAppSelector(selectActiveTourIndex);
  const tours = useAppSelector(selectTour);
  const dialogProps = useAppSelector(getDialogProps);
  const classes = tourStyle();
  const theme = useTheme();

  const styling : Styles = {
      options: {
        backgroundColor: theme.palette.background.default,
        textColor: theme.palette.text.secondary,
      arrowColor: theme.palette.background.default,
    },

  spotlight:{
    border:'solid',
    borderRadius: 0,
    width:'auto',
    color:'white',

  },
  
  tooltip: {
    width:'100%',
    padding:'20px 30px 20px 30px',
    borderRadius:16,
    border : '0px'
    
  },
  tooltipContent: {
    padding: '10px 10px 0px 10px',
    
  },
  
  tooltipFooter: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 0,
    marginRight:0,
  },

  buttonNext: {
    fontSize: appTheme.typography.button.fontSize,
    width: '70px',
    height: '30px',
    color: '#fff',
    backgroundColor: '#0078d4',
    borderRadius: 5,
    padding:0,
  },

  buttonClose:{
    color:'#fff',
    backgroundColor:'#0078d4',
    minWidth:'28px',
    minHeight:'28px',
    padding:0,
    right: '30px',
    top: '20px',

    borderRadius:2,

  },
  buttonSkip: {
    fontSize: appTheme.typography.button.fontSize,
    color: '#0078d4',
    top:0,
  },

  buttonBack:{
    fontSize: appTheme.typography.button.fontSize,
    color: '#0078d4',
    position: 'absolute',
    left: '30px',

  },
  
  tooltipTitle:{
    textAlign:"left",
    paddingLeft:'10px',
    fontSize:appTheme.typography.body1.fontSize,
      fontWeight: appTheme.typography.body1.fontWeight,
          lineHeight:'28px',
          width:'250px',
          height:'28px'

    }, 
  }

  // define custom classes - includes access to theme object
  // const handleJoyrideCallback = (data: CallBackProps) => {
  //   const { action, status, type } = data;

  //   // if (([STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR] as string[]).includes(status)) {
  //   //   dispatch(tourListSlice.actions.setStopTour())
  //   // }
  //   if (([EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
  //     dispatch(setIsTourRunning(false));
  //     dispatch(toastMsg({msg:'Error : Selected Element Was  Not Found'}));
      
  //   }
  //   else if (([EVENTS.STEP_AFTER] as string[]).includes(type)) {
  //     if (action === ACTIONS.NEXT) {
  //       if(isManualUpdate)
  //         dispatch(tourListSlice.actions.setIsManualUpdate(false));   
  //       else
  //         dispatch(tourListSlice.actions.setStepForward())
  //     }
  //     else if (action === ACTIONS.PREV) {
  //       if(isManualUpdate)
  //         dispatch(tourListSlice.actions.setIsManualUpdate(false));   
  //       else
  //         dispatch(tourListSlice.actions.setStepBack())
  //     }
  //     else if (action === ACTIONS.CLOSE) {
  //       dispatch(tourListSlice.actions.setStopTour())
  //     }
  //   }


  // }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status, type } = data;
    if (([STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR] as string[]).includes(status)) {
      dispatch(tourListSlice.actions.setStopTour())
    }
    else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      if (action === ACTIONS.NEXT) {
        if(isManualUpdate)
          dispatch(tourListSlice.actions.setIsManualUpdate(false));   
        else
          dispatch(tourListSlice.actions.setStepForward())
      }
      else if (action === ACTIONS.PREV) {
        if(isManualUpdate)
          dispatch(tourListSlice.actions.setIsManualUpdate(false));   
        else
          dispatch(tourListSlice.actions.setStepBack())
      }
      else if (action === ACTIONS.CLOSE) {
        dispatch(tourListSlice.actions.setStopTour())
      }
    }
  }

  const closeTourDialog = () => {
  let dialogPropsToClose:DialogueProps={
    dialogueRun: false,
    tourName:dialogProps.tourName,
    description: dialogProps.description
  }
    dispatch(dialogueState(dialogPropsToClose));
  }

  const stopTour = () => {
    closeTourDialog();
    dispatch(tourListSlice.actions.setStopTour());
  }
      
  const startTour = () => {
    let target:any = ''

    tours.forEach((item)=>{
      if(item.title === dialogProps.tourName) {
        target = item.steps[0].target;
      }
    })

    const element = document.querySelector(target) as HTMLInputElement | null;
    if(element === null) {
      dispatch(setIsTourRunning(false));
      closeTourDialog();
      dispatch(toastMsg({msg:toastMessage.tourError}));
    }else{
      closeTourDialog();
      dispatch(tourListSlice.actions.setStepIndex(dialogProps.stepIndex ?? 0));
      dispatch(tourListSlice.actions.setStartTour(dialogProps.tourName));
    }


  }

  return (
    <>
          <Joyride
            callback={handleJoyrideCallback}
            debug = {true}
            continuous
            run={isRunning}
            spotlightClicks
        stepIndex={tours[activeTourIndex].activeStepIndex}
        steps={tours[activeTourIndex].steps}
        locale={locale}
            styles={styling}
scrollToFirstStep={true}

scrollOffset={200}
            hideBackButton
        spotlightPadding  = {0}
          />
        <Dialog open={dialogProps.dialogueRun}
        onClose={closeTourDialog} 
        PaperProps={{
        style:{
          width:'425px',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius:'16px',
            border: '0px',
          padding:'20px 30px 20px 30px',
        }
      }}
        >
            <DialogTitle style={{padding:0}}>
          <span className={classes.DialogTitle}>
              { dialogProps.tourName }
              </span>
          <IconButton onClick={() => { 
            stopTour();
          }}
             className={classes.IconButton}
             >
              <CloseIcon />
             </IconButton>
            </DialogTitle>
            <DialogContent 
             style={{padding:0}}>
          <DialogContentText
            className={classes.DialogContextText}
          >
            {dialogProps.description}
          </DialogContentText>
        </DialogContent>
        {(dialogProps.description !== 'Coming Soon....') &&
        <Button
        className={classes.DialogButton}
        onClick={() => {
            startTour();
        }}
        >
          Start Tour
        </Button> 
       }
        </Dialog>
    </>
    );
  }
  
  export default Tour