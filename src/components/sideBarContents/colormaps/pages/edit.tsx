import MuiIconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";

import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import { goBack, push } from "connected-react-router/immutable";
import { useEffect, useState } from "react";
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';
import { selectActiveViewerID} from '../../../../store/appSlice';
import {
  colormapElements,
  selectcolormapData,
  Colormap,
  setColorMapSelection,
  selectCAEDataChange,
  setAppliedCAEData,
  resetCAEdata
} from "../../../../store/sideBar/colormapSlice";
import { BytesToStructuredString } from 'components/utils/networkUtils';
import styles from "./style";

import { convertListToTree} from '../../../utils/tree';
import CardTransfer from 'components/sideBarContents/messages/components/cardTransfer';
import MuiTypography from "@material-ui/core/Typography";
// import MuiGrid from '@material-ui/core/Grid';
import MuiKeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Routes } from "../../../../routes";
import OptionContainer from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer";
import Option from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option";
import { FileImport } from "tabler-icons-react";
import { FileExport } from "tabler-icons-react";

import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiListSubHeader from "@material-ui/core/ListSubheader";
import MuiMenuList from "@material-ui/core/MenuList";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import MuiListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import MuiGrid from "@material-ui/core/Grid";
import MuiButton from "@material-ui/core/Button";
import HelpIcon from '@material-ui/icons/HelpOutline';
import ColorMapIconList from '@material-ui/icons/List';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import {
  DerivedType,
  Sections,
  selectDerivedTypes,
  selectSections,
  selectSteps,
  selectVariables,
  Step,
  Variable,
} from "../../../../store/sideBar/fieldSlice";

import {SelectAppliedStepIdName ,SelectAppliedDerivedTypeIdName,SelectAppliedVariableName,SelectCAEData,SelectCAEVariable,SelectCAEDerivedType,selectCaeVariableType,SelectCAEDerivedTypeRootIds,SelectCAEStepsVariable,setStepsId,SelectCAEResult} from "../../../../store/caeResultSlice";
import { ITreeNode } from "../../../shared/RsTreeTable";

import { selectColorPaletteData,LegendType, setBtnDisablle,setPaletteValueAndUserRange,  setDownloadStatus,DownloadStates,selectBtnDisable, setResultMinMax,applyColorMap,setLegendEnabled,setCAEDataChange,setSelectedVariable,setSelectedStep,setSelectedDerivedType,selectedColorPaletteId,setSelectedColorPalette,circularProgressStatus,circularProgessStatusChange} from "../../../../store/sideBar/colormapSlice";
import globalThemes from "theme/globalThemes";
import CircularProgress from "@material-ui/core/CircularProgress";
import { editPause, editCancel, editCollapse, sortedNotification } from 'store/sideBar/messageSlice';
import { updateLabelMSGAsync } from 'store/sideBar/labelSlice/AllLabelSlice';
const useStyles = makeStyles((theme) => ({
 applyButon: {
    fontSize:theme.typography.body2.fontSize,
    borderRadius:'5px', 
    backgroundColor: theme.palette.accent.primary,
    color: theme.palette.accent.primaryText,
    textTransform:'none',
    '&:hover': {
      backgroundColor: theme.palette.accent.secondary,
    }
  },
  resetButton: {
    fontSize: theme.typography.body2.fontSize,
    borderRadius:'5px', 
    border:'1px solid',
    borderColor: theme.palette.primary.main,
    color:theme.palette.primary.main,
    textTransform:'none',
  },
  withErrorMessageFooter:{
    marginTop:'0px'
  },
  withoutErrorMessageFooter:{
    marginTop:'25px'
  },
  invalidSelection:{
    color:'red'
  }

}));

export default function Edit() {

  const colorpalette = useAppSelector(selectColorPaletteData);
  const caeResultData = useAppSelector(SelectCAEResult);
  const caeData = useAppSelector(SelectCAEData);
  const isCAEChanged = useAppSelector(selectCAEDataChange);
  
  const selectedColorPalette = useAppSelector(selectedColorPaletteId);
  const [isFooterEnabled,setFooterEnabled] = useState(true);
  const [isStepsSelectionError , setStepsSelectionError] = useState(false);
  const [isDerivedTypeSelectionError , setDerivedTypeSelectionError] = useState(false);

  const selectedColorMapId = useAppSelector(
    (state) => state.colormap.selectedColorMapId
  );
  const colorMap = useAppSelector(selectcolormapData);
  const selectedColorMap = colorMap[selectedColorMapId];

  let selectedDeriveTypeId:string = selectedColorMap.derivedType.includes(":")?selectedColorMap.derivedType.split(":")[1]:selectedColorMap.derivedType;
  
  // const [activeId, setActiveId] = useState(selectedColorMapId);

  const list = useAppSelector(colormapElements);


  const caeDerivedTypeRootIds = useAppSelector(SelectCAEDerivedTypeRootIds);
  const SelectionVariableName = colorMap[selectedColorMapId].variable;
  const selectedDerivedTypeName = colorMap[selectedColorMapId].derivedType;
  const legendPaletteType = colorMap[selectedColorMapId].paletteType;
  const selectedColorMapColorPalette = colorMap[selectedColorMapId].colorPalette ;
  const colorSet =  colorpalette[selectedColorMapColorPalette].colorSet ;
  const paletteRange = useAppSelector(state => state.colormap.colormapTree.data[selectedColorMapId].paletteRange);
  const color = colorpalette[selectedColorMapColorPalette].noResultColor;
  const noResultColorRGBA = color[0].color;
  const resultBelowMinColor =  colorpalette[selectedColorMapColorPalette].belowMinColor;
  const belowMinColorRGBA    =  resultBelowMinColor[0].color;
  const resultAboveMaxColor =  colorpalette[selectedColorMapColorPalette].aboveMaxColor;
  const aboveMaxColorRGBA = resultAboveMaxColor[0].color;



  const dispatch = useAppDispatch();
  const classes = styles();
  const internalStyle = useStyles();
  const customClasses = globalThemes();
  const btndisable = useAppSelector(selectBtnDisable);
  const notificationList = useAppSelector(sortedNotification)
  const caeVariable = useAppSelector(SelectCAEVariable);
  const caeDerivedType = useAppSelector(SelectCAEDerivedType);
  const activeViewerID = useAppSelector(selectActiveViewerID);

  
  const {roots: treeData, expanded: expandedKeys} = convertListToTree(caeDerivedType,caeDerivedTypeRootIds);

  let derivedTypeName:string = '';
  let SelectedVariableType:string = '';
  let filterTreeDataIds:any = [];
  const stepMissingVariable:any[] = [];

// to display selcted derivedType Name  
const getDerivedTypeName =()=>{
  Object.values(caeDerivedType).forEach((item:any)=> {
    let generator = item.id.split(":")[1];
    if(generator !== undefined && generator === selectedDeriveTypeId) {
      derivedTypeName = item.title;
    }
    })
}  

getDerivedTypeName();

const checkStepsSelection = () => {

Object.entries(caeResultData.missingVariableSteps).find(([key, value]) => {   
  if (key === caeResultData.selection.variableId) {
    value.forEach((item:any)=> {
      stepMissingVariable.push(item);
      })     
  }
});

if(stepMissingVariable.includes(selectedColorMap.step)){
  setStepsSelectionError(true);
}else {
  setStepsSelectionError(false);
}
  
}
const checkDerivedTypeSelection=()=>{

  let selectVariableType = ''
  let matchDerivedTypeIds:any[] =[];


Object.values(caeResultData.variables).forEach((data:any)=> {

  if(data.id === SelectionVariableName) {

    selectVariableType = data.type;
  }

})

Object.values(caeData).forEach((data:any)=>{
  if(data.id === selectVariableType){
    matchDerivedTypeIds = data.derivedTypeIds ;
  }
})
  if(matchDerivedTypeIds.includes(selectedDeriveTypeId)){

    setDerivedTypeSelectionError(false);
  }else {
    setDerivedTypeSelectionError(true);
   
  }


}
useEffect(()=>{

// invalide selection check  
  checkStepsSelection()
  checkDerivedTypeSelection()

},[]);

  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  const onHandleSelect = (id: string) => {
    dispatch(setColorMapSelection(id));
  };

  const getParent = (
    treeData: { [id: string]: ITreeNode },
    id: string,
    rootParent: boolean
  ): ITreeNode | null => {
    let node = treeData[id];
    if (node.pid === "-1" || node.pid === null) {
      return null;
    }
    let parent = treeData[node.pid];
    if (!rootParent) {
      return parent;
    }
    if (parent.pid === "-1") {
      return parent;
    } else {
      return getParent(treeData, parent.id, rootParent);
    }
  };
  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}>
        <BackButton />
      </MuiIconButton>
    );
  };

  const getAction = () => {
    const parentNodes = list.filter((item) => item.children?.length !== 0);
    return (
      <SelectAction
        id="grouped-select"
        value={selectedColorMapId}
        onChange={(e: any) => {
          if (e.target.value) onHandleSelect(e.target.value);
        }}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        <MuiListSubHeader key={parentNodes[0].id}>
          {parentNodes[0].name}
        </MuiListSubHeader>
        {list.map((element: any) => {
          return element.pid === parentNodes[0].id ? (
            <MuiMenuItem className={customClasses.selected} key={element.id} value={element.id}>
              {element.name}
            </MuiMenuItem>
          ) : null;
        })}
      </SelectAction>
    );
  };

  const stringTrucate = (str:string,length:number)=>{
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;

  }

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.COLOR_MAP_EDIT
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }

    const openColorMapsList = () => {
      dispatch(push(Routes.COLORMAPS_LIST))
      }
  
  
    return (
          <div>
            <HeaderIconButton icon={<ColorMapIconList />} label={"List"} disabled={false} onClick={openColorMapsList}></HeaderIconButton>
            <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
          </div>
           
  
    )
  
  
  } 

  const getBody = () => {
    return (
      <div className={classes.scrollBar}>
        <MuiMenuList>
          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_VARIABLE))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Variable</MuiTypography>
              <MuiTypography
                // classes={{ root: !isValid ? classes.invalid : "" }}
                // variant="h6"
                align="left"
              >
                { stringTrucate(selectedColorMap.variable ,20)}


              </MuiTypography>
            </MuiListItemText>
            <ListItemSecondaryAction>
              <MuiIconButton edge="end"  onClick={() => dispatch(push(Routes.COLORMAPS_VARIABLE))}><MuiKeyboardArrowRightIcon /></MuiIconButton> 
            </ListItemSecondaryAction>
          </MuiMenuItem>
          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_STEPS_AND_SUBCASE))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Steps</MuiTypography>
              <MuiTypography
                // classes={{ root: !isValid ? classes.invalid : "" }}
                // variant="h4"
                className ={isStepsSelectionError?internalStyle.invalidSelection:""}
                align="left"
              >
                { stringTrucate(selectedColorMap.step,20)}

              </MuiTypography>
            </MuiListItemText>
            <ListItemSecondaryAction>
            <MuiIconButton edge="end" onClick={() => dispatch(push(Routes.COLORMAPS_STEPS_AND_SUBCASE))}>
                <MuiKeyboardArrowRightIcon />
            </MuiIconButton >
            </ListItemSecondaryAction>
          </MuiMenuItem>

          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_DERIVED_TYPES))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Derived Types</MuiTypography>
              <MuiTypography
                // classes={{ root: !isValid ? classes.invalid : "" }}
                // variant="h4"
                align="left"
                className ={isDerivedTypeSelectionError?internalStyle.invalidSelection:""}
              >
                { stringTrucate(derivedTypeName,20)}
              </MuiTypography>
            </MuiListItemText>
            <ListItemSecondaryAction>
                <MuiIconButton edge="end"  onClick={() => dispatch(push(Routes.COLORMAPS_DERIVED_TYPES))}>
                  <MuiKeyboardArrowRightIcon />
                </MuiIconButton>
            </ListItemSecondaryAction>
          </MuiMenuItem>
{/* 
          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_SELECTION_AND_LAYER))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Sections & Layers</MuiTypography>
              <MuiTypography
                // classes={{ root: !isValid ? classes.invalid : "" }}
                // variant="h4"
                align="left"
              >
                {selectedSection &&
                  getParent(sections, selectedSection.id, true)?.title +
                    " - " +
                    selectedSection.title}
              </MuiTypography>
            </MuiListItemText>
            <MuiListItemIcon style={{ marginLeft: "250px", marginTop: "25px" }}>
              <MuiKeyboardArrowRightIcon />
            </MuiListItemIcon>
          </MuiMenuItem> */}

          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_COLOR_PALETTE))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Color Palette</MuiTypography>
              <MuiTypography align="left">
                {selectedColorMap && selectedColorMap.colorPalette !== "-1"
                  ? colorpalette[selectedColorMap.colorPalette].title
                  : null}
              </MuiTypography>
            </MuiListItemText>
            <ListItemSecondaryAction>
            <MuiIconButton edge="end" onClick={() => dispatch(push(Routes.COLORMAPS_COLOR_PALETTE))}>
              <MuiKeyboardArrowRightIcon />
            </MuiIconButton>
            </ListItemSecondaryAction>
          </MuiMenuItem>

          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_VALUE_SETTINGS))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Value Settings</MuiTypography>
            </MuiListItemText>
            <ListItemSecondaryAction>
            <MuiIconButton edge="end"  onClick={() => dispatch(push(Routes.COLORMAPS_VALUE_SETTINGS))}>
              <MuiKeyboardArrowRightIcon />
            </MuiIconButton>
            </ListItemSecondaryAction>
          </MuiMenuItem>

          <MuiMenuItem
            onClick={() => dispatch(push(Routes.COLORMAPS_LEGEND_SETTINGS))}
          >
            <MuiListItemText>
              <MuiTypography align="left">Legend Settings</MuiTypography>
            </MuiListItemText>
            <ListItemSecondaryAction>
              <MuiIconButton edge="end" onClick={() => dispatch(push(Routes.COLORMAPS_LEGEND_SETTINGS))}>
               <MuiKeyboardArrowRightIcon />
              </MuiIconButton >
            </ListItemSecondaryAction>
          </MuiMenuItem>
        </MuiMenuList>
      </div>
    );
  };

  // const getFooter = () => {
  //   return (
  //     <div
  //       style={{
  //         marginLeft: "10px",
  //         marginRight: "10px",
  //         marginBottom: "10px",
  //       }}
  //     >
  //       {!isValid ? (
  //         <MuiTypography classes={{ root: classes.invalid }}>
  //           Data not available for the current selection
  //         </MuiTypography>
  //       ) : null}
  //     </div>
  //   );
  // };
  const onHandlePause = (id : string, pause : boolean) => {
    // console.log(id,pause)
    if(pause)
        dispatch(editPause({id:id, value: false}));
    else
        dispatch(editPause({id:id, value: true}));
}

const onHandleCollapse = (id : string, boolean: boolean) => {

    if(boolean)
    dispatch(editCollapse({id, value: true}))
    

    else
    dispatch(editCollapse({id, value: false}))

}

const onHandleCancel = (id: string) => {
   dispatch(editCancel(id));
}
function searchObjectIndex(_arr: any, searchString: String) {
  const searchTitle = `Result`;
  let arr = _arr.reverse();
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].card.data.totalSize !== arr[i].card.data.transferredSize)
    if (arr[i].card.title.includes(searchTitle)) {
      var arrCopy = JSON.parse(JSON.stringify(arr[i]));
      arrCopy.card.title = `Downloading ${searchString}`
      return arrCopy;
    }
  }
  return -1; // if the searchString is not found in any object, return -1
}

  const onHandleApply = () => {

    dispatch(circularProgessStatusChange(true))
    dispatch(setDownloadStatus( DownloadStates.IN_PROGRESS ));
    let selectedData = colorMap[selectedColorMapId]; 
    
    let variableId = selectedData.variable;
    let stepId = selectedData.step;
    let derivedTypeId =  selectedData.derivedType.includes(":")?selectedData.derivedType.split(":")[1]:selectedData.derivedType;
    let legendType = (parseInt(legendPaletteType) === LegendType.CONTINUOUS ?  "CONTINUOUS" : "DISCRETE")
    let colorSetValues:any[] = [];
 
     colorSet.forEach(data => {
 
         let R = data.color.r ;
         let G = data.color.g ;
         let B = data.color.b ;
         //let A = data.color.a ;
 
        colorSetValues.push([R,G,B]);
 
     })
 
     // 0 - CONTINUOUS, 1 - DISCRETE
     //let newColorSet = colorSetValues.slice(1, colorSetValues.length -1);
     viewerAPIProxy.setLegendData(legendType, colorSetValues, activeViewerID);
     //For testing
     viewerAPIProxy.setAboveMaxColor([aboveMaxColorRGBA.r,aboveMaxColorRGBA.g,aboveMaxColorRGBA.b, aboveMaxColorRGBA.a],  activeViewerID);
     viewerAPIProxy.setBelowMinColor([belowMinColorRGBA.r,belowMinColorRGBA.g,belowMinColorRGBA.b, belowMinColorRGBA.a],  activeViewerID);

     viewerAPIProxy.setNoResultColor([noResultColorRGBA.r,noResultColorRGBA.g,noResultColorRGBA.b, noResultColorRGBA.a],  activeViewerID);
      //viewerAPIProxy.setValueMinMax([0, 12], activeViewerID);
 
     viewerAPIProxy.applyResult(variableId,stepId,derivedTypeId ,activeViewerID)
     .then(
     (resp : any) => {
       let minmax = viewerAPIProxy.getCurrentResultMinMAX(activeViewerID);
       dispatch(setResultMinMax({minmax : [minmax.min, minmax.max]}));
       dispatch(setPaletteValueAndUserRange({minmax : [minmax.min, minmax.max]}));
		   viewerAPIProxy.setValueMinMax([minmax.min, minmax.max], activeViewerID);
       //console.log(resp);
       dispatch(circularProgessStatusChange(false)) 
       dispatch(setDownloadStatus(DownloadStates.DOWNLOADED));
       dispatch(updateLabelMSGAsync({}));          
     })
     .catch((error : any ) => {
       console.error(error);
     }
   )
      dispatch(setAppliedCAEData(selectedColorMapId));
      dispatch(setColorMapSelection(selectedColorMapId));
      dispatch(applyColorMap(selectedColorMapId));
      dispatch(setLegendEnabled(true));
     // dispatch(setCAEDataChange(false));
      setFooterEnabled(false);
      if(selectedColorPalette === '-1') {
        dispatch(setSelectedColorPalette(selectedColorMapColorPalette));
      }
  };
  const onHandleReset = () =>{
    dispatch(resetCAEdata(selectedColorMapId))
    //dispatch(setCAEDataChange(false));
    setFooterEnabled(true);
    setStepsSelectionError(false);
    setDerivedTypeSelectionError(false);


  }
 
  const getFooter = () => {
    return (
      <div>
        {/* <div>
          <OptionContainer>
            <Option
              label="Import"
              // active={}
              icon={FileImport}
              // onClickUpdate={onHandleCopy}
            />
            <Option
              label="Export"
              // active={}
              icon={FileExport}
              // onClickUpdate={onHandlePaste}
            />
          </OptionContainer>
        </div> */}
        {isFooterEnabled?
            <OptionContainer>
              {isStepsSelectionError || isDerivedTypeSelectionError? 
              <MuiGrid item xs={12}>
                <div style={{marginTop:'10px'}}>
                    <span id='error_message' style={{color:'red',marginTop:'10px'}}>{isStepsSelectionError || isDerivedTypeSelectionError ? "Invalid Selection":null }</span>
               </div>
              </MuiGrid>
              
              :null}
              <div >
              <MuiGrid container spacing={2}  className={isStepsSelectionError || isDerivedTypeSelectionError  ? internalStyle.withErrorMessageFooter:internalStyle.withoutErrorMessageFooter}>
              {isStepsSelectionError || isDerivedTypeSelectionError ? null :   
              <MuiGrid item xs={6}>
                <MuiButton
                  className={internalStyle.applyButon+' '+customClasses.Muibtn}
                    onClick={onHandleApply}
                    // disabled={readOnly}
                    // color="primary"
                  >
                  Apply
                </MuiButton>
              
              </MuiGrid>}
              <MuiGrid item xs={6}>
                <MuiButton
                      className={internalStyle.resetButton+' '+customClasses.BtnOutlined}
                    onClick={onHandleReset}
                    // disabled={readOnly}
                    // color="primary"
                  >
                  Reset
                </MuiButton>
              </MuiGrid>
              </MuiGrid>
              </div>
 </OptionContainer>
      : 
      
        btndisable  ?
          <div style={{marginTop:'5px',marginBottom:'8px',padding: 10}}>Downloaded</div> :
         selectedColorMap.downloadStatus===DownloadStates.NOT_DOWNLOADED ? 
          <div style={{marginTop:'5px', marginLeft:'20px', padding:'10px'}}> <CardTransfer item={searchObjectIndex(notificationList,selectedColorMap.title)} handleCollapse={onHandleCollapse} handlePause={onHandlePause} handleCancel={onHandleCancel} timeArrowDivider={false}></CardTransfer></div>: 
          <MuiTypography style={{ padding: 10 }}>{BytesToStructuredString(selectedColorMap.size, 2)}</MuiTypography> }
      
     
      </div>
    );
  };

  return (
    <SideBarContainer
      headerContent={<Title text={"Edit"} group="Color Maps" />}
      headerAction={getAction()}
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
