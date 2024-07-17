import {useSummary} from "@/contexts/summary-context";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/@/components/ui/select"
import {type Model, models, prompts} from "@/utils/constants";
import type {Prompt} from "@/utils/constants";
import { TooltipWrapper } from "@/@/components/ui/tooltip-wrapper";
import { Button } from "@/@/components/ui/button";
import { ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useCopyToClipboard } from "utils/hooks/use-copy-to-clipboard";
import { CheckIcon } from "lucide-react";

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

    return (
        <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-2.5 pb-2 px-3 dark:bg-[#0f0f0f] dark:text-white">
            <Select value={summaryModel.value} onValueChange={(value) => setSummaryModel(models.find((model) => model.value === value))} >
            <SelectTrigger className={"w-fit space-x-3 rounded-none focus:z-10 bg-transparent text-base border-zinc-700 flex items-center p-2"}>
                <SelectValue placeholder={"Model"} />
            </SelectTrigger>
                <SelectContent>
                    {models.map((model: Model) => (
                        <SelectItem value={model.value} key={model.value} >
                            <div className={"flex flex-row items-center"}>
                                <div className={"mr-2"}>
                                    {model.icon}
                                </div>
                                {model.label}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex flex-row space-x-2 ">
                <TooltipWrapper text={"Regenerate Summary"}>
                    <Button variant="outline" size="icon" onClick = {generateSummary} disabled={summaryIsGenerating} className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                        <ReloadIcon className="h-4.5 w-4.5"/>
                    </Button>
                </TooltipWrapper>

                <TooltipWrapper text={"Copy Summary"}>
                    <Button variant="outline" size="icon" onClick = {CopySummary} disabled={summaryIsGenerating} className="rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-700 flex items-center p-2">
                        {isCopied ? <CheckIcon className="h-4 w-4"/> : (<ClipboardCopyIcon className="h-4.5 w-4.5"/>)}
                    </Button>
                </TooltipWrapper>

                <Select value={summaryPrompt.value} onValueChange={(value) => setSummaryPrompt(prompts.find((prompt) => prompt.value === value))} >
            <SelectTrigger className={"w-fit space-x-3 rounded-none focus:z-10 bg-transparent text-base border-zinc-700 flex items-center p-2"}>
                <SelectValue />
            </SelectTrigger>
                <SelectContent>
                    {prompts.map((prompt: Prompt) => (
                        <SelectItem value={prompt.value} key={prompt.value} >
                                {prompt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            </div>
        </div>
    )
}