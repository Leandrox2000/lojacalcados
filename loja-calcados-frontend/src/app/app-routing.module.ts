import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/modules/home/home.component";
import { ListaMassaComponent } from "./core/components/listaMassa/listaMassa.component";
import { ProdutosComponent } from "./core/components/produtos/produtos.component";
import { SobreComponent } from "./core/components/sobre/sobre.component";
import { ContatoComponent } from "./core/components/contato/contato.component";
import { ContaComponent } from "./core/components/conta/conta.component";
import { CarrinhoComponent } from "./core/components/carrinho/carrinho.component";
import { PagamentoComponent } from "./core/components/pagamento/pagamento.component";
import { DetalheProdutoComponent } from "./core/components/detalhe-produto/detalhe-produto.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "listar-massa",
    component: ListaMassaComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "produtos",
    component: ProdutosComponent,
  },
  {
    path: "detalheProduto",
    component: DetalheProdutoComponent,
  },
  {
    path: "sobre",
    component: SobreComponent,
  },
  {
    path: "contato",
    component: ContatoComponent,
  },
  {
    path: "conta",
    component: ContaComponent,
  },
  {
    path: "carrinho",
    component: CarrinhoComponent,
  },
  {
    path: "pagamento",
    component: PagamentoComponent,
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const appRoutes = [HomeComponent];
