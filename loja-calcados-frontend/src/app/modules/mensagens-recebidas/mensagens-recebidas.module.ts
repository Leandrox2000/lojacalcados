import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse,HistoricalDataItem } from '../../core/components/api-response';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeCorpoRespostaDialogComponent } from 'src/app/components/de-corpo-resposta-dialog/de-corpo-resposta-dialog.component';
import { DeCorpoReqDialogComponent } from 'src/app/components/de-corpo-req-dialog/de-corpo-req-dialog.component';
import { EndToEndIdHistoryDialogComponent } from 'src/app/components/end-to-end-id-history-dialog/end-to-end-id-history-dialog.component';

@Component({
  selector: 'app-mensagens-recebidas',
  templateUrl: './mensagens-recebidas.component.html',
  styleUrls: ['./mensagens-recebidas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0',
visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class MensagensRecebidasModule implements OnInit {
  dataSource: MatTableDataSource<HistoricalDataItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchForm: FormGroup;
  historicalData: HistoricalDataItem[] = [];
  pageSizeControl = new FormControl(40);
  displayedColumns: string[] = ['nuHistorico', 'coIpOrigem', 'tpServico','coServico','coSituacaoResposta','coIdMsg','corpoResposta'];
  
  constructor(private http: HttpClient, private fb: FormBuilder, public dialog: MatDialog) { }
    
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.initForm();
  }
    
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    setTimeout(() => {
      this.paginator.pageSize = this.pageSizeControl.value;
  
      this.pageSizeControl.valueChanges.subscribe((pageSize) => {
        this.paginator.pageSize = pageSize;
        this.fetchHistoricalData(); 
      });
      this.fetchHistoricalData();
    });
  }
    
  initForm(): void {
    this.searchForm = this.fb.group({
      coIdMsg:['']
    });
  }

  onSubmit(): void {
    const formValues = this.searchForm.value;

    // Filter logic
    const filteredData = this.historicalData.filter(data => {
      const coIdMatch = formValues.coIdMsg ? data.coIdMsg ? data.coIdMsg.includes(formValues.coIdMsg) : false : true;

      return coIdMatch;
    });

    this.dataSource.data = filteredData;
    this.dataSource.paginator.firstPage(); // Reset to the first page
  }
          
  openDialogReq(element): void {
    this.dialog.open(DeCorpoReqDialogComponent, {
      width: '500px',
      data: { deCorpoRequisicao: element.deCorpoRequisicao }
    });
  }

  openDialogResposta(element): void {
    this.dialog.open(DeCorpoRespostaDialogComponent, {
      width: '500px',
      data: { deCorpoResposta: element.deCorpoResposta }
    });
  }

  fetchHistoricalData(): void {
    const pageSize = this.paginator?.pageSize || this.pageSizeControl.value;
    const endpointUrl = `https://simpi-pix-router-des-esteiras.nprd2.caixa/historico?orderBy=nuHistorico&sort=desc&deEndpoint=FILA&pageSize=${pageSize}`;
    this.http.get<ApiResponse>(endpointUrl).subscribe(data => {
      const modifiedData = data.content.map(item => {
        const coSituacaoResposta = item.coSituacaoResposta ?? false;
        const situacao = coSituacaoResposta ? 'CONSUMIDO' : 'NÃO CONSUMIDO';
        return {...item,
          coSituacaoResposta: situacao
        };});
      this.dataSource.data = modifiedData;
      this.historicalData = modifiedData;
      console.log("historicaldata",this.historicalData)
    }, error => {
      console.error("Failed to fetch historical data", error);
    });
  }

    fetchRequestHistory(row: HistoricalDataItem): void {
    if (row.coIdMsg) {
      const endpointUrl = `https://simpi-pix-router-des-esteiras.nprd2.caixa/historico?orderBy=nuHistorico&sort=desc&coIdMsg=${encodeURIComponent(row.coIdMsg)}`;
      this.http.get<any>(endpointUrl).subscribe(history => {
        this.dialog.open(EndToEndIdHistoryDialogComponent, {
          width: '100%', 
          data: { historyItems: history }
        });
      }, error => {
        console.error("Failed to fetch request history", error);
      });
    }
  }
}
