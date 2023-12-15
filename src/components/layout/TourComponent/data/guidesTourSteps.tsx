import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA:TourData = {
  id:'guides',
  title: 'Guides',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of Guides. It is intended ' +
    'to help new users to quickly accustomed to and ' +
    'onboard VCollab Enterprise application.',
  steps: [
    {
        target: "#vertical-tab-Guides",
        title: "Guides",
        description:
        "VCollab Enterprise provides multiple guides for"+
          " users to get familiar with various features and"+
          " functionality. Use Guides menu to see the list of"+
          " available guides and run the desired guides.",
          // actions: [
          //   <div>Click on "Guides".</div>,
          //   ],
      },
      {
        target: classPrefix + "-step6" ,
        title: "Guides SideBar",
        description:
        "User can see the list of available guides and Run the"+
          " desired guides ",
      },
      {
        target: "#step10",
        title: "Search",
        disableScrolling: false,
        placement: "right",
        description:
        " User can search the desired guide directly",
          actions: [
            <div>Click on the "Search".</div>,
            ],
      },
      {
        target: "#step11",
        title: "Search Text",
        placement: "right",
        description:
        "User can enter the desired guide name here to search it directly",
          actions: [
            <div>Enter name here.</div>,
            ],  
      },
      {
        target: classPrefix + "-step6" ,
        title: "Search Results",
        description:
        " You can observe a list which is called search results "+
          " for the entered String. From the results you can"+
          " select the item and start the tour.",
      },
  ],
};

export {DATA};
