import {IDataByPars, UrlParser} from "./UrlParser";
import {APIException} from "./SwaggerException";
import {IAPIResponse} from "../../models/IAPIResponse";
import {ConstantsUrl} from "../../Helper/ConstantsUrl";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Messager} from "../../Helper/Messager";
import {Router} from "@angular/router";
import {AuthService} from "../Authentication/Auth.service";

@Injectable()
export class BaseApiClient {
  constructor(private _router : Router, private _urlParser: UrlParser, private _httpClient: HttpClient) {
  }

  private _doFetch(url: string, method: string, changedData: any, headers: any = {}) {

    if (changedData && typeof(changedData) == "object") {
      this._urlParser.isTrue(changedData)
    }

    const url_ = url.replace(/[?&]$/, "");
    const _url = `${ConstantsUrl.BASE_URL}/${url_}`;

    let promise: Promise<any> = fetch(_url, {
      method,
      body: changedData,
      headers
    })
      .then((_response: Response) => {
        return this.processLoadData(_response);
      })
      .catch((err: any) => {
        return Promise.reject("An unexpected server error occurred");
      });

    /*let promise: Promise<any> = this._httpClient.request(method,_url,  {
      body: changedData,
      headers
    })
      .toPromise()
      .then((_response: Response) => {
        return this.processLoadData(_response);
      })
      .catch((err: any) => {
        return Promise.reject("An unexpected server error occurred");
      });*/

    return (promise);
  }

  protected processLoadData(response: Response): Promise<IAPIResponse<any>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => _headers[k] = v);
    }
    if (status === 200 || status === 206) {
      return response.json().then((json: IAPIResponse) => {
        const error = json.error;
        if (error) {
          return this.throwException("An unexpected server error occurred.", status, error, _headers);
        }
        return json;
      });
    }
    if (status === 400) {
      try {
        return response.json().then((json: IAPIResponse) => {
          const error = json.error;
          if (error) {
            Messager.warning(`${error}`);
            return Promise.reject(error)
          }
          return Promise.reject("An unexpected server error occurred.")
        });
      }
      catch (e) {
        return this.throwException("An unexpected server error occurred.", status, e, _headers);
      }

    }
    if (status === 401) {
      Messager.error("Bad authorize");
      setTimeout(()=>{
        this._router.navigate([ConstantsUrl.LOGIN])
      }, 1000);
    }
    if (
      status !== 200
      && status !== 204
    ) {
      return response.text().then((_responseText) => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      });
    }

    return Promise.resolve(<any>null);
  }

  private throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any; },
    result?: any): any {
    Messager.error(`An unexpected server error occurred.\nMessage ${response}\nStatus ${status}`);
    if (result !== null && result !== undefined)
      throw result;
    else
      throw new APIException(message, status, response, headers, null);
  };

  private _fetchJson(url: string, method: string, data: any = null) {
    if (data) {
      data = typeof data === "string" ? data : JSON.stringify(data);
    }

    let headers: any = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    this.SetAuthHeader(headers);
    return this._doFetch(url, method, data, headers);
  }

  private _fetchFormData(url: string, method: string, data: object) {

    const requestData = new FormData();
    const keys = Object.keys(data);
    keys.forEach(key => {
      requestData.append(key, data[key]);
    });

    let headers: any = {
    };
    this.SetAuthHeader(headers);

    return this._doFetch(url, method, requestData, headers);
  }

  private SetAuthHeader(headers: {Authorization: string}){
    if (AuthService.isAuthenticated()) {
      headers.Authorization = "Bearer " + AuthService.getStoredRawToken();
    }
  }

  putFormData(dataByPars: IDataByPars, data: object):Promise<IAPIResponse> {
    return this._fetchFormData(this._urlParser.getUrl(dataByPars), "PUT", data);
  }

  postFormData(dataByPars: IDataByPars, data: object):Promise<IAPIResponse> {
    return this._fetchFormData(this._urlParser.getUrl(dataByPars), "POST", data);
  }

  putJSON(dataByPars: IDataByPars, data: object) {
    //return this._httpClient.put(this._urlParser.getUrl(dataByPars), data).toPromise();
    return this._fetchJson(this._urlParser.getUrl(dataByPars), "PUT", data);
  }

  postJSON(dataByPars: IDataByPars, data: object) {
    //return this._httpClient.put(this._urlParser.getUrl(dataByPars), data).toPromise();
    return this._fetchJson(this._urlParser.getUrl(dataByPars), "POST", data);
  }

  deleteJSON(dataByPars: IDataByPars, data?: object) {
    //return this._httpClient.put(this._urlParser.getUrl(dataByPars), data).toPromise();
    return this._fetchJson(this._urlParser.getUrl(dataByPars), "DELETE", data);
  }

  getJSON(dataByPars: IDataByPars, data?: object) {
    //return this._httpClient.put(this._urlParser.getUrl(dataByPars), data).toPromise();
    return this._fetchJson(this._urlParser.getUrl(dataByPars), "GET", data);
  }
}
