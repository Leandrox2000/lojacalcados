import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../services/message.service";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "app-conta",
  templateUrl: "./conta.component.html",
  styleUrls: ["./conta.component.scss"],
})
export class ContaComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
}
