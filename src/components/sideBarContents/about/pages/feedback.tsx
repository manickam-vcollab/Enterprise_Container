import React from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import vcollablogo from '../../../../assets/images/loginVCollabLogo.png'

const selectionStyle = makeStyles((theme: any) => ({
    bodyContent: {
        padding:"20px 250px 20px",
        overflow: "auto",
        maxHeight: "calc(100vh)",
        
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body2.fontWeight,
      lineHeight: theme.typography.body2.lineHeight,
      color: theme.palette.text.primary,
      textAlign:"justify",
      
  
    },
    navbar:{
height: "150px",
position:"sticky",
boxShadow: "0 0 2px 2px #c6c9cf",
width: "100%",
padding: 10,

    },
    title: {
        position: "absolute",
      
        top: 15,
        bottom: 0,
      right:150,
        margin: "auto 0 ",
        display:"inline-block",
    
        marginTop:50
      } ,
      container: {
        position: "absolute",
        width: "1000px",
        height:"500px",
        top: 150,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
       borderRadius:"15px",
      //  border: "0.5px solid #383837",
       background:"#fff"
      },
      textareaStyling:{
        position: "absolute",
        width: "750px",
        height:"250px",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        background: "white",
        resize:"none",
        overflow:"auto",
        border: "0.5px solid #383837",
        borderRadius:"15px",
        padding:25,
        fontSize:20,
        color:"black",
        "&:focus": {
            outline: "none !important",
            
            boxShadow: "0 0 25px lightGray"
        }
      
        

      },
      heading:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:25,
        color:"#1f1f1f"

      },
      bottomText:{
        position: "absolute",
        width: "745px",
        height:"250px",
        top: 510,
        bottom: 0,
        left: 20,
        right: 0,
        margin: "auto",
        color:"black"
      },
      titleText:{
        position: "absolute",
        width: "750px",
        height:"250px",
         top: 30,
        bottom: 0,
        left: 125,
        right: 0,
        color:"#1a1a15",
        fontWeight:600,
        fontSize:22
      },
      topText:{
        position: "absolute",
        width: "750px",
        height:"250px",
         top: 100,
        bottom: 0,
        left: 130,
        right: 0,
        color:"#1a1a15"
      },
      button1:{
        position: "absolute",
        width: "85px",
        height:"25px",
        border: "1px solid black",
        borderRadius:"5px",
         top: 550,
        bottom: 0,
        left: 450,
        right: 0,
        margin:" auto",
           
        color:"black",
        background:"transparent",
        "&:hover": {
        background:"#d52b1d",
        color:"white",
        border: "none",
        cursor:"pointer"
        }
      
      
      },
      button2:{
        position: "absolute",
        width: "85px",
        height:"25px",
        border: "1px solid black",
        borderRadius:"5px",
         top: 550,
        bottom: 0,
        left: 655,
        right: 0,
        margin:" auto",
        
        color:"black",
        background:"transparent",
        "&:hover": {
        background:"#d52b1d",
        color:"white",
        border: "none",
        cursor:"pointer"
        }
      
      
      }
     
     
}))

const Feedback = () => {
    const containerClasses=selectionStyle();
  return (
  
<><div><div className={containerClasses.navbar}>

<div className={containerClasses.title}>
<img src={vcollablogo}  style={{}} alt="" />
</div>
<div className={containerClasses.heading}>
    <h1>Feedback</h1>

</div>
</div>
<div className={containerClasses.container}>
    <span className={containerClasses.titleText}>Give feedback to VCollab</span>
    <span className={containerClasses.topText}>Summarize your feedback</span>
<textarea name="" id=""  className={containerClasses.textareaStyling} ></textarea>
<span className={containerClasses.bottomText}>By pressing Send to VCollab, your feedback will be used to improve Vcollab products and services. Your IT admin will be able to collect this data.&nbsp;<Link to="/about/privacy" style={{color:"#d52b1d"}}>Privacy Statement.</Link></span>
    </div> 
<button className={containerClasses.button1}>
    Cancel
</button>
<button className={containerClasses.button2}>
    Send
</button>

 </div> 
</>

   
  )
}

export default Feedback