import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'

import EditLabel from './pages/editLabel';
import LabelList from './pages/labelList';
import LabelNotes from './pages/labelNotes';
import PlotsLable from './pages/labelPlots';
import PointLabel from './pages/pointLabel';
import SelectWindow from './pages/pickerWindow';
import FaceLabel from './pages/faceLabel';
import PointToPoint from './pages/pointToPoint';
import PointArcLength from './pages/pointArcLength';
import Label3DChart from './pages/label3DChart';
import Hotspots from './pages/hotspots';

function Labels() {
    
    return (
        <Switch>
            <Route path={Routes.All_LABELS_LIST}>
                <LabelList/>
            </Route> 
            <Route path={Routes.POINT_2D_NOTES}>
                <LabelNotes/>
            </Route>
            <Route path={Routes.All_LABELS_EDIT}>
                <EditLabel/>
            </Route>
            <Route path={Routes.POINT_LABEL}>
                <PointLabel/> 
            </Route>
            <Route path={Routes.SELECT_WINDOW}>
                <SelectWindow/> 
            </Route>
            <Route path={Routes.FACE_Label}>
                <FaceLabel/>
            </Route>
            <Route path={Routes.POINT_TO_POINT}>
                <PointToPoint/>
            </Route>
            <Route path={Routes.POINT_ARC_LENGTH}>
                <PointArcLength/>
            </Route>
            <Route path={Routes.LABEL_3D_CHART}>
                <Label3DChart/>
            </Route>
            <Route path={Routes.POINT_2D_PLOTS}>
                <PlotsLable/>
            </Route>
            <Route path={Routes.HOTSPOT}>
                <Hotspots/> 
            </Route>
            
        </Switch>
    )
}

export default Labels