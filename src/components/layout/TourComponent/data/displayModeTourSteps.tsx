import { TourData } from "../tour/Types";
const classPrefix = "#getting-started";

const DATA: TourData = {
  id:'display_mode',
  title: "Display Mode",
  description:
    "This tutorial walks you though the overall GUI " +
    "layout of Display Modes. It is intended " +
    "to help new users to quickly accustomed to and " +
    "onboard VCollab Enterprise application.",
  steps: [
    {
      target: "#vertical-tab-DisplayMode",
      title: "Menu Selection",
      description:
        "User can select Display Mode from the displayed list",
      actions: [
        <div>
          Click on display mode.
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
      target: "#step14",
      title: "Display Mode Header",
      description:
        "This is the Display Mode Header which contains Header " +
        " and Parts list. While selecting the parts from the list" +
        " user can keep control on which parts wants to show the display mode.",
        placement: "right",
      actions: [<div>Click on the Dropdown".</div>],
    },
    {
      target: "#step15",
      title: "Display Mode Header",
      description:
        "Select the part list from the drop down.",
        placement: "right",
      actions: [<div>Click on "All Parts".</div>],
    },
    {
      target: "#step16",
      title: "Display Mode Side Bar",
      description:
        " Here user can see some types of display modes that can allows " +
        "user to download the type and applied to the model directly.",
    },
    {
      target: "#displaymodes_Shaded",
      title: "Display Modes Item",
      description: "",
      actions: [<div>Select the "Shaded" in the display modes list.</div>],
    },
    {
      target: classPrefix + "-step8",
      title: "Download and Show",
      description: 'By clicking on this button, display mode will be downloaded and applied".',
      actions: [<div>Click on Download and Show.</div>],
      isFixed: true,
      disableBeacon: true,
    },
    {
      target: classPrefix + "-step9",
      title: "Notifications",
      description:
        "User can observe that certain actions result in user" +
        " notifications. New notifications appear over the 3D" +
        " render window and disappear after a few seconds.",
      // placement:'center',
      isFixed: true,
      placement: "bottom",
    },
  ],
};

export {DATA};
