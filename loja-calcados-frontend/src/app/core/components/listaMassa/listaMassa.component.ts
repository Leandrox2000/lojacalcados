import { Component, OnInit } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { HttpService } from "src/app/shared/services/http.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { CaixaDialogoComponent } from "src/app/modules/caixa-dialogo/caixa-dialogo.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-listaMassa",
  templateUrl: "./listaMassa.component.html",
  styleUrls: ["./listaMassa.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ListaMassaComponent implements OnInit {
  searchForm: FormGroup;
  listaServicos = [];
  constructor(
    private router: Router,
    private service: HttpService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    localStorage.removeItem("usuarios");
    this.searchForm = this.fb.group({
      search: [""],
    });
    this.submitPesquisar();
  }

  public abrirMinhasSolicitacoes(): void {
    this.router.navigateByUrl("/listar-solicitacoes");
  }

  async abrirModalGerarMassa(serv) {
    if (serv.IC_AUTOMATIZADO == "S") {
      const modalRef = this.modalService.open(CaixaDialogoComponent, {
        size: "lg",
        animation: true,
      });
      let ambientes = "";
      if (serv.DESVALUE && serv.HMPVALUE && serv.TQSVALUE) {
        ambientes = "DES, HMP, TQS";
      } else if (serv.DESVALUE && serv.TQSVALUE) {
        ambientes = "DES, TQS";
      } else if (serv.DESVALUE && serv.HMPVALUE) {
        ambientes = "DES, HMP";
      } else if (serv.HMPVALUE && serv.TQSVALUE) {
        ambientes = "HMP, TQS";
      } else if (serv.DESVALUE) {
        ambientes = "DES";
      } else if (serv.TQSVALUE) {
        ambientes = "TQS";
      } else if (serv.HMPVALUE) {
        ambientes = "HMP";
      }
      modalRef.componentInstance.url =
        "/gera-massa" +
        serv.NU_IDNTR_SERVICO_DADO +
        "/" +
        serv.NU_IDNTR_SERVICO_DADO +
        "/" +
        ambientes;
      console.log("URL " + modalRef.componentInstance.url);
      modalRef.componentInstance.titulo = serv.NO_SERVICO_DADO;
      modalRef.componentInstance.mensagem = serv.DE_SERVICO_DADO;
      modalRef.componentInstance.textoBotaoCancelar = "Voltar";
      modalRef.componentInstance.textoBotaoConfirmar = "Prosseguir";
    } else {
      window.open(
        "http://qualidadevitec.caixa/gestao_massa/view/solicitacao_de_massa1.php",
        "_blank"
      );
    }
  }

  async abrirModalAtencao() {
    const modalRef = this.modalService.open(CaixaDialogoComponent, {
      size: "lg",
      animation: true,
    });
    modalRef.componentInstance.titulo = "Atenção";
    modalRef.componentInstance.mensagem =
      "Caso não haja a opção do serviço x ambiente desejado, contribua com a futura expansão dos nossos serviços, entrando em contato com GEQTI 1";
    modalRef.componentInstance.textoBotaoCancelar = "Voltar";
    modalRef.componentInstance.textoBotaoConfirmar = "OK";
    modalRef.componentInstance.url = null;
  }

  async submitPesquisar() {
    let queryParams = new HttpParams().append(
      "txPesquisarServico",
      this.searchForm.value.search
    );
    this.service
      .get("FrontEnd/ObterServicos", queryParams)
      .subscribe((data: any[]) => {
        this.listaServicos = data;
        let guardaAnterior = "";
        for (let i = 0; i < this.listaServicos.length; i++) {
          if (i == 0) {
            guardaAnterior = this.listaServicos[i].NO_AREA_NEGOCIO;
          } else if (this.listaServicos[i].NO_AREA_NEGOCIO == guardaAnterior) {
            this.listaServicos[i].NO_AREA_NEGOCIO = "";
          } else {
            guardaAnterior = this.listaServicos[i].NO_AREA_NEGOCIO;
          }
          this.listaServicos[i].DESVALUE = false;
          this.listaServicos[i].HMPVALUE = false;
          this.listaServicos[i].TQSVALUE = false;
          this.listaServicos[i].desabilitaGerar = true;
          if (this.listaServicos[i].DES == "0") {
            this.listaServicos[i].DESHINT =
              "Ambiente não disponível para massa de teste";
          } else {
            this.listaServicos[i].DESHINT = "";
          }
          if (this.listaServicos[i].HMP == "0") {
            this.listaServicos[i].HMPHINT =
              "Ambiente não disponível para massa de teste";
          } else {
            this.listaServicos[i].HMPHINT = "";
          }
          if (this.listaServicos[i].TQS == "0") {
            this.listaServicos[i].TQSHINT =
              "Ambiente não disponível para massa de teste";
          } else {
            this.listaServicos[i].TQSHINT = "";
          }
        }
        console.log(this.listaServicos);
      });
  }

  submitConsultar(): void {
    console.log("submitConsultar ");
  }

  public validarGerarMassa(serv) {
    if (serv.DESVALUE || serv.HMPVALUE || serv.TQSVALUE) {
      serv.desabilitaGerar = false;
    } else {
      serv.desabilitaGerar = true;
    }
  }

  public onCheckDES(event, serv): void {
    serv.DESVALUE = event;
    this.desabilitarTodos(serv);
    this.validarGerarMassa(serv);
  }

  public onCheckHMP(event, serv): void {
    serv.HMPVALUE = event;
    this.desabilitarTodos(serv);
    this.validarGerarMassa(serv);
  }

  public onCheckTQS(event, serv): void {
    serv.TQSVALUE = event;
    this.desabilitarTodos(serv);
    this.validarGerarMassa(serv);
  }

  async desabilitarTodos(serv) {
    for (const element of this.listaServicos) {
      if (serv != element) {
        element.desabilitaGerar = true;
        element.DESVALUE = 0;
        element.TQSVALUE = 0;
        element.HMPVALUE = 0;
      }
    }
  }
}
