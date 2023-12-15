import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA:TourData = {
  id:'clip_planes',
  title: 'Clip Planes',
  description: 
    'This tutorial walks you though the overall GUI ' +
    'layout of Clip Planes. It is intended ' +
    'to help new users to quickly accustomed to and ' +
    'onboard VCollab Enterprise application.',
  steps: [
    {
      target: "#vertical-tab-ClipplanesList",
      title: "Clip Planes",
      description:"User can select Clip Plane from the displayed list",
      disableScrolling:true,
      actions: [
        <div>Click on "Clip Planes".</div>,
        ],
    },
    {
      target: classPrefix + "-step6",
      title: "Clip Planes Sidebar",
      description:
      "This is Clip Planes sidebar user can see" +
      " where user can add the clip planes to the list and see the added clip plane.",
      actions: [
        <div>Click on the "ADD CLIP PLANE".</div>,
        ],
    }, 
    {
      target: '#step19',
      title: "Clip Plane List",
      description:
      " Clip Plane is added to the list and it consists of a" +
      " Toggle switch which user can turn it On and Off to "+
      " control plane in 3D window.",
      placement:'right',
      actions: [
        <div>Switch to Toggle "Off".</div>,
        <div>Switch to Toggle "On".</div>,
        <div>Select "Plane 1" in the list.</div>,
        ],
    },
    {
      target: '#step20',
      title: "Clip Plane Footer",
      description:
      " This footer consists of icons that are supposed to do" +
      " actions of corresponding selected plane in the list. ",
      placement:'bottom',
    },
    {
      target: '#step21',
      title: "Clip Plane Settings Icon",
      description:
      " Here user can open the settings side bar for the corresponding selected plane. ",
      placement:'bottom',
      actions: [
        <div>Click on the "Settings Icon".</div>,
        ],
    },
    {
      target: classPrefix + "-step6",
      title: "Clip Plane Settings sidebar",
      description:
      " Here user can see all the settings of the corresponding plane",
    }, 
    {
      target: "#step10",
      title: " Clip Plane Transform Icon",
      disableScrolling: false,
      placement: "right",
      description:
      " This Clip Plane Transform icon performs the action"+
        "of opening the transformation side bar for the corresponding " +
        "selected plane",
        actions: [
          <div>Click on the " Transform Icon".</div>,
          ],
    },
    {
      target: classPrefix + "-step6",
      title:  "Transformation Sidebar",
      description:
      " This is the Clip plane Transformation sidebar, here " +
      " user can see all the transformation settings of the planes. ",
    }, 
    {
      target: "#vertical-tab-ClipplanesList",
      title: "Clip Planes",
      description:"User can select Clip Planes from the displayed list",
      disableScrolling:true,
      actions: [
        <div>Click on "Clip Planes".</div>,
        ],
    },
    {
      target: "#step30",
      title: "Clip Plane Duplicate",
      description:
      " This Duplicate icon performs the action of" +
      " duplicating the selected palne as same. ",
      disableScrolling:true,
      actions: [
        <div>Click on "Duplicate Icon".</div>,
        ],
    },
    {
      target: classPrefix + "-step6",
      title:  " Duplicated Plane",
      description:
      " Here you can observe Plane 2 has added to the list " +
      " that is the duplicate of Plane 1. ",
    },
    {
      target: "#step31",
      title: "Clip Plane Delete",
      description:
      " Here delete icon performs the action of deleting the " +
      "planes which are selected. ",
      disableScrolling:true,
      actions: [
        <div>Click on "Delete Icon".</div>,
        ],
    },
    {
      target: classPrefix + "-step6",
      title:  " Clip Plane List",
      description:
      " Clip list after deleting the Clip Plane 1 ",
    },
  ],
};


export {DATA};
