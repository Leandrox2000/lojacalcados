import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/modules/home/home.component";
import { ListaMassaComponent } from "./core/components/listaMassa/listaMassa.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/listar-massa",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "listar-massa",
    component: ListaMassaComponent,
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const appRoutes = [HomeComponent];
