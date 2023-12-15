import {useState} from "react";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CenterFocusWeakSharpIcon from '@material-ui/icons/CenterFocusWeakSharp';
import IconButton  from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid"
import ToolTip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";

import AddTagDialog from "./Dialogs/AddTagDialog";
import AddTagNoModal from "./Dialogs/AddTagNoModal";
import VisibilityOptions from './VisibilityOptions'
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import {selectActiveViewerID} from '../../../../store/appSlice';
import {groupSelectedNodes,focusSelectedNodes, updatePrevSearches} from '../../../../store/sideBar/productTreeSlice'
import { makeStyles,createStyles } from "@material-ui/core/styles";
import { tourListSlice } from "store/tourSlice";
import { fetchCameraMatrix, selectActiveCameraView, updateState } from "../../../../store/sideBar/sceneSlice";
import { getCameraInfo,
    getCameraStdViews,
    setCameraInfo,
    setCameraProjection, } from "backend/viewerAPIProxy";

const useStyles = makeStyles(theme => createStyles({
    iconText: {
        height:'50px'
    }
}))


function FooterOptions(props:any) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const activeViewerId = useAppSelector(selectActiveViewerID)
    const activeCameraView = useAppSelector(selectActiveCameraView);
    const handleDialogOpen = () => {
        setShowDialog(true);
        dispatch(tourListSlice.actions.setManualStepForward());
    }
    const handleDialogClose = () => {
        setShowDialog(false);
        dispatch(tourListSlice.actions.setManualStepForward());
    }  
    const handleDialogSave = (name:string) => {
        dispatch(groupSelectedNodes({tagName:name}))
      
        setShowDialog(false);
    }
    const handleFocus = () => {
        dispatch(focusSelectedNodes({viewerId:activeViewerId}));
        dispatch(tourListSlice.actions.setManualStepForward());
        const newCameraView = dispatch(fetchCameraMatrix())
        newCameraView.then((item)=>{dispatch(updateState({activeCameraView:item.payload}))})
    }
    const visibilityCheck = () => {
     dispatch(tourListSlice.actions.setManualStepForward());
    }
    return (

        showDialog ?
        <AddTagNoModal message=" Enter a tag name to the selected Nodes. 
        This tag name can be used in search to filter nodes" 
        onAdd = {handleDialogSave}
        onCancel = {handleDialogClose}
        />
        :
        <OptionContainer>
            <Option id='step22' label="Visibility" active={props.disabled} onClickUpdate={visibilityCheck} icon={VisibilityOptions} />
            <Option id='step25' label="Label Parts" active={props.disabled} icon = {LocalOfferIcon} onClickUpdate={handleDialogOpen} />
                
            <Option id='step27' label = "Fit To Screen" active={props.disabled} icon = {CenterFocusWeakSharpIcon} onClickUpdate={handleFocus} />
                        
            <AddTagDialog open={showDialog} handleSave={handleDialogSave} handleClose={handleDialogClose}></AddTagDialog>
        </OptionContainer>
        
    )
}

export default FooterOptions
