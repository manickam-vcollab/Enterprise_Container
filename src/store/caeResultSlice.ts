import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import nextId from "react-id-generator";
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from "./index";
import { TreeNode ,ITreeState } from "./sideBar/shared/Tree/types";
import {
  checkNodeReducer,
} from "./sideBar/shared/Tree/allReducer";
import * as viewerAPIProxy from "../backend/viewerAPIProxy";


export enum TreeType {

  VARIABLETREE="VARIABLETREE",
  STEPTREE="STEPTREE",
  DERIVEDTYPETREE="DERIVEDTYPETREE"

}
export type variables = {
  id:string,
  name:string,
  type:string,
  attributes:any
}

export type derivedTypes ={
  id:string,
  title:string,
  generator:string,
}

export type missingVariableSteps = {
id:any[]

}

export type variableTypes = {
  id:string,
  name:string,
  defaultDerived:string,
  derivedTypeIds:[]
}

export type stepVariables = {
  id:string,
  name:string
}

export type selection = {
  variableId:string,
  stepId:string,
  derivedTypeId:string
}

export type caeResultData = {
  variables : variables,
  derivedTypes : derivedTypes,
  missingVariableSteps: missingVariableSteps,
  variableTypes :variableTypes,
  stepVariables :stepVariables,
  selection : selection
}

export interface CAEResultState extends ITreeState {
  data: { [id: string]: TreeNode };
  rootIds: string[];
  caeData:caeResultData;
  variablesRootIds:any[];
  stepsRootIds:any[];
  derivedTypeRootIds:any[];
}

const initialState: CAEResultState = {
  data: {},
  rootIds: [],
  variablesRootIds:[],
  stepsRootIds:[],
  derivedTypeRootIds:[],
  caeData: {
    variables :{id:'',name:'',type:'',attributes:''},
    derivedTypes:{id:'',title:'',generator:''},
    missingVariableSteps:{id:[]},
    variableTypes:{id:'',name:'',defaultDerived:'',derivedTypeIds:[]},
    stepVariables:{id:'',name:''},
    selection:{variableId:'',stepId:'',derivedTypeId:''},
  },

};


export const setCheckedNodesAsync = createAsyncThunk(
  "productTree/setCheckedNodesAsync",
  async (
    data: { toCheck: boolean; nodeId: string; undoable?: boolean },
    { dispatch, getState }
  ) => {

    dispatch(caeResultSlice.actions.checkNode({ ...data }));

  }
);

export const updateStateAsync = createAsyncThunk(
  "caeResult/updateStateAsync",
  async (data: Partial<CAEResultState>, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    const appliedColorMapId = rootState.colormap.appliedColorMapId
    let variableId = appliedColorMapId ==="-1" ? "" : data.caeData?.selection.variableId;
    let stepId = appliedColorMapId ==="-1" ? "" : data.caeData?.selection.stepId;
    let derivedTypeId = appliedColorMapId ==="-1" ? "" : data.caeData?.selection.derivedTypeId.includes(":")?data.caeData?.selection.derivedTypeId.split(":")[1]:data.caeData?.selection.derivedTypeId;

    if (
      variableId && variableId!== '' &&
      stepId &&  stepId !== '' &&
      derivedTypeId &&  derivedTypeId!== ''
    ) {
      viewerAPIProxy
        .applyResult(
          variableId,
          stepId,
          derivedTypeId,
          viewerId
        )
        .then((resp: any) => {
          //console.log(resp);
          dispatch(updateState(data));
        })
        .catch((error: any) => {
          console.error(error);
        });      
    }  
    else{
      dispatch(updateState(data));
      viewerAPIProxy.applyMaterialColor([],viewerId);
    } 
  }
);

export const caeResultSlice  = createSlice({
  name: "caeResult",
  initialState,
  reducers: {

    checkNode: checkNodeReducer,
    
    updateCheckState:(state,action) => {

      const {nodeId,treeType} = action.payload ;

      Object.values(state.data).forEach((item)=> {   

        if(item.treeType === treeType ) {

            if(item.id === nodeId) {

              item.state.checked = true;
    
            }
            else {
    
              item.state.checked = false;
            }

        }
      })

    },
    setCAEResult: (state, action) => {

      //console.log("CAE DATA FROM SERVER",action.payload.caeResult);
      if(action.payload.caeResult)
      {
        let caeVariables     = Object.values( action.payload.caeResult.variables);
        let caeStepVariables = Object.values( action.payload.caeResult.stepVariables);
        let caeDerivedType   = Object.values( action.payload.caeResult.derivedTypes);
        let caeVariableTypes = Object.values( action.payload.caeResult.variableTypes);
        let caeSelection:selection  = action.payload.caeResult.selection;
        state.caeData.missingVariableSteps =  action.payload.caeResult.missingVariableSteps;

        let variablesAssign:any        = {};
        let variablesTree:any          = {};

        let stepVariablesAssign:any    = {};
        let stepVariablesTree:any      = {};

        let derivedTypeAssign:any      = {};
        let derivedTypeTree:any        = {};

        let caeVariableTypesAssign:any = {};
        let caeSelectionAssign:any     = {};

        let missingVariableAssign:any  = {};



        // cae variables Assign to redux
        caeVariables.forEach((data:any)=> {

          let dataCopy = {...data}

          dataCopy.id = dataCopy.id;

          variablesAssign[dataCopy.name] = dataCopy;


        })
        state.caeData.variables = variablesAssign ;

        // generate caeVariableTree using caeData
        Object.values(state.caeData.variables).forEach((data:any)=> {

              let dataCopy = {...data}
              dataCopy.id = dataCopy.id;
              dataCopy.pid =TreeType.VARIABLETREE;
              dataCopy.children =[];
              dataCopy.title = data.name;
              dataCopy.state = {checked:false,expanded:false,highlighted:false,selected:false,visibility:true,partiallyChecked: false,disable:false};
              dataCopy.type = dataCopy.type;
              dataCopy.type = dataCopy.type;
              dataCopy.attributes = dataCopy.attributes;
              dataCopy.treeType = TreeType.VARIABLETREE
              variablesTree[dataCopy.id] = dataCopy;
              state.variablesRootIds.push(dataCopy.id);
            
        })     

        // cae Stepsvariables Assign to redux

        caeStepVariables.forEach((data:any)=> {

          let dataCopy = {...data}

          dataCopy.id = dataCopy.id;

          stepVariablesAssign[dataCopy.name] = dataCopy;


        })      
        state.caeData.stepVariables = stepVariablesAssign;

        // generate stepVariableTree using caeData

        Object.values(state.caeData.stepVariables).forEach((data:any)=> {

          let dataCopy = {...data}
          let checked = false

          dataCopy.id = dataCopy.id;
          dataCopy.pid = TreeType.STEPTREE;
          dataCopy.children =[];
          dataCopy.title = data.name;
          dataCopy.treeType = TreeType.STEPTREE;
          if(dataCopy.name === caeSelection.stepId)
          checked = true;
          dataCopy.state = {checked:checked,expanded:false,highlighted:false,selected:false,visibility:true,partiallyChecked: false,disable:false};
          if(dataCopy.name === "") {
            dataCopy.name="noname";
            dataCopy.title = "noname";

          }        
          stepVariablesTree[dataCopy.id] = dataCopy;
          state.stepsRootIds.push(dataCopy.id);      

        })      


        // cae variableTypes Assign
          
        caeVariableTypes.forEach((data:any)=> {

          let dataCopy = {...data}

          dataCopy.id = dataCopy.id;

          caeVariableTypesAssign[dataCopy.name] = dataCopy;


        })
        state.caeData.variableTypes  = caeVariableTypesAssign;

        // cae derivedType Assign

        caeDerivedType.forEach((data:any)=> {

          let dataCopy = {...data}

          dataCopy.id = dataCopy.id;

          derivedTypeAssign[dataCopy.name] = dataCopy;

        })
        state.caeData.derivedTypes  = derivedTypeAssign;

        // generate derivedTypeTree using caeData      

        Object.values(state.caeData.variableTypes).forEach((data:any) => {
          let obj:any = {...data};
          obj.id = obj.id;
          obj.title = obj.name;
          obj.state = {checked:false,expanded:true,highlighted:false,selected:false,visibility:true,partiallyChecked: false,disable:false};
          obj.children = [];
          obj.pid = TreeType.DERIVEDTYPETREE;
          obj.treeType = TreeType.DERIVEDTYPETREE;
          obj.derivedTypeIds.forEach((derivedTypeId:string)=>{

            let derivedTypes =  (state.caeData.derivedTypes) as any ;
            let filterItem:any =  Object.values(state.caeData.derivedTypes).filter((item:any)=>{

              return item.generator === derivedTypeId

            })


            if(filterItem[0]) {
              let checked = false;
              let node:any = {...filterItem[0]};
              //node.id = nextId(obj.id+"id-");
              node.id = obj.id+":"+node.generator;
              node.pid = obj.id;
              node.title = node.name;
              node.treeType = TreeType.DERIVEDTYPETREE;
              if(caeSelection.derivedTypeId === node.generator)
              checked = true;
              node.state = {checked:checked,expanded:true,highlighted:false,selected:false,visibility:true,partiallyChecked: false,disable:false};
              node.children = []; 
              obj.children.push(node.id);
              derivedTypeTree[node.id]= node;
            }
                
          });
          derivedTypeTree[obj.id]= obj;
          state.derivedTypeRootIds.push(obj.id);

        });

        // cae missingVariableStepsData Assign to redux

        // Selection
        caeSelectionAssign.variableId = caeSelection.variableId;
        caeSelectionAssign.stepId = caeSelection.stepId;
        caeSelectionAssign.derivedTypeId = caeSelection.derivedTypeId;

        state.caeData.selection = caeSelectionAssign;

        // Assigning all values to data
        state.data = {...variablesTree, ...stepVariablesTree, ...derivedTypeTree};
      
    }
  
    },
    setVariableId:(state , action) => {
      state.caeData.selection.variableId = action.payload;
    },
    setStepsId:(state , action) => {
      state.caeData.selection.stepId = action.payload;
    },
    setDerivedTypeId:(state , action) => {
      state.caeData.selection.derivedTypeId = action.payload;
    },
    updateState:(state,action) => {
      const {caeData} = action.payload;
      state.caeData.selection.variableId = caeData.selection.variableId === '' ? undefined : caeData.selection.variableId;
      state.caeData.selection.derivedTypeId = caeData.selection.derivedTypeId === '' ? undefined :caeData.selection.derivedTypeId;
      state.caeData.selection.stepId = caeData?.selection.stepId === '' ? undefined : caeData?.selection.stepId;

    }
    
  },

});

export const {

  setCAEResult,
  checkNode,
  updateCheckState,
  setVariableId,
  setStepsId,
  setDerivedTypeId,
  updateState
} = caeResultSlice.actions;

export const SelectCAEResult = (state:RootState) => {
  return state.caeResult.caeData
};

export const SelectCAEVariable = (state:RootState) => {

   let caeVariable:any={};

  Object.values(state.caeResult.data).forEach((item)=>{

    if(item.treeType === TreeType.VARIABLETREE) {

      caeVariable[item.id]= item;
    }


  })

  return caeVariable;

}

export const SelectCAEVariableRootIds = (state:RootState) => {

  return state.caeResult.variablesRootIds;
}
export const SelectCAEStepsVariable = (state:RootState) => {

  let stepVariable:any={};
  let missingVariables:any[] = [];

  Object.entries(state.caeResult.caeData.missingVariableSteps).find(([key, value]) => {
    if (key === state.caeResult.caeData.selection.variableId) {

      value.forEach((item)=>{
        missingVariables.push(item);

      })
      
    }
  
  });

  Object.values(state.caeResult.data).forEach((item)=> {

    if(item.treeType === TreeType.STEPTREE) {

      // if(!missingVariables.includes(item.id)){

        
      // }
      stepVariable[item.id]= item;

      // missingVariables.forEach((stepValues)=>{

      //   if(item.id !== stepValues) {

          

      //   }

      // })

    }

  })

 return stepVariable;

} 

export const SelectCAEStepsVariableRootIds = (state:RootState) => {

  return state.caeResult.stepsRootIds;
}
export const SelectCAEDerivedType = (state:RootState) => {

  let derivedType:any={};

  Object.values(state.caeResult.data).forEach((item)=>{

    if(item.treeType === TreeType.DERIVEDTYPETREE) {

      derivedType[item.id]= item;
    }


  })

 return derivedType;


}

export const SelectCAEDerivedTypeRootIds =(state:RootState)=>{

  return state.caeResult.derivedTypeRootIds;

}

export const SelectAppliedVariableName = (state:RootState) => {

  return state.caeResult.caeData.selection.variableId;

}

export const SelectAppliedDerivedTypeIdName = (state:RootState) => {

  let selectedDrivedTypeName:string=''
  Object.values(state.caeResult.caeData.derivedTypes).forEach((data:any)=> {

    if(data.generator === state.caeResult.caeData.selection.derivedTypeId) {
      
      selectedDrivedTypeName = data.name;
    }

  })

  return selectedDrivedTypeName;

}

export const SelectAppliedDerivedTypeGenerator = (state:RootState) => {

  return state.caeResult.caeData.selection.derivedTypeId;

}
export const SelectAppliedStepIdName = (state:RootState) => {

  return state.caeResult.caeData.selection.stepId;

}

export const SelectCAEData =(state:RootState)=> {

   return state.caeResult.data;
}

export const caeSelection=(state:RootState)=> {

  return state.caeResult.caeData.selection;
}

export const selectCaeVariableType = (state:RootState)=> {

 return state.caeResult.caeData.variableTypes;
}

export default caeResultSlice.reducer;