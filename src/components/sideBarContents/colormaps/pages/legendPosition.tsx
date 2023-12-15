
import PopOut from 'components/icons/popout';
import HeaderIconButton from 'components/shared/headerIconButton/IconButton';

import useStyles from '../../scene/components/axistriadpositionstyle';


interface ILegendListPositionProps {

   items:ListItem[],
   onSelectMenuList:(id:string,isSelected:boolean, undoable?: boolean)=> void
    
}

type ListItem = {

    id: any;
  text: string;
  selected: boolean;
  applied: boolean;

}

export default function LegendListPosition(props:ILegendListPositionProps) {

 const classes = useStyles();   
   
return (

    <div>

            {props.items.map((listItems)=>{

            return(

                <HeaderIconButton onClick={()=>props.onSelectMenuList(listItems.id ,!listItems.selected, true)} icon={<PopOut selected={listItems.selected}></PopOut>
            } disabled={false}></HeaderIconButton>

                
              

            )})}

    </div>  
)}