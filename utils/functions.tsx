const YT_INITIAL_PLAYER_RESPONSE = /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/

function compareTracks(a: any, b: any){
    const langCode1 = a.languageCode;
    const langCode2 = b.languageCode;

    if(langCode1 === "en" && langCode2 !== "en"){
        return -1; // Eng comes first
    }
    else if(langCode1 !== "en" && langCode2 === "en"){
        return 1; // Eng comes first
    }
    else if(a.kind !== 'asr' && b.kind === 'asr'){
        return -1; // Non-ASR comes first
    }
    else if(a.kind === 'asr' && b.kind !== 'asr'){
        return 1; // Non-ASR comes first
    }
    return 0; // Preserve order
}

export async function getVideoData(id: string){
    //@ts-ignore
    let player = window.ytInitialPlayerResponse
    if(!player || id !== player.videoDetails.videoId){
        const pageData = await fetch(`https://www.youtube.com/watch?v=${id}`)
        const body = await pageData.text();
        const playerResponseMatch = body.match(YT_INITIAL_PLAYER_RESPONSE)
        if(!playerResponseMatch){
            console.log("Unable To Parse Player Response")
            return;
        }
        player = JSON.parse(playerResponseMatch[1]);
    }
    const metadata = {
        title : player.videoDetails.title,
        duration : player.videoDetails.lengthSeconds,
        author : player.videoDetails.author,
        views : player.videoDetails.viewCount,
    }

    if(player.captions && player.captions.playerCaptionsTracklistRenderer){
        const tracks = player.captions.playerCaptionsTracklistRenderer.captionTracks
        if(tracks && tracks.length > 0){
            tracks.sort(compareTracks);
            const transcriptResponse = await fetch(tracks[0].baseUrl + "&fmt=json3");
            const transcript = await transcriptResponse.json();
            console.log("Transcript: ", transcript)
            console.log("Metadata: ", metadata)
            return {metadata,transcript};
        }
        else return {metadata, transcript : null};
    }
}

export function cleanJsonTranscript(transcript: any){
    const chunks = []
    let currentChunk = ""
    let currentStartTime = transcript.events[0].tStartMs
    let currentEndTime = currentStartTime

    transcript.events.forEach((event : any) => {
        event.segs?.forEach((seg) => {
            const segmentText = seg.utf8.replace(/\n/g, " ");
            currentEndTime = event.tStartMs + (seg.tOffsetMs || 0)
            if((currentChunk + segmentText).length > 300){
                chunks.push({text: currentChunk.trim(),
                    startTime: currentStartTime,
                    endTime: currentEndTime})
                currentChunk = segmentText
                currentStartTime = currentEndTime
            }
            else {
                currentChunk += segmentText
            }
        })
    })

    if(currentChunk.length > 0){
        chunks.push({text: currentChunk.trim(),
            startTime: currentStartTime,
            endTime: currentEndTime})
    }

    return chunks;
}

export function cleanTextTranscript(transcript : any){
    let textLines = [];
    let tempText = ""
    let lastTime = 0

    transcript.events.forEach((event) => {
        if (event.segs) {
            event.segs?.forEach((seg) => {
                const segmentStartTimeMs = event.tStartMs + (seg.tOffsetMs || 0)

                if (
                    tempText &&
                    (segmentStartTimeMs - lastTime > 1000 || seg.utf8 === "\n")
                ) {
                    const timeFormatted = new Date(lastTime).toISOString().substr(11, 12)
                    textLines.push(`${timeFormatted}: ${tempText.trim()}`)
                    tempText = ""
                }

                lastTime = segmentStartTimeMs
                tempText += seg.utf8
            })
        }
    })

    if (tempText) {
        const timeFormatted = new Date(lastTime).toISOString().substr(11, 12)
        textLines.push(`${timeFormatted}: ${tempText.trim()}`)
    }
    return textLines.join("\n")
}