import SideBarContainer from '../../layout/sideBar/sideBarContainer';

//styles

import styles from './style';

import {useEffect, useRef} from 'react';
import clsx from 'clsx';

import {goBack} from 'connected-react-router/immutable';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SelectAction from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { useState} from "react";
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import {editPause, editCancel, editCollapse, editSearch, sortedNotification,NotificationType,NotificationList, selectTags, addMessage} from "../../../store/sideBar/messageSlice";

import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiCollapse from '@material-ui/core/Collapse';
import MuiExpandMore from '@material-ui/icons/ExpandMore';

import CardSimple from './components/cardSimple';
import CardTransfer from './components/cardTransfer';
import MuiIconButton from '@material-ui/core/IconButton';

import OptionContainer from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import Option from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';

import Undo from 'components/icons/undo';
import Redo from 'components/icons/redo';
import { undo,redo,undoStack, UndoEvents } from 'components/utils/undoStack';
import { selectisTourRunning, tourListSlice } from 'store/tourSlice';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import tutorialSteps from 'components/layout/TourComponent/data/tutorialSteps';
//HeaderIconButton
import HeaderIconButton from '../../shared/headerIconButton/IconButton';

import useListStyles from "../../shared/List/liststyle"
import { createTourListFor } from 'components/layout/TourComponent/data';
import { getIsTourVisitableState, getTourVisitedState, setHistoryState } from 'store/tourStateSlice';
import globalThemes from 'theme/globalThemes';
// import useLocalStorage from 'customHooks/useLocalStorage';
export default function Annotations(){

    const dispatch = useAppDispatch(); 

    const classes = styles();
    const listClasses = useListStyles();
    const customClasses = globalThemes();
   const scrollToRef = useRef<HTMLUListElement | null>(null);
  

    const notificationList= useAppSelector(sortedNotification )
    const [allTagId,setAllTagId] = useState<number>(-1);
    const [customTagId,setCustomTagId] = useState<number>(-1);
    const tags = useAppSelector(selectTags);
    const [activeId, setActiveId] = useState(-1);
    const [isUndoable, setIsUndoable] = useState(false);
    const [isRedoable, setIsRedoable] = useState(false);
    const [notificationIndex, setNotificationIndex] = useState<number>(notificationList.length-1);

    const oldUser:any  = JSON.parse(localStorage.getItem("vct-tour"))||{};
    const tourVisitedState = useAppSelector(getTourVisitedState);
    const isTourVisitable = useAppSelector(getIsTourVisitableState)
    oldUser.history = true;
    const isTourRunning = useAppSelector(selectisTourRunning)
    // const [userType, setUserType] = useLocalStorage("vct-tour");
    if(!(tourVisitedState?.history) && !isTourRunning && isTourVisitable){
      let tour: any = createTourListFor(TOUR_MENU_NAMES.HISTORY);
      let dialogProps:DialogueProps={
            dialogueRun: true,
            tourName: tour.title,
            description: tour.description as string,
            stepIndex: 1
        }
        dispatch(dialogueState(dialogProps));  
        // setUserType(oldUser);
        localStorage.setItem("vct-tour", JSON.stringify(oldUser));
        dispatch(setHistoryState({history:oldUser.history}))
    }

    useEffect(() => {
        const openedList = notificationList.filter(item => item.collapsed).map(item => item.id);
        let allTag = tags.find(e => e[1] === "All");
        let customTag = tags.find(e => e[1] === "Custom");
        if(allTag && customTag) {
            setAllTagId(allTag[0]);
            setCustomTagId(customTag[0]);
        }
        if (openedList.length === notificationList.length && allTag)
        setActiveId(allTagId);
        else if(customTag)
        setActiveId(customTag[0]);
    },[]);

    useEffect(() => {
        const openedList = notificationList.filter(item => item.collapsed).map(item => item.id);
        let all = tags.find(e => e[1] === "All");
        let custom = tags.find(e => e[1] === "Custom");
        if(all && custom) {
            setAllTagId(all[0]);
            setCustomTagId(custom[0]);
        }
        if (openedList.length === notificationList.length && all)
        setActiveId(all[0]);
        
      },[notificationList]);

    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const onHandleSelect = (id : number) => {
        setActiveId(id);
        let tag = tags.find( t => t[0] === id);
      
        if(tag)        
            dispatch(editSearch(tag[1]));       
    }

    const onHandlePause = (id : string, pause : boolean) => {
        // console.log(id,pause)
        if(pause)
            dispatch(editPause({id:id, value: false}));
        else
            dispatch(editPause({id:id, value: true}));
    }

    const onHandleCollapse = (id : string, boolean: boolean) => {
        setActiveId(customTagId);
        if(boolean)
        dispatch(editCollapse({id, value: true}))
        

        else
        dispatch(editCollapse({id, value: false}))

    }

    const onHandleCancel = (id: string) => {
       dispatch(editCancel(id));
    }

    const customSearch =(e : any)=>
    {
   return  activeId === customTagId ? e[1]!== customTagId : true




    }

    const getHeaderContent = () => {

        return (

           <Title text="History"/>
        )
    }

    const getHeaderRightIcon = () => {
        return (

            <HeaderIconButton label={"help"} icon={<HelpIcon/>} disabled={false} onClick={handleResultsClick}></HeaderIconButton>
            // <div style={{marginLeft:'48px'}}>
            // <MuiIconButton className={classes.iconTextColor} aria-label="help" onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
            // </MuiIconButton>
            // </div>
        )
    }

    const getAction = () => {
        return (
            <SelectAction
                labelId="messages-selection-label-id"
                id="messages-selection-id"
              
                onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
                value={activeId}
                MenuProps={{
                    disablePortal: true,
                    anchorOrigin: {
                        vertical:"bottom",
                        horizontal:"left",
                    },
                    getContentAnchorEl: null
                  
                }}
            >
                
                { 

               
                tags.filter(customSearch).map((item) => 
                        <MuiMenuItem className={customClasses.selected} classes={{root:classes.bodyContent}} value={item[0]} > {item[1]} </MuiMenuItem> )
                }
            </SelectAction>
        );
    }
  
  


    const newCollapse = (id : string) => {

        let countHide = 1 ;
        let hiddenId = [id];
        const index = notificationList.findIndex(item => item.id === id);

        if( index >= 0){
            for(let i = index+1; i<notificationList.length;i++){
                if(notificationList[i].collapsed === false){
                    countHide= countHide+1;
                    hiddenId = [...hiddenId, notificationList[i].id]
                }
                else
                    break;
            }
        
            if(index > 0 && notificationList[index -1].collapsed === false){
                return(null);
            }

            return(
                <div className={classes.card}>
                    <MuiGrid container onClick={() => { countHide === 1 ? onHandleCollapse(id,false) :hiddenId.map(item => onHandleCollapse(item,true))}}>
                        <MuiGrid item xs={1}></MuiGrid>
                        <MuiGrid item xs={9} className={classes.notification}>
                            <MuiTypography >
                                {`${countHide} Notification`} 
                            </MuiTypography>
                        </MuiGrid>
                        <MuiGrid item>
                            <MuiIconButton size="small">
                                <MuiExpandMore />
                            </MuiIconButton>
                        </MuiGrid>
                    </MuiGrid>
                </div>
            )
        }
    }

    const getCard = (item : NotificationList) => {
        switch(item.card.type){
            case(NotificationType.SIMPLE_MESSAGE):
                return(
                    <CardSimple item={item} handleCollapse={onHandleCollapse}/>
                )
            case(NotificationType.NETWORK_TRANSFER_MESSAGE):
                return(
                    <CardTransfer item={item} handleCollapse={onHandleCollapse} handlePause={onHandlePause} handleCancel={onHandleCancel}/>
                )
        }
    }

    const getBody = () => {
        scrollToRef.current?.scrollIntoView({behavior: 'smooth'})
        return (
            <div className={listClasses.Scrollbar} >
                
                {/* {scrollToRef.current?.notificationIndex.scrollIntoView({behavior: 'smooth'})} */}
                {notificationList.map((item: any,index:number) => 
                    <span key={'divParent_' + item.id}  >
                    
                
                    {   !item.collapsed
                            && 
                                newCollapse(item.id)
                        }
                        <MuiCollapse in={item.collapsed} ref={index ===  notificationIndex ? scrollToRef : null} className={index ===  notificationIndex ? classes.enabledContent : classes.disabledContent } >
                            
                            <div  >
                                
                            {getCard(item)}
                            </div>
                        </MuiCollapse>
                    </span>
                )}
            </div>
        )
    }      
    const handleUndoStackUpdate = (e:any) => {
        setIsUndoable(undoStack.isUndoable());
        setIsRedoable(undoStack.isRedoable());
      }
      useEffect(() => {
        undoStack.addEventListener(UndoEvents.UPDATE, handleUndoStackUpdate);
        return () => {
          undoStack.removeEventListener(UndoEvents.UPDATE);
        }
      },[])
      const handleUndo = () => {
        dispatch(tourListSlice.actions.setUpdateAction("undo"))
        dispatch(tourListSlice.actions.setManualStepForward());
        if(notificationList.length>1 && notificationIndex!==0 ){
            setNotificationIndex(notificationIndex - 1)
        }
       
        undo(dispatch);
        dispatch(tourListSlice.actions.setUpdateDecreAction("undo"))
      }
  
      const handleRedo = () => {
        dispatch(tourListSlice.actions.setUpdateAction("redo"))
        dispatch(tourListSlice.actions.setManualStepForward());
        if(notificationList.length > 1 && notificationList.length - 1 !== notificationIndex){
            setNotificationIndex(notificationIndex + 1)
        }
        redo(dispatch);
 
      }
      const handleResultsClick= (e:any) => {
        let tour: any = createTourListFor(TOUR_MENU_NAMES.HISTORY);
        let dialogProps:DialogueProps={
        dialogueRun: true,
        tourName: tour.title,
        description: tour.description as string,
        stepIndex: 1
      }
        dispatch(dialogueState(dialogProps));
      }

  
  const getFooter = () => {


    return(
        <div>
       <OptionContainer >
        
            <Option active={false} label="Undo"  icon={Undo} onClickUpdate={handleUndo}  id="undo" /> 
              
             
            <Option  active={false} label="Redo"  icon={Redo} onClickUpdate={handleRedo} id="redo" /> 
                 
        </OptionContainer> 
      </div>
    ) 
  }

    return (<SideBarContainer
        headerContent={ getHeaderContent() }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
        />)
}
