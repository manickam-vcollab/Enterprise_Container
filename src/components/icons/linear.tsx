import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

export default function linearIcon(props:any) {

    return (

            <SvgIcon  {...props} viewBox="0 0 18 18">
            <rect width="18" height="2" transform="translate(0 12)" fill="currentColor"/>
            <rect width="1" height="12" transform="translate(4)" fill="currentColor"/>
            <path d="M1 6L4.5 10L8 6H1Z" fill="currentColor"/> </SvgIcon>
    )
}

