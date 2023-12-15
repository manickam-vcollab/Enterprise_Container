import {useEffect, useState, useRef} from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiButton from '@material-ui/core/Button';
import {undoStack} from "../../../utils/undoStack";


//icons import
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BoundingBoxIcon from "../../../icons/boundingBox";
import HiddenLineIcon from "../../../icons/hiddenLine";
import PointIcon from "../../../icons/point";
import ShadedIcon from "../../../icons/shaded";
import ShadedMeshIcon from "../../../icons/shadedMesh";
import TransparentIcon from "../../../icons/transparent";
import WireframeIcon from "../../../icons/wireframe";
import DownloadStatusIcon from "./DownloadStatusIcon";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CardTransfer from 'components/sideBarContents/messages/components/cardTransfer';
import { editPause, editCancel, editCollapse, sortedNotification } from 'store/sideBar/messageSlice';

// import DisplayModeList Shared Component


import DisplayModeList from '../shared/DisplayModeList'

import { DownloadStates, expandPanel, fetchDisplayModes, setDisplayModeAsync, selectDisplayModesData, setSelectedMenu, setDownloadStatus, setMenuSelected, selectMenuSelected, selectBtnDisable, setUndo } from "../../../../store/sideBar/displayModesSlice";
import { useAppSelector, useAppDispatch } from "../../../../store/storeHooks";
import useStyles from './styles';
import { tourListSlice } from 'store/tourSlice';
import { Button, Grid, Typography } from '@material-ui/core';
import { BytesToStructuredString } from 'components/utils/networkUtils';
import tutorialSteps,{gettingStartedSteps} from 'components/layout/TourComponent/data/tutorialSteps';
import globalThemes from 'theme/globalThemes';

const getIcon = (name: String) => {
  switch (name) {
    case "Bounding Box":
      return <BoundingBoxIcon />
    case "Point":
      return <PointIcon />
    case "Hidden Line":
      return <HiddenLineIcon />
    case "Shaded":
      return <ShadedIcon />
    case "Shaded Mesh":
      return <ShadedMeshIcon />
    case "Transparent":
      return <TransparentIcon />
    case "Wireframe":
      return <WireframeIcon />

    default:
      break;
  }
};

const useFooterStyles = makeStyles((theme: any) => ({
  sideBarFooter: {

    position: 'absolute',
    background: 'transparent',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    height: "auto",
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    boxShadow: theme.shadows[20],
    paddingTop:'5px',
    paddingBottom:'12px'
  },
  Muibtn: {
    backgroundColor: theme.palette.accent.primary,
    width: "100%",
    fontSize: "14px",
    borderRadius: "4px",
    height: "40px",
    paddingRight: "10px",
    margin: 0,
    lineHeight: "16px",
    fontWeight: 500,
    textTransform:'none',
    "&:hover": {
      backgroundColor: theme.palette.accent.secondary,
    }
  }

}))


function DisplayModesBody(props: any) {
  const classes = useStyles();
  const customClasses = globalThemes();
  // const scrollToRef = useRef<null | HTMLElement>(null);

  const footerstyle = useFooterStyles();
  const dispatch = useAppDispatch();
  const menuSelected = useAppSelector(selectMenuSelected);
  const panelsData = useAppSelector(selectDisplayModesData);
  const [panelMenuId, setPanelMenuId] = useState(0);
  const [menuItemId, setMenuItemId] = useState(0);
  const [itemDataSize, setItemDataSize] = useState(0);
  const btndisable = useAppSelector(selectBtnDisable);
  const notificationList = useAppSelector(sortedNotification)
  const [activeId, setActiveId] = useState(-1);
  const [customTagId,setCustomTagId] = useState<number>(-1);

  const handlePanelClick = (panelIndex: number) => {
    const selectedPanel = panelsData[panelIndex];
    panelsData.forEach((panel: any, index: number) => {
      if (panel.id === selectedPanel.id) dispatch(expandPanel({ panelId: panelIndex, value: !selectedPanel.expanded }));
      else dispatch(expandPanel({ panelId: index, value: false }));
    });
  };

  const onHandlePause = (id : string, pause : boolean) => {
    // console.log(id,pause)
    if(pause)
        dispatch(editPause({id:id, value: false}));
    else
        dispatch(editPause({id:id, value: true}));
}

const onHandleCollapse = (id : string, boolean: boolean) => {
    setActiveId(customTagId);
    if(boolean)
    dispatch(editCollapse({id, value: true}))
    

    else
    dispatch(editCollapse({id, value: false}))

}

const onHandleCancel = (id: string) => {
   dispatch(editCancel(id));
}


  const onSelectMenu = (menuIndex: number, panelIndex: number, itemSize: number) => {
    const selectedPanel = panelsData[panelIndex];
    if (panelIndex === 0) {
      selectedPanel.menuData.forEach((menu: any, index: number) => {
        if (index === menuIndex) {
          dispatch(setSelectedMenu({ menuId: index, panelId: panelIndex, value: true }));
          setPanelMenuId(index);
          setMenuItemId(panelIndex);
          setItemDataSize(itemSize);
          if (menu.status === DownloadStates.DOWNLOADED) {
            handleDownload(menuIndex, panelIndex, true);
          }
        } else {
          dispatch(setSelectedMenu({ menuId: index, panelId: panelIndex, value: false }));

        }
        if (itemSize > 0) {
          dispatch(setMenuSelected(true))


        }
        else {
          dispatch(setMenuSelected(false))

        }

      });
    }
  };
    const [currentMenuIndex, setCurrentMenuIndex] = useState(0);   
    const handleDownload = (menuIndex:number, panelIndex:number,undoable:boolean,) => { 
      let oldValue : number = currentMenuIndex;
      setCurrentMenuIndex(menuIndex);
      // scrollToRef.current?.scrollIntoView({behavior: 'smooth'});
     

if(!undoable){
  dispatch(setUndo(false))
}
    
    dispatch(setDownloadStatus({ panelId: panelIndex, menuId: menuIndex, status: DownloadStates.IN_PROGRESS }));

    dispatch(setDisplayModeAsync({ menuId: menuIndex }));
      if(undoable){
    dispatch(tourListSlice.actions.setManualStepForward()); 
        undoStack.add(
          {
            undo: () => handleDownload(oldValue,panelIndex,false),
            redo: () => handleDownload(menuIndex,panelIndex,false),
          }
        )
      }  
  };


  useEffect(() => {
    dispatch(fetchDisplayModes());

  }, [dispatch]);
  const Shaded = () => {
  dispatch(tourListSlice.actions.setUpdateAction("#displaymodes_Shaded"));
  dispatch(tourListSlice.actions.setManualStepForward()); 
  }

  function searchObjectIndex(_arr: any, searchString: String) {
    const searchTitle = `Display mode`;
    let arr = _arr.reverse();
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].card.data.totalSize !== arr[i].card.data.transferredSize)
      if (arr[i].card.title.includes(searchTitle)) {
        var arrCopy = JSON.parse(JSON.stringify(arr[i]));
        arrCopy.card.title = `Downloading ${searchString}`
        return arrCopy;
      }
    }
    return -1; // if the searchString is not found in any object, return -1
  }

  return (
    <div >

      {panelsData.map((panel: any, panelIndex: number) => (
        <div  key={panelIndex} onClick={Shaded}>
          <DisplayModeList panelIndex={panelIndex} listItem={panel} disabled={props.disabled} onSelectMenu={onSelectMenu} />
        </div>

      ))}

      {menuSelected &&
        <Paper ref={props.targetRef} className={footerstyle.sideBarFooter} square variant="outlined">
          <OptionContainer >
            <Grid direction='column' justify='center' alignContent='center' >
              <Grid >
                {
                  btndisable ?
                    <div style={{marginTop:'5px',marginBottom:'8px',padding: 10}}>Downloaded</div> :
                    panelsData[menuItemId].menuData[panelMenuId].status===1 ? 
                    <div style={{marginTop:'5px', marginLeft:'20px', padding:'10px'}}> <CardTransfer item={searchObjectIndex(notificationList,panelsData[menuItemId].menuData[panelMenuId].title)} handleCollapse={onHandleCollapse} handlePause={onHandlePause} handleCancel={onHandleCancel} timeArrowDivider={false}></CardTransfer></div>: 
                    <Typography style={{ padding: 10 }}>{BytesToStructuredString(itemDataSize, 2)}</Typography>
                }
              </Grid >
              <Grid >
                <DownloadStatusIcon  status={panelMenuId.status} />
                {
                  btndisable ? 
                  <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                  //   <MuiButton id={tutorialSteps.steps[7].target.slice(1)}
                  //     key={menuItemId}
                  //     className={footerstyle.Muibtn+' '+customClasses.Muibtn}
// onClick={() => handleDownload(panelMenuId,menuItemId,true)}
                  //     disabled

                  //   >
                  //     Download and Show
                  //   </MuiButton>
                    : panelsData[menuItemId].menuData[panelMenuId].status===1 ? null : <MuiButton id={gettingStartedSteps.download_show.target.slice(1)}
                      key={menuItemId}
                      className={footerstyle.Muibtn+' '+customClasses.Muibtn}
                
                onClick={() => handleDownload(panelMenuId,menuItemId,true)}
                  
                    >

                      Download and Show
                    </MuiButton>

                }
              </Grid>
            </Grid>
          </OptionContainer>
        </Paper>
      }
    </div>
  );
}

export default DisplayModesBody;
