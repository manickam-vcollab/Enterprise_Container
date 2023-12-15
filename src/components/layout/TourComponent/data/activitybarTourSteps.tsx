import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA:TourData = {
  id:'activity_bar',
  title:'Activity Bar',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of Activity Bar. It is intended ' +
    'to help new users to quickly accustomed to and ' +
    'onboard VCollab Enterprise application.',
  steps: [
  
    {
      target: classPrefix + "-step4",
      title: "Activity Bar",
      description:"Activity bar provides a quick way for the user to" +
      "access various GUI controls, menus and their groups" +
      " user can scroll up and down or by clicking the arrows user able to see the remaining menu items",
      disableScrolling:true, 
      placement: "auto-start",
    }, 
    {
      target: classPrefix + "-step4",
      title: "Grouping Menu Items",
      description:"Grouping Menu Items provides user to group the multiple " +
      "items by selecting the item from side bar.",
      disableScrolling: true,
      actions: [
        <div>Right Click on Activity bar empty space.</div>,
        ],
    }, 
    {
      target: '#addgroup',
      title: "Add Menu Items ",
      description:"Here you can add the different menu items to form the group",
      disableScrolling: true,
      actions: [
         <div>Click on Add Group.</div>,
        ],
    },
    {
      target:  classPrefix + "-step6",
      title: "New Group Side Bar",
      description:
      "This is the new Group Side Bar which user can see "+
        " all the menu items.Here by selecting or by searching items "+
        " user can add the selected the items to the group",
        
        actions: [
          <div>Select first menu Item.</div>,
           <div>Select second menu Item</div>,
          ],
    }, 
    {
      target: "#step11",
      title: "Renaming the New Group",
      placement: "right-end",
      description:
      "User Can observe the system generated name"+
        " on the header i.e New Group. At this stage user can easily rename it. ",
        actions: [
          <div> Click on the "New Group".</div>,
          <div> Enter required name and Press Enter.</div>,
          ],
        
    },
    {
      target: "#step12",
      title: "Save the newly created group",
      placement: "bottom",
      description:
      "By clicking on save button,user can save the newly created group ",
        actions: [ 
         <div>Click on save.</div>,
          ],
        
    },
    {
      target: classPrefix + "-step6",
      title: "Group SideBar",
      description:
      "This is the New Group Side Bar in which user can see the added menu Items from the group",
    },
    // {
    //   target: "#id8",
    //   title: "Field Group SideBar",
    //   description:
    //   "This is the new Group Side Bar which user can see "+
    //     " all the menu items.Hear by selecting or by searching items "+
    //     " each selected item should shown above the all menus that"+
    //     " user can able to see what is selected items.",
    //     placement:'right',
    //     actions: [
    //       <div> Click on Active menu item i.e on the Field.</div>, 
    //       ],
    // },

    {
      target: "#vertical-tab-NewGroup",
      title: "Unpinning Menu Item",
      placement:"right",
      description:"Here user can unpin or pin the menu item. Unpinning the menu item means the item will disapear from the activity bar " +
      " from the activity bar.",
      actions: [
        <div>Right Click on selected item</div>,
        ]
        
    },
    {
      target: '#itemunpin',
      title: "Unpin",
      description:
      // "By Selecting the menu item from the Menus Tab"+
      //   " the selected item should be comes at bottom  "+
      //   " of activity bar iteam list that is below the guides."+

        " Here user can unpin the menu item by clicking on the Unpin button",
        placement:'right',
        actions: [
          <div>Click on the Un Pin.</div>,
          ],
    }
  ]
};

export default DATA;
