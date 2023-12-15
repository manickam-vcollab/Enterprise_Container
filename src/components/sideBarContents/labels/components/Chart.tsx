import React,{useRef,useEffect,useMemo} from 'react'
import { LabelChart as ILabelChart, LabelChartType } from '../../../../store/sideBar/labelSlice/shared/types'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { Layers, setWindowSize } from '../../../../store/windowMgrSlice';
import Window from '../../../shared/CustomWindow';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import LineChart from 'components/shared/lineChart';
import { Line, selectLineChartData } from 'store/chartSlice';
import { firstThreeLineChartData } from 'components/shared/lineChart/data';
import { selectLabelData } from 'store/sideBar/labelSlice/AllLabelSlice';


type ChartProps = {
    label:ILabelChart,
    layerId:Layers,
    windowPrefixId:string,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
    }, string>,
    parentRef: any
}

function Chart(props:ChartProps) {

    const childRef = useRef<any | null>(null);
    const dispatch = useAppDispatch();
    const chartDataList = useAppSelector(selectLineChartData);

    const treeDataRedux = useAppSelector(selectLabelData);

    const hiddenChart2DNodesList = useMemo(() => Object.values(treeDataRedux).filter(e => ((e.type === LabelChartType.LINECHART) && (e.pid !== LabelChartType.LINECHART) && (e.pid === props.label.id) && (!e.state.visibility))).map(i => i.id),[treeDataRedux])

    const label = props.label;
    const chartDataFetched = useMemo(() => (chartDataList && chartDataList.length > 0) ? chartDataList.find((e) => e.id === label.id) : null,[chartDataList])
    
    const handleWindowDrag = (e:any,data:any) => {
        let l = props.label;
        let newPos:[number,number] = [Math.max(0,l.pos[0] + data.deltaX),Math.max(0,l.pos[1]+data.deltaY)];
        dispatch(props.setLabelPosReducer({id: l.id,pos:newPos}));
    }
    const handleWindowDragStop = (x:number,y:number) => {
        let l = props.label;
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y]}));
    }
    const handleWindowResize = () => {
        // console.log("resize");
    }
    const handleWindowResizeStop = (x:number,y:number) => {
        let l = props.label;
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y]}));
    }
    useEffect(() => {
        if(childRef.current) {
            const div = childRef.current as HTMLDivElement;
            dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth+2,div.clientHeight+2]}));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[childRef])
    
    let yMin, yMax, yTickValues;
    
    function filterChartData(data:any,id:string){
        const dataObj = data.find( (d:any) => d.id === id)
        yMin = dataObj?.yMin;
        yMax = dataObj?.yMax;
        yTickValues = dataObj?.lineChartData.map((e:any )=> (e.data.map((i:any) => i.y)))[0]
        return dataObj && dataObj.lineChartData
    }

    let chartData:Line[] =useMemo(() => filterChartData(chartDataList,label.id),[chartDataList,label.id])

    if((chartDataList?.length > 0) &&(hiddenChart2DNodesList.length > 0)){
        chartData = chartData.map((e) =>{
            const clone = Object.assign({}, e)
            clone.data = e.data.filter(i =>(i.pointId && !(hiddenChart2DNodesList.includes(i.pointId))))
            return clone;
        })
    }

    const xScale = ((chartDataList?.length > 0) && chartData && (chartData[0]?.data[0]?.x) && (chartData[0]?.data[0]?.y)) ? {type: 'point'} : {type: 'linear', min: 0, max: 1, stacked: false, reverse: false} 
    const yScale = ((chartDataList?.length > 0) && chartData && (chartData[0]?.data[0]?.x) && (chartData[0]?.data[0]?.y)) ? {type: 'linear', min: yMin, max: yMax, stacked: false, reverse: false} : {type: 'linear', min: 0, max: 1, stacked: false, reverse: false}


    // ((chartData?.lineChartData[0]?.data[0]?.x) && (chartData?.lineChartData[0]?.data[0]?.y)) && { xScale ={type: 'point'} yScale = {type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false}} : 

    return (
        < >
                {((chartDataList?.length > 0) && chartData) && <Window
                uid={props.windowPrefixId+label.id} 
                layer={props.layerId}
                visible = {label.state.visibility ? true : false} 
                width={childRef?.current?.clientWidth | 350} 
                height={childRef?.current?.clientHeight | 275} 
                resize 
                parentRef={props.parentRef}
                xy={label.pos}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop}
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop} 
                >
                  {label.state.visibility && (  <LineChart ref={childRef} imageStyle={label.imageStyle} LabelId= {label.id} chartTitleFected ={chartDataFetched?.chartTitle} chartXAxistTitleFected = {chartDataFetched?.xAxisTitle} chartYAxistTitleFected = {chartDataFetched?.yAxisTitle} lineChartData = {chartData} chartXAxisMaxFetched = {10} chartYAxisMaxFetched = {10} xScaleFetched={xScale} yScaleFetched={yScale} yTickValues = {yTickValues} chartBackgroundColor = {label.bgColor} chartFontColor={label.color} chartBorderColor={label.borderColor} chartBackgroundImage={label.file} isActive={label.isImageActive}/>
                
                )}</Window>}
        </>
    )
} 

export default Chart
