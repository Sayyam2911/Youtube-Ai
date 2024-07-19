import {useChat} from "@/contexts/chat-context";
import ChatItem from "@/components/chat-item";
import {useRef,useEffect} from "react"
import {cn} from "@/lib/utils";
import ChatEmptyScreen from "@/components/chat-empty-screen";

interface ChatListProps{
    className?: string;
}

export default function ChatList({className}: ChatListProps){
    const {chatMessage,setChatPrompt} = useChat()
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if(scrollContainer){
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    },[chatMessage])

    return (
        <div className={cn("pt-3 pb-8",className)}>
            {!chatMessage || chatMessage.length === 0 ? (
                <ChatEmptyScreen setChatPromptInput={setChatPrompt}/>
            ) : (
                <div ref={scrollContainerRef} className={"h-[375px] overflow-y-scroll no-scrollbar"}>
                    {chatMessage.map((message, index) => (
                        <ChatItem message={message} key={index}/>
                    ))}
                </div>
            )}
        </div>)
}