import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
// import { useAppSelector, useAppDispatch } from "../../store/storeHooks";
import * as viewerAPIProxy from "../../backend/viewerAPIProxy";

export type contourplotState = {
  caeResult: any | null;
  selectedVariableId: string | null;
  selectedDerivedTypeId: string | null;
  selectedStepId: string | null;
};

const initialState: contourplotState = {
  caeResult: null,
  selectedVariableId: "",
  selectedDerivedTypeId: "",
  selectedStepId: "",
};

export const contourplotSlice = createSlice({
  name: "contourplot",
  initialState,
  reducers: {
    setCAEResult: (state, action) => {
      state.caeResult = action.payload.caeResult;
    },
    setSelectedData: (state, action) => {
      state.selectedVariableId = action.payload.selectedVariableId;
      state.selectedDerivedTypeId = action.payload.selectedDerivedTypeId;
      state.selectedStepId = action.payload.selectedStepId;
    },
    // updateState: (state, action: PayloadAction<Partial<contourplotState>>) => {
    updateState: (state, action) => {
      // state.caeResult = action.payload.caeResult;
      // state.selectedVariableId = action.payload.selectedVariableId;
      // state.selectedDerivedTypeId = action.payload.selectedDerivedTypeId;
      // state.selectedStepId = action.payload.selectedStepId;
      state.caeResult.selection.variableId = action.payload.selectedVariableId === '' ? undefined : action.payload.selectedVariableId;
      state.caeResult.selection.derivedTypeId = action.payload.selectedDerivedTypeId === '' ? undefined : action.payload.selectedDerivedTypeId;
      state.caeResult.selection.stepId = action.payload.selectedStepId === '' ? undefined : action.payload.selectedStepId;
    },

    // updateState2: (state, action) => {
    //   state.caeResult.selection.variableId = action.payload.selectedVariableId;
    //   state.caeResult.selection.derivedTypeId =
    //     action.payload.selectedDerivedTypeId;
    //   state.caeResult.selection.stepId = action.payload.selectedStepId;
    // },
  },
});

export const updateStateAsync = createAsyncThunk(
  "contourplot/updateStateAsync",
  async (data: Partial<contourplotState>, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];

    if (
      data.selectedVariableId && data.selectedVariableId !== '' &&
      data.selectedStepId && data.selectedStepId !== '' &&
      data.selectedDerivedTypeId &&  data.selectedDerivedTypeId !== ''
    ) {
      viewerAPIProxy
        .applyResult(
          data.selectedVariableId,
          data.selectedStepId,
          data.selectedDerivedTypeId,
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

export const { setCAEResult, setSelectedData, updateState } =
  contourplotSlice.actions;

export const SelectCAEResult = (state: RootState) => {
  return state.contourplot.caeResult;
};

export default contourplotSlice.reducer;
