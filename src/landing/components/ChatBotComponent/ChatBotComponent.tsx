import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import {
  IoChevronDownSharp,
  IoChatboxEllipsesOutline,
  IoSendSharp,
} from "react-icons/io5";

// Use the same Hugging Face client from the original code
const client = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const ChatBotComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleStreamResponse = async () => {
    setLoading(true);

    const userMessage: Message = { role: "user", content: prompt };
    setConversation((prev) => [...prev, userMessage]);
    setPrompt("");

    let accumulatedResponse = "";

    const initialMessages: Message[] = [
      {
        role: "system",
        content:
          "You are a supportive assistant named Valentine who speaks in a compassionate, empathetic manner. You provide understanding, reassurance, and possible explanations. Always respond in the language the user uses in their prompt. Keep your messages concise and friendly.",
      },
      userMessage,
    ];

    const stream = client.chatCompletionStream({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: initialMessages,
      max_tokens: 500,
    });

    // Initialize a new assistant message
    setConversation((prev) => [...prev, { role: "assistant", content: "" }]);

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        accumulatedResponse += newContent;

        // Update the last assistant message
        setConversation((prev) => {
          const updatedConversation = [...prev];
          updatedConversation[updatedConversation.length - 1].content =
            accumulatedResponse;
          return updatedConversation;
        });
      }
    }

    setLoading(false);
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

        <div className="flex flex-col px-3 mt-4 overflow-y-auto h-96">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`
                ${
                  message.role === "user"
                    ? "self-end bg-cyan-800"
                    : "bg-cyan-950"
                } 
                p-2 rounded-2xl mb-2 max-w-[80%] text-white
              `}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="py-4 flex justify-center items-center">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-transparent w-60 dark:text-white rounded border-cyan-950 dark:border-cyan-50 h-8"
            placeholder="Escribe aquí tu mensaje..."
            disabled={loading}
          />
          <button
            onClick={handleStreamResponse}
            disabled={loading || !prompt.trim()}
            className="bg-cyan-950 rounded-full flex justify-center items-center m-1 text-white w-8 h-8 hover:scale-110"
          >
            <IoSendSharp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotComponent;
