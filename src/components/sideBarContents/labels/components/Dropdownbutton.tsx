import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import ArrowDropDownIcon from '../../../icons/arrowDropDown';
import ArrowDropUpIcon from '../../../icons/arrowDropUp';
import AddnotesIcon from '../../../icons/labelNotes';
import PointLabelIcon from '../../../icons/pointLabel';
import FaceLabelIcon from '../../../icons/faceLabel';
import PointToPointLabelIcon from '../../../icons/pointToPointLabel';
import LabelArcPointIcon from '../../../icons/labelArcPoint';
import XYPlotsIcon from '../../../icons/xyplots';


import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import { LabelAllType ,Label3DType, LabelChartType ,LabelType} from '../../../../store/sideBar/labelSlice/shared/types';
import { makeStyles } from '@material-ui/core/styles';


import { useAppSelector, useAppDispatch} from 'store/storeHooks';
import {setDropdownSelectedIndex , selectDropdownItemIndex} from 'store/sideBar/labelSlice/AllLabelSlice';


const useStyles = makeStyles(theme => ({

  buttonGroup:{
    width:'95%',
    height:'40px'
  },
  
  buttton:{
    width:'95%',
    borderRightColor:'transparent',
    lineHeight:'5px',
    textTransform:'none',
    justifyContent: "flex-start",
    backgroundColor:theme.palette.accent.primary,
    color:theme.palette.accent.primaryText,
    fontSize:theme.typography.body2.fontSize,
    fontFamily:theme.typography.fontFamily,
    '&:hover': {
      backgroundColor:theme.palette.accent.secondary,
      color: theme.palette.accent.primaryText,
    }

  },
  divIcon:{
    display:'inherit',
    alignItems:'inherit',
    justifyContent:'inherit',
    marginLeft:'-10px'

  } ,
  divider:{
    position:'absolute',
    right:'0',
    height:'80%',
    border:'1px solid',
    // borderLeftColor:theme.palette.text.secondary
  },
  dropdownButton:{
    width:'10%',
    marginLeft:'-1px',
    backgroundColor:theme.palette.accent.primary,
    color:theme.palette.accent.primaryText,
    '&:hover': {
      backgroundColor:theme.palette.accent.secondary,
      color: theme.palette.accent.primaryText,
    }

  },
  dropdownPaper:{
    width:'95%',
    marginTop:'10px',
    zIndex:99999999
    //backgroundColor:theme.palette.background.paper
  },
  menuItem:{
    color:theme.palette.text.secondary,
    fontSize:theme.typography.body2.fontSize,
    fontFamily:theme.typography.fontFamily,
    '&:hover svg': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      color: theme.palette.text.primary,
  }
  },
  listItemIcon:{
    minWidth:'35px',
    color:theme.palette.text.secondary,

  }

}))


interface DropdownButton {

onHandleLabelAdd:(label:string,event:any)=>void;


}

const options = [
  {id:LabelAllType.LABEL2D,label:'Notes',icon:<AddnotesIcon fontSize="small"/>,type:LabelAllType.LABEL2D},
  {id:Label3DType.PROBE,label:'Point Label',icon:<PointLabelIcon fontSize="small"/>,type:LabelAllType.POINTLABEL},
  // {id:Label3DType.FACE,label:'Face Label',icon:<FaceLabelIcon fontSize="small"/>,type:LabelAllType.FACELABEL},
  {id:Label3DType.DISTANCE,label:'Point to Point',icon:<PointToPointLabelIcon fontSize="small"/>,type:LabelAllType.POINTTOPOINTLABEL},
  {id:Label3DType.ARC,label:'3 Point Arc length',icon:<LabelArcPointIcon fontSize="small"/>,type:LabelAllType.ARCLABEL},
  {id:LabelChartType.LINECHART,label:'2D Plots',icon:<XYPlotsIcon fontSize="small"/>,type:LabelAllType.LABELCHART},
  //{id:LabelChartType.LINECHART3D,label:'3D Plots',icon:<XYPlotsIcon fontSize="small"/>,type:LabelAllType.LABELCHART},
]


export default function  DropdownButton(props:DropdownButton) {

  const {onHandleLabelAdd } = props;

  const dispatch = useAppDispatch(); 
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const selectedIndex = useAppSelector(selectDropdownItemIndex);
  //const [selectedIndex, setSelectedIndex] = React.useState(currentID);

  const classes = useStyles();



  const handleMenuItemClick = (event, index:number) => {
    //setSelectedIndex(index);
    dispatch(setDropdownSelectedIndex(index));
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
        <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button  className={classes.buttton} onClick={(event)=>onHandleLabelAdd(options[selectedIndex].id,event)}>
            <div className={classes.divIcon}>{options[selectedIndex].icon}</div>
            <div style={{marginLeft:'10px'}}>{options[selectedIndex].label === 'Notes'?'Add 2D'+'   '+options[selectedIndex].label:'Add'+'   '+options[selectedIndex].label}</div>
            <div className={classes.divider}></div>
          </Button>
          <Button
            color="primary"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            className={classes.dropdownButton}
          >

           {open ? <ArrowDropUpIcon/> :<ArrowDropDownIcon />}
          </Button>
        </ButtonGroup>
        <Popper className={classes.dropdownPaper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper style={{width:'100%'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" >
                    {options.map((option, index) => (
                      <MenuItem
                        key={option.label}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        classes={{root:classes.menuItem}}
                        
                      
                      >
                        <ListItemIcon classes={{root:classes.listItemIcon}}>
                          {option.icon}
                        </ListItemIcon>
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
  );
}
