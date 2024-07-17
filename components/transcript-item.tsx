import {Button} from "@/@/components/ui/button";
import {memo} from "react";
import {CheckIcon, ClipboardCopyIcon, ClockIcon} from "@radix-ui/react-icons";
import {TooltipWrapper} from "@/@/components/ui/tooltip-wrapper";
import {useCopyToClipboard} from "@/utils/hooks/use-copy-to-clipboard";

type Transcript = {
    text : string,
    startTime : number,
    endTime : number,
}

interface TranscriptItemProps{
    item : Transcript,
    searchInput : string,
}

function TranscriptItem({item,searchInput}: TranscriptItemProps){
    const player = document.querySelector("video")
    const {isCopied, copyToClipboard} = useCopyToClipboard({timeout : 2000})
    function JumpToTime(){
        player.currentTime = item.startTime/1000
    }

    const highlightText = (text : string, searchInput : string) : JSX.Element => {
        if(!searchInput) return <>{text}</>
        const parts = text.split(new RegExp(`(${searchInput})`, "gi"))
        return ( <>
            {parts.map((part, index) =>
                part.toLowerCase() === searchInput.toLowerCase() ? (
                    <mark key={index} style={{ backgroundColor: "yellow" }}>
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>)
    }

    function copySection(){
        if(isCopied) return;
        copyToClipboard(item.text)
    }

    const startTime = new Date(item.startTime).toISOString().substr(14,5)
    const endTime = new Date(item.endTime).toISOString().substr(14,5)


    return (<div data-start-time={item.startTime} data-end-time={item.endTime} className={'flex flex-col w-full justify-between items-center p-3 border-[0.5px] border-zinc-300 space-y-4 group'}>
        <div className={"w-full flex flex-row items-center justify-between"}>
            <Button variant={'outline'} className={'rounded-none bg-transparent space-x-2 text-base border-zinc-400 flex items-center p-2 dark:bg-transparent'} onClick={JumpToTime}>
                <ClockIcon className={'h-4 w-4'} />
                <span className={'text-blue-500 text-[11.5px] hover:cursor-pointer hover:underline'}>
                    {startTime} : {endTime}
                </span>
            </Button>

            <div className={"opacity-0 group-hover:opacity-100 transition-opacity duration-300 "}>
                <TooltipWrapper text={'Copy Section'}>
                    <Button variant={'outline'} size={'icon'} onClick={copySection} className={'rounded-none bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2'}>
                        {isCopied ? (<CheckIcon className={'h-4.5 w-4.5'}/>):(
                            <ClipboardCopyIcon className={'h-4.5 w-4.5'}/>
                        )}
                    </Button>
                </TooltipWrapper>
            </div>
        </div>
        <p className={"text-[11.5px] capitalize leading-7"}>
            {highlightText(item.text, searchInput)}
        </p>
    </div>)
}

export default memo(TranscriptItem);
