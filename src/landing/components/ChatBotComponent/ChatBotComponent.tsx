import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function toggleChat() {
  const toggleButton = document.getElementById("toggleChat");
  const chatContainer = document.getElementById("chatContainer");
  const collapseChat = document.getElementById("collapseChat");

  if (toggleButton && chatContainer) {
    chatContainer.classList.toggle("hidden");
    toggleButton.classList.toggle("hidden");
  }
  if (collapseChat && chatContainer && toggleButton) {
    chatContainer.classList.toggle("visible");
    toggleButton.classList.toggle("visible");
    collapseChat.classList.toggle("visible");
  }
}

const ChatBotComponent = () => {
  return (
    <div className="flex rounded-lg">
      <div className="flex flex-row h-full bg-cyan-50 dark:bg-customCyan shadow-2xl rounded-lg">
        <button
          onClick={toggleChat}
          id="toggleChat"
          className="bg-cyan-950 hover:bg-cyan-700 text-white w-10 h-10 flex items-center justify-center font-bold rounded-lg"
        >
          <IoChatboxEllipsesOutline className="w-7 h-7" />
        </button>
        <div id="chatContainer" className="hidden flex flex-col ">
          <div className="flex flex-row bg-cyan-950 items-center text-white p-3 rounded-t-lg">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 font-bold">
              VS
            </div>
            <div className="ml-2 font-semibold">Chatea con Valentine</div>
            <button onClick={toggleChat} id="collapseChat" className="ml-2">
              <IoChevronDownSharp />
            </button>
          </div>
          <svg
            id="visual"
            width="280"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-cyan-950"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <path
              d="M0 19L5.5 19.2C11 19.3 22 19.7 33.2 21.8C44.3 24 55.7 28 66.8 29C78 30 89 28 100 25C111 22 122 18 133.2 19.2C144.3 20.3 155.7 26.7 166.8 26.8C178 27 189 21 200 20.3C211 19.7 222 24.3 233.2 24.5C244.3 24.7 255.7 20.3 266.8 17.7C278 15 289 14 294.5 13.5L300 13L300 0L294.5 0C289 0 278 0 266.8 0C255.7 0 244.3 0 233.2 0C222 0 211 0 200 0C189 0 178 0 166.8 0C155.7 0 144.3 0 133.2 0C122 0 111 0 100 0C89 0 78 0 66.8 0C55.7 0 44.3 0 33.2 0C22 0 11 0 5.5 0L0 0Z"
              stroke-linecap="round"
              stroke-linejoin="miter"
            ></path>
          </svg>
          <div className="flex flex-col px-3 mt-4 text-white">
            <div className="bg-cyan-950 p-2 rounded-2xl mb-2">
              Mensaje del chatbot
            </div>
            <div className="bg-cyan-800 p-2 rounded-2xl self-end mb-2">
              Tu mensaje
            </div>
          </div>
          <div className="py-4 flex justify-center items-center">
            <input
              className="bg-transparent p-2 dark:text-white rounded border-cyan-950 dark:border-cyan-50 h-7"
              placeholder="Ingresa tu mensaje"
            />
            <button className="bg-cyan-950 rounded-full flex justify-center items-center m-1 text-white w-8 h-8 hover:scale-110">
              <IoPaperPlaneOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotComponent;