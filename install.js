const child = require("child_process");

(() => {
    if (process.platform != "win32") {
        try {
            child.execSync('command -v ffmpeg');
            console.log("FFMPEG already installed");
        } catch (e) {
            try {
                child.execSync("apt install -y ffmpeg");
                console.log("FFMPEG installed");
            } catch (r) {
                console.log("FFMPEG not installed\nPlease run : sudo apt install -y ffmpeg");
            }
        }
    }
})()