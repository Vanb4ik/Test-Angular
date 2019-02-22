import {Injectable} from "@angular/core";
import {IIdentifiable} from "../models/IIdentifiable";
import {ICrudApiClient} from "../services/API/CrudApiClient";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudModule<T extends IIdentifiable> {

  protected abstract readonly _rootApiClient: ICrudApiClient<T>;

  protected isLoading: boolean = false;

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

  protected async watchAsyncProcess(asyncActions: Promise<any>) {
    //debugger
    this.isLoading = true;

    return await asyncActions
      .then(response => {
        return response
      })
      .catch((err: any) => {
        throw new Error(err);
      })
      .finally(
        () => this.isLoading = false
      )
  }
}
