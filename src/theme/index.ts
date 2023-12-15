export const appTheme = {
  overrides: {
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        '&:before': { 
          backgroundColor: 'none'
        }
      }
    }
  },  
  palette:{
    type:'dark'
  },
  
  typography: {

    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),

   h1: {
      fontWeight: 300,
      fontSize: '96px',
      lineHeight: 112.5/16,

    },
    h2: {
      fontWeight: 300,
      fontSize: '60px',
      lineHeight: 70.31/16,
    },
    h3: {
      fontWeight: 400,
      fontSize: '48px',
      lineHeight: 56.25/16,
    },
     h4: {
      fontWeight: 400,
      fontSize: '34px',
      lineHeight: 39.84/16,
    },

    h5: {
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: 28.13/16,
    },
    h6:{

      fontWeight: 500,
      fontSize: '20px',
      lineHeight: 28/16,
    },

    subtitle1:{
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 24/16,
    },
    subtitle2:{
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: 24/16,
    },

// sidebar heading 
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 24/16,
    },

// sidebar content    
    body2: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 20/16,
    },
    button:{
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: 16.41/16,
    },
    caption:{
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 16/16,
    },

// icon with text
    overline:{
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: 12/16,
    }

  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default appTheme;
