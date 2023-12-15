import {goBack, push} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import SearchIcon from '../shared/SearchIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import {Routes} from "../../../../routes"
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import RTree, { ITreeNode } from '../../../shared/RsTreeTable';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";

import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import InvertCell from '../../../shared/RcTree/Invert';
import { convertListToTree, getTreeData } from '../../../utils/tree';
import {selectProductTreeData, selectRootIds,selectCheckedLeafNodes,invertNode, toggleVisibilityAsync, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode, updatePrevSearches} from '../../../../store/sideBar/productTreeSlice'
import {selectSearchHints, removeSearchHint, selectPrevSearches, setSearchString, selectSearchResults} from "../../../../store/sideBar/productTreeSlice"
import Footer from '../Footer'
import { useEffect, useRef, useState,useCallback,useMemo} from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { getItem, selectMainMenuItems, setActiveTab } from 'store/mainMenuSlice';
import SearchBox from 'components/shared/searchBox';
import SearchHints from '../../../shared/hintsPanel'
import Clear from '../shared/ClearIcon';
import HelpIcon from "@material-ui/icons/HelpOutline";
import IconButton from '@material-ui/core/IconButton';
import { selectisTourRunning, tourListSlice } from 'store/tourSlice';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import TreeView from '../../../shared/RcTree/ProductTree/AssemblyTreeView'
import { ChevronsDownLeft } from 'tabler-icons-react';
import { ForumTwoTone } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';
import { JsonInput } from '@mantine/core';


import {makeStyles} from '@material-ui/styles';
import { createTourListFor } from 'components/layout/TourComponent/data';
import HeaderIconButton from 'components/shared/headerIconButton/IconButton';
// import useLocalStorage from 'customHooks/useLocalStorage';
import { getIsTourVisitableState, getTourVisitedState, setAssemblyTreeState } from 'store/tourStateSlice';

const style = makeStyles((theme:any)=>({


  Scrollbar:{
 
    scrollbarColor: theme.palette.scrollbar.main,
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height:'0.7em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      
      borderRadius:'20px',
      backgroundColor: theme.palette.scrollbar.main,

    },

  
},


}))


function AssemblyTree(props:any) {
    const treeDataRedux = useAppSelector(selectProductTreeData);
    const treeRootIds = useAppSelector(selectRootIds);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const prevSearches = useAppSelector(selectPrevSearches);
    const searchHints = useAppSelector(selectSearchHints);
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    // eslint-disable-next-line
  
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const {roots: treeData, expanded: expandedKeys} = convertListToTree(treeDataRedux,treeRootIds);

    //console.log('roots',treeData);
    const [data , setData] = useState(treeData);
    const [expanded, setExpanded] = useState(expandedKeys);
    const dispatch = useAppDispatch();
    const [treenodes,setTreenodes] = useState({});
    const myContainer = useRef() as React.MutableRefObject<HTMLInputElement> ;
 const [containerWidth,containerHeight]=useContainer(containerRef,[])

    const oldUser:any  = JSON.parse(localStorage.getItem("vct-tour"))||{};
    const tourVisitedState = useAppSelector(getTourVisitedState);
    const isTourVisitable = useAppSelector(getIsTourVisitableState)
    oldUser.assemblyTree = true;
    const isTourRunning = useAppSelector(selectisTourRunning)
    // const [userType, setUserType] = useLocalStorage("vct-tour");
    if(!(tourVisitedState?.assemblyTree) && !isTourRunning && isTourVisitable){
      let tour: any = createTourListFor(TOUR_MENU_NAMES.ASSEMBLY_TREE);
      let dialogProps:DialogueProps={
        dialogueRun: true,
        tourName: tour.title,
        description: tour.description as string,
        stepIndex: 1
      }
        dispatch(dialogueState(dialogProps));  
        // setUserType(oldUser);
        localStorage.setItem("vct-tour", JSON.stringify(oldUser));
        dispatch(setAssemblyTreeState({assemblyTree:oldUser.assemblyTree}))
    }
    
    const [scrollx ,setScrollX] = useState(0);

   const scrollstyle=style();
    const handleScroll = (event:any) => {

      const scrollwidth = myContainer.current.scrollLeft;
 
      const width = myContainer.current.offsetWidth;

      const scrollbarWidth = myContainer.current.scrollWidth;
   
      const fullWidth = scrollbarWidth - width;
  
      if(scrollwidth > fullWidth) {
   
        scrollwidth.toFixed();
       setScrollX(fullWidth);
       //setScrollX(x);

      } else {
   
        scrollwidth.toFixed();
     
       setScrollX(scrollwidth)
    
   
      }
   
   
   
   
     };


    

    useEffect(() => {
      if(isSearchMode){
        let {treeData, expandedKeys} = getTreeData(treeDataRedux,searchResults)
        if(treeData)
        setData(treeData);
        if(expandedKeys)
        setExpanded(expandedKeys);
      }
      else{
        let {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
        setData(roots);
        setExpanded(expanded);
        dispatch(updatePrevSearches(searchText))
      }
    },[isSearchMode, searchResults, treeDataRedux])

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const onClickSearchIcon = () => {
      setIsSearchMode(true);
    }

    const handleNext = () => {
      dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
    }

    const getHeaderLeftIcon= () => {
        return (
        <BackIcon onClick={onClickBackIcon}/>
        )
    }

    const handleSearchTextChange = (s:string, r: any[]) => {
      setSearchText(s);
      setSearchResults(r);
      handleSearchResult(r);
    }

    const handleSearchResult = (results:any[]) => {
      let filtered = results.map(result => {
          let node =  JSON.parse(JSON.stringify(result.item));
          if(result.matches)
          node.matches =result.matches
          return node
        }
        );
      setSearchResults(filtered);
  }
  const handleResultsClick = () => {
    let tour: any = createTourListFor(TOUR_MENU_NAMES.ASSEMBLY_TREE);
    let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: tour.title,
    description: tour.description as string,
    stepIndex: 1
  }
    dispatch(dialogueState(dialogProps));
  }

  const getHeaderContent = () => {

    return (isSearchMode ?
      <SearchBox 
      placeholder="Search Tree" 
      text={searchText} 
      onChange={handleSearchTextChange}
      searchPool={treeDataRedux}
      onClear={() => {}}
      
      getAttribKeys={(data) => ["title"]}
  
      />
      : <Title text="Product Tree" group="Geometry"/>)
}


const getHeaderRightIcon = () => {
  return (
 
    isSearchMode ?
    <div style={{display: "inherit"}}>
    <Clear onClick={() => setIsSearchMode(false)}/>
    <IconButton onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
    </IconButton></div>
    : 
        
    <div style={{display: "inherit"}}>
    <SearchIcon onClick={onClickSearchIcon} />
    <IconButton onClick={(event) =>handleResultsClick(event)}><HelpIcon/>
    </IconButton>
    </div>

   
  )
}


    <HeaderIconButton label={"help"} icon={<HelpIcon/>} onClick={handleResultsClick} disabled={false}></HeaderIconButton>
    const handleExpand = (toOpen:boolean,nodeId:any) => {
      let toOpenval = treeDataRedux[nodeId.node.id].state.expanded
      toOpenval=!toOpenval
      dispatch(expandNode({ toOpen: toOpenval, nodeId: nodeId.node.id,undoable:true }));
      // dispatch(expandNode({toOpen,nodeId,undoable:true}));
    }
    const handleCheck = (toCheck:boolean, nodeId:string) => {
      dispatch(setCheckedNodesAsync({toCheck,nodeId, undoable:true}));
      dispatch(tourListSlice.actions.setManualStepForward());
    }
    const handleHighlight = (toHighlight:boolean, nodeId:string) => {
      dispatch(setHightLightedNodesAsync({toHighlight,nodeId}))
    }
    const handleVisibility = (toShow:boolean,node:any) => {
      dispatch(toggleVisibilityAsync({toShow, nodeId:node.id, undoable: true}));
    
    }
    const handleInvert = (node:any) => {
      dispatch(invertNode({nodeId:node.id, undoable:true}));
   
    }


    const generateOptions = () => {
      let options:any = {};
      prevSearches.forEach((e:string) => {
          options[e] = Object.keys(options).length;
      })
      searchHints.forEach((e:string) => {
          options[e] = Object.keys(options).length;
      })
      return Object.keys(options) as string[]
  }

  // const handleCheck = (toCheck:boolean,node:ITreeNode) => {
  //     dispatch(setCheckedNodesAsync({toCheck,nodeId:node.id}));
  // }

  // const handleSelectAll = (state:boolean) => {
  //     if(props.isSearchMode)
  //     result.forEach((data:any) => {
  //         dispatch(setCheckedNodesAsync({toCheck: state, nodeId: data.item.id}));
  //     })
  //     else
  //     Object.values(treeData).forEach(e => {
  //         dispatch(setCheckedNodesAsync({toCheck: state, nodeId: e.id}));
  //     })
  //     setSelectAll(state);
  // }
   const handleHintsClick = (s:string) => {
      setSearchText(s);
  }
  const handleContainerRef = () => {
    dispatch(tourListSlice.actions.setManualStepForward());
}
  const handleHintsDelete = (s:string) => {
      dispatch(removeSearchHint({data:s}));
  }

  const getBody = () => {
      return(
     <div ref={containerRef} id="assmebly" >
          <div ref = {headerRef} >
                {
                    isSearchMode ?
                    <SearchHints data = {generateOptions()} onClick={handleHintsClick} onDelete={handleHintsDelete}></SearchHints>
                    :null
                }
                {/* {
                result.length !== 0 || !props.isSearchMode ?
                <div>
                <Checkbox color="primary" size='small' onChange = {(e:any) => {handleSelectAll(e.target.checked)}} checked = {selectAll} ></Checkbox>
                    Select All
                </div>
                : null
                } */}
                </div> 
                
        {/* <div  ref={myContainer} style={{height:'100%',overflowX:"auto"}} className={scrollstyle.Scrollbar} onScroll={handleScroll}> */}
        <div>

        <TreeView treedata={treeData} isPartlist={false} reduxData={treeDataRedux}  check={handleCheck}  expanded={expanded} handleExpand={handleExpand} invert={handleInvert} visibility={handleVisibility} scrollValue={scrollx} containerwidth={containerWidth} searchtext={searchText} searchmode={isSearchMode}/>

          </div>
          </div>
      )
    }      

    const getFooter = () => {
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}

export default AssemblyTree;