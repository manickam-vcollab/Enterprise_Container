import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
//import { data, firstThreeLineChartData, lastThreeLineChartData } from 'components/shared/lineChart/data';
import { Label3D } from './sideBar/labelSlice/AllLabelSlice/shared/types';
import { RootState } from 'store';

export type Coordinates = {
    pointId?:string,
    x:number | string | null,
    y:number | string | null,
}

export type Line = {
    id?:string,
    color?:string,
    data:Coordinates[],
    // data:[]
}
export type LineChartList = {
    id:string,
    chartTitle?:string,
    xAxisTitle?:string,
    yAxisTitle?:string,
    yMin?:number,
    yMax?:number,
    lineChartData:Line[],    
}

export type ChartData = {
    lineChartDataList:LineChartList[]
}

const initialState: ChartData = {
    lineChartDataList:[]
}

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setChartData: (state:any, action: PayloadAction<{id:string, lineChartData:Line[]}>) => {
            // if(!(state.lineChartDataList.find( i => i.id === action.payload.id))){
            //     state.lineChartDataList.push(action.payload);
            // }
            if (action.payload.id && action.payload.lineChartData){
                state.lineChartDataList.push(action.payload);
            }
        },
        setChartTitle:(state:any, action: PayloadAction<{id:string, chartTitle:string}>) => {
            const id = action.payload.id;
            const chartTitle = action.payload.chartTitle;

            if(id){
                state.lineChartDataList.forEach((e:LineChartList) => {if(e.id === id){e.chartTitle = chartTitle}})
            } 
        },
        setChartXAxisTitle:(state:any, action: PayloadAction<{id:string, xAxisTitle:string}>) => {
            const id = action.payload.id;
            const xAxisTitle = action.payload.xAxisTitle;

            if(id){
                state.lineChartDataList.forEach((e:LineChartList) => {if(e.id === id){e.xAxisTitle = xAxisTitle}})
            } 
        },
        setChartYAxisTitle:(state:any, action: PayloadAction<{id:string, yAxisTitle:string}>) => {
            const id = action.payload.id;
            const yAxisTitle = action.payload.yAxisTitle;

            if(id){
                state.lineChartDataList.forEach((e:LineChartList) => {if(e.id === id){e.yAxisTitle = yAxisTitle}})
            } 
        },
        setCoOrdinate:(state:any, action: PayloadAction<{id:string, lineId?:string ,pointId:string, x:number|string, y:number}>) => {

            const {id, lineId, pointId, x, y} = action.payload;
            const coOrdinate:Coordinates = {pointId,x,y};

            if(id && pointId && x &&y ){
                // const pushCoOrdinatesToLine =(i:LineChartList) => (lineId)? i.lineChartData.forEach((e:Line) => {(e.id === lineId) && e.data.push(coOrdinate) }) : i.lineChartData[0].data.push(coOrdinate);  //without checking weather co-ordinate values for x&y axis at begining are null
                const pushCoOrdinatesToLine =(i:LineChartList) => (lineId)? i.lineChartData.forEach((e:Line) => {(e.id === lineId) && ((e.data[0].x && e.data[0].y) ? e.data.push(coOrdinate) : e.data[0] = coOrdinate) }) :((i.lineChartData[0].data[0].x && i.lineChartData[0].data[0].y) ? i.lineChartData[0].data.push(coOrdinate) : i.lineChartData[0].data[0] = coOrdinate); // with null checks for x&y co-ordinate values at 0th position
                state.lineChartDataList.forEach((e:LineChartList) => {
                    if(e.id === id){
                        pushCoOrdinatesToLine(e);
                        // storing min & max values for Y-axis
                        ((e.yMin !== null) && (e.yMin !== undefined)) ? ( (y < e.yMin ) && (e.yMin = y)) : e.yMin = y;
                        ((e.yMax !== null) && (e.yMax !== undefined)) ? ( (y > e.yMax) && (e.yMax = y) ) : e.yMax = y;
                    }
                })
            }

            //in much more understandable way.
            // if(id && pointId && x && y){
            //     const pushCoOrdinatesToLine  = (i:LineChartList) => {
            //         if(lineId){
            //             i.lineChartData.forEach((ele:Line) => {
            //                 if(ele.id === lineId){
            //                     (ele.data[0].x && ele.data[0].y) ? ele.data.push(coOrdinate) : ele.data[0] = coOrdinate;
            //                 }
            //             })
            //         } else {
            //             ((i.lineChartData[0].data[0].x && i.lineChartData[0].data[0].y) ? i.lineChartData[0].data.push(coOrdinate) : i.lineChartData[0].data[0] = coOrdinate);
            //         }
            //     }
            //     state.lineChartDataList.forEach((e:LineChartList) => {
            //         if(e.id === id){
            //             pushCoOrdinatesToLine(e);

            //             // storing min & max values for Y-axis
            //             if((e.yMin !== null) && (e.yMin !== undefined)){
            //                 if(y<e.yMin){
            //                     e.yMin = y
            //                 }
            //             }else{
            //                 (y<0) ? (e.yMin = y) : (e.yMin = 0)
            //             }

            //             if((e.yMax !== null) && (e.yMax !== undefined)){
            //                 if(y>e.yMax){
            //                     e.yMax = y
            //                 }
            //             }else{
            //                 (y>1) ? (e.yMax = y) : (e.yMax = 1)
            //             }
            //         }
            //     })
            // }
        },
        deleteCoOrdinate:(state:any, action: PayloadAction<{pid:string, lineId?:string, pointId:string}>) => {
            const {pid,pointId} = action.payload;

            if(pid && pointId){
                state.lineChartDataList.forEach((e:LineChartList) =>{(e.id === pid)&& e.lineChartData.forEach((i) => {i.data = i.data.filter((c) => c.pointId !== pointId)})} )
            }
        },
        deleteLineChartData:(state:any, action: PayloadAction<{id:string}>) => {
            const id = action.payload.id;
            (id) && (state.lineChartDataList = state.lineChartDataList.filter((e:LineChartList) => e.id !== id))
        },
        deleteAllLineChartData:(state:any, action: PayloadAction<any>) => {
            state.lineChartDataList = [];
        },
        updateAllLineChartData:(state:any, action: PayloadAction<any>) => {
            const data = action.payload;
            (data) && (state.lineChartDataList = data.chartState.lineChartDataList);
        }
    }
});

 
export const  deleteAllLineChartDataAsync = createAsyncThunk(
    "chart/deleteAllLineChartDataAsync",
    async (data: any, { dispatch, getState }) => {
        await dispatch(deleteAllLineChartData({})); 
});

 
export const  updateAllLineChartDataAsync = createAsyncThunk(
    "chart/updateAllLineChartDataAsync",
    async (data: any, { dispatch, getState }) => {
        let dataCloned = JSON.parse(JSON.stringify(data)); 
        const rootState = getState() as RootState;
        let labelData =  rootState.label.data;  
        dataCloned.chartState.lineChartDataList.forEach((label :any,index : number) =>{
            //dataCloned.chartState.lineChartDataList[index].yMax = 10;
            //dataCloned.chartState.lineChartDataList[index].yMin = 0;
            dataCloned.chartState.lineChartDataList[index].lineChartData.forEach((item : any, index2 : number)=>{
                dataCloned.chartState.lineChartDataList[index].lineChartData[index2].data.forEach((point : any, index3 : number)=>{
                    if(point.pointId in labelData)
                    {
                        let label = labelData[point.pointId] as Label3D;
                        if(label?.probeData)
                            dataCloned.chartState.lineChartDataList[index].lineChartData[index2].data[index3].y = label.probeData;
                    }
                  
                })
            })
        })

        await dispatch(updateAllLineChartData(dataCloned)); 
});

export const {setChartData, setChartTitle, setChartXAxisTitle, setChartYAxisTitle, setCoOrdinate, deleteCoOrdinate, deleteLineChartData, deleteAllLineChartData, updateAllLineChartData} = chartSlice.actions;

export const selectLineChartData = (state:RootState) => state.chart.lineChartDataList;

export default chartSlice.reducer;