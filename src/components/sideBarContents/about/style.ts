import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({

    textColor:{
        color:theme.palette.text.secondary,
        // 'div:hover':{
        //     color:theme.palette.text.primary
        // }
    },
  
    app_displayName:{
        fontSize:theme.typography.body2.fontSize,
        lineHeight:theme.typography.body2.lineHeight,
        fontWeight:theme.typography.body2.fontWeight,
        color:theme.palette.text.primary,
        width:'100%',
        height:'20px',
        
    },
    app_version:{
        fontSize:theme.typography.overline.fontSize,
        lineHeight:theme.typography.overline.lineHeight,
        fontWeight:theme.typography.overline.fontWeight,
        width:'100%',
        height:'12px',
        marginTop:'5px'
    },
    copy_right:{
        fontSize:theme.typography.overline.fontSize,
        lineHeight:theme.typography.overline.lineHeight,
        fontWeight:theme.typography.overline.fontWeight,
        width:'100%',
        height:'12px',
        marginTop:'5px',
        marginBottom:'20px'
    },
    what_new:{
        fontSize:theme.typography.caption.fontSize,
        lineHeight:theme.typography.caption.lineHeight,
        fontWeight:theme.typography.caption.fontWeight,
        width:'100%',
        height:'16px',
        marginTop:'5px'
    },
    suggest_feature:{
        fontSize:theme.typography.caption.fontSize,
        lineHeight:theme.typography.caption.lineHeight,
        fontWeight:theme.typography.caption.fontWeight,
        width:'100%',
        height:'16px',
        marginTop:'5px'
    },
    terms:{
        fontSize:theme.typography.caption.fontSize,
        lineHeight:theme.typography.caption.lineHeight,
        fontWeight:theme.typography.caption.fontWeight,
        width:'100%',
        height:'16px',
        marginTop:'5px'
    },
    privacy:{
        fontSize:theme.typography.caption.fontSize,
        lineHeight:theme.typography.caption.lineHeight,
        fontWeight:theme.typography.caption.fontWeight,
        width:'100%',
        height:'16px',
        marginTop:'5px'
    }

}))