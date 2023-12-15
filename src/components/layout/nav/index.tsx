import React, { useState,useRef,useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import LeftArrowIcon from '@material-ui/icons/ChevronLeft'
import RightArrowIcon from '@material-ui/icons/ChevronRight'
import { topbarHeight } from 'config'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'
import useContainer from 'customHooks/useContainer'
import { useAppDispatch,useAppSelector } from 'store/storeHooks'

import { setNavheight } from 'store/mainMenuSlice'

import clsx from 'clsx';

const useStyles = makeStyles( theme => {
    return {
        root: {
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.background.default}`
        },
        icon: {
            height: '100%',
            color: theme.palette.text.secondary,
        },
        iconHover: {
            '& :hover':{
                color: theme.palette.text.primary
            }
        },
        disabled: {
            color: theme.palette.text.disabled + '!important'
        }

    }
})

function Nav() {
    const history = useHistory();
    const dispatch=useAppDispatch();
    const fscreenheightRef = useRef(null);
    const [fscreenwidth, fscreenheight] = useContainer(fscreenheightRef,[]);
    const [isLeftArrowEnabled, setIsLeftArrowEnabled] = useState(true);
    const [isRightArrowEnabled, setIsRightArrowEnabled] = useState(true);


    useEffect(()=>{
 dispatch(setNavheight(fscreenheight))
  
   
        
    },[fscreenheight])

    const classes = useStyles({
        isLeftArrowEnabled,
        isRightArrowEnabled
    });

    const handleNavBack = () => {
        
        history.goBack();

      }
    
      const handleNavForward = () => {

        history.goForward();

        }
    
    
  return (
    <Grid container className={classes.root} style={{width:'100%', height: topbarHeight + 'px'}}>
        <Grid  ref={fscreenheightRef}  item xs className={clsx({
            [classes.iconHover]:isLeftArrowEnabled, 
           })} alignItems='center' alignContent='center' onClick={handleNavBack}>
        <LeftArrowIcon fontSize='large'  className={
            clsx({[classes.icon]:true,[classes.disabled]:!isLeftArrowEnabled})}/>
        </Grid>
        <Grid item xs className={clsx({
            [classes.iconHover]:isRightArrowEnabled, 
           })} alignItems='center' onClick={handleNavForward}>
        <RightArrowIcon fontSize='large' 
        className={clsx({[classes.icon]:true,[classes.disabled]:!isLeftArrowEnabled})}/>
        </Grid>
    </Grid>
  )
}

export default Nav