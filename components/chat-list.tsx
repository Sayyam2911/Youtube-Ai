import {useChat} from "@/contexts/chat-context";
import ChatItem from "@/components/chat-item";
import {useRef,useEffect} from "react"
import {cn} from "@/lib/utils";

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

    return (<div className={cn("pt-8",className)}>
        <div ref={scrollContainerRef} className={"h-[375px] overflow-y-scroll no-scrollbar"}>
            {chatMessage.map((message, index) => (
                <ChatItem message={message} key={index}/>
            ))}
        </div>
    </div>)
}