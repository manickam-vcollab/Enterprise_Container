import { createSlice, createAsyncThunk, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "store";


export enum CameraMode {
    PERSPECTIVE  = 'PERSPECTIVE',
    ORTHOGRAPHIC = 'ORTHOGRAPHIC'
}
export enum BackgroundMode {
    GRADIENT = 'gradient',
    IMAGE    = 'image'
}

const initialState = {

    default: [
        {
            name: 'Scene',
            cameraViews: [
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Front",
                    cameraPosVector: [0.0416, -1.0719, -14.253],
                    cameraDirVector: [0, 0, 1],
                    cameraUpVector: [0, 1, 0],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.0931,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.65995,
                        right: 0.65995,
                        top: 0.31529,
                        bottom: -0.31529,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Back",
                    cameraPosVector: [-0.0416, -1.0719, -7.0634],
                    cameraDirVector: [0, 0, -1],
                    cameraUpVector: [0, 1, 0],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.3355,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.73639,
                        right: 0.73639,
                        top: 0.31529,
                        bottom: -0.31529,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Left",
                    cameraPosVector: [-3.5949, -1.0719, -10.7000],
                    cameraDirVector: [1, 0, 0],
                    cameraUpVector: [0, 1, 0],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.3355,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.7363,
                        right: 0.7363,
                        top: 0.3152,
                        bottom: -0.3152,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Right",
                    cameraPosVector: [3.5949, -1.0719, -10.6168],
                    cameraDirVector: [-1, 0, 0],
                    cameraUpVector: [0, 1, 0],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.3355,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.7363,
                        right: 0.7363,
                        top: 0.3152,
                        bottom: -0.3152,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Top",
                    cameraPosVector: [0.0416, 3.5949, -11.73042],
                    cameraDirVector: [0, -1, 0],
                    cameraUpVector: [0, 0, 1],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.3355,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.7363,
                        right: 0.7363,
                        top: 0.3152,
                        bottom: -0.3152,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Bottom",
                    cameraPosVector: [0.0416, -3.5949, -9.5864],
                    cameraDirVector: [0, 1, 0],
                    cameraUpVector: [0, 0, -1],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.3355,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.7363,
                        right: 0.7363,
                        top: 0.3152,
                        bottom: -0.3152,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },
                {
                    id: `cameraview_${nanoid()}`,
                    title: "Isometric",
                    cameraPosVector: [2.5714, 0.5753, -11.9009],
                    cameraDirVector: [-0.7071, -0.4082, 0.5773],
                    cameraUpVector: [0, 0.8164, 0.5773],
                    perspectiveFrustum: {
                        yFOV: 35,
                        aspectRatio: 2.3355,
                        farPlane: 1000,
                        nearPlane: 1
                    },
                    orthographicFrustum: {
                        left: -0.7363,
                        right: 0.7363,
                        top: 0.3152,
                        bottom: -0.3152,
                        farPlane: 1000,
                        nearPlane: 1
                    }
                },

            ],
            cameraModes: {
                PERSPECTIVE: CameraMode.PERSPECTIVE,
                ORTHOGRAPHIC: CameraMode.ORTHOGRAPHIC
            },
            backgroundModes: {
                GRADIENT: BackgroundMode.GRADIENT,
                IMAGE: BackgroundMode.IMAGE
            },
            windowPositions: [
                {
                    id: 'windowPosition_top_left',
                    title: "Top Left"
                },
                {
                    id: 'windowPosition_top_center',
                    title: "Top Center"
                },
                {
                    id: 'windowPosition_top_right',
                    title: "Top Right"
                },
                {
                    id: 'windowPosition_middle_left',
                    title: "Middle Left"
                },
                {
                    id: 'windowPosition_middle_right',
                    title: "Middle Right"
                },
                {
                    id: 'windowPosition_bottom_left',
                    title: "Bottom Left"
                },
                {
                    id: 'windowPosition_bottom_center',
                    title: "Bottom Center"
                },
                {
                    id: 'windowPosition_bottom_right',
                    title: "Bottom Right"
                },
                {
                    id: `windowPosition_custom`,
                    title: "Custom"
                }

            ],
        },
        
    ]
}

export const defaultSlice = createSlice({
    name: 'defaultSlice', 
    initialState: initialState,
    reducers: {

    }
})

export const { } = defaultSlice.actions;

export const selectWindowPositionList = (state:RootState) => {
    // state.defaultSlice.default.forEach((item)=> {
    //     if(item.name === 'Scene') {
    //         return item.windowPositions;
    //     }
    // })
    return state.defaultSlice.default[0].windowPositions;
}
export const selectDefaultSceneData = (state:RootState) => {

    const sceneData = state.defaultSlice.default.filter((item)=> item.name === 'Scene');
    return sceneData

}
export default defaultSlice.reducer;