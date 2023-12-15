import { PropsWithChildren } from 'react';
//import * as viewerAPIProxy from '../../backend/viewerAPIProxy';
import {  Chatbot as CB } from 'react-chatbot-kit';
import config from './bot/config';
import MessageParser from './bot/MessageParser';
import ActionProvider from './bot/ActionProvider';
import 'react-chatbot-kit/build/main.css'
import './index.css';

export interface Props {
    style?: React.CSSProperties
    viewerId : string
}

export default function Chatbot(props: PropsWithChildren<Props>) {
    return (
        <div style={{width:'100%', height:'100%'}}>
          <CB
            config = { config }
            messageParser = { MessageParser }
            actionProvider = { ActionProvider }
            headerText='VCollab Bot'
            placeholderText='Type here'
          />
        </div>
      );
}