import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({

    rootDiv:{
    marginTop:'20px'

    },

    dialogBox: {
      color: theme.palette.text.primary,
      fontSize: "50px",
    },
    snackBar: {
    background: theme.palette.background.paper,
    color: theme.palette.error.light,
    opacity:"50%",
    marginTop:'40px',
    },

    mouseControlListHeading:{
      fontSize:theme.typography.body1.fontSize,
      fontWeight:theme.typography.body1.fontWeight,
      lineHeight:theme.typography.body1.lineHeight,
      color:theme.palette.text.secondary

    },
    

    mouseControlListContent:{
      fontSize:theme.typography.body2.fontSize,
      fontWeight:theme.typography.body2.fontWeight,
      lineHeight:theme.typography.body2.lineHeight,
      color:theme.palette.text.secondary

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
  

}));