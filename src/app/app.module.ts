import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferHttpResponseInterceptor } from './common/interceptor/transfer-state.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, BrowserAnimationsModule],
    providers: [
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TransferHttpResponseInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
