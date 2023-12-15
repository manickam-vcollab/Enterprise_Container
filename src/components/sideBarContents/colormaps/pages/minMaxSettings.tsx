import { useState ,useEffect } from 'react';
import clsx from 'clsx';
import MuiIconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MuiButton from "@material-ui/core/Button";
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import OptionContainer from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer";
import BackButton from '../../../icons/back';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import { colormapElements, setPaletteRange,setResultMinMax } from '../../../../store/sideBar/colormapSlice';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import globalThemes from 'theme/globalThemes';
import style from './style';
import { selectActiveViewerID } from '../../../../store/appSlice';
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';


export default function Variable() {

  const customClasses = globalThemes();
  const classes = style();
  const dispatch = useAppDispatch();
  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const appliedColorMapId = useAppSelector(state => state.colormap.appliedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId);
  const colormapNameList = useAppSelector(colormapElements);
  const valueRange = useAppSelector(state => state.colormap.resultMinMax);
  const paletteRange = useAppSelector(state => state.colormap.colormapTree.data[activeColormapId].paletteRange);
  const [paletteRangeMin, setpaletteRangeMin]:any = useState();
  const [paletteRangeMax, setpaletteRangeMax]:any = useState();
  const activeViewerID = useAppSelector(selectActiveViewerID);

  useEffect(()=>{
    setpaletteRangeMin(paletteRange[0]);
    setpaletteRangeMax(paletteRange[1]);
  },[valueRange,paletteRange])

  // set activeColormapId 
  const onHandleSelect = (id: string) => {
    setActiveColormapId(id)
  }

  // onchange input data and validation for max and min (paletteRange)
  const onChangePaletteRange = (value: any, inputType: string) => {
    let currentData = Number(value);
    let paletteMaxRange = Number(paletteRangeMax);
    if (inputType === "min") {
        if(value !== '') {
          if(currentData <= paletteMaxRange) {
            setpaletteRangeMin(value);
          }else{
            setpaletteRangeMin(paletteRangeMax);
          }
        }else{
          setpaletteRangeMin(value);
        }
    } else if (inputType === "max") {
      setpaletteRangeMax(value);
    }

  }

  // Reset paletteRange data (min & max)
  const onHandlePaletteReset = (inputType: string) => {
    if (inputType === "min") {
      setpaletteRangeMin(valueRange[0]);
    } else if (inputType === "max") {
      setpaletteRangeMax(valueRange[1]);
    }
  }

  // update redux data and sending data to viewer
  const onHandleApply =() =>{

    let values:[number,number] = [Number(paletteRangeMin),Number(paletteRangeMax)];
    dispatch(setPaletteRange({ values:values , colorMapId: activeColormapId }));
    if (appliedColorMapId === activeColormapId) {
      dispatch(setResultMinMax({minmax:values}))
      viewerAPIProxy.setValueMinMax(values, activeViewerID);
    }

  }

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}><BackButton /></MuiIconButton>
    );
  }

  const getAction = () => {
    const parentNodes = colormapNameList.filter(item => item.children?.length !== 0)

    return (
      <SelectAction
        labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
        value={activeColormapId}
        onChange={(e: any) => { if (e.target.value) onHandleSelect(e.target.value) }}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null
        }}
      >
        <MuiListSubHeader key={parentNodes[0].id}>{parentNodes[0].name}</MuiListSubHeader>
        {
          colormapNameList.map((element: any) => {
            return (
              element.pid === parentNodes[0].id
                ?
                <MuiMenuItem className={customClasses.selected} key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                null
            )
          })
        }
      </SelectAction>
    )
  }

  let dialogProps: DialogueProps = {
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.VALUE_SETTINGS
  }

  const getHeaderRightIcon = () => {
    const onHelpClick = (e: any) => {
      dispatch(dialogueState(dialogProps));
    }
    return (
      <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
    )
  }

  const getBody = () => {

    return (
      <div style={{ height: "100%" }}>
        <div id='valueRange_BoxContainer' style={{ position: 'relative', top: '10px', display: 'flex', justifyContent: 'center', width: '100%', }}>
          <div id='valueRange' style={{ border: '1px solid black', width: '98%', alignSelf: 'center', borderRadius: '5px' }}>
            <span id='boxTitle' style={{ marginLeft: '5px' }}>Value Range</span>
            <Grid container spacing={3} style={{ marginTop: '10px', paddingBottom: '15px' }}>

              <Grid item xs={6}>
                <span style={{ marginLeft: '5px' }}>Min</span>
                <input disabled className={clsx(classes.inputEquation, classes.sidebarText)} style={{ marginTop: "5px", marginLeft: '5px', width: '100px', height: '30px' }}
                  value={valueRange[0]}
                />
              </Grid>
              <Grid item xs={6}>
                <span style={{ marginLeft: '5px' }}>Max</span>
                <input disabled className={clsx(classes.inputEquation, classes.sidebarText)} style={{ marginTop: "5px", marginLeft: '5px', width: '100px', height: '30px' }}
                  value={valueRange[1]}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div id='paletteRange_BoxContainer' style={{ position: 'relative', top: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div id='paletteRange' style={{ border: '1px solid black', width: '98%', alignSelf: 'center', borderRadius: '5px' }}>
            <span id='boxTitle' style={{ marginLeft: '5px' }}>User Range</span>
            <Grid container spacing={3} style={{ marginTop: '10px', paddingBottom: '15px' }}>

              <Grid item xs={6}>
                <span style={{ marginLeft: '5px' }}>Min</span>
                {/* inputProps={{style: { textAlign: 'center' }}} */}
                <input type="number" className={clsx(classes.inputEquation, classes.sidebarText)} style={{ marginTop: "5px", marginLeft: '5px', width: '100px', height: '30px' }}
                  value={paletteRangeMin} onChange={(e: any) => onChangePaletteRange(e.target.value, 'min')} 
                />
                <MuiButton variant="contained" color="primary" style={{ marginTop: '10px', marginLeft: '15px', textTransform: 'none' }} onClick={(e: any) => onHandlePaletteReset("min")}>Reset</MuiButton>
              </Grid>

              <Grid item xs={6}>
                <span style={{ marginLeft: '5px' }}>Max</span>
                <input type="number" className={clsx(classes.inputEquation, classes.sidebarText)} style={{ marginTop: "5px", marginLeft: '5px', width: '100px', height: '30px' }}
                  value={paletteRangeMax} onChange={(e: any) => onChangePaletteRange(e.target.value, 'max')}
                />
                <MuiButton variant="contained" color="primary" style={{ marginTop: '10px', marginLeft: '15px', textTransform: 'none' }} onClick={(e: any) => onHandlePaletteReset("max")}>Reset</MuiButton>
              </Grid>
            </Grid>

          </div>
        </div>

      </div>
    )
  }

  const getFooter = () => {

    return (
      <div>
        <OptionContainer>
          <MuiButton 
          className={customClasses.Muibtn} 
          style={{ marginTop: '20px', textTransform: 'none' }} 
          onClick={onHandleApply}>{appliedColorMapId === activeColormapId ?'Apply':'Save'}</MuiButton>
        </OptionContainer>
      </div>
    )
  }

  return (
    <SideBarContainer
      headerContent={<Title text={"Value Settings"} group="Color Maps" />}
      headerAction={getAction()}
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />

  )
}
