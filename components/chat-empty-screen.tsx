import {IconSparkles} from "@/components/ui/icons";
import {Button} from "@/@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";

interface chatEmptyScreenProps {
    className?: string;
    setChatPromptInput: (value: any) => void;
}

const exampleMessages = [
    {
        heading: "What is the video about ?",
        message: "Can you tell me about the video?"
    },
    {
        heading : "What are the key points ?",
        message : "What are the key points of the video?"
    },
    {
        heading : "What are the main takeaways ?",
        message : "What are the main takeaways of the video?"
    },
    {
        heading: "What are the main topics ?",
        message: "What are the main topics discussed in the video?"
    }
]

export default function ChatEmptyScreen({ className, setChatPromptInput }: chatEmptyScreenProps) {
    return <div className={cn("mx-auto px-8 dark:bg-[#0f0f0f] dark:text-white",className)}>
        <div className={"rounded-md bg-background p-8 w-full justify-center flex flex-col items-center"}>
            <span className={"font-bold text-2xl flex items-center mb-4"}>
                Youtube <IconSparkles className={"inline mr-0 ml-0.5 w-4 sm:w-5 mb-1"}/>
                AI
            </span>
            <p className={"text-base text-center text-muted-foreground leading-normal mb-4"}>
                A Conversational AI Extension For Youtube Videos That Allows Users to
                Interact Directly with Content. Ask Specific Questions or Seek Detailed
                Information About any Part of the Video.
            </p>

            <p className={"text-base leading-normal text-muted-foreground mb-4"}>
                Try an Example :
            </p>
            <div className={"flex flex-col items-start space-y-3 justify-start"}>
                {exampleMessages.map((message, index) => (
                    <Button key={index} variant={"outline"} onClick={() => setChatPromptInput(message.message)} className={"h-auto w-full rounded-none focus:z-10 bg-transparent space-x-2 text-base border-zinc-400 flex flex-row items-center p-2"}>
                        <ArrowRightIcon className={"mr-2 text-muted-foreground"}/>
                        {message.heading}
                    </Button>
                ))}
            </div>
        </div>
    </div>
}