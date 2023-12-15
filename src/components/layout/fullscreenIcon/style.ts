import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    divFullscreen :{
        
        position : 'fixed',
        top : 0,
        right : 0,
        width: 54,
        height: 54,
        backgroundColor:theme.palette.background.default,
        borderRadius: 50,
        fill:theme.palette.text.primary,
        zIndex:50000
     }
}));
