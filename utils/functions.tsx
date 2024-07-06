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
            return {metadata,transcript};
        }
        else return {metadata, transcript : null};
    }
}