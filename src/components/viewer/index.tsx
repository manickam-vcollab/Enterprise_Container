import { memo, useEffect , useRef, useState, useCallback, createContext } from 'react';
import { createRef } from 'react';
import * as viewerAPIProxy from '../../backend/viewerAPIProxy';
import nextId from 'react-id-generator';
import { setModelInfo, setModelLoadedState, selectCurrentUser, ROLE, setCurrentReportId, selectedCurrentReportId ,selectedCurrentRoleId, setCurrentRoleId} from '../../store/appSlice';
import { updateMenuItemState, updateMenuItemStateAsync ,removeColorMapMenu } from '../../store/mainMenuSlice';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import {saveTree, fetchSearchHints } from "../../store/sideBar/productTreeSlice";
import {fetchSectionPlaneData} from "../../store/sideBar/clipSlice";
import { addViewer } from '../../store/appSlice';
import ProbeLabel from "../probe";
import { fetchFieldData } from '../../store/sideBar/fieldSlice';
import { fetchMouseData } from '../../store/sideBar/settings';
import { fetchCameraStdViews } from '../../store/sideBar/sceneSlice';
import Snackbars from '../sideBarContents/messages/SnackBar';
import EventRegistry from './EventRegistry';
import { setCAEResult } from 'store/caeResultSlice';
import { setCAEResult as setCAEResultTemp } from 'store/sideBar/contourplotSlice';
import {gettingStartedSteps} from 'components/layout/TourComponent/data/tutorialSteps';
import { getView, getUserPermission } from "../../services/ServerConnector";
import { applyViewpointAsync, updateViewpoint } from "store/viewpointSlice";
import { ServerLocation } from "../../services/ServerLocation";
import {
    setSlideSelection,
    applyView,
    downloadFile,  
    updateSlideData,
    setSlideStatus,
  } from "store/sideBar/slideSlice";

function Viewer(){
    
    const viewerRefs = createRef<HTMLDivElement>();
    //const viewerDomID = nextId("vct-viewer-");
    const [viewerDomID, setViewerDomID] = useState(nextId("vct-viewer-"));
    const [mount, setMount] = useState(false);
    const dispatch = useAppDispatch(); 
    const tree = useRef();
    const currentUser = useAppSelector(selectCurrentUser);
    const currentReportId = useAppSelector(selectedCurrentReportId);
    const currentRoleId = useAppSelector(selectedCurrentRoleId);   
    
    //To get the queryString Name from url
    const getParameterByName = (name : string) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
      results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
          
    const loadModel = useCallback((api : string, url : string, activeViewerID : string) => {
      viewerAPIProxy.loadModel(api, url, activeViewerID )
      .then(async (response : string) => {

        if(response === "SUCCESS") {
          dispatch(setModelLoadedState(true));
          let modelInfo = viewerAPIProxy.getModelInfo(activeViewerID) as any;
          dispatch(setModelInfo(modelInfo));

          let caeResult = viewerAPIProxy.getDisplayResult(activeViewerID) as any; 
          dispatch(setCAEResult({caeResult:caeResult}));
          dispatch(setCAEResultTemp({caeResult:caeResult})); 
          dispatch(setSlideStatus())
          if(!caeResult) {
            dispatch(removeColorMapMenu());
          }



          /*
          let GUIConfigURL = "/GUIConfig.json";
          if(currentUser && currentUser.role)
             GUIConfigURL = `/GUIConfig-${currentUser.role}.json`;
          //let response = await fetch(GUIConfigURL);
          //let data =   await response.json();
          //dispatch(updateMenuItemState(data));  
          dispatch(updateMenuItemStateAsync(GUIConfigURL));  
         */                            
        }

        //let modelName = viewerMgr.getModelInfo(viewerID);
        //this.props.saveModelName(modelName[0]?.name);
        //this.props.saveModelLoadingStatus(response);
        //await this.props.saveTreeData(viewerMgr.getProductTree(this.viewerID));
        viewerAPIProxy
          .showModel(activeViewerID)
          .then((response1 : string) => {
           //("Showing Model : " + response1);  
            tree.current = viewerAPIProxy.getProductTree(activeViewerID) as any; 
            if(tree.current)
            {
              let treeData = tree.current as any;
              [...Object.values(treeData.models)].forEach((node:any)=>{
                node.state = {
                    checked: false,
                    partiallyChecked: false,
                    expanded: true,
                    highlighted: false,
                    visibility: true
                  };
                node.customData = {
                  displayId: 'BOUNDING_BOX'
                }
            })
            dispatch(saveTree({tree:treeData.models,rootIds:treeData.rootNodeIds}));
            dispatch(fetchSearchHints());
            }
          
           // fetch scenes data
           setTimeout(() => {
             dispatch(fetchCameraStdViews());
           },3000)
           // fetch field data
           setTimeout(() => {
            dispatch(fetchFieldData({data:""}))
           },3000)

           // fetch section data
           setTimeout(() => {
            dispatch(fetchSectionPlaneData());
           },3000)
           
           // fetch mouseData 
           setTimeout(() => {
            dispatch(fetchMouseData())
           },3000)

            //console.log("Showing Model : " + response1);   
            /*        
            if(currentReportId !== ""){
              setTimeout(() => {       
                getView(currentReportId).then((res) => {
                  if(res?.data){
                    console.log(res.data);   
                    const viewPointData  = res.data;          
                    if (viewPointData && viewPointData.slide)
                      dispatch(updateSlideData(viewPointData.slide));                  
                    if (viewPointData && viewPointData.viewpoint)
                      dispatch(updateViewpoint(viewPointData.viewpoint.viewpoints));                              

                    if(viewPointData && viewPointData.slide){                    
                      setTimeout(() => {
                        //dispatch(setSlideSelection(viewPointData.slide.selectedSlide));
                        //dispatch(downloadFile(viewPointData.slide.appliedSlide));
                        //dispatch(applyView(viewPointData.slide.appliedSlide));
                        if(viewPointData?.viewpoint?.viewpoints?.length > 0)
                          dispatch(applyViewpointAsync({ id: viewPointData.viewpoint.viewpoints[0].uid }));
                          //dispatch(setSlideSelection("0"));
                          //dispatch(applyView("0"));
                      },300);                   
                    }                 
                  }                
                  else if(res?.error)
                    console.log(res.error);                
                  else 
                    console.log("Invalid format");
                });
              },3000);
            }                         
            setTimeout(() => {
              viewerAPIProxy.fitView(activeViewerID);
              viewerAPIProxy.captureScreen(activeViewerID);
            }, 3000);
            */         
          })
          .catch((error : string) => {
            console.error("Error in showing model : ", error);
          });
      })  
      .catch((error : string) => {
        console.error("Error in loading model : ", error);
      });;
    },[dispatch]);

    useEffect  (() => {
      if(!mount) {
            setMount(true);
            //this.props.saveModelLoadingStatus("");
            let viewerDivID = viewerRefs.current?.id || '';
            //let api = "http://localhost:8181/api/1.0/model";
            //let url = "file://samples/bracket.cax";
            //let url = "file://samples/airbag.cax";
            //let url = "file://samples/heater.cax";
            //let url = "file://samples/merged.cax";
            //let url = "file://samples/F30_model.cax";
            //let url = "file%3A%2F%2FC%3A%5CWORK%5Centerprise-1.1-win64%5Csamples%5Cbracket.cax";
            //let url = "file%3A%2F%2FE%3A%5Ccaxserver%5CAssembly.cax";
      
            //let api = "http://100.26.229.30:8181/api/1.0/model";
            //let url = "file%3A%2F%2FC%3A%5CUsers%5CAdministrator%5CDownloads%5Centerprise-1.1-win64%5Csamples%5CF30_model.cax";           
            
            //let api = "http://ec2-54-88-72-27.compute-1.amazonaws.com:8080/api/1.0/model";
            //let url = "file%3A%2F%2FC%3A%5Cserver%5Centerprise-1.1-win64%5Csamples%5Cbracket.cax";

            
            let url = getParameterByName("url");
            if (url === "") {
              console.error("URL querystring is missing.");
              return;
            }
      
            let api = getParameterByName("api");
            if (api === "") {
              console.error("API querystring is missing.");
              return;
            }

            let reportId = getParameterByName("reportid");
            if (reportId !== "") {
              dispatch(setCurrentReportId(reportId));
            }
            else{
              console.error("reportId querystring is missing.");
              return;
            }


            let roleId = getParameterByName("roleid");
            if (roleId !== "") {
              dispatch(setCurrentRoleId(roleId));
            }
            else{
              console.error("roleId querystring is missing.");
              return;
            }


            let serverURL = getParameterByName("serverurl");
            if (serverURL !== "") {
              ServerLocation.serverURL = serverURL;
            }
            else{
              console.error("serverURL querystring is missing.");
              return;
            }

            let apiKey = getParameterByName("apikey");
            if (apiKey !== "") {
              ServerLocation.apiKey = apiKey;
            }
            else{
              console.error("apiKey querystring is missing.");
              return;
            }


            let viewerID = viewerAPIProxy.createViewer(viewerDivID);
            dispatch(addViewer({name : viewerDomID, id: viewerID }));
            loadModel(api, url, viewerID);
      }

      if(currentReportId !== ""){   
        getView(currentReportId).then((res) => {
          if(res?.data){
            const viewPointData  = res.data;   
            if (viewPointData && viewPointData.slide){
              viewPointData.slide.selectedSlide = viewPointData.slide.appliedSlide;
              viewPointData.slide.appliedSlide = "-1";
              dispatch(updateSlideData(viewPointData.slide)); 
            }
                             
            if (viewPointData && viewPointData.viewpoint)
              dispatch(updateViewpoint(viewPointData.viewpoint.viewpoints)); 
            if(viewPointData && viewPointData.slide){                    
              setTimeout(() => {
                //dispatch(setSlideSelection(viewPointData.slide.selectedSlide));
                //dispatch(downloadFile(viewPointData.slide.appliedSlide));
                //dispatch(applyView(viewPointData.slide.appliedSlide));
                if(viewPointData?.viewpoint?.viewpoints?.length > 0){
                   if(viewPointData?.slide && viewPointData.slide.rootIds.length > 0) {
                    let parentData = viewPointData.slide.data[viewPointData.slide.rootIds[0]];
                    if(parentData?.children && parentData.children.length > 0) { 
                      dispatch(applyViewpointAsync({ id:parentData.children[0],name:viewPointData.slide.data[parentData.children[0]].title }));
                    }

                   }
                
                  // if(viewPointData.viewpoint.viewpoints[0].uid)
                  //   dispatch(applyViewpointAsync({ id: viewPointData.viewpoint.viewpoints[0].uid }));
                  //dispatch(setSlideSelection("0"));
                  //dispatch(applyView("0"))
                  //dispatch(setSlideSelection(viewPointData.viewpoint.viewpoints[0].uid));
                  //dispatch(applyView(viewPointData.viewpoint.viewpoints[0].uid))
                }
              },3000);                   
            }                 
          }                
          else if(res?.error)
            console.log(res.error);                
          //else 
          //  console.log("Invalid format");
        });
      }

      if(currentRoleId !== ""){
        getUserPermission(currentRoleId).then (response => {
          if(response?.data){
            //console.log(response.data);   
            const data  = response.data;          
            dispatch(updateMenuItemState(data));
          }                           
        });
      }   
    },[ loadModel, dispatch, mount, viewerRefs, viewerDomID, currentReportId, currentRoleId ]);

    return (
      <>
      <div
        style={{ width:'100%',height:'100%'}}
        id={viewerDomID}
        ref={viewerRefs}
        className= {"viewer " + gettingStartedSteps['3D Render Window'].target.slice(1)}
      >
        <EventRegistry mount={mount}/>
        <ProbeLabel containerRef={viewerRefs}></ProbeLabel>
        <Snackbars parentRef = {viewerRefs}/>
      </div>
      
      </>
    );
}

function arePropsEqual(prevProps : any, nextProps : any) {
  return true; 
}

export default memo(Viewer, arePropsEqual);
//https://blog.logrocket.com/react-pure-components-functional/#whatisareactpurecomponent