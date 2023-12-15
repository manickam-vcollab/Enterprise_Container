import { PaletteType } from '@material-ui/core';
import appTheme from './index';
import {  createMuiTheme } from '@material-ui/core/styles';
const { palette } = createMuiTheme();

const lightMode = {
    ...appTheme,
    palette: {
      type: 'light' as PaletteType,
      primary: {
        main: "#0078D4",
      },
       
      secondary:{
        main: '#979797',
      },
  
      error:{
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff'
  
      },
      warning:{
  
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00'
  
      },
      info:{
  
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00'
  
      },
      success:{
  
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c'
  
      },
  
      text:{
  
        primary: 'rgba(0, 0, 0, .89)',
        secondary: 'rgba(0, 0, 0, .62)',
        disabled: 'rgba(0, 0, 0, .36)',
        //hint: 'rgba(255, 255, 255, 0.5)',
        //icon: 'rgba(255, 255, 255, 0.78)'
  
      },

      accent:{
        primary:'#0078D4',
        secondary: '#005fb8e6',
        primaryText:'#ffffff',
        secondaryText:'rgba(255,255,255,0.7)'
      },
   
      divider:'rgba(0, 0, 0, 0.14)',
  
      background:{
  
        paper: '#ffffff',
        default:'rgba(255, 255, 255, 0.78)'
      },
  
      action:{
  
        active: 'rgba(0, 0, 0, .62)',
        hover: 'rgba(0, 0, 0, 0.1)',
        selected: '#0078D4'
      },
  
  
      scrollbar: palette.augmentColor({
        main:"#000000"
      }),
  
      indicatorColor: palette.augmentColor({
        main:'#0078D4'
      }) ,
    },
} 

export default lightMode;