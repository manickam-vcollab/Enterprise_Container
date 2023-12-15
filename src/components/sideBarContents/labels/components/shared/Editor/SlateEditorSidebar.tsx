
import React from "react";
import { useState ,useEffect ,useCallback } from 'react';
import { Editable, withReact, Slate ,ReactEditor } from 'slate-react';

import { BaseEditor, createEditor, Descendant } from 'slate';
import { HistoryEditor ,withHistory } from 'slate-history';
import Link from "./SlateRichEditor/Elements/Link/link";
import Image from "./SlateRichEditor/Elements/Embed/Image";
import Video from "./SlateRichEditor/Elements/Embed/Video";
import Table from "./SlateRichEditor/Elements/Table/Table";
import { sizeMap,fontFamilyMap } from "./SlateRichEditor/utils/SlateUtilitiFunctions";
import { useAppSelector, useAppDispatch} from '../../../../../../store/storeHooks';
import {selectLabelData,editLabel,selectEditableNodeId, createLabel} from '../../../../../../store/sideBar/labelSlice/AllLabelSlice';
import {ILabel,LabelType,LabelChartType} from '../../../../../../store/sideBar/labelSlice/shared/types';
import {getInitialContent} from './commonSlatejs';
import withTable from "./SlateRichEditor/plugins/withTable";
import withEmbeds from "./SlateRichEditor/plugins/withEmbeds";
import {Routes} from '../../../../../../routes/index'

import Toolbar from './Toolbar';
import './Editor.css';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

import {goBack,push} from 'connected-react-router/immutable';
import editorStyle from "./editorStyles";

type CustomText = { text: string }
type CustomElement = { type: 'paragraph'; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const { forwardRef, useImperativeHandle } = React;

const Element = (props:any) => {

  const {attributes, children, element} = props;
  switch (element.type) {

    case 'headingOne':
            return <h1 {...attributes} {...element.attr}>{children}</h1>
        case 'headingTwo':
            return <h2 {...attributes} {...element.attr}>{children}</h2>
        case 'headingThree':
            return <h3 {...attributes} {...element.attr}>{children}</h3>
        case 'blockquote':
            return <blockquote {...attributes} {...element.attr}>{children}</blockquote>
        case 'alignLeft':
            return <div style={{listStylePosition:'inside'}} {...attributes} {...element.attr}>{children}</div>
        case 'alignCenter':
            return <div style={{display:'flex',alignItems:'center',listStylePosition:'inside',flexDirection:'column'}} {...attributes} {...element.attr}>{children}</div>
        case 'alignRight':
            return <div style={{display:'flex',alignItems:'flex-end',listStylePosition:'inside',flexDirection:'column'}} {...attributes} {...element.attr}>{children}</div>
        case 'list-item':
            return  <li {...attributes} {...element.attr}>{children}</li>
        case 'orderedList':
            return <ol type='1' {...attributes}>{children}</ol>
        case 'unorderedList':
            return <ul {...attributes}>{children}</ul>
        case 'link':
            return <Link {...props}/>
        case 'table':
            return <Table {...props}  />
        case 'table-row':
            return <tr {...attributes} >{children}</tr>
        case 'table-cell':
            return <td {...element.attr} {...attributes} style={{borderColor:'black'}}>{children}</td>
        case 'image':
            return <Image {...props}/>
        // case 'video':
        //     return <Video {...props}/>
        // case 'equation':
        //     return <Equation {...props}/>
        // case 'htmlCode':
        //     return <HtmlCode {...props}/>

    default:
      return <p {...attributes}>{children}</p>
  }
} 

const Leaf = (props:any) => {

let {attributes, children ,leaf} = props;

if (leaf.bold) {
  children = <strong>{children}</strong>
}

if (leaf.code) {
  children = <code>{children}</code>
}

if (leaf.italic) {
  children = <em>{children}</em>
}
if(leaf.strikethrough){
  children = <span style={{textDecoration:'line-through'}}>{children}</span>
}
if (leaf.underline) {
  children = <u>{children}</u>
}
if(leaf.superscript){
  children = <sup>{children}</sup>
}
if(leaf.subscript){
  children = <sub>{children}</sub>
}
if(leaf.color){
  children = <span style={{color:leaf.color}}>{children}</span>
}
if(leaf.bgColor){
  children = <span style={{backgroundColor:leaf.bgColor}}>{children}</span>
}
if(leaf.fontSize){
  const size = sizeMap[leaf.fontSize]
  children = <span style={{fontSize:size}}>{children}</span>
}
if(leaf.fontFamily){
  const family = fontFamilyMap[leaf.fontFamily]
  children = <span style={{fontFamily:family}}>{children}</span>
}

  return <span {...attributes}>{children}</span>
}

//var setUndoable:boolean = true ;

  const SidebarEditor = forwardRef((props:{selectedLabels:ILabel[]}, ref) => {

  const selectedLabels = useAppSelector(selectEditableNodeId);
  const allLabels = useAppSelector(selectLabelData);
  const getSelectedNode = allLabels[selectedLabels];
  const dispatch = useAppDispatch();

  const classes = editorStyle();
  
  const [editor] = useState(() => withReact(withHistory(withEmbeds(withTable(createEditor())))));
   const [value, setValue] = useState<Descendant[]>(getInitialContent(props.selectedLabels));
  
  


  const renderElement = useCallback(props => <Element {...props}/>,[]);

  const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
  }, [])  
  const onHandleSave = (undoable:boolean) => {
  
  if(getSelectedNode.labelType === LabelType.LABEL2D || getSelectedNode.type === LabelChartType.LINECHART  ) {

    // dispatch(createLabel)
    // setValue(val)
     dispatch(goBack()); 

    }
    else {
      // setValue(val)
      Object.values(allLabels)?.forEach((label) => {
       
        if(label.id === selectedLabels) {
          
         if(label.children.length > 0) {
          // setValue(val)
          dispatch(goBack()); 
         }
         else {
          // setValue(val)
          dispatch(push(Routes.SELECT_WINDOW));

         }

        }
   })

    }
    
  }

  const onHandleChange = ( newValue:any) => {

     setValue(newValue);
     
  }

  const UndoClick = ()=> {

    editor.undo();

  }

  const RedoClick = ()=> {

    editor.redo();
  }

  useEffect(()=> {

    Object.values(allLabels)?.forEach((label) => {

      if(label.id === selectedLabels) {

       dispatch(editLabel({id:selectedLabels , value: JSON.stringify(value)}));

       if(label.children.length > 0) {

          label.children.forEach((childLabelID)=>{
              
            if(allLabels[childLabelID].children.length > 0)
            {
              allLabels[childLabelID].children.forEach((i)=> {
                dispatch(editLabel({id:i , value: JSON.stringify(value)}));
              })
            }
              else{
          dispatch(editLabel({id:childLabelID , value: JSON.stringify(value)}));
              }
      })

   }

      }
 })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value])

  
  // useEffect(()=>{

  //   return() =>{

  //     console.log("editorData",editor);

  //   }


  // },[])

  useImperativeHandle(ref, () => ({
    onHandleSave,
  }));

    return (
      <>
        <Slate editor={editor} value={value} onChange={(newValue:any)=> onHandleChange(newValue)}>
              <Toolbar/>
              <div>
              <div className={classes.borderClass} style={{marginTop:'20px',padding:'0 0.5em',width:'100%'}}>
                <Editable 
                autoFocus
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                
                />
              </div>
              </div>

        </Slate>
      </>
    )

  });


  export default SidebarEditor