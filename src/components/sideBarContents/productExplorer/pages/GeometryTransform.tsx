import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';

import PickAndMoveIcon from '@material-ui/icons/ThreeDRotation';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MenuItem from '@material-ui/core/MenuItem'

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import * as viewerAPIProxy from "backend/viewerAPIProxy"; 
import { selectActiveViewerID, selectInteractionMode,setInteractionMode,setPickAndMoveEnabled,resetPickAndMove } from 'store/appSlice';
import { InteractionMode } from 'backend/ViewerManager';
import { selectApplyTo, setApplyTo , Selection, selectCheckedLeafNodes, selectUnCheckedLeafNodes, setCheckedNodesAsync} from 'store/sideBar/productTreeSlice';
import { batch } from 'react-redux';
import { useEffect } from 'react';
import globalThemes from 'theme/globalThemes';

export default function GeometryTransform(props:any){
    const dispatch = useAppDispatch();
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const interactionMode = useAppSelector(selectInteractionMode); 
    const isPickAndMoveEnabled = interactionMode === InteractionMode.PICK_AND_MOVE;
    const applyTo = useAppSelector(selectApplyTo);
    const checkedLeafNodes = useAppSelector(selectCheckedLeafNodes);
    const unCheckedLeafNodes = useAppSelector(selectUnCheckedLeafNodes);

    const customClasses = globalThemes();

    useEffect(() => {
        if(checkedLeafNodes.length > 0)
            dispatch(setApplyTo(Selection.SELECTED_PARTS))

        return ()=>{
            viewerAPIProxy.enablePickAndMove(false, activeViewerID);
            viewerAPIProxy.setInteractionMode(InteractionMode.DEFAULT, activeViewerID);;;
        }    
    },[])

    const onClickPickAndMove = () => {
        // Toggle "Pick & Move" mode
    const newPickAndMoveEnabled = !isPickAndMoveEnabled;
    dispatch(setPickAndMoveEnabled(newPickAndMoveEnabled));

    // Set the appropriate interaction mode
    const newInteractionMode = newPickAndMoveEnabled
      ? InteractionMode.PICK_AND_MOVE
      : InteractionMode.DEFAULT;
    dispatch(setInteractionMode(newInteractionMode));

    // Enable/disable "Pick & Move" using viewerAPIProxy (if needed)
    viewerAPIProxy.enablePickAndMove(newPickAndMoveEnabled, activeViewerID);
    viewerAPIProxy.setInteractionMode(newInteractionMode,activeViewerID);}

    const handleSelectChange = (e:React.ChangeEvent<{ value: Selection }>) => {
        dispatch(setApplyTo(e.target.value));
        let toCheck: any[] | null = null;
        let toUnCheck: any[] | null = null;
        switch(e.target.value) {
            case Selection.ALL_PARTS:
                toCheck = [...checkedLeafNodes, ...unCheckedLeafNodes];
                break;
            case Selection.SELECTED_PARTS:
                break;
            case Selection.UNSELECTED_PARTS:
                toCheck = [...unCheckedLeafNodes];
                toUnCheck = [...checkedLeafNodes];
                break;
            default:
                break;
        }
        batch(() => {
            toCheck?.map(node => {
                dispatch(setCheckedNodesAsync({
                    toCheck: true,
                    nodeId: node.id,
                    undoable: true
                }))
            })
            

            toUnCheck?.map(node => {
                dispatch(setCheckedNodesAsync({
                    toCheck: false,
                    nodeId: node.id,
                    undoable: true
                }))
            })
            
        })
      }

    const getAction = () => {
        return <SelectAction
        labelId="part-selection-label-id"
        id="part-selection-id"
        value={applyTo}
        onChange={handleSelectChange}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical:"bottom",
            horizontal:"left",
         },
         getContentAnchorEl: null
        }}
        >
          <MenuItem className={customClasses.selected} value={Selection.ALL_PARTS}>All Parts</MenuItem>
          <MenuItem className={customClasses.selected} value={Selection.SELECTED_PARTS}>Selected Parts</MenuItem>
          <MenuItem className={customClasses.selected} value={Selection.UNSELECTED_PARTS}>Unselected Parts</MenuItem>
        </SelectAction>
    }
    const handleReset = () => {
        dispatch(resetPickAndMove());

        // Reset the viewer using viewerAPIProxy (if needed)
        viewerAPIProxy.resetPickAndMove(activeViewerID);
        viewerAPIProxy.enablePickAndMove(false, activeViewerID);
    viewerAPIProxy.setInteractionMode(InteractionMode.DEFAULT, activeViewerID);
  
    }
    const getHeaderRightIcon = () => {
       return <div style={{textAlign:'center'}} onClick={ onClickPickAndMove } >
        <MuiToggleButton value='pick & move' selected={ isPickAndMoveEnabled } ><PickAndMoveIcon /></MuiToggleButton> 
        </div>
    }
    const getFooter = () => {
       return <div style={{textAlign:'center'}} onClick={ handleReset } >
       <MuiIconButton><RotateLeftIcon /></MuiIconButton> 
 </div>
    }
    return (<SideBarContainer
      headerRightIcon={ getHeaderRightIcon()}
      headerAction = {getAction()}
      headerContent={ <Title text={"Geometry Transform" } group="Geometry"/> }     
      footer = {getFooter()}
      />)
}