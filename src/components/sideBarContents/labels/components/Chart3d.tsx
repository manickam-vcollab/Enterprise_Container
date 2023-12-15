import React,{useRef,useEffect} from 'react'
import ReactDOM from 'react-dom';
import { Label3D as ILabel3D } from '../../../../store/sideBar/labelSlice/shared/types'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { Layers, setWindowSize } from '../../../../store/windowMgrSlice';
import Window from 'components/shared/CustomWindow';
import LabelAnchor from './shared/LabelAnchor';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Xarrow, {useXarrow} from 'react-xarrows';
import LineChart from 'components/shared/lineChart';
import { lastThreeLineChartData } from '../../../shared/lineChart/data';
import { selectLine3DChartData, selectLine3DChartEditData, set3DChartPid, chartIdAndPidInfo } from 'store/chart3DSlice';
// import * as Sqrl from 'squirrelly'




type Label3DProps = {
    label:ILabel3D,
    windowPrefixId:string,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
        anchor?: [number, number];
    }, string>,
    parentRef: any,
    layerId:Layers
}

// const getSQRLObj = (label:ILabel3D) => {
//     return {
//         nodeId: (options:any) => label.probeData +" "+ options.id,
//         options: {id: ''}
//     }
// }

function Chart3D(props:Label3DProps) {
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const childRef = useRef<any | null>(null);
    const viewerDivRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const updateArrow = useXarrow();

    const label = props.label;
    const chartDataList = useAppSelector(selectLine3DChartData);
    const chartEditDataList = useAppSelector(selectLine3DChartEditData);
    const chartIdAndPidInfoN = useAppSelector(chartIdAndPidInfo);

    const chartEditDataFetched = (chartEditDataList && chartEditDataList.length>0) ? (chartEditDataList.find((e) => e.pid === chartIdAndPidInfoN[label.pid].pid)) : null ;

    const handleWindowDrag = (e:any,data:any) => {
        let l = props.label;
        let a = l.anchor;
        let newPos:[number,number] = [Math.max(0,l.pos[0] + data.deltaX),Math.max(0,l.pos[1]+data.deltaY)];
        dispatch(props.setLabelPosReducer({id: l.id,pos:newPos, anchor:a}));
        //updateArrow();
    }
    const handleWindowDragStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
        //updateArrow();
    }
    const handleWindowResize = () => {
        // console.log("resize")
        //updateArrow();
    }
    const handleWindowResizeStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
        //updateArrow();
    }
    useEffect(() => {
        let viewerDiv = document.getElementById("windows_container"+Layers.VIEWER);
        viewerDivRef.current = viewerDiv as HTMLDivElement;

        if(!(chartData?.pid) && label.pid){dispatch(set3DChartPid({id:label.id, pid:label.pid}))}

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        if(childRef.current) {
            const div = childRef.current as HTMLDivElement;
            dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth+2,div.clientHeight+2]}));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[childRef])
    useEffect(() => {
        updateArrow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.label.anchor,props.label.pos])

    function filterChartData(data:any,id:string){
        const dataObj = data?.find( (d:any) => d.id === id)
        return dataObj ? dataObj.lineChartData : lastThreeLineChartData
    }

    const chartData = filterChartData(chartDataList,label.id)

    return (
        
        < >
            {
                viewerDivRef.current ?
                ReactDOM.createPortal(
                <LabelAnchor ref={startRef} pos={label.anchor} visible={label.state.visibility ? true :false} />,
                viewerDivRef.current)
                :null
            }
            
                <Window
                layer={props.layerId}
                ref={endRef} 
                uid={props.windowPrefixId+label.id} 
                visible={label.state.visibility ? true : false}
                width={childRef?.current?.clientWidth | 350} 
                height={childRef?.current?.clientHeight | 275} 
                resize 
                parentRef={props.parentRef}
                xy={label.pos}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop} 
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop}
                autoPositionOnResize = {false}
                >
                    
                    {label.state.visibility && (  <LineChart ref={childRef} imageStyle={label.imageStyle} LabelId= {label.id} lineChartData = {chartData} chartTitleFected={chartEditDataFetched?.chartTitle} chartXAxistTitleFected={chartEditDataFetched?.xAxisTitle} chartYAxistTitleFected={chartEditDataFetched?.yAxisTitle} chartBackgroundImage={label.file} isActive={label.isImageActive} chartBackgroundColor = {label.bgColor} chartFontColor={label.color} chartBorderColor={label.borderColor} />
                    )}</Window> 
                {
                    viewerDivRef.current ?
                ReactDOM.createPortal(
                    <Xarrow 
                start={startRef} 
                showXarrow={label.state.visibility}
                end={endRef} 
                path={'straight'} 
                strokeWidth={2}
                color={'black'}
                tailColor={'yellow'}
                showHead={false} 
                showTail={false}/>,
                viewerDivRef.current
                ):null
                }
                
        </>
    )
}

export default Chart3D
