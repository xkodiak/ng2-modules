import { HorizonCollection } from "./horizon-collection";

export class HorizonModel<T extends any[]> {
    constructor(private model: any) {
    }

    apply(params: T): HorizonCollection {
        return new HorizonCollection(this.model(params));
    }
}
