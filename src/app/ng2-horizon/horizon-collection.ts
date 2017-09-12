import { Observable } from "rxjs/Observable";
import { HorizonQuery } from "./horizon-query";

export interface HorizonWatchOptions {
    rawChanges: boolean;
}
export enum HorizonResultMode {
    Open,
    Closed
}

export enum HorizonOrderDirection {
    Ascending,
    Descending
}

export class HorizonCollection extends HorizonQuery {
    constructor(collection: any) {
        super(collection);
    }

    above(value: number | object, mode: HorizonResultMode = HorizonResultMode.Closed): HorizonCollection {
        return new HorizonCollection(this.collection.above(value, HorizonResultMode[mode].toLowerCase()));
    }
    below(value: number | object, mode: HorizonResultMode = HorizonResultMode.Open): HorizonCollection {
        return new HorizonCollection(this.collection.below(value, HorizonResultMode[mode].toLowerCase()));
    }

    find(filter: number | object): HorizonCollection {
        return new HorizonCollection(this.collection.find(filter));
    }
    findAll(...filter: object[]): HorizonCollection {
        return new HorizonCollection(this.collection.findAll.apply(this.collection, filter));
    }

    limit(count: number): HorizonCollection {
        return new HorizonCollection(this.collection.limit(count));
    }
    order(field: string, direction: HorizonOrderDirection = HorizonOrderDirection.Ascending): HorizonCollection {
        return new HorizonCollection(this.collection.order(field, HorizonOrderDirection[direction].toLowerCase()));
    }

    remove(filter: number | object): void {
        this.collection.remove(filter);
    }
    removeAll(...filter: (number | object)[]): void {
        this.collection.removeAll(filter);
    }

    insert(obj: object): void {
        this.collection.insert(obj);
    }
    replace(obj: object): void {
        this.collection.replace(obj);
    }
    store(obj: object): void {
        this.collection.store(obj);
    }
    update(obj: object): void {
        this.collection.update(obj);
    }
    upsert(obj: object): void {
        this.collection.upsert(obj);
    }
}
