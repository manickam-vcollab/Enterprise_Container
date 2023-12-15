import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type Coordinates = {
    x:number,
    y:number,
}

export type Line = {
    id:string,
    color?:string,
    data:Coordinates[],
    // data:[]
}
export type LineChartList = {
    id:string,
    pid?:string,
    chartTitle?:string,
    xAxisTitle?:string,
    yAxisTitle?:string,
    lineChartData?:Line[]
}

export type editData = {
    pid:string,
    chartTitle?:string,
    xAxisTitle?:string,
    yAxisTitle?:string
}

export type ChartData = {
    lineChartDataList:LineChartList[],
    editDataList?:editData[]
}

const initialState: ChartData = {
    lineChartDataList:[],
    editDataList:[]
}

export const chart3DSlice = createSlice({
    name: 'chart3D',
    initialState,
    reducers: {
        set3DChartData: (state:any, action: PayloadAction<{id:string, pid?:string, chartTitle?:string, xAxisTitle?:string, yAxisTitle?:string, lineChartData:Line[]}>) => {
            // if(!(state.lineChartDataList.find( i => i.id === action.payload.id))){
            //     state.lineChartDataList.push(action.payload);
            // }

            if (action.payload.id && action.payload.lineChartData){
                state.lineChartDataList.push(action.payload);
            }
        },
        set3DChartPid: (state:any, action:PayloadAction<{id:string, pid:string}>) => {
            const id = action.payload.id;
            const pid = action.payload.pid;
            if(id && pid){
                state.lineChartDataList.forEach((item:LineChartList) => {if(item.id === id && (!(item.pid))) {item.pid = pid}})
            }
        },
        set3DChartTitle: (state:any, action: PayloadAction<{pid:string, chartTitle:string, xAxisTitle?:string, yAxisTitle?:string }>) => {
            const pid = action.payload.pid;
            const chartTitle = action.payload.chartTitle;

            if (pid){

                (state.editDataList?.some((item:editData) => item.pid===pid)) ? state.editDataList.forEach((item:editData) => {if(item.pid ===pid){item.chartTitle = chartTitle}}) : state.editDataList.push(action.payload)
                
                // state.lineChartDataList.forEach((item:LineChartList) => {if(item.pid === pid){item.chartTitle = chartTitle}})
            }
        }, 
        set3DChartXAxisTitle: (state:any, action: PayloadAction<{pid:string, xAxisTitle:string, chartTitle?:string, yAxisTitle?:string }>) => {
            const pid = action.payload.pid;
            const xAxisTitle = action.payload.xAxisTitle;

            if (pid){

                (state.editDataList?.some((item:editData) => item.pid===pid)) ? state.editDataList.forEach((item:editData) => {if(item.pid === pid){item.xAxisTitle = xAxisTitle}}) : state.editDataList.push(action.payload)

                // state.lineChartDataList.forEach((item:LineChartList) => {if(item.pid === action.payload.pid){item.xAxisTitle = action.payload.xAxisTitle}})
            }
        },
        set3DChartYAxisTitle: (state:any, action: PayloadAction<{pid:string, yAxisTitle:string, chartTitle?:string, xAxisTitle?:string }>) => {
            const pid = action.payload.pid;
            const yAxisTitle = action.payload.yAxisTitle;

            if (pid){

                (state.editDataList?.some((item:editData) => item.pid===pid)) ? state.editDataList.forEach((item:editData) => {if(item.pid === pid){item.yAxisTitle = yAxisTitle}}) : state.editDataList.push(action.payload)

                // state.lineChartDataList.forEach((item:LineChartList) => {if(item.pid === pid){item.yAxisTitle = yAxisTitle}})
            }
        },
        delete3DChartData: (state:any, action: PayloadAction<{id:string}>) => {
            const id = action.payload.id;
            state.lineChartDataList = state.lineChartDataList.filter((e:LineChartList) => e.id !== id)
        //   if(pid){state.editDataList = state.editDataList.filter((e:editData) => e.pid !== pid)}
        },
        delete3DChartEditData: (state:any, action: PayloadAction<{pid:string}>) =>{
            state.editDataList = state.editDataList.filter((e:editData) => e.pid !== action.payload.pid)
        },
        deleteAllLineChartData:(state:any, action: PayloadAction<any>) => {
            state.lineChartDataList = [];
            state.editDataList = [];
        },
        updateAllLineChartData:(state:any, action: PayloadAction<any>) => {
            const data = action.payload;
            if(data){
                state.lineChartDataList = data.chart3DState.lineChartDataList;
                state.editDataList = data.chart3DState.editDataList;
            }
        }
    }
});

export const  deleteAllLineChartDataAsync = createAsyncThunk(
    "chart3D/deleteAllLineChartDataAsync",
    async (data: any, { dispatch, getState }) => {
        await dispatch(deleteAllLineChartData({})); 
});

 
export const  updateAllLineChartDataAsync = createAsyncThunk(
    "chart3D/updateAllLineChartDataAsync",
    async (data: any, { dispatch, getState }) => {
        await dispatch(updateAllLineChartData(data)); 
});


export const {set3DChartData,set3DChartPid,set3DChartTitle,set3DChartXAxisTitle,set3DChartYAxisTitle, delete3DChartData, delete3DChartEditData,deleteAllLineChartData, updateAllLineChartData } = chart3DSlice.actions;

export const selectLine3DChartData = (state:RootState) => state.chart3D.lineChartDataList;

export const selectLine3DChartEditData = (state:RootState) => state.chart3D.editDataList;

export const chartIdAndPidInfo = (state:RootState) => state.label.data

export default chart3DSlice.reducer;