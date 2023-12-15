import { makeStyles } from "@material-ui/core/styles";
import appTheme from "../../../theme/index";

export default makeStyles((theme) => ({
  DialogTitle: {
    fontSize: appTheme.typography.body1.fontSize,
    fontWeight: appTheme.typography.body1.fontWeight,
    lineHeight: "28px",
    width: "250px",
    height: "28px",
    padding: 0,
  },

  IconButton: {
    "&:hover": {
      background: "#0078d4",
    },
    color: "#fff",
    backgroundColor: "#0078d4",
    width: "28px",
    height: "28px",
    borderRadius: 2,
    position: "absolute",
    right: 30,
    top: 30,
  },

  DialogContextText: {
    color: theme.palette.text.secondary,
    padding: "10px 0px 0px 0px",
    textAlign: "justify",
    fontSize: appTheme.typography.body2.fontSize,
  },

  DialogButton: {
    "&:hover": {
      background: "#0078d4",
    },
    width: "104px",
    height: "30px",
    backgroundColor: "#0078d4",
    color: "#fff",
    textTransform: "none",
    borderRadius: "5px",
    margin: "0 auto",
    display: "flex",
  },
}));
