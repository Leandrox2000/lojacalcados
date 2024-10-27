import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "app-listar-log",
  templateUrl: "./listar-log.component.html",
  styleUrls: ["./listar-log.component.scss"],
})
export class ListarLogComponent implements OnInit {
  lista: string[] = [];
  dataSource: MatTableDataSource<string> = null;
  displayedColumns: string[] = ["log"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.submitPesquisar();
  }

  async submitPesquisar() {
    this.service
      .get("FrontEnd/ObterLog", new HttpParams())
      .subscribe((data: string[]) => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        console.log(this.lista);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public downloadFile() {
    const replacer = (key, value) => (value === null ? "" : value);
    const header = [""];
    const csv = this.lista.map((row) =>
      header.map((fieldName) => JSON.stringify(row, replacer)).join(",")
    );
    const csvArray = csv.join("\r\n");

    const a = document.createElement("a");
    const blob = new Blob([csvArray], { type: "text/txt" });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "sinoplog.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
