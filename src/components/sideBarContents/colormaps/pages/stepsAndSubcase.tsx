import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { useRef, useState , useEffect } from 'react';
import {Routes} from "../../../../routes";

import AutoSizer from '../../../shared/autoSize';


import { convertListToTree } from "../../../utils/tree";

import {selectSteps, expandStepsAndSubcase, selectVariables, getDependantStepIds,} from '../../../../store/sideBar/fieldSlice'

import {SelectCAEStepsVariable,SelectCAEStepsVariableRootIds,setCheckedNodesAsync,updateCheckState,TreeType,setStepsId,SelectCAEData,SelectAppliedVariableName,SelectCAEResult} from '../../../../store/caeResultSlice';

import { colormapElements, selectcolormapData, setSelectedStep, ColormapType,setColorMapCaeSelection,applyColorMap,setCAEDataChange} from '../../../../store/sideBar/colormapSlice';

import useVisibility from '../../../sideBarContents/field/shared/hooks/useVisibility'

import TreeView from '../../../shared/RcTree/ColorMaps/ColorMapsTreeView';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import globalThemes from 'theme/globalThemes';

export default function Variable(){

  const dispatch = useAppDispatch(); 
  
  const customClasses = globalThemes()

  const steps = useAppSelector(selectSteps);
  const variables = useAppSelector(selectVariables);

  const [depStepIds, setDepStepIds] = useState<string[]>([]);

  const [searchText, setSearchText] = useState("");

  const containerRef = useRef(null); 

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)
  const appliedStep = colormapsData[activeColormapId].step;
  const colormapNameList = useAppSelector(colormapElements);
  const caeResultData = useAppSelector(SelectCAEResult);

  const stepsVariable = useAppSelector(SelectCAEStepsVariable);
  const stepsVariablesRootIds = useAppSelector(SelectCAEStepsVariableRootIds)
  const selectedStepName = colormapsData[selectedColorMapId].step;
  const selectedVariable = useAppSelector(SelectAppliedVariableName);

  const {roots: treeData, expanded: expandedKeys} = convertListToTree(stepsVariable,stepsVariablesRootIds);


  const selectedVariableIds = colormapsData[activeColormapId].variable;

  const readOnly = colormapsData[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false;

  const treeType = TreeType.STEPTREE;
  const treeSelectedkey:any[] = [];
  const stepMissingVariable:any[] = [];
  const caeStepArray:any[] = [];
  let filterTreeDataIds:any[] = [];

  const stepTreeData:any[] =[];

  Object.entries(caeResultData.missingVariableSteps).find(([key, value]) => {   
    if (key === caeResultData.selection.variableId) {
      value.forEach((item:any)=> {
        stepMissingVariable.push(item);
  
       })
      
    }
  
  });
  
  for (const [key, value] of Object.entries(caeResultData.stepVariables)) {
    caeStepArray.push(key);
  }
       
  filterTreeDataIds = caeStepArray.filter(element => !stepMissingVariable.includes(element));

  treeData.forEach((item)=> {
  let nodeId = item.id;
  // if(nodeId === selectedStepName ) {
  //   if(filterTreeDataIds.includes(selectedStepName)){
  //    // treeSelectedkey.push(nodeId);
  //   }
    
  // }
  stepTreeData.push(item);
})

// selected key
treeSelectedkey.push(selectedStepName);

if(treeSelectedkey.length === 0){
  //dispatch(setSelectedStep({colorMapId :activeColormapId, stepId : filterTreeDataIds[0]}))
  //treeSelectedkey.push(filterTreeDataIds[0]);

}

  const stepVisibleIds = useVisibility({
    source: variables,
    target: steps,
    targetIds: depStepIds,
    // targetSetVisibilityReducer: setVisibleStepsAndSubcase
})
useEffect(() => {
    setDepStepIds(getDependantStepIds(steps,[selectedVariableIds]));
},[activeColormapId])

  // const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandStepsAndSubcase({toOpen,nodeId}));
}

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onHandleRowClick = (node :any) => {
    if(node.children.length === 0)
      dispatch(setSelectedStep({colorMapId :activeColormapId, stepId : node.id}))
      dispatch(setStepsId(node.id));
      dispatch(setCAEDataChange(true));
      dispatch(push(Routes.COLORMAPS_EDIT));
  }

  const handleCheck =(toCheck:boolean, node:any, undoable?:boolean) => {

    let nodeId = node.id

   //dispatch(checkNode({toCheck,nodeId}));

    dispatch(setCheckedNodesAsync({toCheck,nodeId, undoable:true}));

   if(toCheck === true) {

    dispatch(updateCheckState({nodeId,treeType}));
    dispatch(setColorMapCaeSelection({nodeId,treeType,selectedColorMapId}));
    //dispatch(applyColorMap("-1"));
    dispatch(setCAEDataChange(true));

   }


  
    // if(undoable){
    //   undoStack.add(
    //     {
    //       undo: () => handleCheck(!toCheck, nodeId),
    //       redo: () => handleCheck(toCheck, nodeId),
    //     }
    //   )
    // }


  }

  
  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    const parentNodes = colormapNameList.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColormapId}
      onChange={(e : any) => {if(e.target.value) onHandleSelect(e.target.value)}}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
         <MuiListSubHeader key={parentNodes[0].id}>{parentNodes[0].name}</MuiListSubHeader>
        {
          colormapNameList.map((element : any) => {
            return(
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

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.STEPS_AND_SUBCASE
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
  
  
    return (
  
           <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
  
    )
  
  
  } 
  
  const getBody = () => {


    return (
      <div ref = {containerRef}  >
    <TreeView
            
            nodes = {stepsVariable}
            treedata = {stepTreeData}
            selectedKey = {treeSelectedkey}
            onExpand = {handleExpand}
            selectable = {true}
            selected = {[selectedColorMapId]}
            check = {handleCheck}
            onClick = {onHandleRowClick}
            avaliableResult = {filterTreeDataIds}

          />
    </div> 
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
        </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Steps & subcase" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
