import Shaded from "../components/icons/shaded";
import ShadedMesh from "../components/icons/shadedMesh";
import BoundingBox from "../components/icons/boundingBox";
import HiddenLine from "../components/icons/hiddenLine";
import Wireframe from "../components/icons/wireframe";
import Point from "../components/icons/point";
import Transparent from "../components/icons/transparent";

export const appBarMinHeight = 300;
export const drawerWidth = 300;
export const topbarHeight = 48;
export const leftbarWidth = 75;

export const sideBarHeaderHeight = topbarHeight;
export const EPSILON = 0.0001;
export const colors = {
  //primary : "rgba(0, 0, 0, 1.0)",
  //primaryTransparent : "rgba(0, 0, 0, 0.8)",
  //primaryHover: "#4F4F68",
  //primaryText: "#DFDEDE",

  //secondary : 'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), #121212',  
  //secondaryTransparent :"rgba(23, 23, 39, 0.8)",
  //secondaryHover: "#4F4F68",
  //secondaryHoverTransparent: "#2D9CDB",
  //secondaryText: "#DFDEDE",

  vcollabColor : "rgba(160,160,255,1)"
}

export const sideBarContentTypes = {
  mainMenu: 'mainMenu',
  productExplorer: 'productExplorer',
  colormaps : 'colormaps',
  clipsPlanes : 'clipsPlanes',
  views : 'views',
  annotations : 'annotations',
  settings : 'settings',
  history : 'history',
  // scene : "scene",
};


export const popupMenuContentTypes = {
  none:'none',
  displayModes: 'displayModes',
  more: 'more',
};

export const displayMenuItems = [
  { title: "Bounding Box", icon: BoundingBox,id:"BOUNDING_BOX", disabled : false},
  { title: "Feature Edge", icon: Shaded,id:"FEATURE_EDGE", disabled : true },
  { title: "Simplified Mesh", icon: Shaded,id:"SIMPLIFIED_MESH", disabled : true },
  { title: "Shaded", icon: Shaded,id:"SHADED", disabled : false  },
  { title: "Wireframe", icon: Wireframe,id:"WIREFRAME", disabled : false },
  { title: "Shaded Mesh", icon: ShadedMesh,id:"SHADED_MESH", disabled : false},  
  { title: "Hidden Line", icon: HiddenLine,id:"HIDDEN_LINE", disabled : false},
  { title: "Transparant", icon: Transparent,id:"TRANSPARENT", disabled : false },
  { title: "Point", icon: Point,id:"POINT", disabled : false },   
];
  