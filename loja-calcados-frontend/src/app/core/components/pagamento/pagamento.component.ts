import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/shared/services/http.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-pagamento",
  templateUrl: "./pagamento.component.html",
  styleUrls: ["./pagamento.component.scss"],
})
export class PagamentoComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
}
