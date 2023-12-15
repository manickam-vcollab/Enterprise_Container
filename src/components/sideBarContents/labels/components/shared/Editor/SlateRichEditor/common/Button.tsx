import React from 'react'
import editorStyle from '../../editorStyles';

const Button =(props)=>{
    const classes = editorStyle();
    const {children,format,active, ...rest} = props
    return(
        <button  className={`${classes.backgroudClass} ${active?'btnActive':''}`} title={format}  {...rest} style={{width:'30px',height:'25px',margin:'0px',border: 'none',background:'none'}}>
            {children}
        </button>
    )
}

export default Button;