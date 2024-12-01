import {
  IoChevronDownSharp,
  IoChatboxEllipsesOutline,
  IoSendSharp,
} from "react-icons/io5";

import { useState } from "react";

const ChatBotComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-10 right-10">
      <button
        onClick={toggleChat}
        className={`${
          isChatOpen ? "hidden" : "flex"
        } bg-customCyan border border-transparent hover:ring-offset-0 hover:ring-2 hover:ring-blue-500/80 hover:opacity-100 rotate-45 text-white w-16 h-16 items-center opacity-90 justify-center font-bold rounded-lg fixed bottom-10 right-10`}
      >
        <IoChatboxEllipsesOutline className="w-7 h-7 -rotate-45" />
      </button>

      <div
        className={`${
          isChatOpen ? "h-[500px] opacity-100" : "h-0 opacity-0"
        } flex flex-col bg-cyan-50 dark:bg-customCyan shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out fixed bottom-10 right-10 w-[300px]`}
      >
        <div className="flex flex-row bg-cyan-950 items-center text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 font-bold">
            VS
          </div>
          <div className="ml-2 font-semibold">Chatea con Valentine</div>
          <button onClick={toggleChat} id="collapseChat" className="ml-auto">
            <IoChevronDownSharp />
          </button>
        </div>

        <div className="flex flex-col px-3 mt-4 text-white h-96">
          <div className="bg-cyan-950 p-2 rounded-2xl mb-2">
            Mensaje del chatbot
          </div>
          <div className="bg-cyan-800 p-2 rounded-2xl self-end mb-2">
            Tu mensaje
          </div>
        </div>

        <div className="py-4 flex justify-center items-center">
          <input
            className="bg-transparent w-60 dark:text-white rounded border-cyan-950 dark:border-cyan-50 h-8"
            placeholder="Escribe aquí tu mensaje..."
          />
          <button className="bg-cyan-950 rounded-full flex justify-center items-center m-1 text-white w-8 h-8 hover:scale-110">
            <IoSendSharp className="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotComponent;
