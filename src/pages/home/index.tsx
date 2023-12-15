import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {goBack, push} from 'connected-react-router/immutable';

import Logout from '../../../src/components/icons/logout';
import {Routes} from '../../routes/index'; 

import { useAppSelector , useAppDispatch} from '../../store/storeHooks';
import { selectCurrentUser, setCurrentUser } from '../../store/appSlice';
import {setSelectedModel,setSelectedReport,setReportType,reportType,setNewReportName} from '../../store/appSlice';

import jsonData from "./data.json";

const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
    backgroundColor:theme.palette.background.paper,
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  header:{
   height:'40px',
  },
  tabs:{
    float:'left',
    width:"90%"
  },
  logOut:{
    float:'right',
    position:'relative',
    marginRight:'10px',
    top:"20%",
    cursor:'pointer',
    '&:hover svg': {
      color: theme.palette.text.primary,
    },
  
  },
  logOutText:{
    position:'relative',
    top:'10px',
    fontSize:'10px',
    right:'28px',
    color:theme.palette.text.secondary,
    fill: theme.palette.text.primary,
    '&:hover': {
      fill: theme.palette.text.secondary,
    },


  },
  tableCard:{
    marginTop:'5px',
    position:'relative',
    width:'98%',
    height:'80%',
    margin:'0 auto',
    border:'2px solid'+" "+theme.palette.divider,

  },
  hintMessage :{
  marginTop:'10px',
   fontSize:'12px',
   marginLeft:'15px'
  },
  title:{
    marginTop:'22px',
    marginLeft:'15px',
    fontSize:'20px'
  },
  composeTitle:{
    marginLeft:'15px',
    fontSize:'20px'
  },
  overrideTabs:{
    borderBottom:'1px solid'+" "+theme.palette.divider,
  },
  horizontalLine:{
   border:'1px solid'+" "+theme.palette.divider
  },
  footerOuterDiv:{
     display:'flex',
     float:'right'
  },
  footerInnerDiv:{
    textAlign:'center',
    margin:'auto 15px',
    top:'10px'
  },
  footerInputLabel:{
    position:'relative',
    top:'20px',
    right:'10px'
  },
  inputBox:{
    position:'relative',
    top:'10px',
  }
}));

export default function ReportsDashboard(props : any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [listData , setListData] = React.useState(jsonData.report.rows);
  const [reportSelectedIndex, setSelectedReportIndex] = React.useState(null);
  const [modelSelectedIndex, setSelectedModelIndex] = React.useState(null);
  const [editReportName,setEditReportName] = React.useState(null);
  const [isReportNameEdit , setReportNameEdit] = React.useState(false);
  const dispatch = useAppDispatch();  
  const currentUser = useAppSelector(selectCurrentUser);
  const [cookies, setCookie,removeCookie] = useCookies(['auth']);

  useEffect(()=>{

    if(currentUser)
    dispatch(push(Routes.HOME))
  
    if(cookies.auth){
      dispatch(setCurrentUser(cookies.auth));
      dispatch(push(Routes.HOME))
    } else {
      dispatch(push(Routes.LOGIN))
    }

  },[])

  let selectedReport:any= {};
  let selectedModel:any = {};

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);

    if(newValue === 0) {
      setListData(jsonData.report.rows);

    }
    if(newValue === 1) {
      setListData(jsonData.models.rows);
      
    
    }
  };

  const onHandleEditName = (event:any) => {
    setReportNameEdit(true);
    setEditReportName(event.target.value);
  };

  if(reportSelectedIndex !== null) {
    selectedReport = jsonData.report.rows[reportSelectedIndex];
  }

  if(modelSelectedIndex !==null) {
    selectedModel = jsonData.models.rows[modelSelectedIndex];
  }
  
  const setActiveReportIndex = (index:any) => {
    setSelectedReportIndex(index);
   };

   const setActiveModelIndex = (index:any) => {
    setReportNameEdit(false);
    setSelectedModelIndex(index);
   };

  //  const setActiveReportComposeIndex = (index:any) => {
  //   setSelectedReportComposeIndex(index);
  //  };

  //  const setActiveModelComposeIndex = (index:any) => {
  //   setSelectedModelComposeIndex(index);
  //  };

   const openReport =()=> {

    if(selectedModel !== null || selectedReport !== null)

    if(value === 0) {
      dispatch(setSelectedReport(selectedReport));
      dispatch(setReportType(reportType.OPEN_REPORT));
    }
    if(value === 1){
      dispatch(setSelectedModel(selectedModel));
      dispatch(setReportType(reportType.CREATE_REPORT));
      dispatch(setNewReportName(editReportName));
    }
    if(value === 2) {
      dispatch(setSelectedReport(selectedReport));
      dispatch(setSelectedModel(selectedModel));
      dispatch(setReportType(reportType.COMPOSE_REPORT));
      dispatch(setNewReportName(editReportName));
    }

    dispatch(push(Routes.VIEWER));
    //window.location.reload();  
     
   }

   const handleLogout=()=>{

    removeCookie('auth',  { path: '/', maxAge : 1800 }); // 60 * 30
    dispatch(setCurrentUser(null));
    dispatch(push('/login'));  
    window.location.reload();  

   }

  return (

    <Paper className={classes.root} square>
      <div className={classes.header}>
        <div className={classes.tabs}>
          <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  variant='fullWidth'
                  classes={{root:classes.overrideTabs}}
              >
                  <Tab label="Open a report" />
                  <Tab label="Create a new report" />
                  <Tab label="compose a report" />
                  
          </Tabs>
        </div>
        <div className={classes.logOut} onClick={handleLogout}>
          <Logout/>
          <span className={classes.logOutText}>Logout</span>
        </div>
      </div>

         <Card className={classes.tableCard}>
          <div className={classes.hintMessage}>
            {(value === 0)?'Select a Report from the List of Reports table':(value === 1)?'Select a Model from the List of Models table':''}
          </div>
          <div className={classes.title}>
          {(value === 0)?'List of Reports':(value === 1)?'List of Models':''}
          </div>
          {(value !== 2)?<div className={classes.horizontalLine}></div>:null}
          <List>
            {(value === 0)?jsonData.report.rows.map((list,index)=>(
              <div>
              <ListItem 
              button
              selected={index === reportSelectedIndex}
              onClick={() => { setActiveReportIndex(index);}}
              >
                 <ListItemText primary={list.name}>

                 </ListItemText>
              </ListItem>
              </div> 
            )):null}
            <div>
            {(value === 1)?
            jsonData.models.rows.map((list,index)=>(
              <div>
              <ListItem 
              button
              selected={index === modelSelectedIndex}
              onClick={() => { setActiveModelIndex(index);}}
              >
                  <ListItemText primary={list.name}>

                  </ListItemText>
              </ListItem>
              </div> 
            )):null}
            </div>
            <div style={{float:'left',width:'50%'}}>
              <div className={classes.composeTitle}>{(value === 2)?'List of Reports':''}</div>
              {(value === 2)?<div className={classes.horizontalLine}></div>:null}
              {(value === 2)?
              jsonData.report.rows.map((list,index)=>(
                <div>
                <ListItem 
                button
                selected={index === reportSelectedIndex}
                onClick={() => { setActiveReportIndex(index);}}
                >
                   <ListItemText primary={list.name}>
  
                   </ListItemText>
                </ListItem>
                </div> 
              )):null}
            </div>
            <div style={{float:'left',width:'50%'}}>
            <div className={classes.composeTitle}>{(value === 2)?'List of Models':''}</div>
            {(value === 2)?<div className={classes.horizontalLine}></div>:null}
              {(value === 2)?
              jsonData.models.rows.map((list,index)=>(
                <div>
                <ListItem 
                button
                selected={index === modelSelectedIndex}
                onClick={() => { setActiveModelIndex(index);}}
                >
                   <ListItemText primary={list.name}>
  
                   </ListItemText>
                </ListItem>
                </div> 
              )):null}
            </div>
          </List>
        </Card>
         <div className={classes.footerOuterDiv}>
               {(value !== 0)?<div  className={classes.footerInnerDiv}><span className={classes.footerInputLabel}>Selected Model:</span><TextField className={classes.inputBox} inputProps={{style:{ height: "0px"}}} id="outlined-basic"  variant="outlined" value={selectedModel.name} disabled/></div>:null}
               {(value === 0 || value === 2)?<div  className={classes.footerInnerDiv}><span className={classes.footerInputLabel}>Selected Report:</span><TextField className={classes.inputBox} inputProps={{style:{ height: "0px"}}} id="outlined-basic"  variant="outlined" value={selectedReport.name} disabled/></div>:null}
               {(value !== 0)?<div  className={classes.footerInnerDiv}><span className={classes.footerInputLabel}>Report Name:</span><TextField className={classes.inputBox} inputProps={{style:{ height: "0px"}}} id="outlined-basic" variant="outlined" value={isReportNameEdit?editReportName:selectedModel.name} onChange={onHandleEditName}/></div>:null}
               <Button className={classes.footerInnerDiv} variant="contained" color="primary" onClick={openReport}>
                  {(value === 0)?'Open Report':(value === 1)?'Create Report':'Compose Report'}
               </Button>
         </div>
    </Paper>
  );
}

