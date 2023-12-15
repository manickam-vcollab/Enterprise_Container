import makeStyles from '@material-ui/styles/makeStyles'

const globalThemes = makeStyles<Theme>((theme:any) => ({
    Muibtn: {
        backgroundColor: theme.palette.accent.primary,
        color: theme.palette.accent.primaryText,
        // width: "100%",
        fontSize: "14px",
        borderRadius: "4px",
        height: "30px",
        // paddingRight: "10px",
        margin: 0,
        lineHeight: "16px",
        fontWeight: 500,
        textTransform:'none',
        "&:hover": {
          backgroundColor: theme.palette.accent.secondary,
          color: theme.palette.accent.primaryText,
        }
    },
    BtnOutlined:{
      // backgroundColor: theme.palette.accent.primary,
      border:`1px solid ${theme.palette.accent.primary}`,
      color: theme.palette.accent.primary,
      // width: "100%",
      fontSize: "14px",
      borderRadius: "4px",
      height: "30px",
      // paddingRight: "10px",
      margin: 0,
      lineHeight: "16px",
      fontWeight: 500,
      textTransform:'none',
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      //   color: theme.palette.accent.primaryText,
      }
    },
    iconStyle:{
        color:theme.palette.text.primary,
        '&.Mui-selected':{
            color:`${theme.palette.accent.primaryText} !important`,
        },
        "&:hover": {
            backgroundColor: "transparent",
            border: theme.palette.background.default,
        },
    },
    selected:{
        '&.Mui-selected':{
            color:theme.palette.accent.primaryText,
            backgroundColor:theme.palette.accent.primary,
        }
    }
}))

export default globalThemes