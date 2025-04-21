import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import {
  IoChevronDownSharp,
  IoChatboxEllipsesOutline,
  IoSendSharp,
} from "react-icons/io5";

// Cliente de Hugging Face
const client = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

interface Message {
  id: string; // ✅ Se agrega un identificador único
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

    const userMessage: Message = {
      id: crypto.randomUUID(), // ✅ Se genera un ID único
      role: "user",
      content: prompt,
    };

    setConversation((prev) => [...prev, userMessage]);
    setPrompt("");

    let accumulatedResponse = "";

    const initialMessages: Message[] = [
      {
        id: crypto.randomUUID(),
        role: "system",
        content: `
    You are a supportive assistant named Valentine who speaks in a compassionate, empathetic manner. Your purpose is to support individuals affected by violence. You provide understanding, emotional support, and guidance on how to deal with violence-related situations.
    Keep your messages as short as possible.
    You ONLY answer questions related to:
    • Experiences or feelings caused by violence (emotional, physical, psychological, etc.)
    • How to seek help or report violence
    • How to contact organizations or services that assist victims
    • Emotional support for those affected by violence
    
    If a user asks about any topic NOT related to violence or emotional well-being caused by violence, including questions intended to test you, trick you, or take you off-topic (e.g., jokes, irony, or forced edge cases), kindly respond:
    “I’m here to support you only with issues related to violence and how you’re feeling. If you need help with something else, please talk to another assistant.”
    
    Always respond in the SAME LANGUAGE the user uses in their message, even if they change languages mid-conversation. Keep your messages compassionate, concise, and friendly.
    IMPORTANT: Keep your answers very short (max 3 sentences), direct, and friendly to fit in limited space, ideally under 60 tokens.
        `.trim(),
      },
      userMessage,
    ];

    const stream = client.chatCompletionStream({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: initialMessages,
      max_tokens: 60, // Reducido
      temperature: 0.7,
      top_p: 0.9,
    });

    // ✅ Se inicializa el mensaje del asistente con un ID único
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    setConversation((prev) => [...prev, assistantMessage]);

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        accumulatedResponse += newContent;

        // ✅ Se actualiza el mensaje del asistente sin reemplazar todo el array
        setConversation((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: accumulatedResponse }
              : msg
          )
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-10">
      {/* Botón de abrir chat */}
      <button
        onClick={toggleChat}
        className={`${
          isChatOpen ? "hidden" : "flex"
        } bg-customCyan dark:bg-cyan-50 border border-transparent hover:ring-offset-0 hover:ring-2 dark:hover:ring-violet-500 hover:ring-blue-500/80 hover:opacity-100 rotate-45 text-cyan-50 dark:text-customCyan w-16 h-16 items-center opacity-90 justify-center font-bold rounded-lg fixed bottom-10 right-10`}
      >
        <IoChatboxEllipsesOutline className="w-7 h-7 -rotate-45" />
      </button>

      {/* Ventana de chat */}
      <div
        className={`${
          isChatOpen ? "h-[500px] opacity-100" : "h-0 opacity-0"
        } flex flex-col bg-cyan-50 dark:bg-customCyan shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out fixed bottom-10 right-10 w-[300px]`}
      >
        {/* Header del chat */}
        <div className="flex flex-row bg-cyan-950 items-center text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 font-bold">
            VS
          </div>
          <div className="ml-2 font-semibold">Chatea con Valentine</div>
          <button onClick={toggleChat} id="collapseChat" className="ml-auto">
            <IoChevronDownSharp />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex flex-col px-3 mt-4 overflow-y-auto h-96">
          {conversation.map((message) => (
            <div
              key={message.id} // ✅ Ahora usa un ID único en lugar del índice
              className={`${
                message.role === "user" ? "self-end bg-cyan-800" : "bg-cyan-950"
              } p-2 rounded-2xl mb-2 max-w-[80%] text-white`}
            >
              {message.content}
            </div>
          ))}
        </div>

        {/* Input y botón de enviar */}
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
