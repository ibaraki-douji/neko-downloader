const NEKO = require("./lib/index");

(async () => {
    const search = new NEKO.Search("overlord iii");
    const animes = await search.get();

    const anime = animes[0];
    await anime.retrieveInfos();
    const eps = anime.getEpisodes();

    await eps[0].retrieveInfos();

    const stream = eps[0].getPStream();

    await stream.retrieveInfos();

    const downloader = stream.getDownloader();

    downloader.download("./" + anime.getNames()[1] + "-" + eps[0].getEpisode() + ".mp4", '1080', (code) => {
        console.log("Ends with code : " + code);
    }, (stdout) => {
        console.log("FFMPEG : " + stdout);
    });
})()