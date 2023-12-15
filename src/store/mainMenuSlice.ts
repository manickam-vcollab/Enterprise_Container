import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Routes } from "../routes";
//import customMenuItems   from "../../src/config/guiConfiguration.json";
//import customMenuItems   from "../../src/config/GUIConfig.json";
//icons
import GeometryIcon from "components/icons/geometry";
import AssemblyIcon from "components/icons/assembly";
import DisplayModeIcon from "components/icons/displaymodes";
import MaterialColorIcon from "components/icons/materialColor";
import CoordinateIcon from "components/icons/coordinateSystem";
import AddNotesIcon from "components/icons/labelNotes";
import XYPlotsIcon from "components/icons/xyplots";
import LabelArcPointIcon from "components/icons/labelArcPoint";
import PointLabelIcon from "components/icons/pointLabel";
import FaceLabelIcon from "components/icons/faceLabel";
import PointToPointLabelIcon from "components/icons/pointToPointLabel";
import ColorpaletteEditIcon from "components/icons/colorpaletteEdit";
import Label3DPlots from "components/icons/label3DPlot";
import ToolbarItemIcon from "components/icons/toolbarItems";
import ToolbarPoitionIcon from "components/icons/toolbarPosition";
import EigenIcon from "components/icons/eigen";
import FieldIcon from "components/icons/field";
import StepsAndSubcaseIcon from "components/icons/stepsAndSubcase";
import DerivedIcon from "components/icons/derived";
import SectionAndLayersIcon from "components/icons/sectionAndLayers";

import SceneIcon from "components/icons/scene";
import CameraIcon from "components/icons/camera";
import TriadIcon from "components/icons/triad";
import LightIcon from "components/icons/lights";
import linearIcon from "components/icons/linear";
import transientIcon from "components/icons/transient";
import viewPointIcon from "components/icons/viewPoint";
import ColorMapIcon from "components/icons/colormap";
import ColorMapEditIcon from "components/icons/colormapEdit";
import ColorMapPaletteIcon from "components/icons/palette";
import ColorMapValueSettings from "components/icons/valueSettings";
import LegendSettingsIcon from "components/icons/legendSettings";
import FullscreenIcon from "components/icons/fullscreen";

import LabelIcon from "components/icons/label";

import ClipIcon from "components/icons/clipplanes";
import ClipPlaneListIcon from "components/icons/clipPlaneList";
import ClipPlaneTransformIcon from "components/icons/clipPlaneTransform";
import ClipPlaneSettingsIcon from "components/icons/clipPlaneSettings";

import TransformIcon from "components/icons/transform";
import AnimIcon from "components/icons/animation";
import SlidesIcon from "components/icons/slides";
import MessageIcon from "components/icons/notification";
import SettingsIcon from "components/icons/settings";
import MoreIcon from "components/icons/more";

import ThemeIcon from "components/icons/theme";
import MouseControlsIcon from "components/icons/mouseControls";
import AddGroupIcon from "components/icons/addGroup";
import type { RootState } from "./index";
import nextId from "react-id-generator";
import HelpIcon from "@material-ui/icons/HelpOutline";
import AverageOptIcon from "components/icons/averageopt";
import toolbarIcon from "components/icons/toolbar";
import About from "components/icons/about";
import Chatbot from "components/icons/chatbot";

export type MainMenuItem = {
  id: string;
  name: string;
  groupName?: string;
  groupId?:string;
  type: MainMenuItems;
  path: Routes | string;
  expanded: boolean;
  disabled: boolean;
  isEditMode?: boolean;
  children: MainMenuItem[];
  display: boolean;
};

export enum MainMenuItems {
  GEOMETRY,
  GEOMETRY_ASSEMBLY_TREE,
  GEOMETRY_SEARCH,
  GEOMETRY_DISPLAY_MODE,
  GEOMETRY_MATERIAL_COLOR,
  GEOMETRY_COORDINATE_SYSTEM,
  GEOMETRY_TRANSFORMATION,
  GEOMETRY_PART_LIST,

  FIELD,
  FIELD_VARIABLES,
  FIELD_STEPS_AND_SUBCASES,
  FIELD_SECTIONS_AND_LAYERS,
  FIELD_DERIVED_TYPES,

  SCENE,
  SCENE_CAMERA,
  SCENE_BACKGROUND,
  SCENE_AXIS_TRIAD,
  SCENE_LIGHT,

  COLOR_MAPS,
  COLOR_MAPS_LIST,
  COLOR_MAPS_EDIT,
  COLOR_MAPS_VARIABLE,
  COLOR_MAPS_STEPS_AND_SUBCASE,
  COLOR_MAPS_SELECTION_AND_LAYER,
  COLOR_MAPS_DERIVED_TYPES,
  COLOR_MAPS_COLOR_PALETTE,
  COLOR_MAPS_COLOR_PALETTE_EDIT,
  COLOR_MAPS_VALUE_SETTINGS,
  COLOR_MAPS_LEGEND_SETTINGS,

  CLIP_PLANE,
  CLIP_PLANE_LIST,
  CLIP_PLANE_SETTINGS,
  CLIP_PLANE_TRANSFORM,

  LABELS,
  LABELS_LIST,

  // Label new
  All_LABELS,
  All_LABELS_EDIT,
  LABEL_2D_LABEL,
  POINT_LABEL,
  FACE_Label,
  SELECT_WINDOW,
  POINT_TO_POINT,
  POINT_ARC_LENGTH,
  LABEL_3D_CHART,
  LABEL_2D_PLOTS,

  TRANSFORMATIONS,

  ANIMATIONS,
  ANIMATION_LIST,
  LINEAR,
  ANIMATION_EDIT,
  EIGEN,
  TRANSIENT,
  VIEW_POINT,

  SLIDES,

  MESSAGES,
  CONTOURPLOT,

  SETTINGS,
  SETTINGS_THEME,
  SETTINGS_MOUSE_CONTROLS,
  AVERAGE_OPTIONS,

  MORE,
  ADD_GROUP,
  NEW_GROUP,
  CUSTOM_GROUP,

  TUTORIALS,

  TOOLBAR,
  TOOLBARITEMS,
  TOOLBARLIST,
  TOOLBARPOSITION,

  ABOUT,
  ABOUTPAGE,
  CHATBOT
}

export const getIcon = (type: MainMenuItems): any | null => {
  let Out = null;
  switch (type) {
    // geometry
    case MainMenuItems.GEOMETRY:
      Out = GeometryIcon;
      break;
    case MainMenuItems.GEOMETRY_ASSEMBLY_TREE:
      Out = AssemblyIcon;
      break;
    case MainMenuItems.GEOMETRY_DISPLAY_MODE:
      Out = DisplayModeIcon;
      break;
    case MainMenuItems.GEOMETRY_MATERIAL_COLOR:
      Out = MaterialColorIcon;
      break;
    case MainMenuItems.GEOMETRY_COORDINATE_SYSTEM:
      Out = CoordinateIcon;
      break;
    case MainMenuItems.GEOMETRY_TRANSFORMATION:
      Out = TransformIcon;
      break;
      case MainMenuItems.GEOMETRY_PART_LIST:
        Out = AssemblyIcon;
        break;
    // field
    case MainMenuItems.FIELD:
      Out = FieldIcon;
      break;
    case MainMenuItems.FIELD_VARIABLES:
      Out = FieldIcon;
      break;
    case MainMenuItems.FIELD_STEPS_AND_SUBCASES:
      Out = StepsAndSubcaseIcon;
      break;
    case MainMenuItems.FIELD_DERIVED_TYPES:
      Out = DerivedIcon;
      break;
    case MainMenuItems.FIELD_SECTIONS_AND_LAYERS:
      Out = SectionAndLayersIcon;
      break;
    //scene
    case MainMenuItems.SCENE:
      Out = SceneIcon;
      break;
    case MainMenuItems.SCENE_CAMERA:
      Out = CameraIcon;
      break;
    case MainMenuItems.SCENE_BACKGROUND:
      Out = MaterialColorIcon;
      break;
    case MainMenuItems.SCENE_AXIS_TRIAD:
      Out = TriadIcon;
      break;
    case MainMenuItems.SCENE_LIGHT:
      Out = LightIcon;
      break;
    //colormap
    case MainMenuItems.COLOR_MAPS:
      Out = ColorMapIcon;
      break;
    case MainMenuItems.COLOR_MAPS_LIST:
      Out = ColorMapIcon;
      break;
    case MainMenuItems.COLOR_MAPS_EDIT:
      Out = ColorMapEditIcon;
      break;
    case MainMenuItems.COLOR_MAPS_VARIABLE:
      Out = FieldIcon;
      break;
    case MainMenuItems.COLOR_MAPS_DERIVED_TYPES:
      Out = DerivedIcon;
      break;
    case MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER:
      Out = SectionAndLayersIcon;
      break;
    case MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE:
      Out = StepsAndSubcaseIcon;
      break;
    case MainMenuItems.COLOR_MAPS_COLOR_PALETTE:
      Out = ColorMapPaletteIcon;
      break;
      case MainMenuItems.COLOR_MAPS_COLOR_PALETTE_EDIT:
        Out = ColorpaletteEditIcon;
        break;
    case MainMenuItems.COLOR_MAPS_VALUE_SETTINGS:
      Out = ColorMapValueSettings;
      break;
    case MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS:
      Out = LegendSettingsIcon;
      break;
    //clip plane
    case MainMenuItems.CLIP_PLANE:
      Out = ClipIcon;
      break;
    case MainMenuItems.CLIP_PLANE_LIST:
      Out = ClipPlaneListIcon;
      break;
    case MainMenuItems.CLIP_PLANE_TRANSFORM:
      Out = ClipPlaneTransformIcon;
      break;
    case MainMenuItems.CLIP_PLANE_SETTINGS:
      Out = ClipPlaneSettingsIcon;
      break;
    //labels
    case MainMenuItems.LABELS:
      Out = LabelIcon;
      break;

    case MainMenuItems.All_LABELS:
      Out = LabelIcon;
      break;

    case MainMenuItems.LABEL_2D_LABEL:
      Out = AddNotesIcon;
      break;

      case MainMenuItems.LABEL_2D_PLOTS:
        Out = XYPlotsIcon;
        break;

    case MainMenuItems.POINT_LABEL:
      Out = PointLabelIcon;
      break;

    case MainMenuItems.FACE_Label:
      Out = FaceLabelIcon;
      break;

    case MainMenuItems.POINT_TO_POINT:
      Out = PointToPointLabelIcon;
      break;

    case MainMenuItems.POINT_ARC_LENGTH:
      Out = LabelArcPointIcon;
      break;

    case MainMenuItems.LABEL_3D_CHART:
      Out = Label3DPlots;
      break;

    case MainMenuItems.TRANSFORMATIONS:
      Out = TransformIcon;
      break;
    case MainMenuItems.ANIMATION_LIST:
      Out = AnimIcon;
      break;
    case MainMenuItems.LINEAR:
      Out = linearIcon;
      break;
    case MainMenuItems.ANIMATION_EDIT:
      Out = linearIcon;
      break;
    case MainMenuItems.EIGEN:
      Out = EigenIcon;
      break;
    case MainMenuItems.TRANSIENT:
      Out = transientIcon;
      break;
    case MainMenuItems.VIEW_POINT:
      Out = viewPointIcon;
      break;
    case MainMenuItems.CONTOURPLOT:
      Out = ColorMapIcon;
      break;
    case MainMenuItems.SLIDES:
      Out = SlidesIcon;
      break;
    case MainMenuItems.MESSAGES:
      Out = MessageIcon;
      break;
    //settings
    case MainMenuItems.SETTINGS:
      Out = SettingsIcon;
      break;
    case MainMenuItems.SETTINGS_THEME:
      Out = ThemeIcon;
      break;
    case MainMenuItems.SETTINGS_MOUSE_CONTROLS:
      Out = MouseControlsIcon;
      break;
    case MainMenuItems.MORE:
      Out = MoreIcon;
      break;
    case MainMenuItems.ADD_GROUP:
      Out = AddGroupIcon;
      break;
    case MainMenuItems.TUTORIALS:
      Out = HelpIcon;
      break;
      case MainMenuItems.AVERAGE_OPTIONS:
        Out = AverageOptIcon;
        break;
    case MainMenuItems.TOOLBARITEMS:
      Out = ToolbarItemIcon;
      break
    case MainMenuItems.TOOLBARLIST:
      Out = toolbarIcon;
      break
      case MainMenuItems.TOOLBARPOSITION:
        Out = ToolbarPoitionIcon;
        break
      case MainMenuItems.ABOUTPAGE:
      Out = About;
        break  
      case MainMenuItems.CHATBOT:  
    default:
      Out = Chatbot;
      break;
  }

  return Out;
};
export type MainMenu = {
  searchexpand: boolean;
  navheight: number;
  menuItems: MainMenuItem[];
  userCreatedMenuItems: MainMenuItem[];
  activeTab: MainMenuItem | null;
  defaultOptions: string[];
  bottomTabOptions: string[];
  temporaryTab: string | null;
};

const initialState: MainMenu = {
  searchexpand: false,
  navheight: 0,
  menuItems: [
    {
      id: nextId(),
      expanded: false,
      name: "Geometry",
      type: MainMenuItems.GEOMETRY,
      path: Routes.GEOMETRY,
      disabled: true,
      display: false,
      children: [
        {
          id: nextId(),
          name: "Assembly Tree",
          type: MainMenuItems.GEOMETRY_ASSEMBLY_TREE,
          path: Routes.GEOMETRY_ASSEMBLY_TREE,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Parts List",
          type: MainMenuItems.GEOMETRY_PART_LIST,
          path: Routes.GEOMETRY_PART_LIST,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Display Mode",
          type: MainMenuItems.GEOMETRY_DISPLAY_MODE,
          path: Routes.GEOMETRY_DISPLAY_MODES,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },

        {
          id: nextId(),
          name: "Material Color",
          type: MainMenuItems.GEOMETRY_MATERIAL_COLOR,
          path: Routes.GEOMETRY_MATERIAL_COLOR,
          disabled: true,
          children: [],
          expanded: false,
          display: false,

        },
        // not done
        {
          id: nextId(),
          name: "Coordinate System",
          type: MainMenuItems.GEOMETRY_COORDINATE_SYSTEM,
          path: Routes.GEOMETRY,
          children: [],
          expanded: false,
          disabled: true,
          display: false,
        },
        {
          id: nextId(),
          name: "Geometry Transform",
          type: MainMenuItems.GEOMETRY_TRANSFORMATION,
          path: Routes.GEOMETRY_TRANSFORM,
          children: [],
          expanded: false,
          disabled: true,
          display: false,
        },
      ],
    },
    // {
    //   id: nextId(),
    //   expanded: false,
    //   name: "Field",
    //   type: MainMenuItems.FIELD,
    //   path: Routes.FIELD,
    //   disabled: true,
    //   display: false,
    //   children: [
    //     {
    //       id: nextId(),
    //       name: "Steps & Subcases",
    //       type: MainMenuItems.FIELD_STEPS_AND_SUBCASES,
    //       path: Routes.FIELD_STEPS_AND_SUBCASES,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Variables",
    //       type: MainMenuItems.FIELD_VARIABLES,
    //       path: Routes.FIELD_VARIABLES,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Derived Types",
    //       type: MainMenuItems.FIELD_DERIVED_TYPES,
    //       path: Routes.FIELD_DERIVED_TYPES,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Sections & Layers",
    //       type: MainMenuItems.FIELD_SECTIONS_AND_LAYERS,
    //       path: Routes.FIELD_SECTIONS_AND_LAYERS,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //   ],
    // },
    // {
    //   id: nextId(),
    //   expanded: false,
    //   name: "Scene",
    //   type: MainMenuItems.SCENE,
    //   path: Routes.SCENE,
    //   disabled: true,
    //   display: false,
    //   children: [
    //     {
    //       id: nextId(),
    //       name: "Camera",
    //       type: MainMenuItems.SCENE_CAMERA,
    //       path: Routes.SCENE_CAMERA,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Background",
    //       type: MainMenuItems.SCENE_BACKGROUND,
    //       path: Routes.SCENE_BACKGROUND,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Axis Triad",
    //       type: MainMenuItems.SCENE_AXIS_TRIAD,
    //       path: Routes.SCENE_AXIS_TRIAD,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Lights",
    //       type: MainMenuItems.SCENE_LIGHT,
    //       path: Routes.SCENE_LIGHT,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //   ],
    // },
        {
          id: nextId(),
          name: "Camera",
          type: MainMenuItems.SCENE_CAMERA,
          path: Routes.SCENE_CAMERA,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Background",
          type: MainMenuItems.SCENE_BACKGROUND,
          path: Routes.SCENE_BACKGROUND,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Axis Triad",
          type: MainMenuItems.SCENE_AXIS_TRIAD,
          path: Routes.SCENE_AXIS_TRIAD,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
    // {
    //   id: nextId(),
    //   expanded: false,
    //   name: "Color Maps",
    //   type: MainMenuItems.COLOR_MAPS,
    //   path: Routes.COLORMAPS,
    //   disabled: true,
    //   display: false,
    //   children: [
    //     {
    //       id: nextId(),
    //       name: "Color Map List",
    //       groupName: "List",
    //       type: MainMenuItems.COLOR_MAPS_LIST,
    //       path: Routes.COLORMAPS_LIST,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Color Map Edit",
    //       groupName: "Edit",
    //       type: MainMenuItems.COLOR_MAPS_EDIT,
    //       path: Routes.COLORMAPS_EDIT,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Variable",
    //       type: MainMenuItems.COLOR_MAPS_VARIABLE,
    //       path: Routes.COLORMAPS_VARIABLE,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Steps & Subcase",
    //       type: MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE,
    //       path: Routes.COLORMAPS_STEPS_AND_SUBCASE,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Section & Layer",
    //       type: MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER,
    //       path: Routes.COLORMAPS_SELECTION_AND_LAYER,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Derived Type",
    //       type: MainMenuItems.COLOR_MAPS_DERIVED_TYPES,
    //       path: Routes.COLORMAPS_DERIVED_TYPES,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Color Palette",
    //       type: MainMenuItems.COLOR_MAPS_COLOR_PALETTE,
    //       path: Routes.COLORMAPS_COLOR_PALETTE,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Value Setting",
    //       type: MainMenuItems.COLOR_MAPS_VALUE_SETTINGS,
    //       path: Routes.COLORMAPS_VALUE_SETTINGS,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Legend Setting",
    //       type: MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS,
    //       path: Routes.COLORMAPS_LEGEND_SETTINGS,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //   ],
    // },
        {
          id: nextId(),
          name: "Color Map List",
          groupName: "List",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_LIST,
          path: Routes.COLORMAPS_LIST,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Color Map Edit",
          groupName: "Edit",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_EDIT,
          path: Routes.COLORMAPS_EDIT,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Variable",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_VARIABLE,
          path: Routes.COLORMAPS_VARIABLE,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Steps & Subcase",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE,
          path: Routes.COLORMAPS_STEPS_AND_SUBCASE,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Section & Layer",
          type: MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER,
          path: Routes.COLORMAPS_SELECTION_AND_LAYER,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Derived Type",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_DERIVED_TYPES,
          path: Routes.COLORMAPS_DERIVED_TYPES,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Color Palette",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_COLOR_PALETTE,
          path: Routes.COLORMAPS_COLOR_PALETTE,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Color Palette Edit",
          groupId:"ColorMap",
          type: MainMenuItems.COLOR_MAPS_COLOR_PALETTE_EDIT,
          path: Routes.COLORMAPS_COLOR_PALETTE_EDIT,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
    },
    {
      id: nextId(),
          name: "Value Setting",
          type: MainMenuItems.COLOR_MAPS_VALUE_SETTINGS,
          path: Routes.COLORMAPS_VALUE_SETTINGS,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Legend Setting",
          type: MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS,
          path: Routes.COLORMAPS_LEGEND_SETTINGS,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
    // {
    //   id: nextId(),
    //   expanded: false,
    //   name: "Clip Plane",
    //   type: MainMenuItems.CLIP_PLANE,
    //   path: Routes.CLIPPLANES,
    //   disabled: true,
    //   display: false,
    //   children: [
    //     {
    //       id: nextId(),
    //       name: "Clip planes List",
    //       groupName: "List",
    //       type: MainMenuItems.CLIP_PLANE_LIST,
    //       path: Routes.CLIPPLANES_LIST,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Clip plane Settings",
    //       groupName: "Settings",
    //       type: MainMenuItems.CLIP_PLANE_SETTINGS,
    //       path: Routes.CLIPPLANES_SETTINGS,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Clip plane Transform",
    //       groupName: "Transform",
    //       type: MainMenuItems.CLIP_PLANE_TRANSFORM,
    //       path: Routes.CLIPPLANES_TRANSFORMATION,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //   ],
    // },
        {
          id: nextId(),
          name: "Clip planes List",
          groupName: "List",
          type: MainMenuItems.CLIP_PLANE_LIST,
          path: Routes.CLIPPLANES_LIST,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Clip plane Settings",
          groupName: "Settings",
          type: MainMenuItems.CLIP_PLANE_SETTINGS,
          path: Routes.CLIPPLANES_SETTINGS,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Clip plane Transform",
          groupName: "Transform",
          type: MainMenuItems.CLIP_PLANE_TRANSFORM,
          path: Routes.CLIPPLANES_TRANSFORMATION,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
    {
      id: nextId(),
      expanded: false,
      name: "Color Map",
      type: MainMenuItems.CONTOURPLOT,
      path: Routes.CONTOURPLOT,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      name: "Average Options",
      type: MainMenuItems.AVERAGE_OPTIONS,
      path: Routes.AVERAGE_OPTIONS,
      disabled: true,
      children: [],
      expanded: false,
      display: false,
    },
    { 
      id: nextId(),
      expanded: false,
      name: "Old Labels",
      type: MainMenuItems.LABELS,
      path: Routes.LABELS_LIST,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Labels",
      type: MainMenuItems.All_LABELS,
      path: Routes.All_LABELS_LIST,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Label_Edit",
      type: MainMenuItems.All_LABELS_EDIT,
      path: Routes.All_LABELS_EDIT,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "2D Notes",
      type: MainMenuItems.LABEL_2D_LABEL,
      path: Routes.POINT_2D_NOTES,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Point Label",
      type: MainMenuItems.POINT_LABEL,
      path: Routes.POINT_LABEL,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Select Window",
      type: MainMenuItems.SELECT_WINDOW,
      path: Routes.SELECT_WINDOW,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Face Label",
      type: MainMenuItems.FACE_Label,
      path: Routes.FACE_Label,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Point to Point",
      type: MainMenuItems.POINT_TO_POINT,
      path: Routes.POINT_TO_POINT,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "3 Point Arc Length",
      type: MainMenuItems.POINT_ARC_LENGTH,
      path: Routes.POINT_ARC_LENGTH,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Label 3D Chart",
      type: MainMenuItems.LABEL_3D_CHART,
      path: Routes.LABEL_3D_CHART,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "2D Plots",
      type: MainMenuItems.LABEL_2D_PLOTS,
      path: Routes.POINT_2D_PLOTS,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Tool Bar Items",
      type: MainMenuItems.TOOLBARITEMS,
      path: Routes.TOOLBARITEMS,
      disabled: false,
      children: [],
      display: true,
    },
    {
      id: nextId(),
      expanded: false,
      name: "Tool Bar Position",
      type: MainMenuItems.TOOLBARPOSITION,
      path: Routes.TOOLBARPOSITION,
      disabled: false,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Toolbars",
      type: MainMenuItems.TOOLBARLIST,
      path: Routes.TOOLBARLIST,
      disabled: false,
      children: [],
      display: true,
    },
    {
      id: nextId(),
      expanded: false,
      name: "Transformations",
      type: MainMenuItems.TRANSFORMATIONS,
      path: Routes.TRANSFORMATIONS,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Animations",
      type: MainMenuItems.ANIMATION_LIST,
      path: Routes.ANIMATION_LIST,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Linear Animation",
      type: MainMenuItems.LINEAR,
      path: Routes.LINEAR,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Animation Edit",
      type: MainMenuItems.ANIMATION_EDIT,
      path: Routes.ANIMATION_EDIT,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Vector Animation",
      type: MainMenuItems.EIGEN,
      path: Routes.EIGEN,
      disabled: true,
      display: false,
      children: [],
    },
    {
      id: nextId(),
      expanded: false,
      name: "Transient",
      type: MainMenuItems.TRANSIENT,
      path: Routes.TRANSIENT,
      disabled: true,
      display: false,
      children: [],
    },
    // {
    //   id: nextId(),
    //   expanded: false,
    //   name: "View Point",
    //   type: MainMenuItems.VIEW_POINT,
    //   path: Routes.VIEW_POINT,
    //   disabled: true,
    //   display: false,
    //   children: [],
    // },

    {
      id: nextId(),
      expanded: false,
      name: "3D Slides",
      type: MainMenuItems.SLIDES,
      path: Routes.SLIDES,
      disabled: true,
      display: false,
      children: [],
    },

    {
      id: nextId(),
      expanded: false,
      name: "History",
      type: MainMenuItems.MESSAGES,
      path: Routes.MESSAGES,
      disabled: true,
      display: false,
      children: [],
    },

    // {
    //   id: nextId(),
    //   expanded: false,
    //   name: "Application Settings",
    //   type: MainMenuItems.SETTINGS,
    //   path: Routes.SETTINGS,
    //   disabled: true,
    //   display: false,
    //   children: [
    //     {
    //       id: nextId(),
    //       name: "Color Theme",
    //       type: MainMenuItems.SETTINGS_THEME,
    //       path: Routes.SETTINGS_THEME,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
    //     {
    //       id: nextId(),
    //       name: "Mouse Controls",
    //       type: MainMenuItems.SETTINGS_MOUSE_CONTROLS,
    //       path: Routes.SETTINGS_MOUSE_CONTROLS,
    //       disabled: true,
    //       children: [],
    //       expanded: false,
    //       display: false,
    //     },
       
    //   ],
    // },
        {
          id: nextId(),
          name: "Color Theme",
          type: MainMenuItems.SETTINGS_THEME,
          path: Routes.SETTINGS_THEME,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
        },
        {
          id: nextId(),
          name: "Mouse Controls",
          type: MainMenuItems.SETTINGS_MOUSE_CONTROLS,
          path: Routes.SETTINGS_MOUSE_CONTROLS,
          disabled: true,
          children: [],
          expanded: false,
          display: false,
    },
    
    {
      id: nextId(),
      expanded: false,
      name: "Guides",
      type: MainMenuItems.TUTORIALS,
      path: Routes.TUTORIALS,
      disabled: true,
      children: [],
      display: false,
    },

    // leftbar bottom options
    {
      id: nextId(),
      name: "Menus",
      type: MainMenuItems.MORE,
      path: Routes.MORE,
      disabled: true,
      children: [],
      expanded: false,
      display: false,
    },
    {
      id: nextId(),
      name: "Add Group",
      type: MainMenuItems.ADD_GROUP,
      path: Routes.ADD_GROUP,
      disabled: true,
      children: [],
      isEditMode: false,
      expanded: false,
      display: false,
    },

    {
      id: nextId(),
      name: "About",
      type: MainMenuItems.ABOUTPAGE,
      path: Routes.ABOUTPAGE,
      disabled: true,
      children: [],
      isEditMode: false,
      expanded: false,
      display: false,
    },

    {
      id: nextId(),
      name: "Chatbot",
      type: MainMenuItems.CHATBOT,
      path: Routes.CHATBOT,
      disabled: true,
      children: [],
      isEditMode: false,
      expanded: false,
      display: false,
    },

    
  ],
  userCreatedMenuItems: [],
  defaultOptions: [],
  bottomTabOptions: [],
  activeTab: null,
  temporaryTab: null,
};

export const updateMenuItemStateAsync = createAsyncThunk(
  "mainMenuSlice/updateMenuItemState",
  async (url:string, {dispatch,getState}) => {
    let response = await fetch(url);
    let data =   await response.json();
    dispatch(updateMenuItemState(data));
  }
)

export const getMMenuItemId = (menuItemName: string, menuItemsArr: any) => {
  if (menuItemName !== undefined) {
    for (let i = 0; i < menuItemsArr.length; i++) {
      if (menuItemsArr[i].name === menuItemName) return menuItemsArr[i].id;

      if (menuItemsArr[i].children && menuItemsArr[i].children.length > 0) {
        let id: string = getMMenuItemId(menuItemName, menuItemsArr[i].children);
        if (id !== "") return id;
      }
    }
  }
  return "";
};

const makeAllItemVisible = (menuItems: any) => {
  if (menuItems) {
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].display = true;
      if (menuItems[i].children && menuItems[i].children.length > 0)
        makeAllItemVisible(menuItems[i].children);
    }
  }
};

let menuItemsArr = initialState.menuItems;
makeAllItemVisible(menuItemsArr);
const getMenuItemId = (menuItem: string): string => {
  return getMMenuItemId(menuItem, menuItemsArr);
};
const defaultMenuNames = [
  getMenuItemId("Assembly Tree"),
  getMenuItemId("Display Mode"),
  getMenuItemId("Animations"),
  getMenuItemId("Scene"),
  getMenuItemId("Color Map Edit"),
  getMenuItemId("Clip planes List"),
  //getMenuItemId('Labels'),
  getMenuItemId("Labels"),
  //getMenuItemId('2D Notes'),
  //getMenuItemId('2D Plots'),
  //getMenuItemId('Point Label'),
  //getMenuItemId('Face Label'),
  //getMenuItemId('Point to Point'),
  //getMenuItemId('3 Point Arc Length'),
  //getMenuItemId("Label 3D Chart"),

  getMenuItemId("3D Slides"),
  getMenuItemId("History"),
  getMenuItemId("Guides"),
  getMenuItemId("Tool Bar"),
  getMenuItemId("Tool Bar Items"),
  //getMenuItemId('Application Settings')
];
const devMenuNames = [
  getMenuItemId("Geometry"),
  getMenuItemId("Scene"),
  getMenuItemId("Clip planes List"),
  //getMenuItemId('Labels'),
  //getMenuItemId('Messages'),
  getMenuItemId("Application Settings"),
  getMenuItemId("Tutorials"),
  getMenuItemId("About"),
];

// initialState.defaultOptions = defaultMenuNames;
//initialState.defaultOptions = devMenuNames;

export const mainMenuSlice = createSlice({
  name: "mainMenu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<{ menuItem: MainMenuItem }>) => {
      const { menuItem } = action.payload;
      state.menuItems.push(menuItem);
    },
    updateMenuItem: (
      state,
      action: PayloadAction<{ menuItem: MainMenuItem }>
    ) => {
      const { menuItem } = action.payload;
      let idx = state.menuItems.findIndex((e) => e.id === menuItem.id);
      if (idx !== -1) {
        state.menuItems[idx].id = menuItem.id;
        state.menuItems[idx].isEditMode = menuItem.isEditMode;
        state.menuItems[idx].disabled = menuItem.disabled;
        state.menuItems[idx].expanded = menuItem.expanded;
        state.menuItems[idx].name = menuItem.name;
        state.menuItems[idx].path = menuItem.path;
        state.menuItems[idx].type = menuItem.type;
        state.menuItems[idx].children = menuItem.children;
      }
    },
    deleteMenuItem: (state, action: PayloadAction<{ menuItemId: string }>) => {
      const { menuItemId } = action.payload;
      let idx = state.menuItems.findIndex((e) => e.id === menuItemId);
      if (idx !== -1) {
        state.menuItems.splice(idx, 1);
      }
    },
    addTab: (state, action: PayloadAction<{ menuItemId: string }>) => {
      state.defaultOptions.push(action.payload.menuItemId);
    },
    removeTab: (state, action: PayloadAction<{ menuItemId: string }>) => {
      let id = action.payload.menuItemId;
      let idx = state.defaultOptions.findIndex((e) => e === id);
      if (idx !== -1) state.defaultOptions.splice(idx, 1);
    },
    setDefaultTabs: (state, action: PayloadAction<{ tabIds: string[] }>) => {
      state.defaultOptions = [...action.payload.tabIds];
    },
    setActiveTab: (
      state,
      action: PayloadAction<{ menuItem: MainMenuItem | null }>
    ) => {
      const { menuItem } = action.payload;
      if (
        menuItem &&
        (menuItem.type === MainMenuItems.MORE ||
          state.defaultOptions.includes(menuItem.id) ||
          state.bottomTabOptions.includes(menuItem.id))
      ) {
        mainMenuSlice.caseReducers.setTemporartyTab(state, {
          payload: {
            menuItemID: null,
          },
          type: "mainMenuSlice/setTemporaryTab",
        });
        state.searchexpand = false;
      } else {
        mainMenuSlice.caseReducers.setTemporartyTab(state, {
          payload: {
            menuItemID: menuItem ? menuItem.id : null,
          },
          type: "mainMenuSlice/setTemporaryTab",
        });
      }
      state.activeTab = menuItem;
    },
    setTemporartyTab: (
      state,
      action: PayloadAction<{ menuItemID: string | null }>
    ) => {
      state.temporaryTab = action.payload.menuItemID;
    },
    togglePanel: (state, action: PayloadAction<{ panelId: string }>) => {
      const { panelId } = action.payload;
      state.menuItems.forEach((item) => {
        if (item.id === panelId) {
          item.expanded = !item.expanded;
        } else {
          item.expanded = false;
        }
      });
    },
    setChildItem: (
      state,
      action: PayloadAction<{
        panelId: string;
        childId: string;
        boolean: boolean;
      }>
    ) => {
      const menuItemIndex = state.menuItems.findIndex(
        (item) => item.id === action.payload.panelId
      );
      let changeItem: MainMenuItem = state.menuItems[menuItemIndex];

      const childItemIndex = changeItem.children.findIndex(
        (item) => item.id === action.payload.childId
      );
      changeItem.children[childItemIndex].disabled = action.payload.boolean;

      state.menuItems[menuItemIndex] = changeItem;
    },
    setSearchexpanded: (state, action: PayloadAction<boolean>) => {
      state.searchexpand = action.payload;
    },

    setNavheight: (state, action: PayloadAction<number>) => {
      state.navheight = action.payload;
    },
    updateMenuItemState : (state, action: PayloadAction<any>) => {
      
      let customMenuItems = action.payload;
      let defaultMenuIds:any = [];

      // applying propertie to  menu items
      customMenuItems.menuItems.forEach((jsonMenu:any) => {

        state.menuItems.forEach((localMenu)=>{
          
           if(jsonMenu.name === localMenu.name) {

            localMenu.disabled = jsonMenu.disabled;
            localMenu.display  = jsonMenu.display;
            
            if(jsonMenu.children.length > 0 && localMenu.children.length > 0) {

                jsonMenu.children.forEach((jsonChildrenMenu:any)=>{

                  localMenu.children.forEach((localChildrenMenu)=>{

                    if(jsonChildrenMenu.name === localChildrenMenu.name) {

                      localChildrenMenu.disabled = jsonChildrenMenu.disabled;
                      localChildrenMenu.display = jsonChildrenMenu.display;

                    }
                    });


                })
                
            }

           }

        })
        
      });
      // default activity menu
      customMenuItems.activitybarItems.forEach((menuItemName:string)=> {

        let menuId = getMenuItemId(menuItemName);

        defaultMenuIds.push(menuId);
      });

      //if(defaultMenuIds.length > 0 ) {
      state.defaultOptions = defaultMenuIds;
      //}
    },
    removeColorMapMenu:(state,action:PayloadAction)=>{

      let activityBarId:any[] = [];
      state.menuItems.forEach((item)=> {
        if(item.groupId === "ColorMap") {
          //item.display = false;
          item.disabled = true;
          activityBarId.push(item.id);
        }
      })

      state.defaultOptions = state.defaultOptions.filter(val => !activityBarId.includes(val));
    }
  },
});
export const {
  togglePanel,
  addMenuItem,
  updateMenuItem,
  setDefaultTabs,
  deleteMenuItem,
  addTab,
  removeTab,
  setChildItem,
  setActiveTab,
  setSearchexpanded,
  setNavheight,
  updateMenuItemState,
  removeColorMapMenu
} = mainMenuSlice.actions;
//selectors
export const selectMainMenu = (state: RootState) => state.mainMenu;
export const selectMainMenuItems = (state: RootState) =>
  state.mainMenu.menuItems;
export const getItem = (id: string, items: MainMenuItem[]): MainMenuItem => {
  let r = null;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.id === id) {
      r = item;
      break;
    } else {
      r = getItem(id, item.children);
      if (r) break;
    }
  }
  return r as MainMenuItem;
};
export const getItemFromPath = (
  path: string,
  items: MainMenuItem[]
): MainMenuItem | null => {
  let r = null;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.path === path) {
      r = item;
      break;
    } else {
      r = getItemFromPath(path, item.children);
      if (r) break;
    }
  }
  return r as MainMenuItem;
};
export const selectActiveTab = (state: RootState): MainMenuItem | null =>
  state.mainMenu.activeTab;
export const selectSearchexpand = (state: RootState) =>
  state.mainMenu.searchexpand;
export const selectNavheight = (state: RootState) => state.mainMenu.navheight;
export const selectDefaultOptions = (state: RootState): MainMenuItem[] =>
  state.mainMenu.defaultOptions.map((id) =>
    getItem(id, state.mainMenu.menuItems)
  ) as MainMenuItem[];
export const selectBottonTabOptions = (state: RootState): MainMenuItem[] =>
  state.mainMenu.bottomTabOptions.map((id) =>
    getItem(id, state.mainMenu.menuItems)
  ) as MainMenuItem[];
export const selectLeafMainMenuItems = (state: RootState): MainMenuItem[] => {
  let items: MainMenuItem[] = [];
  state.mainMenu.menuItems.forEach((item) => {
    if (item.children.length > 0) {
      items.push(...item.children);
    } else {
      items.push(item);
    }
  });
  return items;
};
export const selectMoreMenu = (state: RootState): MainMenuItem | undefined => {
  return state.mainMenu.menuItems.find((e) => e.type === MainMenuItems.MORE);
};
export const selectTemporaryTab = (state: RootState): MainMenuItem | null =>
  state.mainMenu.temporaryTab
    ? getItem(state.mainMenu.temporaryTab, state.mainMenu.menuItems)
    : null;
export default mainMenuSlice.reducer;
