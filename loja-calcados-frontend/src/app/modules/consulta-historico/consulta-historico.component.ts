import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse,HistoricalDataItem } from '../../core/components/api-response';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EndToEndIdHistoryDialogComponent } from 'src/app/components/end-to-end-id-history-dialog/end-to-end-id-history-dialog.component';
import { DeCorpoReqDialogComponent } from 'src/app/components/de-corpo-req-dialog/de-corpo-req-dialog.component';
import { DeCorpoRespostaDialogComponent } from 'src/app/components/de-corpo-resposta-dialog/de-corpo-resposta-dialog.component';

@Component({
  selector: 'app-consulta-historico',
  templateUrl: './consulta-historico.component.html',
  styleUrls: ['./consulta-historico.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0',
visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ConsultaHistoricoComponent implements OnInit {
  dataSource: MatTableDataSource<HistoricalDataItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchForm: FormGroup;
  historicalData: HistoricalDataItem[] = [];
  pageSizeControl = new FormControl(40);
  displayedColumns: string[] = ['nuHistorico', 'coIpOrigem', 'initDataReq', 
  'initHoraReq', 'endDataReq', 'endHoraReq','icSituacao', 
  'deMetodo', 'deEndpoint', 'tpServico','coServico','coIdMsg','corpoReq','corpoResposta'];
  
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
      messageStatus: [''],
      initDate: [''],
      initTime: [''],
      endDate:[''],
      endTime: [''],
      coIdMsg:['']
    });
  }

  onSubmit(): void {
    const formValues = this.searchForm.value;
  
    // Filter logic
    const filteredData = this.historicalData.filter(data => {
      const statusMatch = formValues.messageStatus ? data.icSituacao === formValues.messageStatus : true;
  
      // Fixed date filtering logic assuming your date strings are in YYYY-MM-DD format.
      let dateMatch = true;
      if (formValues.initDate && formValues.endDate) {
        const dataInitDate = data.dhRequisicao ? new Date(data.dhRequisicao.split('T')[0]) : null;
        if (dataInitDate) {
          const formInitDate = new Date(formValues.initDate);
          const formEndDate = new Date(formValues.endDate);
          dateMatch = dataInitDate >= formInitDate && dataInitDate <= formEndDate;
        } else {
          dateMatch = false; // If dataInitDate is null, consider it as a non-match
        }
      }
  
      // Time Filtering
      let timeMatch = true;
      if (formValues.initTime || formValues.endTime) {
        const dataTime = data.dhRequisicao ? data.dhRequisicao.split('T')[1] : null;
        if (dataTime) {
          const [dataHour, dataMinute] = dataTime.split(':').map(Number);
          const [initHour, initMinute] = formValues.initTime ? formValues.initTime.split(':').map(Number) : [0, 0];
          const [endHour, endMinute] = formValues.endTime ? formValues.endTime.split(':').map(Number) : [23, 59];
          const isAfterStartTime = dataHour > initHour || (dataHour === initHour && dataMinute >= initMinute);
          const isBeforeEndTime = dataHour < endHour || (dataHour === endHour && dataMinute <= endMinute);
          timeMatch = isAfterStartTime && isBeforeEndTime;
        } else {
          timeMatch = false; // If dataTime is null, consider it as a non-match
        }
      }
  
      // Add your filtering logic for coIdMsg
      const coIdMatch = formValues.coIdMsg ? data.coIdMsg ? data.coIdMsg.includes(formValues.coIdMsg) : false : true;
  
      return statusMatch && dateMatch && timeMatch && coIdMatch;
    });
  
    this.dataSource.data = filteredData;
    this.dataSource.paginator.firstPage(); // Reset
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
    const endpointUrl = `https://simpi-pix-router-des-esteiras.nprd2.caixa/historico?orderBy=nuHistorico&sort=desc&pageSize=${pageSize}`;
    this.http.get<ApiResponse>(endpointUrl).subscribe(data => {
      const modifiedData = data.content.map(item => {
        const dhRequisicao = item.dhRequisicao ?? ''; // Check for null and replace with ''
        const dhResposta = item.dhResposta ?? '';
        return {
          ...item,
          initDataReq: dhRequisicao ? dhRequisicao.split('T')[0].split('-').reverse().join('/') : '', // format yyyy-mm-dd to dd/mm/yyyy for dhRequisicao
          initHoraReq: dhRequisicao ? dhRequisicao.split('T')[1].split(':').slice(0,2).join(':') : '', // extract hh:mm for dhRequisicao
          endDataReq: dhResposta ? dhResposta.split('T')[0].split('-').reverse().join('/') : '', // format yyyy-mm-dd to dd/mm/yyyy for dhResposta
          endHoraReq: dhResposta ? dhResposta.split('T')[1].split(':').slice(0,2).join(':') : '', // extract hh:mm for dhResposta
        };
      });
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