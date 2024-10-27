import { Component, OnInit } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { HttpService } from "src/app/shared/services/http.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/app/entities/usuario";

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
})
export class ListaUsuariosComponent implements OnInit {
  listarForm: FormGroup;
  listaUsuarios: Usuario[] = [];
  selectedUsuarios: Usuario[] = [];
  txtUsuario: string;
  idServico: string;
  constructor(
    private service: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idServico = sessionStorage.getItem("idServico");
    this.listarForm = this.fb.group({
      txtUsuario: new FormControl("", [Validators.minLength(3)]),
      usuarios: [],
    });
  }

  async listarUsuarios() {
    let str: string = this.listarForm.value.txtUsuario;
    if (str == null || str.trim().length < 3) {
      return;
    }
    let queryParams = new HttpParams()
      .append("usuario", "0")
      .append("like", str);
    this.service
      .get("FrontEnd/ObterUsuarioAcessoMassa", queryParams)
      .subscribe((data: Usuario[]) => {
        this.listaUsuarios = data;
        for (const element of this.listaUsuarios) {
          element.SELECIONADO = false;
        }
        console.log(this.listaUsuarios);
      });
  }

  voltar(): void {
    this.router.navigateByUrl("/gera-massa" + this.idServico);
  }

  prosseguir(): void {
    sessionStorage.setItem("usuarios", JSON.stringify(this.selectedUsuarios));
    this.router.navigateByUrl("/gera-massa" + this.idServico);
  }

  limpar(): void {
    sessionStorage.removeItem("usuarios");
    this.listaUsuarios = [];
  }

  public onCheck(event, usu): void {
    usu.SELECIONADO = event;
  }

  adicionar(): void {
    if (this.selectedUsuarios.length == 3) {
      alert("Máximo de 3 usuários por massa!");
      return;
    }
    let cont = 0;
    for (const element of this.listaUsuarios) {
      if (element.SELECIONADO) {
        cont++;
        if (cont > 3) {
          alert("Máximo de 3 usuários por massa!");
          return;
        }
      }
    }
    for (let i = 0; i < this.listaUsuarios.length; i++) {
      if (this.listaUsuarios[i].SELECIONADO) {
        let index = this.selectedUsuarios.findIndex(
          ({ NU_IDNTR_USUARIO }) =>
            NU_IDNTR_USUARIO === this.listaUsuarios[i].NU_IDNTR_USUARIO
        );
        if (index == -1) {
          this.selectedUsuarios.push(this.listaUsuarios[i]);
        }
        this.listaUsuarios.splice(i, 1);
        i--;
      }
    }
    for (const element of this.selectedUsuarios) {
      element.SELECIONADO = false;
    }
  }

  remover(usu: Usuario): void {
    let index = this.selectedUsuarios.indexOf(usu);
    if (index >= 0) {
      this.selectedUsuarios.splice(index, 1);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.listarForm.controls;
  }
}
