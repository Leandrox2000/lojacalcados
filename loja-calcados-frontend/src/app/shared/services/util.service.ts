import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Observable }  from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class UtilService {

    constructor(private httpService: HttpService) { }

    listarDataBasePorTipoCadoc(tipoCadoc): Observable<any> {
        return this.httpService.get('util/dataBase-tipo-cadoc?tipoCadoc=' + tipoCadoc);
    }

    listarTodasDatasBasesResolucao(resolucao): Observable<any> {
      return this.httpService.get('util/data-base-todos?resolucao=' + resolucao);
    }

    listarAnosBases(resolucao): Observable<any> {
      return this.httpService.get('util/anos-base-todos?resolucao=' + resolucao);
    }

    listarCatalogoDocumentoPorResolucao(resolucao): Observable<any> {
      return this.httpService.get('util/tipo-catalogo-documento?resolucao=' + resolucao, {responseType: 'text'});
    }

    listarOrigemInterface(): Observable<any> {
      return this.httpService.get('util/listar-origem-interface', {responseType: 'text'});
    }

    listarOrigemRegistro(): Observable<any> {
      return this.httpService.get('util/listar-origem-registro');
    }

    listarPeriodicidade(): Observable<any> {
      return this.httpService.get('util/listar-periodicidade', {responseType: 'text'});
    }

    listarTipoEntrega(): Observable<any> {
      return this.httpService.get('util/listar-tipo-entrega', {responseType: 'text'});
    }

    listarTipoInterface(): Observable<any> {
      return this.httpService.get('util/listar-tipo-interface', {responseType: 'text'});
    }

    listarTipoResolucaoBacen(): Observable<any> {
      return this.httpService.get('util/listar-tipo-resolucao', {responseType: 'text'});
    }

    listarModeloInterface(): Observable<any> {
      return this.httpService.get('util/listar-modelo-interface', {responseType: 'text'});
    }

    listarSituacaoArquivo(): Observable<any> {
      return this.httpService.get('util/listar-situacao-arquivo', {responseType: 'text'});
    }

    listarSiglaInterface(): Observable<any> {
      return this.httpService.get('util/listar-sigla-interface', {responseType: 'text'});
    }

    buscarSistema(codigoSistema): Observable<any> {
      return this.httpService.get('util/recupera-sistema?codigoSigla=' + codigoSistema, {responseType: 'text'});
    }

    buscarSistemaSIICO(codigoSistema): Observable<any> {
      return this.httpService.get('util/recupera-sistema-siico?codigoSigla=' + codigoSistema, {responseType: 'text'});
    }

    buscarUnidade(codigoUnidade): Observable<any> {
      return this.httpService.get('util/recupera-unidade?codigoSigla=' + codigoUnidade, {responseType: 'text'});
    }

    buscarUnidadeSIICO(codigoUnidade): Observable<any> {
      return this.httpService.get('util/recupera-unidade-siico?codigoSigla=' + codigoUnidade, {responseType: 'text'});
    }

    buscarCliente(codigo): Observable<any>{
      return this.httpService.get('util/nome-cpf-cnpj?cpfCnpj=' + codigo, {responseType: 'text'});
    }

    actualDate(): string {
      const dataAtual = new Date();
      // Formatar a data
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
      const ano = dataAtual.getFullYear();
      const hora = String(dataAtual.getHours()).padStart(2, '0');
      const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
      const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
      // Criar a string formatada
      return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    }

  }
