import { useSummary } from "contexts/summary-context"
import {Button} from "@/@/components/ui/button"
import Markdown from "@/components/markdown";

export default function SummaryContent(){
    const {summaryContent, summaryIsGenerating, generateSummary} = useSummary()
    if(summaryIsGenerating){
        console.log("Generating")
    }
    if(summaryContent){
        console.log("Content")
    }
    if(!summaryContent && summaryIsGenerating){
        return (
            <div className={"flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]"}>
                <Button variant={'outline'} className={"w-full h-12 rounded-none focus:z-10 bg-transparent text-base border-zinc-700 flex items-center p-2"}>
                    <span className={"text-md"}>Generating Summary....</span>
                </Button>
            </div>
        )
    }
    if(!summaryContent && !summaryIsGenerating){
        return (
            <div className={"flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f] dark:text-white"}>
                <Button variant={'outline'} onClick={generateSummary} className={"w-full h-12 rounded-none focus:z-10 bg-transparent text-base border-zinc-700 flex items-center p-2"}>
                    <span className={"text-md"}>Generate Summary</span>
                </Button>
            </div>
        )
    }
    return (
        <div className={"flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]"}>
          <div className={"h-[550px] w-full px-3"}>
              <Markdown markdown={summaryContent} className={"pb-6"}/>
          </div>
        </div>
    )
}