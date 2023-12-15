import { SketchPicker } from 'react-color';

type Color = {
    r:number,
    g:number,
    b:number,
    a?:number,
}

interface ColorPickerProps {
    color : string,
    onChangeComplete ?: (hex : string, undoable?: boolean) => void,
}

export default function ColorPicker(props : ColorPickerProps) {
    return(
        <SketchPicker  
               {...props} 
               onChangeComplete = { (color) => props.onChangeComplete ? props.onChangeComplete(color.hex, true) : null}
               presetColors={[]}
               disableAlpha ={true}                 
        />
    )
}