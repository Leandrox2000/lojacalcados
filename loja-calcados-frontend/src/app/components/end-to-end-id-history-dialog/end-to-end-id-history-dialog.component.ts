import { Component, Inject,ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeCorpoReqDialogComponent } from '../de-corpo-req-dialog/de-corpo-req-dialog.component';
import { DeCorpoRespostaDialogComponent } from '../de-corpo-resposta-dialog/de-corpo-resposta-dialog.component';

@Component({
  selector: 'app-end-to-end-id-history-dialog',
  template: `
  <h1 mat-dialog-title>Histórico do Pedido </h1>
  <mat-dialog-content>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8
    spacious-table">
    <ng-container matColumnDef="nuHistorico">
    <th mat-header-cell *matHeaderCellDef> ID </th>
    <td mat-cell *matCellDef="let element"> {{element.nuHistorico}} </td>
  </ng-container>

  <ng-container matColumnDef="coIpOrigem">
    <th mat-header-cell *matHeaderCellDef> Ip Origem </th>
    <td mat-cell *matCellDef="let element"> {{element.coIpOrigem}} </td>
  </ng-container>

  <ng-container matColumnDef="initDataReq">
    <th mat-header-cell *matHeaderCellDef> Data Inicial da Req </th>
    <td mat-cell *matCellDef="let element"> {{element.initDataReq}} </td>
  </ng-container>

  <ng-container matColumnDef="initHoraReq">
    <th mat-header-cell *matHeaderCellDef> Hora Inicial da Req </th>
    <td mat-cell *matCellDef="let element"> {{element.initHoraReq}} </td>
  </ng-container>

  <ng-container matColumnDef="endDataReq">
    <th mat-header-cell *matHeaderCellDef> Data Final da Req </th>
    <td mat-cell *matCellDef="let element"> {{element.endDataReq}} </td>
  </ng-container>

  <ng-container matColumnDef="endHoraReq">
    <th mat-header-cell *matHeaderCellDef> Hora Final da Req </th>
    <td mat-cell *matCellDef="let element"> {{element.endHoraReq}} </td>
  </ng-container>

  <ng-container matColumnDef="icSituacao">
    <th mat-header-cell *matHeaderCellDef> Status </th>
    <td mat-cell *matCellDef="let element"> {{element.icSituacao}} </td>
  </ng-container>

  <ng-container matColumnDef="deMetodo">
    <th mat-header-cell *matHeaderCellDef> Método </th>
    <td mat-cell *matCellDef="let element"> {{element.deMetodo}} </td>
  </ng-container>

  <ng-container matColumnDef="deEndpoint">
    <th mat-header-cell *matHeaderCellDef> Endpoint </th>
    <td mat-cell *matCellDef="let element"> {{element.deEndpoint}} </td>
  </ng-container>

  <ng-container matColumnDef="tpServico">
    <th mat-header-cell *matHeaderCellDef> XML </th>
    <td mat-cell *matCellDef="let element"> {{element.tpServico}} </td>
  </ng-container>

  <ng-container matColumnDef="coIdEndToEnd">
    <th mat-header-cell *matHeaderCellDef> endToEndId </th>
    <td mat-cell *matCellDef="let element"> {{element.coIdEndToEnd}} </td>
  </ng-container>

  <ng-container matColumnDef="corpoReq">
    <th mat-header-cell *matHeaderCellDef> Corpo de Requisição </th>
    <td mat-cell *matCellDef="let element">
      <button mat-button (click)="$event.stopPropagation(); openDialogReq(element)">Ver Requisição</button>
    </td>
  </ng-container>
  
  <ng-container matColumnDef="corpoResposta">
  <th mat-header-cell *matHeaderCellDef> Corpo de Resposta </th>
    <td mat-cell *matCellDef="let element">
      <button mat-button (click)="$event.stopPropagation(); openDialogResposta(element)">Ver Resposta</button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Fechar</button>
  </mat-dialog-actions>
  `,
styles: [`.spacious-table .mat-cell, .spacious-table .mat-header-cell {
  padding: 16px;}`]
})
export class EndToEndIdHistoryDialogComponent {
  displayedColumns: string[] = ['nuHistorico', 'coIpOrigem', 'initDataReq', 
  'initHoraReq', 'endDataReq', 'endHoraReq','icSituacao', 
  'deMetodo', 'deEndpoint', 'tpServico', 'coIdEndToEnd','corpoReq','corpoResposta'];
  dataSource: MatTableDataSource<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private cdr:
  ChangeDetectorRef,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.historyItems.content);
    this.cdr.detectChanges();
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
}
