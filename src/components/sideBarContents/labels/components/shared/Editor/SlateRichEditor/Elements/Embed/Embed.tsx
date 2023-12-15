import React, {useRef, useState} from 'react';
import Button from '../../common/Button'
import Icon from '../../common/Icon'
import { isBlockActive } from '../../utils/SlateUtilitiFunctions';
import usePopup from '../../utils/usePopup'
import {insertEmbed } from '../../utils/embed'
import { Transforms } from 'slate';
import {ReactEditor} from 'slate-react'

 import useResize from '../../utils/useResize'

import './Embed.css'
import editorStyle from '../../../editorStyles';
const Embed = ({editor,format}) =>{
    const urlInputRef = useRef();
    const [showInput,setShowInput] = usePopup(urlInputRef);

    const classes = editorStyle();
    const [size,onMouseDown] = useResize();

    const [formData,setFormData] = useState({
        url:'',
        alt:''
    })
    
  const [selectedFile, setSelectedFile] = useState({url:''});
    const [selection,setSelection] = useState();
    const handleButtonClick = (e)=>{
        e.preventDefault();
        setSelection(editor.selection);
        selection && ReactEditor.focus(editor);

        setShowInput(prev =>!prev);
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();

        selection && Transforms.select(editor,selection);
        selection && ReactEditor.focus(editor);

        insertEmbed(editor,{...selectedFile},format);
        setShowInput(false);
        setSelectedFile({
            url:''
        })
    }
   
     
      const insertImage = (editor, url) => {
        const image = { type: "image", url, children: [{ text: "" }] };
        Transforms.insertNodes(editor, image);
      };

    const onClickImage = (event) => {
        for (const file of event.target.files) {
            const reader = new FileReader();
            const [mime] = file.type.split("/");
    
            if (mime === "image") {
              
              const fileSize = event.target.files[0].size / 1024 ;
              if(fileSize > 1)
                {
                  alert("Please Insert Image less than 1KB")
                }
                else
                {
              reader.addEventListener("load", () => {
                
                const url = reader.result;
                insertImage(editor, url);
            });
              reader.readAsDataURL(file);
            }
          }
          }
      };

    //  const validateSize(input) {
    //     const fileSize = input.files[0].size / 1024 / 1024; // in MiB
    //     if (fileSize > 2) {
    //       alert('File size exceeds 2 MiB');
    //       // $(file).val(''); //for clearing with Jquery
    //     } else {
    //       // Proceed further
    //     }
    //   }
  
 

    return (
        <div ref={urlInputRef} className='popup-wrapper' style={{display:'inline-block'}}>
            <Button active={isBlockActive(editor,format)} style={{border: showInput?'1px solid lightgray':'',borderBottom: 'none',paddingRight:'0px',cursor:'pointer'}}  format={format} onClick={handleButtonClick}>
                <Icon icon={format}/>
            </Button>
            {
                showInput&&
                <div  className='popup'>
                    {
                        format === 'image' &&
                        <div>
                            <button className={`${classes.backgroudClass} image-upload tooltip-icon-button`}>
                             <label htmlFor="file-input" className=" image-icon">
                            </label>
          <input
          
            id="file-input"
            accept="image/*"
            type="file"
            onChange={onClickImage}
          />
        </button>
                          
                          
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Embed;