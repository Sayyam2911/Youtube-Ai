import {ClipboardCopyIcon, Crosshair1Icon, MagnifyingGlassIcon, ReloadIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {useTranscript} from "@/contexts/transcript-context";
import {useExtension} from "@/contexts/extension-context";
import {TooltipWrapper} from "@/@/components/ui/tooltip-wrapper";
import {Button} from "@/@/components/ui/button";
import {CheckIcon} from "lucide-react";
import {useCopyToClipboard} from "@/utils/hooks/use-copy-to-clipboard";
import {cleanTextTranscript} from "@/utils/functions";

interface TranscriptActionProps {
    jumpCurrentTime : () => void
}

export default function TranscriptAction({jumpCurrentTime} : TranscriptActionProps){

    const {transcriptSearch, setTranscriptSearch, transcriptJSON} = useTranscript()
    const {extensionLoading, extensionData} = useExtension()
    const {isCopied, copyToClipboard} = useCopyToClipboard({timeout: 2000})

    function CopyTranscript(){
        if(isCopied || !extensionData.transcript) return
        const processed = cleanTextTranscript(extensionData.transcript)
        console.log(processed)
        copyToClipboard(processed)
    }

    return <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-3 px-3 space-x-4 dark:bg-[#0f0f0f]">
        <div className="relative w-full dark:bg-[#0f0f0f] dark:text-white">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 dark:text-white"/>
            <Input
                type="text"
                placeholder="Search Transcript"
                className="w-full h-12 focus:z-10 rounded-none bg-transparent text-base border-zinc-700 flex items-center pl-8
                           focus:outline-none focus:ring-0 focus:border-zinc-700
                           dark:focus:border-zinc-700 dark:focus:ring-0 dark:focus:ring-offset-0"
                onChange={(e) => {
                    e.preventDefault()
                    setTranscriptSearch(e.currentTarget.value)
                }}
                disabled={extensionLoading && transcriptJSON.length === 0}
                onKeyUp={(e) => {
                    e.stopPropagation();
                }}
                onKeyDown={(e) => {
                    e.stopPropagation();
                }}
            />
        </div>
        <div className="flex flex-row space-x-2 dark:bg-[#0f0f0f] dark:text-white">
            <TooltipWrapper text={"Jump To Current Time"}>
                <Button variant="outline" size="icon" onClick={jumpCurrentTime} disabled={extensionLoading || transcriptJSON.length === 0}
                        className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                    <Crosshair1Icon className="h-4.5 w-4.5"/>
                </Button>
            </TooltipWrapper>

            <TooltipWrapper text={"Copy Transcript"}>
                <Button variant="outline" size="icon" onClick={CopyTranscript} disabled={extensionLoading || transcriptJSON.length === 0}
                        className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                    {isCopied ? <CheckIcon className="h-4 w-4"/> : (<ClipboardCopyIcon className="h-4.5 w-4.5"/>)}
                </Button>
            </TooltipWrapper>
        </div>
    </div>
}