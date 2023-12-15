 import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    leftTitle: {
        paddingLeft:'10px',
    },
    iconTextColor:{
        color:theme.palette.text.secondary,
        '&:hover svg':{
            color:theme.palette.text.primary
        }
    },
    headerIconAlign:{
        display: "inherit",
        marginRight: "-90px;"
    },
    bodyHeading:{
  
        fontSize:theme.typography.body1.fontSize,
        fontWeight:theme.typography.body1.fontWeight,
        lineHeight:theme.typography.body1.lineHeight,
        color:theme.palette.text.secondary,
      
      },
      
}));