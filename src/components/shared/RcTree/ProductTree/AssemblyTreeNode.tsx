import { Text, Group, Button, ActionIcon } from '@mantine/core'
import {Typography } from '@material-ui/core';
import { useHover } from '@mantine/hooks'
import { Eye, Link } from 'tabler-icons-react';
import InvertCell from '../Invert';
import ShowHide from '../ShowHide';
import Grid from '@material-ui/core';
import {useStyles} from '../TreeStyle';
import Checkbox from '../../checkbox'
import { preProcessFile } from 'typescript';
import clsx from 'clsx'
import { useRef } from 'react';



const Title = ({...props} ) => {

const treenoderef=useRef() as React.MutableRefObject<HTMLInputElement>;

const treenodeleftWidth=treenoderef.current?.offsetLeft

const treenodeWidth= props.conwidth - treenodeleftWidth

const style=useStyles();

const { hovered, ref } = useHover()
  
  return (
    <div ref={treenoderef} >
   
    <div style={{width: treenodeWidth}} className={clsx(props.marginStyle?style.marginStylePartlist:null)}  ref={ref} >
         <Group spacing="sm">

        
         <Checkbox className={style.checkbox} size='small' checked= {props.node.state.checked} indeterminate={props.node.state.partiallyChecked} disableRipple onClick={(e:React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} onChange = {(e:any) => props.onCheck(e.target.checked,props.node.id, true)}></Checkbox>
       
  
         <Typography 
         align='left'
          style={{
             maxWidth: "75%",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            alignContent:'left' 
          }}
          className={props.node.state.visibility==false  ? style.disabled : ""} >

          {props.node.title}

         </Typography>
      
         {
       
       hovered ? 
      
       <div className={style.overlaystyling}>
        <div className={style.overlayicons} >
     { props.node.children.length > 0 ?
             <ActionIcon className={style.iconHover}>
                <InvertCell node = {props.node}  onClick={props.handleinvert} ></InvertCell>
           </ActionIcon> 

           : null
           
}
           <ActionIcon  className={clsx(style.iconHover)}>
           <ShowHide  node = {props.node} onToggle={props.handlevisibility} ></ShowHide>
           </ActionIcon>
           
         
       </div>
       </div> : null
       }


      </Group>
    

    </div>
 
    </div>
  )
}

export default Title
