import { mat4 } from 'gl-matrix';
import viewerMgr from './ViewerManager';
import { viewerEvents, globalEvents, EventDispatcher, InteractionMode, IHotspotParams } from './ViewerManager';
export type { IHotspotParams }  from './ViewerManager';

export function createViewer(viewerDivID : string, disableMouseEvents : boolean = false){
    return viewerMgr.createViewer(viewerDivID, disableMouseEvents);
}
export function getProductTree(viewerDivID : string){
    return viewerMgr.getProductTree(viewerDivID);
}
export function getEventDispatcher():EventDispatcher | null {
    return viewerMgr.getEventDispatcher() as EventDispatcher | null;
}
export function setInteractionMode(mode:InteractionMode,viewerDivID:string) {
    viewerMgr.setInterationMode(mode,viewerDivID);
}
export function getEventsList(){
    return viewerMgr.getEventsList();
}

export function loadModel(api: string, url: string, activeViewerID: string){
    return viewerMgr.loadModel(api, url, activeViewerID);
}

export function showModel(activeViewerID: string){
    return viewerMgr.showModel(activeViewerID);
}

export function getSceneBoundingBox(onlyVisible:boolean = true, activeViewerID:string) {
    return viewerMgr.getSceneBoundingBox(onlyVisible, activeViewerID);
}

export function setPartVisibility(nodeIds:string[], toShow:boolean, activeViewerID:string){
    return viewerMgr.setPartsVisibility(nodeIds,toShow,activeViewerID);
}

export function invertPartsVisibility(activeViewerID:string) {
    return viewerMgr.invertPartsVisibility(activeViewerID);
}

export function getDisplayModes(nodeIds:string[],activeViewerID:string,) {
    return viewerMgr.getDisplayModes(nodeIds,activeViewerID);
}
export function setDisplayMode(displayModeId:string, nodeIds:string[],activeViewerID:string) {
    return viewerMgr.setDisplayMode(displayModeId,nodeIds,activeViewerID);
}
export function setHighlightedNodes(toShow: boolean, nodeIds:string[], activeViewerID:string) {
    return viewerMgr.setHighlightedNodes(nodeIds,toShow,activeViewerID);
}
export function setMouseBindings(json:any, activeViewerID:string) {
    //console.log(json);
    return viewerMgr.setMouseInputMapping(json,activeViewerID);
}
export function getMouseData(activeViewerID:string) :any {
    let data = viewerMgr.getMouseInputData(activeViewerID);
    //console.log(JSON.stringify(data));
    return data;
}
export function getSystemMouseMappings(activeViewerID:string):any[] {
    let data = viewerMgr.getSystemMouseMappings(activeViewerID);
    //console.log(JSON.stringify(data));
    return data;
}
export function getViewerSize(activeViewerID:any) : [number, number]{ 
    return viewerMgr.getViewerSize(activeViewerID);
}

//#region Camera
export function getCameraStdViews(activeViewerID:string) : any {
    //console.log(viewerMgr.getCameraStdViews(activeViewerID));
    return viewerMgr.getCameraStdViews(activeViewerID);
}
export function setCameraProjection(camType: any, activeViewerID:string) {
    viewerMgr.setCameraProjection(camType,activeViewerID);
}
export function getCameraInfo(camType:any, activeViewerID:string, ) {
    return viewerMgr.getCameraInfo(camType,activeViewerID);
}
export function setCameraInfo(camData:any, activeViewerID:string) {
    viewerMgr.setCameraInfo(camData,activeViewerID);
    //console.log(camData);
}
//#endregion
// part Manipulation
export function enablePickAndMove(toEnable:boolean, activeViewerID:string) {
    return viewerMgr.enablePickAndMove(toEnable,activeViewerID);
}
export function resetPickAndMove(activeViewerID:string) {
    return viewerMgr.resetPickAndMove(activeViewerID);
}

export function getPartPickandMoveMatrix(nodeId:string, viewerUUID:any){
    return viewerMgr.getPartPickandMoveMatrix(nodeId, viewerUUID);   
}

export function  setPartPickandMoveMatrix(nodeIds:string[], mat4 : number[], viewerUUID:any){
    viewerMgr.setPartPickandMoveMatrix(nodeIds, mat4, viewerUUID);    
}

export function fitView(activeViewerID: string, nodeIds:string[] = []){
    return viewerMgr.fitView(nodeIds,activeViewerID);
}

export function captureScreen(activeViewerID: string){
    return viewerMgr.captureScreen(activeViewerID);
}

export function getSearchHints(activeViewerID:string) {
    return viewerMgr.getSearchHints(activeViewerID);
}

export function getModelInfo(activeViewerID:string) {
    return viewerMgr.getModelInfo(activeViewerID);
}

export function getDisplayResult(activeViewerID:string) {
    return viewerMgr.getDisplayResult(activeViewerID);
}

export function applyResult(resultId:string, stepId:string, derivedTypeId:string, activeViewerID:string) {
    return viewerMgr.applyResult(resultId, stepId, derivedTypeId, activeViewerID);
}

export function setValueMinMax(minMax : [number, number], activeViewerID:string) {
    return viewerMgr.setValueMinMax(minMax, activeViewerID);
}

export function getDeformationValues(resultId : string, stepId : string, derivedTypeId: string, activeViewerID:any){ 
    return viewerMgr.getDeformationValues(resultId, stepId, derivedTypeId, activeViewerID);
}

export function setLegendData(paletteType : string, colors : number[][], activeViewerID?:string, noResultColor ?: [number, number, number, number]) {
    return viewerMgr.setLegendData(paletteType, colors, activeViewerID, noResultColor);
}

export function setNoResultColor(noResultColor : [number, number, number, number], activeViewerID:string) {
    return viewerMgr.setNoResultColor(noResultColor, activeViewerID);
}

export function setAboveMaxColor(aboveMaxColor : [number, number, number, number], activeViewerID:string){
    return viewerMgr.setAboveMaxColor(aboveMaxColor, activeViewerID);
}

export function setBelowMinColor(belowMinColor : [number, number, number, number], activeViewerID:string){
    return viewerMgr.setBelowMinColor(belowMinColor, activeViewerID);
}

export function getCurrentResultMinMAX( activeViewerID:string) {
    return viewerMgr.getCurrentResultMinMAX(activeViewerID);
}

export function applyMaterialColor(nodeIndexList:number[], activeViewerID:string) {
    return viewerMgr.applyMaterialColor(nodeIndexList, activeViewerID);
}

//#region Probe
export function probe(pointerData:{xyFromTop:number[], width:number,height:number},activeViewerID:string) {
    return viewerMgr.probeFromNodes(pointerData,activeViewerID);
}
//#endregion
//#region Labels
export function add3DLabel(uid:string,hitPoint:any[],type:any,probeData:any,activeViewerID:string) {

    viewerMgr.add3DLabel(uid,hitPoint,type,probeData,activeViewerID);
}

export function showHideLabelVisibility(id:string, flag:boolean,activeViewerID:string) {
    viewerMgr.showHideLabelVisibility(id,flag,activeViewerID)
}

export function addMeasurementLabel(uid:string,hitPoint:any[],type:any,probeData:any,activeViewerID:string) {

    viewerMgr.addMeasurementLabel(uid,hitPoint,type,probeData,activeViewerID);
}

export function add3dLabelforNodeId(uid:string, type:any, nodeIds:Array<number>, modelIndex:number, activeViewerID:string) : boolean{
    return viewerMgr.add3dLabelforNodeId(uid, type, nodeIds, modelIndex, activeViewerID);
} 
/*
export function addHotspot3dLabel(uid:string, type:any, modelIndex : number, hotspotParams:IHotspotParams, variableId:string, stepId:string, derivedTypeId:string, activeViewerID:string) : Promise<Array<string>>{
    return viewerMgr.addHotspot3dLabel(uid , type, modelIndex, hotspotParams, variableId, stepId, derivedTypeId, activeViewerID);
}
*/
export function getHotspotData(hotspotParams:IHotspotParams, variableId:string, stepId:string, derivedTypeId:string, activeViewerID:any) :  Promise<Uint32Array>{
    return viewerMgr.getHotspotData(hotspotParams,variableId,stepId,derivedTypeId,activeViewerID);
}

export function add3dLabelforNodeIndex(id:string, type:any, nodeindex:number, modelIndex : number, activeViewerID:any) : string {
    return viewerMgr.add3dLabelforNodeIndex(id,type,nodeindex,modelIndex,activeViewerID);
}

export function delete3DLabel(uid:string,activeViewerID:string):boolean{
    return viewerMgr.delete3DLabel(uid,activeViewerID);
}
export function get3DLabelCanvasPos(uid:string,activeViewerID:string):number[] | null {
    return viewerMgr.get3DLabelCanvasPos(uid,activeViewerID);
}

export function getLabel3DInfo(id:string,activeViewerID:string) : unknown | null {
    return viewerMgr.getLabel3DInfo(id, activeViewerID);
 }

//#endregion
//#region Section
export function getSectionGUIData(activeViewerID:string) {
    return viewerMgr.getSectionGUIData(activeViewerID);
}

export function setActiveSectionPlane(planeId:number, activeViewerID:string) {
    return viewerMgr.setActiveSectionPlane(planeId,activeViewerID);
}

export function addSectionPlane(planeId:number, transform:mat4, color:[number,number,number,number],activeViewerID:string){
    return viewerMgr.addSectionPlane(planeId,transform,color,activeViewerID);
}

export function deleteSectionPlane(planeId:number,activeViewerID:string) {
    return viewerMgr.deleteSectionPlane(planeId,activeViewerID);
}
export function getSectionPlaneEquation(planeId:number, activeViewerID:string) {
    return viewerMgr.getSectionPlaneEquation(planeId,activeViewerID);
}

export function setSectionPlaneEquation(planeId:number, transform:mat4, initTransform?:mat4, activeViewerID?:string,) {
    return viewerMgr.setSectionPlaneEquation(planeId,transform, initTransform, activeViewerID);
}

export function setSectionPlaneGUIData(planeId:number,selectedPlaneOptions:any, activeViewerID:any){
    viewerMgr.setSectionPlaneGUIData(planeId,selectedPlaneOptions,activeViewerID);
    return 'SUCCESS'
}

//#endregion
//#region Animation    
export function startAnimation(activeViewerID : any) : boolean{
    return viewerMgr.startAnimation(activeViewerID);
}

export function stopAnimation(activeViewerID : any) : boolean{
    return viewerMgr.stopAnimation(activeViewerID);
}

export function pauseAnimation(activeViewerID : any) : boolean{
    return viewerMgr.pauseAnimation(activeViewerID);
}

export function setAnimationData(type : any, numberOfFrames : number,  delay : number, activeViewerID : any) : boolean{
    return viewerMgr.setAnimationData(type, numberOfFrames, delay, activeViewerID);
}

export function changeAnimationFrameDelay(delay : number, activeViewerID : any) : boolean {
    return viewerMgr.changeAnimationFrameDelay(delay, activeViewerID);
}

export function moveForwardAnimationFrame(viewerUUID : any){
    return viewerMgr.moveForwardAnimationFrame(viewerUUID);
}
 
export function moveBackwardAnimationFrame(viewerUUID : any){
    return viewerMgr.moveBackwardAnimationFrame(viewerUUID);
}

export function moveToSpecificAnimationFrame(frameNumber : number, viewerUUID : any){
    return viewerMgr.moveToSpecificAnimationFrame(frameNumber, viewerUUID);
}
export function setAnimationScaleFactor(scalefactor : [number, number ,number], viewerUUID : any){
    return viewerMgr.setAnimationScaleFactor(scalefactor, viewerUUID);
}
//#endregion

//#Camera Controls
export function zoomOut(scale:number,activeViewerID:string) {
    viewerMgr.zoomOut(scale,activeViewerID)
}
export function zoomIn(scale:number,activeViewerID:string) {
    viewerMgr.zoomIn(scale,activeViewerID)
}
export function pointZoomIn(posX:number,posY:number,factor:number,activeViewerID:any) {
    viewerMgr.pointZoomIn(posX,posY,factor,activeViewerID)
}
export function pointZoomOut(posX:number,posY:number,factor:number,activeViewerID:any) {
    viewerMgr.pointZoomOut(posX,posY,factor,activeViewerID)
}
export function onMouseRotation(newX:number,newY:number,lastX:number,lastY:number, activeViewerID:any) {
    viewerMgr.onMouseRotation(newX,newY,lastX,lastY,activeViewerID)
}
export function onMousePanRotation(newMouseX:number, newMouseY:number, lastMouseX:number, lastMouseY:number, activeViewerID:any) {
    viewerMgr.onMousePanRotation(newMouseX,newMouseY,lastMouseX,lastMouseY, activeViewerID)
}
export function panRotateCamera(deltaX:number, deltaY:number, activeViewerID:any) {
    viewerMgr.panRotateCamera(deltaX,deltaY, activeViewerID)
}
export function rotateCamera(angleInRadian : number, axisInCameraCoord : [number, number, number], activeViewerID:any) {
    viewerMgr.rotateCamera(angleInRadian, axisInCameraCoord, activeViewerID);
}
export function zoomOutCamera(scale:number,activeViewerID:string) {
    viewerMgr.zoomOutCamera(scale,activeViewerID)
}
export function zoomInCamera(scale:number,activeViewerID:string) {
    viewerMgr.zoomInCamera(scale,activeViewerID)
}
export function handleGUIEvents(eventType:any,event:any,activeViewerID:any){
    viewerMgr.handleGUIEvents(eventType,event,activeViewerID);
}
export function translatePart(newMouseX:number,newMouseY:number,lastMouseX:number,lastMouseY:number,activeViewerID:any){
    viewerMgr.translatePart(newMouseX,newMouseY,lastMouseX,lastMouseY,activeViewerID);
}
export function rotatePartCamera(angleInRadian: number, axisInCameraCoord : [number, number, number],activeViewerID:any){
    viewerMgr.rotatePartCamera(angleInRadian,axisInCameraCoord,activeViewerID)
}
export function translateZ(scale:number,activeViewerID:any){
    viewerMgr.translateZ(scale,activeViewerID);
}
//#endregion


export {EventDispatcher, viewerEvents,globalEvents, InteractionMode};