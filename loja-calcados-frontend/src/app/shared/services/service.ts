import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NmcServiceService {
  private readonly apiUrlLdap = 'ldap://ldapcluster.corecaixa:489';

  constructor(private readonly http: HttpClient) { }

  // Modificado para aceitar um parâmetro de nome do usuário
  lDap(nomeDoUsuario: string): Observable<any> {
    const url = this.apiUrlLdap + "?uid=" + nomeDoUsuario; 
    return this.http.get(url).pipe(
      (res) => res,
      (error) =>  error,
        finalize(() => {})
      );
  }
}