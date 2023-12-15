import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'

import {Layers, selectWindowSize} from 'store/windowMgrSlice'

import { setEditMode , selectWindowMgr} from 'store/windowMgrSlice';

import CustomWindow from "components/shared/CustomWindow";
import Legend from "components/shared/colorPlot/legend";

import { selectcolormapData, selectShowAxis,selectLegendEnabled } from "store/sideBar/colormapSlice";


export const  windowId = "colorPlotWindow";

interface Props {
    parentRef: any,
    layerId:Layers
}


function ColorPlotdWindow(props:Props) {

    //const colorMapData = useAppSelector(selectcolormapData);
    const showAxis = useAppSelector(selectShowAxis);
    const isLgendEnabled = useAppSelector(selectLegendEnabled);
    //const appliedColorMapId = useAppSelector(state => state.colormap.appliedColorMapId);
   // const selectWindowManager = useAppSelector(selectWindowMgr).windows[windowId];

    //const dispatch = useAppDispatch();

    return (

            <CustomWindow 
            uid={windowId}
            layer={props.layerId}
            visible={showAxis}
            resize={true} 
            parentRef = {props.parentRef} 
            xy = {[0, 200]}
            width={200} 
            height={300} >
                {    
                 isLgendEnabled ?  <Legend ></Legend> :null
                }
            </CustomWindow>
            
    )
}

export default ColorPlotdWindow