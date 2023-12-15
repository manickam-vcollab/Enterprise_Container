import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Hamburger(props:any) {
    return (
      <SvgIcon  {...props}>
  
          <path d="M1 9.72656H25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M1 1H25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M1 18.4551H25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </SvgIcon>
    );
  }
