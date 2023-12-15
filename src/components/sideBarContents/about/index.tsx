import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import Suggest from './pages/suggest'
import AboutPage from './pages/aboutpage'
function About() {
    
    return (
        <Switch>
   
        
   <Route path={Routes.ABOUTPAGE}>
            <AboutPage/>
        </Route>

    </Switch>
        
    )
}

export default About
