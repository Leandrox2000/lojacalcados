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
import { CepResponse } from "src/app/entities/cepResponse";
import { Observable } from "rxjs/Observable";
import { map, startWith } from "rxjs/operators";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-gera-massa",
  templateUrl: "./gera-massa.component.html",
  styleUrls: ["./gera-massa.component.scss"],
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
export class GeraMassaComponent implements OnInit, AfterContentInit {
  minDate: string;
  maxDate: string;
  //agencia: FormControl;
  //gerente: FormControl;
  natLocalidade: FormControl;
  municipio: FormControl;
  gerarForm: FormGroup;
  submitted: boolean = false;
  dadosEspecificos: boolean = false;
  mostraDataObito: boolean = false;
  marcaDoi: boolean = false;
  situacaoDesabilitado: boolean = true;
  listaTipoCadastramento = [];
  listaSituacaoReceitaFederal: AtributosResponse[] = [];
  listaSexo: AtributosResponse[] = [];
  listaAgencias: string[] = [];
  filteredAgencia: Observable<string[]>;
  listaGerentes: string[] = [];
  filteredGerente: Observable<string[]>;
  listaSegmentos: AtributosResponse[] = [];
  listaNaturalidadeUF: AtributosResponse[] = [];
  listaNatLocalidade: string[] = [];
  filteredNatLocalidade: Observable<string[]>;
  listaNatLocalidadeObjeto: AtributosResponse[] = [];
  listaEstadoCivil: AtributosResponse[] = [];
  listaMeioTipo: AtributosResponse[] = [];
  listaMeioPrefixo: AtributosResponse[] = [];
  listaTipoLogradouro: AtributosResponse[] = [];
  listaOcupacao: AtributosResponse[] = [];
  listaMunicipios: string[] = [];
  listaMunicipiosObjeto: AtributosResponse[] = [];
  filteredMunicipio: Observable<string[]>;
  listaUfs: AtributosResponse[] = [];
  listaTipoRenda: AtributosResponse[] = [];
  selectedUsuarios: Usuario[] = [];
  idServico: string;
  ambientes: string;
  descServico: string;
  servico: any;
  titulo: string;
  mensagem: string;
  qtdeMaxima: number = 250;
  auxQtdeMaxima: number = 250;
  solicitacaoMassaRequest: SolicitacaoMassaRequest = <
    SolicitacaoMassaRequest
  >{};
  constructor(
    private messageService: MessageService,
    private service: HttpService,
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
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1)
      .toISOString()
      .split("T")[0];
    this.maxDate = new Date().toISOString().split("T")[0];
    //this.agencia = new FormControl("");
    //this.gerente = new FormControl("");
    this.natLocalidade = new FormControl("");
    this.municipio = new FormControl("");
    this.gerarForm = this.fb.group({
      tipoCadastramento: new FormControl("1", Validators.required),
      situacao: new FormControl("", Validators.required),
      sexo: new FormControl(""),
      cpf: new FormControl("", GenericValidator.isValidCpf()),
      nascimento: new FormControl(
        null, // validates date format yyyy-mm-dd with regular expression
        [
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ]
      ),
      obito: new FormControl(null),
      nomePessoa: new FormControl(""),
      nomeMae: new FormControl(""),
      menorIdade: new FormControl("N", Validators.required),
      nis: new FormControl("N", Validators.required),
      desejaDoi: new FormControl("N", Validators.required),
      //segmento: new FormControl(""),
      naturalidade: new FormControl(""),
      estadoCivil: new FormControl(""),
      meioTipo: new FormControl("1"),
      meioTipoMail: new FormControl("2"),
      meioPrefixo: new FormControl(""),
      meioNumero: new FormControl(""),
      email: new FormControl("", Validators.email),
      cep: new FormControl(""),
      tipoLogradouro: new FormControl(""),
      logradouro: new FormControl(""),
      bairro: new FormControl(""),
      uf: new FormControl(""),
      rendaOcupacao: new FormControl(""),
      rendaTipo: new FormControl(""),
      valorRenda: new FormControl(null),
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
      this.idServico = sessionStorage.getItem("idServico");
      this.ambientes = sessionStorage.getItem("ambientes");
      this.gerarForm
        .get("tipoCadastramento")
        .patchValue(sessionStorage.getItem("idTipoMassa"));
      this.onChangeTipoCadastramento();
      this.gerarForm
        .get("noDemandaUtzcoMassaDado")
        .patchValue(sessionStorage.getItem("noDemandaUtzcoMassaDado"));
      this.gerarForm
        .get("menorIdade")
        .patchValue(sessionStorage.getItem("menorIdade"));
      this.gerarForm.get("qtde").patchValue(sessionStorage.getItem("qtde"));
      this.onChangeQtdeMaxima();
      this.gerarForm
        .get("desejaDoi")
        .patchValue(sessionStorage.getItem("desejaDoi"));
      this.onChangeDesejaDoi();
      this.gerarForm.get("nis").patchValue(sessionStorage.getItem("nis"));
      this.gerarForm.get("obito").patchValue(sessionStorage.getItem("obito"));
    }
    if (this.idServico != null) {
      this.buscarDescricaoServico(this.idServico);
      this.listarTipoCadastramento();
      this.buscarMensagemProsseguir();
    }
    this.listarSituacaoReceitaFederal();
    this.listarSexo();
    this.selectedUsuarios = JSON.parse(
      sessionStorage.getItem("usuarios") ?? "[]"
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
    let nascimento = sessionStorage.getItem("nascimento");
    if (nascimento == null) {
      this.onChangeMenorIdade();
    } else {
      this.gerarForm.get("nascimento").patchValue(nascimento);
    }
  }

  async abrirModalProsseguir() {
    this.submitted = true;
    if (this.gerarForm.invalid) {
      return;
    }
    if (
      this.mostraDataObito &&
      this.gerarForm.value.obito != null &&
      this.gerarForm.value.nascimento != null
    ) {
      let parts: number[] = this.gerarForm.value.nascimento.split("-");
      let dateNascimento = new Date(parts[0], parts[1] - 1, parts[2]);
      parts = this.gerarForm.value.obito.split("-");
      let dateObito = new Date(parts[0], parts[1] - 1, parts[2]);
      if (dateNascimento.getTime() > dateObito.getTime()) {
        this.messageService.enviarMensagemErro(
          "Data de Nascimento deve ser menor ou igual a Data de Óbito!"
        );
        return;
      }
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

  async listarSituacaoReceitaFederal() {
    let queryParams = new HttpParams()
      .append("idAtributo", "9")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaSituacaoReceitaFederal = data;
        let situacao = sessionStorage.getItem("situacao");
        if (situacao == null) {
          for (const element of this.listaSituacaoReceitaFederal) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("situacao").patchValue(element.CO_DOMINIO);
              break;
            }
          }
        } else {
          this.gerarForm.get("situacao").patchValue(situacao);
          this.onChangeSituacao();
        }
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
        for (const element of data) {
          this.listaAgencias.push(element.DE_APRESENTACAO_DOMINIO);
          //if (element.IC_DOMINIO_PADRAO == "S") {
          //  this.agencia.patchValue(element.DE_APRESENTACAO_DOMINIO);
          //}
        }
        //this.filteredAgencia = this.agencia.valueChanges.pipe(
        //  startWith(""),
        //  map((value) => this._filterAgencia(value))
        //);
      });
  }

  async listarGerentes() {
    if (this.listaGerentes.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "80")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        for (const element of data) {
          this.listaGerentes.push(element.DE_APRESENTACAO_DOMINIO);
          //if (element.IC_DOMINIO_PADRAO == "S") {
          //  this.gerente.patchValue(element.DE_APRESENTACAO_DOMINIO);
          //}
        }
        //this.filteredGerente = this.gerente.valueChanges.pipe(
        //  startWith(""),
        //  map((value) => this._filterGerente(value))
        //);
      });
  }

  async listarSegmentos() {
    if (this.listaSegmentos.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "81")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaSegmentos = data;
        for (const element of this.listaSegmentos) {
          if (element.IC_DOMINIO_PADRAO == "S") {
            this.gerarForm.get("segmento").patchValue(element.CO_DOMINIO);
            break;
          }
        }
      });
  }

  async listarNaturalidadeUF() {
    if (this.listaNaturalidadeUF.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "24")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaNaturalidadeUF = data;
        this.listaNaturalidadeUF = this.listaNaturalidadeUF.sort((a, b) =>
          a.DE_CONTEUDO_DOMINIO > b.DE_CONTEUDO_DOMINIO ? 1 : -1
        );
        let naturalidade = sessionStorage.getItem("naturalidade");
        if (naturalidade != null) {
          this.gerarForm.get("naturalidade").patchValue(naturalidade);
          this.onChangeNaturalidade();
        } else {
          for (const element of this.listaNaturalidadeUF) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("naturalidade").patchValue(element.CO_DOMINIO);
              this.listarNatLocalidade(element.CO_DOMINIO);
              break;
            }
          }
        }
      });
  }

  async listarNatLocalidade(uf: string) {
    if (uf == null || uf.trim().length == 0) {
      return;
    }
    this.listaNatLocalidade = [];
    this.listaNatLocalidadeObjeto = [];
    this.natLocalidade.patchValue("");
    let queryParams = new HttpParams()
      .append("idAtributo", "25")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento)
      .append("coAtributoPai", uf);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        let natLocalidade = sessionStorage.getItem("natLocalidade");
        sessionStorage.removeItem("natLocalidade");
        if (natLocalidade != null) {
          this.natLocalidade.patchValue(natLocalidade);
        }
        for (const element of data) {
          this.listaNatLocalidade.push(element.DE_APRESENTACAO_DOMINIO);
          this.listaNatLocalidadeObjeto.push(element);
          if (natLocalidade == null && element.IC_DOMINIO_PADRAO == "S") {
            this.natLocalidade.patchValue(element.DE_APRESENTACAO_DOMINIO);
          }
        }
        this.filteredNatLocalidade = this.natLocalidade.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterNatLocalidade(value))
        );
      });
  }

  async listarEstadoCivil() {
    if (this.listaEstadoCivil.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "12")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaEstadoCivil = data;
        let estadoCivil = sessionStorage.getItem("estadoCivil");
        if (estadoCivil == null) {
          for (const element of this.listaEstadoCivil) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("estadoCivil").patchValue(element.CO_DOMINIO);
              break;
            }
          }
        } else {
          this.gerarForm.get("estadoCivil").patchValue(estadoCivil);
        }
      });
  }

  async listarMeioTipo() {
    if (this.listaMeioTipo.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "96")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaMeioTipo = data;
        for (const element of this.listaMeioTipo) {
          if (element.IC_DOMINIO_PADRAO == "S") {
            this.gerarForm.get("meioTipo").patchValue(element.CO_DOMINIO);
            break;
          }
        }
      });
  }

  async listarMeioPrefixo() {
    if (this.listaMeioPrefixo.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "98")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaMeioPrefixo = data;
        let meioPrefixo = sessionStorage.getItem("meioPrefixo");
        if (meioPrefixo == null) {
          for (const element of this.listaMeioPrefixo) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("meioPrefixo").patchValue(element.CO_DOMINIO);
              break;
            }
          }
        } else {
          this.gerarForm.get("meioPrefixo").patchValue(meioPrefixo);
        }
      });
  }

  async listarTipoLogradouro() {
    if (this.listaTipoLogradouro.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "29")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaTipoLogradouro = data;
        for (const element of this.listaTipoLogradouro) {
          if (element.IC_DOMINIO_PADRAO == "S") {
            this.gerarForm.get("tipoLogradouro").patchValue(element.CO_DOMINIO);
            break;
          }
        }
      });
  }

  public listarOcupacao(): void {
    let queryParams = new HttpParams()
      .append("idAtributo", "62")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento)
      .append("coAtributoPai", this.gerarForm.value.rendaTipo);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaOcupacao = data;
        let rendaOcupacao = sessionStorage.getItem("rendaOcupacao");
        if (rendaOcupacao == null) {
          for (const element of this.listaOcupacao) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm
                .get("rendaOcupacao")
                .patchValue(element.CO_DOMINIO);
              break;
            }
          }
        } else {
          this.gerarForm.get("rendaOcupacao").patchValue(rendaOcupacao);
        }
      });
  }

  async listarMunicipios(uf: string, nomeMunicipio: string) {
    if (uf == null || uf.trim().length == 0) {
      return;
    }
    this.listaMunicipios = [];
    this.listaMunicipiosObjeto = [];
    this.municipio.patchValue("");
    let queryParams = new HttpParams()
      .append("idAtributo", "39")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento)
      .append("coAtributoPai", uf);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        let municipio = sessionStorage.getItem("municipio");
        sessionStorage.removeItem("municipio");
        if (municipio != null) {
          this.municipio.patchValue(municipio);
        }
        for (const element of data) {
          this.listaMunicipios.push(element.DE_APRESENTACAO_DOMINIO);
          this.listaMunicipiosObjeto.push(element);
          if (
            municipio == null &&
            ((nomeMunicipio != null &&
              nomeMunicipio != undefined &&
              element.DE_CONTEUDO_DOMINIO === nomeMunicipio) ||
              (nomeMunicipio == undefined && element.IC_DOMINIO_PADRAO == "S"))
          ) {
            this.municipio.patchValue(element.DE_APRESENTACAO_DOMINIO);
          }
        }
        this.filteredMunicipio = this.municipio.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterMunicipio(value))
        );
        this.municipio.updateValueAndValidity();
      });
  }

  async listarUfs() {
    if (this.listaUfs.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "38")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaUfs = data;
        this.listaUfs = this.listaUfs.sort((a, b) =>
          a.DE_CONTEUDO_DOMINIO > b.DE_CONTEUDO_DOMINIO ? 1 : -1
        );
        let uf = sessionStorage.getItem("uf");
        if (uf != null) {
          this.gerarForm.get("uf").patchValue(uf);
          this.listarMunicipios(uf, undefined);
        } else {
          for (const element of this.listaUfs) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("uf").patchValue(element.CO_DOMINIO);
              this.listarMunicipios(element.CO_DOMINIO, undefined);
              break;
            }
          }
        }
      });
  }

  async listarTipoRenda() {
    if (this.listaTipoRenda.length > 0) {
      return; //nao executar desnecessariamente
    }
    let queryParams = new HttpParams()
      .append("idAtributo", "59")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaTipoRenda = data;
        let rendaTipo = sessionStorage.getItem("rendaTipo");
        if (rendaTipo == null) {
          for (const element of this.listaTipoRenda) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("rendaTipo").patchValue(element.CO_DOMINIO);
              break;
            }
          }
        } else {
          this.gerarForm.get("rendaTipo").patchValue(rendaTipo);
        }
      });
  }

  async obterValorPadrao(
    idAtributo,
    componente: string,
    idAtributoDependente: number,
    valorDependente: string
  ) {
    let queryParams: HttpParams;
    if (idAtributoDependente != null) {
      queryParams = new HttpParams()
        .append("idAtributo", idAtributo)
        .append("idServico", this.idServico)
        .append("idTipoMassa", this.gerarForm.value.tipoCadastramento)
        .append("idAtributoDependente", idAtributoDependente)
        .append("valorDependente", valorDependente);
    } else {
      queryParams = new HttpParams()
        .append("idAtributo", idAtributo)
        .append("idServico", this.idServico)
        .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    }
    this.service
      .get("FrontEnd/ObterValorPadrao", queryParams)
      .subscribe((data: AtributosPadraoResponse[]) => {
        console.log("obterValorPadrao " + componente);
        console.log(data);
        if (data != null && data.length > 0) {
          if (
            data[0].DE_CNTDO_ATBTO_SERVICO != null &&
            data[0].DE_CNTDO_ATBTO_SERVICO != "null"
          ) {
            this.gerarForm
              .get(componente)
              .patchValue(data[0].DE_CNTDO_ATBTO_SERVICO);
            if (componente === "cep") {
              this.onChangeCEP(data[0].DE_CNTDO_ATBTO_SERVICO);
            }
          }
        }
      });
  }

  async listarSexo() {
    let queryParams = new HttpParams()
      .append("idAtributo", "21")
      .append("idServico", this.idServico)
      .append("idTipoMassa", this.gerarForm.value.tipoCadastramento);
    this.service
      .get("FrontEnd/ObterDominioAtributo", queryParams)
      .subscribe((data: AtributosResponse[]) => {
        console.log(data);
        this.listaSexo = data;
        let sexo = sessionStorage.getItem("sexo");
        if (sexo == null) {
          for (const element of this.listaSexo) {
            if (element.IC_DOMINIO_PADRAO == "S") {
              this.gerarForm.get("sexo").patchValue(element.CO_DOMINIO);
              break;
            }
          }
        } else {
          this.gerarForm.get("sexo").patchValue(sexo);
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
        if (
          data[0].DE_MENSAGEM == null ||
          data[0].DE_MENSAGEM == undefined ||
          "null" === data[0].DE_MENSAGEM
        ) {
          this.mensagem = "";
        } else {
          this.mensagem = data[0].DE_MENSAGEM.replace("\\n", "<br>");
        }
      });
  }

  async buscarDescricaoServico(idServico) {
    let queryParams = new HttpParams().append("idServico", idServico);
    this.service
      .get("FrontEnd/ObterServicosPorId", queryParams)
      .subscribe((data: any[]) => {
        console.log(data);
        this.servico = data[0];
        this.descServico = this.servico.NO_SERVICO_DADO;
        this.qtdeMaxima = this.servico.NU_LIMITE_REGISTRO_MASSA;
        this.auxQtdeMaxima = this.servico.NU_LIMITE_REGISTRO_MASSA;
      });
  }

  public onChangeQtdeMaxima(): void {
    if (this.gerarForm.value.cpf.length >= 11) {
      this.gerarForm.get("qtde").patchValue(1);
      this.qtdeMaxima = 1;
    } else if (this.gerarForm.value.qtde > this.auxQtdeMaxima) {
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
    } else {
      this.dadosEspecificos = false;
    }
  }

  public onChangeMenorIdade(): void {
    this.obterValorPadrao(4, "nascimento", 14, this.gerarForm.value.menorIdade);
  }

  public async onChangeCEP(valor: string) {
    let cep = this.gerarForm.value.cep;
    if (
      cep == null ||
      (cep.trim().length < 8 &&
        (valor == null || valor == undefined || valor.trim().length < 8))
    ) {
      return;
    }
    if (cep.trim().length == 8) {
      cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (valor != undefined && valor.trim().length == 8) {
      cep = valor.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (valor != undefined && valor.trim().length == 9) {
      cep = valor;
    }
    let queryParams = new HttpParams().append("valor", cep);
    this.service
      .get("FrontEnd/ValidarCEP", queryParams)
      .subscribe((data: CepResponse[]) => {
        if (data != null && data.length > 0) {
          console.log(data);
          this.gerarForm.get("uf").patchValue(data[0].SG_UF);
          this.gerarForm
            .get("tipoLogradouro")
            .patchValue(data[0].SG_TP_LOGRADOURO);
          this.gerarForm.get("logradouro").patchValue(data[0].NO_LOGRADOURO);
          this.gerarForm.get("bairro").patchValue(data[0].NO_BAIRRO);
          this.listarMunicipios(data[0].SG_UF, data[0].NO_MUNICIPIO);
        } else {
          this.gerarForm.get("uf").patchValue("");
          this.listaMunicipios = [];
          this.gerarForm.get("municipio").patchValue("");
          this.gerarForm.get("tipoLogradouro").patchValue("");
          this.gerarForm.get("logradouro").patchValue("");
          this.gerarForm.get("bairro").patchValue("");
          alert("CEP não encontrado!");
        }
      });
  }

  public onChangeSituacao(): void {
    if (Number.parseInt(this.gerarForm.value.situacao) == 3) {
      this.mostraDataObito = true;
      this.gerarForm.controls["obito"].setValidators([
        Validators.required,
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]);
      this.obterValorPadrao(15, "obito", 9, this.gerarForm.value.situacao);
    } else {
      this.mostraDataObito = false;
      this.gerarForm.controls["obito"].clearValidators();
    }
    this.gerarForm.controls["obito"].updateValueAndValidity();
  }

  public onChangeCPF(event: any): void {
    if (event.target.value.length >= 11) {
      this.validarCPF(event.target.value);
      this.gerarForm.get("qtde").patchValue(1);
    }
  }

  private validarCPF(cpf: string): void {
    let queryParams = new HttpParams()
      .append("cpf", cpf)
      .append("idAmbiente", this.preencherAmbiente().toString());
    this.service.get("Siiso/ValidarCpfInclusao", queryParams).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        this.gerarForm.get("cpf").patchValue("");
        this.messageService.enviarMensagemErro(error.error);
      },
    });
  }

  public onChangeUF(): void {
    this.listarMunicipios(this.gerarForm.value.uf, undefined);
  }

  public onChangeNaturalidade(): void {
    this.listarNatLocalidade(this.gerarForm.value.naturalidade);
  }

  async listarDadosEspecificos() {
    //this.listarAgencias();
    //this.listarGerentes();
    //this.listarSegmentos();
    this.listarNaturalidadeUF();
    this.listarEstadoCivil();
    this.listarOcupacao();
    this.listarMeioTipo();
    this.listarMeioPrefixo();
    this.listarTipoLogradouro();
    this.listarUfs();
    this.listarTipoRenda();
    let meioNumero = sessionStorage.getItem("meioNumero");
    if (meioNumero == null) {
      this.obterValorPadrao(97, "meioNumero", null, null);
    } else {
      this.gerarForm.get("meioNumero").patchValue(meioNumero);
    }
    let cep = sessionStorage.getItem("cep");
    let voltar = sessionStorage.getItem("voltar");
    if (voltar == null && (cep == null || cep.trim().length == 0)) {
      this.obterValorPadrao(34, "cep", null, null);
    } else {
      this.gerarForm.get("cep").patchValue(cep);
      this.gerarForm
        .get("tipoLogradouro")
        .patchValue(sessionStorage.getItem("tipoLogradouro"));
      this.gerarForm
        .get("logradouro")
        .patchValue(sessionStorage.getItem("logradouro"));
      this.gerarForm.get("bairro").patchValue(sessionStorage.getItem("bairro"));
      this.gerarForm.get("uf").patchValue(sessionStorage.getItem("uf"));
      this.onChangeUF();
    }

    let cpf = sessionStorage.getItem("cpf");
    if (cpf == null) {
      this.obterValorPadrao(1, "cpf", null, null);
    } else {
      this.gerarForm.get("cpf").patchValue(cpf);
    }
    //this.obterValorPadrao(4, "nascimento", null, null);
    let nomePessoa = sessionStorage.getItem("nomePessoa");
    if (nomePessoa == null) {
      this.obterValorPadrao(6, "nomePessoa", null, null);
    } else {
      this.gerarForm.get("nomePessoa").patchValue(nomePessoa);
    }
    let nomeMae = sessionStorage.getItem("nomeMae");
    if (nomeMae == null) {
      this.obterValorPadrao(7, "nomeMae", null, null);
    } else {
      this.gerarForm.get("nomeMae").patchValue(nomeMae);
    }
    let email = sessionStorage.getItem("email");
    if (email == null) {
      this.obterValorPadrao(135, "email", null, null);
    } else {
      this.gerarForm.get("email").patchValue(email);
    }
    let valorRenda = sessionStorage.getItem("valorRenda");
    if (valorRenda == null) {
      this.obterValorPadrao(68, "valorRenda", null, null);
    } else {
      this.gerarForm.get("valorRenda").patchValue(valorRenda);
    }
  }

  onChangeDesejaDoi() {
    if (this.gerarForm.value.desejaDoi == "A") {
      this.situacaoDesabilitado = false;
    } else {
      this.situacaoDesabilitado = true;
      this.gerarForm.get("situacao").patchValue("00");
      this.gerarForm.controls["situacao"].updateValueAndValidity();
      this.onChangeSituacao();
    }
    if (this.gerarForm.value.desejaDoi == "S") {
      this.marcaDoi = true;
    } else {
      this.marcaDoi = false;
    }
  }

  private preencherAmbiente(): number[] {
    let idAmbiente: number[];
    if (this.ambientes == "DES, HMP, TQS") {
      idAmbiente = [1, 2, 3];
    } else if (this.ambientes == "DES, TQS") {
      idAmbiente = [1, 3];
    } else if (this.ambientes == "DES, HMP") {
      idAmbiente = [1, 2];
    } else if (this.ambientes == "HMP, TQS") {
      idAmbiente = [2, 3];
    } else if (this.ambientes == "DES") {
      idAmbiente = [1];
    } else if (this.ambientes == "TQS") {
      idAmbiente = [3];
    } else if (this.ambientes == "HMP") {
      idAmbiente = [2];
    }
    return idAmbiente;
  }

  private preencherMassa(): void {
    this.solicitacaoMassaRequest.idAmbiente = this.preencherAmbiente();
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
  }

  private preencherDadosEspecificos(): void {
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 1,
      nomeAtributo: "NU_CPF",
      valorSolicitado: this.gerarForm.value.cpf,
    });
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 21,
      nomeAtributo: "IC_SEXO",
      valorSolicitado: this.gerarForm.value.sexo,
    });
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 6,
      nomeAtributo: "NO_PESSOA",
      valorSolicitado: this.gerarForm.value.nomePessoa,
    });
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 7,
      nomeAtributo: "NO_MAE",
      valorSolicitado: this.gerarForm.value.nomeMae,
    });
    //let agencia: string = "";
    //if (this.agencia.value.length > 0) {
    //  agencia = this.agencia.value.substring(0, 4);
    //}
    //this.solicitacaoMassaRequest.atributos.push({
    //  idAtributo: 76,
    //  nomeAtributo: "NU_AGENCIA",
    //  valorSolicitado: agencia,
    //});
    //
    //this.solicitacaoMassaRequest.atributos.push({
    //  idAtributo: 81,
    //  nomeAtributo: "CO_SEGMENTO_CONTA",
    //  valorSolicitado: this.gerarForm.value.segmento,
    //});
    if (!this.marcaDoi) {
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 24,
        nomeAtributo: "SG_UF_NATURALIDADE",
        valorSolicitado: this.gerarForm.value.naturalidade,
      });
      let natLocalidade: string = "";
      let nomeLocalidade: string = "";
      if (this.natLocalidade.value.length > 0) {
        for (const natObj of this.listaNatLocalidadeObjeto) {
          if (natObj.DE_APRESENTACAO_DOMINIO === this.natLocalidade.value) {
            natLocalidade = natObj.CO_DOMINIO;
            nomeLocalidade = natObj.DE_CONTEUDO_DOMINIO;
            break;
          }
        }
      }
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 25,
        nomeAtributo: "CO_MUNICIPIO_NATURALIDADE",
        valorSolicitado: natLocalidade,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 26,
        nomeAtributo: "NO_MUNICIPIO_NATURALIDADE",
        valorSolicitado: nomeLocalidade,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 12,
        nomeAtributo: "CO_ESTADO_CIVIL",
        valorSolicitado: this.gerarForm.value.estadoCivil,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 96,
        nomeAtributo: "CO_TIPO_COMUNICACAO_TEL",
        valorSolicitado: this.gerarForm.value.meioTipo,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 136,
        nomeAtributo: "CO_TIPO_COMUNICACAO_MAIL",
        valorSolicitado: this.gerarForm.value.meioTipoMail,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 98,
        nomeAtributo: "CO_PREFIXO_TEL",
        valorSolicitado: this.gerarForm.value.meioPrefixo,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 97,
        nomeAtributo: "CO_COMUNICACAO_TEL",
        valorSolicitado: this.gerarForm.value.meioNumero,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 135,
        nomeAtributo: "CO_COMUNICACAO_MAIL",
        valorSolicitado: this.gerarForm.value.email,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 34,
        nomeAtributo: "NU_CEP_ENDERECO",
        valorSolicitado: this.gerarForm.value.cep,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 29,
        nomeAtributo: "SG_TIPO_LOGRADOURO_ENDERECO",
        valorSolicitado: this.gerarForm.value.tipoLogradouro,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 30,
        nomeAtributo: "NO_LOGRADOURO_ENDERECO",
        valorSolicitado: this.gerarForm.value.logradouro,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 31,
        nomeAtributo: "NO_BAIRRO_ENDERECO",
        valorSolicitado: this.gerarForm.value.bairro,
      });
      let municipio: string = "";
      let nomeMunicipio: string = "";
      if (this.municipio.value.length > 0) {
        for (const munObj of this.listaMunicipiosObjeto) {
          if (munObj.DE_APRESENTACAO_DOMINIO === this.municipio.value) {
            municipio = munObj.CO_DOMINIO;
            nomeMunicipio = munObj.DE_CONTEUDO_DOMINIO;
            break;
          }
        }
      }
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 39,
        nomeAtributo: "CO_MUNICIPIO_ENDERECO",
        valorSolicitado: municipio,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 40,
        nomeAtributo: "NO_MUNICIPIO_ENDERECO",
        valorSolicitado: nomeMunicipio,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 38,
        nomeAtributo: "SG_UF_ENDERECO",
        valorSolicitado: this.gerarForm.value.uf,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 62,
        nomeAtributo: "CO_PROFISSAO_RENDA",
        valorSolicitado: this.gerarForm.value.rendaOcupacao,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 59,
        nomeAtributo: "CO_TIPO_RENDA",
        valorSolicitado: this.gerarForm.value.rendaTipo,
      });
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 68,
        nomeAtributo: "VR_RENDA_MENSAL_BRUTA",
        valorSolicitado: this.gerarForm.value.valorRenda,
      });
    }
  }

  private preencherAtributos(): void {
    this.solicitacaoMassaRequest.atributos = [];
    if (this.dadosEspecificos) {
      this.preencherDadosEspecificos();
    }
    let formattedDate: string = "";
    let menorIdade: string = "N";
    if (
      this.gerarForm.value.nascimento != null &&
      this.gerarForm.value.nascimento != undefined
    ) {
      formattedDate = this.gerarForm.value.nascimento;
      let nasc = formattedDate.split("-").map(Number); //YYYY-MM-dd
      let depois18Anos: Date = new Date(nasc[0] + 18, nasc[1] - 1, nasc[2]);
      let agora: Date = new Date();
      if (depois18Anos > agora) {
        menorIdade = "S";
      }
    } else {
      menorIdade = this.gerarForm.value.menorIdade;
    }
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 14,
      nomeAtributo: "IC_MENOR_IDADE",
      valorSolicitado: menorIdade,
    });
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 4,
      nomeAtributo: "DT_NASCIMENTO",
      valorSolicitado: formattedDate,
    });
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 9,
      nomeAtributo: "IC_SITUACAO_RF",
      valorSolicitado: this.gerarForm.value.situacao,
    });

    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 131,
      nomeAtributo: "IC_VINCULO_NIS_CPF",
      valorSolicitado: this.gerarForm.value.nis,
    });
    this.solicitacaoMassaRequest.atributos.push({
      idAtributo: 132,
      nomeAtributo: "IC_MARCA_DOI",
      valorSolicitado: this.gerarForm.value.desejaDoi,
    });
    if (this.mostraDataObito) {
      let formattedDate2 = "";
      if (
        this.gerarForm.value.obito != null &&
        this.gerarForm.value.obito != undefined
      ) {
        formattedDate2 = this.gerarForm.value.obito;
      }
      this.solicitacaoMassaRequest.atributos.push({
        idAtributo: 15,
        nomeAtributo: "DT_OBITO_PESSOA",
        valorSolicitado: formattedDate2,
      });
    }
  }

  async submitProsseguir() {
    this.preencherMassa();
    this.preencherAtributos();
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
        console.error("Error GeraMassaComponent submitProsseguir", error);
      },
    });
  }

  buscarUsuarios(): void {
    sessionStorage.setItem("idServico", this.idServico);
    sessionStorage.setItem("ambientes", this.ambientes);
    sessionStorage.setItem(
      "idTipoMassa",
      this.gerarForm.value.tipoCadastramento
    );
    sessionStorage.setItem(
      "noDemandaUtzcoMassaDado",
      this.gerarForm.value.noDemandaUtzcoMassaDado
    );
    sessionStorage.setItem("voltar", "buscarUsuarios");
    sessionStorage.setItem("qtde", this.gerarForm.value.qtde);
    sessionStorage.setItem("menorIdade", this.gerarForm.value.menorIdade);
    sessionStorage.setItem("desejaDoi", this.gerarForm.value.desejaDoi);
    sessionStorage.setItem("nis", this.gerarForm.value.nis);
    sessionStorage.setItem("situacao", this.gerarForm.value.situacao);
    sessionStorage.setItem("obito", this.gerarForm.value.obito);
    sessionStorage.setItem("sexo", this.gerarForm.value.sexo);
    sessionStorage.setItem("estadoCivil", this.gerarForm.value.estadoCivil);
    sessionStorage.setItem("rendaOcupacao", this.gerarForm.value.rendaOcupacao);
    sessionStorage.setItem("rendaTipo", this.gerarForm.value.rendaTipo);
    sessionStorage.setItem("meioPrefixo", this.gerarForm.value.meioPrefixo);
    sessionStorage.setItem("meioNumero", this.gerarForm.value.meioNumero);
    sessionStorage.setItem("nascimento", this.gerarForm.value.nascimento);
    sessionStorage.setItem("cpf", this.gerarForm.value.cpf);
    sessionStorage.setItem("cep", this.gerarForm.value.cep);
    sessionStorage.setItem("nomePessoa", this.gerarForm.value.nomePessoa);
    sessionStorage.setItem("nomeMae", this.gerarForm.value.nomeMae);
    sessionStorage.setItem("email", this.gerarForm.value.email);
    sessionStorage.setItem("valorRenda", this.gerarForm.value.valorRenda);
    sessionStorage.setItem("natLocalidade", this.natLocalidade.value);
    sessionStorage.setItem("naturalidade", this.gerarForm.value.naturalidade);
    sessionStorage.setItem(
      "tipoLogradouro",
      this.gerarForm.value.tipoLogradouro
    );
    sessionStorage.setItem("logradouro", this.gerarForm.value.logradouro);
    sessionStorage.setItem("bairro", this.gerarForm.value.bairro);
    sessionStorage.setItem("uf", this.gerarForm.value.uf);
    sessionStorage.setItem("municipio", this.municipio.value);
    this.router.navigateByUrl("/listar-usuarios");
  }

  voltar(): void {
    sessionStorage.clear();
    this.router.navigateByUrl("/listar-massa");
  }

  private _filterAgencia(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.listaAgencias.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterGerente(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.listaGerentes.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterMunicipio(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.listaMunicipios.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterNatLocalidade(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.listaNatLocalidade.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.gerarForm.controls;
  }
}
