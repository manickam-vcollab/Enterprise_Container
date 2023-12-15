import React,{useRef, useState} from 'react'
import SearchHints from 'components/shared/hintsPanel'
import clsx from 'clsx'

import useContainer from 'customHooks/useContainer'
import {getIcon, getItem, MainMenuItems, selectMainMenuItems, setActiveTab,setSearchexpanded} from 'store/mainMenuSlice'
import { addPrevSearchItem, SearchItem, selectPrevSearches,tutorialSlice ,selectSearchExpand} from 'store/tutorialSlice'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'
import { tourListSlice } from 'store/tourSlice';
import { makeStyles } from '@material-ui/core/styles';
import { DialogueProps, dialogueState } from 'store/tutorialSlice'

//styles

import useListStyles from '../../shared/List/liststyle';

import externalStyle from './styles'
import MenuList from 'components/shared/menuList'
import { createTourListFor } from 'components/layout/TourComponent/data';
import { Tour, TourData } from 'components/layout/TourComponent/tour/Types'
import { AnyAction } from '@reduxjs/toolkit'

import { TOUR_MENU_NAMES } from "components/utils/tourMenus";


type BodyProps = {
    showSearch: boolean,
    searchText:string,
    searchHintsData: string[],
    searchResults: SearchItem[],
    searchItems : SearchItem[],
    onClickSearchHints: (s:string) => void
}

const useStyle = makeStyles((theme) => ({
  searchresults: {
    fontSize: "14px",
    fontWeight:400,
    color:theme.palette.text.secondary,
    position:"absolute",
    left:11,
    marginTop:-10
  },
  recentSearches:{
    fontSize: "14px",
   fontWeight:400,
   position:"absolute",
   left:11,
    paddingTop:"0px",
    paddingLeft:5,
   color:theme.palette.text.secondary
},
})) 


function Body(props: BodyProps) {


   const classes = externalStyle();
 
  //console.log("BODY TUTORIALS: ",props)

    const listClasses = useListStyles();
    const headerRef = useRef(null);
    const dispatch = useAppDispatch();
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    const containerRef = useRef(null);
    // eslint-disable-next-line
 
    const bodyHeadingRef= useRef(null);
    const [runstate,Setrunstate]=useState<boolean>(false);  
    const isSearch = useAppSelector(selectSearchExpand); 

    const handleResultsClick = (e: SearchItem) => {
      let tour =  {title :'',description :'',}
      if (e.name==='Labels') {
        tour.title = TOUR_MENU_NAMES.LABELS
      } else if (e.name==='Animations') {
        tour.title = TOUR_MENU_NAMES.ANIMATION
      } else if (e.name==='Color Maps') {
        tour.title = TOUR_MENU_NAMES.COLOR_MAP_LIST
      } else {
        tour = createTourListFor(e.name);
      }
      // let tour: any = createTourListFor(e.name);
      let dialogProps:DialogueProps={
        dialogueRun: true,
        tourName: tour.title,
        description: tour.description as string,
        stepIndex: 0
      }
      dispatch(addPrevSearchItem(props.searchText));
      dispatch(dialogueState(dialogProps));         
    }
    const handleHintsClick = (s:string) => {
      dispatch(addPrevSearchItem(props.searchText));
      props.onClickSearchHints(s);
    }

  return (
    <>
    <div ref = {containerRef} style={{height:'100%', overflow:'hidden'}} >

{
       isSearch  ? 
          <div ref = {headerRef} >
                 <span  style={{display:"flex",marginLeft:'15px',marginTop:'5px'}} className={clsx(classes.bodyHeading)}>Recent Searches</span>
        <SearchHints
        data={props.searchHintsData}
        onClick={handleHintsClick}
        onDelete={() => {}}
        showDelete={false}
        />
        </div> : null
}
<div ref={bodyHeadingRef} >

{
  
  props.searchResults.length>0 && isSearch ?  <span style={{display:"flex",marginLeft:'15px'}} className={clsx(classes.bodyHeading)}>Search Results</span>:<span style={{display:"flex",marginLeft:'15px',marginTop:'5px'}} className={clsx(classes.bodyHeading)}>All</span>
}
    </div>
    <div style={{marginTop:'-10px'}}> 
       <MenuList handleClick={handleResultsClick} searchResults={props.searchResults} menuItems={props.searchItems} icon={false} reference={headerRef} reference2={containerRef} reference3={bodyHeadingRef}/>
    </div>  
    </div>
    </>
    
  )
}

export default Body
