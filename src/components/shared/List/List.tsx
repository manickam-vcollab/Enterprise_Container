import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import CheckIcon from '@material-ui/icons/Check';
import MuiAddIcon from '../../../components/icons/add';
import MuiIconButton from '../../shared/headerIconButton/IconButton';

import style from './liststyle';
import { useState } from 'react';


interface IListProps {

    items:ListItem[],
    onSelectMenuList:(id:string,isSelected:boolean)=> void
    onClickSetListEditable:(id:string,edit:boolean)=> void
    onClickUpdateListName:(id:string,value:string)=> void
    onClickAdd:()=> void

}

type ListItem = {

    id:any
    text:string,
    selected:boolean,
    applied:boolean,
    edit:boolean,
    readonly:boolean,
    type:Source

}

export enum Source {

   SYSTEM,
   USER

}

export default function List(props:IListProps) {

  const classes = style();
  const [singleSelectTimer, setSingleSelectTimer] = useState<number|null>(null);
  const handleSelect = (selectedKeys:any, nodes:any, event:any) => {
    if (singleSelectTimer) {
      // if there is a single click timer set, it means this is a double click
      clearTimeout(singleSelectTimer);
      setSingleSelectTimer(null);
      // handleDoubleClick();
    } else {
      // if there's no single click timer, set one for the single click
      setSingleSelectTimer(window.setTimeout(() => {
        setSingleSelectTimer(null);
        props.onSelectMenuList(item.id,!item.selected);
      }, 200));
    }
  }

  return (

         <div className={classes.Scrollbar}>   
                <MuiList >
                  <MuiListItem  className={classes.listItemTextHeading}> 
                    
                    <MuiListItemText  primary="System Provided" ></MuiListItemText>

                 </MuiListItem> 
                      {

                        props.items.map((item : ListItem, index:  number)=>(

                          item.type === Source.SYSTEM ?(
                       
                          <MuiListItem button  key={index}  onClick={(event)=>props.onSelectMenuList(item.id,!item.selected)} selected={item.selected} >
                           
                             <MuiListItemText classes={(item.selected)?{primary:classes.listItemTextSelected}:{primary:classes.listItemText}} primary={item.text} ></MuiListItemText>
                             { item.applied === true  ? <MuiListItemSecondaryAction><CheckIcon/></MuiListItemSecondaryAction>:null}

                          </MuiListItem>):null

                        ))}

                 <MuiListItem > 
                   
                     <MuiListItemText  className={classes.listItemTextHeading} primary="User Provided" ></MuiListItemText> 
                     <MuiIconButton icon={<MuiAddIcon />} disabled={false} onClick={props.onClickAdd} fontSize='small'></MuiIconButton>
                     

                </MuiListItem> 

                <div >

                  {

                    props.items.map((item:ListItem, index:  number)=>(

                      item.type === Source.USER ?(

                        (item.edit ?(<Input type="text" style={{width:'80%'}} defaultValue={item.text} 
                        onChange={event => props.onClickUpdateListName(item.id,event.target.value)}
                        onMouseLeave={(event)=>{

                        if(item.text.length >=1) {

                          props.onClickSetListEditable(item.id,false);

                        }
                         
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === 'Escape') {

                            if(item.text.length >=1) {

                              props.onClickSetListEditable(item.id,false);
                              event.preventDefault()
                              event.stopPropagation()
                              
                            }
                          }
                        }}
                        />): (<MuiListItem key={index} button  
                        onClick={(event) => {
                          // console.log('click')
                          if (singleSelectTimer) {
                            // if there is a single click timer set, it means this is a double click
                            clearTimeout(singleSelectTimer);
                            setSingleSelectTimer(null);
                            // handleDoubleClick();
                            // console.log('bouble click')
                          } else {
                            // if there's no single click timer, set one for the single click
                            setSingleSelectTimer(window.setTimeout(() => {
                              setSingleSelectTimer(null);
                              props.onSelectMenuList(item.id,!item.selected);
                              // console.log('single click')
                            }, 300));
                          }
                        }}
                        selected={ item.selected }>
                        <MuiListItemText classes={(item.selected)?{primary:classes.listItemTextSelected}:{primary:classes.listItemText}} primary={item.text} 
                        onDoubleClick={() => {
  
                          props.onClickSetListEditable(item.id,true);
  
                        }}/>
                        { item.applied === true  ? <MuiListItemSecondaryAction><CheckIcon/></MuiListItemSecondaryAction>:null}
                        </MuiListItem>))):null

                    ))}

                   </div>    

                </MuiList>

         </div>
  )

}