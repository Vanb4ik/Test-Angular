import {Injectable} from "@angular/core";
import {IIdentifiable} from "../models/IIdentifiable";
import {ICrudApiClient} from "../services/API/CrudApiClient";


export interface IStateBase {
  isLoading: boolean
}

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudModule<T extends IIdentifiable, TState extends IStateBase> {

  protected abstract readonly _rootApiClient: ICrudApiClient<T>;

  private state: IStateBase = {
    isLoading: false,
  };

  get isLoading() {
    return this.state.isLoading;
  }

  set isLoading(loading: boolean) {
    this.state.isLoading = loading
  }

  protected async create(item: T) {
    await this.watchAsyncProcess(
      this._rootApiClient.create(item)
    )
  }

  protected async update(item: T) {
    await this.watchAsyncProcess(
      this._rootApiClient.update(item)
    )
  }

  protected async delete(item: IIdentifiable) {
    await this.watchAsyncProcess(
      this._rootApiClient.delete(item)
    )
  }

  protected async watchAsyncProcess(asyncActions: Promise<object>) {

    this.isLoading = true;

    return await asyncActions
      .then(response => {
        if (!response || !Object.keys(response)) {
          return;
        }
        this.state = {
          ...this.state,
          ...response,
        }
      })
      .catch((err: any) => {
        return Promise.reject(err);
      })
      .finally(
        () => this.isLoading = false
      )
  }
}
