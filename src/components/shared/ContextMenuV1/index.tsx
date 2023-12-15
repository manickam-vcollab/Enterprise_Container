import React, { useState, useEffect, useCallback } from 'react';
//import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
//import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    ControlledMenu,
    MenuItem,
} from '@szhsin/react-menu';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';


interface IContextMenu {

    mousePointer:{mouseX:number,mouseY:number},
    items :contextMenu[],
    onHandleContextMenuClick:(id:string)=>void,
    handleOutSideClick:()=>void

}

type contextMenu = {

    id: string,
    text: string,
    icon: any,

}

 const useStyles = makeStyles<Theme>((theme) => ({
    controlledMenu: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
    icon: {
        color: theme.palette.text.primary,
    },
    menuItem: {
        "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
         }
    },
}));


const useContextMenu = (handleOutSideClick:any) => {


    const [showMenu, setShowMenu] = useState(true);

    const handleClick = () => {

        handleOutSideClick();

    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  
    return { showMenu };
 };


export default function ContextMenuV1(props:any) {

    const { menuProps , anchorPoint , toggleMenu , onHandleContextMenuClick, items, handleOutSideClick } = props;
    const { showMenu } = useContextMenu(handleOutSideClick);
    const menuClass = useStyles();

    return (
        <ControlledMenu id='step13' menuClassName={menuClass.controlledMenu}  {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(true)}>        
            {items.map((data: contextMenu) => (
                <MenuItem key={data.id} id={data.id} className={menuClass.menuItem} onClick={()=>onHandleContextMenuClick(data.id)}>
                    <ListItemIcon className='menuClass.icom'>
                        {data.icon}
                    </ListItemIcon>
                    <ListItemText primary={data.text} />

                </MenuItem>
            ))}
        </ControlledMenu>

    );
}