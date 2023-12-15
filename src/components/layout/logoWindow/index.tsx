import React, {useContext} from "react";
import { useAppSelector } from "store/storeHooks";
import FixedWindow from "components/shared/fixedWindow";
import {Layers} from 'store/windowMgrSlice';
import VCollabLogo from '../../../assets/images/vcollablogo.svg';
import { selectWindowSize } from "store/windowMgrSlice";
import { ViewerContext } from "../../App";
import { leftbarWidth } from '../../../config/index';

export const  windowId = "LogoWindow";
interface Props {
    parentRef: any,
    layerId:Layers
}
function LogoWindow(props:Props) {

    const width : number = 150;
    const height : number = 40;
    const viewerContainerRef = useContext(ViewerContext);      
    //const windowSize = useAppSelector((state)=> selectWindowSize(state, windowId));
    const getBody = () =>{
        if(viewerContainerRef?.current) {
            let xy :[number,number] = [ 0, 0 ];
            let rect = viewerContainerRef.current?.getBoundingClientRect();
            xy = [rect.right - (rect.x + width), rect.height - height];
            return (<FixedWindow autoPositionOnResize={false}  uid={windowId} layer={props.layerId} visible={true} resize parentRef = {props.parentRef}  width={width} height={height} xy={xy}    >
            {
                <div>
                    {/* Powered by VCollab <br /> */}
                    <br /> 
                    <img src={VCollabLogo} alt='logo'></img>
                    {/* 
                    <span style= {{ fontFamily: 'Montserrat', fontWeight: 300, color: '#9F9B9B', fontSize: '16px' }}>Powered by</span>
                    <span style= {{ fontFamily: 'Helios Stencil', fontStyle: 'italic', fontWeight: 'bold', color: '#000000', fontSize: '16px'}}>VC</span>
                    <span style= {{ fontFamily: 'Arial', fontStyle: 'italic', fontWeight: 'bold', color: '#D52B1E', fontSize: '16px'}}>OLL&#x245;B</span>
                    */}
                   
                </div>
            }
            </FixedWindow>)         
        }                        
        return null;
    }


   return getBody();
}
export default LogoWindow;