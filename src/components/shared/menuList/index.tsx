import React,{useRef} from 'react';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon  from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import clsx from 'clsx'

import style from './style';
import useListStyles from '../../shared/List/liststyle';

import {getIcon} from 'store/mainMenuSlice'
import useContainer from 'customHooks/useContainer'
import { refType } from 'react-xarrows';
import {SearchItem} from 'store/moreSlice'

interface IMenuList {

    
    searchResults: SearchItem[],
    menuItems : SearchItem[],
    handleClick:(e:any)=>void,
    icon: boolean,
    reference: any,
    reference2:any,
    reference3:any

  

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


export default function MenuList (props : IMenuList) {

    const { handleClick,searchResults,menuItems, icon,reference,reference2,reference3 } = props;
    

    const classes = style();
    const listClasses = useListStyles();
   
    const headerRef = useRef(null);
    const bodyHeadingRef = useRef(null);
    const useStyle = style(); 
    const [headerWidth, headerHeight] = useContainer(reference,[]);

    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(reference2,[]);
    const [bodyHeadingWidth, bodyHeadingHeight] = useContainer(reference3,[]);

   
    return(
        <List
        style={{height: containerHeight? containerHeight - (headerHeight+bodyHeadingHeight) :  containerHeight}}
        className={clsx(listClasses.Scrollbar)}
        >
           { (searchResults.length === 0 ? menuItems : searchResults).map((items:any,index:any)  => {
                    return items.display?<ListItem id={items.name.replace(/\s+/g, '')} key={index} disabled={items.disabled} button onClick={() => handleClick(items)}>
                  { icon ?
                    <ListItemIcon >
                      { React.createElement(getIcon(items.type))}
                    </ListItemIcon> : null
                  }
                    
                    <ListItemText classes={{primary:classes.listItemText}}>{
                        items.name
                    }</ListItemText>
                    </ListItem>
                    :null
                })
            }
        </List>

    )

    
}
