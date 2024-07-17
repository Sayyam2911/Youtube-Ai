import React from 'react'
import TranscriptList from "@/components/transcript-list";
import {useTranscript} from "@/contexts/transcript-context";
interface TranscriptContentProps{
    ref : React.RefObject<HTMLDivElement>
}

const TranscriptContent = React.forwardRef<HTMLDivElement,TranscriptContentProps>(
    (props,ref)=>{
        const {transcriptJSON,transcriptSearch} = useTranscript()
        return (<div ref = {ref}>
            <TranscriptList transcript={transcriptJSON} searchInput={transcriptSearch}/>
        </div>)
    }
)

export default TranscriptContent;