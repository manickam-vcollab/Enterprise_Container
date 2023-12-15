import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import AnimationList from './pages/animationList'
import AnimationEdit from './pages/animationEdit'
import Linear from './pages/linear'
import Eigen from './pages/EigenVector';
import Transient from './pages/Transient'
import ViewPoint from './pages/ViewPoint'

function Animation() {
    
    return (
        <Switch>
             <Route path={Routes.ANIMATION_LIST}>
                <AnimationList />
            </Route> 
            <Route path={Routes.LINEAR}>
                <Linear />
            </Route> 
            <Route path={Routes.ANIMATION_EDIT}>
                <AnimationEdit />
            </Route> 
            <Route path={Routes.EIGEN}>
                <Eigen />
            </Route> 
            <Route path={Routes.TRANSIENT}>
                <Transient />
            </Route> 
            <Route path={Routes.VIEW_POINT}>
                <ViewPoint />
            </Route> 
            </Switch>
    )
}

export default  Animation