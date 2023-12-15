import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef,  useState, forwardRef } from 'react'
import { Rnd, DraggableData  } from 'react-rnd'
import { useResizeDetector } from 'react-resize-detector';
import clsx from 'clsx'
import { selectWindowMgr, selectWindowAnchor,addWindow, removeWindow,  setWindowSize, setWindowPos, selectWindowXY,   Layers} from '../../../store/windowMgrSlice'
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";




const useStyles = makeStyles(theme => createStyles({
    titleBar:{
        alignItems: 'center',
        background: theme.palette.background.paper
    },
    grabHandle:{
        cursor: "grab",
    },
    edit: {
        border: "solid 1px #ddd",
        boxShadow: theme.shadows[1],
        zIndex: (props:any) => (props.window? props.window.zOrder : 0),
        pointerEvents: 'initial',
    },
    view: {
        zIndex: (props:any) => (props.window? props.window.zOrder : 0),
        userSelect: 'none',
        pointerEvents: (props:any) => (props.isEnabled?'initial':'none'),
    },
    overflow:{
        overflow: 'hidden'
    },
    hide: {
        visibility: 'hidden'
    },
    windowHoverEffect: {
        '&:hover':{
        backgroundColor:'rgba(0, 0, 1, 0.1)'
        }
    }
}))




export type CustomWindowProps = {
    /** unique identifier for the window. Each window should have unique id */
    uid: string,
    /** The layer in which the window is added */
    layer: Layers,
    /** should the window be visible */
    visible: boolean,
    /** top left position of the window in pixels */
    xy?:[number,number],
    /** Title for the window  */
    title?: string,
    /** initial width of the window */
    width?: number,
    /** initial height of the window */
    height?: number,
    resize?:boolean,
    anchor?:[number,number],
    autoPositionOnResize?:boolean,
    onClickOutside?: (uid:string) => void,
    onDrag?:DraggableEventHandler,
    onDragStop?:(x:number,y:number) => void,
    onResize?:RndResizeCallback,
    onResizeStop?:(x:number,y:number) => void,
    parentRef: React.MutableRefObject<null | HTMLDivElement>,
    children: any | null
} 
  
type DraggableEventHandler = (
    e: any, data: DraggableData,
  ) => void | false;

type RndResizeCallback = (
    e: any,
    dir: any,
    refToElement: any,
    delta: any,
    position: any,
  ) => void;

/**
 * A Generic resizable and draggable window component.
 * Pass any JSX component as children to render it inside it  
 */
const FixedWindow = forwardRef((props:CustomWindowProps, ref:any) => {
    const dispatch = useAppDispatch();
    const windowMgr = useAppSelector(selectWindowMgr);
    const uid = props.uid;
    const [titleBarHeight] = useState(0);
    const window = windowMgr.windows[uid];
    //const pos = useAppSelector(state => selectWindowXY(state,uid));
    const pos = props.xy ? props.xy : [0,0];
    const anchor = useAppSelector(state => selectWindowAnchor(state,uid));
    const [width, height] = window ? window.size : [300,300];
    const [parentSize, setParentSize] = useState<number[]>([])
    const windowRef = useRef<any>(null);

    const onResize = (newWidth ?:number, newHeight ?: number) => {
    
     if(windowRef.current && newWidth && newHeight && pos[0] !== -1 && pos[1] !== -1)
        {
            const windowEl = windowRef.current as any;
            if(parentSize) {
                
                let xNorm = (pos[0] + anchor[0])/parentSize[0];
                let yNorm = (pos[1] + anchor[1])/parentSize[1];
                if(props.autoPositionOnResize )
                    dispatch(setWindowPos({uid,pos:[xNorm*newWidth-anchor[0],yNorm*newHeight-anchor[1]]}))

                windowEl.updateOffsetFromParent();
                setParentSize([newWidth,newHeight])
            }
        }
        
    }

    useResizeDetector({ 
        refreshMode: 'debounce',
        refreshRate: 400,
        refreshOptions :{trailing : true, leading : false },
        onResize,
        targetRef: props.parentRef
      });
    
    let styleProps = {
        window,
        isEnabled: windowMgr.isEnabled
    }
    let classes = useStyles(styleProps);

    useEffect(() => {
        // console.log(`window ${uid} mounted`);
        dispatch(addWindow({uid}));
        dispatch(setWindowPos({uid,pos: props.xy ? props.xy : [0,0]}))
        if(props.parentRef.current)
        setParentSize([props.parentRef.current.clientWidth,props.parentRef.current.clientHeight]);
        
        if(props.width && props.height)
        dispatch(setWindowSize({uid,size:[props.width,props.height],}))
        else if(windowRef.current)
            dispatch(setWindowSize({uid,size:[windowRef.current.clientWidth, windowRef.current.clientHeight]}))
        return () => {
            dispatch(removeWindow({uid}));
        }
    },[])

    return (
            <Rnd 
            ref = {windowRef}
            style = { {userSelect:'none'} }
            bounds="parent" 
            size= {props.width ?{ width,  height: height + titleBarHeight} : undefined}
            position={{ x: pos[0], y: pos[1]}}    
            >
            {/* <TitleBar ref={titleBarRef} isEditMode={window?.isEditMode} height={10} /> */}
            <div ref={ref} id={uid} >
             {
               props.children
             }
             </div>
            </Rnd>
    )
})
FixedWindow.defaultProps = {
    autoPositionOnResize : true
} as CustomWindowProps;
export default FixedWindow;
