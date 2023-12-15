import { useContext, useState,useEffect } from 'react';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer'
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import BackIcon from '../shared/BackIcon'
import ToggleButton from '../components/ToogleButton'
import AxisPosition from '../components/AxisTriadPosition'

import {goBack} from 'connected-react-router/immutable';
import {selectWindowPositionList} from 'store/defaultSlice';
import {
    setShowAxis,selectShowAxis,
    setAppliedWindowPosition,
    selectAppliedWindowPosition,
    setWindowCurrentLocation} from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch,useAppSelector } from '../../../../store/storeHooks';

import useStyles from './axistriadstyle';
import { windowId } from '../components/AxisTriadWindow';
import { Layers, selectWindowSize, setEditMode, setWindowAnchor, setWindowPos ,selectWindowXY} from '../../../../store/windowMgrSlice';
import { ViewerContext } from '../../../App';

import {undoStack} from "../../../utils/undoStack";
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import { isConstructorDeclaration } from 'typescript';


export default function AxisTriad() {

    const classes = useStyles();
    const viewerContainerRef = useContext(ViewerContext);
    const listItems = useAppSelector(selectWindowPositionList);
    const appliedWindowPosition = useAppSelector(selectAppliedWindowPosition);
    const windowXYPosition = useAppSelector(state => selectWindowXY(state,windowId));
    const showAxis = useAppSelector(selectShowAxis);
    const windowSize = useAppSelector((state) => selectWindowSize(state,windowId))
    const dispatch = useAppDispatch();
    const [currentId, setCurrentId] = useState("-1");

    useEffect(()=>{
        dispatch(setWindowCurrentLocation(windowXYPosition));

    },[windowXYPosition])

    const onClickBackIcon = () =>{
            dispatch(goBack());
    }

    const getLeftIcon =()=>{

            return (
            <BackIcon onClick={onClickBackIcon}/>

            )
    }

    const getHeaderContent = () =>{

            return (

            <Title text={"Axis Triad"} group="Scene"/>
            )

    }
    let dialogProps:DialogueProps={
            dialogueRun: true,
            tourName: TOUR_MENU_NAMES.AXIS_TRIAD
    }

    const getHeaderRightIcon=()=> {
        const onHelpClick = (e:any) => {
                dispatch(dialogueState(dialogProps));
            }


            return (

                <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>

            )


    }

    const applySelcetedItem=(id:string,undoable?: boolean)=> {
        if(viewerContainerRef?.current) {
                let rect = viewerContainerRef.current.getBoundingClientRect();
                let uid = windowId;
                let w = rect.width;
                let h = rect.height;
                let winWidth = windowSize[0];
                let winHeight = windowSize[1];

            let oldValue : any;


            if(currentId === "-1")
                oldValue =  "2";

                else
                    oldValue = currentId

                setCurrentId(id);

            switch(id) {
                    case "windowPosition_top_left": 
                        dispatch(setWindowPos({uid,pos:[0,0]}))
                        dispatch(setWindowAnchor({uid,anchor:[0,0]}));
                        dispatch(setWindowCurrentLocation([0,0]));
                        break;
                    case "windowPosition_top_center":
                        dispatch(setWindowPos({ uid, pos: [w/2-winWidth/2, 0] }))
                        dispatch(setWindowAnchor({ uid, anchor: [0, 0] }));
                        dispatch(setWindowCurrentLocation([w/2-winWidth/2, 0]));
                        break;
                    case "windowPosition_top_right":
                        dispatch(setWindowPos({uid,pos:[w-winWidth,0]}))
                        dispatch(setWindowAnchor({uid,anchor:[winWidth,0]}));
                        dispatch(setWindowCurrentLocation([w-winWidth,0]));
                        break;
                    case "windowPosition_middle_left":
                        dispatch(setWindowPos({uid,pos:[0,h/2-winHeight/2]}))
                        dispatch(setWindowAnchor({uid,anchor:[0,0]}));
                        dispatch(setWindowCurrentLocation([0,h/2-winHeight/2]));
                        break;
                    case "windowPosition_middle_right":
                        dispatch(setWindowPos({uid,pos:[w-winWidth,h/2-winHeight/2]}))
                        dispatch(setWindowAnchor({uid,anchor:[winWidth,0]}));
                        dispatch(setWindowCurrentLocation([w-winWidth,h/2-winHeight/2]));
                        break;
                    case "windowPosition_bottom_left":
                        dispatch(setWindowPos({uid,pos:[0,h-winHeight]}))
                        dispatch(setWindowAnchor({uid,anchor:[0,winHeight]}));
                        dispatch(setWindowCurrentLocation([0,h-winHeight]));
                        break;
                    case "windowPosition_bottom_center":
                        dispatch(setWindowPos({ uid, pos: [w/2-winWidth/2,h-winHeight] }))
                        dispatch(setWindowAnchor({ uid, anchor: [0, winHeight] }));
                        dispatch(setWindowCurrentLocation([w/2-winWidth/2,h-winHeight]));
                        break;
                    case "windowPosition_bottom_right":
                        dispatch(setWindowPos({uid,pos:[w-winWidth,h-winHeight]}))
                        dispatch(setWindowAnchor({uid,anchor:[winWidth,winHeight]}));
                        dispatch(setWindowCurrentLocation([w-winWidth,h-winHeight]));
                        break;
                    case "windowPosition_custom":
                        dispatch(setEditMode({ uid, isEdit: true }));                 
                        break;
                    default:
                        break;
                }
                if(id !== "windowPosition_custom") {
                    dispatch(setEditMode({ uid, isEdit: false }));
                }
                dispatch(setAppliedWindowPosition(id));

            if(undoable){
                    undoStack.add(
                        {
                            undo: () => applySelcetedItem(oldValue),
                            redo: () => applySelcetedItem(id),
                        }
                    )
                }
            }

    }

    const handleToggle = (isOn:boolean, undoable?: boolean) => {
            dispatch(setShowAxis(isOn));

        if(undoable){
                undoStack.add(
                    {
                        undo: () => handleToggle(!isOn),
                        redo: () => handleToggle(isOn),
                    }
                )
            }
    }

    const getBody=()=> {

        return  (

                <div>
            <ToggleButton value={showAxis} onToggle = {handleToggle}></ToggleButton>
                    <div>

                        <AxisPosition items={listItems} onSelectMenuList={applySelcetedItem} selectedWindowPosition={appliedWindowPosition}></AxisPosition>

                    </div>

                </div>
            )

    }

        return (
            <SideBarContainer
            headerRightIcon = {getHeaderRightIcon()}
            headerContent={  getHeaderContent()}
            body ={ getBody() }
            />
        )

    }