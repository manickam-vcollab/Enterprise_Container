import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Field(props:any) {
  return (
    <SvgIcon  {...props}>
    <path d="M0 0V3.27273H0.818182V14.7273H0V18H3.27273V17.1818H14.7273V18H18V14.7273H17.1818V3.27273H18V0H14.7273V0.818182H3.27273V0H0ZM3.27273 2.45455H14.7273V3.27273H15.5455V14.7273H14.7273V15.5455H3.27273V14.7273H2.45455V3.27273H3.27273V2.45455ZM4.09091 4.09091V10.6364H6.54545V13.9091H13.9091V6.54545H10.6364V4.09091H4.09091ZM5.72727 5.72727H9V9H5.72727V5.72727ZM10.6364 8.18182H12.2727V12.2727H8.18182V10.6364H10.6364" fill="currentColor"/>
    </SvgIcon>
  );
}