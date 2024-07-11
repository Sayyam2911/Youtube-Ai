import { useSummary } from "contexts/summary-context"
import SummarySkeleton from "./summary-skeleton"
import {Button} from "@/@/components/ui/button"

export default function SummaryContent(){
    const {summaryContent, summaryIsGenerating, generateSummary} = useSummary()
    if(summaryIsGenerating){
        console.log("Generating")
    }
    if(summaryContent){
        console.log("Content")
    }
    if(!summaryContent && !summaryIsGenerating){
        return (
            <div>
                <SummarySkeleton />
            </div>
        )
    }
    if(!summaryContent && !summaryIsGenerating){
        return (
            <div>
                <Button onClick={generateSummary}>
                    <span>Generate Summary</span>
                </Button>
            </div>
        )
    }
    return (
        <div>
          <div>{summaryContent}</div>
        </div>
    )
}