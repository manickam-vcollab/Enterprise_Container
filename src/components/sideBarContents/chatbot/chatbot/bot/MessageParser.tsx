import React from 'react';

const MessageParser = ({
    children,
    actions,
  }: {
    children: any;
    actions: {
      handleHello: () => void,
      handleCommand: (message : string) => void
    };
  }) => {
    const parse = (message : string) => {
      if (message.includes('hello')) {
        actions.handleHello();
      }
      else{
        actions.handleCommand(message);
      }
    };
  
    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            parse,
            actions,
          });
        })}
      </div>
    );
  };
  
  export default MessageParser;