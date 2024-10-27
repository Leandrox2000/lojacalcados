import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AmbienteResponse } from "src/app/entities/ambienteResponse";
import { InterfaceServicoDadosRequest } from "src/app/entities/interfaceServicoDadosRequest";
import { ServicoDadosRequest } from "src/app/entities/servicoDadoRequest";
import { ServicoDadosResponse } from "src/app/entities/servicoDadoResponse";
import { TipoMassaResponse } from "src/app/entities/tipoMassaResponse";
import { HttpService } from "src/app/shared/services/http.service";
import { MessageService } from "../../services/message.service";
import { AtributoServicoRequest } from "src/app/entities/atributoServicoRequest";

@Component({
  selector: "app-manter-servico-dados",
  templateUrl: "./manter-servico-dados.component.html",
  styleUrls: ["./manter-servico-dados.component.scss"],
})
export class ManterServicoDadosComponent implements OnInit {
  submitted: boolean = false;
  servico: ServicoDadosResponse;
  desabilitado: boolean = false;
  edicao: boolean = false;
  idServico: string;
  titulo: string;
  tituloBotao: string;
  manterForm: FormGroup;
  listaAmbientes: AmbienteResponse[];
  listaTipoCadastramentoCombo: TipoMassaResponse[];
  listaAtributos: any[];
  listaAtributosResposta: AtributoServicoRequest[];
  listaInterfaceSistema: any[];
  listaAmbientesResposta: AmbienteResponse[];
  listaInterfaceSistemaResposta: any[];
  listaTipoCadastramentoResposta: any[];
  indexAtributo: number;
  constructor(
    private service: HttpService,
    private messageService: MessageService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.indexAtributo = 0;
    this.manterForm = this.fb.group({
      nomeServico: new FormControl("", [
        Validators.required,
        Validators.maxLength(200),
      ]),
      negocial: new FormControl(""),
      ativo: new FormControl("S", Validators.required),
      automatizado: new FormControl("N", Validators.required),
      ordem: new FormControl("0", [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(127),
      ]),
      limiteNegocio: new FormControl("0", [
        Validators.minLength(0),
        Validators.maxLength(32767),
      ]),
      descricao: new FormControl("", Validators.maxLength(1000)),
      ambientes: new FormArray([]),
      interfaces: new FormArray([]),
      tiposCadastramento: new FormArray([]),
      atributoServicos: new FormArray([]),
    });
    this.idServico = this.rout.snapshot.paramMap.get("idServico");
    let auxDisabled = this.rout.snapshot.paramMap.get("disabled");
    if (
      auxDisabled != null &&
      auxDisabled != undefined &&
      auxDisabled === "true"
    ) {
      this.desabilitado = true;
      this.manterForm.get("nomeServico").disable();
      this.manterForm.get("negocial").disable();
      this.manterForm.get("ativo").disable();
      this.manterForm.get("automatizado").disable();
      this.manterForm.get("ordem").disable();
      this.manterForm.get("limiteNegocio").disable();
      this.manterForm.get("descricao").disable();
    } else {
      this.desabilitado = false;
    }
    if (
      this.idServico == null ||
      this.idServico == undefined ||
      "null" === this.idServico ||
      this.idServico.trim().length == 0
    ) {
      this.idServico = "";
      this.titulo = "Cadastrar Novo Serviço de Dados";
      this.tituloBotao = "Cadastrar";
    } else if (this.desabilitado) {
      this.titulo = "Detalhar Serviço de Dados";
    } else {
      this.edicao = true;
      this.titulo = "Editar Serviço de Dados";
      this.tituloBotao = "Salvar";
    }
    this.listarAmbientes();
    this.listarAtributosResposta();
    this.listarTipoCadastramentoCombo();
    this.listarInterfaceSistema();
    if (this.edicao || this.desabilitado) {
      this.buscarServico();
      this.listarAmbientesResposta();
      this.listarInterfaceSistemaResposta();
      this.listarTipoCadastramentoResposta();
    } else {
      this.adicionarInterface();
      this.adicionarTipoCadastramento();
    }
    this.listarAtributos();
  }

  public voltar(): void {
    this.router.navigateByUrl("/listar-servicos-dados");
  }

  public salvar(): void {
    this.submitted = true;
    if (this.manterForm.invalid) {
      this.messageService.enviarMensagemAlerta(
        "Preencha os campos obrigatórios!"
      );
      return;
    }
    let ambientes: number[] = [];
    let tiposCadastramento: number[] = [];
    let interfaces: InterfaceServicoDadosRequest[] = [];
    let atributoServicos: AtributoServicoRequest[] = [];
    for (let control of this.ambientes.value) {
      if (control.selecionado) {
        ambientes.push(control.id);
      }
    }
    for (let control of this.tiposCadastramento.value) {
      tiposCadastramento.push(control.id);
    }
    for (let control of this.interfaces.value) {
      interfaces.push({
        idInteface: control.id,
        ordem: control.ordem,
      });
    }
    let servRequest: ServicoDadosRequest = {
      idServicoDado: this.edicao ? Number.parseInt(this.idServico) : null,
      nomeServicoDado: this.manterForm.value.nomeServico,
      descricaoServicoDado: this.manterForm.value.descricao,
      status: this.manterForm.value.ativo,
      nomeAreaNegocio: this.manterForm.value.negocial,
      automatizado: this.manterForm.value.automatizado,
      ordemApresentacao: Number.parseInt(this.manterForm.value.ordem),
      limiteRegistroMassa: Number.parseInt(this.manterForm.value.limiteNegocio),
      limiteAcessoMassa: Number.parseInt(this.manterForm.value.limiteNegocio),
      ambientes: ambientes,
      tiposCadastramento: tiposCadastramento,
      interfaces: interfaces,
      atributoServicos: atributoServicos,
    };
    this.service.post("FrontEnd/AtualizarServicoDado", servRequest).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.enviarMensagemSucesso();
      },
      error: (error) => {
        this.messageService.enviarMensagemErro(error.error);
        console.error("Error ManterServicoDadosComponent salvar", error);
      },
    });
  }

  async buscarServico() {
    let queryParams = new HttpParams().append("idServico", this.idServico);
    this.service
      .get("FrontEnd/ObterServicosPorId", queryParams)
      .subscribe((data: ServicoDadosResponse[]) => {
        console.log(data);
        this.servico = data[0];
        this.manterForm
          .get("nomeServico")
          .patchValue(this.servico.NO_SERVICO_DADO);
        this.manterForm
          .get("limiteNegocio")
          .patchValue(this.servico.NU_LIMITE_REGISTRO_MASSA);
        this.manterForm
          .get("negocial")
          .patchValue(this.servico.NO_AREA_NEGOCIO);
        this.manterForm.get("ativo").patchValue(this.servico.IC_ATIVO);
        this.manterForm
          .get("automatizado")
          .patchValue(this.servico.IC_AUTOMATIZADO);
        this.manterForm
          .get("descricao")
          .patchValue(this.servico.DE_SERVICO_DADO);
        this.manterForm
          .get("ordem")
          .patchValue(this.servico.NU_ORDEM_APRESENTACAO);
      });
  }

  async listarAmbientes() {
    this.listaAmbientes = [];
    this.service
      .get("FrontEnd/ObterAmbientes", new HttpParams())
      .subscribe((data: AmbienteResponse[]) => {
        console.log(data);
        this.listaAmbientes = data;
        if (!this.edicao && !this.desabilitado) {
          this.cadastrarAmbientes();
        }
      });
  }

  private preencherAmbientes(id: number, sel: boolean, nome: string): void {
    this.ambientes.push(
      this.fb.group({
        id: new FormControl(id),
        selecionado: new FormControl(sel),
        nome: new FormControl(nome),
      })
    );
  }

  async listarAmbientesResposta() {
    this.listaAmbientesResposta = [];
    let queryParams = new HttpParams()
      .append("idServico", this.idServico)
      .append("sistema", "");
    this.service
      .get("FrontEnd/ObterAmbientes", queryParams)
      .subscribe((data: AmbienteResponse[]) => {
        console.log(data);
        this.listaAmbientesResposta = data;
        if (
          this.listaAmbientesResposta != null &&
          this.listaAmbientesResposta.length > 0
        ) {
          for (const amb of this.listaAmbientes) {
            let achou: boolean = false;
            for (const elt of this.listaAmbientesResposta) {
              if (elt.NU_IDNTR_AMBIENTE === amb.NU_IDNTR_AMBIENTE) {
                achou = true;
                this.preencherAmbientes(
                  elt.NU_IDNTR_AMBIENTE,
                  true,
                  elt.NO_AMBIENTE
                );
                break;
              }
            }
            if (!achou) {
              this.preencherAmbientes(
                amb.NU_IDNTR_AMBIENTE,
                false,
                amb.NO_AMBIENTE
              );
            }
          }
        } else {
          this.cadastrarAmbientes();
        }
      });
  }

  async cadastrarAmbientes() {
    for (const amb of this.listaAmbientes) {
      this.preencherAmbientes(amb.NU_IDNTR_AMBIENTE, false, amb.NO_AMBIENTE);
    }
  }

  async listarInterfaceSistemaResposta() {
    this.listaInterfaceSistemaResposta = [];
    let queryParams = new HttpParams().append("idServicoDado", this.idServico);
    this.service
      .get("FrontEnd/ObterInterfaceSistemas", queryParams)
      .subscribe((data: any[]) => {
        console.log(data);
        this.listaInterfaceSistemaResposta = data;
        if (
          this.listaInterfaceSistemaResposta == null ||
          this.listaInterfaceSistemaResposta.length == 0
        ) {
          this.adicionarInterface();
        } else {
          for (const element of this.listaInterfaceSistemaResposta) {
            this.preencherInterface(
              element.NU_IDNTR_INTFCE_SISTEMA,
              element.NU_ORDEM_EXCO_INTFCE
            );
          }
        }
      });
  }

  async listarInterfaceSistema() {
    this.listaInterfaceSistema = [];
    this.service
      .get("FrontEnd/ObterInterfaceSistemas", new HttpParams())
      .subscribe((data: any[]) => {
        console.log(data);
        this.listaInterfaceSistema = data;
      });
  }

  public adicionarInterface(): void {
    this.interfaces.push(
      this.fb.group({
        id: new FormControl("", [Validators.required]),
        ordem: new FormControl("", [Validators.required]),
      })
    );
  }

  private preencherInterface(id: number, oderm: number): void {
    this.interfaces.push(
      this.fb.group({
        id: new FormControl(id, [Validators.required]),
        ordem: new FormControl(oderm, [Validators.required]),
      })
    );
  }

  public removerInterface(index: number): void {
    if (this.interfaces.length == 1) {
      alert("Pelo menos um item é obrigatório!");
      return;
    }
    this.interfaces.removeAt(index);
  }

  async listarTipoCadastramentoResposta() {
    this.listaTipoCadastramentoResposta = [];
    let queryParams = new HttpParams().append("idServicoDado", this.idServico);
    this.service
      .get("FrontEnd/ObterTipoMassa", queryParams)
      .subscribe((data: any[]) => {
        console.log(data);
        this.listaTipoCadastramentoResposta = data;
        if (
          this.listaTipoCadastramentoResposta == null ||
          this.listaTipoCadastramentoResposta.length == 0
        ) {
          this.adicionarTipoCadastramento();
        } else {
          for (const element of this.listaTipoCadastramentoResposta) {
            this.preencherTipoCadastramento(element.NU_IDNTR_TIPO_MASSA_DADO);
          }
        }
      });
  }

  async listarTipoCadastramentoCombo() {
    this.listaTipoCadastramentoCombo = [];
    this.service
      .get("FrontEnd/ObterTipoMassa", new HttpParams())
      .subscribe((data: TipoMassaResponse[]) => {
        console.log(data);
        this.listaTipoCadastramentoCombo = data;
      });
  }

  public adicionarTipoCadastramento(): void {
    if (
      this.tiposCadastramento.length > 0 &&
      this.tiposCadastramento.length >= this.listaTipoCadastramentoCombo.length
    ) {
      alert("Limite Máximo excedido!");
      return;
    }
    this.tiposCadastramento.push(
      this.fb.group({ id: new FormControl("", [Validators.required]) })
    );
  }

  private preencherTipoCadastramento(id: number): void {
    this.tiposCadastramento.push(
      this.fb.group({
        id: new FormControl(id, [Validators.required]),
      })
    );
  }

  public removerTipoCadastramento(index: number): void {
    if (this.tiposCadastramento.length == 1) {
      alert("Pelo menos um item é obrigatório!");
      return;
    }
    this.tiposCadastramento.removeAt(index);
  }

  async listarAtributosResposta() {
    this.listaAtributosResposta = [];
    let queryParams = new HttpParams().append("idServicoDado", this.idServico);
    this.service
      .get("FrontEnd/ObterAtributosServicosPorId", queryParams)
      .subscribe((data: AtributoServicoRequest[]) => {
        console.log(data);
        this.listaAtributosResposta = data;
        if (
          this.listaAtributosResposta == null ||
          this.listaAtributosResposta.length == 0
        ) {
          this.adicionarAtributos();
        } else {
          for (const element of this.listaAtributosResposta) {
            this.preencherAtributo(element);
          }
        }
      });
  }

  async listarAtributos() {
    this.listaAtributos = [];
    this.service
      .get("FrontEnd/ObterAtributos", new HttpParams())
      .subscribe((data: any[]) => {
        console.log(data);
        this.listaAtributos = data;
      });
  }

  public adicionarAtributos(): void {
    this.atributoServicos.push(
      this.fb.group({
        idTipoMassa: new FormControl("", [Validators.required]),
        idAtributo: new FormControl("", [Validators.required]),
        idPapelAtributo: new FormControl("E", [Validators.required]),
        idOrdenApresentacao: new FormControl("0", [Validators.required]),
        icAtributoObrigatorio: new FormControl("N"),
        icUtilizaCntdoPadrao: new FormControl("N"),
        icUtilizaApicoPadrao: new FormControl("N"),
        icGeraConteudoAtributo: new FormControl("N"),
        deCntdoAtbtoServico: new FormControl(""),
        deAptcoAtbtoServico: new FormControl(""),
        icApresentaAtributo: new FormControl("N"),
        icInformaCntdoAtributo: new FormControl("N"),
        icvalidaAtbtoSistema: new FormControl("N"),
        deexcoValidacao: new FormControl(""),
        noAtributoServico: new FormControl(""),
      })
    );
  }

  private preencherAtributo(element: AtributoServicoRequest): void {
    this.atributoServicos.push(
      this.fb.group({
        idTipoMassa: new FormControl(element.idTipoMassa, [
          Validators.required,
        ]),
        idAtributo: new FormControl(element.idAtributo, [Validators.required]),
        idPapelAtributo: new FormControl(element.idPapelAtributo, [
          Validators.required,
        ]),
        idOrdenApresentacao: new FormControl(element.idOrdenApresentacao, [
          Validators.required,
        ]),
        icAtributoObrigatorio: new FormControl(element.icAtributoObrigatorio),
        icUtilizaCntdoPadrao: new FormControl(element.icUtilizaCntdoPadrao),
        icUtilizaApicoPadrao: new FormControl(element.icUtilizaApicoPadrao),
        icGeraConteudoAtributo: new FormControl(element.icGeraConteudoAtributo),
        deCntdoAtbtoServico: new FormControl(element.deCntdoAtbtoServico),
        deAptcoAtbtoServico: new FormControl(element.deAptcoAtbtoServico),
        icApresentaAtributo: new FormControl(element.icApresentaAtributo),
        icInformaCntdoAtributo: new FormControl(element.icInformaCntdoAtributo),
        icvalidaAtbtoSistema: new FormControl(element.icvalidaAtbtoSistema),
        deexcoValidacao: new FormControl(element.deexcoValidacao),
        noAtributoServico: new FormControl(element.noAtributoServico),
      })
    );
  }

  public removerAtributos(index: number): void {
    if (this.atributoServicos.length == 1) {
      alert("Pelo menos um item é obrigatório!");
      return;
    }
    this.atributoServicos.removeAt(index);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.manterForm.controls;
  }

  get tiposCadastramento(): FormArray {
    return this.manterForm.get("tiposCadastramento") as FormArray;
  }

  get interfaces(): FormArray {
    return this.manterForm.get("interfaces") as FormArray;
  }

  get ambientes(): FormArray {
    return this.manterForm.get("ambientes") as FormArray;
  }

  get atributoServicos(): FormArray {
    return this.manterForm.get("atributoServicos") as FormArray;
  }
}
