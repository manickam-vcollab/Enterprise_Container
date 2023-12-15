import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from "@material-ui/icons/HelpOutline";

import {goBack, push} from 'connected-react-router/immutable';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { Routes } from '../../../routes';
import SearchBox from '../../shared/searchBox';
import Body from './Body'
import { useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { SearchItem, getSearchItems, selectPrevSearches} from '../../../store/moreSlice'
import { selectMainMenuItems, selectSearchexpand, setSearchexpanded } from 'store/mainMenuSlice';


import  styles from './style';
import useStyles from '../productExplorer/DisplayModes/styles';
import { selectisTourRunning, tourListSlice } from 'store/tourSlice';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';


// Header IconButton Component

import HeaderIconButton from '../../shared/headerIconButton/IconButton';
import { createTourListFor} from 'components/layout/TourComponent/data';
// import useLocalStorage from 'customHooks/useLocalStorage';
import { getIsTourVisitableState, getTourVisitedState, setMenusState } from 'store/tourStateSlice';

export default function More(props:any){
    
    const dispatch = useAppDispatch();  
    
    const useStyle = styles();
    
    const [showSearch ,setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const prevSearchItems = useAppSelector(selectPrevSearches);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [searchList,setSearchList] = useState(getSearchItems(mainMenuItems,true));
    // const[setTourHelp]=useState(false);
 
    const oldUser:any  = JSON.parse(localStorage.getItem("vct-tour"))||{};
    const tourVisitedState = useAppSelector(getTourVisitedState);
    const isTourVisitable = useAppSelector(getIsTourVisitableState)
    oldUser.menus = true;
    const isTourRunning = useAppSelector(selectisTourRunning)
    // const [userType, setUserType] = useLocalStorage("vct-tour");
    if(!(tourVisitedState?.menus) && !isTourRunning && isTourVisitable){
      let tour: any = createTourListFor(TOUR_MENU_NAMES.MENUS);
      let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: tour.title,
      description: tour.description as string,
      stepIndex: 1
    }
        dispatch(dialogueState(dialogProps));  
        // setUserType(oldUser);
        localStorage.setItem("vct-tour", JSON.stringify(oldUser));
        dispatch(setMenusState({menus:oldUser.menus}))
    }
    
    const handleResultsClick = () => {
      let tour: any = createTourListFor(TOUR_MENU_NAMES.MENUS);
      let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: tour.title,
      description: tour.description as string,
      stepIndex: 1
    }
      dispatch(dialogueState(dialogProps));
    }


    const getHeaderLeftIcon= () => {
      return null
    }

    const getHeaderContent = () => {
      return(
      showSearch? 
      <SearchBox 
        text={searchText} 
        onChange={(e:any,r:any[]) => {
          setSearchText(e);
          setTimeout(() => {
            dispatch(tourListSlice.actions.setUpdateAction("#step11"))
          }, 100);
          setSearchResults(r.map(el => el.item));
        }} 
        onClear={() => {}} 
        searchPool={searchList}
        placeholder='Type here'
        getAttribKeys={(data: SearchItem) => {return ["name"]}}
        />
        :
        <div>
          <Title text="Menu Items" />
        </div>
        
        )
    } 
    const onclicksearch=()=>{
      setTimeout(() => {
        dispatch(tourListSlice.actions.setManualStepForward());
      }, 1000);
      setShowSearch(true)
      dispatch(setSearchexpanded(true));
     
    
    }

    const onclickClear=()=>{
      setShowSearch(false)
      dispatch(setSearchexpanded(false))  
    }
    const getHeaderRightIcon = () => {
      return(
     
     <div >
       {
       !showSearch  ? <HeaderIconButton  disabled={false} icon={<SearchIcon />} label={'search'} onClick={onclicksearch}  ></HeaderIconButton >
       :<HeaderIconButton  disabled={false} icon={<ClearIcon/>} label={'go back to more options'} onClick={onclickClear} ></HeaderIconButton>
       }
       <HeaderIconButton  disabled={false} icon={<HelpIcon/>} label={'help'} onClick={handleResultsClick}></HeaderIconButton>
     </div>
 
    )
    }
   

    const getBody = () => {
      return (
      
            <Body 
             
            showSearch={showSearch}
            searchItems={searchList}
            searchText={searchText}
            searchHintsData={prevSearchItems}
            searchResults={ showSearch ? searchResults : searchList}
            onClickSearchHints={(s:string) => {
              setShowSearch(true);
              setTimeout(() => setSearchText(s),10)
            }}
            />
            
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