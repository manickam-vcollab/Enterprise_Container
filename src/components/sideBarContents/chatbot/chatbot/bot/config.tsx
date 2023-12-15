import { createChatBotMessage } from "react-chatbot-kit";
import IWidget from "react-chatbot-kit/build/src/interfaces/IWidget";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";

const botName = "VCollab Bot";

const config : IConfig = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${ botName }`,{})
  ],
  // customStyles: {
  //   botMessageBox: {
  //     backgroundColor: "#376B7E",
  //   },
  //   chatButton: {
  //     backgroundColor: "#376B7E",
  //   },
  // },
  customComponents: {
  },
  widgets: [
  ] as IWidget[],
};

export default config;
