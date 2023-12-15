import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 5,
      color: theme.palette.text.secondary,
      backgroundColor: "transparent",
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
      color:theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: "transparent",
        border: theme.palette.background.default,
        color:theme.palette.text.primary,
      },
    },
    icons: {
      color: theme.palette.text.primary,
      "&:hover": {
        color: theme.palette.background.default,
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
    }
  })
);
