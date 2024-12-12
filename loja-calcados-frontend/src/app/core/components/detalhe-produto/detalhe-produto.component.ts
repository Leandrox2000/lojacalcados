import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/shared/services/http.service";
import { MessageService } from "../../services/message.service";
import { HttpParams } from "@angular/common/http";
import { Produto } from "src/app/model/produto";

@Component({
  selector: "app-detalhe-produto",
  templateUrl: "./detalhe-produto.component.html",
  styleUrls: ["./detalhe-produto.component.scss"],
})
export class DetalheProdutoComponent implements OnInit {
  produto: Produto;
  constructor(
    private messageService: MessageService,
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.produto = new Produto();
    let idProduto = this.rout.snapshot.paramMap.get("idProduto");
    if (idProduto != null && idProduto != undefined) {
      this.buscarProduto(idProduto);
    }
  }

  async buscarProduto(idProduto: string) {
    let param = new HttpParams();
    param.append("id", idProduto);
    this.service.get("produtos/buscar", param).subscribe({
      next: (data: Produto) => {
        console.log(data);
        this.produto = data;
      },
      error: (error) => {
        console.error("buscarProduto", error);
      },
    });
  }

  voltar(): void {
    // sessionStorage.clear();
    this.router.navigateByUrl("/produtos");
  }
}
