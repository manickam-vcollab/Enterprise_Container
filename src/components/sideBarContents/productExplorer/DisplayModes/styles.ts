import {makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles(
    {
        displayModeList: {
            width: '100%',
        },
        accordian: {
            background: 'transparent'
        },
        accordianSummaryIcon: {
            order: -1,
            paddingTop: 0,
            paddingBottom: 0
        },
        accordianSummaryExpanded: {
            minHeight: '0 !important',
        },
        accordianSummaryContent: {
            '&.Mui-expanded':{
                margin: '10px 0'
            }
        },
        accordianDetails: {
            flexDirection: 'column',
            paddingTop: 0
        },
        selectedButton: {
            marginTop: 5,
            textTransform: 'none'
        },
        bodyContent:{

            fontSize:theme.typography.body2.fontSize,
            fontWeight:theme.typography.body2.fontWeight,
            lineHeight:theme.typography.body2.lineHeight,
            color:theme.palette.text.secondary,
            '&:hover':{
                cursor:'pointer',
                color: theme.palette.text.primary,

            }
        },
    }
))

export default useStyles;