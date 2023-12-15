import { TourData } from "../tour/Types";

const classPrefix = "#getting-started";

export const gettingStartedSteps = {

  '3D Render Window' : {
    title: "3D Render Window",
    target: ".getting-started-step2",
    description:
      "This is the window in which VCollab 3D model is displayed to the user." +
      " User can interact with 3D model using mouse.",
    placement: 'bottom',
    skip:false,
    actions: [
      <div>Move the mouse around holding the left to rotate the model.</div>,
      <div>Move the mouse around holding the middle to zoom the model.</div>,
      <div>Move the mouse around holding the right to open the model.</div>,
    ]
  },
  'fullScreen' : {
      title: "Toggle Fullscreen Mode",
      target: "#toolBar_FullScreen",
      description: "Enter  full screen mode.",
      skip:false,
      actions: [
        <div>Click to switch fullscreen mode.</div>,
        <div>Click to exit fullscreen mode.</div>,
      ],
      placement: "bottom-start",
  },
  'activitybar' : {
    target: classPrefix + "-step4",
    title: "Activity Bar",
    description:
      "Activity bar provides a quick way for the user to" +
      " access various GUI controls, menus and their groups.",
    skip:false,
    // actions: [
    //   <div>Click to on <b>the top / bottom </b> arrows.</div>,
    //   <div>Scroll the <b>menu </b>iteams.</div>,
    // ],
  },
  'activitybar_DisplayMode' : {
    target: "#vertical-tab-DisplayMode",
    title: "Menu Selection",
    description:
      "Users can pin the frequently used menus on the" +
      " activity bar and access them quickly. Clicking on the" +
      " access bar items open the corresponding menu.",
    skip:false,
    actions: [
      <div>
        Click on and activate "Display Mode" item on activity bar to open the
        display modes list in the sidebar.
      </div>,
    ],
  },
  'sidebar' : {
    target: classPrefix + "-step6",
    title: "Side Bar",
    description:
      "Side bar is used to display components of the selected" +
      ' menu. Since user selected "Display Modes" menu, this' +
      " menu item gets activated in the activity bar and the" +
      " sidebar displays the list of display modes to the user.",
      skip:false
  },
  'displaymodes_Shaded' :{
    target: "#displaymodes_Shaded",
    title: "Side Bar Item",
    description: "",
    skip:false,
    actions: [<div>Select the "Shaded" in the display modes list.</div>],

  },
  'download_show' :{
    target: classPrefix + "-step8",
    title: "Action Button",
    description: 'Click on "Download and Show".',
    skip:false,
    actions: [<div>Click on Download and Show.</div>],
    isFixed: true,
    disableBeacon: true,
  },
  'notification' : {
    target: classPrefix + "-step9",
    title: "Notifications",
    description:
      "User can observe that certain actions result in user" +
      " notifications. New notifications appear over the 3D" +
      " render window and disappear after a few seconds.",
    skip:false,
    // placement:'center',
    isFixed: false,
    placement: "bottom",
  },
  'activitybar_History' : {
    target: "#vertical-tab-History",
    title: "History",
    description:
      "User can view the list of previous notifications" +
      'in the "History" Menu.',
    skip:false,  
    disableOverlay: false,
    actions: [
      <div>
        Click on "History" button on the activity bar to activate "History"
        menu.
      </div>,
    ],
  },
  'historyMenu':{
    target: classPrefix + "-step6",
    title: "History Menu",
    description:
      "User can view the list of previous notifications" +
      ' in the "History" Menu.',
    skip:false,
  },
  'undo': {
    title: "Undo",
    target: classPrefix + "-step12",
    description:
      "VCollab Enterprise allows user to revert certain" +
      " actions that were performed earlier using the Undo " +
      " button on the top bar. Redo button can be used to" +
      " perform the action that was Undone earlier.",
    skip:true,  
    disableScrolling: true,
    placement: "bottom",
    actions: [
      <div>
        Click on "Undo" to revert the display mode to “Bounding Box" .
      </div>,
    ],
  },
  'redo' : {
    title: "Redo",
    target: classPrefix + "-step13",
    description:
      "VCollab Enterprise allows user to revert certain" +
      " actions that were performed earlier using the Undo " +
      " button on the top bar. Redo button can be used to" +
      " perform the action that was Undone earlier.",
    skip:true,  
    placement: "bottom",
    
    actions: [
      <div>Click on "Redo" to revert the display mode to "Shaded" .</div>,
    ],
  },
  'allMenus' :     {
    target: classPrefix + "-step14",
    title: "Menus",
    description:
      '"All Menus" action item allows the user to list' +
      " all the menus and UI groups provided by the" +
      " application. User can select any given menu" +
      " from the list and activate it",
    skip:false,  
    actions: [<div>Click on "Menus".</div>],
  },
  'menusSidebar': {
    target: classPrefix + "-step6",
    title: "Menus",
    description:
      "User can select any menu item or group from the" +
      " displayed list and display the corresponding menu" +
      ' in the side bar. "All Menus" also provide' +
      " functionality to search and filter the menu items as well",
    skip:false,    
  },
  'assemblyTree' : {
    target: "#AssemblyTree",
    title: "Assembly Tree",
    description: 'Click on the "Assembly Tree"',
    skip:false,
    disableScrolling: true,
    actions: [<div>Click on "AssemblyTree".</div>],
  },
  'assemblyTree_Menus': {
    target: classPrefix + "-step6",
    title: "Assembly Tree Menus",
    description:
      "User can select any menu item or group from the" +
      " displayed list and display the corresponding menu" +
      ' in the side bar. "All Menus" also provide' +
      " functionality to search and filter the menu items as well",
    skip:false,  
  },
  'vertical-tab-Guides' : {
    target: "#vertical-tab-Guides",
    title: "Guides",
    description:
      "VCollab Enterprise provides multiple guides for" +
      " users to get familiar with various features and" +
      " functionality. Use Guides menu to see the list of" +
      " available guides and run the desired guides.",
    skip:false,  
    actions: [<div>Click on "Guides".</div>],
  },
  'guides' : {
    target: classPrefix + "-step6",
    title: "Guides",
    description:
      "VCollab Enterprise provides multiple guides for" +
      " users to get familiar with various features and" +
      " functionality. Use Guides menu to see the list of" +
      " available guides and run the desired guides.",
    skip:false,  
  }
}

const toArray = (gettingStartedsteps:any) => {
  const array  = Object.keys(gettingStartedsteps).map((i) => gettingStartedsteps[i]);
  let stepArray:any[] = [];

  array.forEach((item)=> {
    if(item.skip === false) {
      stepArray.push(item)
    }
  })

  return stepArray
}

const DATA: TourData = {
  id: "getting_started",
  title: "Getting Started",
  description:
    "This tutorial walks you through the overall GUI " +
    " layout of VCollab  Enterprise. It is intended " +
    " to help new users to quickly accustomed to and " +
    " onboard VCollab Enterprise application.",
  steps: toArray(gettingStartedSteps),
};

export default DATA;
