import { Grid, IconButton, Typography, ClickAwayListener } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useLayoutEffect, useState, forwardRef, useContext} from 'react'
import { Rnd, Position, ResizableDelta, DraggableData  } from 'react-rnd'
import { useResizeDetector } from 'react-resize-detector';
import clsx from 'clsx'
import { selectWindowMgr, selectWindowAnchor,addWindow, removeWindow, setEditMode, setHiddenState, setWindowSize, setWindowPos, selectWindowXY, setWindowAnchor, setActiveLayers, Layers, setWindowSizeHandler, setWindowPostionHandler} from '../../../store/windowMgrSlice'
import { togglePopout, setTogglePopout } from 'store/appSlice';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { vec2, vec3 } from 'gl-matrix';
import {selectCheckedNodes,selectCheckedNodeForALLToolType,selectEditableNodeId,toolBarList,updateAppliedPosition} from '../../../store/sideBar/ToolBar/toolBarSlice'
import { props } from 'ramda';
import { ViewerContext } from 'components/App';


export type CustomFloatingWindowProps = {
    /** unique identifier for the window. Each window should have unique id */
    // uid: string,
    // /** The layer in which the window is added */
    // layer: Layers,
    // /** should the window be visible */
    visible: boolean,
    // // /** top left position of the window in pixels */
    xy?:[number,number],
    // // /** Title for the window  */
    // // title?: string,
    // // /** initial width of the window */
    width?: number,
    // // /** initial height of the window */
    height?: number,
    resize?:boolean,
    anchor?:[number,number],
    autoPositionOnResize?:boolean,
    
    // // onClickOutside?: (uid:string) => void,
    // // onDrag?:DraggableEventHandler,
    onDragStop?:(x:number,y:number) => void,
    // // onResize?:RndResizeCallback,
    // // onResizeStop?:(x:number,y:number) => void,
    parentRef: React.MutableRefObject<null | HTMLDivElement>,
    // children: any | null

    uid: string,

    layer: Layers,

    onClickOutside?: (uid:string) => void,

    children: any | null
}

const findNearestQuadrant = (parentSize:[number,number], winXy:[number,number], winSize:[number,number]):string => {
    let c = vec2.fromValues(parentSize[0]/2,parentSize[1]/2);
    let topLeft = vec2.fromValues(winXy[0],winXy[1]);
    let topRight =  vec2.fromValues(winXy[0]+winSize[0],winXy[1]);
    let btmLeft = vec2.fromValues(winXy[0],winXy[1]+winSize[1]);
    let btmRight = vec2.fromValues(winXy[0]+winSize[0],winXy[1]+winSize[1]);
    let quadrants = [];

    quadrants.push({id:'q1',val:vec2.sqrDist(c,topLeft)});
    quadrants.push({id:'q2',val:vec2.sqrDist(c,topRight)});
    quadrants.push({id:'q3',val:vec2.sqrDist(c,btmLeft)});
    quadrants.push({id:'q4',val:vec2.sqrDist(c,btmRight)});

    quadrants.sort((a,b) => b.val-a.val);
    return quadrants[0].id;

}

const useStyles = makeStyles(theme => createStyles({

    edit: {
        background: theme.palette.background.paper,
        borderRadius: '6px',
        // border: "solid 1px black",
        boxShadow: theme.shadows[24],
        zIndex: (props:any) => (props.window? props.window.zOrder : 0),
        pointerEvents: 'initial',
    },
    view: {
        background: theme.palette.background.paper,
        // border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: '6px',
        zIndex: 5,
        userSelect: 'none',
        // pointerEvents: '',
        pointerEvents: 'initial',
        // justifyContent:'center'
    },
    hide: {
        visibility: 'hidden'
    },
    endBar:{
        // alignItems: 'center',
        background: theme.palette.background.paper
    },
    grabHandle:{
        cursor: "grab",
    },
    parentBox:{
        display:'flex',
        // flexDirection:'row',
        // justifyContent:'center',
        // border:'1px solid red',
        // position: 'relative'
    },
    centerBox:{
        height:'100%',
        width:'100%',
        borderRadius: '6px',
        border:`1px solid ${theme.palette.text.primary}`,
        // display:'inline-block',

    },
    bars:{

        height:'60px',
        // border:'solid 1px green',
        width:'10px',
        // display:'inline-block',
    },
    barsEditMode : {
        height:'60px',
        border:'solid 1px black',
        width:'10px',
        // display:'inline-block',
    },
    
    // barright:{

    //     height:'60px',
    //     border:'solid 1px green',
    //     width:'10px',
    //     display:'inline-block',
    // }

    handlebars:{
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '2px 0px 0px 2px',
        border:'solid 1px black', 
        height:(props:any) => (props.appliedOrientationId==='2' ? '10px' : '60px'),
        width:(props:any) => (props.appliedOrientationId==='2' ? '60px' : '10px')
        // height:'60px',
        // width:'10px'
        // float: 'left'
        // height: props.window?.zOrder
    },

    handlebarsHorizontal:{
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '2px 2px 2px 2px',
        border:'solid 1px black', 
        // height:(props:any) => (props.appliedOrientationId==='2' ? '10px' : '60px'),
        // width:(props:any) => (props.appliedOrientationId==='2' ? '60px' : '10px')
        height:'60px',
        width:'10px'
        // float: 'left'
        // height: props.window?.zOrder
    },
    handlebarsVertical:{
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '2px 2px 2px 2px',
        border:'solid 1px black', 
        // height:(props:any) => (props.appliedOrientationId==='2' ? '10px' : '60px'),
        // width:(props:any) => (props.appliedOrientationId==='2' ? '60px' : '10px')
        height:'10px',
        width:'60px'
        // float: 'left'
        // height: props.window?.zOrder
    },
    
    

})) 
  
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
const CustomFloatingWindow = forwardRef((props:CustomFloatingWindowProps, ref:any) => {
    const dispatch = useAppDispatch();
    const windowMgr = useAppSelector(selectWindowMgr);
    const uid = props.uid;
    const window = windowMgr.windows[uid];
    const windowRef = useRef<any>(null);
    const [width, height] = window ? window.size : [80,60];
    const pos = useAppSelector(state => selectWindowXY(state,uid));
    const [parentSize, setParentSize] = useState<number[]>([])
    const anchor = useAppSelector(state => selectWindowAnchor(state,uid));
    // let toolbarDirection = useAppSelector(currentOrientation)
    const [BarHeight, setBarHeight] = useState(0);
    const [Barwidth, setBarWidth] = useState(0);
    const CheckedToolbarIcons = useAppSelector(selectCheckedNodes)
    const endBarRef = useRef<HTMLDivElement | null>(null);
    const checkedElements = useAppSelector(selectCheckedNodeForALLToolType)
    const editableNodeId: string = useAppSelector(selectEditableNodeId);
    const toolBarData = useAppSelector(toolBarList);
    const appliedOrientationId = toolBarData[editableNodeId]?.appliedOrientation;
    const viewerContainerRef = useContext(ViewerContext); 
    // console.log('appliedOrientationId',appliedOrientationId)


    let styleProps = {
        window,
        isEnabled: windowMgr.isEnabled
    }
    let classes = useStyles(styleProps);

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
        refreshRate: 200,
        refreshOptions :{trailing : true, leading : true },
        onResize,
        targetRef: props.parentRef
        });

    const handleClick = (e:any) => {
        e.stopPropagation()
    }
    useEffect(() => {
        const toggleVisibility = (v:boolean) => {
            dispatch(setHiddenState({uid, isHidden: window ? !window.isHidden : false}));
        }
    
        toggleVisibility(props.visible);
    },[props.visible])

    useEffect(() => {
        // console.log(`window ${uid} mounted`);
        dispatch(addWindow({uid}));
        if(viewerContainerRef?.current) {
            let rect = viewerContainerRef.current.getBoundingClientRect();
            let w = rect.width;
            let h = rect.height;
            let boxsizeWidth = document.getElementById(uid)?.clientWidth
            let boxsizeHeight = document.getElementById(uid)?.clientHeight

            if (uid==='toolBar_FullScreen') {
                    if (w && boxsizeWidth) {
                      dispatch(setWindowPos({uid,pos:[w-45-10,4]}))
                      dispatch(setWindowAnchor({uid,anchor:[45,0]}));
                    }
            } else if (uid==='toolBar_Presentation') {
                    if (w && boxsizeWidth && boxsizeHeight) {
                        dispatch(setWindowPos({uid,pos:[w/2-110/2,h-45-4]}))
                        dispatch(setWindowAnchor({uid,anchor:[0, boxsizeHeight]}));
                    }
            } 
            else if (uid==='toolBar_Popout') {
                if (w && boxsizeWidth && boxsizeHeight) {
                    dispatch(setWindowPos({uid,pos:[w-260-4,4]}))
                    dispatch(setWindowAnchor({uid,anchor:[260, 0]}));
                }
        }
            else  {
                    if (w && boxsizeWidth) {
                        dispatch(setWindowPos({uid,pos:[w/2-boxsizeWidth,4]}))
                        dispatch(setWindowAnchor({uid,anchor:[0, 0]}));
                    }
            }
        }

       
        
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

    useEffect(() => {
        if(window?.isEditMode){
            dispatch(setActiveLayers([props.layer]));
        }
    },[window?.isEditMode])

    type BarProps = {
        id:any,
        isEditMode: boolean,
        checkedElement:any,
        appliedOrientationId:any,
        // height: any,
        // width: any,
        // float?:any
        // style:any
    }

    const EndBar = React.forwardRef((props:BarProps, ref:any) => {

        var Idname = props.id
        var splitname = Idname.split("-");

        var vertical = toolBarData[splitname[1]]?.appliedOrientation === '2' ? true : false
    
        const classes = useStyles(props);
        return (
            props.isEditMode ? 
            <div 
                id={props.id}
                ref={ref}
                // style={props.style}
                className={clsx(
                    // classes.handlebars,
                    {
                        [classes.endBar]: props.isEditMode,
                        [classes.grabHandle]: props.isEditMode,
                        [classes.hide]: !props.isEditMode,
                        [classes.handlebarsHorizontal] : !vertical,
                        [classes.handlebarsVertical] : vertical
                    })}
                    >
            </div>
            :null
        )
    });

    // useLayoutEffect(() => {
    //     if(endBarRef.current) {
    //         setBarHeight(endBarRef.current.clientHeight);
    //         setBarWidth(endBarRef.current.clientWidth);
    //     }
    // },[endBarRef.current, window?.isEditMode])

    return (
        <>  <ClickAwayListener onClickAway={
            (e:any) => {
                if(e.target.id.includes('windows_container'))  
                {
                    if(props.onClickOutside)
                    props.onClickOutside(uid);
                    dispatch(setActiveLayers([Layers.VIEWER]));
                    dispatch(setEditMode({uid,isEdit:false}))
                    dispatch(setTogglePopout(false))
                    
                }
            }
        }>
            <Rnd 
                id={uid}
                ref = {windowRef}
                style={{display:'flex', flexDirection:toolBarData[uid]?.appliedOrientation === '2' ? 'column' : 'row'}}
                bounds="parent" 
                className={clsx(classes.parentBox,
                    {  
                        [classes.view]: !window?.isEditMode,
                        [classes.edit]: window?.isEditMode,
                        [classes.hide]:window?.isHidden
                    })}

                    enableResizing={false}
                    resize={false}
                    autoPositionOnResize= {true}
                    disableDragging ={window?.isEditMode ? false : true}
                    size= {props.width || props.height ?{ width : width + BarHeight,  height: height + BarHeight } : undefined}
                    position={{ x: pos[0], y: pos[1]}}
                    onDragStop={(e, d) => {
                        let q = findNearestQuadrant(parentSize as [number,number],[d.x,d.y] as [number,number],[width,height]);
                        let anchor:[number,number] = [0,0];
                        switch (q) {
                            case 'q1':
                                anchor = [0,0]
                                break;
                            case 'q2':
                                anchor = [width,0]
                                break;
                            case 'q3':
                                anchor = [0,height]
                                break;
                            case 'q4':
                                anchor = [width,height]
                                break;
                            default:
                                break;
                        }
                        if (editableNodeId) dispatch(updateAppliedPosition({ toolBarId: editableNodeId, id: '9' }));
                        dispatch(setWindowPostionHandler({uid,anchor,pos:[d.x,d.y], undoable: true}));
                        if(props.onDragStop)
                        props.onDragStop(d.x,d.y);
                     }}

            >   
                    {/* <EndBar  id={`leftBar-${uid}`} ref={endBarRef} isEditMode={window?.isEditMode} 
                                    checkedElement={editableNodeId[0]} appliedOrientationId={appliedOrientationId}  */}
                                    {/* /> */}
                    <div ref={ref}
                        id={`centerBox-${uid}`} 
                        // style={{border:'1px solid black',float:'left'}}
                        className={clsx(classes.centerBox )}>
                        {
                            props.children
                        }
                    </div>
                    {/* <EndBar  id={`rightBar-${uid}`} ref={endBarRef} isEditMode={window?.isEditMode} 
                                    checkedElement={editableNodeId[0]} appliedOrientationId={appliedOrientationId}  */}
                                    {/* /> */}
             

                
            </Rnd>

        </ClickAwayListener>
            
        </>
    )
})
CustomFloatingWindow.defaultProps = {
    autoPositionOnResize : true
} as CustomFloatingWindowProps;
export default CustomFloatingWindow
