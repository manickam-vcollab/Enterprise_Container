import React, { useState, useEffect, useCallback } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


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


export default function ContextMenu(props:IContextMenu) {

    const { mousePointer , items , onHandleContextMenuClick , handleOutSideClick } = props;
    const { showMenu } = useContextMenu(handleOutSideClick);

    return (

        <div >
            <Menu
                keepMounted
                disablePortal = {false}
                open={showMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    { top: mousePointer.mouseY, left: mousePointer.mouseX }
                }
            >

                {items.map((data: contextMenu) => (
                    <MenuItem onClick={()=>onHandleContextMenuClick(data.id)}>
                        <ListItemIcon>
                            {data.icon}
                        </ListItemIcon>
                        <ListItemText primary={data.text} />

                    </MenuItem>
                ))}

            </Menu>
        </div>
    );
}