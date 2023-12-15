//import {  selectLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/labelAllSlice';
import {  selectLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import useHideOnRotate from './shared/hooks/useHideOnRotate'; 
import Label3D from './Label3D';
import { Layers } from 'store/windowMgrSlice';
import { Label3DType, LabelType } from 'store/sideBar/labelSlice/shared/types';

interface Props {
    parentRef:any,
    layerId:Layers
}
function Label3DWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(selectLabelData);
    useHideOnRotate({
        labelTree,
        setLabelPosReducer: setLabelPos,
        toggleVisibilityReducer: toggleVisibility
    })

    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                return label3D.labelType === LabelType.LABEL3D &&
                       label3D.pid !== Label3DType.PROBE && (label3D.title !== `Probe`) && (label3D.title !== `Hotspot`)  && label3D.pid !== Label3DType.FACE ?<Label3D 
                key = {label3D.id}
                layerId={props.layerId}
                windowPrefixId={windowPrefixId}
                label = {label3D}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Label3DWindowLayer
