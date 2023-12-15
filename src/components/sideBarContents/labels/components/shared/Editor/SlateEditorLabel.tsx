import { useMemo, useState ,useEffect ,useCallback, useRef } from 'react'
import { Editable, withReact, Slate ,ReactEditor ,useSlate  } from 'slate-react'
import {
  BaseEditor ,
  createEditor,
  Descendant,
  Transforms,
  Element as SlateElement,
} from 'slate'
import { HistoryEditor ,withHistory } from 'slate-history';
import Link from "./SlateRichEditor/Elements/Link/link";
import Image from "./SlateRichEditor/Elements/Embed/Image";
import Video from "./SlateRichEditor/Elements/Embed/Video";
import Table from "./SlateRichEditor/Elements/Table/Table";
import { LabelType } from 'store/sideBar/labelSlice/shared/types';
import withTable from "./SlateRichEditor/plugins/withTable";
import withEmbeds from "./SlateRichEditor/plugins/withEmbeds";

import { sizeMap,fontFamilyMap } from "./SlateRichEditor/utils/SlateUtilitiFunctions";
type CustomText = { text: string }
type CustomElement = { type: 'paragraph'; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}


const Element = (props:any) => {

  const {attributes, children, element} = props;

  switch (props.element.type) {

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
      return <Table {...props} />
  case 'table-row':
      return <tr {...attributes}>{children}</tr>
  case 'table-cell':
      return <td {...element.attr} {...attributes}>{children}</td>
  case 'image':
      return <Image {...props}/>
      default:
       return <p style={{margin:'0px'}} {...attributes}>{children}</p>
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

export default function LabelEditor(props:{content:any}) {   

  const countRef = useRef(0);

  const [value, setValue] = useState<Descendant[]>(props.content);

  
   const editor = useMemo(() => withReact(withHistory(withEmbeds(withTable(createEditor())))), [])

   //const [editor] = useState(() => withReact(withHistory(createEditor())));

  const renderElement = useCallback(props => <Element {...props}/>,[])

  const renderLeaf = useCallback(props =>  <Leaf {...props} />,[])  

  useEffect(() => {
    countRef.current += 1;
    if (countRef.current > 1) {
      setValue(props.content);
    
      Transforms.deselect(editor);
    }
  }, [props.content, editor]);
  

    return (

      <Slate editor={editor} value={value}
      onChange={(newValue)=>{setValue(newValue)}}
       >
          <Editable style={{margin:'5px',whiteSpace:"nowrap"}}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          // readOnly
          />
      </Slate>
    )
}
