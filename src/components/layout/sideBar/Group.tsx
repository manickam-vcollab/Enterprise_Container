import React from 'react';
import {push} from 'connected-react-router/immutable';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import  ListItemText  from '@material-ui/core/ListItemText';
import  IconButton from '@material-ui/core/IconButton';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import {Routes} from '../../../routes';
import SideBarContainer from '../../layout/sideBar/sideBarContainer'

import { getIcon, MainMenu as MainMenuType, MainMenuItem, MainMenuItems, selectMainMenu, setActiveTab, togglePanel, updateMenuItem,selectActiveTab ,selectMainMenuItems} from '../../../store/mainMenuSlice';
import { Typography } from '@material-ui/core';
import GeometryIcon from 'components/icons/geometry';
import EditIcon from '@material-ui/icons/Edit';

import AddGroup from '../../sideBarContents/addGroup';
import { useState } from 'react';
import Title from './sideBarContainer/sideBarHeader/utilComponents/Title';

import style from './style';
import { tourListSlice } from 'store/tourSlice';

type GroupProps = {
    selectedItem: MainMenuItem,
}

const ListItem = withStyles((theme) =>({
  root: {
    color:theme.palette.text.secondary,

    "& .MuiListItemIcon-root": {
      color:theme.palette.text.secondary,
    },

    '&:hover': {
      color:theme.palette.text.primary,
      "& .MuiListItemIcon-root": {
        color:theme.palette.text.primary,
      }
    }
  },
  selected: {}
}))(MuiListItem);

export default function Group(props:GroupProps){

    const dispatch = useAppDispatch();
    const useStyle = style();
    const mainMenu = useAppSelector(selectMainMenuItems);
    const activeTab = useAppSelector(selectActiveTab);
    let activeItem:any = {};

    mainMenu.forEach((item)=>{

      if(item.id === activeTab?.id){
        activeItem = item;
      }
    })

    const handleListItemClick = (event:any,item:MainMenuItem) => {
      //dispatch(setActiveTab({menuItem:item}));
      dispatch(push(item.path));
      dispatch(tourListSlice.actions.setUpdateAction('#id8'))
      dispatch(tourListSlice.actions.setManualStepForward());
    }

    const getHeaderContent = () => {
      return <Title text={props.selectedItem?.name}></Title>;
    }

    const onclickEditIcon = () => {
      let menuItem = {
        ...props.selectedItem,
        isEditMode: true 
      }
      dispatch(updateMenuItem({menuItem}))
    }

    const getHeaderRightIcon = () => {
      return( 
        props.selectedItem.type === MainMenuItems.CUSTOM_GROUP ?
        <IconButton aria-label="search" onClick={() => {
          let menuItem = {
            ...props.selectedItem,
            isEditMode: !props.selectedItem.isEditMode  
          }
          dispatch(updateMenuItem({menuItem}))
          //dispatch(setActiveTab({menuItem}));
        }}>
          <div onClick={onclickEditIcon}>
          <EditIcon />
          </div>
        
        </IconButton>
        :null
        )
    }

    const getBody = () => {
      return (  
       <> 
      <List disablePadding >
      {
        activeItem?.children?.map((item:any) => 
         (item.display === true &&
         <ListItem 
          id={item.id}
          key={item.id}
          disabled={item.disabled}
          button
          onClick={(event) => handleListItemClick(event, item)}

        >
          <ListItemIcon>
            {React.createElement(getIcon(item.type))}
          </ListItemIcon>
          <ListItemText classes={{primary:useStyle.bodyContent}} primary={item.groupName ? item.groupName :item.name} />
        </ListItem>       
        )
        )  
      }    
      </List>
      </>
      );
    }

    return (
      activeItem?.isEditMode ?
      <AddGroup disabled={false} onClickEdit={() => {}} selectedGroup={props.selectedItem}/>
      :
      <SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon={ getHeaderRightIcon()}
      body ={ getBody() }
      />)
}