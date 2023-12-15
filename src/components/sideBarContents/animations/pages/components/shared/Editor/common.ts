import { AnimationType,ILabel } from "store/sideBar/AnimationSlice/shared/types";
import { defaultData } from "store/appDefaultSlice";


export const AnimationTemplate:any = [
    {
        type: 'paragraph',
        children: [
          { text: defaultData.animations.linear},
        ],
      },
    ]

    export const getInitialContent = (selectedLabels:ILabel[]) => {
        if(selectedLabels.length > 1) {
          switch(selectedLabels[0].animationType) {
            case AnimationType.LINEAR:
            return([
              {
              type: 'paragraph',
              children: [
                  { text: 'Cannot edit Multiple Animations selected'},
                ],
            }
          ])
          
            default:
              return JSON.parse(selectedLabels[0].anim)
          }
        }
        else{
          return JSON.parse(selectedLabels[0].anim)
        }
      }