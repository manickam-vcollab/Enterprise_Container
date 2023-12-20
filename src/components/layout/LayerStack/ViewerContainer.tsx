import React ,{useState} from 'react'
import Viewer from "../../viewer"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
import Viewercontainer  from '../../../components/container/index';
interface ViewerContainerProps {
    parentRef: any
}
function ViewerContainer(props:ViewerContainerProps) {
    const [viewerId, setviewerId] = useState(""); 

    return (
        <Layer id={Layers.VIEWER}>
            <Viewercontainer viewerId = { viewerId }>
                <Viewer  onLoad = { setviewerId } />
            </Viewercontainer>
     {/* <Viewer /> */}
        </Layer>
    )
}

export default ViewerContainer
