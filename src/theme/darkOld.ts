
import { PaletteType } from '@material-ui/core';
import appTheme from './index';
import {  createMuiTheme } from '@material-ui/core/styles';
const { palette } = createMuiTheme();

const darkMode = {

  ...appTheme,

  palette: {

    common:{
      black: '#000',
      white: '#fff'

    },

    type: 'dark' as PaletteType,

    primary: {
      main: "#0078D4",
    },
     
    secondary:{
      main: 'rgba(255, 255, 255, 0.78)',
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

      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 0.78)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      //hint: 'rgba(255, 255, 255, 0.5)',
      //icon: 'rgba(255, 255, 255, 0.78)'

    },

    
    divider:'rgba(255, 255, 255, 0.14)',

    background:{

      paper: '#424242',
      default:'#303030'
    },

    action:{

      active: '#fff',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: "#4882c9"
    },


    scrollbar: palette.augmentColor({
      main:"#FFFFFF"
    }),

    indicatorColor: palette.augmentColor({
      main : "rgba(96, 205, 255, 1)"
    }) ,
  },
} 

export default darkMode; 



