import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {OptimizedHttpClientModule} from "@alex-apps-dev/optimized-http-client";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OptimizedHttpClientModule.setOptions({
      baseUrl: "https://identityapi.alexapps.dev/api/v1",
      notAuthorizedRedirectPath: "/forbidden"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
