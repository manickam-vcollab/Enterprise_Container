import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

export default function download(props:any) {
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1974 15.9565C17.1974 16.1773 17.0286 16.3505 16.8272 16.3505C16.6259 16.3505 16.457 16.1773 16.457 15.9565C16.457 15.7357 16.6259 15.5625 16.8272 15.5625C17.0286 15.5625 17.1974 15.7357 17.1974 15.9565Z" fill={props.color} stroke={props.color} stroke-width="0.125"/>
            <path d="M15.9615 12.9131H19.4231C19.5761 12.9131 19.7228 12.9772 19.831 13.0914C19.9392 13.2055 20 13.3603 20 13.5218V18.3913C20 18.5528 19.9392 18.7076 19.831 18.8218C19.7228 18.9359 19.5761 19 19.4231 19H5.57692C5.42391 19 5.27717 18.9359 5.16898 18.8218C5.06078 18.7076 5 18.5528 5 18.3913V13.5218C5 13.3603 5.06078 13.2055 5.16898 13.0914C5.27717 12.9772 5.42391 12.9131 5.57692 12.9131H9.03846" stroke={props.color} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 5V12.913" stroke={props.color} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.03857 9.26074L12.5001 12.9129L15.9617 9.26074" stroke={props.color} stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </>
    )
}


