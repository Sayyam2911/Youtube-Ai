import {useChat} from "@/contexts/chat-context";
import {type Model, models} from "@/utils/constants";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/@/components/ui/select";
import {cn} from "@/lib/utils";
import {TooltipWrapper} from "@/@/components/ui/tooltip-wrapper";
import {Button} from "@/@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {useExtension} from "@/contexts/extension-context";

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

    return (<div className={cn("flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-2.5 pb-2 px-3 dark:bg-[#0f0f0f] dark:text-white",className)}>
        <Select value={chatModel.value} onValueChange={(value) => setChatModel(models.find((model) => model.value === value))} >
            <SelectTrigger className={"w-fit space-x-3 rounded-none focus:z-10 bg-transparent text-base border-zinc-700 flex items-center p-2"}>
                <SelectValue placeholder={"Model"} />
            </SelectTrigger>
            <SelectContent>
                {models.map((model: Model) => (
                    <SelectItem value={model.value} key={model.value} >
                        <div className={"flex flex-row items-center"}>
                            <div className={"mr-2"}>
                                {model.icon}
                            </div>
                            {model.label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <div className="flex flex-row space-x-2 ">
            <TooltipWrapper text={"New Chat"}>
                <Button variant="outline" size="icon" onClick = {resetChat} disabled={chatIsGenerating || extensionLoading} className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                    <PlusIcon className="h-4.5 w-4.5"/>
                    <span>New Chat</span>
                </Button>
            </TooltipWrapper>
        </div>
    </div>)
}