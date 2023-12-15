
import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import clsx from  'clsx';

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import {selectAppVersion,selectAppdisplayName} from '../../../../store/appSlice'


// import style

import style from '../style';
import { goBack, push } from "connected-react-router/immutable";
import { Routes } from 'routes';

export default function AboutPage(props:any){

    const appName = useAppSelector(selectAppdisplayName);
    const appVersion = useAppSelector(selectAppVersion);
    const useStyle = style();
    const dispatch=useAppDispatch();

    const getHeaderLeftIcon= () => {
      return null
    }

    const getHeaderContent = () => {
      return(
        <div style={{paddingLeft: '1px'}}>
          <Title text="About" />
        </div>
        )
    }
    
    const getHeaderRightIcon = () => {
      return(
     
        <div >
        </div>
    
       )
    }

    
    const getBody = () => {
      return (
         <div id="about_container" style={{position:'absolute',marginLeft:'20px',marginTop:'20px'}}>
              <div id="app_displayName" className={useStyle.app_displayName}>
                {appName}
              </div>
                {/* <Typography variant="body2">{appName}</Typography> */}
              <div id="app_version" className={clsx(useStyle.app_version,useStyle.textColor)}>
                {`Version: ${appVersion}`}
              </div>
              <div id="copy_right" className={clsx(useStyle.copy_right,useStyle.textColor)}>
                 &copy; 2023 VCollab.All rights reserved
              </div>
                {/*
              <div id="whatnew" className={clsx(useStyle.what_new,useStyle.textColor)}>
                <Link to='/about/whatsnew' target='_blank'>What's new</Link>
              </div>
             <div id="whatnew" className={clsx(useStyle.what_new,useStyle.textColor)}>
                <Link to='/about/suggest' target='_blank' >Suggest</Link>
              </div> 
               <div id="feedback" className={useStyle.privacy}>
                <Link to='/about/feedback' target='_blank'>Give Feedback</Link> 
              </div>
              */}
          
              <div id="terms" className={useStyle.terms}>
                <Link to='/about/terms' target='_blank'>Terms of use</Link>
              </div>
              <div id="privacy" className={useStyle.privacy}>
                <Link to='/about/privacy' target='_blank'>Privacy statement</Link> 
              </div>
             
         </div>
      )
    }      

    const getFooter = () => {
        return null
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}
