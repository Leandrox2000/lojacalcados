import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {
  configForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.configForm = this.fb.group({
      socketTimeout: [12000, Validators.required],
      connectTimeout: [5000, Validators.required],
      connectRequestTimeout: [5000, Validators.required],
      qtdTentativas: [3, Validators.required]
    });
  }

  submitConfig(): void {
    if (this.configForm.valid) {
      const configData = this.configForm.value;
      this.http.post('https://simpi-pix-router-des-esteiras.nprd2.caixa/configuracao', configData)
      .subscribe({
        next: (response) => {
          console.log('Configuration saved', response);
          // Handle successful response
        },
        error: (error) => {
          console.error('Error saving configuration', error);
          // Handle error
        }
      });
    }
  }
}