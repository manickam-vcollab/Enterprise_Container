import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

import useStyles from './axistriadpositionstyle';


interface IAxisTriadPositionProps {

   items:ListItem[],
   onSelectMenuList:(id:string,isSelected:boolean, undoable?: boolean)=> void,
   selectedWindowPosition:string
    
}

type ListItem = {
    id:any
    title:string,

}

export default function AxisTriadPosition(props:IAxisTriadPositionProps) {

 const classes = useStyles();   
   
return (

    <div>

        <MuiList>
            <MuiListItem>
                <MuiListItemText classes={{primary:classes.bodyHeading}} primary={'Position'} ></MuiListItemText> 
            </MuiListItem>
           
            {props.items.map((listItems)=>{

            return(
                <MuiListItem  button onClick={(event)=>props.onSelectMenuList(listItems.id ,true)} >

                    <MuiListItemText primary={listItems.title } classes={{primary:classes.bodyContent}}  ></MuiListItemText>
                    { props.selectedWindowPosition == listItems.id ? <MuiListItemSecondaryAction><CheckIcon/></MuiListItemSecondaryAction>:null}

                </MuiListItem>

            )})}

        </MuiList>
    </div>  
)}