
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({

    toggleContainer:{
        width:'100%',
        height:'50px',
        marginTop:'30px',
        marginLeft:'16px'
    },
    toggleButtons:{
        float:'left',
    },
    bodyHeading:{
             
    fontSize:theme.typography.body1.fontSize,
    fontWeight:theme.typography.body1.fontWeight,
    lineHeight:theme.typography.body1.lineHeight,
    color:theme.palette.text.secondary,
    },
    
    bodyContent:{
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        color:theme.palette.text.secondary,
    }

}))