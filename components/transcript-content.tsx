import React from 'react'
interface TranscriptContentProps{
    ref : React.RefObject<HTMLDivElement>
}

const TranscriptContent = React.forwardRef<HTMLDivElement,TranscriptContentProps>(
    (props,ref)=>{
        return (<div ref = {ref}>

        </div>)
    }
)