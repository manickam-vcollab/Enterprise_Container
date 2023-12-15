import React , { PropsWithChildren }from 'react';
import ChatBot from 'react-simple-chatbot';
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';

export interface Props {
  style?: React.CSSProperties
  viewerId : string
}

export default function ChatBox(props: PropsWithChildren<Props>) {

  // handle user message
    const handlePreviousvalue =(previousSteps:any):string => {
      try {
        const scopedEval = (scope : any, script : string) => Function(`"use strict"; ${script}`).bind(scope)();
        scopedEval({ viewerAPIProxy, viewerId : '' },`return this.viewerAPIProxy.${previousSteps.previousValue}`);
        return 'Executed successfully!'
      }
      catch(e: unknown ){
          let msg = "Unknown Error";
          if (typeof e === "string") {
          return msg = e.toUpperCase() // works, `e` narrowed to string
          } else if (e instanceof Error) {
            return msg = e.message // works, `e` narrowed to Error
          }
          return "Error" + msg
      }
    }

    return (
        <ChatBot
        style={{width:'100%',height:'100vh'}}
        contentStyle={{height:'85vh'}}
        headerTitle="VCollab Chatbot"
        steps={[
          {
            id: '1',
            message: 'Hello. Nice to meet you.',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: (previousValue:any) => handlePreviousvalue(previousValue),
            trigger: '2',
          },
          // {
          //   id: '4',
          //   component: (
          //     <div style={{backgroundColor:'red',width:'100%'}}> This is an example component </div>
          //   ),
          //   trigger: '2',
          // },

        ]}
          
          />

)
}
