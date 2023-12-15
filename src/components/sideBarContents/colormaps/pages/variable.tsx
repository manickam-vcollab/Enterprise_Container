import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';


import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { useRef, useState, useEffect } from 'react';

import AutoSizer from '../../../shared/autoSize'

import { selectVariables, expandVariable, getDependantVariableIds, selectSteps,selectVariablesRoots} from '../../../../store/sideBar/fieldSlice'

import {SelectCAEVariable,checkNode,setCheckedNodesAsync,SelectCAEVariableRootIds,updateCheckState,TreeType,setVariableId,setStepsId,setDerivedTypeId,SelectCAEResult,SelectCAEData} from '../../../../store/caeResultSlice';

import { colormapElements, selectcolormapData, setSelectedVariable,setSelectedDerivedType, ColormapType,setColorMapCaeSelection,applyColorMap,setCAEDataChange,setSelectedStep} from '../../../../store/sideBar/colormapSlice';

import {useStyles} from '../../../shared/RsTreeTable/styles/TreeNodeStyle'

import useVisibility from '../../../sideBarContents/field/shared/hooks/useVisibility'
import TreeView from '../../../shared/RcTree/ColorMaps/ColorMapsTreeView';
import {undoStack} from "../../../utils/undoStack";

import { convertListToTree } from "../../../utils/tree";
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import {Routes} from "../../../../routes";
// import { makeStyles } from '@material-ui/core';
import globalThemes from 'theme/globalThemes';

// const useCustomStyle = makeStyles<Theme>((theme) =>({
//   root:{
//     '&.Mui-selected':{
//       color:theme.palette.accent.primaryText,
//     },
//   }
// }))


export default function Variable(){

  const dispatch = useAppDispatch();  
  const classes = useStyles();
  // const selectedClass = useCustomStyle();
  const customClasses = globalThemes()

  const caeVariable = useAppSelector(SelectCAEVariable);
  const caeData =     useAppSelector(SelectCAEData);  
  const caeResultData = useAppSelector(SelectCAEResult);
  const variableRootIds = useAppSelector(SelectCAEVariableRootIds);
  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
   
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)
  //const appliedVariable = colormapsData[activeColormapId].variable;
  const colormapNameList = useAppSelector(colormapElements)
  const {roots: treeData, expanded: expandedKeys} = convertListToTree(caeVariable,variableRootIds);
  const selectedVariableName = colormapsData[selectedColorMapId].variable;
  const selectedStepsName    = colormapsData[selectedColorMapId].step;
  const selectedDerivedTypeName = colormapsData[selectedColorMapId].derivedType;
  const treeType = TreeType.VARIABLETREE;
  let selectedDeriveTypeId:string = selectedDerivedTypeName.includes(":")?selectedDerivedTypeName.split(":")[1]:selectedDerivedTypeName;

  const treeSelectedkey:any[] = [];
  let stepMissingVariable:any[] = [];
  let filterTreeDataForStepsIds:any = [];
  let filterTreeDataForDerivedTypeIds:any = [];
  let selectedVariable:any = [];
  let stepAndDerivedTypeVariable:any =[];

  const variableTreeData:any[] =[];
    treeData.forEach((item)=> {
    let nodeId = item.id;
    if(nodeId === selectedVariableName ) {
      treeSelectedkey.push(nodeId);
    }
    variableTreeData.push(item);
  })


 // const steps = useAppSelector(selectSteps);
  //const [searchText, setSearchText] = useState("");

  const containerRef = useRef(null);


  // const selectedStepIds = colormapsData[activeColormapId].step;

  //const readOnly = colormapsData[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false;

  // const [depStepIds, setDepStepIds] = useState<string[]>([]);





  // const variableData = Object.assign({},variables);


//   const stepVisibleIds = useVisibility({
//     source: steps,
//     target: variables,
//     targetIds: depStepIds,
//     // targetSetVisibilityReducer: setVisibleStepsAndSubcase
// })
// useEffect(() => {
//     setDepStepIds(getDependantVariableIds(steps,[selectedStepIds]));
// },[activeColormapId])

  // const classes = styles();
  Object.entries(caeResultData.missingVariableSteps).find(([key, value]) => {   

    if(!value.includes(selectedStepsName)) {

      filterTreeDataForStepsIds.push(key);

     }
  
  });


  Object.entries(caeData).forEach((item)=>{

    let id = item[1].id.includes(":")?item[1].id.split(":")[1]:item[1].id;
    let derivedType = selectedDerivedTypeName.includes(":")?selectedDerivedTypeName.split(":")[1]:selectedDerivedTypeName;

    if(id === derivedType) {

      filterTreeDataForDerivedTypeIds.push(item[1].pid)
    }

  })

  Object.values(caeResultData.variables).forEach((item)=>{
    if(item.type === filterTreeDataForDerivedTypeIds[0]) {

       if(filterTreeDataForStepsIds.includes(item.id)){

        stepAndDerivedTypeVariable.push(item.id);
       }
      
    }
  })

  useEffect(()=> {
    //dispatch(setVariableId(selectedVariableName));
    // dispatch(setStepsId(selectedStepsName));
    // dispatch(setDerivedTypeId(selectedDerivedTypeName));
  },[selectedVariableName])
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandVariable({toOpen,nodeId}));
}

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onVariableClick = (node :any) => {
    let nodeId = node.id;
    let derivedType = '';
    let matchDerivedTypeIds:any[] =[];
    if(node.children.length === 0)

// to get variable type
    Object.values(caeResultData.variables).forEach((data:any)=> {
      if(data.id === nodeId) {
        derivedType = data.type;
      }
    })

// to get default derivedType
    Object.values(caeData).forEach((data:any)=>{
      if(data.id === derivedType){
        matchDerivedTypeIds = data.derivedTypeIds ;
      }
    })
    
// to check if default derivedType avilable in the  selected variable     
    if(matchDerivedTypeIds.includes(selectedDeriveTypeId)) {
      Object.values(caeData).forEach((item:any)=> {
        let generator = item.id.split(":")[1];
        if(generator !== undefined && generator === selectedDeriveTypeId) {
          dispatch(setSelectedDerivedType({colorMapId :selectedColorMapId, derivedTypeId :item.id}))
        }
        })
    } else {

      Object.values(caeResultData.variableTypes).forEach((data:any)=>{
        if(data.id === derivedType){
          dispatch(setSelectedDerivedType({colorMapId :selectedColorMapId, derivedTypeId :data.defaultDerived}))
        }
      })

    }

    dispatch(setSelectedVariable({colorMapId :selectedColorMapId, variableId :nodeId}))
    dispatch(setVariableId(nodeId));
    dispatch(setColorMapCaeSelection({selectedColorMapId:selectedColorMapId}))
    dispatch(setCAEDataChange(true));
// // Validation for available steps for selected variable start   
//     Object.entries(caeResultData.missingVariableSteps).find(([key, value]) => {   
//       if (key === nodeId) {
//         value.forEach((item:any)=> {
//           stepMissingVariable.push(item);
    
//          })
        
//       }
    
//     });

//     for (const [key, value] of Object.entries(caeResultData.stepVariables)) {
//       caeStepArray.push(key);
//     }
         
//     avilableStepIDS = caeStepArray.filter(element => !stepMissingVariable.includes(element));
//     dispatch(setSelectedStep({colorMapId :selectedColorMapId, stepId : avilableStepIDS[0]}))
// Validation end    
    //dispatch(applyColorMap('-1'));
    dispatch(push(Routes.COLORMAPS_EDIT));

  }

  const handleCreateLabel = (nodeId: string) => {

    dispatch(createColorMap(nodeId));
  };

  // const handleRowClick = (node: any) => {
  //   setOpenDelete(false);
  //   if (node.children.length === 0) dispatch(setColorMapSelection(node.id));
  // };
  
  const handleCheck =(toCheck:boolean, node:any, undoable?:boolean) => {

    let nodeId = node.id

   //dispatch(checkNode({toCheck,nodeId}));

    dispatch(setCheckedNodesAsync({toCheck,nodeId, undoable:true}));

   if(toCheck === true) {

    dispatch(updateCheckState({nodeId,treeType}));
    dispatch(setColorMapCaeSelection({nodeId,treeType,selectedColorMapId}));
    //dispatch(applyColorMap('-1'));
   
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
    tourName: TOUR_MENU_NAMES.VARIABLES
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
      <div ref = {containerRef} >
 
    <TreeView
              nodes ={caeVariable}
              treedata={variableTreeData}
              selectedKey={treeSelectedkey}
              onExpand={handleExpand}
              selected={[selectedColorMapId]}
              add={handleCreateLabel}
              onClick={onVariableClick}
              check ={handleCheck}
              avaliableResult = {stepAndDerivedTypeVariable}


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
            headerContent={ <Title text={"Variable" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
