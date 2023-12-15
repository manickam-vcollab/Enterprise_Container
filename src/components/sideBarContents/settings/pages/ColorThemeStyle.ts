import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme:any) =>({

    listTextColor:{

        color:theme.palette.text.secondary,
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,


    '&:hover': {

            color:theme.palette.text.primary
        }
}


}));