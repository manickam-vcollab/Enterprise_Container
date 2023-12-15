import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    'lds-ring' : {
        display: 'inline-block',
        position: 'relative',
        width: '60px',
        height: '60px',
        '& div' : {
            boxSizing:'border-box',
            display:'block',
            position: 'absolute',
            width: '44px',
            height: '44px',
            margin: '8px',
            border: '4px solid #cef',
            borderRadius: '50%',
            animation: 'lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
            borderColor: '#cef transparent transparent transparent'
          },
          '& div:nth-child(1)':{
            animationDelay:'-0.45s'
          },
          '& div:nth-child(2)':{
            animationDelay:'-0.3s'
          },
          '& div:nth-child(3)': {
            animationDelay:'-0.15s'
          },
          '@keyframes &': {
            '0%': {
               transform: 'rotate(0deg)'
             },
             '100%': {
               transform: 'rotate(360deg)'
             }
           }
    },

}));
