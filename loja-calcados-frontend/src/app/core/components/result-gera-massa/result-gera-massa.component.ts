import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-result-gera-massa",
  templateUrl: "./result-gera-massa.component.html",
  styleUrls: ["./result-gera-massa.component.scss"],
})
export class ResultGeraMassaComponent implements OnInit {
  idSolicitacao: string;
  constructor(private router: Router, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.idSolicitacao = this.rout.snapshot.paramMap.get("idSolicitacao");
  }

  voltar(): void {
    this.router.navigateByUrl("/listar-massa");
  }
}
