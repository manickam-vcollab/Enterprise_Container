import { makeStyles } from "@material-ui/core";

const editorStyle = makeStyles((theme:any) => ({
    backgroudClass:{
        backgroundColor: theme.palette.background.default,
        color:`${theme.palette.text.secondary} !important`,
        border:'none',
        "&:hover": {
            color:`${theme.palette.text.primary} !important`,
            // backgroundColor: `${theme.palette.action.hover} !important`,
        }
    },
    iconClass:{
        width:'30px',
        height:'25px',
        color:theme.palette.text.secondary,
        margin:'0px',
        border: 'none',
        background:'none',
        "&:hover": {
            color:theme.palette.text.primary,
            // backgroundColor: `${theme.palette.action.hover} !important`,
        }
    },
    borderClass:{
        border:`1px solid ${theme.palette.divider} !important`
    },
    dropdownClass:{
        backgroundColor: `${theme.palette.divider} !important`,
        color:`${theme.palette.text.primary} !important`
    }
}))

export default editorStyle