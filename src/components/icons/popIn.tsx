import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default  function PopOut(props:any) {
   
    return (

       <SvgIcon {...props}  viewBox="12 4 16 16">

       <path d="M14.4473 31.2119H12.5479V30.4453H14.4473C14.8151 30.4453 15.113 30.3867 15.3408 30.2695C15.5687 30.1523 15.7347 29.9896 15.8389 29.7812C15.9463 29.5729 16 29.3353 16 29.0684C16 28.8242 15.9463 28.5947 15.8389 28.3799C15.7347 28.165 15.5687 27.9925 15.3408 27.8623C15.113 27.7288 14.8151 27.6621 14.4473 27.6621H12.7676V34H11.8252V26.8906H14.4473C14.9844 26.8906 15.4385 26.9834 15.8096 27.1689C16.1807 27.3545 16.4622 27.6117 16.6543 27.9404C16.8464 28.266 16.9424 28.6387 16.9424 29.0586C16.9424 29.5143 16.8464 29.9033 16.6543 30.2256C16.4622 30.5479 16.1807 30.7936 15.8096 30.9629C15.4385 31.1289 14.9844 31.2119 14.4473 31.2119ZM17.8395 31.417V31.3047C17.8395 30.9238 17.8948 30.5706 18.0055 30.2451C18.1161 29.9163 18.2757 29.6315 18.484 29.3906C18.6923 29.1465 18.9446 28.9577 19.2408 28.8242C19.537 28.6875 19.8691 28.6191 20.2369 28.6191C20.608 28.6191 20.9417 28.6875 21.2379 28.8242C21.5374 28.9577 21.7913 29.1465 21.9996 29.3906C22.2112 29.6315 22.3723 29.9163 22.483 30.2451C22.5937 30.5706 22.649 30.9238 22.649 31.3047V31.417C22.649 31.7979 22.5937 32.151 22.483 32.4766C22.3723 32.8021 22.2112 33.0869 21.9996 33.3311C21.7913 33.5719 21.539 33.7607 21.2428 33.8975C20.9498 34.0309 20.6178 34.0977 20.2467 34.0977C19.8756 34.0977 19.5419 34.0309 19.2457 33.8975C18.9495 33.7607 18.6956 33.5719 18.484 33.3311C18.2757 33.0869 18.1161 32.8021 18.0055 32.4766C17.8948 32.151 17.8395 31.7979 17.8395 31.417ZM18.7428 31.3047V31.417C18.7428 31.6807 18.7737 31.9297 18.8355 32.1641C18.8974 32.3952 18.9902 32.6003 19.1139 32.7793C19.2408 32.9583 19.3987 33.0999 19.5875 33.2041C19.7763 33.305 19.996 33.3555 20.2467 33.3555C20.4941 33.3555 20.7105 33.305 20.8961 33.2041C21.0849 33.0999 21.2411 32.9583 21.3648 32.7793C21.4885 32.6003 21.5813 32.3952 21.6432 32.1641C21.7083 31.9297 21.7408 31.6807 21.7408 31.417V31.3047C21.7408 31.0443 21.7083 30.7985 21.6432 30.5674C21.5813 30.333 21.4869 30.1263 21.36 29.9473C21.2363 29.765 21.08 29.6217 20.8912 29.5176C20.7057 29.4134 20.4876 29.3613 20.2369 29.3613C19.9895 29.3613 19.7714 29.4134 19.5826 29.5176C19.3971 29.6217 19.2408 29.765 19.1139 29.9473C18.9902 30.1263 18.8974 30.333 18.8355 30.5674C18.7737 30.7985 18.7428 31.0443 18.7428 31.3047ZM24.8352 29.7324V36.0312H23.927V28.7168H24.757L24.8352 29.7324ZM28.3947 31.3145V31.417C28.3947 31.8011 28.3492 32.1576 28.258 32.4863C28.1669 32.8118 28.0334 33.0951 27.8576 33.3359C27.6851 33.5768 27.4719 33.764 27.218 33.8975C26.9641 34.0309 26.6727 34.0977 26.3439 34.0977C26.0087 34.0977 25.7124 34.0423 25.4553 33.9316C25.1981 33.821 24.98 33.6598 24.801 33.4482C24.6219 33.2367 24.4787 32.9827 24.3713 32.6865C24.2671 32.3903 24.1955 32.0566 24.1564 31.6855V31.1387C24.1955 30.748 24.2688 30.3981 24.3762 30.0889C24.4836 29.7796 24.6252 29.516 24.801 29.2979C24.98 29.0765 25.1965 28.9089 25.4504 28.7949C25.7043 28.6777 25.9973 28.6191 26.3293 28.6191C26.6613 28.6191 26.9559 28.6842 27.2131 28.8145C27.4702 28.9414 27.6867 29.1237 27.8625 29.3613C28.0383 29.599 28.1701 29.8838 28.258 30.2158C28.3492 30.5446 28.3947 30.9108 28.3947 31.3145ZM27.4865 31.417V31.3145C27.4865 31.0508 27.4589 30.8034 27.4035 30.5723C27.3482 30.3379 27.2619 30.1328 27.1447 29.957C27.0308 29.778 26.8843 29.638 26.7053 29.5371C26.5262 29.4329 26.313 29.3809 26.0656 29.3809C25.8378 29.3809 25.6392 29.4199 25.4699 29.498C25.3039 29.5762 25.1623 29.682 25.0451 29.8154C24.9279 29.9456 24.8319 30.0954 24.757 30.2646C24.6854 30.4307 24.6317 30.6032 24.5959 30.7822V32.0469C24.661 32.2747 24.7521 32.4896 24.8693 32.6914C24.9865 32.89 25.1428 33.0511 25.3381 33.1748C25.5334 33.2952 25.7792 33.3555 26.0754 33.3555C26.3195 33.3555 26.5295 33.305 26.7053 33.2041C26.8843 33.0999 27.0308 32.9583 27.1447 32.7793C27.2619 32.6003 27.3482 32.3952 27.4035 32.1641C27.4589 31.9297 27.4865 31.6807 27.4865 31.417Z" fill="currentColor"/>
<path d="M28 10.4V19.2C28 19.4122 27.9157 19.6157 27.7657 19.7657C27.6157 19.9157 27.4122 20 27.2 20H12.8C12.5878 20 12.3843 19.9157 12.2343 19.7657C12.0843 19.6157 12 19.4122 12 19.2V4.8C12 4.58783 12.0843 4.38434 12.2343 4.23431C12.3843 4.08429 12.5878 4 12.8 4H21.6V5.6H13.6V18.4H26.4V10.4H28ZM18.4 9.6H16.8V14.4C16.8 14.6122 16.8843 14.8157 17.0343 14.9657C17.1843 15.1157 17.3878 15.2 17.6 15.2H22.4V13.6H19.5313L27.7656 5.3656L26.6344 4.2344L18.4 12.4687V9.6Z" fill="currentColor"/>

       </SvgIcon>
    )
}