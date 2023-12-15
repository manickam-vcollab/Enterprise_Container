import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme:any) => ({

    MuiListItemText:{ 
        marginLeft:'15px'
    },

    MuiListItemTextSelected:{
      '&.Mui-selected':{
        color:theme.palette.accent.primaryText,
      },
    },

    Scrollbar:{
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

  listItemTextHeading:{

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
      '&:hover':{

        color:theme.palette.text.primary,
      }
    },
    listItemTextSelected:{

      color:theme.palette.accent.secondaryText,
      fontSize:theme.typography.body2.fontSize,
      fontWeight:theme.typography.body2.fontWeight,
      lineHeight:theme.typography.body2.lineHeight,
      '&:hover':{

        color:theme.palette.accent.primaryText,
      }
    }

}));
