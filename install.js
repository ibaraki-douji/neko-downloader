const child = require("child_process");
const ZIP = require("adm-zip");
const https = require("https")
const fs = require('fs');
const Stream = require('stream').Transform;
const { pipeline } = require('stream');
const zlib = require('zlib');


(() => {
    if (process.platform == "win32") {
        try {
            child.execSync("mkdir ffmpeg");
        } catch (e) {}
        https.get("https://komine.fr/ffmpeg.zip", (res) => {
            var data = [];
            console.log("Downloading FFMPEG ZIP")

            res.on('data', function (chunk) {
                data.push(chunk);
            });

            res.on('end', function (x) {
                console.log("Downloaded FFMPEG ZIP")
                fs.writeFileSync(__dirname + "/ffmpeg.zip", Buffer.concat(data));
                console.log("Extracting ZIP")
                const zip = new ZIP(__dirname + "/ffmpeg.zip");
                zip.extractEntryTo("ffmpeg-N-101394-g94bf3f90e9-win64-gpl-vulkan/bin/", __dirname + "/ffmpeg", false);
                child.execSync("del \"" + __dirname + "\\ffmpeg.zip\"");
                console.log("Exctracted ZIP")
            });
        });/* */

       
    }
})()