import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {StaticOptions} from "./static-options";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OptimizedHttpInterceptor} from "./optimized-http-interceptor";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: OptimizedHttpInterceptor,
  multi: true
}

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot([])
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    INTERCEPTOR_PROVIDER
  ]
})
export class OptimizedHttpClientModule {

  public static setOptions(options: {
    baseUrl: string,
    notAuthorizedRedirectPath: string,
    localStorageTokenItemName?: string
  }): ModuleWithProviders<OptimizedHttpClientModule> {

    if (options.baseUrl.endsWith("/")) {
      options.baseUrl = options.baseUrl.substr(0, options.baseUrl.length - 1);
    }

    StaticOptions.baseUrl = options.baseUrl;
    StaticOptions.notAuthorizedRedirectPath = options.notAuthorizedRedirectPath;
    StaticOptions.localStorageTokenItemName = options.localStorageTokenItemName ?? StaticOptions.localStorageTokenItemName;

    return {
      ngModule: OptimizedHttpClientModule
    }
  }
}
