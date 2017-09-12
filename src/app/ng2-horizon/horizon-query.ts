import { Observable } from "rxjs/Observable";
import { HorizonWatchOptions } from "./horizon-collection";

export class HorizonQuery {
    constructor(protected collection: any) { }

    fetch(): Observable<any> {
        return this.collection.fetch();
    }

    watch(options?: HorizonWatchOptions): Observable<any> {
        return this.collection.watch(options);
    }
}
