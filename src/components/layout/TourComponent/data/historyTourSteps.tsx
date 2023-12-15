import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA:TourData = {
  id:'history',
  title: 'History',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of History. It is intended ' +
    'to help new users to quickly accustomed to and ' +
    'onboard VCollab Enterprise application.',
  steps: [
    {
      target: classPrefix + "-step14",
      title: "Menus",
      description:
      "User can see different Menu Items by clicking on the Menu button",
       
        actions: [
          <div>Click on "Menus".</div>,
          ],

    },
    {
      target: "#History",
      title: "History Menu",
      
      description:
      "User can click here to open History Menu",
        actions: [
          <div>Click on "History".</div>,
          ],

        
    },
  
    
    // {
    //     target: "#vertical-tab-History",
    //     title: "Menu Selection",
    //     description:
    //     "Users can pin the frequently used menues on the"+
    //     " activity bar and access them quickly. Clicking on the"+
    //     " access bar items open the corresponding menu.",
    //     disableOverlay:true,
    //     actions: [
    //       <div>Click on and activate Display Mode item on
    //       activity bar to open the display modes list in
    //       the sidebar.</div>,
         
    //     ], 
    //   },
      {
        target: classPrefix + "-step6",
        title: "History Sidebar",
        description:
        "User can view the list of previous notifications" +
          " in the History Sidebar."
          
      },
      {
        target: "#vertical-tab-DisplayMode",
        title: "Display Mode",
        description:
          "User can open Display mode by clicking here",
        actions: [
          <div>
            Click on and activate Display Mode item on activity bar to open the
            display modes list in the sidebar.
          </div>,
        ],
      },
      {
        target: classPrefix + "-step6",
        title: "Display Mode Side Bar",
        description:
          "This is Display Mode sidebar which user can see " +
          " the list of Display Modes.",
      },
      {
        target: "#displaymodes_Shaded",
        title: "Side Bar Item",
        description: "",
        actions: [<div>Select the "Shaded" in the display modes list.</div>],
      },
      {
        target: classPrefix + "-step8",
        title: "Action Button",
        description: 'Click on "Download and Show".',
        actions: [<div>Click on Download and Show.</div>],
        isFixed: true,
        disableBeacon: true,
      },
      {
        target: classPrefix + "-step9",
        title: "Notifications",
        description:
          "User can observe that certain actions result in " +
          " notifications. New notifications appear over the 3D" +
          " render window and disappear after a few seconds.",
        // placement:'center',
        isFixed: true,
        placement: "bottom",
      },
      {
        target: classPrefix + "-step14",
        title: "Menus",
        description:
        "Click here to open Menu list,it helps user to navigate to the History Menu",
         
          actions: [
            <div>Click on "Menus".</div>,
            ],
  
      },
      {
        target: "#History",
        title: "Menu Side Bar",
        description:
          "User can Select History Menu Item to open the history Menu.",
        disableOverlay: true,
        actions: [
          <div>
           Click on the History Menu
          </div>,
        ],
      },
      {
        target: classPrefix + "-step6",
        title: "History Menu Side Bar",
        description:
          "User can view the different notifications here",
      },
      {
        title: "Undo",
        target: "#undo",
        description:
          "VCollab Enterprise allows user to revert certain" +
          " actions that were performed earlier using the Undo " +
          " button.",
        
        placement: "bottom",
        actions: [
          <div>
            Click on "Undo" to revert the display mode to “Bounding Box" .
          </div>,
        ],
      },
      {
        title: "Redo",
        target:  "#redo",
        description:
          "VCollab Enterprise allows user to revert certain Undo" +
          " actions that were performed earlier using the Redo" +
          " button.",
        placement: "bottom",
        
        actions: [
          <div>Click on "Redo" to revert the display mode to "Shaded" .</div>,
        ],
      },
      {
        target: classPrefix + "-step6",
        title: "History Menu Sidebar",
        description:
          "User can observe list of  previous notifications" +
          ' here now.',
      },
  ],
};



export {DATA};