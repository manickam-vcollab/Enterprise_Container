import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

export default function transientIcon(props:any) {

    return (

            <SvgIcon  {...props} viewBox="0 0 18 12">
            <rect width="18" height="2" fill="currentColor"/>
            <rect width="5" height="1" transform="translate(12 6)" fill="currentColor"/>
            <rect width="4" height="1" transform="translate(8 7)" fill="currentColor"/>
            <rect width="3" height="1" transform="translate(5 8)" fill="currentColor"/>
            <rect width="2" height="1" transform="translate(3 9)" fill="currentColor"/>
            <rect width="1" height="1" transform="translate(1 9)" fill="currentColor"/>
            <rect width="1" height="1" transform="translate(1 11)" fill="currentColor"/>
            <rect width="1" height="1" transform="translate(1 7)" fill="currentColor"/>
            <rect width="1" height="1" transform="translate(1 5)" fill="currentColor"/>
            <rect width="1" height="1" transform="translate(1 3)" fill="currentColor"/>
            <rect width="1" height="3" transform="translate(17 3)" fill="currentColor"/> </SvgIcon>
    )
}

