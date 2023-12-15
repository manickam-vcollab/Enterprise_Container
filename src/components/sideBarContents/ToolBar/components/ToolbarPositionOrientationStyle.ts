
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({


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
        marginLeft:'25px',
        '&:hover':{
            cursor:'pointer',
            color: theme.palette.text.primary,
            opacity: 1
        }

    },

    
}))