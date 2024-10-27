import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-api-interaction',
  templateUrl: './api-interaction.component.html',
  styleUrls: ['./api-interaction.component.scss']
})
export class ApiInteractionComponent {
  form: FormGroup;
  response: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      endpoint: [''],
      method: ['GET'],
      body: ['']
    });
  }

  sendRequest() {
    const { endpoint, method, body } = this.form.value;
  
    let request;
  
    switch(method) {
      case 'POST':
        request = this.http.post(endpoint, JSON.parse(body), {
          headers: new HttpHeaders({ 'Content-Type': 'application/xml'})
        });
        break;
      case 'GET':
        request = this.http.get(endpoint, {responseType: 'text'});
        break;
      case 'DELETE':
        request = this.http.delete(endpoint, {responseType: 'text'});
        break;
      default:
        console.error("Unsupported method");
        return;
    }
  
    request.subscribe(
      response => this.response = response,
      error => {
        console.error("Request failed", error);
        this.response = error;
      }
    );
  }
}
