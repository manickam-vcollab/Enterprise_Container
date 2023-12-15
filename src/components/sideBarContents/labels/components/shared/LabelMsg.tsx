import React, { forwardRef, } from 'react';
import SlateEditor from "./Editor/SlateEditorLabel";
import RMEEditor from "./Editor/RMEditorLabel";
import { makeStyles } from "@material-ui/styles";

const editorType = 'RME1';

type LabelMsgProps = {
    msg:string,
    bgColor: string,
    fontColor: string,
    borderColor:string ,
    bgImage:any,
    isImageActive:boolean,
    imageStyle:any,
}
const selectionStyle = makeStyles((theme: any) => ({
    
   tile:{

   backgroundRepeat:"repeat"

   },
   center:{
  
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
 


   },
   stretch:{
    backgroundSize:"100% 100%"
   },
   fitview:{
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize: "contain",
   }

  }));
function LabelMsg(props:LabelMsgProps, ref:any) {
    const classes=selectionStyle();

const getClassName=()=>{
    if(props.imageStyle === 0){
        return classes.tile
    }
    else if(props.imageStyle==1){
        return classes.center
    }
    else if(props.imageStyle==2){
        return classes.stretch
    }
    else if(props.imageStyle==3){
        return classes.fitview
    }
}

    return ( 
        <div ref={ref} className={getClassName()} style={{display:"flex",color:props.fontColor, width:"100%",height:"100%",zIndex:1,border:`1px solid ${props.borderColor}`, backgroundImage:props.isImageActive===true ? `url("${props.bgImage}")` : ""  , backgroundColor:props.isImageActive==false ? props.bgColor : ""}}>{
            editorType === 'RME' ?
            <RMEEditor content = {JSON.parse(props.msg)} /> :
            <SlateEditor content = {JSON.parse(props.msg)}/>
            
        }</div>
        
    )
}

export default forwardRef(LabelMsg)
