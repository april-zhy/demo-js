import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoServerSourceComponent } from './demo-server-source/demo-server-source.component';
import { DemoLocalSourceComponent } from './demo-local-source/demo-local-source.component';
import { AppRoutingModule } from './app-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    AppComponent,
    DemoServerSourceComponent,
    DemoLocalSourceComponent
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
