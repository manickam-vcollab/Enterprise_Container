import MuiGrid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';
import MuiCancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MuiCheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import MuiPauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ProcessIndicator from './processIndicator';
import DisplayTime from './displayTime';
import Divider from '@material-ui/core/Divider'
import {IconType,fileTransferUpdate} from '../../../../store/sideBar/messageSlice';
import styles from '../style';

import MuiIconButton from '@material-ui/core/IconButton';

import {useAppDispatch } from '../../../../store/storeHooks';

import sizeCalculator from '../../../../customHooks/useSizeCalculator';
import clsx from "clsx";

export default function CardTransfer(props:any){
    const {item, handleCollapse, handlePause, handleCancel, timeArrowDivider} = props;
    const classes = styles();
    const dispatch = useAppDispatch();

    // const fileSize = (size : number) => {
    //     if (size >= 1024) {
    //       const kbSize = size / 1024
    //       if (kbSize >= 1024) {
    //         const mbSize = kbSize / 1024
    //         if(mbSize >= 1024){
    //           const gbSize = mbSize / 1024;
    //           return `${ (Math.round(gbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} GB`
    //         }
    //         return `${ (Math.round(mbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} MB`
    //       }
    //       return `${Math.round(kbSize)} kB`
    //     }
    //     return `${size} B`
    //   }

    const getIcon = () => {
        switch(item.card.icon){
            case(IconType.COMPLETED):
                return(
                    <div className={classes.transferIcon}>
                        <MuiCheckCircleOutlineOutlinedIcon  fontSize="small"/>
                    </div>
                )
            
            case(IconType.CANCELLED):
                return(
                    <div className={classes.transferIcon}>
                        <MuiCancelOutlinedIcon  fontSize="small"/>
                    </div>
                )
            
            case(IconType.PAUSE):
                return(
                    <div className={classes.transferIcon}>
                        <MuiPauseCircleOutlineIcon  fontSize="small"/>
                    </div>
                )
            
            case(IconType.TRANSFERING):
                return(
                    <ProcessIndicator process= {item.card.data.totalSize==='Unknown' ? '? ' : Math.round(item.card.data.transfferedSize / item.card.data.totalSize * 100)}/>
                )
        }    
    }

       
    return(
        <MuiGrid container >
            <MuiGrid item xs={3}> </MuiGrid>
            <MuiGrid item xs={9}  >

                { timeArrowDivider ? <MuiGrid container>
                    <MuiGrid item  xs={9} className={classes.timeDisplay}>
                        <div>
                            <DisplayTime time={item.time}/>
                        </div>
                    </MuiGrid>
                    <MuiGrid item className={classes.arrowButton}>
                        <div >
                            <ExpandLess onClick={() => handleCollapse(item.id, true)}/>
                        </div>
                    </MuiGrid>
                </MuiGrid> : null}
                      
            </MuiGrid>
            
            <MuiGrid item className={classes.cardTopPadding}>
                <MuiGrid container >
                    <MuiGrid item xs={4}>
                        {getIcon()}
                    </MuiGrid>
                    <MuiGrid item xs={8}>
                        <MuiGrid container direction="column">
                            <MuiGrid item >
                                <div   className={classes.transferCard}>
                                    {item.card.title}
                                </div>
                            </MuiGrid>
                        </MuiGrid>
                        <MuiGrid item>
                            <MuiGrid container direction="column">
                                <MuiGrid item className={classes.cardTopPadding1}>
                                    <div >
                                        { item.card.data.cancel 
                                            ?
                                                "Cancelled"
                                            :
                                                item.card.icon === IconType.COMPLETED 
                                                    ?
                                                        `${sizeCalculator(item.card.data.transfferedSize)}`
                                                    :
                                                        `${sizeCalculator(item.card.data.transfferedSize)} / ${sizeCalculator(item.card.data.totalSize)}, ${item.card.data.timeLeft}`
                                        }
                                    </div>
                                </MuiGrid>
                                <MuiGrid item>
                                    {   item.card.icon === IconType.COMPLETED || item.card.data.cancel
                                        ?
                                            null
                                        :
                                            <MuiGrid container>
                                                <MuiGrid item className={classes.gap}>
                                                    <MuiButton className={classes.buttonStyle}
                                                        onClick={() => handlePause(item.id, item.card.data.pause)} 
                                                        color="primary"
                                                    >
                                                        {item.card.data.pause ? "Continue" : "Pause"}
                                                    </MuiButton>
                                                </MuiGrid>
                                                <MuiGrid item>
                                                    <MuiButton className={classes.buttonStyle}
                                                        onClick={() => handleCancel(item.id)} 
                                                        color="primary"
                                                    >   
                                                        Cancel
                                                    </MuiButton>
                                                </MuiGrid>
                                            </MuiGrid>
                                    }
                                </MuiGrid>
                            </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </MuiGrid>
            {timeArrowDivider ? <div style={{marginTop:'4px'}} className={classes.divider}></div> : null}
            </MuiGrid>
            
        </MuiGrid>
        
    )
}