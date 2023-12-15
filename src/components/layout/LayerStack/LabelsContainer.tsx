import React from 'react'
import Label3DWindowLayer from "../../sideBarContents/labels/components/Label3DWindowLayer"
import MeasurementWindowLayer from "../../sideBarContents/labels/components/MeasurementWindowLayer"
import Label2DWindowLayer from "../../sideBarContents/labels/components/Label2DWindowLayer"
import Chart3dWindowLayer from '../../sideBarContents/labels/components/Chart3dWindowLayer'
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
import LogoWindow from "../../../components/layout/logoWindow";
import ChartWindowLayer from 'components/sideBarContents/labels/components/ChartWindowLayer';
import AxisTriadWindow from "../../../components/sideBarContents/scene/components/AxisTriadWindow";
import FloatingToolbarWindow from 'components/sideBarContents/ToolBar/components/FloatingWindow'
interface Label3DContainerProps {
    parentRef: any
}
function Label3DContainer(props:Label3DContainerProps) {
    const layer = Layers.FRONT;
    return (
        <Layer id={layer}>
        <FloatingToolbarWindow parentRef={props.parentRef} layerId={layer}/>
        <Label3DWindowLayer parentRef={props.parentRef} layerId={layer} /> 
        <MeasurementWindowLayer parentRef={props.parentRef} layerId={layer} />
        <Label2DWindowLayer parentRef={props.parentRef} layerId={layer} />
        <LogoWindow parentRef={props.parentRef} layerId={layer} />
        <ChartWindowLayer parentRef={props.parentRef} layerId={layer} />
        <Chart3dWindowLayer parentRef={props.parentRef} layerId={layer} />
        <AxisTriadWindow parentRef={props.parentRef} layerId={layer}/>
        
        </Layer>
    )
}

export default Label3DContainer
