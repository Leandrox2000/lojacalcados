import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/shared/services/http.service";
import { MessageService } from "../../services/message.service";
import { HttpParams } from "@angular/common/http";
import { Produto } from "src/app/model/produto";

@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.scss"],
})
export class ProdutosComponent implements OnInit {
  listaProdutos: Produto[] = [];
  constructor(
    private messageService: MessageService,
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  async listarProdutos() {
    this.service.get("produtos/listar", new HttpParams()).subscribe({
      next: (data: Produto[]) => {
        console.log(data);
        this.listaProdutos = data;
      },
      error: (error) => {
        console.error("listarProdutos", error);
      },
    });
  }

  voltar(): void {
    // sessionStorage.clear();
    this.router.navigateByUrl("/listar-massa");
  }

  ngOnInit(): void {
    this.listarProdutos();
  }
}
