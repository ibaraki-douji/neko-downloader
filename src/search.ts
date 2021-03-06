import { Anime, Constants } from ".";

const axios = require('axios');

export class Search {

    private json: Array<any> = [];
    private tag: string;
    private type: string;

    /**
     * 
     * @param name Name of the anime
     * @param type `VOSTFR` or `VF`
     */
    constructor(name: string = "", type: string = "VOSTFR") {
        this.tag = name.toLowerCase();
        this.type = type;
    }

    async get(): Promise<Array<Anime>> {
        const res = await axios.get(Constants[this.type]);
        this.json = res.data;

        const arr: Array<Anime> = [];
        this.json.forEach(e => {
            if ((e.title != null && e.title.toLowerCase().includes(this.tag)) || (e.title_english != null && e.title_english.toLowerCase().includes(this.tag)) || (e.title_romanji != null && e.title_romanji.toLowerCase().includes(this.tag))) {
                arr.push(new Anime(Constants.BASE + e.url));
            }
        });
        return new Promise<Array<Anime>>(resolve => resolve(arr));
    }

}