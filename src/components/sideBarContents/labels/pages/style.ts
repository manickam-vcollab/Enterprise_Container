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
    color:theme.palette.accent.primaryText,
    backgroundColor:theme.palette.accent.primary,
    '&:hover':{
      backgroundColor:theme.palette.accent.secondary,
    }
  },

  resetButton:{
    width:"62px",
    height:"30px",
    borderRadius:"5px",
    fontSize:theme.typography.body2.fontSize , 
    textTransform:"none",

  },
  disabled: {
    color: theme.palette.text.disabled,
    },
  activeText:{
    color:theme.palette.text.primary,
  },
  disabledText:{
    color:theme.palette.text.secondary,
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
