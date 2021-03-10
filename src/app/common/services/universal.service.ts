import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

@Injectable({
    providedIn: 'root',
})
export class UniversalService {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(@Inject(PLATFORM_ID) private readonly platformId: object, private injector: Injector) {}

    isPlatformBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    isPlatformServer(): boolean {
        return isPlatformServer(this.platformId);
    }

    get request(): Request {
        return this.injector.get(REQUEST);
    }

    get response(): Response {
        return this.injector.get(RESPONSE);
    }
}
