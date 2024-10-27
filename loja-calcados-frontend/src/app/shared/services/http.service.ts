import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { MessageService } from 'src/app/core/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  msgErroPadrao = 'Ocorreu um erro ao realizar a requisição ao servidor. Se o problema persistir, entre em contato com a área responsável pelo sistema.';

  constructor(private http: HttpClient,
              private messageService: MessageService,
              protected readonly keycloakService: KeycloakService) {
  }

  delete(url): Observable<any> {
    return this.http.delete(`${environment.apiUri}${url}`,).pipe(catchError(error => this.tratarErros(error)));
  }

  get(url, queryParams: HttpParams): Observable<any> {
    return this.http.get(`${environment.apiUri}${url}`, {params:queryParams} ).pipe(catchError(error => this.tratarErros(error)));
  }

  head(url): Observable<any> {
    return this.http.head(`${environment.apiUri}${url}`,).pipe(catchError(error => this.tratarErros(error)));
  }

  jsonp(url, callbackParam): Observable<any> {
    return this.http.jsonp(`${environment.apiUri}${url}`, callbackParam).pipe(catchError(error => this.tratarErros(error)));
  }

  options(url): Observable<any> {
    return this.http.options(`${environment.apiUri}${url}`,).pipe(catchError(error => this.tratarErros(error)));
  }

  patch(url, body = null): Observable<any> {
    return this.http.patch(`${environment.apiUri}${url}`, body).pipe(catchError(error => this.tratarErros(error)));
  }

  post(url, body = null,): Observable<any> {
    return this.http.post(`${environment.apiUri}${url}`, body).pipe(catchError(error => this.tratarErros(error)));
  }

  put(url, queryParams: HttpParams, body = null,): Observable<any> {
    return this.http.put(`${environment.apiUri}${url}`, body, {params:queryParams}).pipe(catchError(error => this.tratarErros(error)));
  }

  download(url: string, body: {} = {}): Observable<Blob> {
    const params = new HttpParams({fromObject: body});
    return this.http.get(`${environment.apiUri}${url}?${params.toString()}`, {
      responseType: 'blob'
    });
  }

  private tratarErros(error: any): Observable<any> {
    if (error.error && error.error instanceof Blob) {
      error.error.text().then(texto => {
        let obj = null;
        try {
          obj = JSON.parse(texto);
        } catch (e) {}

        this.messageService.enviarMensagemErro(obj && obj.mensagem || this.msgErroPadrao);
      });
    } else {
      this.messageService.enviarMensagemErro(error.error && error.error.mensagem || this.msgErroPadrao);
    }

    return throwError(error);
  }

}
