import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({

    listItem:{

        padding:'0px'
    },
    
    selectDropDown:{

        fontSize:"12px",
    },
    alignMenuItem:{

        width:'90%',
        marginTop:'5px',
        display:'flex',
        alignItems:'stretch',
        
    },
    listItemHeading:{

        color:theme.palette.text.secondary,
        fontSize:theme.typography.body1.fontSize,
        fontWeight:theme.typography.body1.fontWeight,
        lineHeight:theme.typography.body1.lineHeight,

    },
    listItemText:{

        color:theme.palette.text.secondary,
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        "&:hover": {
            cursor:'pointer',
            color: theme.palette.text.primary,
            opacity: 1
        }

    }

}));