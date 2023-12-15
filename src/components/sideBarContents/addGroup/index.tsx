import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import {goBack, push} from 'connected-react-router/immutable';
import nextId from 'react-id-generator';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { Routes } from '../../../routes';
import SearchBox from '../../shared/searchBox';
import Body from './Body'
import { useEffect, useRef, useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { getSearchItems, SearchItem, selectList, selectPrevSearches} from '../../../store/moreSlice'
import OptionContainer from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import Option from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PublishIcon from '@material-ui/icons/Publish';
import { Input } from '@material-ui/core';
import { addMenuItem, addTab, deleteMenuItem, getItem, MainMenuItem, MainMenuItems, removeTab, selectActiveTab, selectMainMenuItems, setActiveTab, updateMenuItem } from 'store/mainMenuSlice';
import { Edit } from '@material-ui/icons';
import { selectAppBarVisibility, selectSidebarVisibility, setSidebarVisibility } from 'store/appSlice';
import { tourListSlice } from 'store/tourSlice';

type AddGroupProps = {
    disabled: boolean,
    onClickEdit: () => void,
    selectedGroup: MainMenuItem
}

export default function AddGroup(props:AddGroupProps){
    
    const dispatch = useAppDispatch();  
    const [groupName, setGroupName] = useState(props.selectedGroup.name);
    const [showSearch ,setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SearchItem[]>(props.selectedGroup.children);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [searchList, setSearchList] = useState(getSearchItems(mainMenuItems,true));
    const selectedGroupRef = useRef<MainMenuItem | null>(null);

    // useEffect(() => {
      
    //   return () => {
    //     let selectedMainMenuItems = selectedItems.map( e => getItem(e.id,mainMenuItems));
    //     // if(selectedGroupRef.current)
    //     // dispatch(updateMenuItem({
    //     //   menuItem: {
    //     //     ...selectedGroupRef.current,
    //     //     isEditMode: true
    //     //   }
    //     // }))
    //     // else{
    //     //     handleAddGroupDelete();
    //     // } 
  
    //   }
    // },[])

    const getHeaderLeftIcon= () => {
      return null
    }
    const handleFocus=(event: any)=>{
      dispatch(tourListSlice.actions.setUpdateAction("#step11"))
    }
    const handleEnterEvent=(event:any)=>{
      if (event.keyCode == 13) {
        dispatch(tourListSlice.actions.setUpdateAction("#step11"))
        dispatch(tourListSlice.actions.setManualStepForward());
      }
    }

    const getHeaderContent = () => {
      return(
      showSearch? 
      <SearchBox 
        text={searchText} 
        onChange={(e:any,r:any[]) => {
          setSearchText(e);
          setSearchResults(r.map(e => e.item));
        }} 
        onClear={() => {}} 
        searchPool={searchList}
        placeholder='type here'
        getAttribKeys={(data: SearchItem) => {return ["name"]}}
        />
        :
        <Input style={
          {
            margin:5,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 5,
            height:40,
            width: 182
          }
        }
        value={groupName}
        onChange={e => setGroupName(e.target.value)} 
        onFocus={e=> handleFocus(e.target.value)}
        onKeyUp={e=> handleEnterEvent(e)}
        defaultValue={groupName} inputProps={{ 'aria-label': 'description' }}/>
        )
    }
    

    const getHeaderRightIcon = () => {
      return(
    <>
    {
      !showSearch ?
       
    <IconButton style={{display: "inherit",marginLeft: "44px"}}aria-label="search" onClick={() => {setShowSearch(true)}}>
          <SearchIcon/>
        </IconButton>
         
      :
      
      <IconButton style={{display: "inherit",marginLeft: "44px"}} aria-label="go back to more options" onClick={() => {setShowSearch(false)}}>
      <ClearIcon />
    </IconButton>
     
    }
    </>
    )
    }

    const getBody = () => {
      return (
            <Body 
            showSearch={showSearch}
            searchItems={searchList}
            searchText={searchText}
            selectedList={selectedItems}
            setSelectedList={setSelectedItems}
            searchResults={ showSearch ? searchResults : searchList}
            onClickSearchHints={(s:string) => {
              setShowSearch(true);
              setTimeout(() => setSearchText(s),10)
            }}
            />
      )
    }   

    const handleSave = () => {
      let selectedMainMenuItems = selectedItems.map( e => getItem(e.id,mainMenuItems));
      let customPath = Routes.CUSTOM_GROUP+props.selectedGroup.id+'/'
      let menuItem = {
        ...props.selectedGroup,
        isEditMode: false,
        name: groupName,
        children: selectedMainMenuItems,
        path:customPath
      };
      selectedGroupRef.current = menuItem;
      dispatch(updateMenuItem({
        menuItem
      }))
      dispatch(push(customPath));
      setTimeout(() => dispatch(setActiveTab({menuItem})) , 10)
      setTimeout(() => {
        dispatch(tourListSlice.actions.setUpdateAction("#step12"))
        dispatch(tourListSlice.actions.setManualStepForward());
      }, 15);
      
    }

    const handleAddGroupDelete = () =>  {
      dispatch(deleteMenuItem({
        menuItemId: props.selectedGroup.id
      }))
      dispatch(removeTab({menuItemId: props.selectedGroup.id}));
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({menuItem:null}));
    }

    const getFooter = () => {
        return  <OptionContainer>
        <Option label="Save" id='step12' active={props.disabled} icon = {SaveAltIcon} onClickUpdate={handleSave}
           />
       <Option label="Change" active={props.disabled} icon = {PublishIcon}       
       />
        <Option label = "Delete" active={props.disabled} icon = {DeleteForeverIcon}  onClickUpdate={handleAddGroupDelete}
        />
    </OptionContainer>
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}