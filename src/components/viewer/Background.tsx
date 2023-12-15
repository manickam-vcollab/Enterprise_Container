import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import {selectBackgroundcolor,selectBackgrMode,selectBackgroundImage} from '../../store/sideBar/sceneSlice';
import {BackgroundMode} from 'store/defaultSlice';
import {useAppSelector} from '../../store/storeHooks'
import {hexToRgb} from '../utils/colorConvertion';

const useStyles = makeStyles((theme) => (
{
    root: (props:any) => ({
        position:'absolute', 
        backgroundImage: 'linear-gradient(to bottom,' + props.colorString+')', 
        width:'100%',
        height:'100%'
    }),

    rootOne: (props:any) => ({
        position:'absolute', 
        backgroundColor: props.colorString,
        width:'100%',
        height:'100%'
    })
}))

function Background(props:any) {
    //const isImageActive = useAppSelector(selectIsImageActive);
    const backgroundMode = useAppSelector(selectBackgrMode);
    const colors = useAppSelector(selectBackgroundcolor);
    const file = useAppSelector(selectBackgroundImage);
    const [colorString, setColorString] = useState('');
    const classes = useStyles({colorString});
    
    useEffect(() => {
        let s = '';
            colors.forEach((e,i) => {
                if(i === colors.length -1) {
                    s += hexToRgb(e)
                    
                }
                else
                s += `${hexToRgb(e)}, `
                
            });
        setColorString(s);
    },[colors])
        
    return (
        backgroundMode === BackgroundMode.IMAGE ?
        <img src={file} style={{position:'absolute', width:'100%', height:'100%'}}>
        </img>
        :
        // <div className={classes.rootOne}>
        <div >{
            colors.length > 1?
            <div className={classes.root}>
                </div>
        :<div className={classes.rootOne}>
        </div>
        }
        </div>
    )
}

export default Background
