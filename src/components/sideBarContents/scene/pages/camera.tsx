import { useState } from "react";
import MuiIconButton from '@material-ui/core/IconButton';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MuiTypography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiVisibilityIcon from '@material-ui/icons/Visibility';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import { goBack, push } from 'connected-react-router/immutable';

import MuiAddIcon from '../../../../components/icons/add';
import DuplicateIcon from '../../../icons/duplicate';
import BackButton from '../../../icons/back';

import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import { Routes } from '../../../../routes/index'
import styles from '../style';
import useListStyles from "../../../shared/List/liststyle";

import { setProjectionAsync, addCameraView, setCameraInfoAsync, selectUserView, selectAppliedCameraViewID, deleteCameraView, pasteCameraView } from '../../../../store/sideBar/sceneSlice';
import { CameraMode, selectDefaultSceneData } from 'store/defaultSlice';
import { selectActiveViewerID } from 'store/appSlice';

// HeaderIconComponent

import HeaderIconComponent from '../../../shared/headerIconButton/IconButton';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import globalThemes from 'theme/globalThemes';

export default function Camera() {

    const classes = styles();
    const customClasses = globalThemes();
    const listClasses = useListStyles();
    const dispatch = useAppDispatch();
    const [copy, setCopy] = useState(-1);
    const [openDelete, setOpenDelete] = useState(false)

    const projection = useAppSelector(state => state.scene.activeCamera.cameraMode);
    const activeViewerId = useAppSelector(selectActiveViewerID);
    const sceneDefaultData = useAppSelector(selectDefaultSceneData);
    const userDefinedView = useAppSelector(selectUserView);
    const appliedCameraViewID = useAppSelector(selectAppliedCameraViewID);

    let SystemView: any[] = [];
    let UserDefinedView: any[] = [];

    SystemView = sceneDefaultData[0].cameraViews.filter(item => item.id === appliedCameraViewID);
    UserDefinedView = userDefinedView.filter(item => item.id === appliedCameraViewID);

    const onHandleCamera = (id: string, isUserDefined: boolean) => {
        dispatch(setCameraInfoAsync({ id, undoable: true, isUserDefined }))
    }

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const onHandleAdd = () => {
        dispatch(addCameraView());
    }

    const onHandleDuplicate = () => {

        const data = SystemView.length > 0 ? SystemView.find(item => item.id === appliedCameraViewID) : userDefinedView.find(item => item.id === appliedCameraViewID)
        if (data)
        dispatch(pasteCameraView({ data, undoable: true }))
        // setCameraList(newCameraList);
        //setCopied(newCopy);
    };

    const onHandleDelete = () => {
        setOpenDelete(false);
        const toDeleteCameraView = userDefinedView.find((item:any) => item.id === appliedCameraViewID)
        if(toDeleteCameraView)
        dispatch(deleteCameraView({ toDeleteItem: toDeleteCameraView, undoable: true }))
    }

    const onHandleViewMode = (e: any) => {
        const value = String(e.currentTarget.value);
        dispatch(setProjectionAsync({ value, undoable: true }))
    }

    const onHandleEdit = () => {
        dispatch(push(Routes.SCENE_CAMERA_EDIT));
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton /></MuiIconButton>
        )
    }

    let dialogProps: DialogueProps = {
        dialogueRun: true,
        tourName: TOUR_MENU_NAMES.CAMERA
    }
    const getHeaderRightIcon = () => {
        const onHelpClick = (e: any) => {
            dispatch(dialogueState(dialogProps));
        }


        return (

            <div>
                <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
            </div>
        )
    }

    const getAction = () => {
        return (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <MuiToggleButtonGroup
                    // style={{marginBottom:"20px",}}
                    size="small"
                    value={projection === CameraMode.PERSPECTIVE ? "PERSPECTIVE" : "ORTHOGRAPHIC"}
                    exclusive
                    onChange={onHandleViewMode}
                    aria-label="text alignment"
                >
                    <MuiToggleButton value={'PERSPECTIVE'} aria-label="left aligned">
                        <div className={classes.cameraBodyContent} style={{ textTransform: 'none' }} >Perspective</div>
                    </MuiToggleButton>
                    <MuiToggleButton value={"ORTHOGRAPHIC"} aria-label="left aligned">
                        <div className={classes.cameraBodyContent} style={{ textTransform: 'none' }}>Orthographic</div>
                    </MuiToggleButton>
                </MuiToggleButtonGroup>
            </div>
        )
    }

    const getBody = () => {
        return (
            <div className={listClasses.Scrollbar}>

                <div style={{ marginTop: "20px"}}>

                    <div className={classes.cameraBodyHeading} style={{ textTransform: "none", textAlign: "left" ,marginLeft:'10px' }}>
                        System Provided
                    </div>

                    <div>
                        <MuiMenuList>
                            {
                                sceneDefaultData[0].cameraViews.map(item =>
                                    <MuiMenuItem key={'divParent_' + item.id} onClick={() => onHandleCamera(item.id, false)}>
                                        <MuiTypography classes={(appliedCameraViewID === item.id) ? { root: customClasses.selected} : { root: classes.cameraBodyContent }}>
                                            {item.title}
                                        </MuiTypography>
                                        {appliedCameraViewID === item.id ?
                                            <MuiListItemSecondaryAction>
                                                <CheckIcon />
                                            </MuiListItemSecondaryAction> : null}
                                    </MuiMenuItem>
                                )}
                        </MuiMenuList>

                        {

                            <div>

                                <MuiListItem >

                                    <MuiListItemText className={classes.cameraBodyHeading} primary="User Provided" ></MuiListItemText>
                                    <MuiIconButton className={classes.cameraBodyHeading} disabled={false} onClick={onHandleAdd} >
                                        <MuiAddIcon />
                                    </MuiIconButton>


                                </MuiListItem>
                                <div style={{ marginTop: -10 }}>
                                    <MuiMenuList >
                                        {
                                            userDefinedView.map(item =>
                                                <MuiMenuItem key={'divParent_' + item.id} onClick={() => onHandleCamera(item.id, true)}>
                                                    <MuiTypography classes={(appliedCameraViewID === item.id) ? { root: classes.cameraBodyContentSelected } : { root: classes.cameraBodyContent }}>
                                                        {item.title}
                                                    </MuiTypography>
                                                    {appliedCameraViewID === item.id ?
                                                        <MuiListItemSecondaryAction>
                                                            <CheckIcon />
                                                        </MuiListItemSecondaryAction> : null}
                                                </MuiMenuItem>
                                            )}
                                    </MuiMenuList>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        )
    }

    const getFooter = () => {
        // const activeItem = cameraList.filter(item => item.id === active) 
        return (
            <div>
                <OptionContainer>
                    <Option label={SystemView.length > 0 ? "View" : userDefinedView.length > 0 ? "Edit" : "View"}
                        id="editIcon"
                        active={appliedCameraViewID === '' ? true : false}
                        onClickUpdate={onHandleEdit}
                        icon={SystemView.length > 0 ? MuiVisibilityIcon : userDefinedView.length > 0 ? MuiEditIcon : MuiVisibilityIcon}

                    />
                    <Option
                        id="duplicateIcon"
                        label="Duplicate"
                        active={appliedCameraViewID === '' ? true : false}
                        icon={DuplicateIcon}
                        onClickUpdate={onHandleDuplicate}
                    />

                    <Option
                        id="deleteIcon"
                        label="Delete"
                        active={appliedCameraViewID === '' || SystemView.length > 0 ? true : false}
                        icon={MuiDeleteForeverOutlinedIcon}
                        onClickUpdate={onHandleDelete} />

                </OptionContainer>
            </div>
        )
    }

    return (
        <SideBarContainer
            headerContent={<Title text={"Camera"} group="Scene" />}
            headerAction={getAction()}
            headerRightIcon={getHeaderRightIcon()}
            body={getBody()}
            footer={getFooter()}
        />

    )
}