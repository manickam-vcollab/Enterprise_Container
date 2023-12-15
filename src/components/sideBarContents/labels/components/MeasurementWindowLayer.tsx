import {  selectLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import useHideOnRotate from './shared/hooks/useHideOnRotate'; 
import Label3D from './Label3D';
import { Layers } from 'store/windowMgrSlice';
import { LabelType ,Label3DType } from 'store/sideBar/labelSlice/shared/types';
interface Props {
    parentRef:any,
    layerId:Layers
}
function MeasurementWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(selectLabelData);
    useHideOnRotate({
        labelTree,
        setLabelPosReducer: setLabelPos,
        toggleVisibilityReducer: toggleVisibility
    })

    return (
        <>{
            [...Object.values(labelTree)].map( label => {
                return label.labelType === LabelType.MEASUREMENT &&
                !label.pid?.includes(Label3DType.ARC) && !label.pid?.includes(Label3DType.DISTANCE) 
                 ? <Label3D 
                key = {label.id}
                layerId={props.layerId}
                windowPrefixId={windowPrefixId}
                label = {label}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default MeasurementWindowLayer
