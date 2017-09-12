import '@horizon/client';
import { Injectable } from '@angular/core';
import { HorizonCollection } from "./horizon-collection";
import { Observable } from "rxjs/Observable";
import { HorizonModel } from "./horizon-model";
import { HorizonQuery } from "./horizon-query";

declare var require: any;
const Horizon = require('@horizon/client');

export class HorizonConfig {
    Host: string;
    Secure?: boolean = true;
    Path?: string = "horizon";
    LazyWrites?: boolean = false;
    AuthType?: string = "unauthenticated";
}

export enum HorizonStatus {
    Unconnected,
    Connected,
    Disconnected,
    Ready,
    Error,
}

@Injectable()
export class HorizonService {

    private horizon: any;

    constructor(config: HorizonConfig) {
        this.horizon = Horizon({
            host: config.Host,
            secure: config.Secure,
            path: config.Path,
            lazyWrites: config.LazyWrites,
            authType: config.AuthType
        });
    }

    get currentUser(): HorizonQuery {
        return new HorizonQuery(this.horizon.currentUser());
    }
    get hasAuthToken(): boolean {
        return this.horizon.hasAuthToken();
    }

    connect(): void {
        this.horizon.connect();
    }
    disconnect(): void {
        this.horizon.disconnect();
    }

    collection(name: string): HorizonCollection {
        return new HorizonCollection(this.horizon(name));
    }

    status(): Observable<HorizonStatus> {
        return new Observable<HorizonStatus>(o => {
            this.horizon.status().subscribe(v => {
                switch (v.type) {
                    case ("unconnected"):
                        o.next(HorizonStatus.Unconnected);
                        break;
                    case ("connected"):
                        o.next(HorizonStatus.Connected);
                        break;
                    case ("ready"):
                        o.next(HorizonStatus.Ready);
                        break;
                    case ("error"):
                        o.next(HorizonStatus.Error);
                        break;
                    case ("disconnected"):
                        o.next(HorizonStatus.Disconnected);
                        break;
                }
            }, e => o.error(e), () => o.complete());
        });
    }

    onReady(): Observable<void> {
        return new Observable<void>(o => {
            this.status().subscribe(v => {
                if (v === HorizonStatus.Ready)
                    o.next();
            }, e => o.error(e), () => o.complete());
        });
    }
    onDisconnected(): Observable<void> {
        return new Observable<void>(o => {
            this.status().subscribe(v => {
                if (v === HorizonStatus.Disconnected)
                    o.next();
            }, e => o.error(e), () => o.complete());
        });
    }
    onSocketError(): Observable<void> {
        return new Observable<void>(o => {
            this.status().subscribe(v => {
                if (v === HorizonStatus.Error)
                    o.next();
            }, e => o.error(e), () => o.complete());
        });
    }

    model<T extends any[]>(model: (params: T) => object): HorizonModel<T> {
        return new HorizonModel<T>(this.horizon.model(model));
    }
    aggregate(obj: object): HorizonCollection {
        return new HorizonCollection(this.horizon.aggregate(obj));
    }

    authEndpoint(endpoint: string): Observable<any> {
        return this.horizon.authEndpoint(endpoint);
    }
    clearAuthTokens(): void {
        this.horizon.clearAuthTokens();
    }
}
