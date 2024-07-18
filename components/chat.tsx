import ChatActions from "@/components/chat-actions";
import PromptForm from "@/components/chat-prompt-form";
import ChatList from "@/components/chat-list";

export default function Chat(){
    return (
        <div className={"w-full h-[498px] relative bg-white"}>
            <ChatActions />
            <ChatList />
            <PromptForm />
        </div>
    )
}