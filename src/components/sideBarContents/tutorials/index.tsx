import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import {goBack, push} from 'connected-react-router/immutable';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { Routes } from '../../../routes';
import SearchBox from '../../shared/searchBox';
import Body from '../tutorials/Body';
import { useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { SearchItem, getSearchItems, selectPrevSearches ,setSearchExpand} from '../../../store/tutorialSlice'
import {getSearchItems as getSearchItemsMoreSlice} from '../../../store/moreSlice'
import { selectMainMenuItems,setSearchexpanded } from 'store/mainMenuSlice';
import nextId from 'react-id-generator';
import { selectisTourRunning, tourListSlice } from 'store/tourSlice';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import style from './styles';

// Header Icon Button

import HeaderIconButton from '../../shared/headerIconButton/IconButton';
import { createTourListFor } from 'components/layout/TourComponent/data';
// import useLocalStorage from 'customHooks/useLocalStorage';
import { getIsTourVisitableState, getTourVisitedState, setGuidesState } from 'store/tourStateSlice';
export default function Tutorials(props:any){
    
    // const dispatch = useAppDispatch();  
    function menuItemsFunc(menuitems:any) {
      const newArray = menuitems.map(item => {
        const newObj = {
          id: item.id,
          name: item.name,
          tag: []
        };
        return newObj;
      });
      return newArray;
    }

    function removeObjectsByName(array1, array2) {
      const newArray = [];
      array1.forEach(item1 => {
        const item2 = array2.find(item => item.name.toLowerCase() === item1.name.toLowerCase() || item1.name.toLowerCase()==="Menus".toLowerCase()
                                                                                                || item1.name.toLowerCase()==="Getting Started".toLowerCase() 
                                                                                                || item1.name.toLowerCase()==="Activity Bar".toLowerCase() );
        if (item2) {
          newArray.push(item1);
        }
      });
      return newArray;
    }
    const groupelements: SearchItem[] = [
      {
        id: nextId(),
        name: "Getting Started",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Menus",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Activity Bar",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Guides",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "History",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Display Mode",
        tag: ["Shaded","WireFrame"],
        display:true
      },
      {
        id: nextId(),
        name: "Assembly Tree",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Clip Planes List",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Labels",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Animations",
        tag: [],
        display:true
      },
      {
        id: nextId(),
        name: "Color Maps",
        tag: [],
        display:true
      },
    ];

    const [showSearch ,setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const prevSearchItems = useAppSelector(selectPrevSearches);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [menuItems,menuSetSearchList] = useState(getSearchItemsMoreSlice(mainMenuItems,true));
    // const [searchList,setSearchList] = useState(getSearchItems(groupelements));
    let newMenuItems = removeObjectsByName(groupelements, menuItemsFunc(menuItems))
    // let newMenuItems = removeObjectsByName(menuItems,groupelements)
    const [searchList,setSearchList] = useState(getSearchItems(newMenuItems));
    
    const dispatch = useAppDispatch();
    const useStyle = style(); 

    const oldUser:any  = JSON.parse(localStorage.getItem("vct-tour"))||{};
    const tourVisitedState = useAppSelector(getTourVisitedState);
    const isTourVisitable = useAppSelector(getIsTourVisitableState)
    oldUser.guides = true;
    const isTourRunning = useAppSelector(selectisTourRunning)
    // const [userType, setUserType] = useLocalStorage("vct-tour");
    if(!(tourVisitedState?.guides) && !isTourRunning && isTourVisitable){
      let tour: any = createTourListFor(TOUR_MENU_NAMES.GUIDES);
      let dialogProps:DialogueProps={
      dialogueRun: true,
      tourName: tour.title,
      description: tour.description as string,
      stepIndex: 1
    }
        dispatch(dialogueState(dialogProps));  
        // setUserType(oldUser);
        localStorage.setItem("vct-tour", JSON.stringify(oldUser));
        dispatch(setGuidesState({guides:oldUser.guides}))
    }

    const handleResultsClick = () => {
      let tour: any = createTourListFor(TOUR_MENU_NAMES.GUIDES);
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
          dispatch(tourListSlice.actions.setUpdateAction("#step11"))
          setSearchText(e);
          setSearchResults(r.map(el => el.item));
        }} 
        onClear={() => {}} 
        searchPool={searchList}
        placeholder='Type here'
        getAttribKeys={(_data: SearchItem) => {return ["name","tag"]}}
        />
        :
        <div style={{paddingLeft: '1px'}}>
          <Title text="Guides" />
        </div>
        )
    }
    

    const onclicksearch=()=>{
      setShowSearch(true)
      dispatch(setSearchExpand(true) )
      setTimeout(() => {
        dispatch(tourListSlice.actions.setManualStepForward());
      }, 100);
    }

    const onclickClear=()=>{
      setShowSearch(false)
      dispatch(setSearchExpand(false))
    }

    const getHeaderRightIcon = () => {
      return(
     
        <div >
          {
          !showSearch ? <HeaderIconButton id={'step10'} disabled={false} icon={<SearchIcon/>} label={'search'} onClick={onclicksearch}></HeaderIconButton>
          :<HeaderIconButton id={'step10'} disabled={false} icon={<ClearIcon/>} label={'go back to more options'} onClick={onclickClear}></HeaderIconButton>
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