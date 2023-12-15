import React,{useRef,useEffect} from 'react'
import ReactDOM from 'react-dom';
import { Label3D as ILabel3D } from '../../../../store/sideBar/labelSlice/shared/types'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { Layers, selectWindowMgr, setWindowSize } from '../../../../store/windowMgrSlice';
import Window from 'components/shared/CustomWindow';
import LabelMsg from './shared/LabelMsg';
import LabelAnchor from './shared/LabelAnchor';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import * as Sqrl from 'squirrelly'


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

const getSQRLObj = (label:ILabel3D) => {
    const floatMax = 3.4028234663852886e+38;
    //console.log(label.probeData);
    let labelMsg = label.probeData;
    let labelNodeId = label.eventData.nodeId;
    let value = Number(labelMsg);
    if(value >= floatMax)
        labelMsg = "NA"
    if(!isNaN(Number(labelMsg)))
        labelMsg = Number(label.probeData).toPrecision(3);   
    return {
        //nodeId: (options:any) => labelMsg + " " + options.id,
        //options: {id: '123'}
        defaultProbe : labelMsg,
        nodeId : "N " + labelNodeId,
        nodeIdWithProbe : "N " + labelNodeId + " : " + labelMsg,
    }
}

function Label3D(props:Label3DProps) {
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const childRef = useRef<any | null>(null);
    const viewerDivRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const updateArrow = useXarrow();
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

    },[])
    // useEffect(() => {
    //     if(childRef.current) {
    //         const div = childRef.current as HTMLDivElement;
    //         dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth+2,div.clientHeight+2]}));
    //     }
    // },[childRef])
    useEffect(() => {
        updateArrow();
    },[props.label.anchor,props.label.pos])
    const label = props.label;
    return (
        
        < >
            {
                viewerDivRef.current ?
                ReactDOM.createPortal(
                <LabelAnchor ref={startRef} pos={label.anchor} visible={label.state.visibility && label.attachPartVisibility ? true :false} />,
                viewerDivRef.current)
                :null
            } 
            
                <Window
                layer={props.layerId}
                ref={endRef} 
                uid={props.windowPrefixId+label.id} 
                visible={label.state.visibility ? true : false}
                width={label.size[0]} 
                height={label.size[1]} 
                resize 
                parentRef={props.parentRef}
                xy={label.pos}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop}
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop}
                autoPositionOnResize = {false}
                anchor={label.anchor}
                >
                    
                    
                    {label.state.visibility && label.attachPartVisibility && (<LabelMsg ref={childRef} 
                    msg={Sqrl.render(label.label,getSQRLObj(label),{useWith:true})}
                    bgColor={label.bgColor}  imageStyle={label.imageStyle} fontColor={label.color}  borderColor={label.borderColor} bgImage={label.file}  isImageActive={label.isImageActive}
                    />)}
                </Window>
                {
                    viewerDivRef.current ?
                ReactDOM.createPortal(
                    <Xarrow 
                start={startRef} 
                showXarrow={label.state.visibility && label.attachPartVisibility}
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

export default Label3D
