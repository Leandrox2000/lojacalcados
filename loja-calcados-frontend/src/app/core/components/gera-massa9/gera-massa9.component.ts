import { AfterContentInit, Component, OnInit } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { HttpService } from "src/app/shared/services/http.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { CaixaDialogoComponent } from "src/app/modules/caixa-dialogo/caixa-dialogo.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "src/app/entities/usuario";
import { SolicitacaoMassaRequest } from "src/app/entities/solicitacaoMassaRequest";
import { GenericValidator } from "src/app/modules/util/genericValidator";
import { AtributosResponse } from "src/app/entities/atributosResponse";
import { AtributosPadraoResponse } from "src/app/entities/atributosPadraoResponse";
import { ServicoDadosResponse } from "src/app/entities/servicoDadoResponse";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-gera-massa9",
  templateUrl: "./gera-massa9.component.html",
  styleUrls: ["./gera-massa9.component.scss"],
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
export class GeraMassa9Component implements OnInit, AfterContentInit {
  gerarForm: FormGroup;
  submitted: boolean = false;
  dadosEspecificos: boolean = false;
  listaTipoCadastramento = [];
  listaAgencias: AtributosResponse[] = [];
  listaProdutos: AtributosResponse[] = [];
  listaPropriedades: AtributosResponse[] = [];
  selectedUsuarios: Usuario[] = [];
  idServico: string;
  ambientes: string;
  descServico: string;
  servico: ServicoDadosResponse;
  titulo: string;
  mensagem: string;
  qtdeMaxima: number = 250;
  auxQtdeMaxima: number = 250;
  mostraSenha: boolean = false;
  solicitacaoMassaRequest: SolicitacaoMassaRequest = <
    SolicitacaoMassaRequest
  >{};
  constructor(
    private service: HttpService,
    private messageService: MessageService,
    private router: Router,
    private rout: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngAfterContentInit(): void {
    if (
      this.idServico != null &&
      (this.listaTipoCadastramento == null ||
        this.listaTipoCadastramento.length == 0)
    ) {
      this.listarTipoCadastramento();
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.submitted = false;
    this.gerarForm = this.fb.group({
      tipoCadastramento: new FormControl("1", Validators.required),
      cpf: new FormControl("", GenericValidator.isValidCpf()),
      desejaSenha: new FormControl("N"),
      senha: new FormControl(""),
      agencia: new FormControl(""),
      produto: new FormControl(""),
      propriedade: new FormControl(""),
      qtde: new FormControl(1, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
      strUsuarios: new FormControl(""),
      noDemandaUtzcoMassaDado: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(70),
      ]),
    });
    this.idServico = this.rout.snapshot.paramMap.get("idServico");
    this.ambientes = this.rout.snapshot.paramMap.get("ambientes");
    if (this.idServico == null) {
      this.idServico = localStorage.getItem("idServico");
      this.ambientes = localStorage.getItem("ambientes");
    }
    if (this.idServico != null) {
      this.buscarDescricaoServico(this.idServico);
      this.listarTipoCadastramento();
      this.buscarMensagemProsseguir();
    }
    this.selectedUsuarios = JSON.parse(
      localStorage.getItem("usuarios") ?? "[]"
    );
    if (this.selectedUsuarios != null && this.selectedUsuarios.length > 0) {
      let strUsuarios = "";
      for (let i = 0; i < this.selectedUsuarios.length; i++) {
        strUsuarios += this.selectedUsuarios[i].CO_USUARIO;
        if (i + 1 != this.selectedUsuarios.length) {
          strUsuarios += ", ";
        }
      }
      this.gerarForm.get("strUsuarios").patchValue(strUsuarios);
    }
  }

  async abrirModalProsseguir() {
    this.submitted = true;
    if (this.gerarForm.invalid) {
      return;
    }
    const modalRef = this.modalService.open(CaixaDialogoComponent, {
      size: "lg",
      animation: true,
    });
    modalRef.componentInstance.titulo = this.titulo;
    modalRef.componentInstance.mensagem = this.mensagem;
    modalRef.componentInstance.textoBotaoCancelar = "Voltar";
    modalRef.componentInstance.textoBotaoConfirmar = "Solicitar";
    modalRef.componentInstance.url = null;
    modalRef.result.then((result) => {
      if (result) {
        this.submitProsseguir();
      }
    });
  }

  async listarTipoCadastramento() {
    let queryParams = new HttpParams().append("idServico", this.idServico);
    this.service
      .get("FrontEnd/ObterTipoMassa", queryParams)
      .subscribe((data: any[]) => {
        console.log(data);
        this.listaTipoCadastramento = data;
      });
  }

  async listarAgencias() {
    if (this.listaAgencias.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "76")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaAgencias = data;
        for (const element of this.listaAgencias) {
          if (element.IC_DOMINIO_PADRAO == "S") {
            this.gerarForm.get("agencia").patchValue(element.CO_DOMINIO);
            break;
          }
        }
      });
  }

  async listarProdutos() {
    if (this.listaProdutos.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "133")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento)
      .append("coAtributoPai", "PF");
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaProdutos = data;
        for (const element of this.listaProdutos) {
          if (element.IC_DOMINIO_PADRAO == "S") {
            this.gerarForm.get("produto").patchValue(element.CO_DOMINIO);
            this.listarPropriedades(element.CO_DOMINIO);
            break;
          }
        }
      });
  }

  async listarPropriedades(produto: string) {
    if (
      (produto == undefined || produto == null || produto.trim().length == 0) &&
      (this.gerarForm.value.produto == null ||
        this.gerarForm.value.produto == undefined ||
        this.gerarForm.value.produto.trim().length == 0)
    ) {
      return;
    }
    if (produto == undefined || produto == null) {
      produto = this.gerarForm.value.produto;
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "134")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento)
      .append("coAtributoPai", produto);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaPropriedades = data;
        for (const element of this.listaPropriedades) {
          if (element.IC_DOMINIO_PADRAO == "S") {
            this.gerarForm.get("propriedade").patchValue(element.CO_DOMINIO);
            break;
          }
        }
      });
  }

  async obterValorPadrao(idAtributo, componente: string) {
    let queryParams = new HttpParams()
      .append("idAtributo", idAtributo)
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterValorPadrao", queryParams)
      .subscribe((data: AtributosPadraoResponse[]) => {
        console.log("obterValorPadrao " + componente);
        console.log(data);
        if (
          data != null &&
          data.length > 0 &&
          data[0].DE_CNTDO_ATBTO_SERVICO != null &&
          data[0].DE_CNTDO_ATBTO_SERVICO != "null"
        ) {
          this.gerarForm
            .get(componente)
            .patchValue(data[0].DE_CNTDO_ATBTO_SERVICO);
        }
      });
  }

  async buscarMensagemProsseguir() {
    if (this.idServico == null) {
      return;
    }
    let queryParams = new HttpParams()
      .append("acao", "SERVICO_OK_MASSA_OK_ATRIBUTO_OK")
      .append("idServico", this.idServico);
    this.service
      .get("FrontEnd/ObterMensagemServico", queryParams)
      .subscribe((data: any[]) => {
        console.log(data);
        this.titulo = data[0].NO_TITULO;
        this.mensagem = data[0].DE_MENSAGEM.replace("\\n", "<br>");
      });
  }

  async buscarDescricaoServico(idServico) {
    let queryParams = new HttpParams().append("idServico", idServico);
    this.service
      .get("FrontEnd/ObterServicosPorId", queryParams)
      .subscribe((data: ServicoDadosResponse[]) => {
        console.log(data);
        this.servico = data[0];
        this.descServico = this.servico.NO_SERVICO_DADO;
        this.qtdeMaxima = this.servico.NU_LIMITE_REGISTRO_MASSA;
        this.auxQtdeMaxima = this.servico.NU_LIMITE_REGISTRO_MASSA;
      });
  }

  public onChangeQtdeMaxima(): void {
    if (this.gerarForm.value.qtde > this.auxQtdeMaxima) {
      this.gerarForm.get("qtde").patchValue(this.auxQtdeMaxima);
      this.qtdeMaxima = this.auxQtdeMaxima;
    } else {
      this.qtdeMaxima = this.auxQtdeMaxima;
    }
    this.gerarForm.controls["qtde"].updateValueAndValidity();
  }

  public onChangeTipoCadastramento(): void {
    if (Number.parseInt(this.gerarForm.value.tipoCadastramento) > 1) {
      this.dadosEspecificos = true;
      this.listarDadosEspecificos();
      this.gerarForm.controls["produto"].setValidators([Validators.required]);
      this.gerarForm.controls["propriedade"].setValidators([
        Validators.required,
      ]);
    } else {
      this.dadosEspecificos = false;
      this.gerarForm.controls["produto"].clearValidators();
      this.gerarForm.controls["propriedade"].clearValidators();
    }
    this.gerarForm.controls["produto"].updateValueAndValidity();
    this.gerarForm.controls["propriedade"].updateValueAndValidity();
  }

  public onChangeCPF(event: any): void {
    if (event.target.value.length >= 11) {
      this.gerarForm.get("qtde").patchValue(1);
    }
  }

  public onChangeProduto(): void {
    this.listarPropriedades(undefined);
  }

  listarDadosEspecificos(): void {
    this.listarAgencias();
    this.listarProdutos();
    this.obterValorPadrao(1, "cpf");
  }

  onChangeDesejaSenha() {
    if (this.gerarForm.value.desejaSenha == "S") {
      this.mostraSenha = true;
      this.gerarForm.controls["senha"].setValidators([Validators.required]);
    } else {
      this.mostraSenha = false;
      this.gerarForm.controls["senha"].clearValidators();
    }
    this.gerarForm.controls["senha"].updateValueAndValidity();
  }

  async submitProsseguir() {
    if (this.ambientes == "DES, HMP, TQS") {
      this.solicitacaoMassaRequest.idAmbiente = [1, 2, 3];
    } else if (this.ambientes == "DES, TQS") {
      this.solicitacaoMassaRequest.idAmbiente = [1, 3];
    } else if (this.ambientes == "DES, HMP") {
      this.solicitacaoMassaRequest.idAmbiente = [1, 2];
    } else if (this.ambientes == "HMP, TQS") {
      this.solicitacaoMassaRequest.idAmbiente = [2, 3];
    } else if (this.ambientes == "DES") {
      this.solicitacaoMassaRequest.idAmbiente = [1];
    } else if (this.ambientes == "TQS") {
      this.solicitacaoMassaRequest.idAmbiente = [3];
    } else if (this.ambientes == "HMP") {
      this.solicitacaoMassaRequest.idAmbiente = [2];
    }
    // this.solicitacaoMassaRequest.idUsuarioSolicitante = 17; //TODO pegar o usuario logado
    this.solicitacaoMassaRequest.idServico = Number.parseInt(this.idServico);
    this.solicitacaoMassaRequest.idTipoMassa =
      this.gerarForm.value.tipoCadastramento;
    this.solicitacaoMassaRequest.qtdRegistroSolicitacao =
      this.gerarForm.value.qtde;
    this.solicitacaoMassaRequest.noDemandaUtzcoMassaDado =
      this.gerarForm.value.noDemandaUtzcoMassaDado;
    this.solicitacaoMassaRequest.idUsuario = [];
    if (this.selectedUsuarios != null && this.selectedUsuarios.length > 0) {
      for (const element of this.selectedUsuarios) {
        this.solicitacaoMassaRequest.idUsuario.push(element.NU_IDNTR_USUARIO);
      }
    }
    this.solicitacaoMassaRequest.atributos = [];
    if (this.dadosEspecificos) {
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 1,
        nomeAtributo: "NU_CPF",
        valorSolicitado: this.gerarForm.value.cpf,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 76,
        nomeAtributo: "NU_AGENCIA",
        valorSolicitado: this.gerarForm.value.agencia,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 133,
        nomeAtributo: "NU_PRODUTO_CONTA_NSGD",
        valorSolicitado: this.gerarForm.value.produto,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 134,
        nomeAtributo: "NU_PROPRIEDADE_CONTA_NSGD",
        valorSolicitado: this.gerarForm.value.propriedade,
      });
    }
    if (this.mostraSenha) {
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 89,
        nomeAtributo: "IC_SENHA_CONTA",
        valorSolicitado: this.gerarForm.value.senha,
      });
    }
    this.service.post("MassaTeste", this.solicitacaoMassaRequest).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigateByUrl(
          "/result-gera-massa/" + data.idSolicitacaoMassaDado
        );
        this.messageService.enviarMensagemSucesso();
      },
      error: (error) => {
        this.messageService.enviarMensagemErro(error.error);
        console.error("Error GeraMassa9Component submitProsseguir", error);
      },
    });
  }

  buscarUsuarios(): void {
    localStorage.setItem("idServico", this.idServico);
    localStorage.setItem("ambientes", this.ambientes);
    this.router.navigateByUrl("/listar-usuarios");
  }

  voltar(): void {
    this.router.navigateByUrl("/listar-massa");
  }

  get f(): { [key: string]: AbstractControl } {
    return this.gerarForm.controls;
  }
}
