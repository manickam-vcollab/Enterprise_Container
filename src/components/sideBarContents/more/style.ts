import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    leftTitle: {
        paddingLeft:'10px',
    },
    bodyHeading:{
  
        fontSize:theme.typography.body1.fontSize,
        fontWeight:theme.typography.body1.fontWeight,
        lineHeight:theme.typography.body1.lineHeight,
        color:theme.palette.text.secondary,
      
      },
    listItemText :{

        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        color:theme.palette.text.secondary,
    },

// icon color object for future update
    // iconColor:{
    //     fill:theme.palette.text.secondary,
    //     stroke:theme.palette.text.secondary,
    // },
    
    iconTextColor:{
        color:theme.palette.text.secondary,
        '&:hover svg':{
            color:theme.palette.text.primary
        }
    }

}));