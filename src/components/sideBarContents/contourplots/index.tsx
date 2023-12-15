import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToolTip from '@material-ui/core/Tooltip';
import MuiBackIcon from '@material-ui/icons/ArrowBack'
import clsx from 'clsx';
import { useState, useRef } from 'react';
import TreePicker   from 'rsuite/lib/TreePicker';
import {useAppSelector , useAppDispatch} from '../../../store/storeHooks';
import { setSelectedData,SelectCAEResult } from 'store/sideBar/contourplotSlice';
// import {  setSelectedData, SelectCAEResult  } from '../../../../store/colormapSlice';
import { selectActiveViewerID, selectDarkModeEnable } from '../../../store/appSlice';

import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';
import { useStylesDark } from './style';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SideBarContainer from 'components/layout/sideBar/sideBarContainer';
import { setSidebarActiveContent } from '../../../store/appSlice';
import { sideBarContentTypes } from '../../../config';

//style


function Contourplot() {
    const isDarkMode = useAppSelector(selectDarkModeEnable);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const CAEResult = useAppSelector(SelectCAEResult);
    //console.log("CAEResult",CAEResult);
    const dispatchAction = useAppDispatch();
    
    let treePickerContainer = useRef<HTMLDivElement>(null);

    const classes = useStylesDark({});


    let isButtonEnabled:any;
    let varValue:any;
    let stepVal:any;
    let totalData:any[] =[];
    let stepTotal:any[]=[];


    if(CAEResult){
        let variablesData:any =CAEResult.variables;
        let value:number =0;
        for (let x in variablesData){
            const {name,type} = variablesData[x];
            let eachOBj:any ={
                label:name,
                value:value,
                children:[]
            }
            value++;
            let derivedTypefeilds:any = CAEResult.variableTypes[type].derivedTypeIds;
            for(let type = 0; type < derivedTypefeilds.length; type++){
              eachOBj.children.push({label:CAEResult.derivedTypes[derivedTypefeilds[type]].name, value});
              value++;
            }
            totalData.push(eachOBj)
        };
        let stepData:any= CAEResult.stepVariables;
        let stepN =0;
        for (let y in stepData) {
          const{ name } =stepData[y];
          let eachStep={
              label:name,
              value:stepN,
          }
          stepN++;
          stepTotal.push(eachStep)
        };
    
    let variableID:any = CAEResult.selection.variableId;  
    let selectderived:any=CAEResult.selection.derivedTypeId;
    let selectstep = CAEResult.selection.stepId;
    let selectderived1 = '';
    if(selectderived && selectderived !== '')
      selectderived1 = CAEResult.derivedTypes[selectderived].name;
   
    for(let i=0;i<totalData.length;i++){

      if(totalData[i].label === selectderived1){
        varValue = totalData[i].value;
        break;
      }
      if(totalData[i].children){
        for(let j=0;j<totalData[i].children.length;j++){
          if(totalData[i].children[j].label === selectderived1 && totalData[i].label === variableID ){
            varValue = totalData[i].children[j].value;
            break;
          }
        }
      }
      if(varValue !== undefined){
        break;
      }
    };
    if(selectstep && selectstep !== '')
      selectstep=CAEResult.stepVariables[selectstep].name;
    for(let k=0;k<stepTotal.length;k++){
      if(stepTotal[k].label === selectstep){
        stepVal=stepTotal[k].value;
        break; 
      }
    };

  }
 
  // const style = {
  //   backgroundColor: "#F8F8F8",
  //   borderTop: "1px solid #E7E7E7",
  //   textAlign: "center",
  //   padding: "20px",
  //   position: "fixed",
  //   left: "0",
  //   bottom: "0",
  //   height: "60px",
  //   width: "100%"
  // };

  const [variable, setVariable]=useState(varValue);
  const [step, setStep]=useState(stepVal);

  isButtonEnabled= variable && step > 0;
  const getParentLabel = (data:any[], id:any):any=>{
    let i:number;
    for(i=0;i<data.length;i++){
      if(data[i].value === id){
        return true;
      }
      if(data[i].children && data[i].children.length > 0){
        let result =  getParentLabel(data[i].children, id);
        if(result === true){
          return data[i].label;
        } else if(result){
            return result;
        }
      }
    }
  }

  const getDetails = (data:any[], id:null, children:any[]):any=>{
    let i;
    for(i=0;i<data.length;i++){
      if(data[i].value === id){
        if(children.length >0){
          return {
            children: data[i].children,
          }
        }
        return {
          label: data[i].label,
          id: id
        }
      }
      if(data[i].children && data[i].children.length > 0){
        let result =  getDetails(data[i].children, id,[]);
        if(result){
          return result;
        }
      }
    }
  }

  const varfromredux = JSON.parse(JSON.stringify(totalData));
  const stepfromredux = JSON.parse(JSON.stringify(stepTotal));

  const onSave = ()=>{
    let vari : any='';
    let stt : any='';
    let varId='';
    vari = getDetails(varfromredux, variable,[]);
    stt = getDetails(stepfromredux, step,[]);
    varId= getParentLabel(varfromredux,variable);
    let k;
    let new1;
    for(k in CAEResult.derivedTypes){
      if(vari.label === CAEResult.derivedTypes[k].name){
        new1=CAEResult.derivedTypes[k].generator;
        break;
      }
    };
  
    dispatchAction(setSelectedData({
      selectedVariableId:varId,
      selectedDerivedTypeId:new1,
      selectedStepId:stt.label
    }));

    viewerAPIProxy.applyResult(varId,stt.label, new1,activeViewerID)
    .then(
    (resp : any) => {
      //console.log(resp);          
    })
    .catch((error : any ) => {
      //console.log(error);
    }
  )};

  const getDisableValues = (data:any, arr:any) => {
    for(let i=0;i<data.length;i++){
      if(data[i].children && data[i].children.length > 0){
        arr.push(data[i].value);
        getDisableValues(data[i].children,arr);
      }
    }
  }

  let disableChildrenForVar:any[]  = [];
  let disableChildrenForStep:any[] = [];
  if(varfromredux)
    getDisableValues(varfromredux, disableChildrenForVar);
  if(stepfromredux)
    getDisableValues(stepfromredux, disableChildrenForStep);
  
  const getBody = () => {
  
    return(
      <div ref ={ treePickerContainer }  className={classes.container} style ={{alignItems:"center"}} >   
            <div className={isDarkMode ? "somedark":"somelight"}>
            <p className={clsx(classes.divp,classes.bodyHeading)}> Variable</p>
            { varfromredux && <TreePicker  container={ ()=>{ return treePickerContainer?.current } }  menuClassName={isDarkMode ? "dark":"light"} disabledItemValues={disableChildrenForVar}  name="variable" onChange={(value)=>setVariable(value)} value={variable} defaultExpandAll data={varfromredux} style={{ width: 246, zIndex:9999 }}  searchable={false} renderValue={(value, item : any, selectedElement) => {
              let details;
              if(item.value)
                details = getParentLabel(varfromredux, item.value);
              return (
                <span className={clsx(classes.bodyContent)}>
                  {details ? `${details} - ` : ''} {item.label}
                </span>
              );
            }} />}

            </div>
            <div className={isDarkMode ? "somedark":"somelight"}>
            <p className={clsx(classes.divp,classes.bodyHeading)}>Step</p>
            { stepfromredux && <TreePicker container={ ()=>{ return treePickerContainer?.current } }  menuClassName={isDarkMode ? "dark":"light"} value={step} disabledItemValues={disableChildrenForStep} onChange={(value)=>{setStep(value)}} defaultExpandAll data={stepfromredux} style={{ width: 246,  zIndex:9999 }} searchable={false} 
            
            renderValue={(value, item : any, selectedElement) => {

              return (
                <span className={classes.bodyContent}>
                  {item.label}
                </span>
              );
            }}
            
            />}
            </div>
            </div>
    )
  }


  const getFooter = () =>{
    return(
      <div>
        {isButtonEnabled?null:
        <p  className={classes.divpp} >Data not available for the current selection</p>}
        <div className={classes.divb}>
                    <MuiButton  
                    variant='contained'
                    color='primary'
                      onClick={onSave} 
                      size='small'
                       disabled={!isButtonEnabled}
                    >
                      Apply
                    </MuiButton>
                  </div>
      </div>  
 
)
  }
  //const dispatch = useAppDispatch();


  const getHeaderContent = () => {
    return (

      <Title text="Contour Plots"></Title>
    )  
  } 



  return (
    <SideBarContainer
      headerContent={ getHeaderContent() }
      body={getBody()}
      footer={getFooter()}
      />
  )
    
}

export default Contourplot;