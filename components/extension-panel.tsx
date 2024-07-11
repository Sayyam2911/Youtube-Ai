import { useExtension } from '../contexts/extension-context';
import Summary from "./summary";

export default function ExtensionPanels(){
    const {extensionPanel} = useExtension();
    return (
        <div>
            {extensionPanel == "Summary" && <Summary/>}
            {extensionPanel == "Transcript" && <h1>Transcript</h1>}
            {extensionPanel == "Chat" && <h1>Chat</h1>}
        </div>
    )
}