import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import MuiTypography from '@material-ui/core/Typography';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MuiGrid from '@material-ui/core/Grid';

import  {useEffect, useState} from "react";
import NumericInput from 'react-numeric-input';
import styles from '../style';

import MuiButton from '@material-ui/core/Button';
import {CameraMode,selectDefaultSceneData} from 'store/defaultSlice';
import {selectAppliedCameraViewID,selectUserView,setCameraInfoAsync,updateChange,setActiveCameraViewID} from '../../../../store/sideBar/sceneSlice';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';

import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';

import {undoStack} from "../../../utils/undoStack";

import clsx from 'clsx';
import globalThemes from 'theme/globalThemes';

export default function CameraEdit (){

    const dispatch = useAppDispatch();
    const classes = styles();
    const customClasses = globalThemes();

    const [projection, setProjection] = useState(useAppSelector(state => state.scene.activeCamera.cameraMode));

    const appliedCameraViewID = useAppSelector(selectAppliedCameraViewID);
    const sceneDefaultData = useAppSelector(selectDefaultSceneData);
    const userDefinedData = useAppSelector(selectUserView);

    let SystemView:any[] = [];
    let UserDefinedView:any[] = []; 
    let systemAndUserView:any[] = [];

    sceneDefaultData[0].cameraViews.forEach((item:any)=>{
        systemAndUserView.push(item)
    })

    userDefinedData.forEach((item:any)=>{
        systemAndUserView.push(item);
    })


    SystemView = sceneDefaultData[0].cameraViews.filter(item => item.id === appliedCameraViewID);
    UserDefinedView = userDefinedData.filter(item => item.id === appliedCameraViewID);

    //const cameraViews : CameraView[] = useAppSelector(state => state.scene.cameraViews)

    const [cameraView,setCameraView] : any = useState(SystemView.length > 0 ? SystemView[0] : UserDefinedView[0]);


    // useEffect(() => {
    //     if(UserDefinedView[0].length > 0){
    //         setCameraView(UserDefinedView[0].find((item:any) => item.id === appliedCameraViewID))
    //     }
    //   },[UserDefinedView]);
      
    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleProjection = (e: any, value:any) => {
        if(value === "PERSPECTIVE"){
            setProjection(CameraMode.PERSPECTIVE);
        }
        else {
            setProjection(CameraMode.ORTHOGRAPHIC);  
        }
        
    }

    const onHandleSelect = (newId : string) => {

        dispatch(setActiveCameraViewID(newId));
        let isUserDefined = userDefinedData.filter(item => item.id === newId).length > 0;
        if(isUserDefined === true) {
           dispatch(setCameraInfoAsync({id :newId, isUserDefined: true}))
        }
        else {
            dispatch(setCameraInfoAsync({id :newId, isUserDefined: false}))
        }

        let activeSystemView = sceneDefaultData[0].cameraViews.filter(item => item.id === newId);
        let activeUserDefinedView = userDefinedData.filter(item => item.id === newId);
        
        setCameraView(isUserDefined ? activeUserDefinedView[0] : activeSystemView[0]);
        
    }

    const onHandleChange = (newValue : string , variable: string) => {
        
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));
        switch(variable){
            // Perspective value update
            case "Y-Field of View":
                updatedCameraView.perspectiveFrustum[0] = newValue;
            break;
            case "Aspect Ratio":
                updatedCameraView.perspectiveFrustum[1] = newValue;
            break;
            case "Far Plane":
                updatedCameraView.perspectiveFrustum[2] = newValue;
            break;
            case "Near Plane":
                updatedCameraView.perspectiveFrustum[3] = newValue;
            break;

            // Orthographic value update
            case "Left":
                updatedCameraView.orthographicFrustum[0] = newValue;
            break;
            case "Right":
                updatedCameraView.orthographicFrustum[1] = newValue;
            break;
            case "Top":
                updatedCameraView.orthographicFrustum[2] = newValue;
            break;
            case "Bottom":
                updatedCameraView.orthographicFrustum[3] = newValue;
            break;
            case "Far":
                updatedCameraView.orthographicFrustum[4] = newValue;
            break;
            case "Near":
                updatedCameraView.orthographicFrustum[5] = newValue;
            break;
        
            // Camera position value update
            case "position X":
                updatedCameraView.cameraPosVector[0] = newValue;
            break;
            case "position Y":
                updatedCameraView.cameraPosVector[1] = newValue;
            break;
            case "position Z":
                updatedCameraView.cameraPosVector[2] = newValue;
            break;

            // camera Direction value update
            case "direction X":
                updatedCameraView.cameraDirVector[0] = newValue;
            break;
            case "direction Y":
                updatedCameraView.cameraDirVector[1] = newValue;
            break;
            case "direction Z":
                updatedCameraView.cameraDirVector[2] = newValue;
            break;

            // CameraUp value update
            case "up X":
                updatedCameraView.cameraUpVector[0] = newValue;
            break;
            case "up Y":
                updatedCameraView.cameraUpVector[1] = newValue;
            break;
            case "up Z":
                updatedCameraView.cameraUpVector[2] = newValue;
            break;
        }

        setCameraView(updatedCameraView)
    }

    const onHandleCameraPositionChange = (newValue:string ,positionIndex:number) =>{
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));
        let updatedValue:number = Number(newValue);

        switch(positionIndex) {

            case 0 :
                updatedCameraView.cameraPosVector[0] = updatedValue;
                break;
            case 1 :
                updatedCameraView.cameraPosVector[1] = updatedValue;
                break;
            case 2 :    
                updatedCameraView.cameraPosVector[2] = updatedValue;
                break;

        }

        setCameraView(updatedCameraView)

    }

    const onHandleCameraDirectionChange = (newValue:string ,positionIndex:number) =>{
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));

        switch(positionIndex) {

            case 0 :
                updatedCameraView.cameraDirVector[0] = newValue;
                break;
            case 1 :
                updatedCameraView.cameraDirVector[1] = newValue;
                break;
            case 2 :    
                updatedCameraView.cameraDirVector[2] = newValue;
                break;

        }

        setCameraView(updatedCameraView)

    }

    const onHandleCameraUpChange = (newValue:string ,positionIndex:number) =>{
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));

        switch(positionIndex) {

            case 0 :
                updatedCameraView.cameraUpVector[0] = newValue;
                break;
            case 1 :
                updatedCameraView.cameraUpVector[1] = newValue;
                break;
            case 2 :    
                updatedCameraView.cameraUpVector[2] = newValue;
                break;

        }

        setCameraView(updatedCameraView)

    }

    const onHandleCameraFrustumChange = (newValue:string ,positionIndex:number) =>{
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));

        if(projection === CameraMode.PERSPECTIVE) {
            
        switch(positionIndex) {

            case 0 :
                updatedCameraView.perspectiveFrustum.yFOV = newValue;
                break;
            case 1 :
                updatedCameraView.perspectiveFrustum.aspectRatio = newValue;
                break;
            case 2 :    
                updatedCameraView.perspectiveFrustum.farPlane = newValue;
                break;
             case 3 :
                updatedCameraView.perspectiveFrustum.nearPlane = newValue;   

        }

        }
        else {

            switch(positionIndex) {

                case 0 :
                    updatedCameraView.orthographicFrustum.left = newValue;
                    break;
                case 1 :
                    updatedCameraView.orthographicFrustum.right = newValue;
                    break;
                case 2 :    
                    updatedCameraView.orthographicFrustum.top = newValue;
                    break;
                 case 3 :
                    updatedCameraView.orthographicFrustum.bottom = newValue;   
                    break;
                case 4 :   
                    updatedCameraView.orthographicFrustum.farPlane = newValue;
                    break;
                case 5 :    
                    updatedCameraView.orthographicFrustum.nearPlane = newValue;
                    break;
    
            }

            
        }

        setCameraView(updatedCameraView)

    }
    


    const onHandleBlur = (value : string , variable: string) => {
        
        const newValue= Number(value)
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));
        switch(variable){
            // Perspective value update
            case "Y-Field of View":
                updatedCameraView.valuePerspective[0].value = newValue;
            break;
            case "Aspect Ratio":
                updatedCameraView.valuePerspective[1].value = newValue;
            break;
            case "Far Plane":
                updatedCameraView.valuePerspective[2].value = newValue;
            break;
            case "Near Plane":
                updatedCameraView.valuePerspective[3].value = newValue;
            break;

            // Orthographic value update
            case "Left":
                updatedCameraView.valueOrthographic[0].value = newValue;
            break;
            case "Right":
                updatedCameraView.valueOrthographic[1].value = newValue;
            break;
            case "Top":
                updatedCameraView.valueOrthographic[2].value = newValue;
            break;
            case "Bottom":
                updatedCameraView.valueOrthographic[3].value = newValue;
            break;
            case "Far":
                updatedCameraView.valueOrthographic[4].value = newValue;
            break;
            case "Near":
                updatedCameraView.valueOrthographic[5].value = newValue;
            break;
        
            // Camera position value update
            case "position X":
                updatedCameraView.cameraPosition[0].value = newValue;
            break;
            case "position Y":
                updatedCameraView.cameraPosition[1].value = newValue;
            break;
            case "position Z":
                updatedCameraView.cameraPosition[2].value = newValue;
            break;

            // camera Direction value update
            case "direction X":
                updatedCameraView.cameraDirection[0].value = newValue;
            break;
            case "direction Y":
                updatedCameraView.cameraDirection[1].value = newValue;
            break;
            case "direction Z":
                updatedCameraView.cameraDirection[2].value = newValue;
            break;

            // CameraUp value update
            case "up X":
                updatedCameraView.cameraUp[0].value = newValue;
            break;
            case "up Y":
                updatedCameraView.cameraUp[1].value = newValue;
            break;
            case "up Z":
                updatedCameraView.cameraUp[2].value = newValue;
            break;
        }
        setCameraView(updatedCameraView)
    }

    const onHandleReset = () => {
        setCameraView(UserDefinedView[0]);
    }

    const onHandleSave = (newData: CameraView, undoable?: boolean) => { 

        const data = JSON.parse(JSON.stringify(newData));
        let oldData = UserDefinedView[0]
        
        dispatch(updateChange({data,tab:projection}))
        dispatch(setCameraInfoAsync({id : data.id,isUserDefined:true}))

        if(undoable){
            undoStack.add(
                {
                  undo: () => onHandleSave(oldData),
                  redo: () => onHandleSave(newData),
                }
            )
        }

    }



    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(null)
    }

    const getAction = () => {
        return(
            <SelectAction
                labelId="display-modes-selection-label-id"
                id="display-modes-selection-id"
                value={appliedCameraViewID}
                onChange={(e : any) => onHandleSelect(e.target.value )}
                MenuProps={{
                    disablePortal: true,
                    anchorOrigin: {
                        vertical:"bottom",
                        horizontal:"left",
                    },
                    getContentAnchorEl: null
                }}
            >
                { 
                    systemAndUserView.map((item:any) => 
                        <MuiMenuItem className = {customClasses.selected} value={item.id}>{item.title}</MuiMenuItem> 
                )}
            </SelectAction>
        )
    }

    const getBody = () => {
        return(
            <div className={classes.scrollBar}>
                <div className={classes.cameraEditPageContainer}>
                    <div className={classes.cameraEditCategoryContainer}>
                        <div className={clsx(classes.cameraEditCategoryHeader,classes.sidebarText)}>
                            Camera Position
                        </div>
                        <MuiGrid container spacing={1}>
                            {cameraView.cameraPosVector.map((item : any ,index :number) => 
                                <MuiGrid  key={ 'divCameraPosition_' + index }  item xs={12} sm={4}>
                                    <MuiGrid container direction="column" spacing={1}>
                                        <MuiGrid item>
                                            {/* <div className={classes.caption} > 
                                                {item.name}
                                            </div> */}
                                        </MuiGrid>
                                        <MuiGrid item>
                                            <input
                                                readOnly={SystemView.length > 0 ? true:false} 
                                                className={clsx(classes.inputEquation,classes.sidebarText)} 
                                                type="number" 
                                                value={item} 
                                                onChange={(e) => {onHandleCameraPositionChange(e.target.value,index)}}
                                               // onBlur = {(e) => {onHandleBlur(e.target.value,`position ${e.target.id}`)}}
                                            />
                                        </MuiGrid>

                                    </MuiGrid>
                                </MuiGrid>
                            )}
                        </MuiGrid>
                    </div>

                    <div className={classes.cameraEditCategoryContainer}>
                        <div className={clsx(classes.cameraEditCategoryHeader,classes.sidebarText)} noWrap>
                            Camera Direction
                        </div>
                        <MuiGrid container spacing={1}>
                            {cameraView.cameraDirVector.map((item : any ,index:number) => 
                                <MuiGrid  key={ 'divCameraDirection_' + index}  item xs={12} sm={4}>
                                    <MuiGrid container direction="column" spacing={1}>
                                        <MuiGrid item>
                                        {/* <div className={classes.caption} > 
                                                {item.name}
                                            </div> */}
                                        </MuiGrid>
                                        <MuiGrid item>
                                            <input
                                                readOnly={SystemView.length > 0 ? true:false} 
                                                className={clsx(classes.inputEquation,classes.sidebarText)} 
                                                id = {index === 0?'X':index === 1?'Y':index === 2?'Z':'No ID'}
                                                type="number" 
                                                value={item} 
                                                onChange={(e) => {onHandleCameraDirectionChange(e.target.value,index)}}
                                                //onBlur = {(e) => onHandleBlur(e.target.value,`direction ${item.id}`)}
                                            />
                                        </MuiGrid>
                                    </MuiGrid>
                                </MuiGrid>
                            )}
                        </MuiGrid>
                    </div>

                    <div className={classes.cameraEditCategoryContainer}>
                        <div  className={clsx(classes.cameraEditCategoryHeader,classes.sidebarText)} noWrap>
                            Camera Up
                        </div>
                        <MuiGrid container spacing={1}>
                            {cameraView.cameraUpVector.map((item : any,index:number) => 
                                <MuiGrid  key={ 'divCameraUp_' + index }  item xs={12} sm={4}>      
                                    <MuiGrid container direction="column" spacing={1}>
                                        <MuiGrid item>
                                            {/* <div className={classes.caption} > 
                                                {item.name}
                                            </div> */}
                                        </MuiGrid>
                                        <MuiGrid item>
                                            <input
                                                readOnly={SystemView.length > 0 ? true:false} 
                                                className={clsx(classes.inputEquation,classes.sidebarText)}
                                                type="number" 
                                                value={item} 
                                                onChange={(e) => {onHandleCameraUpChange(e.target.value,index)}}
                                                //onBlur = {(e) => onHandleBlur(e.target.value,`up ${item.id}`)}
                                            />
                                        </MuiGrid>
                                    </MuiGrid>
                                </MuiGrid>
                            )}
                        </MuiGrid>
                    </div>

                    <div className={classes.cameraEditCategoryContainer}>
                        <div className={clsx(classes.cameraEditCategoryHeader,classes.sidebarText)} >
                            View Frustum
                        </div>
                        <div style={{marginLeft:"-10px",}}>
                            <MuiTabs  
                                value={projection === CameraMode.PERSPECTIVE? "PERSPECTIVE" : "ORTHOGRAPHIC"}
                                aria-label="simple tabs example"
                                onChange={handleProjection}
                                TabIndicatorProps={{style:{backgroundColor:"currentColor"}}}
                                centered
                            >
                                <MuiTab style={{textTransform:"none"}} label="Perspective"/>
                                <MuiTab style={{textTransform:"none"}} label="Orthographic"/>
                            </MuiTabs>          
                        </div>                          

                        <div style={{marginTop:"20px"}}>
                            <MuiGrid container spacing={3}>
                                {   (projection === CameraMode.PERSPECTIVE
                                        ?
                                            Object.values(cameraView.perspectiveFrustum) 
                                        : 
                                            Object.values(cameraView.orthographicFrustum))
                                    .map((item: any,index:number) => 
                                        <MuiGrid  item xs={12} sm={6}>
                                            <MuiGrid container direction="column" spacing={1}>
                                                <MuiGrid item> 
                                                {/* <div className={classes.caption} > 
                                                {item.name}
                                                </div> */}
                                                </MuiGrid>
                                                <MuiGrid item>
                                                    <input
                                                        readOnly={SystemView.length > 0 ? true:false} 
                                                        className={clsx(classes.inputEquation,classes.sidebarText)}
                                                        type="number" 
                                                        value={item} 
                                                        onChange={(e) => {onHandleCameraFrustumChange(e.target.value,index)}}
                                                        //onBlur = {(e) => {onHandleBlur(e.target.value,item.name)}}
                                                    />
                                                </MuiGrid>
                                            </MuiGrid>
                                        </MuiGrid>
                	                )}
                            </MuiGrid>
                        </div>
                        </div>
                    </div>
                </div>
            )
    }

    const getFooter = () => {

        let change = false;

        const cameraViewRedux = SystemView.length > 0 ? SystemView : UserDefinedView;

        if(JSON.stringify(cameraViewRedux) !== JSON.stringify(cameraView))
            change = true;
        return(
            <div>
            {
                UserDefinedView.length === 0
                ?
                null
                :
                <div style={{display:'flex', gap:'10px', justifyContent:'center', margin:"20px"}}>
                <MuiButton 
                // style={{backgroundColor:"#5958FF",width:"30%", fontSize:"11px" , marginRight:"5px"}} 
                className = {customClasses.Muibtn}
                disabled={!change}
                autoFocus 
                onClick={() => onHandleSave(cameraView, true)}
                // color="primary"
              >
                Apply
              </MuiButton>
           
            <MuiButton 
                // style={{width:"30%", fontSize:"11px"}}
                className={customClasses.BtnOutlined} 
                autoFocus 
                onClick={onHandleReset} 
                disabled={!change}
                // color="primary"
              >
                Reset
              </MuiButton>
              </div>
            }
            </div>
        )
    }

    return(
        <SideBarContainer
        headerContent={ <Title text={"Edit Camera" } group="Scene - Camera"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
      /> 
       
    )
}