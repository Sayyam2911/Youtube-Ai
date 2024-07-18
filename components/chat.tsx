import ChatActions from "@/components/chat-actions";
import PromptForm from "@/components/chat-prompt-form";

export default function Chat(){
    return (
        <div className={"w-full h-[398px] relative bg-white"}>
            <ChatActions />
            <PromptForm />
        </div>
    )
}