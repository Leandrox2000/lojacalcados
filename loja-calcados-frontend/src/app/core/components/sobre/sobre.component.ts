import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/shared/services/http.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-sobre",
  templateUrl: "./sobre.component.html",
  styleUrls: ["./sobre.component.scss"],
})
export class SobreComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
}
