import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '../../../../icons/arrowDropDown';
import ArrowDropUpIcon from '../../../../icons/arrowDropDown';
import LinearIcon from '../../../../icons/linear';
import TransientIcon from '../../../../icons/transient';
import ViewPointIcon from '../../../../icons/viewPoint';


import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { AnimationAllType } from 'store/sideBar/AnimationSlice/shared/types';
// import { LabelAllType ,Label3DType, LabelChartType ,LabelType} from '../../../../store/sideBar/labelSliceNew/shared/types';
import { makeStyles } from '@material-ui/core/styles';


import { useAppSelector, useAppDispatch} from 'store/storeHooks';
//import {setDropdownSelectedIndex , selectDropdownItemIndex} from 'store/sideBar/labelSlice/AllLabelSlice';
import {setSelectedAnimationType , selectedAnimationType} from 'store/sideBar/AnimationSlice/AllAnimationSlice';


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
      // color: theme.palette.text.primary,
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
    borderLeftColor:theme.palette.accent.primaryText,
  },
  dropdownButton:{
    width:'10%',
    marginLeft:'-1px',
    backgroundColor:theme.palette.accent.primary,
    color:theme.palette.accent.primaryText,
    '&:hover': {
      backgroundColor:theme.palette.accent.secondary,
      // color: theme.palette.text.primary,
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
  {id:AnimationAllType.LINEAR,Animation:'Linear',icon:<LinearIcon fontSize="small"/>,type:AnimationAllType.LINEAR},
  {id:AnimationAllType.EIGEN,Animation:'Eigen Vector',icon:<LinearIcon fontSize="small"/>,type:AnimationAllType.EIGEN},
  // {id:AnimationAllType.TRANSIENT,Animation:'Transient',icon:<TransientIcon fontSize="small"/>,type:AnimationAllType.TRANSIENT},
  // {id:AnimationAllType.VIEWPOINT,Animation:'View Point',icon:<ViewPointIcon fontSize="small"/>,type:AnimationAllType.VIEWPOINT},
 ]


export default function  DropdownButton(props:DropdownButton) {

  const {onHandleLabelAdd } = props;

  const dispatch = useAppDispatch(); 
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const selectedIndex = useAppSelector(selectedAnimationType);
  //const [selectedIndex, setSelectedIndex] = React.useState(currentID);

  const classes = useStyles();



  const handleMenuItemClick = (event, index:number) => {
    //setSelectedIndex(index);
    dispatch(setSelectedAnimationType(index));
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
            <div style={{marginLeft:'10px'}}>{'Add'+'   '+options[selectedIndex].Animation}</div>
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
                        key={option.Animation}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        classes={{root:classes.menuItem}}
                        
                      
                      >
                        <ListItemIcon classes={{root:classes.listItemIcon}}>
                          {option.icon}
                        </ListItemIcon>
                        {option.Animation}
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
