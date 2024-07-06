import {Collapsible} from "../@/components/ui/collapsible";
import {useExtension} from "../contexts/extension-context";
import {useEffect} from "react";
import {getVideoData} from "../utils/functions";

export default function Extension(){
    const {
        extensionOpen,
        extensionTheme,
        extensionVideoId,
        setExtensionVideoId,
        setExtensionTheme,
        setExtensionLoading,
        setExtensionData,
        setExtensionContainer,
        setExtensionOpen
    } = useExtension()

    useEffect(() => {
        const getVideoId = () => {
            return new URLSearchParams(window.location.search).get('v')
        }
        const id = getVideoId()
        const fetchVideoData = async() => {
            const videoId = getVideoId()
            if(videoId && videoId !== extensionVideoId) {
                setExtensionVideoId(videoId)
                setExtensionLoading(true)
                // Fetch video data
                const data = await getVideoData(videoId)
                setExtensionData(data)
                setExtensionLoading(false)
            }
        }
        fetchVideoData()
        const intervalId = setInterval(fetchVideoData,2000)
        return () => clearInterval(intervalId)

    }, [extensionVideoId]);

    useEffect(() => {
        const getCSSVariable = (variable : string) => {
            const rootStyle = getComputedStyle(document.documentElement)
            return rootStyle.getPropertyValue(variable).trim();
        }
        const theme = getCSSVariable("--yt-spec-base-background")
        if(theme === "#fff"){
            setExtensionTheme("light")
        }
        else setExtensionTheme("dark")
        if(!theme) return null;
    },[])
    return (
      <main ref = {setExtensionContainer} className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
        <div className={'w-full'}>
            <Collapsible open= {extensionOpen} onOpenChange={setExtensionOpen} className={'space-y-3'}>
                <p>Extension Page</p>
            </Collapsible>
        </div>
      </main>
    )
}