import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

import useStyles from './ToolbarPositionOrientationStyle';


interface IToolbarPositionProps {

   items:ListItem[],
   onSelectMenuList:(id:string,isSelected:boolean, undoable?: boolean)=> void
   title:string,
   disabled:boolean
    
}

type ListItem = {

    id:any
    text:string,
    selected:boolean,
    applied:boolean,

}

export default function ToolbarPosition(props:IToolbarPositionProps) {

 const classes = useStyles();   
   
return (
    <div>
      <MuiList>
        <MuiListItem>
          <MuiListItemText
            classes={{ primary: classes.bodyHeading }}
            primary={props.title}
          ></MuiListItemText>
        </MuiListItem>

        {props.items.map((listItems) => {
          return (
            <MuiListItem
              button
              disabled={props.disabled}
              onClick={(event) =>
                props.onSelectMenuList(listItems.id, !listItems.selected, true)
              }
              selected={listItems.selected}
            >
              <MuiListItemText
                primary={listItems.text}
                classes={{ primary: classes.bodyContent }}
              ></MuiListItemText>
              {listItems.applied == true ? (
                <MuiListItemSecondaryAction>
                  <CheckIcon />
                </MuiListItemSecondaryAction>
              ) : null}
            </MuiListItem>
          );
        })}
      </MuiList>
    </div>
  );
}