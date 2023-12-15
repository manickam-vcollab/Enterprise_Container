import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA:TourData = {
  id:'menus',
  title: 'Menus',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of Menus. It is intended to help new users to quickly accustomed to and onboard'+
    ' VCollab Enterprise application.',
  steps: [
    {
        target: classPrefix + "-step14",
        title: "Menus",
        description:
        "All Menus action item allows the user to list" +
          " all the menus and UI groups provided by the" +
          " application. User can select any given menu"+
          " from the list and activate it.",
          actions: [
            <div>Click on "Menus".</div>,
            ],
  
      },
      
      {
        target: classPrefix + "-step6",
        title: "Menu Sidebar",
        description:
       "User can see all the menu items here.",
      },
      {
        target: "#step10",
        title: "Search Button",
        disableScrolling: false,
        placement: "right",
        description:
        "This Search Button helps users to search menu items"+
          " and it shows to enter search String.",
          actions: [
            <div>Click on the "Search Button".</div>,
            ],
      },
      {
        target: "#step11",
        title: "Search Text",
        placement: "right",
        description:
        "Here user can enter the desired menu item name and search results will appear down.",
          actions: [
            <div>Type "Display Mode" in the textfield</div>,
            ],
          
      },
      {
        target: classPrefix + "-step6" ,
        title: "Search Results",
        description:
        "User can select any menu item or group from the"+
          " displayed list and display the corresponding menu"+
          " in the side bar. “All Menus also provide"+
          " functionality to search and filter the menu items as well.",
      },
      {
        target:"#DisplayMode" ,
        title: "Search Results",
        description:
        "User can click on below listed items",
        actions: [
          <div>Click on  "Display Mode".</div>,
          ],
      },
      {
        target: classPrefix + "-step6" ,
        title: "Display Mode",
        description:
        "You can observe the display mode sidebar that"+
         " opened from the search Results.",
      },
      {
        target: classPrefix + "-step14",
        title: "Menus",
        description:
        "All Menus action item allows the user to list" +
          " all the menus and UI groups provided by the" +
          " application. User can select any given menu"+
          " from the list and activate it.",
          actions: [
            <div>Click on "Menus".</div>,
            ],
  
      },
      {
        target: classPrefix + "-step6",
        title: "Menus",
        description:
        "User can select any menu item or group from the"+
          " displayed list and display the corresponding menu"+
          " in the side bar. “All Menus also provide"+
          " functionality to search and filter the menu items as well.",
      },
      {
        target: "#step10",
        title: "Search Button",
        disableScrolling: false,
        placement: "right",
        description:
        "This Search Button helps users to search menu items"+
          " and it shows to enter search String.",
          actions: [
            <div>Click on the "Search Button".</div>,
            ],
      },
      {
        target: "#step28",
        title: "Recently Accessed ",
        description:
        "You can observe the recently opened items here.",
      },
      {
        target: classPrefix + "-step6" ,
        title: "Search Results",
        description:
        "User can select any Recently Accessed item or group from the"+
          " displayed list and display the corresponding menu"+
          " in the side bar. “All Menus also provide"+
          " functionality to search and filter the menu items as well.",
          actions: [
            <div>Click on search result.</div>,
            <div>Click on filtered item.</div>,
            ],
      },
  ],
};

export {DATA};
