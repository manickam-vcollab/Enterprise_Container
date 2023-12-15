import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { ToolBarAllType } from "store/sideBar/ToolBar/shared/types";

// import { LabelAllType ,Label3DType, LabelChartType ,LabelType} from '../../../../store/sideBar/labelSliceNew/shared/types';
import { makeStyles } from "@material-ui/core/styles";

import { useAppSelector, useAppDispatch } from "store/storeHooks";
//import {setDropdownSelectedIndex , selectDropdownItemIndex} from 'store/sideBar/labelSlice/AllLabelSlice';
import {
  setSelectedToolBarType,
  selectedToolBarType,
} from "store/sideBar/ToolBar/toolBarSlice";
// import {setSelectedAnimationType , selectedAnimationType} from 'store/sideBar/AnimationSlice/AllAnimationSlice';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    width: "95%",
    height: "40px",
    boxShadow:"none"
  },
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

  buttton: {
    width: "95%",
    borderRightColor: "transparent",
    lineHeight: "5px",
    textTransform: "none",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.accent.primary,
    color: theme.palette.accent.primaryText,
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
    "&:hover": {
      backgroundColor: theme.palette.accent.secondary,
      // color: theme.palette.text.primary,
    },
  },
  divIcon: {
    display: "inherit",
    alignItems: "inherit",
    justifyContent: "inherit",
    marginLeft: "-10px",
  },
  divider: {
    position: "absolute",
    right: "0",
    height: "80%",
    border: "1px solid",
    borderLeftColor: theme.palette.accent.primaryText,
  },
  dropdownButton: {
    width: "10%",
    marginLeft: "-1px",
    backgroundColor: theme.palette.accent.primary,
    color: theme.palette.accent.primaryText,
    "&:hover": {
      backgroundColor: theme.palette.accent.secondary,
      // color: theme.palette.text.primary,
    },
  },
  dropdownPaper: {
    width: "95%",
    marginTop: "10px",
    zIndex: 99999999,
    //backgroundColor:theme.palette.background.paper
  },
  menuItem: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
    "&:hover svg": {
      color: theme.palette.text.primary,
    },
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  listItemIcon: {
    minWidth: "35px",
    color: theme.palette.text.secondary,
  },
}));

interface DropdownButton {
  onHandleLabelAdd: (label: string, event: any) => void;
}

const options = [
  { id: ToolBarAllType.TOOLBAR, type: ToolBarAllType.TOOLBAR },
  //   {id:AnimationAllType.EIGEN,Animation:'Eigen Vector',icon:<LinearIcon fontSize="small"/>,type:AnimationAllType.EIGEN},
  // {id:AnimationAllType.TRANSIENT,Animation:'Transient',icon:<TransientIcon fontSize="small"/>,type:AnimationAllType.TRANSIENT},
  // {id:AnimationAllType.VIEWPOINT,Animation:'View Point',icon:<ViewPointIcon fontSize="small"/>,type:AnimationAllType.VIEWPOINT},
];

export default function ToolBarButton(props: DropdownButton) {
  const { onHandleLabelAdd } = props;

  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const selectedIndex = useAppSelector(selectedToolBarType);
  //const [selectedIndex, setSelectedIndex] = React.useState(currentID);

  const classes = useStyles();

  const handleMenuItemClick = (event, index: number) => {
    //setSelectedIndex(index);
    dispatch(setSelectedToolBarType(index));
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <ButtonGroup
        className={classes.buttonGroup}
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          className={classes.Muibtn}
          style={{width:'100%',height:'35px', borderRadius: "10px"}}
          onClick={(event) =>
            onHandleLabelAdd(options[selectedIndex].id, event)
          }
        >
          {/* <div className={classes.divIcon}>{options[selectedIndex].icon}</div> */}
          <div style={{ marginLeft: "10px" }}>{"Add ToolBar"}</div>
          {/* <div className={classes.divider}></div> */}
        </Button>
      </ButtonGroup>
    </div>
  );
}
