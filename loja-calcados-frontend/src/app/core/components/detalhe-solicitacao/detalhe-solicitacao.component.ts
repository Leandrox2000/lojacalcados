import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ITEM } from "src/app/entities/item";
import { SolicitacaoDetalheResponse } from "src/app/entities/solicitacaoDetalheResponse";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "app-detalhe-solicitacao",
  templateUrl: "./detalhe-solicitacao.component.html",
  styleUrls: ["./detalhe-solicitacao.component.scss"],
})
export class DetalheSolicitacaoComponent implements OnInit {
  idSolicitacao: string;
  listaAtributos: ITEM[];
  listaMassa: ITEM[];
  solicitacao: SolicitacaoDetalheResponse = {
    NU_IDNTR_SLTCO_MASSA_DADO: 0,
    NO_SERVICO_DADO: "",
    DT_ABERTURA_SOLICITACAO: undefined,
    DT_ABERTURA_FORMATADA: "",
    AMBIENTES: "",
    IC_SITUACAO_SLTCO: "",
    CO_USUARIO: "",
    NO_USUARIO: "",
    USUARIOS: "",
    DH_INICIO_ATENDIMENTO_SLTCO: "",
    DH_FIM_ATENDIMENTO_SLTCO: "",
    DH_INICIO_FMT: "",
    DH_FIM_FMT: "",
    SISTEMAS: "",
    QT_MINUTO_ATENDIMENTO: 0,
    QT_REGISTRO_SLTCO: 0,
    NO_AREA_NEGOCIO: "",
    NO_TIPO_MASSA_DADO: "",
    NO_DEMANDA_UTZCO_MASSA_DADO: "",
    NU_SERVICO_QUALIDADE: "",
    NO_UNIDADE_CAIXA: "",
  };
  datepipe: DatePipe = new DatePipe("pt-BR");
  patternDate: string = "dd/MM/YYYY";
  patternTimestamp: string = "YYYY-MM-dd HH:mm:ss.S"; //2024-05-02 10:30:00.0
  timeZone: string = "GMT-3";
  constructor(
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idSolicitacao = this.rout.snapshot.paramMap.get("idSolicitacao");
    this.submitPesquisar();
    this.buscarDetalhesAtributos();
    this.buscarDetalhesMassa();
  }

  voltar(): void {
    this.router.navigateByUrl("/listar-solicitacoes");
  }

  async submitPesquisar() {
    let queryParams = new HttpParams().append(
      "idSolicitacao",
      this.idSolicitacao
    );
    this.service.get("FrontEnd/ObterSolicitacaoPorId", queryParams).subscribe({
      next: (data: SolicitacaoDetalheResponse[]) => {
        if (data != null && data.length > 0) {
          this.solicitacao = data[0];
          this.solicitacao.DT_ABERTURA_FORMATADA = this.datepipe.transform(
            this.solicitacao.DT_ABERTURA_SOLICITACAO,
            this.patternDate,
            this.timeZone
          );
          this.solicitacao.DH_INICIO_FMT = this.datepipe.transform(
            this.solicitacao.DH_INICIO_ATENDIMENTO_SLTCO,
            this.patternTimestamp,
            this.timeZone
          );
          if (
            this.solicitacao.DH_FIM_ATENDIMENTO_SLTCO != null &&
            this.solicitacao.DH_FIM_ATENDIMENTO_SLTCO != "null"
          ) {
            this.solicitacao.DH_FIM_FMT = this.datepipe.transform(
              this.solicitacao.DH_FIM_ATENDIMENTO_SLTCO,
              this.patternTimestamp,
              this.timeZone
            );
          } else {
            this.solicitacao.DH_FIM_ATENDIMENTO_SLTCO = "";
          }
          if (
            this.solicitacao.NU_SERVICO_QUALIDADE == null ||
            this.solicitacao.NU_SERVICO_QUALIDADE == "null"
          ) {
            this.solicitacao.NU_SERVICO_QUALIDADE = "";
          }
          console.log(this.solicitacao);
        }
      },
      error: (error) => {
        console.error(
          "Error DetalheSolicitacaoComponent submitPesquisar",
          error
        );
      },
    });
  }

  async buscarDetalhesAtributos() {
    this.listaAtributos = [];
    let queryParams = new HttpParams()
      .append("idSolicitacao", this.idSolicitacao)
      .append("papel", "E");
    this.service
      .get("FrontEnd/ObterDominioAtributosSolicitacao", queryParams)
      .subscribe((data: any[]) => {
        if (data != null && data.length > 0) {
          this.agruparDetalhes(data, this.listaAtributos);
          console.log(this.listaAtributos);
        }
      });
  }

  async buscarDetalhesMassa() {
    this.listaMassa = [];
    let queryParams = new HttpParams()
      .append("idSolicitacao", this.idSolicitacao)
      .append("papel", "S");
    this.service
      .get("FrontEnd/ObterDominioAtributosSolicitacao", queryParams)
      .subscribe((data: any[]) => {
        if (data != null && data.length > 0) {
          this.agruparDetalhes(data, this.listaMassa);
          console.log(this.listaMassa);
        }
      });
  }

  private agruparDetalhes(data: any[], lista: ITEM[]): void {
    for (const element of data) {
      // Primeiro for fazendo agrupamento
      let index2 = lista.findIndex(
        (x) => x.CODIGO === element.NU_IDNTR_ATRIBUTO
      );
      if (index2 == -1) {
        let item: ITEM = {
          CODIGO: element.NU_IDNTR_ATRIBUTO,
          LABEL: element.DE_APTCO_ATBTO_SERVICO,
          LISTA: [],
        };
        lista.push(item);
      }
    }
    for (const element2 of data) {
      // Segundo for preenchendo lista interna
      let index2 = lista.findIndex(
        (x) => x.CODIGO === element2.NU_IDNTR_ATRIBUTO
      );
      if (index2 != -1) {
        let item2: ITEM = {
          CODIGO: element2.NU_IDNTR_ATRIBUTO,
          LABEL:
            element2.DE_CONTEUDO_VRL_SLTCO == null ||
            element2.DE_CONTEUDO_VRL_SLTCO == "null"
              ? ""
              : element2.DE_CONTEUDO_VRL_SLTCO,
          LISTA: [],
        };
        lista[index2].LISTA.push(item2);
      }
    }
  }

  public downloadFile() {
    let queryParams = new HttpParams().append(
      "idSolicitacao",
      this.idSolicitacao
    );
    this.service
      .get("FrontEnd/ObterNomeArquivo", queryParams)
      .subscribe((data: any[]) => {
        if (data != null && data.length > 0) {
          console.log(data);
          let listaHeaders = [];
          let listaValores = "";
          let maximo = 0;
          for (const tit of this.listaMassa) {
            listaHeaders.push(tit.LABEL);
            maximo = tit.LISTA.length;
          }
          for (let i = 0; i < maximo; i++) {
            for (const tit of this.listaMassa) {
              listaValores += tit.LISTA[i].LABEL + ",";
            }
            listaValores += "\r\n";
          }
          const header = Object.assign(listaHeaders);
          const a = document.createElement("a");
          const blob = new Blob([header + ",\r\n" + listaValores], {
            type: "text/csv",
          });
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = data[0].NO_ARQ_MASSA_DADO_FINAL;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      });
  }
}
