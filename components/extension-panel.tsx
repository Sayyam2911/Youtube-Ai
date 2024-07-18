import { useExtension } from '../contexts/extension-context';
import Summary from "./summary";
import Transcript from "./transcript";
import Chat from "@/components/chat";

export default function ExtensionPanels(){
    const {extensionPanel} = useExtension();
    return (
        <div>
            {extensionPanel == "Summary" && <Summary/>}
            {extensionPanel == "Transcript" && <Transcript/>}
            {extensionPanel == "Chat" && <Chat />}
        </div>
    )
}