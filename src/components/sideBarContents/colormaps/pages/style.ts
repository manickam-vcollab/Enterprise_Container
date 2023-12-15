import { makeStyles } from '@material-ui/core/styles';
// import { colors } from '../../../config/index';

export default makeStyles((theme:any) => (
  {
  scrollBar: {
    height:'100%',
    overflowY:'auto',
    overflowX: 'hidden',
    scrollbarColor: theme.palette.scrollbar.main,
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

  scrollBarValueSetting: {
    position:"relative",
    overflowY: "auto",
    overflowX:"hidden",
    scrollbarColor: theme.palette.scrollbar.main,
    // margin: 0,
    // padding: 0,
    listStyle: "none",
    height: "90%",
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

  listBlock : {
    marginLeft:"5px", 
    marginTop:"15px",
  },

  clearButton:{
    backgroundColor:"#0078D4",
    width:"30%", 
    fontSize:"12px" , 
    marginLeft:"90px",
    textTransform:'none',
  },

  resetButton:{
    width:"20%", 
    fontSize:"12px",
    marginRight:"5px", 
    borderRadius:'2px', 
    border:'1px solid',
    borderColor: '#0078D4',
    color:'#0078D4',
    marginLeft:'10px',
    textTransform:'none',
  },

  saveButton:{
    backgroundColor:"#0078D4",
    width:"20%", 
    fontSize:"12px" , 
    marginLeft:"80px",
    marginRight:'10px',
    textTransform:'none',
  },

  active : {
    outline:"2px solid",
    outlineColor:theme.palette.text.primary,
  },
  
  colorPicker:{
    zIndex: 10,
  },

  invalid: {
    color: theme.palette.error.main
  },

  textBox: {
    width:"100%",border: "0.5px solid",
 },

 saveResetButtonContainer:{
  marginBottom:"5px", 
  marginTop:"50px", 
  marginLeft:"65px", 
  marginRight:"75px"
},

legendSelection: {
  marginTop:"30px",
  marginLeft:"10px",
  width:"90%"
},
sidebarText:{
  color: theme.palette.text.secondary,
  fill:theme.palette.text.secondary,
  fontWeight: theme.typography.body2.fontWeight,
  fontSize: theme.typography.body2.fontSize,
  '&:hover': {
    color: theme.palette.text.secondary,
    opacity:1
},
},

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
  
  '&[type=tel]': {
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


}));
