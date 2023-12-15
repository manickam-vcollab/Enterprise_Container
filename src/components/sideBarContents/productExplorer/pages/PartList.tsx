import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { useEffect, useRef } from 'react';
import { goBack, push } from 'connected-react-router/immutable';
import { selectProductTreeData, selectRootIds, selectCheckedLeafNodes, invertNode, toggleVisibilityAsync, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode, updatePrevSearches, updatePartListPrevSearches, selectPartListPrevSearches } from '../../../../store/sideBar/productTreeSlice'
import { selectSearchHints, removeSearchHint, selectPrevSearches, setSearchString, selectSearchResults } from "../../../../store/sideBar/productTreeSlice"
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import useContainer from '../../../../customHooks/useContainer';
import Search from '../search';
import Clear from '../shared/ClearIcon';
import { useAppSelector, useAppDispatch } from "../../../../store/storeHooks";
import Checkbox from "@material-ui/core/Checkbox"
import Footer from '../Footer'
import { Routes } from '../../../../routes';
import SearchHints from '../../../shared/hintsPanel'
import { useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SearchIcon from '../shared/SearchIcon';
import { List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Collapse, Expand, Typography } from '@material-ui/core';
import ListStyles from 'components/shared/List/liststyle'
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import { makeStyles } from '@material-ui/styles';
import TreeView from '../../../shared/RcTree/ProductTree/AssemblyTreeView';
import ShowHide from '../../../shared/RcTree/ShowHide';
import { ActionIcon } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';



import SearchBox from 'components/shared/searchBox';


const style = makeStyles((theme: any) => ({
  Scrollbar: {

    scrollbarColor: theme.palette.scrollbar.main,
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.7em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {

      borderRadius: '20px',
      backgroundColor: theme.palette.scrollbar.main,

    },


  },
  textStyle: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  root: {
    width: '100%',


  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  checkbox: {
    maxWidth: 3,
    maxHeight: 3,
    marginLeft: 12,

  },

  overlaystyling: {
    display: "flex",
    width: "100%",


    justifyContent: "flex-end",
    paddingBottom: 2
  },

  overlayicons: {
    //   backgroundColor: theme.palette.background.default,
    opacity: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: '0px'
  },
  iconHover: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "transparent",
      border: theme.palette.background.default,
    },
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.3,
  },


}))

export default function PartsList(props: any) {

  const listClasses = ListStyles();
  const result = useAppSelector(selectSearchResults);
  const checkedNodes = useAppSelector(selectCheckedLeafNodes);
  const treeData = useAppSelector(selectProductTreeData);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef, [])
  const myContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [allParts, setAllParts] = useState(Object.values(treeData).filter(e => e.children.length === 0).map(e => { return { item: e } }))
  const [selectAll, setSelectAll] = useState(false);
  const [partialCheck,setpartialCheck]=useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const prevSearches = useAppSelector(selectPartListPrevSearches);
  const searchHints = useAppSelector(selectSearchHints);
  const [searchText, setSearchText] = useState("");
  const [resultFound, setResultFound] = useState(false);

  const [hovered, setHovered] = useState("")


  let partListItem = Object.values(treeData).filter(e => e.children.length === 0).map(e => { return { item: e } })


  const onClickBackIcon = () => {
    dispatch(goBack());
  }

  const handleNext = () => {
    dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
  }
  const handleSearchResult = (results: any[]) => {
    let filtered = results.map(result => {
      let node = JSON.parse(JSON.stringify(result.item));
      if (result.matches)
        node.matches = result.matches
      return node
    }
    );
    setSearchResults(filtered);
  }


  const getHeaderLeftIcon = () => {
    return (
      null
    )
  }

  const [scrollx, setScrollX] = useState(0);

  const classes = style();
  const handleScroll = (event: any) => {

    const scrollwidth = myContainer.current.scrollLeft;

    const width = myContainer.current.offsetWidth;

    const scrollbarWidth = myContainer.current.scrollWidth;

    const fullWidth = scrollbarWidth - width;


    if (scrollwidth > fullWidth) {

      scrollwidth.toFixed();
      setScrollX(fullWidth);
      //setScrollX(x);

    } else {

      scrollwidth.toFixed();

      setScrollX(scrollwidth)


    }




  };




  const handleCheck = (toCheck: boolean, nodeId: string) => {

    dispatch(setCheckedNodesAsync({ toCheck, nodeId, undoable: true }));

  }
  const handleHighlight = (toHighlight: boolean, nodeId: string) => {
    dispatch(setHightLightedNodesAsync({ toHighlight, nodeId }))
  }
  const handleVisibility = (toShow: boolean, node: any) => {
    dispatch(toggleVisibilityAsync({ toShow, nodeId: node.id, undoable: true }));

  }
  const handleInvert = (node: any) => {
    dispatch(invertNode({ nodeId: node.id, undoable: true }));

  }
  const handleSearchTextChange = (s: string, r: any[]) => {
    setSearchText(s);
    setSearchResults(r);
    handleSearchResult(r);

  }

  useEffect(() => {
    if (!isSearchMode) {

      dispatch(updatePartListPrevSearches(searchText))
    }
  }, [isSearchMode, searchResults])

  const filteredData = Object.values(treeData).filter(e => e.children.length === 0);
  const isSelectAll=filteredData.every((key)=>key.state.checked===true)
  const isPartialCheck=filteredData.some((key)=>key.state.checked===true)


useEffect(()=>{
isSelectAll ? setSelectAll(true) : setSelectAll(false)
isPartialCheck && !isSelectAll ? setpartialCheck(true): setpartialCheck(false);
},[selectAll,isSelectAll,partialCheck,isPartialCheck])

  const handleSelectAll = (state: boolean) => {
    let nodes = result.length > 0 ? result : allParts;
    nodes.forEach((data: any) => {
      dispatch(setCheckedNodesAsync({ toCheck: state, nodeId: data.item.id }));
    })

    setSelectAll(state);
  }
  const generateOptions = () => {
    let options: any = {};
    prevSearches.forEach((e: string) => {
      options[e] = Object.keys(options).length;
    })
    searchHints.forEach((e: string) => {
      options[e] = Object.keys(options).length;
    })
    return Object.keys(options) as string[]
  }
  const handleHintsClick = (s: string) => {
    setSearchText(s);
  }
  const handleHintsDelete = (s: string) => {
    dispatch(removeSearchHint({ data: s }));
  }


  const getHeaderContent = () => {

    return (isSearchMode ?
      <SearchBox
        placeholder="Search"
        text={searchText}
        onChange={handleSearchTextChange}
        searchPool={treeData}
        onClear={() => { }}

        getAttribKeys={(data) => ["title"]}

      />
      : <Title text="Part List" group="Geometry" />)
  }


  let dialogProps: DialogueProps = {
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.PARTS_LIST
  }
  const onClickSearchIcon = () => {
    setIsSearchMode(true);
  }
  const getHeaderRightIcon = () => {
    return (

      isSearchMode ?
        <div style={{ display: "inherit" }}>
          <Clear onClick={() => setIsSearchMode(false)} />
          <IconButton ><HelpIcon />
          </IconButton></div>
        :

        <div style={{ display: "inherit" }}>
          <SearchIcon onClick={onClickSearchIcon} />
          <IconButton ><HelpIcon />
          </IconButton>
        </div>



    )
  }

  const handlekk = () => {

  }

  function searchData(dataArray: any, searchTerm: any) {
    return dataArray.flatMap((obj: any) => {
      const tagArray = ((obj || {}).attributes || {}).tags

      const objHasSearchTerm = Object.keys(obj).some((key) => obj.title.toLowerCase().includes(searchTerm.toLowerCase()) || tagArray?.includes(searchTerm.toLowerCase()));




      if (objHasSearchTerm && !obj.children) return [obj];

      const matchedChildren = searchData(obj.children ?? [], searchTerm);

      return objHasSearchTerm || matchedChildren.length > 0
        ? [{

          ...obj,
          children: matchedChildren,


        }]
        : [];
    })

  }
  const searchedData = searchData(filteredData, searchText)

  const handleMouseEnter = (index: any) => {
    setHovered(index)
  }
  const handleMouseLeave=()=>{
    setHovered("")
  }
  const data = searchText.length > 2 && searchedData.length > 0 ? searchedData : filteredData

  const getBody = () => {
    return (
      <div ref={containerRef} id="assmebly" style={{ width: "100%", height: "100%" }}>
        <div>
          {
            isSearchMode ?
              <SearchHints data={generateOptions()} onClick={handleHintsClick} onDelete={handleHintsDelete}></SearchHints>
              : null
          }

        </div>
        <div ref={myContainer} style={{ height: '100%' }} onScroll={handleScroll}>
          <div style={{ paddingLeft: 15, paddingTop: 20 }}>
            <Checkbox style={{ paddingLeft: 10 }} size='small' onChange={(e: any) => { handleSelectAll(e.target.checked) }} checked={selectAll} indeterminate={partialCheck}></Checkbox>
            <div style={{ display: "inline", paddingLeft: "5px", paddingTop: "3px" }} > Select All </div>

          </div>




          <List dense  style={{marginTop: -10,width:"100%"}}>

            {Object.keys(data).map((items: any, index: any) => {
              return (<><div  key={data[items].id} onMouseOver={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} style={{cursor:"pointer",marginBottom: -10}}> <ListItem>

                <ListItemIcon >
                  <Checkbox size='small' checked={data[items].state.checked} indeterminate={data[items].state.partiallyChecked} onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} onChange={(e: any) => handleCheck(e.target.checked, data[items].id)}></Checkbox>
                </ListItemIcon>
                <ListItemText className={data[items].state.visibility==false  ? classes.disabled : ""} style={{marginLeft: -9}}> {data[items].title} </ListItemText>
{ index===hovered ?

                <ListItemSecondaryAction >

                  <div className={classes.overlaystyling}>
                    <div className={classes.overlayicons} >


                      <ActionIcon className={classes.iconHover}>
                        <ShowHide node={data[items]} onToggle={handleVisibility} ></ShowHide>
                      </ActionIcon>

                    </div>
                  </div>
                </ListItemSecondaryAction> : null
            }
           

              </ListItem>
          
              </div>
         


                <ListItemText  className={data[items].state.visibility==false  ? classes.disabled : ""} style={{ paddingLeft: 73 }} >{data[items].attributes?.tags == undefined ? null : `Tag: ${data[items].attributes?.tags} `}</ListItemText>


              </>
              )
            }
            )}

          </List>
        </div>


      </div>




    )
  }

  const getFooter = () => {
    return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
      handleNext={handleNext}
    ></Footer>) : null
  }

  return (<SideBarContainer
    headerLeftIcon={getHeaderLeftIcon()}
    headerContent={getHeaderContent()}
    headerRightIcon={getHeaderRightIcon()}
    body={getBody()}
    footer={getFooter()}
  />)
}