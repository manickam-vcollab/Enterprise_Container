import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { useAppSelector , useAppDispatch} from '../../store/storeHooks';
import { selectCurrentUser, setCurrentUser ,selectedReport,selectedModel} from '../../store/appSlice';

function Dashboard(props : any){
    const dispatch = useAppDispatch();  
    const currentUser = useAppSelector(selectCurrentUser);
    // const selectedReportData = useAppSelector(selectedReport);
    // const selectedModelData = useAppSelector(selectedModel);
    const [cookies, setCookie] = useCookies(['auth']);

    if(currentUser){
        // if(Object.keys(selectedReportData).length !== 0 || Object.keys(selectedModelData).length !== 0) {
             return props.children;
        // }
    }
        
    if(cookies.auth){
        dispatch(setCurrentUser(cookies.auth));

        // if(Object.keys(selectedReportData).length !== 0 || Object.keys(selectedModelData).length !== 0) {
             return props.children;
        // }
    }
    return props.children;
    //return <Redirect to="/login"> </Redirect>
   
}
export default Dashboard;   