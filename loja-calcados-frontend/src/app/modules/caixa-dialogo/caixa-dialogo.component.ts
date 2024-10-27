import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AnonymousSubject } from "rxjs-compat";

@Component({
  selector: "app-caixa-dialogo",
  templateUrl: "./caixa-dialogo.component.html",
  styleUrls: ["./caixa-dialogo.component.scss"],
})
export class CaixaDialogoComponent {
  @Input() titulo: string;
  @Input() mensagem: string;
  @Input() textoBotaoCancelar: string = "Cancelar";
  @Input() textoBotaoConfirmar: string = "Confirmar";
  @Input() habilitarCancelar: boolean = true;
  @Input() habilitarConfirmar: boolean = true;
  @Input() url: string;

  confirmResult: AnonymousSubject<boolean> = new AnonymousSubject();

  constructor(private modal: NgbActiveModal, private router: Router) {}

  confirmar() {
    this.confirmarEFechar(true);
  }

  fechar() {
    this.confirmarEFechar(false);
  }

  private confirmarEFechar(valor: boolean) {
    if (valor) {
      if (this.url != null) {
        this.router.navigateByUrl(this.url);
      }
      this.confirmResult.next(valor);
    }
    this.modal.close(valor);
  }
}
