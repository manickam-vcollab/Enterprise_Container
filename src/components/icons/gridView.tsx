
import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon';

export default function GridView(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M13.4 7H7V13.4H13.4V7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M22.9999 7H16.5999V13.4H22.9999V7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M13.4 16.5996H7V22.9996H13.4V16.5996Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M22.9999 16.5996H16.5999V22.9996H22.9999V16.5996Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </SvgIcon>
  );
}

