import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Background from "components/sideBarContents/scene/pages/background";
import { AlignCenter } from "tabler-icons-react";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 5,
      color: theme.palette.text.secondary,
      backgroundColor: "transparent",
    },
    iconBar: {
      display: 'flex',
      margin:'auto',
      alignItems:'center',
      justifyContent:'center',
      // flexDirection:''
      width:'100%',
      height:'100%'

    },

    disbaledName:{
      color: theme.palette.grey[400]
    },

    toolbarIconsHorizontal: {
      float: 'left',
      paddingLeft: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingRignt: 5,
      margin: 'auto',
      textAlign: 'center',
      width:'60px',
      height:'60px'
    },
    toolbarIconsVertical: {
      float: 'left',
      // paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 5,
      // paddingRignt: 10,
      margin: 'auto',
      textAlign: 'center',
      width:'60px',
      height:'60px'
    },
    toolbarIcons:{
      float: 'left',
      // paddingLeft: 4,
      // paddingTop: 4,
      // paddingBottom: 6,
      // paddingRight: 4,
      margin: 'auto',
      textAlign: 'center',
      width:'38px',
      height:'38px',
      display:'flex',
      flexDirection:'column',
      '&:hover': {
        background: theme.palette.action.hover,
        // borderRadius:'100%',
        transition: 'all 0.05s linear',
        transform: 'scale(1.1)',
        
    },
  },
    toolbardisabledIcons:{
      float: 'left',
      // paddingLeft: 4,
      // paddingTop: 4,
      // paddingBottom: 4,
      // paddingRight: 4,
      margin: 'auto',
      textAlign: 'center',
      width:'38px',
      height:'38px',
      display:'flex',
      flexDirection:'column',
      

    },

    actionShow: {
      color: theme.palette.text.secondary,
    },
    actionHide: {
      color: theme.palette.text.disabled,
    },
    hightlight: {
      padding: theme.spacing(0.5),
      background:
        theme.palette.type === "dark"
          ? theme.palette.warning.dark
          : theme.palette.warning.light,
    },
    hideText: {
      background: theme.palette.background.default,
      [theme.breakpoints.down("sm")]: {
        backgroundColor: theme.palette.background.default,
      },
    },

    selectedHideText: {
      background: theme.palette.primary.main,
    },

    disabled: {
      pointerEvents: "none",
      opacity: 0.3,
    },

    checkbox: {
      maxWidth: 3,
      maxHeight: 3,
      padding: 10,
    },

    textStyle: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.fontFamily,
    },

    iconHover: {
      color:theme.palette.text.primary,
      "&:hover": {
        backgroundColor: "transparent",
        border: theme.palette.background.default,
      },
    },

    overlaystyling: {
      display: "flex",
      width: "100%",
      position: "absolute",
      right: 3,
      justifyContent: "flex-end",
    },

    overlayicons: {  
      //   backgroundColor: theme.palette.background.default,
      opacity: "1",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      marginRight:'9px'
    },

    marginStylePartlist:{
      marginLeft:'-32px'
    },

    icon: {
      // color: theme.palette.text.primary,
      // "&:hover": {
      //   color: theme.palette.background.default,
      // },
      width: "18px",
      height: "18px",
      color: theme.palette.text.primary,
      marginTop:'2px'
      // color:'red'
    },
    popIn: {
      // color: theme.palette.text.primary,
      // "&:hover": {
      //   color: theme.palette.background.default,
      // },
      // width: "18px",
      // height: "18px",
      color: theme.palette.text.primary,
      // marginTop:'2px',
      backgroundColor:theme.palette.action.hover,
      // color:'red'
    },

    iconText : {
      fontSize: 10, 
      // display:'flex',
      justifyContent:'center',
      paddingTop:'1px',
      margin:'auto',
      textAlign: 'center',
      color: theme.palette.text.primary,
      width:'35px',
      height:'13px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
      
      // color:'red'
    }

    // popOutText: {

    //     '&:hover': {
    //         cursor: 'pointer',
    //         color: theme.palette.text.primary,
    //     },
    //     alignItems: 'center',
    //     position: 'absolute',
    //     fontSize: 10,
    //     color: theme.palette.text.secondary,
    //     maxWidth: '100%',
    //     maxHeight: '100%',
    //     marginLeft:"-10px",
    //     marginTop:"5px",
    //     fill: theme.palette.text.secondary

    // },

    
  })
);
