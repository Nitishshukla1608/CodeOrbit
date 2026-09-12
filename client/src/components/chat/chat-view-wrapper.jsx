import { useParams } from "react-router-dom";
import { ChatView } from "@/components/chat/chat-view";

export  function ChatViewWrapper() {
  const { repoId } = useParams();

  return <ChatView repoId={repoId} />;
}