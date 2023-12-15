
import { useAppSelector} from '../../../store/storeHooks';
import {selectActiveViewerID} from '../../../store/appSlice';

import Simplechatbot from './chatbot2/index';
import Chatbotkit from './chatbot/index';

export default function Chatbot() {

    const activechatbot:string = '1';
    const viewerId = useAppSelector(selectActiveViewerID);

    return (
        activechatbot === '1' ? <Chatbotkit viewerId = { viewerId }/> : <Simplechatbot viewerId = { viewerId }/>
    )
}