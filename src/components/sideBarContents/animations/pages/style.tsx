import { makeStyles } from '@material-ui/core/styles';
// import { colors } from '../../../config/index';

export default makeStyles((theme) => (
  {
  scrollBar: {
    position:"relative",
    overflowY: "auto",
    overflowX:"hidden",
    // margin: 0,
    // padding: 0,
    listStyle: "none",
    height: "99%",
    width:"100%",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
  },

  scrollBarFrame: {
    
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      opacity: 1,
      zIndex:999,
      fontWeight: 'normal',
    },
    '& .MuiSlider-mark': {
      marginTop:'8px',
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-markLabel' : {
      marginTop:'8px'
    }
  },
  iconColor: {
    color:theme.palette.text.secondary,
    "&:hover": {
        cursor:'pointer',
        color: theme.palette.text.primary,
        fill:theme.palette.text.primary,
        opacity: 1
      }
   
},
disabled:{
  color:theme.palette.text.disabled,
  pointerEvents:'none',
  cursor: 'not-allowed'
     },


  pageCaption:{
    textAlign:"left",
    marginBottom:"15px",
    marginTop:"10px",
  },

  editPageFooter:{
    marginTop:"20px", 
    marginBottom:"20px",
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-around'
  },

  saveButton:{
    width:"51px",
    height:"30px",
    borderRadius:"5px",
    fontSize:theme.typography.body2.fontSize , 
    textTransform:"none",

  },

  resetButton:{
    width:"62px",
    height:"30px",
    borderRadius:"5px",
    fontSize:theme.typography.body2.fontSize , 
    textTransform:"none",

  },
  
  activeText:{
    color:theme.palette.text.primary,
  },
  disabledText:{
    color:theme.palette.text.secondary,
  },
  sidebarText:{
    color: theme.palette.text.secondary,
    marginLeft:'15px',
    fill:theme.palette.text.secondary,
    fontWeight: theme.typography.body2.fontWeight,
    fontSize: theme.typography.body2.fontSize,
    '&:hover': {
      color: theme.palette.text.secondary,
      opacity:1
  },
   // lineHeight:theme.typography.body2.fontWeight
 
  },
  inputTranslate :{
    color:theme.palette.text.primary,
     background:"none",
    border: "1px solid",
    borderColor: theme.palette.text.primary ,
    textAlign:"center",
    width:"60%",
    borderRadius:'4px',
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
  hoverEffect:{
    "&:hover": {
        cursor:'pointer',
        color: theme.palette.text.primary,
        fill:theme.palette.text.primary,
        opacity: 1
      }
  },
  iconTextColor:{
    color:theme.palette.text.secondary,
    '&:hover svg':{
        color:theme.palette.text.primary
    }
}


}));
