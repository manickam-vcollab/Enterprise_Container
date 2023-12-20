import * as glmatrix from 'gl-matrix'; 
import { vec3 } from 'gl-matrix'; 

export namespace MathUtils{
    export interface AngleAxis{
        angle : number;
        axis_in_camera_coord : glmatrix.vec3;
    }

    export function getArcballVector(x:number, y:number,canvas:HTMLElement):vec3 {

        //https://en.wikibooks.org/wiki/OpenGL_Programming/Modern_OpenGL_Tutorial_Arcball

        var screen_width = canvas.clientWidth;
        var screen_height = canvas.clientHeight;
        var P = vec3.create();

        // y = screen_height;
        //var centeredModelScreenPos = [0, 0, 0, 0]
        //centeredModelScreenPos[0] = translation[0];
        //centeredModelScreenPos[1] = 0.0;
        //centeredModelScreenPos[2] = 0.0;
        //centeredModelScreenPos[3] = 1.0;

        P[0] = (1.0 * x / screen_width) * 2 - 1.0;
        P[1] = (1.0 * y / screen_height) * 2 - 1.0;
        P[2] = 0;

        // P[0] = modelCenter[0] - P[0];
        //P[1] = -modelCenter[1] - P[1];

        // P[0] = -P[0];
        // P[1] = P[1];

        P[1] = -P[1];

        var OP_squared = P[0] * P[0] + P[1] * P[1];
        if (OP_squared <= 1 * 1)
            P[2] = Math.sqrt(1 * 1 - OP_squared);  // Pythagorean
        else
            P = vec3.normalize(P,P); // nearest point

        return P;
    }

    export function getContainerBox(container:HTMLElement) {
        let box = [0, 0, 0, 0];

        if (container !== undefined && container !== null) {
            try {
                var rect = container.getBoundingClientRect();

                box[0] = rect.top;
                box[1] = rect.left;
                box[2] = rect.bottom;
                box[3] = rect.right;
            } catch (err) {
                //throw new err();
            }
        }
        return box;
    }

    export const getRotAngleAndNormalizedCamAxis = (newMouseX:number, newMouseY:number, lastMouseX:number, lastMouseY:number,canvas:HTMLElement):MathUtils.AngleAxis => {

        let rotationObject:MathUtils.AngleAxis = {} as MathUtils.AngleAxis;

        if (newMouseX !== lastMouseX || newMouseY !== lastMouseY) {
            let va = MathUtils.getArcballVector(lastMouseX, lastMouseY,canvas);
            let vb = MathUtils.getArcballVector(newMouseX, newMouseY,canvas);

            let angle = Math.acos(Math.min(1.0, glmatrix.vec3.dot(va, vb)));
            let axis_in_camera_coord = glmatrix.vec3.create();
            glmatrix.vec3.cross(axis_in_camera_coord,va, vb);
            glmatrix.vec3.normalize(axis_in_camera_coord,axis_in_camera_coord);


            rotationObject.angle = angle;
            rotationObject.axis_in_camera_coord = axis_in_camera_coord;
        }
        else
        {
            //return null;
        }
        return rotationObject;

    }

}

