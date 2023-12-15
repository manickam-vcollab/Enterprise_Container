import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth, leftbarWidth } from '../../../config';

export default makeStyles((theme) => ({
  
    appBar: {
        boxShadow: 'none',
        width: `calc(100% - ${leftbarWidth}px)`,
        marginLeft: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeIn,
            duration: 0,
        }),
        backgroundColor: theme.palette.background.default,
       
    },

    appBarwithSideBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth + leftbarWidth}px)`,
            //marginLeft: drawerWidth,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: 250,
        }),
    },

    toolBar: {
        minHeight: topbarHeight,
        height: topbarHeight,
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0px',
        paddingRight: '0px',
        position: 'relative',
    },

    toolBarLeftContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
        margin: 'auto',

    },

    toolBarRightContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px 0px 3px 15px',
        marginRight: '3px',
    },

    leftAlign: {
        position: 'absolute',
        width: 90,
        left:"12px",
        margin: 25,
        display: 'flex',
        justifyContent: 'space-between'

    },

    divIcon: {
        '&:hover $hoverEffect': {
            fill: theme.palette.text.primary,
        },
        fill: theme.palette.text.secondary,
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '100%',
        padding: 9,
        marginBottom: 12,
    },

    leftTitle: {

        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        '&:hover': {
            color: theme.palette.text.primary,
        },
    },

    leftTitleHidden: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },

    hamburgerIcon: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    
    hamburgerIconHidden: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },

    icontext: {
        '&:hover': {
            color: theme.palette.text.primary,
            cursor: "pointer"

        },
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        left: 3,

        fontSize: 10,
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: 22,

        '&:hover .divIconfs': {
            cursor: 'pointer',
        },

    },

    divIconfs: {

        '&:hover svg': {
            color:  theme.palette.text.primary,
            cursor: "pointer"
        },
        color: theme.palette.text.secondary,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: '100%',
        marginRight: 17,
        marginBottom: 10,
        position: 'relative'
    },
    logOuticon :{

        '&:hover svg': {
            color:  theme.palette.text.primary,
            cursor: "pointer"
        },
        color: theme.palette.text.secondary,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: '100%',
        marginRight: 25,
        marginBottom: 10,
        marginTop:5,
        position: 'relative'

    },
    icontextLogout: {

        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.text.primary,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        fontSize: 10,
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: 25,
        right: 0,

    },

    popOutText: {

        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.text.primary,
        },
        alignItems: 'center',
        position: 'absolute',
        fontSize: 10,
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        maxHeight: '100%',
        marginLeft:"-10px",
        marginTop:"5px",
        fill: theme.palette.text.secondary

    },

    icontextfs: {

        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.text.primary,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        fontSize: 10,
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: 28,
        right: 0,

    },

    icontextfsexit: {
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.text.primary,

        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        fontSize: 10,
        color:theme.palette.text.secondary,
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: 28,
        marginLeft: 6,
    },
    hoverEffect: {
       //fill: theme.palette.text.secondary,
       //color:theme.palette.text.secondary,
        cursor: 'pointer',
        '&:hover': {
            cursor: 'pointer',
            //fill: theme.palette.text.primary,
           // color:theme.palette.text.primary
    },

    },

    iconColor:{

        fill:theme.palette.text.secondary,
    },

    fullscreencolor: {
        fill: theme.palette.text.secondary,
        '&:hover': {
            cursor: 'pointer',
            fill: theme.palette.text.primary,
        },


    },
    toggleButton :{
        marginTop:'-10px',

    },

    toggleSelected: {
        "&&": {
          backgroundColor: "transparent",
        },
      }}));
