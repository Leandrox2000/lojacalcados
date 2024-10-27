import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { SolicitacaoResponse } from "src/app/entities/solicitacaoResponse";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "app-lista-solicitacoes",
  templateUrl: "./lista-solicitacoes.component.html",
  styleUrls: ["./lista-solicitacoes.component.scss"],
})
export class ListaSolicitacoesComponent implements OnInit {
  datepipe: DatePipe = new DatePipe("pt-BR");
  patternDate: string = "dd/MM/YYYY";
  timeZone: string = "GMT-3";
  dataInicio: Date;
  minDate: Date;
  maxDate: Date;
  displayedColumns: string[] = [
    "id",
    "servico",
    "data",
    "ambientes",
    "status",
    "usuario",
    "acao",
  ];
  dataSource: MatTableDataSource<SolicitacaoResponse>;
  searchForm: FormGroup;
  sistema: FormControl;
  listaSolicitacoes: SolicitacaoResponse[] = [];
  listaSituacao = [];
  listaServicos = [];
  listaAmbientes = [];
  listaSistemas: string[] = [];
  filteredSistema: Observable<string[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private service: HttpService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    const dataAtual = new Date();
    const currentYear = dataAtual.getFullYear();
    this.sistema = new FormControl();
    this.dataInicio = new Date();
    this.dataInicio.setDate(this.dataInicio.getDate() - 15);
    this.minDate = new Date(currentYear - 10, 0, 1);
    this.maxDate = dataAtual;
    this.searchForm = this.fb.group({
      situacao: new FormControl(""),
      servico: new FormControl(""),
      ambiente: new FormControl(""),
      dataInicial: new FormControl(this.dataInicio, Validators.required),
      dataFinal: new FormControl(dataAtual, Validators.required),
      search: [""],
    });
    this.dataSource = null;
    this.submitPesquisar();
    this.listarSituacao();
    this.listarServicos();
    this.listarAmbientes();
    this.listarSistemas();
  }

  async submitPesquisar() {
    let queryParams = new HttpParams().append(
      "idUsuarioSolicitante",
      "17" // TODO ID USUARIO LOGADO
    );
    this.service
      .get("FrontEnd/ObterASolicitacoes", queryParams)
      .subscribe((data: SolicitacaoResponse[]) => {
        this.listaSolicitacoes = data;
        for (const element of this.listaSolicitacoes) {
          element.DT_ABERTURA_FORMATADA = this.datepipe.transform(
            element.DT_ABERTURA_SOLICITACAO,
            this.patternDate,
            this.timeZone
          );
        }
        this.dataSource = new MatTableDataSource(this.listaSolicitacoes);
        this.dataSource.paginator = this.paginator;
        console.log(this.listaSolicitacoes);
      });
  }

  async listarAmbientes() {
    this.service
      .get("FrontEnd/ObterAmbientes", null)
      .subscribe((data: any[]) => {
        this.listaAmbientes = data;
        console.log(this.listaAmbientes);
      });
  }

  async listarSituacao() {
    this.service
      .get("FrontEnd/ObterSituacoesSolicitacao", null)
      .subscribe((data: any[]) => {
        this.listaSituacao = data;
        console.log(this.listaSituacao);
      });
  }

  async listarServicos() {
    this.service
      .get("FrontEnd/ObterServicos", null)
      .subscribe((data: any[]) => {
        this.listaServicos = data;
        console.log(this.listaServicos);
      });
  }

  async listarSistemas() {
    this.service
      .get("FrontEnd/ObterSistemas", null)
      .subscribe((data: any[]) => {
        this.listaSistemas = [];
        if (data != null && data.length > 0) {
          for (const element of data) {
            this.listaSistemas.push(element.SG_SISTEMA);
          }
        }
        console.log(this.listaSistemas);
        this.filteredSistema = this.sistema.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterSistemas(value))
        );
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public detalharSolicitacao(idSolicitacao: string): void {
    this.router.navigateByUrl("/detalhe-solicitacao/" + idSolicitacao);
  }

  public downloadFile(data: SolicitacaoResponse) {
    const replacer = (key, value) => (value === null ? "" : value);
    let listaSolicitacoes: SolicitacaoResponse[] = [];
    listaSolicitacoes.push(data);
    const header = Object.keys(data);
    const csv = listaSolicitacoes.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    const csvArray = csv.join("\r\n");

    const a = document.createElement("a");
    const blob = new Blob([csvArray], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = data.NU_IDNTR_SLTCO_MASSA_DADO + "_file.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  private _filterSistemas(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaSistemas.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
