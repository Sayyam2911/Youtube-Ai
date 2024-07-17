import {Button} from "@/@/components/ui/button";
import {memo, useState} from "react";
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

    function copySection(){
        if(isCopied) return;
        copyToClipboard(item.text)
    }

    const startTime = new Date(item.startTime).toISOString().substr(14,5)
    const endTime = new Date(item.endTime).toISOString().substr(14,5)
    return (<div>
        <div className={""}>
            <Button variant={'outline'} className={''} onClick={JumpToTime}>
                <ClockIcon className={'h-4 w-4'} />
                <span>
                    {startTime} : {endTime}
                </span>
            </Button>

            <div className={""}>
                <TooltipWrapper text={'Copy Section'}>
                    <Button variant={'outline'} size={'icon'} onClick={copySection}>
                        {isCopied ? (<CheckIcon className={'h-4.5 w-4.5'}/>):(
                            <ClipboardCopyIcon className={'h-4.5 w-4.5'}/>
                        )}
                    </Button>
                </TooltipWrapper>
            </div>
        </div>
    </div>)
}

export default memo(TranscriptItem);
