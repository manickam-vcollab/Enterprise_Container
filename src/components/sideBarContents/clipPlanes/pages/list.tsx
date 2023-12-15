
import MuiIconButton from '@material-ui/core/IconButton';
import {goBack, push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';
import styles from './style';
import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import { useState} from "react";

import Typography from '@material-ui/core/Typography'
import MuiInput from '@material-ui/core/Input';


import Toggle from 'react-toggle';
import "react-toggle/style.css";

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import TransformIcon from '../../../icons/transform';

import AddIcon from "../../../icons/plus";

import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiButton from '@material-ui/core/Button';

import {plane, setSectionPlaneData, addPlane, editEnabled, setActive, editPlaneName, removePlane, duplicatePlane, saveSelectedPlane, setSelectionMode} from "../../../../store/sideBar/clipSlice";
import {setChildItem} from "../../../../store/mainMenuSlice";

import { useEffect } from 'react';

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import MuiMoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '../../../shared/popper'
import { getItem, selectMainMenuItems, setActiveTab, getMMenuItemId } from 'store/mainMenuSlice';

import {undoStack} from "../../../utils/undoStack";

import Duplicate from "../../../icons/duplicate";
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { selectisTourRunning, tourListSlice } from 'store/tourSlice';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import clsx from 'clsx'
import globalThemes from 'theme/globalThemes'

//HeaderIconButton 

import HeaderIconButton from '../../../shared/headerIconButton/IconButton'
import { createTourListFor } from 'components/layout/TourComponent/data';
// import useLocalStorage from 'customHooks/useLocalStorage';
import { getIsTourVisitableState, getTourVisitedState, setClipPlanesState } from 'store/tourStateSlice';

export default function List(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const customClasses = globalThemes();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);

  const clickedValues = useAppSelector((state) => state.clipPlane.planes.filter(item => item.selected === true));

  const [copied, setCopied] = useState<boolean>(false); 
  const [copy, setCopy] = useState<plane | null>(null);

  const [editPlane, setEditPlane] = useState<number>(-1)
  const [editName, SetEditName] = useState<string>("");

  const [openMoreOption,setOpenMoreOption] = useState(false)
  const [anchorElMoreOption, setAnchorElMoreOption] = useState(null);
  const useStyle = styles();
  
  const mainMenuItems = useAppSelector(selectMainMenuItems);

  const oldUser:any  = JSON.parse(localStorage.getItem("vct-tour"))||{};
  const tourVisitedState = useAppSelector(getTourVisitedState);
  const isTourVisitable = useAppSelector(getIsTourVisitableState)
  oldUser.clipPlanes = true;
  const isTourRunning = useAppSelector(selectisTourRunning)
  // const [userType, setUserType] = useLocalStorage("vct-tour");
  if(!(tourVisitedState?.clipPlanes) && !isTourRunning && isTourVisitable){
  
      let tour: any = createTourListFor(TOUR_MENU_NAMES.CLIP_PLANES);
      let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: tour?.title,
      description: tour?.description as string,
      stepIndex: 1
      }
      dispatch(dialogueState(dialogProps));  
        // setUserType(oldUser);
        localStorage.setItem("vct-tour", JSON.stringify(oldUser));
        dispatch(setClipPlanesState({clipPlanes:oldUser.clipPlanes}))
    }
   
  // disable and inable the clipPlane menu items
  useEffect(() => {
      const enabledPlanes = planes.filter(item => item.enabled === true);

      let panelId = getItem(getMMenuItemId("Clip Plane", mainMenuItems) ,mainMenuItems);
      let panelId_edit = getItem(getMMenuItemId("Clip plane Settings", mainMenuItems) ,mainMenuItems);
      let panelId_transform = getItem(getMMenuItemId("Clip plane Transform", mainMenuItems),mainMenuItems);
      
      if (panelId && panelId_edit) {
        if (planes.length === 0) {
          dispatch(setChildItem({ panelId: panelId.id, childId: panelId_edit.id, boolean: true }));
        } else {
          dispatch(setChildItem({ panelId: panelId.id, childId: panelId_edit.id, boolean: false }));
        }
      }
      
      if (panelId && panelId_transform) {
        if (enabledPlanes.length === 0) {
          dispatch(setChildItem({ panelId: panelId.id, childId: panelId_transform.id, boolean: true }));
        } else {
          dispatch(setChildItem({ panelId: panelId.id, childId: panelId_transform.id, boolean: false }));
        }
      }
      },[planes]);

  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleClick :(e: any, click: any) => any = (e, click)=> {
  
    //Plane Equation

    // Set SelectionMode to None when mupliple item selected. 
    dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))
    dispatch(setActive({clicked: click}))
    if(click.id !== editPlane)
      setEditPlane(-1)     
  }

  const [singleSelectTimer, setSingleSelectTimer] = useState<number|null>(null);
  const handleClick = (e:any, click:any) => {
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
        onHandleClick(e, click);
      }, 200));
    }
  }
  
    const onClickAddItem = () => {
    dispatch(addPlane({undoable: true}));
    setTimeout(() => {
      dispatch(tourListSlice.actions.setManualStepForward());
    }, 50);
    
  }


  const onHandleCheck = (toCheck:boolean, item: plane, undoable?: boolean) => {
    dispatch(editEnabled({id:item.id,isEnabled:toCheck}));
    dispatch(setSectionPlaneData({id:item.id}));
    // dispatch(tourListSlice.actions.setUpdateAction("#step19"))

    const newValue = !item.enabled;
    const oldValue = item.enabled
    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleCheck(oldValue, item),
          redo: () => onHandleCheck(newValue, item),
        }
      )
    }

  }


  // const onHandleCopy = () => {
  //   setCopied(true);
  //   const copyItem = planes.find(item => item.id === clickedValues[0].id);
  //   if(copyItem)
  //     setCopy(copyItem);
  // }

  const onHandlePaste = () => {
    setCopied(true);
    const copyItem = planes.find(item => item.id === clickedValues[0].id);
    if(copyItem)
      setCopy(copyItem);
    if(planes.length < limit)
    {
       if(copyItem)
      dispatch(duplicatePlane({pastedPlane: copyItem, undoable : true}));
      dispatch(tourListSlice.actions.setManualStepForward());
    }
  }

  const onHandleDelete = () => {
    clickedValues.forEach(item => 
      {
        dispatch(removePlane({id:item.id, undoable: true}))
        dispatch(saveSelectedPlane({clicked: item}))
        dispatch(tourListSlice.actions.setManualStepForward());
      })
  }

  const onHandleEdit = () => {
    //let item = getItem("Clip Plane52",mainMenuItems);
    let item = getItem(getMMenuItemId("Clip plane Settings", mainMenuItems) ,mainMenuItems);
    
      dispatch(setActiveTab({menuItem:item}));
      dispatch(push(item.path));
    // dispatch(push(Routes.CLIPPLANES_SETTINGS)); 
    dispatch(tourListSlice.actions.setManualStepForward());
  }

  const onHandleTransform = () => {
    //let item = getItem("Clip Plane53",mainMenuItems);
    let item = getItem(getMMenuItemId("Clip plane Transform", mainMenuItems),mainMenuItems);
    dispatch(setActiveTab({menuItem:item}));
    dispatch(push(item.path));
    // dispatch(push(Routes.CLIPPLANES_TRANSFORMATION));
  }

  const onHandlePlateNameEdit = (e : any) => {
   SetEditName(e.target.value)
  
  }
  const clickOnPlane1 = ()=> {
      dispatch(tourListSlice.actions.setUpdateAction("#step19"))  
  }
  const clickOnTextArea = ()=> { 
   dispatch(tourListSlice.actions.setManualStepForward());   
}

  const onHandlePlateKey = (e : any, item : any) => {
    if (e.key === 'Enter') {
      setEditPlane(-1)
      if(editName === "" || editName === item.name)
        setEditPlane(-1)
      else{
        const editPlane = {id : item.id, editName : editName, undoable : true}
        dispatch(editPlaneName(editPlane))
      }
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      setEditPlane(-1)
    }
  }



  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
      // <div style={{marginLeft:'48px'}}>
      // <MuiIconButton className={useStyle.iconTextColor} aria-label="help" onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
      // </MuiIconButton>
      // </div>
      <div>
          <HeaderIconButton icon={<HelpIcon/>} label={"helpIcon"} disabled={false} onClick={handleResultsClick}></HeaderIconButton>
      </div>
     
          
    )
  }
    
  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div>
        <div style={{display:"flex",justifyContent:"center",marginTop:10}}>
                  
                  <MuiButton 
                
                  className ={customClasses.Muibtn}
                  style={{width:'98%',height:'35px', borderRadius: "10px"}}
                  disabled =  { planes.length === limit  ? true : false }
                    onClick={() => onClickAddItem()}
                    // color="primary"
                  >
                    Add Clip Plane
                  </MuiButton>
                   
                  
                  </div>
       
                    <MuiMenuList >
                    {
                        planes.map((item:any, index: number) => 
                      <div id='step19'>
                        { editPlane !== item.id 
                          ?
                          <>
                          
                          <MuiMenuItem className={customClasses.selected}  selected={item.selected} id={item.id }  key={item.id} alignItems='center' onClick={(event)=> handleClick(event,item)}>
                          <MuiListItemText onDoubleClick={() => {setEditPlane(item.id); SetEditName(item.name);}} onClick={clickOnTextArea}> {item.name}
                          </MuiListItemText>
                          <MuiListItemIcon >
                              <Toggle
                    checked={item.enabled}
                    onClick={clickOnPlane1}
                    onChange={() => onHandleCheck(!item.enabled,item, true)}/>
                          </MuiListItemIcon>
                          </MuiMenuItem>
                          </>
                      : 
                      <MuiMenuItem className={customClasses.selected}>
                  <MuiInput value={editName} id={item.id } key={item.id}
                  onChange={onHandlePlateNameEdit}
                  onKeyDown={(e) => onHandlePlateKey(e, item)}/>
                      </MuiMenuItem> 
                        }
                        </div>
                    )}
                    </MuiMenuList>
                 

        </div>
      </div>
    )
  }
  const handleResultsClick = () => {
    let tour: any = createTourListFor(TOUR_MENU_NAMES.CLIP_PLANES);
    let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: tour?.title,
    description: tour?.description as string,
    stepIndex: 1
  }
    dispatch(dialogueState(dialogProps));
  }

  const handleClickMoreOption = (e : any) => {
    setOpenMoreOption(!openMoreOption)
    setAnchorElMoreOption( e.currentTarget );
  }

  const onClickAwayMoreOption = () => {
    setOpenMoreOption(false)
  }

  const getFooter = () => {

    let deleteMaster = false;

    const count = clickedValues.filter(item => item.childPlane.length !== 0)

    if(count.length > 0)
      deleteMaster = true;

    return(
        <div>
          <OptionContainer>
       
            <Option id='step21' label="Setting"  active={clickedValues.length ===  1 && editPlane === -1 ? false : true} icon={MuiEditIcon} onClickUpdate={onHandleEdit}
            />
            <Option label="Transform"  active={clickedValues.length ===  1 && clickedValues[0].enabled && editPlane === -1 ? false : true} icon={TransformIcon} onClickUpdate={onHandleTransform}
            />
            <Option id='step30' label="Duplicate"  active={clickedValues.length === 1 && planes.length !== limit && editPlane === -1 ? false : true} icon={Duplicate} onClickUpdate={onHandlePaste}
            />
            <Option id='step31' label="Delete"  active={clickedValues.length === 1 && deleteMaster === false && editPlane === -1 ? false : true} icon={MuiDeleteForeverOutlinedIcon} onClickUpdate={onHandleDelete}
            />
            {/* <Option label="Transform" active = {clickedValues.length ===  1 && clickedValues[0].enabled && editPlane === -1 ? false : true} icon={ <MuiIconButton disabled = {clickedValues.length ===  1 && clickedValues[0].enabled && editPlane === -1 ? false : true}   onClick={() => onHandleTransform()}> 
                    <TransformIcon/>
                </MuiIconButton>}
            />

            <Option label="Duplicate" active ={clickedValues.length === 1 && planes.length !== limit && editPlane === -1 ? false : true} icon={<MuiIconButton disabled ={clickedValues.length === 1 && planes.length !== limit && editPlane === -1 ? false : true}  style={{ }}  onClick={onHandlePaste} > 
                  <Duplicate/>
                </MuiIconButton> }
            />
    
            <Option label="Delete" active ={clickedValues.length === 1 && deleteMaster === false && editPlane === -1 ? false : true} icon={<MuiIconButton disabled ={clickedValues.length === 1 && deleteMaster === false && editPlane === -1 ? false : true} style={{ }}  onClick={onHandleDelete} > 
                  <MuiDeleteForeverOutlinedIcon/>
                </MuiIconButton> }
            /> */}

           

            {/* <Option label="More" icon={
              <ClickAwayListener onClickAway={onClickAwayMoreOption}>
                <div>
                  <MuiIconButton aria-label="changle visibility" onClick={handleClickMoreOption}>
                    <MuiMoreVertIcon/>
                  </MuiIconButton>
              
                  <Popper open={openMoreOption} anchorEl={anchorElMoreOption} placement={"top-end"} disablePortal id="display-menu">
                    <MuiMenuList id="simple-menu">
                      <MuiMenuItem alignItems='center' disabled={clickedValues.length === 1 && editPlane === -1 ? false : true} onClick={onHandleCopy} >
                        <MuiListItemIcon>
                          <MuiFileCopyOutlinedIcon />
                        </MuiListItemIcon>
                        <MuiListItemText>
                          Copy
                        </MuiListItemText>
                      </MuiMenuItem>
                      <MuiMenuItem alignItems='center' disabled={copied && planes.length !== limit ? false : true} onClick={onHandlePaste} >
                        <MuiListItemIcon>
                          <MuiPaste />
                        </MuiListItemIcon>
                        <MuiListItemText>
                          Paste
                        </MuiListItemText>
                      </MuiMenuItem>
                    </MuiMenuList>
                  </Popper>
                </div>
              </ClickAwayListener>    
            }      
          /> */}
        </OptionContainer>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <div style={{columnGap: '228px',display: 'inline-flex',justifyContent: 'stretch',cursor:'pointer'}}><Title text={"List" } group="Clip Planes"/></div> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
