import {useChat} from "@/contexts/chat-context";
import {models} from "@/utils/constants";
import {cn} from "@/lib/utils";
import {TooltipWrapper} from "@/@/components/ui/tooltip-wrapper";
import {Button} from "@/@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {useExtension} from "@/contexts/extension-context";
import {ChevronDown} from "lucide-react";

interface ChatActionsProps{
    className ?: string,
}

export default function ChatActions({className}: ChatActionsProps){
    const {chatModel,
    chatIsGenerating,
    setChatMessage,
    setChatIsGenerating,
    setChatIsError,
    setChatModel} = useChat()

    const {extensionLoading} = useExtension()

    function resetChat(){
        setChatMessage([]);
        setChatIsGenerating(false)
        setChatIsError(false);
    }

    function changeModel(){
        const index = models.findIndex((model) => model.value === chatModel.value)
        if(index === models.length - 1){
            setChatModel(models[0])
        } else {
            setChatModel(models[index + 1])
        }
    }

    return (<div
        className={cn("flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-2.5 pb-2 px-3 dark:bg-[#0f0f0f] dark:text-white", className)}>
        <Button className={"w-fit space-x-3 rounded-none bg-transparent text-base border border-zinc-700 flex items-center p-2"} onClick={changeModel}>
            <div className={"flex flex-row items-center"}>
                <div className={"mr-2"}>
                    {chatModel.icon}
                </div>
                {chatModel.label}
                <div className={"ml-2"}>
                    <ChevronDown className={"h-4 w-4"}/>
                </div>
            </div>
        </Button>
        <div className="flex flex-row space-x-2 w-[100px]">
            <TooltipWrapper text={"New Chat"}>
                <Button variant="outline" size="icon" onClick={resetChat}
                        disabled={chatIsGenerating || extensionLoading}
                        className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2 w-[100px]">
                    <PlusIcon className="h-4.5 w-4.5"/>
                    <span>New Chat</span>
                </Button>
            </TooltipWrapper>
        </div>
    </div>)
}