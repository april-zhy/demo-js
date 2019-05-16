import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoServerSourceComponent } from './demo-server-source/demo-server-source.component';
import { DemoLocalSourceComponent } from './demo-local-source/demo-local-source.component';
import { AppRoutingModule } from './app-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgoTranslateService } from './ngo-translate.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/test', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DemoServerSourceComponent,
    DemoLocalSourceComponent
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
  ],
  providers: [NgoTranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
