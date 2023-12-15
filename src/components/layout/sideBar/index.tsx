import { useLayoutEffect } from 'react';
import {Switch, Route, useParams, useLocation} from 'react-router-dom';
import {Routes} from '../../../routes';
import MuiDrawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import  styles  from "./style";
import {selectSidebarVisibility,
        setSidebarVisibility } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import Group from './Group';

import MainMenu from '../../sideBarContents/mainMenu';
import ProductExplorer from '../../sideBarContents/productExplorer';
import Field from '../../sideBarContents/field';
import Colormaps from '../../sideBarContents/colormaps';
import ClipPlanes from '../../sideBarContents/clipPlanes';
import Animation from 'components/sideBarContents/animations';
import Scene from "../../sideBarContents/scene";
import Views from '../../sideBarContents/views';
import Annotations from '../../sideBarContents/annotations';
import Settings from '../../sideBarContents/settings';
import Messages from '../../sideBarContents/messages';
import Labels from '../../sideBarContents/labels';
import ToolBar from 'components/sideBarContents/ToolBar';
import ALLLABELS from '../../sideBarContents/labels';
import Slides from '../../sideBarContents/slides';
import More from '../../sideBarContents/more';
import Tutorials from '../../sideBarContents/tutorials';
import AddGroup from '../../sideBarContents/addGroup';
import About from '../../sideBarContents/about';
import Chatbot from '../../sideBarContents/chatbot/index';
import { MainMenuItem } from 'store/mainMenuSlice';
import {push} from 'connected-react-router/immutable';
import { selectActiveTab } from 'store/mainMenuSlice';
import { replace } from 'connected-react-router';
import { drawerWidth, leftbarWidth } from '../../../config';

import Contourplot from '../../sideBarContents/contourplots';

type SideBarProps = {
  selectedItem: MainMenuItem | null
}
export default function Sidebar(props: SideBarProps){
    
    const classes = styles();
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const dispatch = useAppDispatch();  
    const theme = useTheme();
    const smMatches = useMediaQuery(theme.breakpoints.down('sm'));
    const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));
    const location = useLocation();
   
    //const activeItem = useAppSelector(selectActiveTab);

    const handleClickAway = (event : any) => {
      if (event.clientX > (drawerWidth + leftbarWidth)  && smMatches && isSidebarVisible) {
        dispatch(push(Routes.VIEWER))
        dispatch(setSidebarVisibility(false));      
      }
      else{         
        //dispatch(setSidebarVisibility(true));        
      }     
    };   
  
    const renderContent = () => {
      return  (location.pathname.endsWith('/') && props.selectedItem ?
      <Group selectedItem={props.selectedItem}></Group>
      : <Switch> 
        <Route path={Routes.GEOMETRY}>
        <ProductExplorer />
        </Route>
        <Route path={Routes.FIELD}>
          <Field/>
        </Route>
        <Route path={Routes.SCENE}>
        <Scene/>
         </Route>
        <Route path={Routes.CLIPPLANES} >
        <ClipPlanes/>
        </Route>
        <Route path={Routes.MESSAGES}>
        <Messages />     
        </Route>
        <Route path={Routes.LABELS}>
        <Labels />
        </Route>     
        <Route path={Routes.All_LABELS}>
        <ALLLABELS />
        </Route> 
        <Route path={Routes.TOOLBARITEMS}>
          <ToolBar />
        </Route>
        <Route path={Routes.TOOLBARLIST}>
          <ToolBar />
        </Route>
        <Route path={Routes.TOOLBARPOSITION}>
          <ToolBar />
        </Route>
        <Route path={Routes.ANIMATIONS}>
          <Animation />
        </Route>
        <Route path={Routes.SLIDES}>
        <Slides/>
        </Route>
        <Route path={Routes.SETTINGS}>
        <Settings/>
        </Route>
        <Route path={Routes.MORE}>
        <More/>
        </Route>
        <Route path={Routes.TUTORIALS}>
          <Tutorials/>
        </Route>
        <Route path={Routes.ABOUT}>
          <About/>
        </Route>
        <Route path={Routes.CHATBOT}>
          <Chatbot/>
        </Route>
        <Route path={Routes.COLORMAPS}>
        <Colormaps />
        </Route>
        <Route path={Routes.CONTOURPLOT}>
        <Contourplot />
        </Route>
        <Route>
        <Views />
        </Route>
        <Route>
        <Annotations />
        </Route>
      </Switch>)
      
      
    };

    useLayoutEffect(() => {
      //if(smMatches) dispatch(setSidebarVisibility(true));
      //if(xsMatches) {
      //  dispatch(push(Routes.VIEWER))
      //  dispatch(setSidebarVisibility(false));
      //}
    }, [dispatch, smMatches, xsMatches]);

    return (
      <>
      <ClickAwayListener  
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}>
        <MuiDrawer
        className={ classes.drawer}
        variant= { smMatches ? "temporary" : "persistent"}
        ModalProps={{
          hideBackdrop : true,
          disablePortal : true
        }}
        transitionDuration = {{ appear: 0, enter: 0, exit: 0 }}
        anchor="left"
        open={ isSidebarVisible }
        classes={{
          paper: classes.drawerPaper,
          root: classes.anchorLeft,
          paperAnchorLeft: classes.anchorLeft
        }}
        >  
         {renderContent()}
        </MuiDrawer>

       
      </ClickAwayListener>

    

    

</>

      )
}