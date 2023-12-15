import MuiGrid from '@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiButton from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import { useState, useEffect } from 'react';
import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';

import AddIcon from '@material-ui/icons/Add';
import BackIcon from '../shared/BackIcon'
import SyncIcon from '@material-ui/icons/Sync';

//import ControlView from './ControlView';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import { goBack } from 'connected-react-router/immutable';



import { Routes } from 'routes';
import { push } from 'connected-react-router/immutable';

import { Source } from '../../../shared/List/List';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import Input from '../components/ActionControlEdit';
import { undoStack } from '../../../utils/undoStack';
import FooterOptionsContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import FooterOption from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';

import {
  selectActiveMenuId,
  selectmenuItems,
  AverageType,
  // selectAverageType,
  setAverageType

} from '../../../../store/sideBar/averageOptionSlice';

import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';
import { isTemplateExpression, isTemplateMiddle, TrueLiteral } from 'typescript';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';

import useStyle from './AverageStyle';

export default function AverageOptionsEdit() {

  const dispatch = useAppDispatch();
  const menuItemList = useAppSelector(selectmenuItems);
  const activeMenuId = useAppSelector(selectActiveMenuId); 
  
  const [activeId, setActiveId] = useState(activeMenuId);
  const classes = useStyle();


  



const activeMenuObj=menuItemList.filter((item)=>{
  return item.id===activeId
})

const activeMenu=activeMenuObj[0]
const [avgType, setAvgType] = useState<AverageType>(activeMenu.averageType)

  const getHeader = () => {

    return (

      <Title text={"Average Options Edit"}  />
    )

  }

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.AVERAGE_OPTIONS_EDIT
  }
  const getHeaderRightIcon = () => {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }

    return (

      <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>

    )

  }

  const onHandleSelection = ( event:any ) => {

    if(event.target.value as string!= undefined) {
  
      setActiveId(event.target.value as string);
    }
  }
 
// console.warn(menuItemList[activeId].averageType)
  const getAction = () => {

    return (

      <SelectAction
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={activeId}
         onChange={(event: any) => onHandleSelection(event)}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null
        }}
      >

      

<ListSubheader >System Provided</ListSubheader>
                {
                   menuItemList?.map((item)=>{

                    if(item.type === Source.SYSTEM) {

                      return (

                        <MuiMenuItem className={classes.selected} key={item.id} value={item.id}>{item.text}</MuiMenuItem>
  
                      )


                    }

                   })

                }

              <ListSubheader>User Provided</ListSubheader>

              {
                   menuItemList?.map((item)=>{
                        
                   
                    if(item.type === Source.USER) {

                      return (

                        <MuiMenuItem className= {classes.selected} key={item.id} value={item.id}>{item.text}</MuiMenuItem>
  
                      )


                    }
                    

                   })

                }

      </SelectAction>)

  }


  const handleRadioChange = (e:any) => {
    const newAvgType = Number(e.currentTarget.value)
    setAvgType(newAvgType)
    dispatch(setAverageType({activemenuID:activeId,avgValue:newAvgType}))
  }
  const getBody = () => {
    return (
      <div>
        <MuiRadioGroup
          aria-label="Algorithm"
          name="controlled-radio-buttons-group"
          style={{ marginLeft: 30, marginTop: 30 }}
          color="primary"
          value={activeMenu.averageType}
          onChange={handleRadioChange}
        >


         <MuiFormControlLabel disabled={activeMenu.type===Source.SYSTEM ? true : false} value={AverageType.DERIVEANDAVERAGE} control={<MuiRadio color="default"/>} label="Derive & Average" />
      
           
            <MuiFormControlLabel  disabled={activeMenu.type===Source.SYSTEM ? true : false} value={AverageType.AVERAGEANDDERIVE} control={<MuiRadio color="default" />} label="Average & Derive" />

  


        </MuiRadioGroup>
      </div>
    )
  }

  const onHandleApply = () => {
    dispatch(push(Routes.AVERAGE_OPTIONS));
  }
  const getFooter = () => {

    let change = false;
    // if(label2D?.label !== labelText)
    //   change = true;

    return (
      <div className={classes.editPageFooter}>
        <MuiButton className={classes.saveButton}
          autoFocus
          onClick={onHandleApply}
          variant="contained"
          color="primary"
          size="small"
          disabled={activeMenu.type==Source.SYSTEM ? true : false}

        >
          Apply
        </MuiButton>
      </div>
    )
  }

  return (
    <SideBarContainer
      headerRightIcon={getHeaderRightIcon()}
      headerContent={getHeader()}
      headerAction={getAction()}
      body={getBody()}
      footer={getFooter()}
    />

  )

}