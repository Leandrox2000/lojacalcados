import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ServicoDadosResponse } from "src/app/entities/servicoDadoResponse";
import { HttpService } from "src/app/shared/services/http.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-lista-servicos-dados",
  templateUrl: "./lista-servicos-dados.component.html",
  styleUrls: ["./lista-servicos-dados.component.scss"],
})
export class ListaServicosDadosComponent implements OnInit {
  displayedColumns: string[] = [
    "servico",
    "ativo",
    "negocio",
    "automatizado",
    "acao",
  ];
  dataSource: MatTableDataSource<ServicoDadosResponse>;
  searchForm: FormGroup;
  listaServicos: ServicoDadosResponse[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private messageService: MessageService,
    private service: HttpService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.dataSource = null;
    this.searchForm = new FormGroup({});
    this.submitPesquisar();
  }

  async submitPesquisar() {
    let queryParams = new HttpParams();
    this.service
      .get("FrontEnd/ObterAtributoServico", queryParams)
      .subscribe((data: ServicoDadosResponse[]) => {
        this.listaServicos = data;
        this.dataSource = new MatTableDataSource(this.listaServicos);
        this.dataSource.paginator = this.paginator;
        console.log(this.listaServicos);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public detalharServico(idServico: string): void {
    this.router.navigateByUrl("/manter-servicos-dados/" + idServico + "/true");
  }

  public cadastrarServico(idServico: string): void {
    this.router.navigateByUrl("/manter-servicos-dados/" + idServico);
  }

  public atualizarServico(servico: ServicoDadosResponse, ativo: string) {
    this.service
      .put(
        "FrontEnd/AtualizarServicoDadoAtivo/" +
          servico.NU_IDNTR_SERVICO_DADO +
          "/" +
          ativo,
        new HttpParams()
      )
      .subscribe((data: any) => {
        this.submitPesquisar();
        this.messageService.enviarMensagemSucesso();
      });
  }
}
