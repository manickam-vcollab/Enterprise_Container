// import {  selectLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/labelAllSlice';
import {  selectLabelData, setLabelPos, toggleVisibility, windowPrefixId, windowPrefixIdChart  } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import useHideOnRotate from './shared/hooks/useHideOnRotate'; 
import { Layers } from 'store/windowMgrSlice';
import { Label3DType, LabelChartType, LabelType } from 'store/sideBar/labelSlice/shared/types';
import Chart3D from './Chart3d';


interface Props {
    parentRef:any,
    layerId:Layers
}
function Chart3dWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(selectLabelData);
    useHideOnRotate({
        labelTree,
        setLabelPosReducer: setLabelPos,
        toggleVisibilityReducer: toggleVisibility
    })
    return (
        <>{
            [...Object.values(labelTree)].map(chart3D => {
                return (chart3D.labelType === LabelType.LABELCHART && chart3D.title.includes("N:3D") )? <Chart3D 
                key = {chart3D.id}
                layerId={props.layerId}
                windowPrefixId={windowPrefixId}
                label = {chart3D}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Chart3dWindowLayer
