import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    leftTitle: {
        paddingLeft:'10px',
    },

    headerIconAlign:{
        display: "inherit",
        marginRight: "-90px;"
    },
    listItemText:{
        fontSize:theme.typography.body2.fontSize,
        fontWeight:theme.typography.body2.fontWeight,
        lineHeight:theme.typography.body2.lineHeight,
    }

}));