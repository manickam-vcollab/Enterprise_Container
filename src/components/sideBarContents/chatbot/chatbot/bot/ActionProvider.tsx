import React from 'react';
import * as viewerAPIProxy from '../../../../../backend/viewerAPIProxy';
import { IMessageOptions } from "react-chatbot-kit/build/src/interfaces/IMessages";

type CreateChatBotMessage = (
    message: string,
    options: IMessageOptions
  ) => {
    loading: boolean;
    widget?: string;
    delay?: number;
    payload?: any;
    message: string;
    type: string;
    id: number;
  };

const ActionProvider = ({
    createChatBotMessage,
    setState,
    children,
  }: {
    createChatBotMessage: CreateChatBotMessage
    setState: any;
    children: any;
  }) => {

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.', {});

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleCommand = (message : string) => {
    let botMessage = createChatBotMessage("", {});;
    try{
      // eslint-disable-next-line no-new-func
      const scopedEval = (scope : any, script : string) => Function(`"use strict"; ${script}`).bind(scope)();
      scopedEval({ viewerAPIProxy, viewerId : '' },`return this.viewerAPIProxy.${message}`);
      botMessage = createChatBotMessage("Executed successfully!", {});
    }
    catch(e: unknown ){
      let msg = "Unknown Error";
      if (typeof e === "string") {
        msg = e.toUpperCase() // works, `e` narrowed to string
      } else if (e instanceof Error) {
        msg = e.message // works, `e` narrowed to Error
      }
      botMessage = createChatBotMessage("Error"  + msg , {});
    }

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleCommand
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;