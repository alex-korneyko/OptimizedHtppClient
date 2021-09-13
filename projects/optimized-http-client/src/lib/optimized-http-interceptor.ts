import {Injectable} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {StaticOptions} from "./static-options";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class OptimizedHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem(StaticOptions.localStorageTokenItemName);

    let httpRequest = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token ?? ""),
      url: OptimizedHttpInterceptor.createUrl(req.url)
    });

    return next.handle(httpRequest).pipe(
      tap(event => {
        if (event.type == HttpEventType.Response) {

        }
      }, error => {
        if (error.status >= 400 && error.status <= 403) {
          this.router.navigateByUrl(StaticOptions.notAuthorizedRedirectPath)
            .then(() => {
              console.error("Not authorized action!", error)
            })
            .catch((error) => {
              console.error("Redirect error: ", error)})
        }
      })
    );
  }

  private static createUrl(urlSuffix: string): string {
    if (urlSuffix.startsWith("/")) {
      urlSuffix = urlSuffix.substr(1, (urlSuffix.length - 1));
    }

    return StaticOptions.baseUrl + "/" + urlSuffix;
  }
}
