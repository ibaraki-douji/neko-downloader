import { Constants, Converter, Episode } from ".";
import * as puppeteer from 'puppeteer';
const axios = require('axios');

export class PStream {

    private url: string;
    private ep: Episode;
    private down: any;

    constructor (url: string, episode: Episode) {
        this.url = url;
        this.ep = episode;
    }

    async retrieveInfos() {
        const browser = await puppeteer.launch(Constants.PUPPETEER);
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(this.url);

        this.down = await page.evaluate(async () => {
            let res = (await window.fetch(window["oofapmlfghuexp481ddfzfze79v1s"])).body;
            let data = (await res.getReader().read()).value;

            return new TextDecoder().decode(data);
        });
        
        const lines = this.down.split("\n");
        this.down = {};
        let i = 0;
        lines.forEach(l => {
            i++;
            if (i%2 == 1) return;
            let q = l.substring(l.indexOf("NAME")+6, l.length - 1);
            this.down[q] = lines[i];
        });

        for (let i in Object.keys(this.down)) {
            let q = Object.keys(this.down)[i];
            let arr = await page.evaluate(async (q) => {
                let res = await window.fetch(q).then((res) => res.text()).then((res) => {return res});
                return res;
            }, this.down[q]);
            this.down[q] = (!arr.includes("html") ? arr : null);
        }
        //console.log(this.downURL + "\n" + m3u8);
        await browser.close();
    }

    getSteamURL() {
        return this.url;
    }

    getEpisode() {
        return this.ep;
    }

    getDownloader() {
        return new Converter(this.down);
    }
}