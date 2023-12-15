import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import { convertListToTree} from '../../../utils/tree';
import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';


import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';


import { useRef, useState } from 'react';

import AutoSizer from '../../../shared/autoSize'

import {  selectDerivedTypes, expandDerivedTypes, selectVariables, getDependantDerivedTypeIds } from '../../../../store/sideBar/fieldSlice'

import { colormapElements, selectcolormapData, setSelectedDerivedType, ColormapType,setColorMapCaeSelection,applyColorMap,setCAEDataChange} from '../../../../store/sideBar/colormapSlice';

import useVisibility from '../../../sideBarContents/field/shared/hooks/useVisibility'

import {useEffect} from 'react';
import TreeSearchRelated from '../shared/treeSearchRelated';

import {SelectCAEDerivedType,SelectAppliedVariableName,SelectCAEVariable,SelectCAEDerivedTypeRootIds,setCheckedNodesAsync,updateCheckState,TreeType,selectCaeVariableType,setDerivedTypeId} from '../../../../store/caeResultSlice';

import TreeView from '../../../shared/RcTree/ColorMaps/ColorMapsTreeView';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import {Routes} from "../../../../routes";
import globalThemes from "theme/globalThemes";


export default function Variable(){

  const dispatch = useAppDispatch();  

  const derivedTypes = useAppSelector(selectDerivedTypes); 
  const [searchText, setSearchText] = useState("");

  const containerRef = useRef(null);

  const customClasses = globalThemes();

  const variables = useAppSelector(selectVariables);

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData);
  const selectedDerivedType = colormapsData[selectedColorMapId].derivedType;
 // const appliedDerivedType = colormapsData[activeColormapId].derivedType;
  const colormapNameList = useAppSelector(colormapElements);

  const [depDerivedIds, setDepDerivedIds] = useState<string[]>([]);
  //const selectedVariableIds = colormapsData[activeColormapId].variable;

  const caeDerivedTypeRootIds = useAppSelector(SelectCAEDerivedTypeRootIds);
  const selectedColorMap = colormapsData[selectedColorMapId];

  //const readOnly = colormapsData[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false;
  const SelectionVariableName = colormapsData[selectedColorMapId].variable;
  let selectedDeriveTypeId:string = selectedColorMap.derivedType.includes(":")?selectedColorMap.derivedType.split(":")[1]:selectedColorMap.derivedType;

  const caeVariable = useAppSelector(SelectCAEVariable);
  const caeDerivedType = useAppSelector(SelectCAEDerivedType);
  const caeVariableType = useAppSelector(selectCaeVariableType);

  const {roots: treeData, expanded: expandedKeys} = convertListToTree(caeDerivedType,caeDerivedTypeRootIds);
  const treeType = TreeType.DERIVEDTYPETREE;

  let selectedKeys:any = [];
  let filterTreeDataIds:any = [];
 
  let SelectedVariableType:string = '';
  let derivedTypeTreeChildren:any=[];


  Object.values(caeVariable).forEach((data:any)=> {

    if(data.id === SelectionVariableName) {

      SelectedVariableType = data.type;
    }

  })

  const filteredTreeData = treeData.filter((data)=> {

    return SelectedVariableType === data.id

  })

  filterTreeDataIds.push(filteredTreeData[0].id);
  
  filteredTreeData[0].children.forEach((children:any)=> {

    filterTreeDataIds.push(children.id);

  })


// Removeing parent 
treeData.forEach((item:any)=> {

    item.children.forEach((children:any)=> {

      derivedTypeTreeChildren.push(children);

    })
})

treeData.forEach((item:any, index : number)=> {
     
    item.children.forEach((children:any)=>{

      let generator = children.id.split(":")[1];
      if(generator === selectedDeriveTypeId ) {
        selectedKeys = children.key ;
      }

    })

})

  const derivedVisibleIds = useVisibility({
    source: variables,
    target: derivedTypes,
    targetIds: depDerivedIds,
    // targetSetVisibilityReducer: setVisibleDerivedTypes
})
  // useEffect(() => {
  //   setDepDerivedIds(getDependantDerivedTypeIds(variables,[selectedVariableIds]));
  // },[activeColormapId])
  
  // const classes = styles();
  const onClickBackIcon = () => {
    dispatch(goBack());
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandDerivedTypes({toOpen,nodeId}));
}

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onHandleRowClick = (node :any) => { 
    let nodeId = node.id;
    if(node.children.length === 0)
    dispatch(setSelectedDerivedType({colorMapId :activeColormapId, derivedTypeId : node.id}))
    dispatch(setDerivedTypeId(nodeId));
    //dispatch(applyColorMap('-1'));
    dispatch(setCAEDataChange(true));
    //dispatch(setColorMapCaeSelection({nodeId,treeType,selectedColorMapId}));
    dispatch(push(Routes.COLORMAPS_EDIT));
    
  }

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
    tourName: TOUR_MENU_NAMES.DERIVED_TYPE
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
            nodes = {caeDerivedType}
            treedata = {treeData}
            selectedKey = {[selectedKeys]}
            onExpand = {handleExpand}
            selectable = {true}
            selected = {[selectedColorMapId]}
            //check ={handleCheck}
            onClick = {onHandleRowClick}
            avaliableResult = {filterTreeDataIds}

          />
    </div> 
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"40px"}}>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Derived Type" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            //footer = { getFooter() }
          />

  )
}
