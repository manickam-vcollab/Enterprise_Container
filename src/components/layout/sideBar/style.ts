import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, leftbarWidth } from '../../../config';

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      opacity:0.8,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.background.default,
    },
    overflowX: "hidden",
    overflowY: "hidden",
  },
  anchorLeft: {
    inset: 'unset',
    left: `${leftbarWidth}px !important`,
    right: 'auto',
  
  },
  iconTextColor:{

    color:theme.palette.text.secondary,
    '&:hover svg': {

        color:theme.palette.text.primary
    }
  },
  bodyContent:{

    fontSize:theme.typography.body2.fontSize,
    fontWeight:theme.typography.body2.fontWeight,
    lineHeight:theme.typography.body2.lineHeight,
    color:theme.palette.text.secondary,
    '&:hover':{
      cursor:'pointer',
      color: theme.palette.text.primary,
      opacity: 1
  
  }
  }
}));
