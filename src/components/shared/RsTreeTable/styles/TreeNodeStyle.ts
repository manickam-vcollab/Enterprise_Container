import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => (
    createStyles({
        actionShow: {
            color: theme.palette.text.primary
        },
        actionHide: {
            color: theme.palette.text.disabled
        },
        hightlight: {
            padding: theme.spacing(0.5),
            background: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.light,
        },
        hideText: {
            background: theme.palette.background.default,
            [theme.breakpoints.down("sm")]: {
              backgroundColor: theme.palette.background.default,
            },
        },

        selectedHideText:{
            background: theme.palette.primary.main
        }
    })
));

export   const useCustomStyles = makeStyles<Theme>((theme) => ({
    root: {
      // Some CSS
      border:'none',
      color:theme.palette.action.active,

      '&:hover':{
        // border:'none',
        // backgroundColor: 'transparent !important',
        borderRadius: "4px"
      },
      '&.Mui-selected':{
        backgroundColor: `${theme.palette.action.selected} !important`,
        // color: `${theme.palette.action.selected} !important`,
        // backgroundColor:"transparent !important",
        borderRadius: "4px",
      },
      '&.MuiToggleButton-root':{
        // marginLeft:'10px',
        marginTop:'5px',
        padding: "3px !important",
        // border:'none',
        color:theme.palette.action.active,
      },
      '&.MuiIconButton-root':{
        marginTop: '5px',
        padding: '3px',         
      }
    },
    icon: {
      height:"20px",
      width:"20px"
    },
    editIcon:{
      '&:hover':{
        borderRadius: "50% !important"
      }
    }
  }))