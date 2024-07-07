import {Button} from "../@/components/ui/button";
import {ActivityLogIcon, CardStackPlusIcon, CaretSortIcon, ChatBubbleIcon, Pencil2Icon, CheckIcon, Link2Icon} from "@radix-ui/react-icons";
import {useExtension} from "../contexts/extension-context";
import {TooltipWrapper} from "../@/components/ui/tooltip-wrapper";
import {useCopyToClipboard} from "../utils/hooks/use-copy-to-clipboard";
import {CollapsibleTrigger} from "@radix-ui/react-collapsible";

export default function ExtensionActions() {
    const {setExtensionPanel, extensionOpen, setExtensionOpen} = useExtension()

    const {isCopied, copyToClipboard} = useCopyToClipboard({timeout: 2000})

    function CopyVideoUrl() {
        if(isCopied) return;
        copyToClipboard(window.location.href)
    }

    return (
        <div className={"border border-zinc-400 rounded-md flex items-center justify-between p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800"}>
            <CardStackPlusIcon className={'h-6 w-6 opacity-60 ml-2'}/>
            <div className = {'flex justify-center items-center space-x-2'}>
                <div className={'flex -space-x-px justify-around mx-5'}>
                    <Button variant="outline"
                            onClick={() => {
                                setExtensionPanel("Summary")
                                if(!extensionOpen) {
                                    setExtensionOpen(true)
                                }
                            }}
                            className = {
                        "rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2"
                    }>
                        <Pencil2Icon className = "h-4 w-4 mx-0.5"/>
                        <span className={'font-xl px-1'}>Summary</span>
                    </Button>
                    <Button variant="outline"
                            onClick={() => {
                                setExtensionPanel("Transcript")
                                if(!extensionOpen) {
                                    setExtensionOpen(true)
                                }
                            }}
                            className = {
                                "rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2"
                            }>
                        <ActivityLogIcon className = "h-4 w-4 mx-0.5"/>
                        <span className={'font-xl px-1'}>Transcript</span>
                    </Button>
                    <Button variant="outline"
                            onClick={() => {
                                setExtensionPanel("Chat")
                                if(!extensionOpen) {
                                    setExtensionOpen(true)
                                }
                            }}
                            className = {
                                "rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2"
                            }>
                        <ChatBubbleIcon className = "h-4 w-4 mx-0.5"/>
                        <span className={'font-xl px-1'}>Chat</span>
                    </Button>
                </div>
                <TooltipWrapper text={'Copy Video Url'}>
                    <Button variant={'outline'} size={'icon'} onClick={() => CopyVideoUrl()} className = {
                        "rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2"
                    }>
                    {isCopied ? (<CheckIcon className={'h-5.5 w-5.5'}/>):(
                        <Link2Icon className={'h-5.5 w-5.5'}/>
                    )}
                    </Button>
                </TooltipWrapper>

                <CollapsibleTrigger asChild>
                    <Button variant={'outline'} size={'icon'} className = {
                        "rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2"
                    }>
                        <CaretSortIcon className={'h-5.5 w-5.5'}/>
                    </Button>
                </CollapsibleTrigger>
            </div>
        </div>
    )
}