import {useExtension} from "@/contexts/extension-context";
import {useChat} from "@/contexts/chat-context";
import Textarea from "react-textarea-autosize"
import {cn} from "@/lib/utils";
import {useEffect, useRef} from "react";
import {useEnterSubmit} from "@/utils/hooks/use-enter-submit";
import {TooltipWrapper} from "@/@/components/ui/tooltip-wrapper";
import {Button} from "@/@/components/ui/button";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import generateChatCompletion from "~background/ports/chat";

interface PromptFormProps{
    className?: string;
}

export default function PromptForm({className}: PromptFormProps){
    const {extensionData} = useExtension()
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const {
        chatMessage,
        chatPrompt,
        setChatPrompt,
        setChatMessage,
        setChatIsGenerating,
        setChatIsError,
        chatModel
    } = useChat()

    const {formRef,onKeyUp,onKeyDown} = useEnterSubmit()

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function generateChat(model : string, messages: any){
        setChatIsGenerating(true)
        setChatIsError(false)
        try{
            const completion = await generateChatCompletion(model, messages, extensionData)
            const chatHistory = [...messages, {role: "assistant", content : ""}]
            let AssistantResponse = "";
            let Chats = [...chatHistory]
            for(let i=0; i<completion.message.length; i++){
                await delay(10);
                AssistantResponse += completion.message[i]
                Chats[Chats.length-1].content = AssistantResponse
                setChatMessage([...Chats])
            }
            setChatIsGenerating(false)
            setChatIsError(false);
        }
        catch(e){
            setChatIsError(true)
            setChatIsGenerating(false)
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <form className={cn("absolute bottom-0 z-10 p-4 w-full bg-white",className)} ref={formRef} onSubmit={async(e :any) => {
            e.preventDefault();
            if(window.innerWidth < 600){
                e.target["message"]?.blur()
            }
            const value = chatPrompt.trim()
            setChatPrompt("")
            if(value === "") return
            const initialMessage = [...chatMessage]
            setChatMessage([...initialMessage,{role: "user", content : value}]);
            await generateChat(chatModel.content, [...initialMessage, {role: "user", content : value}])
        }}>
            <div
                className={"relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-none border border-zinc-500"}>
                <Textarea value={chatPrompt} onChange={(e) => setChatPrompt(e.target.value)} className={
                    "min-h-[50px] w-full resize-none bg-transparent px-6 py-6 focus-within:outline-none text-[12px]"
                }
                          ref={inputRef} tabIndex={0} onKeyDown={onKeyDown} onKeyUp={onKeyUp}
                          placeholder={"Send a Message..."} autoFocus={true} spellCheck={false} autoComplete={"off"}
                          autoCorrect={"off"} name="message" rows={1}
                />

                <div className={"absolute right-0 top-[10px] pr-3 m-1"}>
                    <TooltipWrapper text={"Send Message"}>
                        <Button type={"submit"} size={"icon"} variant={"outline"} disabled={chatPrompt === ""}
                                className={"size-[32px] rounded-none focus:z-10 bg-transparent space-x-2 text-base flex items-center p-2 border border-zinc-700"}>
                            <PaperPlaneIcon className={"h-4.5 w-4.5"}/>
                        </Button>
                    </TooltipWrapper>
                </div>
            </div>
        </form>
    )
}