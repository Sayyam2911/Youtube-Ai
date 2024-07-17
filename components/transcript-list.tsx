import {memo, useMemo} from "react";
import TranscriptItem from "@/components/transcript-item";

type Transcript = {
    text : string,
    startTime : number,
    endTime : number,
}

interface TranscriptListProps{
    transcript : Transcript[],
    searchInput : string,
}

function TranscriptList({transcript,searchInput}: TranscriptListProps){
    const filteredTranscripts = useMemo(() =>{
        return transcript ? transcript.filter((item) => item.text.toLowerCase() .includes(searchInput.toLowerCase())) : transcript
    },[transcript,searchInput])

    if(filteredTranscripts.length === 0){
        return (<div className={"flex justify-center items-center w-full h-32"}>
            <span className={"text-[12px]"}>No Results Found</span>
        </div>)
    }

    return <div>
        {filteredTranscripts.map((item) => (
            <TranscriptItem key={item.startTime} item = {item} searchInput={searchInput}/>
        ))}
    </div>
}

export default memo(TranscriptList,(prevProps,nextProps) => {
    return (
        prevProps.transcript === nextProps.transcript && prevProps.searchInput === nextProps.searchInput
    )
});

