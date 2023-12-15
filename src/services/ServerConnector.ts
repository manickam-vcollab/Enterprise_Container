import axios from "axios";
import { ServerLocation } from "./ServerLocation";
const restAPI = {
    reports : "/rest/v1/reports",
    models : "/rest/v1/models",
    roles_permissions_enterprise_gui : "/rest/v1/roles_permissions_enterprise_gui"
};

export const updateView = (reportId : string, viewData : any) =>{
    const url = `${ServerLocation.serverURL}${restAPI.reports}?id=eq.${reportId}&apikey=${ServerLocation.apiKey}`;
    const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
    axios.patch(url,viewData, customConfig)
        ///.then(res => console.log(res))
        .catch(error => console.log(error));
};

export const getView = async (reportId : string) =>{
    var returnObj : any = {
        data : null,
        error : null
    }
    try{
        const url = `${ServerLocation.serverURL}${restAPI.reports}?id=eq.${reportId}&apikey=${ServerLocation.apiKey}`;
        const response : any = await axios.get(url);
        if(response?.data[0]?.views)
            returnObj.data = response?.data[0]?.views;
    }
    catch(error){
        returnObj.error = error;
    }
    return returnObj;
};

export const getUserPermission = async (userRole :string) => {

    var returnObj : any = {
        data : null,
        error : null
    }
    try{
        const url = `${ServerLocation.serverURL}${restAPI.roles_permissions_enterprise_gui}?select=role_title,permissions&role_name=eq.${userRole}&apikey=${ServerLocation.apiKey}`;
        const response : any = await axios.get(url);
        if(response?.data[0]?.permissions)
            returnObj.data = response?.data[0]?.permissions;
    }
    catch(error){
        returnObj.error = error;
    }
    return returnObj;
};
