import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    sideBarBody :{
    //backgroundColor: 'blue',
    width : '100%',
    height: 'auto',
    minHeight: '100% !important',
    overflowY:'auto',
    //color: 'white',
    textAlign: 'left',
    //paddingTop: "15px",
    marginTop:0,

    overflowX: 'hidden',
    scrollbarColor: theme.palette.scrollbar.main,
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
    width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    marginTop:'100px',
    marginBottom:'100px'
    },
    '&::-webkit-scrollbar-thumb': {
    borderRadius:'20px',
    backgroundColor: theme.palette.scrollbar.main,

    },


    },
  
}));