import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import ToolBarItems from './pages/toolbarItems'
import ToolBarList from './pages/toolbarList'
import ToolBarPosition from './pages/toolbarPositionOrientation'
function ToolBar() {
    
    return (
        <Switch>
        <Route path={Routes.TOOLBARITEMS}>
            <ToolBarItems/>
        </Route>
        <Route path={Routes.TOOLBARLIST}>
            <ToolBarList/>
        </Route>
        <Route path={Routes.TOOLBARPOSITION}>
            <ToolBarPosition/>
        </Route>
        
    </Switch>
        
    )
}

export default ToolBar
