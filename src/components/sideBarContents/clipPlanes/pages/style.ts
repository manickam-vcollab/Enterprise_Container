import { makeStyles } from '@material-ui/core/styles';
// import { colors } from '../../../config/index';

export default makeStyles((theme) => (
  {
  
  button: {
    background: theme.palette.action.selected,
  },

  caption: {
    // fontSize:"14px",
    color: theme.palette.text.primary,
    opacity: 0.7,
  },

  scrollBar: {
    position:"relative",
    overflowY: "auto",
    overflowX:"hidden",
    scrollbarColor: theme.palette.scrollbar.main,
    height: "89%",
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

  editButton:{
    // background: theme.palette.action.selected,
    // borderRadius:"5px",
    width:'18px',height:'18px',left:'133px'
  },


  inputEqnBorder:{
    border: "1px solid",
    width:"100%",
    borderColor: theme.palette.text.primary ,
    height:"35px"
  },

  inputEqn: {
    textAlign:"center",
    background:"none",
    border:"none",
    paddingTop:"10px",
    paddingBottom:"5px",
    marginBottom:"4px",
    borderBottom: "1px solid ",
    '&:focus': {
      outline:"none",
  },
    color:theme.palette.text.primary,
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
      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
  }},

  disabledTextBox: {
     width:"100%",border: "1px solid",
  },

  settingPageContainer:{
    marginRight:"40px", 
    marginLeft:"10px",
  },

  translatePageContainer:{ 
    marginLeft:"10px",
  },

  settingItemContainer:{
    marginBottom:"30px",
    marginTop:"10px",
  },

  settingPageCaption:{
    textAlign:"left",
    marginBottom:"15px",
    marginTop:"10px",
  },

  inputTranslate :{
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

  iconTextColor:{
    color:theme.palette.text.secondary,
    '&:hover svg':{
        color:theme.palette.text.primary
    }
},
  
  disabled: {
  background: theme.palette.text.disabled,
  },

  sidebarText:{
    color: theme.palette.text.secondary,
    fill:theme.palette.text.secondary,
    // fontWeight: theme.typography.body2.fontWeight,
    fontSize: "12px",
    '&:hover': {
      color: theme.palette.text.secondary,
      opacity:1
  },
   // lineHeight:theme.typography.body2.fontWeight
 
  },
  iconStyling:{
    width:96,
    height:90,
    paddingRight:2,
    paddingLeft:2,
    '&:hover': {
      color: theme.palette.text.secondary,
     
  },

  }

}));
