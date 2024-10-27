import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-de-corpo-resposta-dialog',
  template: `
  <h1 mat-dialog-title>Corpo do XML (Resposta) </h1>
  <mat-dialog-content class="json-content">
    <pre [innerText]="formattedJson(data.deCorpoResposta)"></pre>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Fechar</button>
  </mat-dialog-actions>
`,
styles: [`
  .json-content pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 500px;
    overflow-wrap: break-word;
  }
`]
})
export class DeCorpoRespostaDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  formattedJson(data: any): string {
    return JSON.stringify(data, null, 2);
  }
  
}
