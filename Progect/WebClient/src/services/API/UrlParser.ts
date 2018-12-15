import {Injectable} from "@angular/core";

export interface IDataByPars {
    url: string; // default ConstantsUrl.BASE_URL
    data?: object// if is /{countryId}/{id}?{page}&{limit} in url  data = {countryId:"....", id:"....", ...}
}

@Injectable({
  providedIn:'root'
})
export class UrlParser {

    isTrue(data: object): string[] {
        const keys = Object.keys(data);
        keys.forEach((key) => {
            if (data[key] === undefined
                || data[key] === "undefined"
                || data[key] === null) {
                //debugger
                throw new Error(`Undefined data key ${key}`)
            }
        });

        return keys
    }

    private parsUrl(data: object, url_: string, keys: string[]): string {

        keys.forEach((key: string) => {
            if (url_.indexOf(`?{${key}}`) != -1 || url_.indexOf(`&{${key}}`) != -1) {
                url_ = url_.replace(`{${key}}`, `${key}=${data[key]}`)
            }
            url_ = url_.replace(`{${key}}`, data[key])
        });

        return url_;
    }

    private dataByParsValidator(data: object, url: string): string [] {
        const allKeys = Object.keys(data);
        let keysByRequire = {};

        allKeys.forEach((key: string) => {
            if (url.indexOf(`?{${key}}`) != -1 || url.indexOf(`&{${key}}`) != -1) {
                keysByRequire[key] = data[key];
            }
        });

        this.isTrue(keysByRequire);

        return allKeys;
    }

    getUrl(dataByPars: IDataByPars): string {

        if (!dataByPars) {
            throw new Error("Undefined dat by pars")
        }

        const url = dataByPars.url;

        if (!url) {
            throw new Error("Invalid url")
        }

        const data = dataByPars.data;

        if (!data) {
            return (url);
        }

        let url_ = url.replace(" ", "");
        url_ = url.replace("    ", "");

        const keys = this.dataByParsValidator(data, url_);

        const parsUrl = this.parsUrl(data, url, keys);

        return (parsUrl);
    }
}
