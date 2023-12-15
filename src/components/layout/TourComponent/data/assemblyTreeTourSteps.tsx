import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA:TourData = {
  id:'assembly_tree',
  title: 'Assembly Tree',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of Assembly Tree. It is intended ' +
    'to help new users to quickly accustomed to and ' +
    'onboard VCollab Enterprise application.',
  steps: [
    {
      target: "#vertical-tab-AssemblyTree",
      title: "AssemblyTree",
      description:"User can select Assembly Tree menu item from the displayed list",
      disableScrolling:true,
      actions: [
        <div>Click on "AssemblyTree".</div>,
        ],
    },
    {
      target: classPrefix + "-step6",
      title: "Assembly Tree Side Bar",
      description:
      "Based on the selection of the item, " +
      " footer is opened which contains the "+
      " corresponding actions for the selected item.",
      actions: [
        <div>Select any of the item from the list.</div>,
        ],
    }, 
    {
      target: '#step20',
      title: "Assembly Tree Footer",
      description:
      " This footer consists of icons that are supposed to do" +
      " actions of corresponding selected item. ",
      placement:'bottom',
    },
    {
      target: '#step22',
      title: "Assembly Tree Footer",
      description:
      " Here is the Visibility Icon which performs the actions of show," +
      " hide, and invert of the selected item in the 3D Model. ",
      placement:'bottom',
      actions: [
        <div>Click on "Visibility".</div>,
        ],
    },
    {
      target: '#step23',
      title: "Visibily Icon Options",
      description:
      " Here is the Visibility Icon options which performs the actions of show," +
      " Hide, and invert of the item in the 3D Model. ",
    },
    {
      target: '#step25',
      title: "Label Icon",
      description:
      " Here is the Label Icon that performs the actions of entering" +
      " a tag name to the selected nodes. User can easily filter " +
      " with the help of these tag name at the time of search",
      placement:'bottom',
      actions: [
        <div>Click on "Label".</div>,
        ],
    },
    {
      target: '#step26',
      title: "Tag Name",
      description:
      " Tag name can be entered here and added." +
      "Click on the cancel to proceed the tour",
    
      placement:'bottom',
      actions: [
        <div>Click on "Cancel".</div>,
        ],
    },
    {
      target: '#step27',
      title: "Fit to Screen Icon",
      description:
      " Here is the Fit View Icon that performs the actions of ," +
      " fitting the selected item to the 3D model. ",
      placement:'bottom',
      actions: [
        <div>Click on "Fit View".</div>,
        ],
    },
    {
      target: '.getting-started-step2',
      title: "Result on 3D Model",
      placement: 'bottom',
      description:
      " Here is the Selected item is fitted to the screen. ",
    },
  ],
};
export {DATA};
