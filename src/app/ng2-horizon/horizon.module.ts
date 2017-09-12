import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizonService, HorizonConfig } from "./horizon.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        HorizonService
    ],
    declarations: []
})
export class HorizonModule {
    static forRoot(config: HorizonConfig): ModuleWithProviders {
        return {
            ngModule: HorizonModule,
            providers: [
                { provide: HorizonConfig, useValue: config }
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: HorizonModule) {
        if (parentModule) {
            throw new Error('Module already lodaded!');
        }
    }
}
