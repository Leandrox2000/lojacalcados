import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toasterService: ToastrService) { }

  enviarMensagemSucesso(): void { // status 200: ok
    this.fecharTudo();
    this.enviarMensagemSucessoParam('Operação realizada com sucesso!', 'Sucesso');
  }

  enviarMensagemSucessoParam(mensagem: string, titulo?: string): void { // status 200: ok
    this.fecharTudo();
    this.toasterService.success('<b>' + mensagem, titulo, { enableHtml: true, timeOut: 10000,
      disableTimeOut: false, closeButton: true, tapToDismiss: false });
  }

  enviarMensagemAlerta(mensagem: string): void { // status 404: Not Found
    this.fecharTudo();
    this.toasterService.warning('<b>' + mensagem, '', { enableHtml: true, timeOut: 10000,
      disableTimeOut: false, closeButton: true, tapToDismiss: false });
  }

  enviarMensagemErro(mensagem: string): void { // status 409: Conflict or 400: Bad Request
    this.fecharTudo();
    this.toasterService.error('<b>' + mensagem, '', { enableHtml: true, timeOut: 10000,
      disableTimeOut: false, closeButton: true, tapToDismiss: false });
  }

  fecharTudo(): void {
    this.toasterService.clear();
  }

}
