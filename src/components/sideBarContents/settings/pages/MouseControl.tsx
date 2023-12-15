import {useState,useEffect} from 'react';

//buttons

import MuiButton from '@material-ui/core/Button';

//icons 

//import MuiIconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MuiAddIcon from '../../../../components/icons/add';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import DuplicateIcon from '../../../../components/icons/duplicate';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeletIcon from '@material-ui/icons/DeleteForeverOutlined';

import {Routes} from '../../../../routes/index'
import BackIcon from'../shared/BackIcon'

//components
import MuiIconButton from '../../../shared/headerIconButton/IconButton';
import MouseControl , {Source} from '../../../../components/shared/List/List';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import FooterOptionsContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import FooterOption from'../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import {undoStack} from '../../../../components/utils/undoStack';
import {goBack,push} from 'connected-react-router/immutable';

import {
    selectmenuItems,
    setSelectedItem,
    addItemToMenuItems,
    selectcopyItem,
    selectActiveMenuId,
    setcopyItem,
    pasteItem,
    applyMouseData,
    deleteItem,
    setMenuItemEditable,
    setMenuItemEditableText,
    setControlReadOnly
} from '../../../../store/sideBar/settings';

import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';

import useStyles from'./MouseControlStyle';
import globalThemes from 'theme/globalThemes';

export default function MouseControlPanel() {
 
const classes = useStyles();
const customClasses = globalThemes();
const dispatch = useAppDispatch();    

const isItemCopy = useAppSelector(selectcopyItem);

const menuItems = useAppSelector(selectmenuItems);

const activeUserId = useAppSelector(selectActiveMenuId);

let dialogProps:DialogueProps={
  dialogueRun: true,
  tourName: TOUR_MENU_NAMES.MOUSE_CONTROL
}
  
const getHeaderRightIcon=()=> {
  const onHelpClick = (e:any) => {
    dispatch(dialogueState(dialogProps));
    }


  return (

         <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>

  )


} 

const onhandleAdd= () => {

    dispatch(addItemToMenuItems({undoable:true}));
  
}

const getBody=()=> {

    const items = menuItems

    const onSelectMenuList = (
      id:string,
      isSelected:boolean,

    ) => {

      dispatch(setSelectedItem({id,isSelected}));

    };

    const onClickSetMenuListEditable =(id:string , edit:boolean) =>{

      dispatch(setMenuItemEditable({edit:edit,activeMenuId:id}));

    }
    const onClickUpdateListName=(id:string ,value:string)=>{
    
      dispatch(setMenuItemEditableText({text:value,activeMenuId:id}));
      
    };

    return (

      <MouseControl items={items} onSelectMenuList={onSelectMenuList} onClickSetListEditable={onClickSetMenuListEditable} onClickUpdateListName={onClickUpdateListName} onClickAdd={onhandleAdd}></MouseControl>

    )

}

const getFooter =() => {

const onHandleApply = (undoable:boolean , id:string) => {

  var newSelectedID:string  = id ;
  var lastSelectedID:string = '';

  menuItems.forEach((items:any)=>{

    if(items.applied === true ) {

      lastSelectedID = items.id;

    }

  })

   if(undoable) {

    undoStack.add({
      undo:()=>{onHandleApply(false , lastSelectedID )},
      redo:()=>{onHandleApply(false , newSelectedID )}
    })
   }

    dispatch(applyMouseData({applyID:id}));
}  

const onHandleEdit=(undoable:boolean) => {
   
  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS_EDIT));

  dispatch(setControlReadOnly(activeUserId));

  if(undoable) {

    undoStack.add({
      undo:()=>{onHandleEditUndo()},
      redo:()=>{onHandleEditRedo()}
    })
   }

}

const onHandleEditUndo =()=>{

  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS));

}

const onHandleEditRedo =()=>{

  const id = activeUserId; 
  const isSelected = true ;
  dispatch(setSelectedItem({id,isSelected}));
  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS_EDIT));

}

const onHandlePaste =() => {

    menuItems.find((item)=> {

      if(item.selected === true) {

        dispatch(pasteItem({activeUserID:activeUserId,id:item.id,undoable:true}));

      }
  })


  // else {

  //   dispatch(setcopyItem({isItemCopy:false , undoable:true}));
  // }

  
}

const onClickDelete= ()=> {

  menuItems.find((item)=> {

    if(item.selected === true) {

      dispatch(deleteItem({id:item.id,undoable:true}));

    }
}) 

   
}

 return (

  <div>

  {menuItems.map((item, index)=>{

    if(item.selected === true) {

       return (
          
           <div key={index}>
           <div style={{paddingTop:"15px",paddingBottom:"5px"}}><MuiButton className={customClasses.Muibtn} variant="contained" color="primary" 
           
           onClick={()=> 

            {
              var selectedID:string = '';

              menuItems.forEach((items:any)=> {

                if(items.selected === true) {

                  selectedID = item.id;

                }

              })
              onHandleApply(true,selectedID);
            }
            
            }>Apply</MuiButton></div>
          <FooterOptionsContainer>

          {menuItems.map((item, iindex)=>{

              if(item.type === Source.USER && item.selected === true) {
                    
                return (

                  <FooterOption key={iindex} label={"Edit"} active={false} icon={MuiEditIcon} onClickUpdate={() => onHandleEdit(true)}></FooterOption>
                
                  )
              }
              else if(item.type === Source.SYSTEM && item.selected === true){

                return (
                  <FooterOption key={iindex} label={"View"} active={false} icon={VisibilityIcon} onClickUpdate={() => onHandleEdit(true)}></FooterOption>

                )
              }
              else
                return null;
          })}

            <FooterOption label={"Duplicate"} active={false}  onClickUpdate={() => onHandlePaste()}
            icon={
                    DuplicateIcon
            }></FooterOption>
      
            <FooterOption label={"Delete"} active={menuItems.find((item)=>{
      
            if(item.type === Source.USER) {

              return(
                item.selected === true
              )
            }

    }) ?  false: true }
            icon={
            MuiDeletIcon 
            } onClickUpdate={() => onClickDelete()}></FooterOption>
        </FooterOptionsContainer>

           </div>

       )

    }       
  })}
</div>)

}

return (
          <>
           <SideBarContainer
            headerRightIcon = {getHeaderRightIcon()}
            headerContent={ <Title text={"Mouse Controls"} group="Application Settings"/> }
            body ={ getBody() }
            footer = { getFooter() }
          />
          </>

)

}
