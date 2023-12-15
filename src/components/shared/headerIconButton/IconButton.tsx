import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import IconButton from "@material-ui/core/IconButton";

interface IconProps {
    id?:string,
    label?:string,
    icon:any,
    style?:any,
    fontSize?:string,
    disabled:boolean,
    onClick:(e:any) => void
}

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    color:theme.palette.text.secondary,
    "&:hover, &.Mui-focusVisible": { 
        color:theme.palette.text.primary
    }
  }
}));


export default function HeaderIconButton(props:IconProps) {

    const {id,label,icon,style,disabled,fontSize,onClick} = props;

    const classes = useStyles();

    return (
             <IconButton id="step10" aria-label={label} className={clsx(classes.customHoverFocus,style)}  onClick={onClick} disabled={disabled}>
                {icon}
             </IconButton>

    )


}