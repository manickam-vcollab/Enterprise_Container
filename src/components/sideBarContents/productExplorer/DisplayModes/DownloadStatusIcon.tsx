import React from 'react'
import DownloadIcon from "../../../icons/downloadProcessIcon";
import DownloadedIcon from "@material-ui/icons/Done";
import ReportProblemIcon from "@material-ui/icons/ReportProblem"
import CircularProgress from "@material-ui/core/CircularProgress";
import {DownloadStates} from "../../../../store/sideBar/displayModesSlice";
import { useTheme } from '@material-ui/core/styles';




const Render = (props:any) => {
    const theme = useTheme();
        switch (props.downloadState) {
            case DownloadStates.DOWNLOADED:
                return < DownloadedIcon  />
            case DownloadStates.IN_PROGRESS:
                return <CircularProgress color='inherit' size={20} ></CircularProgress>
            case DownloadStates.NOT_DOWNLOADED:
                return <DownloadIcon color={theme.palette.text.primary}/>
            case DownloadStates.NO_DATA_AVAILABLE:
                return <ReportProblemIcon/>
            default:
                return null;
        }
}

export function DownloadStatusIcon(props:any) {

    return (
        <>
         <Render downloadState = {props.status}></Render>
        </>
    )
}

export default DownloadStatusIcon
