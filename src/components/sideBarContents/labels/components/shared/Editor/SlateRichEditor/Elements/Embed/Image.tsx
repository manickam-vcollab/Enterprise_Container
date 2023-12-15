import React from 'react'
import {useState} from 'react';
import { useSelected, useFocused } from "slate-react";
import Icon from '../../common/Icon'
import useResize from '../../utils/useResize'


const Image = ({ attributes, element, children }) => {
  const {url,alt,width,height} = element;
  const selected = useSelected();
  const focused = useFocused();
  const [size,onMouseDown,resizing] = useResize();

  
//   const onHandleChange = ( newValue:any) => {

//     setImageDimensions({
//       width:size.width,
//       height:size.height
//     });
    
//  }

  return (
    <div
      {...attributes}
      className='embed'
      style={{display:'flex',boxShadow: selected && focused &&  '0 0 3px 3px lightgray'}}
      {...element.attr}
    >
      <div contentEditable={false}  >
        
        <img alt={alt} src={url} style={{width:`${size.width}px`,height:`${size.height}px`}} />
        {
           selected && 
          <button onMouseDown={onMouseDown} style={{width:'15px',height:'15px',opacity:1,border:'none',background:'transparent'}}><Icon icon='resize'/></button>
        }
      </div>
      {children}
    </div>
  );
};
export default Image;