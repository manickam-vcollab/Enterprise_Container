import React, { useEffect, useState } from 'react';
import {useSlate} from 'slate-react'
import {Range} from 'slate'
import Button from './SlateRichEditor/common/Button';
import Icon from './SlateRichEditor/common/Icon';
import { toggleBlock, toggleMark, isMarkActive, addMarkData, isBlockActive,activeMark} from './SlateRichEditor/utils/SlateUtilitiFunctions'
import useFormat from './SlateRichEditor/utils/useFormat';
import defaultToolbarGroups from './SlateRichEditor/utils/toolbarGroups'
import './styles.css'
import ColorPicker from './SlateRichEditor/Elements/Color Picker/ColorPicker';
import LinkButton from './SlateRichEditor/Elements/Link/linkButton';
import Embed from './SlateRichEditor/Elements/Embed/Embed';
import TableSelector from './SlateRichEditor/Elements/Table/TableSelector';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
// import EquationButton from '../Elements/Equation/EquationButton'
// import Id from '../Elements/ID/Id'
import TableContextMenu from './SlateRichEditor/Elements/TableContextMenu/TableContextMenu';
import editorStyle from './editorStyles';
// import CodeToTextButton from '../Elements/CodeToText/CodeToTextButton'
// import HtmlContextMenu from '../Elements/CodeToText/HtmlContextMenu';
const Toolbar = (props)=>{
    const {handleCodeToText} = props
    const editor = useSlate();
    const isTable = useFormat(editor,'table');
    const [toolbarGroups,setToolbarGroups] = useState(defaultToolbarGroups);
    const classes = editorStyle();
    
    useEffect(()=>{
        // Filter out the groups which are not allowed to be inserted when a table is in focus.
        let filteredGroups = [...defaultToolbarGroups]
        if(isTable){
            filteredGroups = toolbarGroups.map(grp =>(
                grp.filter(element => (
                    //groups that are not supported inside the table
                    !['codeToText'].includes(element.type)
                ))
            ))
            filteredGroups = filteredGroups.filter(elem => elem.length)
        }
        setToolbarGroups(filteredGroups);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isTable])

    const BlockButton = ({format}) =>{
        return (
            <Button className={classes.backgroudClass} active={isBlockActive(editor,format)} format={format} onMouseDown={
                e=>{
                    e.preventDefault();
                    toggleBlock(editor,format)
                }
            }>
                <Icon icon={format}/>
            </Button>
        )
    }
    const MarkButton = ({format})=>{
        return(
            <Button className={classes.backgroudClass}  active={isMarkActive(editor,format)} format={format} onMouseDown={
                e=>{
                    e.preventDefault();
                    toggleMark(editor,format)
                }
            }>
                <Icon icon={format}/>
            </Button>
        )
    }
    const Dropdown = ({format,options}) => {
        return (
            <select style={{background:'rgba(1,1,0,.6)', border:'1px solid'}} value={activeMark(editor,format)} onChange = {e => changeMarkData(e,format)}>
                {
                    options.map((item,index) => 
                        <option style={{background:'#424242'}} key={index} value={item.value}>{item.text}</option>
                    )
                }
            </select>
        )
    }
    const changeMarkData = (event,format)=>{
        event.preventDefault();
        const value =event.target.value
        addMarkData(editor,{format,value})
    }

    const UndoClick = ()=> {

        editor.undo();
    
      }
    
      const RedoClick = ()=> {
    
        editor.redo();
      }
    return(
        <div>
            <div className='toolbar'>
            {
                toolbarGroups.map((group,index) => 
                    <span key={index} className={`toolbar-grp`}>
                        {
                            group.map((element) => 
                                {
                                    switch (element.type) {
                                        case 'block' :
                                            return <BlockButton key={element.id} {...element}/>
                                        case 'mark':
                                            return <MarkButton key={element.id} {...element}/>
                                        case 'dropdown':
                                            return <Dropdown key={element.id} {...element} />
                                        // case 'link':
                                        //     return <LinkButton key={element.id} active={isBlockActive(editor,'link')} editor={editor}/>
                                        case 'embed':
                                            return <Embed key={element.id} format={element.format} editor={editor} />
                                        case 'color-picker':
                                            return <ColorPicker key={element.id} activeMark={activeMark} format={element.format} editor={editor}/>
                                        case 'table':
                                            return <TableSelector key={element.id} editor={editor}/>
                                        // case 'id':
                                        //     return <Id editor={editor}/>
                                        // case 'equation':
                                        //     return <EquationButton editor={editor}/>
                                        // case 'codeToText':
                                        //     return <CodeToTextButton handleButtonClick={handleCodeToText}/>
                                        default:
                                            return null
                                    }
                                }
                            )
                        }
                    </span>    
                )
            }
            <TableContextMenu editor={editor}/>
            {/* <HtmlContextMenu editor={editor} handleCodeToText={handleCodeToText} /> */}
            <div>
              <UndoIcon className={classes.iconClass} fontSize="small" onClick={UndoClick}/>
              <RedoIcon className={classes.iconClass} fontSize="small" onClick={RedoClick}/>
            </div>
        </div>
        </div>
    )
}

export default Toolbar;