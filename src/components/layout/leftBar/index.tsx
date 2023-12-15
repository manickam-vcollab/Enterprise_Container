import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useLocation } from "react-router-dom";
import LogoMini from 'assets/images/logoMini.svg'
import useStyles from './style';
import useIconStyles from '../appBar/style'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiIcon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'
import GeometryIcon  from '../../icons/geometry';
import TestIcon from '../../icons/annotation'
import Nav from '../nav'
//import ContextMenu from '../../shared/contextMenu'
import ContextMenuV1 from '../../shared/ContextMenuV1'

import {
  useMenuState
} from '@szhsin/react-menu';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { selectSidebarVisibility, setSidebarVisibility, selectFullscreenStatus } from 'store/appSlice';
import { Routes } from 'routes';
import {push} from 'connected-react-router/immutable';
import clsx from 'clsx';

// icons 
import PinIcon from 'components/icons/pin';
import UnPinIcon from 'components/icons/unpin';
import AddGroupIcon from 'components/icons/addGroup';

import { MainMenuItem, selectActiveTab, selectDefaultOptions, removeTab, setActiveTab, selectTemporaryTab, MainMenuItems, addMenuItem, addTab, selectMainMenuItems, getItem, selectMoreMenu, getIcon, setDefaultTabs, selectNavheight} from 'store/mainMenuSlice';
import useContainer from 'customHooks/useContainer';
import { topbarHeight } from 'config';
import nextId from 'react-id-generator'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import { selectisTourRunning, tourListSlice } from 'store/tourSlice';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import tutorialSteps ,{gettingStartedSteps} from '../TourComponent/data/tutorialSteps';


type LeftBarProps = {
    topTabs: MainMenuItem[],
    bottomTabs: MainMenuItem[]
}

function a11yProps(index: any) {
  index=index.replace(/\s+/g, '');
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
   
  },
  tabs: {
    width: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    '& button' : {
      padding: '0px',
    },
    marginTop:"0px"
  },
  tabIcon: {
    fontSize: '0.5rem',
    '& svg':{
      width: '1.25rem'
    },
    
    
  },

  moreIcon: {
    fontSize: '0.5rem',
   marginBottom:'9px',
    '&hover':{
cursor:"pointer",
    },
    '& svg':{
      width: '1.25rem'
    },
  },
  label: {
    marginTop:'-10px',
    width: '100%',
    padding: '0px 10px',
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign:'center'
  },

  moreIconlabel: {
    marginTop:'-15px',
    width: '100%',
    padding: '0px 10px',
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign:'center'
  },
  tab:{
    minWidth: '0px',
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
    fontSize: '0.5rem',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: 1,
    "&:hover": {
      color: theme.palette.text.primary,
      opacity: 1
    }
  },
  scrollBtn: {
      opacity: "0.5 !important",
      pointerEvents: 'none' 
  },
  indicatorColor: {
    backgroundColor: theme.palette.indicatorColor.main,
  },

  selected:{
    opacity: 1,
    color: theme.palette.text.primary,
  },
  more:{
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
    height:"72px",
    color: theme.palette.text.secondary,
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
  
    "&:hover":{
      cursor:"pointer",
      color: theme.palette.text.primary,
      opacity:1,
    },
    
    },

    moreSelected:{
      width:"74px",
      height:"72px",
      color: theme.palette.text.primary,
      opacity:1,
      display:"flex",
      flexDirection: "column",
      justifyContent: "center",
   
    
      "&:hover":{
        cursor:"pointer",
        
      },
    },
     indicator:{
      position: "absolute",
      left: 72,
      width: "2px",
      maxWidth: "100%",
      margin: "0 auto",
      height: "72px",
      paddingTop:"20px",
      background: theme.palette.indicatorColor.main,
      borderRadius: "1px",
    
    }
}));

function LeftBar(props: LeftBarProps) {
  const classes = useStyles();
  const iconClasses = useIconStyles();
  const tabClasses = useTabStyles();
  
  const isFullScreenEnabled = useAppSelector(selectFullscreenStatus);
  const moreMenuItem = useAppSelector(selectMoreMenu);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const temporaryTab = useAppSelector(selectTemporaryTab);
  const dispatch = useAppDispatch();
  const activeItem = useAppSelector(selectActiveTab);
  const bottomTabRef = useRef(null);
  const moreMenuItemRef = useRef(null)
  const [btnWidth, btmHeight] = useContainer(bottomTabRef,[]);
  const [moreMenuWidth, moreMenuHeight] = useContainer(moreMenuItemRef,[]);
  const mainMenuItems = useAppSelector(selectMainMenuItems);
  const [topTabs, setTopTabs] = useState(props.topTabs);
  const theme = useTheme();

  const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));
  const fsTopheight=useAppSelector(selectNavheight)
  // const [isDragging, setIsDragging] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setTopTabs(props.topTabs)
  },[props.topTabs])

  const contextMenuItemsArray = [
    {
      id: 'itempin', text: 'Pin', icon: <PinIcon fontSize='small'/>
    },
    {
      id: 'itemunpin', text: 'Unpin', icon: <UnPinIcon  fontSize='small'/>
    },
    {
      id: 'addgroup', text: 'Add Group', icon: <AddGroupIcon  fontSize='small'/>
    }
  ]

  const [contextMenuID, setContextMenuID] = useState(null || String);

  const [contextMenuXPos, setContextMenuXPos] = useState(0);

  const [contextMenuYPos, setContextMenuYPos] = useState(0);

  const [contextMenuItems, setContextMenuItems] = useState(contextMenuItemsArray)

  const [contextMenuShow, setContextMenuShow] = useState(false);

  const defaultOptions = useAppSelector(selectDefaultOptions);

  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const isTourRunning=useAppSelector(selectisTourRunning)

  const handleGroup = () => {
    setContextMenuShow(false);
    const newItem = contextMenuID;
    let menuItem = getItem(newItem, mainMenuItems);
    menuItem = createGroup();
    dispatch(addMenuItem({
      menuItem
    }));
    dispatch(addTab({
      menuItemId: menuItem.id
    }))
    dispatch(setActiveTab({
      menuItem
    }))

    if (!activeItem) {
      dispatch(setActiveTab({ menuItem }));
      dispatch(setSidebarVisibility(true));
       dispatch(push(menuItem.path));
    }
    else if (activeItem.id !== menuItem.id) {
      dispatch(setActiveTab({ menuItem }));
      dispatch(setSidebarVisibility(true));
       dispatch(push(menuItem.path));
    }
    else {
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({ menuItem: null }));
    }
  }

  const createGroup = () => {
    let id = nextId('customgroup');
    let menuItem = {
     id,
     disabled: false,
     expanded: false,
     name: 'New Group',
     children:[],
     type: MainMenuItems.CUSTOM_GROUP,
     path: Routes.CUSTOM_GROUP,
     isEditMode: true
   }
   return menuItem;
 }
  const handleValChange_old = (event: React.ChangeEvent<{}>, newValue: string) => {

    let menuItem = getItem(newValue, mainMenuItems);
 
    if(menuItem.type === MainMenuItems.ADD_GROUP){
      menuItem = createGroup();
      dispatch(addMenuItem({
        menuItem
    }));
    dispatch(addTab({
      menuItemId: menuItem.id 
    }))
    dispatch(setActiveTab({
      menuItem
    }))
    }

    if(menuItem.type === MainMenuItems.MORE){
      if(!activeItem || (activeItem.id !== menuItem.id)){
        dispatch(setActiveTab({menuItem}));
        dispatch(setSidebarVisibility(true));
      }
      else{
        dispatch(setSidebarVisibility(false));
        dispatch(setActiveTab({menuItem:null}));
      }
      return
    }


    if(!activeItem) {
      dispatch(setActiveTab({menuItem}));
      dispatch(setSidebarVisibility(true));
    }
    else if( activeItem.id !== menuItem.id){
      dispatch(setActiveTab({menuItem}));
    }
    else{
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({menuItem:null}));
    }
    
  };


  const handleValChange = (event: React.ChangeEvent<{}>, newValue: string,name:string) => {
    toggleMenu(false);
  
    let menuItem = getItem(newValue, mainMenuItems);
    if(menuItem.path !== Routes.MORE) {
        dispatch(setActiveTab({  menuItem }));  
      }

   
    if(menuItem)
    {
      if((!activeItem || activeItem.id !== menuItem.id)) {
        name=name.replace(/\s+/g, '');
        let a11yId =a11yProps(name);
          dispatch(tourListSlice.actions.setUpdateAction("#"+a11yId.id))
          setTimeout(() => {
           dispatch(tourListSlice.actions.setManualStepForward());
          }, 10);
        dispatch(tourListSlice.actions.setUpdateAction(gettingStartedSteps.allMenus.target.slice(1)));
        dispatch(push(menuItem.path));
        return;
      } 
      
    }  

    dispatch(push(Routes.VIEWER))    
  };
 
  const setContextMenu = (event: any, id: string) => {

    event.preventDefault();
    event.stopPropagation();

    setContextMenuID(id);
    //setContextMenuShow(true);
    //setContextMenuXPos(event.pageX);
    //setContextMenuYPos(event.pageY);

    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
    dispatch(tourListSlice.actions.setUpdateAction("#vertical-tab-Field"))
    dispatch(tourListSlice.actions.setManualStepForward());

    let IDS: any[] = []

    defaultOptions.map((defaultData) => {

      IDS.push(defaultData.id)

    })

    let idExsist = IDS.includes(id);

    let menuItemsCopy = [...contextMenuItemsArray]

    let filteredDataSource = menuItemsCopy.filter((item) => ( ( idExsist ? item.id === "itemunpin" : item.id === "itempin" ) || item.id === "addgroup" ))

    setContextMenuItems(filteredDataSource)

  }

  const setContextParentMenu = (event: any) => {

    event.preventDefault();
    event.stopPropagation();
    //setContextMenuShow(true);
    //setContextMenuXPos(event.pageX);
    //setContextMenuYPos(event.pageY);
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
    dispatch(tourListSlice.actions.setUpdateAction(tutorialSteps.steps[3].target.slice(1)))
    dispatch(tourListSlice.actions.setManualStepForward());


    let menuItemsCopy = [...contextMenuItemsArray]

    let filteredDataSource = menuItemsCopy.filter((item) => {

      if (item.id === "addgroup") {

        return item;

      }

    });
    
    setContextMenuItems(filteredDataSource);

  }

  const pinItems = () => {

    let menuItem = getItem(contextMenuID, mainMenuItems);

    const menuItemId = contextMenuID;

    dispatch(addTab({ menuItemId }))

    dispatch(setActiveTab({
      menuItem
    }))
   

    setContextMenuShow(false);


  }
  const unpinItems = () => {
    const menuItemId = contextMenuID;
    dispatch(removeTab({ menuItemId }))
    dispatch(setActiveTab({menuItem:null}))
    dispatch(setSidebarVisibility(false))
    setContextMenuShow(false);
  }
  

  const onHandleContextMenuClick = (id: string) => {
   // dispatch(setSidebarVisibility(false))
// debugger;

    if (id === "itempin") {
      pinItems()
      dispatch(tourListSlice.actions.setUpdateAction('#step13'))
      dispatch(tourListSlice.actions.setManualStepForward());

    }
    if (id === "itemunpin") {
      unpinItems()
      dispatch(tourListSlice.actions.setUpdateAction('#step13'))
      dispatch(tourListSlice.actions.setManualStepForward());
    }
    if (id === "addgroup") {
      handleGroup()
        dispatch(tourListSlice.actions.setManualStepForward());
    }

  }

  const handleOutSideClick = ()=> {

    setContextMenuShow(false);
    toggleMenu(false);
  }
  
  const handleClick=(menuId: string)=>{
    // console.log("MENU CLICKED ID: ",menuId);
    dispatch(tourListSlice.actions.setUpdateAction('#'+menuId))
   
  }

  const reorder = (list:any[], startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const handleDragEnd = (result:any) => {
    // setIsDragging(false);
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const tabs:any[] = reorder(
      topTabs,
      result.source.index,
      result.destination.index
    );

    setTopTabs(tabs);
    dispatch(setDefaultTabs({tabIds: tabs.map(e => e.id)}))
  }
  /*
  useEffect(() => {

    if(activeItem)
    {
      dispatch(push(activeItem.path))
    }
    else{
      dispatch(push(Routes.HOME))
    }
    
  },[activeItem])
  */

  const getItemByPath :any = (items : Array<any>, path : string) =>{
    let foundItem = null;

    for(let i = 0; i < items.length; i++) {

      if(items[i].path === path){
        foundItem = items[i];
        break;
      }

      if(items[i].children) {

        foundItem = getItemByPath(items[i].children, path);
        if(foundItem)
          break;
      }       
    }
    return foundItem;
  }

  useLayoutEffect(() => {
   // console.log("location",location,mainMenuItems); 
    let menuItem = getItemByPath(mainMenuItems, location.pathname);
    //  console.log("menuitem",menuItem);
    if(location.pathname === Routes.VIEWER) {
        dispatch(setSidebarVisibility(false));
        dispatch(setActiveTab({menuItem:null}));
    }
    else {
      
      if(menuItem)
      {
        if(menuItem.type === MainMenuItems.ADD_GROUP){
          menuItem = createGroup();
          dispatch(addMenuItem({
            menuItem
        }));
        dispatch(addTab({
          menuItemId: menuItem.id 
        }))
        dispatch(setActiveTab({
          menuItem
        }))
        }

        if(menuItem.type === MainMenuItems.MORE){
          if(!activeItem || (activeItem.id !== menuItem.id)){
            dispatch(setActiveTab({menuItem}));
            dispatch(setSidebarVisibility(true));
          }
          else{
            dispatch(setSidebarVisibility(false));
            dispatch(setActiveTab({menuItem:null}));
          }
          return
        }

        if(!activeItem) {
          dispatch(setActiveTab({menuItem}));
          dispatch(setSidebarVisibility(true));
        }
        else if( activeItem.id !== menuItem.id){
         dispatch(setActiveTab({menuItem}))
         dispatch(setSidebarVisibility(true));
        }
        else{
          dispatch(setSidebarVisibility(true));
          dispatch(setActiveTab({menuItem}));
        }
      }  

    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location])

  useEffect(() => {
    if(!isSidebarVisible && activeItem){
      dispatch(setActiveTab({menuItem: null}))
    }
  },[isSidebarVisible])


  const getCustomGroupID=(tempTab:any)=>{
    if(tempTab.type===MainMenuItems.CUSTOM_GROUP) {
      if(isTourRunning){
        return "NewGroup";
      }
      else{
        return tempTab.id
      }
    }
    return tempTab.name;
  }

  const getActiveItemIndex = (tabGroupName : string) => {
    if(activeItem)
    {
      if(tabGroupName === "TopTab"){
        if(activeItem.type === MainMenuItems.MORE)     
          return activeItem.id;      
      }
      if(tabGroupName === "MenuTab") {
        if(activeItem.type !== MainMenuItems.MORE){
          //return activeItem.id; 
          const index = topTabs.findIndex(item => item.id === activeItem.id);
          if(index >= 0){
            return index;
          }
          if(temporaryTab && index < 0){
            return temporaryTab.id;
          }
            //return topTabs.length;
        }     
        
      }  
  }
  return false; 
}


  return (
  <>
  {
    <ContextMenuV1 toggleMenu={toggleMenu} menuProps ={menuProps} anchorPoint ={anchorPoint}  handleOutSideClick={handleOutSideClick} onHandleContextMenuClick={onHandleContextMenuClick} items={contextMenuItems} />}
    { isFullScreenEnabled && <Nav/> }
    <div style={isFullScreenEnabled ? {height: `calc(100% - ${btmHeight+fsTopheight}px)`} : {height: `calc(100% - ${btmHeight}px)`}} className={classes.root}  id={gettingStartedSteps.activitybar.target.slice(1)}>
      {
        moreMenuItem && 
        <div  ref={moreMenuItemRef}> 
        
        { activeItem?.id==moreMenuItem.id ? <div className={tabClasses.indicator}></div> : null} 
        <div  id={gettingStartedSteps.allMenus.target.slice(1)} className={activeItem?.id == moreMenuItem.id ? tabClasses.moreSelected: tabClasses.more} onClick={(event) => handleValChange(event, moreMenuItem.id,moreMenuItem.name) } > 
        <div  className={clsx(iconClasses.divIcon, tabClasses.moreIcon)}>
          { 
            React.createElement(getIcon(moreMenuItem.type))
          }
        </div> 
        <div className={tabClasses.moreIconlabel}>
          {moreMenuItem.name}
        </div>
        </div>

        {/* <Tabs 
          orientation="vertical"
          textColor='inherit'
          variant="scrollable"
          scrollButtons="off"
          value={getActiveItemIndex("TopTab")}
          //onChange={handleValChange}
          aria-label="more tab"
          className={tabClasses.tabs}
          classes={{
            indicator: tabClasses.indicatorColor,
          }}
        >
         <Tab  
           disableRipple
           value ={moreMenuItem.id}
           onClick={(event) => handleValChange(event, moreMenuItem.id,moreMenuItem.name) }
           icon = {
            <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
            { 
               React.createElement(getIcon(moreMenuItem.type))
            }
          </div>
         } 
         label={
           <div  className={tabClasses.label}>
             {moreMenuItem.name}
           </div>
         }
         {...a11yProps(moreMenuItem.name)} classes={{root : tabClasses.tab}}
         className = { clsx(activeItem?.id === moreMenuItem.id && tabClasses.selected )}
         />
       </Tabs></div> */}
       </div>
      }
   
        <div  style={{height: `calc(100% -  ${moreMenuHeight}px)`}} className={tabClasses.root}  onContextMenu={(event) => setContextParentMenu(event)}>  
          {/*contextMenuShow ? <ContextMenu mousePointer={{ mouseX: contextMenuXPos, mouseY: contextMenuYPos }} handleOutSideClick={handleOutSideClick} onHandleContextMenuClick={onHandleContextMenuClick} items={contextMenuItems} /> : null*/}
            <DragDropContext onDragEnd={handleDragEnd} >
            <Droppable droppableId="droppable" >
              {(droppableProvided, snapshot) => 
              <Tabs 
              {...droppableProvided.droppableProps}
              ref = {droppableProvided.innerRef}
              orientation="vertical"
              textColor='inherit'
              variant="scrollable"
              scrollButtons= {xsMatches ? "on" : "auto"}
              //value={activeItem ? activeItem.id : false}
              value={getActiveItemIndex("MenuTab")}
              //onChange={handleValChange}           
              aria-label="Vertical tabs example" 
              className={tabClasses.tabs}
              TabScrollButtonProps ={{
                classes: {
                  disabled: tabClasses.scrollBtn 
                }          
              }}
              classes={{
                indicator: tabClasses.indicatorColor
              }}
              >
                {false && droppableProvided.placeholder}
              {/* <TabList tabs={topTabs} setContextMenu={setContextMenu} /> */}
              {topTabs.map( (e:any,index:number) => (
            <Draggable key={e.id} draggableId={e.id} index={index} disableInteractiveElementBlocking={true} >
            {(draggableProvided) => (
            <Tab 
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
              disableRipple
              value={e.id}
              onClick={(event) => handleValChange(event, e.id,e.name) }
              onContextMenu={(event) => setContextMenu(event, e.id)}
              icon = {
              <div id={e.id} onClick={(event)=>handleClick(e.id)} className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
                { 
                  React.createElement(getIcon(e.type)) 
                }
              </div>
            } 
            label={
              <div  className={tabClasses.label}>
                {e.name}
              </div>
            }
            {...a11yProps(getCustomGroupID(e))} classes={{root : tabClasses.tab}}
                    className = { clsx(activeItem?.id === e.id && tabClasses.selected ) }
            />
            )}
            
            </Draggable>
          ))
          }
      
              {
              temporaryTab && (topTabs.findIndex(item => item.id === temporaryTab.id)<0) && 
              <Tab
              value={temporaryTab.id}
              onClick={(event) => {handleValChange(event, temporaryTab.id,temporaryTab.name)} }
              //value={getActiveItemIndex("TemporaryTab")}
              onContextMenu={(event) => setContextMenu(event, temporaryTab.id)}
              icon = {
                <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)} >
                  { React.createElement(getIcon(temporaryTab.type)) }
                </div>
              } 
              label={
                <div className={tabClasses.label}>
                  {temporaryTab.name }
                </div>
              }
              {...a11yProps(temporaryTab.name)} classes={{root : tabClasses.tab}}
              className = { clsx(activeItem?.id === temporaryTab.id && tabClasses.selected ) } 
              >
              </Tab>
              }
              </Tabs>
              }
            </Droppable>
          </DragDropContext>
        </div>
      </div>     
      {  
       props.bottomTabs &&  props.bottomTabs.length > 0 && 
      <div ref={bottomTabRef}  className={classes.root}>
        <div className={tabClasses.root}>
          <Tabs
            orientation="vertical"
            variant="fullWidth"
            scrollButtons='off'
            value={activeItem ? activeItem.id : false}
            onChange={handleValChange}
            aria-label="sidebar bottom options"
            className={tabClasses.tabs}
            classes={{
              indicator: tabClasses.indicatorColor
            }}
          >                
            {
                props.bottomTabs.map( e => {                              
                  return <Tab  
                    disableRipple
                    value={e.id}
                    icon = {
                    <div className={clsx(tabClasses.tabIcon)} >
                      {<GeometryIcon/>}
                    </div>
                  } 
                  label={
                <div className={tabClasses.label} >
                      {e.name}
                    </div>
                  }
                  {...a11yProps(e.name)} classes={{root : tabClasses.tab} }
                  />                   
                })
            }
          </Tabs>
        </div> 
      </div>
      }
  </>
  );
}

export default LeftBar;
