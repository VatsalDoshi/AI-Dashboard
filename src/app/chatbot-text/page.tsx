import ChatContentText from "./ChatContentText";
import ChatListText from "./ChatListText";

export default function PageText({ params }: { params: { chatId?: string[] } }) {
  const chatId = params.chatId?.[0];
  return (
    <div className="w-full h-full flex">
      <div className="w-80 h-full max-h-full border-r-2 border-neutral-300 dark:border-neutral-700 overflow-auto">
        <ChatListText />
      </div>
      <div className="h-full flex-1 flex flex-col">
        <ChatContentText />
      </div>
    </div>
  );
}
