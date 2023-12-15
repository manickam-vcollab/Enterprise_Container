
import { makeStyles } from '@material-ui/core/styles';


const useStylesDark = makeStyles((theme) => ({
  container:{
    position:'fixed',
    padding:'0px 10px 20px' ,
    marginTop:'0px',
    height:'80%',
    background:'transparant',
    display:'flex',
    flexDirection:'column',
    width:'300px',
    fontSize:'1rem',
    zIndex:9999
  },
  // custom_button_group:{
  //   display: 'flex',
  //   justifyContent:'center',
  //   //color: 'white',
  //   marginBottom:'800px'
  // },
  button:{
    marginTop:'auto',
    color:'#8C8BFF',
    borderRadius:'5px'
  },
  backIcon : {
    width : 48,
    height: 48,
},

heading: {
    justifySelf: 'start',
    width: '100%',
},
  divp:{
    textAlign:'left',
    marginLeft:'-5px',
    marginBottom:'5px',
    fontSize:'1rem',

  },
  divb:{
    marginTop:"20px",
    marginBottom:"20px"
  },
  divpp:{
    marginTop: 10,
    textAlign:"center",
     color:"#e4687e"
  },
  bodyHeading :{

    fontSize:theme.typography.body1.fontSize,
    fontWeight:theme.typography.body1.fontWeight,
    lineHeight:theme.typography.body1.lineHeight,
    color:theme.palette.text.secondary
  },
  bodyContent :{

    fontSize:theme.typography.body2.fontSize,
    fontWeight:theme.typography.body2.fontWeight,
    lineHeight:theme.typography.body2.lineHeight,
    color:theme.palette.text.secondary
  }
}
));

export  { useStylesDark };

  
