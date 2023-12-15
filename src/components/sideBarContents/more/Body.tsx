import React,{useRef,useState} from 'react'
import clsx from  'clsx';
import SearchHints from 'components/shared/hintsPanel'
import useListStyles from '../../shared/List/liststyle'
import useContainer from 'customHooks/useContainer'
import {getIcon, getItem, selectMainMenuItems, selectSearchexpand, setActiveTab, setSearchexpanded} from 'store/mainMenuSlice'
import { addPrevSearchItem, SearchItem, selectPrevSearches } from 'store/moreSlice'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'
import { push } from 'connected-react-router/immutable'
import MenuList from 'components/shared/menuList'


//style
import style from './style';
import { tourListSlice } from 'store/tourSlice';

type BodyProps = {
    showSearch: boolean,
    searchText:string,
    searchHintsData: string[],
    searchResults: SearchItem[],
    searchItems: SearchItem[],
    onClickSearchHints: (s:string) => void
}



function Body(props: BodyProps) {
   
    const useStyle = style(); 

    const listClasses = useListStyles();
    const headerRef = useRef(null);
    const bodyHeadingRef = useRef(null);
    const dispatch = useAppDispatch();
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[]);
    const [bodyHeadingWidth, bodyHeadingHeight] = useContainer(bodyHeadingRef,[]);

    const [isSearchMode, setIsSearchMode] = useState(false);

    const isSearch=useAppSelector(selectSearchexpand);

    //console.warn("isSearch",isSearch);

    const handleResultsClick = (e:any) => {
      //dispatch(setActiveTab({menuItem:getItem(e.id,mainMenuItems)}));
      dispatch(push(e.path));    
      dispatch(addPrevSearchItem(props.searchText));
      dispatch(tourListSlice.actions.setManualStepForward());  
    }

    const handleHintsClick = (s:string) => {
      dispatch(addPrevSearchItem(props.searchText));
      props.onClickSearchHints(s);  
    }


//console.warn(props.searchResults.length)
//console.warn(props.searchHintsData.length)
  return (
    <div ref = {containerRef} style={{height:'100%', overflow:'hidden'}} >
    {
      isSearch?
          <div id='step29' ref = {headerRef} style={{marginBottom:'-50px '}} >
            <span  style={{display:"flex",marginLeft:'15px',marginTop:'5px'}} className={clsx(useStyle.bodyHeading)}>Recent Searches</span>
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
            props.searchResults.length>0 && isSearch ? <span style={{display:"flex",marginLeft:'15px'}} className={useStyle.bodyHeading}>Search Results</span>:<span style={{display:"flex",marginLeft:'15px'}} className={useStyle.bodyHeading}>All</span>
    }
</div>

      
<MenuList handleClick={handleResultsClick} searchResults={props.searchResults} menuItems={props.searchItems} icon={true} reference={headerRef} reference2={containerRef} reference3={bodyHeadingRef}/>
    </div>
    
  )
}

export default Body
