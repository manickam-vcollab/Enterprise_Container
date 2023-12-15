import { configureStore,combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import appSlice from './appSlice';
import toastSlice from "./toastSlice";
import productTreeSlice from './sideBar/productTreeSlice';
import  toolBarTreeSlice  from './sideBar/ToolBar/toolBarSlice';
import toolSlice from './sideBar/toolSlice';
import fieldSlice from './sideBar/fieldSlice';
import displayModesSlice from './sideBar/displayModesSlice';
import clipSlice from './sideBar/clipSlice';
import colormapSlice from './sideBar/colormapSlice';
import probeSlice from './probeSlice';
import mainMenuSlice  from './mainMenuSlice';
import sceneSlice from './sideBar/sceneSlice';
import defaultSlice from './defaultSlice';
import materialColorSlice from './sideBar/materialColorSlice';
import settingSlice from './sideBar/settings'
import messageSlice from './sideBar/messageSlice';
import windowMgrSlice from './windowMgrSlice';
import label from './sideBar/labelSlice/AllLabelSlice';
import Animation from './sideBar/AnimationSlice/AllAnimationSlice';
import slideSlice from './sideBar/slideSlice';
import moreSlice from './moreSlice';
import tutorialSlice from './tutorialSlice';
import contourplotSlice from './sideBar/contourplotSlice';
import  tourListSlice  from './tourSlice';
import viewpointSlice from './viewpointSlice';
import chartSlice from './chartSlice';
import caeResultSlice from './caeResultSlice'
import chart3DSlice from './chart3DSlice';
import averageOptionSlice from './sideBar/averageOptionSlice';
import tourStateSlice from './tourStateSlice';


export const history = createHashHistory({
  hashType: 'slash',
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});
const store = configureStore({
    reducer: combineReducers({
        router: connectRouter(history),
        app: appSlice,
        mainMenu: mainMenuSlice,
        scene:sceneSlice,
        defaultSlice:defaultSlice,
        materialColor: materialColorSlice,
        field: fieldSlice,
        clipPlane: clipSlice,
        productTree: productTreeSlice,
        probe: probeSlice,
        displayModes: displayModesSlice,
        toast: toastSlice,
        settings: settingSlice,
        message: messageSlice,
        windowMgr: windowMgrSlice,
        label:label,
        animation:Animation,
        colormap : colormapSlice,
        slide : slideSlice,
        more: moreSlice,
        contourplot : contourplotSlice,
        tutorials:tutorialSlice,
        tour:tourListSlice,
        tourState:tourStateSlice,
        viewpoint: viewpointSlice,
        chart:chartSlice,
        caeResult:caeResultSlice,
        chart3D:chart3DSlice,
        toolBar:toolBarTreeSlice,
        tools:toolSlice,
        averageOptionsettings:averageOptionSlice
      }),
    middleware: getDefaultMiddleware({
      serializableCheck: false,
      
    }).concat(routerMiddleware(history))
});


export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


