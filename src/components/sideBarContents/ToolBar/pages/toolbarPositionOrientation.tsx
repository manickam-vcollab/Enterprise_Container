import { useContext, useEffect, useState } from 'react';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer'
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import ToolbarPosition from '../components/ToolbarPositionOrientation'
import {push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"
import MuiMenuItem from "@material-ui/core/MenuItem";
import {goBack} from 'connected-react-router/immutable';
import SelectAction from "components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";

import MuiButton from "@material-ui/core/Button";

import {selectAxisTriodList,selectShowAxis,setApplyItem, setShowAxis } from '../../../../store/sideBar/sceneSlice';
import { selectToolbarPositionList, selectToolbarOrientationList,toolBarList,updateAppliedOrientation,updateAppliedPosition,updatePositionListItems,updateOrientationListItems,selectEditableNodeId,setApplyPositionItem,setApplyOrientationItem,selectCheckedNodeForALLToolType,setEditableNodeId,defaultList,combinedDataList } from 'store/sideBar/ToolBar/toolBarSlice';
import { useAppDispatch,useAppSelector } from '../../../../store/storeHooks';
import { Layers, selectWindowSize, setEditMode, setWindowAnchor, setWindowPos,setWindowSize } from '../../../../store/windowMgrSlice';
import { ViewerContext } from '../../../App';

import {undoStack} from "../../../utils/undoStack";
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';

export default function ToolbarPos() {
// const classes = useStyles(); 
const viewerContainerRef = useContext(ViewerContext); 
const positionListItems = useAppSelector(selectToolbarPositionList);
const orientationListItems = useAppSelector(selectToolbarOrientationList);
const editableNodeId: string = useAppSelector(selectEditableNodeId);
//const showAxis = useAppSelector(selectShowAxis);
const checkedElements = useAppSelector(selectCheckedNodeForALLToolType)
const dispatch = useAppDispatch();
const toolBarData = useAppSelector(toolBarList);
const defaultsToolBarData = useAppSelector(defaultList)
const combinedToolbarList = useAppSelector(combinedDataList)
const [currentId, setCurrentId] = useState("-1");

const onClickBackIcon = () =>{
    dispatch(goBack());
} 
const data = useAppSelector((state) => state.toolBar.data);
  const [appliedOrientation, setAppliedOrientation] =
    useState<string | null>(null);
  const [appliedPosition, setAppliedPosition] = useState<string | null>(null);
 const appliedOrientationId = toolBarData[editableNodeId]?.appliedOrientation;

 const appliedPositionId = toolBarData[editableNodeId]?.appliedPosition;
const toSelectList = Object.values(combinedToolbarList).map((item) => ({
    id: item.id,
    title: item.title,
  }));
useEffect(() => {
    // Update the orientationListItems
    const updatedOrientationList = orientationListItems.map((orientation) => {
      if (orientation.id === appliedOrientationId) {
        return { ...orientation, applied: true };
      }
      return { ...orientation, applied: false };
    });

    // Check if the updated orientation list is different from the current state value
    if (JSON.stringify(updatedOrientationList) !== JSON.stringify(orientationListItems)) {
      // Dispatch an action to update the orientationListItems in the Redux store
      dispatch(updateOrientationListItems(updatedOrientationList));
    }
  }, [appliedOrientationId, orientationListItems, dispatch]);
  

  useEffect(() => {
    // Update the orientationListItems
    const updatedPositionList = positionListItems.map((position) => {
      if (position.id === appliedPositionId) {
        return { ...position, applied: true };
      }
      return { ...position, applied: false };
    });

    // Check if the updated orientation list is different from the current state value
    if (JSON.stringify(updatedPositionList) !== JSON.stringify(positionListItems)) {
      // Dispatch an action to update the orientationListItems in the Redux store
      dispatch(updatePositionListItems(updatedPositionList));
    }
  }, [appliedPositionId, positionListItems, dispatch]);
   
const getHeaderContent = () => {
    return <Title text={"Transform Toolbar"} group="Toolbar" />;
  };



let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.AXIS_TRIAD
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
        dispatch(push(Routes.TOOLBARLIST))
    //   dispatch(dialogueState(dialogProps));
      }
  
  
    return (
  
           <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} 
                onClick={onHelpClick}
                ></HeaderIconButton>
  
    )
  
  
  } 
  
const applySelcetedPositionItem=(id:string,isSelected:boolean, undoable?: boolean)=>{
    if(viewerContainerRef?.current) {
        let rect = viewerContainerRef.current.getBoundingClientRect();
        // let uid = windowId;
        let uid = editableNodeId
        let w = rect.width;
        let h = rect.height;

        
        // let boxsizeWiidth = document.getElementById(`centerBox-${uid}`)?.clientWidth
        // let boxsizeHeight = document.getElementById(`centerBox-${uid}`)?.clientHeight
        let boxsizeWiidth = document.getElementById(uid)?.clientWidth
        let boxsizeHeight = document.getElementById(uid)?.clientHeight

        let winWidth = boxsizeWiidth
        let winHeight = boxsizeHeight
        let barwidth = 0        
        // dispatch(setApplyPositionItem(id));
        

        if (isSelected && id !== appliedPositionId) {
            dispatch(updateAppliedPosition({ toolBarId: editableNodeId, id: id }));
          }

        let oldValue : any;
        if(currentId === "-1")
            oldValue =  "2";
        
        else
            oldValue = currentId
       
        setCurrentId(id);
        switch(id) {
            case "1":
                dispatch(setWindowPos({uid,pos:[w-winWidth,0]}))
                dispatch(setWindowAnchor({uid,anchor:[winWidth,0]}));
                break;
            case "2":
                dispatch(setWindowPos({uid,pos:[0,0]}))
                dispatch(setWindowAnchor({uid,anchor:[0,0]}));
                break;
            case "3":
                dispatch(setWindowPos({uid,pos:[w/2-winWidth/2,0]}))
                dispatch(setWindowAnchor({uid,anchor:[0, 0]}));
                break;
            case "4":
                dispatch(setWindowPos({uid,pos:[w/2-winWidth/2,h-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[0, winHeight]}));
                break;
            case "5":
                dispatch(setWindowPos({uid,pos:[w-winWidth,h/2-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[winWidth,0]}));
                break;
            case "6":
                dispatch(setWindowPos({uid,pos:[0,h/2-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[0,0]}));
                break;
            case "7":
                dispatch(setWindowPos({uid,pos:[0,h-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[0,winHeight]}));
                break;
            case "8":
                dispatch(setWindowPos({uid,pos:[w-winWidth,h-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[winWidth,winHeight]}));
                break;
            case "9":
                dispatch(setEditMode({uid, isEdit:true }));
                break;
            default:
                break;
        }
    }

}


useEffect(()=>{
    let rect = viewerContainerRef?.current?.getBoundingClientRect();
    const width = document.getElementById(editableNodeId)?.clientWidth
    const height = document.getElementById(editableNodeId)?.clientHeight
    const toolbarElement = document.getElementById(editableNodeId)?.getBoundingClientRect()
    if (toolbarElement && rect && width && height) {
      let w = rect.width;
      let h = rect.height;
      if (toolbarElement.right > rect.right) {
        let xpos = w - width
        dispatch(setWindowPos({uid:editableNodeId,pos:[xpos,toolbarElement?.top]}))
      } else if (toolbarElement.bottom > rect.bottom) {
        let ypos = h- height
        dispatch(setWindowPos({uid:editableNodeId,pos:[toolbarElement?.left-375,ypos]}))
      }
      applySelcetedPositionItem(toolBarData[editableNodeId].appliedPosition,true)
    }
},[toolBarData[editableNodeId].appliedOrientation])
const applySelcetedOrientationItem=(id:string,isSelected:boolean, undoable?: boolean)=>{
    if(viewerContainerRef?.current) {
        let rect = viewerContainerRef.current.getBoundingClientRect();
        // let uid = windowId;
         if(editableNodeId) {
            const toolbarDirection = toolBarData[editableNodeId].appliedOrientation
            // const toolbarElement = document.getElementById(editableNodeId)?.getBoundingClientRect()
            const width = document.getElementById(editableNodeId)?.clientWidth
            const height = document.getElementById(editableNodeId)?.clientHeight
            if (width && height) {
                if (toolbarDirection !== '2' && id ==='2') {
                    // console.log('vertical')
                    dispatch(setWindowSize({uid:editableNodeId,size:[height,width]}));
                    dispatch(updateAppliedOrientation({ toolBarId: editableNodeId, id: id }));
                } else if (toolbarDirection === '2' && (id==='1' || id==='3')) {
                    dispatch(setWindowSize({uid:editableNodeId,size:[height,width]}));
                    dispatch(updateAppliedOrientation({ toolBarId: editableNodeId, id: id }));
                   
                }
            }
        
    }


    }
    
   
}

const handleToggle = (isOn:boolean, undoable?: boolean) => {
   // dispatch(setShowAxis(isOn));

    if(undoable){
        undoStack.add(
            {
              undo: () => handleToggle(!isOn),
              redo: () => handleToggle(isOn),
            }
        )
    }
};
  // const selectedToolBar = useAppSelector(
  //   (state) => state.toolBar.data[editableNodeId]
  // );
  const selectedToolBar = combinedToolbarList[editableNodeId]
  const [selectedValue, setSelectedValue] = useState(selectedToolBar?.id || toSelectList[0]?.id);

  const onHandleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    dispatch(setEditableNodeId(selectedValue));
  };

  const getAction = () => {
    return (
      <SelectAction
        labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
        value={selectedValue}
        onChange={(e: any) => onHandleSelect(e.target.value)}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {toSelectList.map((item) => (
          <MuiMenuItem key={item.id} value={item.id}>
            {item.title}
          </MuiMenuItem>
        ))}
      </SelectAction>
    );
  };

const getBody = () => {
    return (
      <div>
        <div>
          <ToolbarPosition
            items={positionListItems}
            title="Position"
            onSelectMenuList={applySelcetedPositionItem}
            disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) || defaultsToolBarData.hasOwnProperty(selectedValue) ? true : false}
          ></ToolbarPosition>

          <ToolbarPosition
            items={orientationListItems}
            onSelectMenuList={applySelcetedOrientationItem}
            title="Orientation"
            disabled={defaultsToolBarData.hasOwnProperty(editableNodeId[0]) || defaultsToolBarData.hasOwnProperty(selectedValue) ? true : false}
            // onChange={onHandleApply}
          ></ToolbarPosition>
        </div>
      </div>
    );
  };



  return (
    <SideBarContainer
      headerRightIcon={getHeaderRightIcon()}
      headerContent={getHeaderContent()}
      headerAction={getAction()}
      body={getBody()}
    />
  );
}