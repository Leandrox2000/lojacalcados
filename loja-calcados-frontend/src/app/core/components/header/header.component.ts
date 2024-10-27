import { Component, OnInit, Input } from "@angular/core";
import {environment} from 'src/environments/environment';
import { HttpService } from "src/app/shared/services/http.service";
import { Router } from "@angular/router";
import { NmcServiceService } from 'src/app/shared/services/service';
import { InformacoesUsuario } from "src/app/model/InformacoesUsuario";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {

  versao = environment.versao;
  usuarioLogado!: InformacoesUsuario;  

  constructor(
    private readonly service: HttpService,
    private readonly nmcService:NmcServiceService,
    private readonly router: Router
  ) {}

  @Input() nomeDoUsuario:string = 'Nome do Usuário';

  ngOnInit(): void {
    const usuarioLogadoStr = localStorage.getItem('usuarioLogado'); 
    this.obterInformacoesUsuarioLdap();
    
  }

  obterInformacoesUsuarioLdap(){
    this.nmcService.lDap("F665908").subscribe({next:(dados) =>{
     console.log(dados);
    },
    error:(e)=>{
      console.log(`Erro ao solicitar os dados do LDAP: ${e}`)
    }
    })
  }

  // obterUsuarioLogado(): void {
  //   let queryParams = new HttpParams();
  //   this.service
  //     .get("FrontEnd/ObterUsuarioLogado", queryParams)
  //     .subscribe((data: Usuario) => {
  //       this.usuarioLogado = data;
  //       console.log(this.usuarioLogado);
  //     });
  // }

}
