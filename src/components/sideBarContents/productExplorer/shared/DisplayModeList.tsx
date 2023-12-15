import React from 'react';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { IconButton } from '@material-ui/core';
import BoundingBoxIcon from "../../../icons/boundingBox";
import HiddenLineIcon from "../../../icons/hiddenLine";
import PointIcon from "../../../icons/point";
import ShadedIcon from "../../../icons/shaded";
import ShadedMeshIcon from "../../../icons/shadedMesh";
import TransparentIcon from "../../../icons/transparent";
import WireframeIcon from "../../../icons/wireframe";
import { makeStyles ,withStyles } from '@material-ui/core/styles';

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import DownloadStatusIcon from "../DisplayModes/DownloadStatusIcon";
import { tourListSlice } from 'store/tourSlice';

const ListItem = withStyles((theme) =>({
  root: {
    color:theme.palette.text.secondary,
    paddingTop:'8px',
    paddingBottom:'8px',

    "& .MuiIconButton-root":{
      color:theme.palette.text.secondary,
      padding:0,
    },

    "& .MuiListItemIcon-root": {
      color:theme.palette.text.secondary,

    },

    '&.Mui-selected':{
      backgroundColor: `${theme.palette.action.selected} !important`,
      color:`${theme.palette.accent.primaryText}`,
      // backgroundColor:"transparent !important",
      "& .MuiListItemIcon-root": {
        color:theme.palette.accent.primaryText,
      },

      "& .MuiIconButton-root":{
        color:theme.palette.accent.primaryText,
      },
      '&:hover':{
        color:theme.palette.accent.primaryText,
      },
    },

    '&:hover': {
      color:theme.palette.text.primary,
      "& .MuiListItemIcon-root": {
        color:theme.palette.text.primary,
      },

      "& .MuiIconButton-root":{
        color:theme.palette.text.primary,
      },
    }
  },
  selected: {}
}))(MuiListItem);

const getIcon = (name: String) => {
  switch (name) {
    case "Bounding Box":
      return <BoundingBoxIcon />
    case "Point":
      return <PointIcon />
    case "Hidden Line":
      return <HiddenLineIcon />
    case "Shaded":
      return <ShadedIcon />
    case "Shaded Mesh":
      return <ShadedMeshIcon />
    case "Transparent":
      return <TransparentIcon />
    case "Wireframe":
      return <WireframeIcon />

    default:
      break;
  }
};


interface listItemData {

  listItem:any[],
  disabled:boolean,
  panelIndex:number,
  onSelectMenu:(menuIndex:number,panelIndex:number,itemSize:number)=>void

}

export default function DisplayModeList (props:listItemData) {

  const {listItem,disabled,onSelectMenu,panelIndex} = props;
  const dispatch = useAppDispatch();
    return (
    
      <div>
              <List id='step16' >
              {listItem?.menuData?.map((item:any, menuIndex:number) => (
                <ListItem  disabled={props.disabled} key={menuIndex} dense button  role={undefined}
                selected = {item.selected}
                id = { "displaymodes_" + item.title }
                onClick={() => onSelectMenu(menuIndex, panelIndex,item.size)}>
                {/* <IconButton edge="end" style={{backgroundColor:'transparent',marginRight:'15px'}}> */}
                <div >{getIcon(item.title)}</div>
                  {/* </IconButton> */}
                <ListItemText id={item.title} primary={item.title} >
                  </ListItemText>
                  <IconButton edge="end" style={{backgroundColor:'transparent',marginRight:'15px'}}>
                    <DownloadStatusIcon status = {item.status} />
                  </IconButton>
                </ListItem>
              ))}
              </List>

      </div>
 
    )
 }



