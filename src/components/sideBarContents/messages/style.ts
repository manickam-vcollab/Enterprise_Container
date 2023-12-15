import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    backIcon : {
        width : 48,
        height: 48,
    },
    divider: {
        height: 2,
        width: '100%',
        backgroundColor: theme.palette.divider,
    },
    heading: {
        justifySelf: 'start',
        width: '100%',
      },

      scrollBar: {
        position:"relative",
        overflowY: "auto",
        overflowX:"hidden",
        // margin: 0,
        // padding: 0,
        listStyle: "none",
        height: "89%",
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

      card:{
        marginTop:"20px",
        paddingBottom:"15px",
        borderBottom: "1px solid "
      },

      cardTopPadding:{
        paddingBottom:"10px",
        width:'300px',
        textAlign:'left',
        fontSize:theme.typography.caption.fontSize,
        // color:theme.palette.text.secondary
      },

      cardTopPadding1:{
        paddingBottom:"10px",
        width:'300px',
        marginLeft:"-37px",
        textAlign:'left',
        marginTop:'5px',
        fontSize:theme.typography.caption.fontSize,
        // color:theme.palette.text.secondary
      },

      simpleIcon:{
        marginLeft:"34px",
        marginRight:"15px",
        marginTop:"-7px",
      },

      transferIcon:{
        marginLeft:"20px",
        marginRight:"10px"
      },

      buttonStyle:{
        width:"20%",
        fontSize:"12px",
        // color:theme.palette.secondary.main,
        borderRadius:'4px',
        border:'solid',
        color:'#0078D4',
        borderColor:'#0078D4',
        borderWidth:'thin'

      },

      gap:{
        marginLeft:'-37px',
        marginRight:'45px'
      },

      simpleCard:{
        marginLeft:"15px",
      },

      timeDisplay:{
        paddingLeft:'8px',
        marginLeft:'-20px',
        textAlign:'left',
        fontSize:theme.typography.caption.fontSize
        //marginRight:"20px"
      },
      transferCard: {
        // width:'200px',
        marginLeft:'-37px',
        textAlign:'justify',
        fontSize:theme.typography.body1.fontSize,
        // color:theme.palette.text.secondary
      },
      notification:{
        marginLeft:"15px"
      },

      arrowButton:{
        marginTop:"-5px",
        marginLeft:'35px',
        cursor:'pointer'
      },
      bodyContent:{

        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        //color:theme.palette.text.secondary
      },
      enabledContent:{
        color:theme.palette.text.primary
      },
      disabledContent:{
        color:theme.palette.text.disabled
      },
      iconTextColor:{
        color:theme.palette.text.secondary,
        '&:hover svg':{
            color:theme.palette.text.primary
        }
    },
      
      messageContent:{
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
        color:theme.palette.text.primary

      }

}));
