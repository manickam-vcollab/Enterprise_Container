import React from 'react';
import { useHistory } from 'react-router';

export default  function useRouterHistory () {

    const history = useHistory();
    const routerPathName:string =  history.location.pathname;

    return (   
        [routerPathName]
    )
}