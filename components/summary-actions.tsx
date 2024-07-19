import {useSummary} from "@/contexts/summary-context";
import {type Model, models, prompts} from "@/utils/constants";
import { TooltipWrapper } from "@/@/components/ui/tooltip-wrapper";
import { Button } from "@/@/components/ui/button";
import { ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useCopyToClipboard } from "utils/hooks/use-copy-to-clipboard";
import {CheckIcon, ChevronDown} from "lucide-react";

export default function SummaryActions(){
    const {
        summaryPrompt,
        summaryIsGenerating,
        summaryModel,
        summaryContent,
        setSummaryPrompt,
        setSummaryModel,
        generateSummary
    } = useSummary()

    const {isCopied,copyToClipboard} = useCopyToClipboard({timeout: 2000})

    function CopySummary(){
        if(isCopied || !summaryContent || summaryIsGenerating) return;
        else copyToClipboard(summaryContent)
    }

    function changeModel(){
        const index = models.findIndex((model) => model.value === summaryModel.value)
        if(index === models.length - 1){
            setSummaryModel(models[0])
        } else {
            setSummaryModel(models[index + 1])
        }
    }

    function changePrompt() {
        const index = prompts.findIndex((prompt) => prompt.value === summaryPrompt.value)
        if (index === prompts.length - 1) {
            setSummaryPrompt(prompts[0])
        } else {
            setSummaryPrompt(prompts[index + 1])
        }
    }

    return (
        <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-2.5 pb-2 px-3 dark:bg-[#0f0f0f] dark:text-white">
            <Button className={"w-fit space-x-3 rounded-none bg-transparent text-base border border-zinc-700 flex items-center p-2"} onClick={changeModel}>
                <div className={"flex flex-row items-center"}>
                    <div className={"mr-2"}>
                        {summaryModel.icon}
                    </div>
                    {summaryModel.label}
                    <div className={"ml-2"}>
                        <ChevronDown className={"h-4 w-4"}/>
                    </div>
                </div>
            </Button>
            <div className="flex flex-row space-x-2 ">
                <TooltipWrapper text={"Regenerate Summary"}>
                    <Button variant="outline" size="icon" onClick={generateSummary} disabled={summaryIsGenerating}
                            className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                        <ReloadIcon className="h-4.5 w-4.5"/>
                    </Button>
                </TooltipWrapper>

                <TooltipWrapper text={"Copy Summary"}>
                    <Button variant="outline" size="icon" onClick = {CopySummary} disabled={summaryIsGenerating} className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                        {isCopied ? <CheckIcon className="h-4 w-4"/> : (<ClipboardCopyIcon className="h-4.5 w-4.5"/>)}
                    </Button>
                </TooltipWrapper>

                <Button className={"w-fit space-x-3 rounded-none bg-transparent text-base border border-zinc-700 flex items-center p-2"} onClick={changePrompt}>
                    <div className={"flex flex-row items-center"}>
                        {summaryPrompt.label}
                        <div className={"ml-2"}>
                            <ChevronDown className={"h-4 w-4"}/>
                        </div>
                    </div>
                </Button>
            </div>
        </div>
    )
}