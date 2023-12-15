import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";
const DATA:TourData = {
  id:'labels',
  title: 'Labels',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of Labels. It is intended ' +
    'to help new users to quickly accustomed to and ' +
    'onboard VCollab Enterprise application.',
  steps: [
    {
      target: "#vertical-tab-Labels",
      title: "Labels",
      description:"User can select any menu item or group from the displayed list",
      disableScrolling:true,
      actions: [
        <div>Click on "Labels".</div>,
        ],
    },
    {
      target: classPrefix + "-step6",
      title: "Active Menu",
      description:
      "You can observe that the Labels item"+
      " comes up in the activity bar, and the "+
      " corresponding menu comes up in the side bar.",
    }, 
  ],
};

export {DATA};
