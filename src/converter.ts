import * as child from 'child_process'
import * as fs from 'fs'

export class Converter {

    private quality: any = {};

    constructor (quality: any) {
        this.quality = quality;
    }

    download(path: string, quality: string, callback: (code: number) => {}, stdout?: (stdout: string) => {}) {
        let m3u8 = "./tmp.m3u8";

        if (this.quality[quality] == undefined || this.quality[quality] == null) throw new Error("The quality dosen't exist (" + quality + ")");

        fs.writeFileSync(m3u8, this.quality[quality]);

        const p = child.spawn(__dirname + "/../ffmpeg/ffmpeg.exe", [
            "-y",
            "-protocol_whitelist", "file,http,https,tcp,tls",
            "-i", m3u8,
            "-c:v", "libx264",
            "-c:a", "aac",
            path
        ]);
        p.stdout.on('data', stdout);
        p.stderr.on('data', stdout);
        p.on("close", (code) => {
            fs.unlinkSync(m3u8);
            callback(code);
        });
    }

    getQuality(): Array<string> {
        return Object.keys(this.quality);
    }

}