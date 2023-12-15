export enum Routes {
    LOGIN = "/login",
    HOME = "/home",
    VIEWER = "/",

    GEOMETRY = "/geometry/",
    GEOMETRY_ASSEMBLY_TREE = "/geometry/assembly_tree",
    GEOMETRY_SEARCH = "/geometry/search",
    GEOMETRY_DISPLAY_MODES = "/geometry/display_modes",
    GEOMETRY_MATERIAL_COLOR = "/geometry/material_color",
    GEOMETRY_PART_LIST = "/geometry/part_list",
    GEOMETRY_TRANSFORM = "/geometry/transform",

    FIELD = "/field/",
    FIELD_VARIABLES = "/field/variables",
    FIELD_STEPS_AND_SUBCASES = "/field/steps_and_subcases",
    FIELD_DERIVED_TYPES = "/field/derived_types",
    FIELD_SECTIONS_AND_LAYERS = "/field/sections_and_layers",

    CLIPPLANES ="/clipplanes/",
    CLIPPLANES_LIST = "/clipplanes/list",
    CLIPPLANES_SETTINGS = "/clipplanes/settings",
    CLIPPLANES_TRANSFORMATION = "/clipplanes/transfromation",

    SCENE = "/scene/",
    SCENE_CAMERA = "/scene/camera",
    SCENE_CAMERA_EDIT = "/scene/camera/edit",
    SCENE_BACKGROUND = "/scene/background",
    SCENE_AXIS_TRIAD = "/scene/axis_triad",
    SCENE_LIGHT = "/scene/light",

    MESSAGES = "/messages",

    LABELS = "/labels/",
    LABELS_LIST = "/labels/list",
    LABEL_EDIT = "/labels/label_edit",
    LABELS_3D_EDITS = '/labels/3d_label_edit',
    LABELS_MEASUREMENTS_EDITS = "/labels/measurements_edit",

// Labels Routes   
    All_LABELS = "/alllabels/",
    All_LABELS_LIST = "/alllabels/list",
    All_LABELS_EDIT = "/alllabels/edit",
    POINT_2D_NOTES="/alllabels/point_2d_notes",
    POINT_LABEL="/alllabels/point_label",
    FACE_Label="/alllabels/face_label",
    POINT_TO_POINT="/alllabels/point_to_point",
    POINT_ARC_LENGTH="/alllabels/3_point_Arc_length",
    LABEL_3D_CHART="/alllabels/LABEL_3D_CHART",
    POINT_2D_PLOTS="/alllabels/point_2d_plotes", 
    SELECT_WINDOW="/alllabels/select_window",
    HOTSPOT="/alllabels/hotspots",

    
    SETTINGS = "/settings/",
    SETTINGS_THEME = "/settings/theme",
    SETTINGS_MOUSE_CONTROLS ="/settings/mousecontrols",
    SETTINGS_MOUSE_CONTROLS_EDIT ="/settings/mousecontrols/edit",
    AVERAGE_OPTIONS="/settings/averageoptions",
    AVERAGE_OPTIONS_EDIT="/settings/averageoptionsedit",

    COLORMAPS = "/colormaps/",
    COLORMAPS_LIST = "/colormaps/list",
    COLORMAPS_EDIT = "/colormaps/edit",
    COLORMAPS_VARIABLE = "/colormaps/variable",
    COLORMAPS_STEPS_AND_SUBCASE = "/colormaps/steps_and_subcase",
    COLORMAPS_SELECTION_AND_LAYER = "/colormaps/selection_and_layer",
    COLORMAPS_DERIVED_TYPES = "/colormaps/derived_types",
    COLORMAPS_COLOR_PALETTE = "/colormaps/color_palette",
    COLORMAPS_COLOR_PALETTE_EDIT = "/colormaps/colorPalette_edit",
    COLORMAPS_VALUE_SETTINGS = "/colormaps/value_settings",
    COLORMAPS_LEGEND_SETTINGS = "/colormaps/legend_settings",

    SLIDES = "/slides",

    MORE = "/more",
    ADD_GROUP = '/add_group',
    CUSTOM_GROUP = "/custom_group/",

    CONTOURPLOT = "/contourplot",

    TRANSFORMATIONS = "/transformation",
    ANIMATIONS = "/animations/",
    ANIMATION_LIST="/animations/animation_list",
    LINEAR = "/animations/linear",
    ANIMATION_EDIT = "/animations/animation_Edit",
    EIGEN = "/animations/Eigen",
    TRANSIENT = "/animations/Transient",
    VIEW_POINT = "/animations/view_point",

    
    TUTORIALS = "/tutorials",

 
    TOOLBAR = "/toolbar",
    TOOLBARITEMS = "/toolbar/toolbaritems",
    TOOLBARLIST = "/toolbar/toolbarlist",
    TOOLBARPOSITION = "/toolbar/toolbarposition",

    ABOUT = "/about",
  ABOUTPAGE="/about/aboutpage",
    SUGGEST='/about/suggest',
    WHATSNEW='/about/whatsnew',
    TERMS='/about/terms',
    PRIVACY='/about/privacy',
    FEEDBACK='/about/feedback',
    CHATBOT ="/chatbot"

}