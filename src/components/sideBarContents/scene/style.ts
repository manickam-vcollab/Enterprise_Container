import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => (
    {

    inputEquation :{
      color:theme.palette.text.primary,
       background:"none",
      border: "1px solid",
      borderColor: theme.palette.text.primary ,
      textAlign:"center",
      width:"70%",
      fontSize:"16px",
      zIndex: 10,
      size: 4,
      
      '&[type=number]': {
        '-moz-appearance': 'textfield',
      },
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },

    scrollBar: {
      position:"relative",
      overflowY: "auto",
      overflowX:"hidden",
      scrollbarColor: theme.palette.scrollbar.main,
      height: "96%",
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius:'20px',
        backgroundColor: theme.palette.scrollbar.main,
  
      },
    },

    cameraEditPageContainer:{
      marginTop:"20px", 
      marginLeft:"10px",
    },

    cameraEditCategoryContainer:{
      marginBottom:"40px"
    },

    cameraEditCategoryHeader:{
      textAlign:"left",
      marginBottom:"10px"
    },

    colorPicker:{
      zIndex: 10,
  },

  buttonComponent:{
    color:theme.palette.text.primary,
    fontSize:"16px", 
},

buttonContainer:{
  marginLeft:"-225px", 
  marginBottom:"-20px",
  marginTop:"5px",
},

saveResetButtonContainer:{
  marginBottom:"5px", 
  marginTop:"50px", 
  marginLeft:"75px", 
  marginRight:"75px"
},


active : {
  outline:"2px solid",
  outlineColor:theme.palette.text.primary,
},

cameraBodyHeading:{
  
  fontSize:theme.typography.body1.fontSize,
  fontWeight:theme.typography.body1.fontWeight,
  lineHeight:theme.typography.body1.lineHeight,
  color:theme.palette.text.secondary,

},
activeText:{
  color:theme.palette.text.primary,
},
disabledText:{
  color:theme.palette.text.secondary,
},

sidebarText:{
  color: theme.palette.text.secondary,
  fill:theme.palette.secondary.main,
  fontWeight: theme.typography.body2.fontWeight,
  fontSize: theme.typography.body2.fontSize,
 // lineHeight:theme.typography.body2.fontWeight
},

caption: {
  fontSize:theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
},


cameraBodyContent:{

  fontSize:theme.typography.body2.fontSize,
  fontWeight:theme.typography.body2.fontWeight,
  lineHeight:theme.typography.body2.lineHeight,
  color:theme.palette.text.secondary,
  '&:hover':{
    cursor:'pointer',
    color: theme.palette.text.primary,
    opacity: 1

}
},
cameraBodyContentSelected:{

  fontSize:theme.typography.body2.fontSize,
  fontWeight:theme.typography.body2.fontWeight,
  lineHeight:theme.typography.body2.lineHeight,
  // color:theme.palette.accent.secondaryText,
  color: theme.palette.text.primary,
  '&:hover':{
    cursor:'pointer',
    // color: theme.palette.accent.primaryText,
    opacity: 1

}
},
disabled: {
  color: theme.palette.text.disabled,
  },
  hoverEffect:{
    "&:hover": {
        cursor:'pointer',
        color: theme.palette.text.primary,
        fill:theme.palette.primary.main,
        opacity: 1
      }
  }
}
));