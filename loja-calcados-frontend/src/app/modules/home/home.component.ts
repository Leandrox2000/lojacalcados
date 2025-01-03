import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "src/app/core/services/message.service";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(
    private messageService: MessageService,
    private service: HttpService,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  voltar(): void {
    // sessionStorage.clear();
    this.router.navigateByUrl("/listar-massa");
  }
}
